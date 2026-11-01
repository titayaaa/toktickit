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
 * GET /api/staff/users
 * Returns active IT Staff and Administrator users for ticket assignment
 */
router.get('/users', async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const staffMembers = await prisma.user.findMany({
      where: {
        isActive: true,
        role: { in: [Role.IT_STAFF, Role.ADMINISTRATOR] },
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
      orderBy: { fullName: 'asc' },
    });
    res.status(200).json(staffMembers);
  } catch (error) {
    console.error('Error fetching staff users:', error);
    res.status(500).json({ error: 'Failed to fetch staff members' });
  }
});

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

// State Transition Matrix per BR-11
const VALID_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  NEW: [TicketStatus.OPEN, TicketStatus.CANCELLED],
  OPEN: [TicketStatus.IN_PROGRESS, TicketStatus.WAITING_FOR_REQUESTER, TicketStatus.PENDING, TicketStatus.CANCELLED],
  IN_PROGRESS: [TicketStatus.WAITING_FOR_REQUESTER, TicketStatus.PENDING, TicketStatus.RESOLVED, TicketStatus.CANCELLED],
  WAITING_FOR_REQUESTER: [TicketStatus.IN_PROGRESS, TicketStatus.PENDING, TicketStatus.RESOLVED, TicketStatus.CANCELLED],
  PENDING: [TicketStatus.IN_PROGRESS, TicketStatus.WAITING_FOR_REQUESTER, TicketStatus.RESOLVED, TicketStatus.CANCELLED],
  RESOLVED: [TicketStatus.CLOSED, TicketStatus.REOPENED],
  REOPENED: [TicketStatus.IN_PROGRESS, TicketStatus.PENDING, TicketStatus.RESOLVED, TicketStatus.CANCELLED],
  CLOSED: [],
  CANCELLED: [],
};

/**
 * PATCH /api/staff/tickets/:id/claim
 * IT Staff / Admin claims an unassigned ticket. Sets ownerId = req.user.id.
 * If current status is NEW, automatically transitions to OPEN.
 */
router.patch('/tickets/:id/claim', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(400).json({ error: 'Invalid ticket ID' });
      return;
    }

    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const newStatus = ticket.currentStatus === TicketStatus.NEW ? TicketStatus.OPEN : ticket.currentStatus;

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ownerId: req.user!.id,
        currentStatus: newStatus,
      },
      include: {
        category: true,
        relatedSystem: true,
        requester: { select: { id: true, fullName: true, email: true } },
        owner: { select: { id: true, fullName: true, email: true } },
      },
    });

    res.status(200).json({
      message: 'Ticket claimed successfully',
      ticket: updated,
      data: updated,
    });
  } catch (error) {
    console.error('Error claiming ticket:', error);
    res.status(500).json({ error: 'Failed to claim ticket' });
  }
});

/**
 * PATCH /api/staff/tickets/:id/assign
 * IT Staff / Admin assigns ticket to an active IT Staff or Administrator.
 */
router.patch('/tickets/:id/assign', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(400).json({ error: 'Invalid ticket ID' });
      return;
    }

    const { ownerId } = req.body;
    let targetOwnerId: number | null = null;

    if (ownerId !== null && ownerId !== undefined) {
      const parsedId = Number(ownerId);
      if (isNaN(parsedId) || parsedId <= 0) {
        res.status(400).json({ error: 'Invalid ownerId' });
        return;
      }
      const targetUser = await prisma.user.findUnique({ where: { id: parsedId } });
      if (!targetUser || !targetUser.isActive || targetUser.role === Role.REQUESTER) {
        res.status(422).json({
          error: 'Invalid assignee: User must be an active IT Staff member or Administrator',
        });
        return;
      }
      targetOwnerId = targetUser.id;
    }

    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        ownerId: targetOwnerId,
      },
      include: {
        category: true,
        relatedSystem: true,
        requester: { select: { id: true, fullName: true, email: true } },
        owner: { select: { id: true, fullName: true, email: true } },
      },
    });

    res.status(200).json({
      message: 'Ticket assigned successfully',
      ticket: updated,
      data: updated,
    });
  } catch (error) {
    console.error('Error assigning ticket:', error);
    res.status(500).json({ error: 'Failed to assign ticket' });
  }
});

