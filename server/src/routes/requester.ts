import { Router, Response } from 'express';
import { PrismaClient, Role, TicketStatus } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Apply authenticate middleware to all requester routes
router.use(authenticate);

/**
 * GET /api/requester/dashboard (also aliased as /api/dashboard/requester)
 * Summarizes tickets owned by the authenticated requester with safe ownership fallback
 * across schema versions (matching userId, requesterUser.email, or requester.email to
 * avoid cross-table ID collisions).
 *
 * Authorized Roles: REQUESTER, IT_STAFF, ADMINISTRATOR (per api-spec.md §4.2)
 * Ownership Predicate (BR-13):
 *   ticket.userId === currentUser.id OR
 *   ticket.requesterUser?.email === currentUser.email OR
 *   ticket.requester?.email === currentUser.email
 */
router.get('/dashboard', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const currentUser = req.user!;
    const currentUserId = currentUser.id;
    const currentUserEmail = currentUser.email;

    // BR-13 Dual-Ownership & Legacy Safe Fallback
    const ownershipWhere = {
      OR: [
        { userId: currentUserId },
        { requesterUser: { email: currentUserEmail } },
        { requester: { email: currentUserEmail } },
      ],
    };

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const [
      totalOpenCount,
      waitingForRequesterCount,
      recentlyUpdatedCount,
      recentlyResolvedCount,
      closedCount,
      inProgressCount,
      actionRequiredTicketsRaw,
      recentTicketsRaw,
    ] = await Promise.all([
      // 1. Total Open: Active tickets not in terminal states (RESOLVED, CLOSED, CANCELLED)
      prisma.ticket.count({
        where: {
          ...ownershipWhere,
          currentStatus: {
            notIn: [TicketStatus.RESOLVED, TicketStatus.CLOSED, TicketStatus.CANCELLED],
          },
        },
      }),

      // 2. Waiting for Requester: Status is WAITING_FOR_REQUESTER
      prisma.ticket.count({
        where: {
          ...ownershipWhere,
          currentStatus: TicketStatus.WAITING_FOR_REQUESTER,
        },
      }),

      // 3. Recently Updated: Tickets updated within last 7 days
      prisma.ticket.count({
        where: {
          ...ownershipWhere,
          updatedAt: { gte: sevenDaysAgo },
        },
      }),

      // 4. Recently Resolved: Status is RESOLVED or CLOSED
      prisma.ticket.count({
        where: {
          ...ownershipWhere,
          currentStatus: { in: [TicketStatus.RESOLVED, TicketStatus.CLOSED] },
        },
      }),

      // 5. Closed / Cancelled
      prisma.ticket.count({
        where: {
          ...ownershipWhere,
          currentStatus: { in: [TicketStatus.CLOSED, TicketStatus.CANCELLED] },
        },
      }),

      // 6. In Progress (including waiting and pending)
      prisma.ticket.count({
        where: {
          ...ownershipWhere,
          currentStatus: {
            in: [
              TicketStatus.IN_PROGRESS,
              TicketStatus.WAITING_FOR_REQUESTER,
              TicketStatus.PENDING,
              TicketStatus.REOPENED,
            ],
          },
        },
      }),

      // 7. Action Required Tickets: top tickets waiting for requester input
      prisma.ticket.findMany({
        where: {
          ...ownershipWhere,
          currentStatus: TicketStatus.WAITING_FOR_REQUESTER,
        },
        orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
        take: 5,
        include: {
          category: { select: { id: true, name: true } },
          relatedSystem: { select: { id: true, name: true } },
        },
      }),

      // 8. Recent Tickets: top 5 tickets updated recently
      prisma.ticket.findMany({
        where: ownershipWhere,
        orderBy: [{ updatedAt: 'desc' }, { id: 'desc' }],
        take: 5,
        include: {
          category: { select: { id: true, name: true } },
          relatedSystem: { select: { id: true, name: true } },
        },
      }),
    ]);

    const formatTicket = (t: any) => ({
      id: t.id,
      ticketNumber: t.ticketNumber,
      summary: t.summary,
      title: t.summary,
      description: t.description,
      currentStatus: t.currentStatus,
      status: t.currentStatus,
      requestedPriority: t.requestedPriority,
      itPriority: t.itPriority,
      categoryId: t.categoryId,
      categoryName: t.category?.name || '',
      category: t.category ? { id: t.category.id, name: t.category.name } : null,
      relatedSystem: t.relatedSystem ? { id: t.relatedSystem.id, name: t.relatedSystem.name } : null,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
    });

    const actionRequiredTickets = actionRequiredTicketsRaw.map(formatTicket);
    const recentTickets = recentTicketsRaw.map(formatTicket);

    res.status(200).json({
      metrics: {
        totalOpenCount,
        totalOpen: totalOpenCount,
        myOpen: totalOpenCount,
        waitingForRequesterCount,
        waitingForRequester: waitingForRequesterCount,
        recentlyUpdatedCount,
        recentlyUpdated: recentlyUpdatedCount,
        recentlyResolvedCount,
        recentlyResolved: recentlyResolvedCount,
        resolved: recentlyResolvedCount,
        closed: closedCount,
        inProgress: inProgressCount,
      },
      actionRequiredTickets,
      recentTickets,
      quickActions: [
        { id: 'create-ticket', label: 'Create Ticket', url: '/tickets/new' },
        { id: 'view-tickets', label: 'View My Tickets', url: '/tickets' },
      ],
    });
  } catch (error) {
    console.error('Error fetching requester dashboard metrics:', error);
    res.status(500).json({ error: 'Failed to fetch requester dashboard metrics' });
  }
});

export default router;
