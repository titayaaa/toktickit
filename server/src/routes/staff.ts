import { Router, Response } from 'express';
import { PrismaClient, Role, TicketPriority, TicketStatus } from '@prisma/client';
import { authenticate, requireRole, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Enforce authentication & IT_STAFF / ADMINISTRATOR role across staff routes
router.use(authenticate);
router.use(requireRole(Role.IT_STAFF, Role.ADMINISTRATOR));

// Valid Enum Maps
const VALID_STATUSES: Record<string, TicketStatus> = {
  NEW: TicketStatus.NEW,
  OPEN: TicketStatus.OPEN,
  IN_PROGRESS: TicketStatus.IN_PROGRESS,
  WAITING_FOR_REQUESTER: TicketStatus.WAITING_FOR_REQUESTER,
  PENDING: TicketStatus.PENDING,
  RESOLVED: TicketStatus.RESOLVED,
  CLOSED: TicketStatus.CLOSED,
  REOPENED: TicketStatus.REOPENED,
  CANCELLED: TicketStatus.CANCELLED,
};

const VALID_PRIORITIES: Record<string, TicketPriority> = {
  LOW: TicketPriority.LOW,
  MEDIUM: TicketPriority.MEDIUM,
  HIGH: TicketPriority.HIGH,
  CRITICAL: TicketPriority.CRITICAL,
  URGENT: TicketPriority.URGENT,
};

const PRIORITY_WEIGHTS: Record<TicketPriority, number> = {
  URGENT: 5,
  CRITICAL: 4,
  HIGH: 3,
  MEDIUM: 2,
  LOW: 1,
};

/**
 * GET /api/staff/tickets
 * Query Parameters:
 *  - search: string (matches ticketNumber or summary case-insensitively)
 *  - category: number (CategoryId)
 *  - status: string (TicketStatus)
 *  - priority: string (requestedPriority)
 *  - itPriority: string (itPriority)
 *  - ownerId: number | "unassigned" | "me"
 *  - sortBy / sort: string ("createdAt", "updatedAt", "itPriority", "requestedPriority", "ticketNumber", "summary", "status")
 *  - sortOrder / order / sortDir: "asc" | "desc" (default: "desc")
 *  - page: number (default: 1)
 *  - limit: number (default: 10)
 */
router.get('/tickets', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      search,
      category,
      status,
      priority,
      itPriority,
      ownerId,
      sortBy,
      sort,
      sortOrder,
      order,
      sortDir,
      page = '1',
      limit = '10',
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
      res.status(400).json({ error: 'Invalid pagination parameters: page and limit must be positive integers' });
      return;
    }

    const where: any = {};

    // 1. Search (ticketNumber or summary)
    if (search && typeof search === 'string' && search.trim() !== '') {
      const q = search.trim();
      where.OR = [
        { ticketNumber: { contains: q, mode: 'insensitive' } },
        { summary: { contains: q, mode: 'insensitive' } },
      ];
    }

    // 2. Category filter
    if (category !== undefined && category !== null && category !== '') {
      const catId = parseInt(category as string, 10);
      if (isNaN(catId)) {
        res.status(400).json({ error: 'Invalid category parameter: must be a number' });
        return;
      }
      where.categoryId = catId;
    }

    // 3. Status filter
    if (status && typeof status === 'string' && status.trim() !== '') {
      const normStatus = status.trim().toUpperCase().replace(/\s+/g, '_');
      if (!VALID_STATUSES[normStatus]) {
        res.status(400).json({ error: `Invalid status parameter: ${status}` });
        return;
      }
      where.currentStatus = VALID_STATUSES[normStatus];
    }

    // 4. Priority filter (requestedPriority)
    if (priority && typeof priority === 'string' && priority.trim() !== '') {
      const normPriority = priority.trim().toUpperCase();
      if (!VALID_PRIORITIES[normPriority]) {
        res.status(400).json({ error: `Invalid priority parameter: ${priority}` });
        return;
      }
      where.requestedPriority = VALID_PRIORITIES[normPriority];
    }

    // 5. IT Priority filter
    if (itPriority && typeof itPriority === 'string' && itPriority.trim() !== '') {
      const normItPriority = itPriority.trim().toUpperCase();
      if (!VALID_PRIORITIES[normItPriority]) {
        res.status(400).json({ error: `Invalid itPriority parameter: ${itPriority}` });
        return;
      }
      where.itPriority = VALID_PRIORITIES[normItPriority];
    }

    // 6. Owner filter (ownerId = unassigned | me | number)
    if (ownerId !== undefined && ownerId !== null && ownerId !== '') {
      const ownerStr = (ownerId as string).trim().toLowerCase();
      if (ownerStr === 'unassigned' || ownerStr === 'none' || ownerStr === 'null') {
        where.ownerId = null;
      } else if (ownerStr === 'me') {
        where.ownerId = req.user!.id;
      } else {
        const ownerNum = parseInt(ownerStr, 10);
        if (isNaN(ownerNum)) {
          res.status(400).json({ error: `Invalid ownerId parameter: ${ownerId}` });
          return;
        }
        where.ownerId = ownerNum;
      }
    }

    // 7. Sorting
    const rawSort = ((sortBy as string) || (sort as string) || 'createdAt').trim();
    const rawDir = ((sortOrder as string) || (order as string) || (sortDir as string) || 'desc').trim().toLowerCase();
    const dir: 'asc' | 'desc' = rawDir === 'asc' ? 'asc' : 'desc';

    const isPrioritySort = rawSort === 'itPriority' || rawSort === 'requestedPriority' || rawSort === 'priority';

    let tickets: any[];
    let totalCount: number;

    const includeRelations = {
      category: { select: { id: true, name: true } },
      relatedSystem: { select: { id: true, name: true } },
      owner: { select: { id: true, fullName: true, email: true, role: true } },
      requester: { select: { id: true, fullName: true, email: true } },
      requesterUser: { select: { id: true, name: true, email: true } },
      _count: {
        select: {
          publicComments: true,
          internalNotes: true,
          attachments: true,
        },
      },
    };

    if (isPrioritySort) {
      const priorityField = rawSort === 'itPriority' ? 'itPriority' : 'requestedPriority';
      const allMatching = await prisma.ticket.findMany({
        where,
        include: includeRelations,
      });

      totalCount = allMatching.length;

      allMatching.sort((a, b) => {
        const valA = a[priorityField] as TicketPriority | null;
        const valB = b[priorityField] as TicketPriority | null;
        const weightA = valA ? (PRIORITY_WEIGHTS[valA] ?? 0) : 0;
        const weightB = valB ? (PRIORITY_WEIGHTS[valB] ?? 0) : 0;
        return dir === 'asc' ? weightA - weightB : weightB - weightA;
      });

      tickets = allMatching.slice((pageNum - 1) * limitNum, pageNum * limitNum);
    } else {
      const orderBy: any = {};
      if (['ticketNumber', 'summary', 'createdAt', 'updatedAt'].includes(rawSort)) {
        orderBy[rawSort] = dir;
      } else if (rawSort === 'status' || rawSort === 'currentStatus') {
        orderBy['currentStatus'] = dir;
      } else {
        orderBy['createdAt'] = 'desc';
      }

      [totalCount, tickets] = await Promise.all([
        prisma.ticket.count({ where }),
        prisma.ticket.findMany({
          where,
          orderBy,
          skip: (pageNum - 1) * limitNum,
          take: limitNum,
          include: includeRelations,
        }),
      ]);
    }

    const totalPages = Math.ceil(totalCount / limitNum) || (totalCount === 0 ? 0 : 1);

    const formattedTickets = tickets.map((t) => ({
      id: t.id,
      ticketNumber: t.ticketNumber,
      summary: t.summary,
      description: t.description,
      status: t.currentStatus,
      currentStatus: t.currentStatus,
      requestedPriority: t.requestedPriority,
      itPriority: t.itPriority,
      resolutionSummary: t.resolutionSummary,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      categoryId: t.categoryId,
      category: t.category,
      relatedSystemId: t.relatedSystemId,
      relatedSystem: t.relatedSystem,
      ownerId: t.ownerId,
      owner: t.owner
        ? {
            id: t.owner.id,
            fullName: t.owner.fullName,
            name: t.owner.fullName,
            email: t.owner.email,
            role: t.owner.role,
          }
        : null,
      requesterId: t.userId || t.requesterId,
      requester: t.requester
        ? {
            id: t.requester.id,
            fullName: t.requester.fullName,
            name: t.requester.fullName,
            email: t.requester.email,
          }
        : t.requesterUser
        ? {
            id: t.requesterUser.id,
            fullName: t.requesterUser.name,
            name: t.requesterUser.name,
            email: t.requesterUser.email,
          }
        : null,
      counts: {
        publicComments: t._count?.publicComments ?? 0,
        internalNotes: t._count?.internalNotes ?? 0,
        attachments: t._count?.attachments ?? 0,
      },
    }));

    res.status(200).json({
      tickets: formattedTickets,
      data: formattedTickets,
      pagination: {
        total: totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages,
      },
      meta: {
        total: totalCount,
        totalCount,
        page: pageNum,
        limit: limitNum,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Staff ticket queue query error:', error);
    res.status(500).json({ error: 'Failed to retrieve IT Staff ticket queue' });
  }
});

export default router;