/**
 * PATCH /api/staff/tickets/:id/priority
 * IT Staff / Admin updates IT Priority.
 */
router.patch('/tickets/:id/priority', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(400).json({ error: 'Invalid ticket ID' });
      return;
    }

    const { itPriority, priority } = req.body;
    const rawPriority = itPriority || priority;
    if (!rawPriority || typeof rawPriority !== 'string') {
      res.status(400).json({ error: 'Missing or invalid priority value' });
      return;
    }

    const normalized = rawPriority.trim().toUpperCase();
    if (!VALID_PRIORITIES[normalized]) {
      res.status(400).json({ error: `Invalid priority value: ${rawPriority}` });
      return;
    }

    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        itPriority: VALID_PRIORITIES[normalized],
      },
      include: {
        category: true,
        relatedSystem: true,
        requester: { select: { id: true, fullName: true, email: true } },
        owner: { select: { id: true, fullName: true, email: true } },
      },
    });

    res.status(200).json({
      message: 'IT priority updated successfully',
      ticket: updated,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating ticket priority:', error);
    res.status(500).json({ error: 'Failed to update priority' });
  }
});

/**
 * PATCH /api/staff/tickets/:id/status
 * IT Staff / Admin updates status per state transition matrix.
 * Enforces rejection of RESOLVED via this endpoint (must use /resolve).
 */
