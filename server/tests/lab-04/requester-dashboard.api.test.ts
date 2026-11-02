import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient, Role, TicketPriority, TicketStatus } from '@prisma/client';
import app from '../../src/app';
import { generateToken } from '../../src/middleware/auth';

const prisma = new PrismaClient();

describe('Issue 33 / PR-07: Requester Dashboard API & Metrics (API-12, BR-13, AC-10)', () => {
  let dbAvailable = false;
  let requesterUser: any;
  let otherRequesterUser: any;
  let reqJennifer: any;
  let reqOther: any;
  let adminUser: any;
  let requesterToken: string;
  let otherRequesterToken: string;
  let adminToken: string;
  let category: any;
  let relatedSystem: any;
  let testTicketIds: number[] = [];

  beforeAll(async () => {
    try {
      await prisma.$connect();
      requesterUser = await prisma.user.findFirst({
        where: { role: Role.REQUESTER, isActive: true },
      });
      if (!requesterUser) {
        console.warn('Seed data not found. Skipping DB tests.');
        return;
      }
      dbAvailable = true;

      category = await prisma.category.findFirst({ where: { isActive: true } });
      relatedSystem = await prisma.relatedSystem.findFirst({ where: { isActive: true } });

      adminUser = await prisma.user.findFirst({
        where: { role: Role.ADMINISTRATOR, isActive: true },
      });

      // Find or create RequesterUser for requesterUser
      reqJennifer = await prisma.requesterUser.findFirst({
        where: { email: requesterUser.email },
      });
      if (!reqJennifer) {
        reqJennifer = await prisma.requesterUser.create({
          data: { name: requesterUser.fullName, email: requesterUser.email, isActive: true },
        });
      }

      // Create a second requester user to test data isolation
      otherRequesterUser = await prisma.user.findUnique({
        where: { email: 'other.requester@toktickit.com' },
      });
      if (!otherRequesterUser) {
        otherRequesterUser = await prisma.user.create({
          data: {
            email: 'other.requester@toktickit.com',
            fullName: 'Other Requester',
            passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz0123456789',
            role: Role.REQUESTER,
            isActive: true,
          },
        });
      }

      reqOther = await prisma.requesterUser.findFirst({
        where: { email: otherRequesterUser.email },
      });
      if (!reqOther) {
        reqOther = await prisma.requesterUser.create({
          data: { name: otherRequesterUser.fullName, email: otherRequesterUser.email, isActive: true },
        });
      }

      requesterToken = generateToken({
        id: requesterUser.id,
        email: requesterUser.email,
        role: requesterUser.role,
      });

      otherRequesterToken = generateToken({
        id: otherRequesterUser.id,
        email: otherRequesterUser.email,
        role: otherRequesterUser.role,
      });

      adminToken = generateToken({
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role,
      });

      // Create distinct test tickets for requesterUser
      // Ticket 1: OPEN
      const t1 = await prisma.ticket.create({
        data: {
          ticketNumber: `REQ-DASH-${Date.now()}-1`,
          summary: 'Requester Dashboard Test Ticket 1 (Open)',
          description: 'Testing open count on dashboard',
          requestedPriority: TicketPriority.MEDIUM,
          currentStatus: TicketStatus.OPEN,
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
        },
      });
      testTicketIds.push(t1.id);

      // Ticket 2: WAITING_FOR_REQUESTER
      const t2 = await prisma.ticket.create({
        data: {
          ticketNumber: `REQ-DASH-${Date.now()}-2`,
          summary: 'Requester Dashboard Test Ticket 2 (Waiting)',
          description: 'Testing waiting for requester count and attention banner',
          requestedPriority: TicketPriority.HIGH,
          currentStatus: TicketStatus.WAITING_FOR_REQUESTER,
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
        },
      });
      testTicketIds.push(t2.id);

      // Ticket 3: RESOLVED
      const t3 = await prisma.ticket.create({
        data: {
          ticketNumber: `REQ-DASH-${Date.now()}-3`,
          summary: 'Requester Dashboard Test Ticket 3 (Resolved)',
          description: 'Testing resolved count on dashboard',
          requestedPriority: TicketPriority.LOW,
          currentStatus: TicketStatus.RESOLVED,
          resolutionSummary: 'Resolved via test script',
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
        },
      });
      testTicketIds.push(t3.id);

      // Ticket 4: Owned by Other Requester (Isolation check)
      const t4 = await prisma.ticket.create({
        data: {
          ticketNumber: `REQ-DASH-${Date.now()}-4`,
          summary: 'Other Requester Test Ticket',
          description: 'Should not appear in requesterUser dashboard',
          requestedPriority: TicketPriority.HIGH,
          currentStatus: TicketStatus.WAITING_FOR_REQUESTER,
          requesterId: reqOther.id,
          userId: otherRequesterUser.id,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
        },
      });
      testTicketIds.push(t4.id);
    } catch (e) {
      console.warn('DB initialization error:', e);
      dbAvailable = false;
    }
  });

  afterAll(async () => {
    try {
      if (testTicketIds.length > 0) {
        await prisma.ticket.deleteMany({
          where: { id: { in: testTicketIds } },
        });
      }
      await prisma.$disconnect();
    } catch {
      // ignore cleanup errors
    }
  });

  it('API-12: Reject unauthenticated request with 401 Unauthorized', async () => {
    const res = await request(app).get('/api/requester/dashboard');
    expect(res.status).toBe(401);
  });

  it('API-12: Authenticated requester receives 200 OK with accurate metrics and top lists', async () => {
    if (!dbAvailable) return;

    const res = await request(app)
      .get('/api/requester/dashboard')
      .set('Authorization', `Bearer ${requesterToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('metrics');
    expect(res.body).toHaveProperty('actionRequiredTickets');
    expect(res.body).toHaveProperty('recentTickets');
    expect(res.body).toHaveProperty('quickActions');

    const { metrics, actionRequiredTickets, recentTickets, quickActions } = res.body;

    // Check metric fields
    expect(metrics).toHaveProperty('totalOpenCount');
    expect(metrics).toHaveProperty('waitingForRequesterCount');
    expect(metrics).toHaveProperty('recentlyUpdatedCount');
    expect(metrics).toHaveProperty('recentlyResolvedCount');

    // Values should be >= our created test tickets
    expect(metrics.totalOpenCount).toBeGreaterThanOrEqual(2); // t1 (OPEN) + t2 (WAITING_FOR_REQUESTER)
    expect(metrics.waitingForRequesterCount).toBeGreaterThanOrEqual(1); // t2
    expect(metrics.recentlyResolvedCount).toBeGreaterThanOrEqual(1); // t3

    // Action required tickets should include t2 and have currentStatus = WAITING_FOR_REQUESTER
    expect(Array.isArray(actionRequiredTickets)).toBe(true);
    const hasT2 = actionRequiredTickets.some((t: any) => t.id === testTicketIds[1]);
    expect(hasT2).toBe(true);

    // Recent tickets should include recent items and be <= 5
    expect(Array.isArray(recentTickets)).toBe(true);
    expect(recentTickets.length).toBeLessThanOrEqual(5);

    // Quick actions should have create-ticket and view-tickets
    expect(Array.isArray(quickActions)).toBe(true);
    const actionIds = quickActions.map((a: any) => a.id);
    expect(actionIds).toContain('create-ticket');
    expect(actionIds).toContain('view-tickets');
  });

  it('API-12: Alias route /api/dashboard/requester works equivalently', async () => {
    if (!dbAvailable) return;

    const res = await request(app)
      .get('/api/dashboard/requester')
      .set('Authorization', `Bearer ${requesterToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('metrics');
    expect(res.body.metrics.totalOpenCount).toBeGreaterThanOrEqual(2);
  });

  it('BR-13 / AC-10: Enforce strict requester data isolation across users', async () => {
    if (!dbAvailable) return;

    const res = await request(app)
      .get('/api/requester/dashboard')
      .set('Authorization', `Bearer ${otherRequesterToken}`);

    expect(res.status).toBe(200);

    // Other requester should only see their own tickets (t4)
    const { actionRequiredTickets, recentTickets } = res.body;
    const ticketIdsInDashboard = [
      ...actionRequiredTickets.map((t: any) => t.id),
      ...recentTickets.map((t: any) => t.id),
    ];

    // None of requesterUser's test tickets (t1, t2, t3) should be visible to otherRequester
    expect(ticketIdsInDashboard).not.toContain(testTicketIds[0]);
    expect(ticketIdsInDashboard).not.toContain(testTicketIds[1]);
    expect(ticketIdsInDashboard).not.toContain(testTicketIds[2]);

    // t4 should be visible
    expect(ticketIdsInDashboard).toContain(testTicketIds[3]);
  });

  it('API-12: Administrators can access requester dashboard for own requests', async () => {
    if (!dbAvailable) return;

    const res = await request(app)
      .get('/api/requester/dashboard')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('metrics');
    expect(res.body).toHaveProperty('actionRequiredTickets');
    expect(res.body).toHaveProperty('recentTickets');
  });
});