router.patch('/tickets/:id/status', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(400).json({ error: 'Invalid ticket ID' });
      return;
    }

    const { status, expectedUpdatedAt } = req.body;
    if (!status || typeof status !== 'string') {
      res.status(400).json({ error: 'Missing or invalid status parameter' });
      return;
    }

    const normalizedStatus = status.trim().toUpperCase().replace(/\s+/g, '_');
    if (!VALID_STATUSES[normalizedStatus]) {
      res.status(400).json({ error: `Invalid status parameter: ${status}` });
      return;
    }

    const targetStatus = VALID_STATUSES[normalizedStatus];

    // Reject direct transition to RESOLVED without resolutionSummary
    if (targetStatus === TicketStatus.RESOLVED) {
      res.status(422).json({
        error: 'Resolving a ticket requires a resolution summary. Please use the /resolve endpoint.',
      });
      return;
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { actionsTaken: true },
    });
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    // Terminal states cannot be changed
    if (ticket.currentStatus === TicketStatus.CLOSED || ticket.currentStatus === TicketStatus.CANCELLED) {
      res.status(422).json({
        error: `Cannot modify status of a ${ticket.currentStatus.toLowerCase()} ticket`,
      });
      return;
    }

    // Validate state transition matrix
    const allowedNextStatuses = VALID_TRANSITIONS[ticket.currentStatus] || [];
    if (!allowedNextStatuses.includes(targetStatus)) {
      res.status(422).json({
        error: `Invalid status transition from ${ticket.currentStatus} to ${targetStatus}`,
      });
      return;
    }

    // Concurrency Check (BR-14)
    if (expectedUpdatedAt && typeof expectedUpdatedAt === 'string') {
      const clientTime = new Date(expectedUpdatedAt).getTime();
      const serverTime = new Date(ticket.updatedAt).getTime();
      if (!isNaN(clientTime) && Math.abs(clientTime - serverTime) > 1000) {
        res.status(409).json({
          error: 'Ticket has been modified by another user. Please refresh and try again.',
          code: 'STALE_UPDATE_CONFLICT',
          currentUpdatedAt: ticket.updatedAt.toISOString(),
        });
        return;
      }
    }

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        currentStatus: targetStatus,
      },
      include: {
        category: true,
        relatedSystem: true,
        requester: { select: { id: true, fullName: true, email: true } },
        owner: { select: { id: true, fullName: true, email: true } },
        actionsTaken: true,
      },
    });

    res.status(200).json({
      message: 'Ticket status updated successfully',
      ticket: updated,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating ticket status:', error);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

/**
 * PATCH /api/staff/tickets/:id/resolve
 * IT Staff / Admin transitions status to RESOLVED with required resolutionSummary (3-500 chars).
 * Enforces Resolution Gate (BR-09) and Optimistic Concurrency (BR-14).
 */
router.patch('/tickets/:id/resolve', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(400).json({ error: 'Invalid ticket ID' });
      return;
    }

    const { resolutionSummary, expectedUpdatedAt } = req.body;
    if (
      !resolutionSummary ||
      typeof resolutionSummary !== 'string' ||
      resolutionSummary.trim().length < 3 ||
      resolutionSummary.trim().length > 500
    ) {
      res.status(422).json({
        error: 'Resolution summary must be a non-empty string between 3 and 500 characters',
      });
      return;
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { actionsTaken: true },
    });
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    // Check if terminal
    if (ticket.currentStatus === TicketStatus.CLOSED || ticket.currentStatus === TicketStatus.CANCELLED) {
      res.status(422).json({
        error: `Cannot resolve a ${ticket.currentStatus.toLowerCase()} ticket`,
      });
      return;
    }

    const allowedNextStatuses = VALID_TRANSITIONS[ticket.currentStatus] || [];
    if (!allowedNextStatuses.includes(TicketStatus.RESOLVED)) {
      res.status(422).json({
        error: `Cannot transition from ${ticket.currentStatus} to RESOLVED`,
      });
      return;
    }

    // Concurrency Check (BR-14)
    if (expectedUpdatedAt && typeof expectedUpdatedAt === 'string') {
      const clientTime = new Date(expectedUpdatedAt).getTime();
      const serverTime = new Date(ticket.updatedAt).getTime();
      if (!isNaN(clientTime) && Math.abs(clientTime - serverTime) > 1000) {
        res.status(409).json({
          error: 'Ticket has been modified by another user. Please refresh and try again.',
          code: 'STALE_UPDATE_CONFLICT',
          currentUpdatedAt: ticket.updatedAt.toISOString(),
        });
        return;
      }
    }

    // Resolution Gate Check (BR-09)
    const activeActions = ticket.actionsTaken.filter(
      (a) => a.status === 'PENDING' || a.status === 'IN_PROGRESS'
    );
    if (activeActions.length > 0) {
      res.status(409).json({
        error: 'Cannot resolve ticket while unresolved actions taken exist. All actions must be COMPLETED or CANCELLED.',
        code: 'RESOLUTION_GATE_BLOCKED',
        unresolvedCount: activeActions.length,
        blockingActions: activeActions.map((a) => ({
          id: a.id,
          status: a.status,
          description: a.actionDescription,
        })),
      });
      return;
    }

    const updated = await prisma.ticket.update({
      where: { id: ticketId },
      data: {
        currentStatus: TicketStatus.RESOLVED,
        resolutionSummary: resolutionSummary.trim(),
      },
      include: {
        category: true,
        relatedSystem: true,
        requester: { select: { id: true, fullName: true, email: true } },
        owner: { select: { id: true, fullName: true, email: true } },
        actionsTaken: true,
      },
    });

    res.status(200).json({
      message: 'Ticket resolved successfully',
      ticket: updated,
      data: updated,
    });
  } catch (error) {
    console.error('Error resolving ticket:', error);
    res.status(500).json({ error: 'Failed to resolve ticket' });
  }
});

/**
 * GET /api/staff/dashboard
 * Operational metrics, urgent tickets, assigned actions, and recent tickets for IT Staff & Administrators (Issue 32)
 */
router.get('/dashboard', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const currentUserId = req.user!.id;

    const nonTerminalStatus = {
      notIn: [TicketStatus.RESOLVED, TicketStatus.CLOSED, TicketStatus.CANCELLED],
    };

    const [
      unassignedTicketsCount,
      myAssignedTicketsCount,
      urgentTicketsCount,
      myPendingActionsCount,
      openTicketsCount,
      inProgressTicketsCount,
      urgentTickets,
      myAssignedActions,
      recentTickets,
    ] = await Promise.all([
      // Unassigned active tickets
      prisma.ticket.count({
        where: {
          ownerId: null,
          currentStatus: nonTerminalStatus,
        },
      }),
      // My assigned active tickets
      prisma.ticket.count({
        where: {
          ownerId: currentUserId,
          currentStatus: nonTerminalStatus,
        },
      }),
      // Urgent active tickets
      prisma.ticket.count({
        where: {
          itPriority: TicketPriority.URGENT,
          currentStatus: nonTerminalStatus,
        },
      }),
      // My pending or in-progress actions
      prisma.actionTaken.count({
        where: {
          assigneeId: currentUserId,
          status: { in: ['PENDING', 'IN_PROGRESS'] },
        },
      }),
      // Open / New tickets
      prisma.ticket.count({
        where: {
          currentStatus: { in: [TicketStatus.NEW, TicketStatus.OPEN] },
        },
      }),
      // In progress / waiting tickets
      prisma.ticket.count({
        where: {
          currentStatus: { in: [TicketStatus.IN_PROGRESS, TicketStatus.WAITING_FOR_REQUESTER, TicketStatus.PENDING] },
        },
      }),
      // Top 5 Urgent Tickets
      prisma.ticket.findMany({
        where: {
          itPriority: TicketPriority.URGENT,
          currentStatus: nonTerminalStatus,
        },
        orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
        take: 5,
        include: {
          category: { select: { id: true, name: true } },
          relatedSystem: { select: { id: true, name: true } },
          owner: { select: { id: true, fullName: true, email: true } },
          requester: { select: { id: true, fullName: true, email: true } },
        },
      }),
      // Top 5 My Assigned Actions
      prisma.actionTaken.findMany({
        where: {
          assigneeId: currentUserId,
          status: { in: ['PENDING', 'IN_PROGRESS'] },
        },
        orderBy: [{ actionDateTime: 'desc' }, { id: 'desc' }],
        take: 5,
        include: {
          ticket: {
            select: {
              id: true,
              ticketNumber: true,
              summary: true,
              currentStatus: true,
              itPriority: true,
            },
          },
        },
      }),
      // Top 5 Recent Tickets
      prisma.ticket.findMany({
        orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
        take: 5,
        include: {
          category: { select: { id: true, name: true } },
          relatedSystem: { select: { id: true, name: true } },
          owner: { select: { id: true, fullName: true, email: true } },
          requester: { select: { id: true, fullName: true, email: true } },
        },
      }),
    ]);

    const formattedUrgent = urgentTickets.map((t) => ({
      id: t.id,
      ticketNumber: t.ticketNumber,
      summary: t.summary,
      itPriority: t.itPriority,
      currentStatus: t.currentStatus,
      category: t.category,
      relatedSystem: t.relatedSystem,
      owner: t.owner,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    }));

    const formattedActions = myAssignedActions.map((a) => ({
      id: a.id,
      ticketId: a.ticketId,
      ticketNumber: a.ticket.ticketNumber,
      ticketSummary: a.ticket.summary,
      actionDescription: a.actionDescription,
      status: a.status,
      actionDateTime: a.actionDateTime.toISOString(),
    }));

    const formattedRecent = recentTickets.map((t) => ({
      id: t.id,
      ticketNumber: t.ticketNumber,
      summary: t.summary,
      itPriority: t.itPriority,
      currentStatus: t.currentStatus,
      category: t.category,
      relatedSystem: t.relatedSystem,
      owner: t.owner,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    }));

    res.status(200).json({
      metrics: {
        unassignedTicketsCount,
        myAssignedTicketsCount,
        urgentTicketsCount,
        myPendingActionsCount,
        openTicketsCount,
        inProgressTicketsCount,
        unassigned: unassignedTicketsCount,
        myAssigned: myAssignedTicketsCount,
        urgent: urgentTicketsCount,
        myPendingActions: myPendingActionsCount,
        open: openTicketsCount,
        inProgress: inProgressTicketsCount,
      },
      urgentTickets: formattedUrgent,
      myAssignedActions: formattedActions,
      recentTickets: formattedRecent,
    });
  } catch (error) {
    console.error('Error fetching IT Staff dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch IT Staff dashboard metrics' });
  }
});

export default router;


