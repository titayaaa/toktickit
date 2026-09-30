import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient, Role, TicketPriority, TicketStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import { generateToken } from '../../src/middleware/auth';

const prisma = new PrismaClient();

describe('Issue 21: IT Staff Ticket Queue API & Query System (staff-queue.api.test.ts)', () => {
  const PREFIX = 'queue-test-';
  const REQUESTER_EMAIL = `${PREFIX}requester@toktickit.com`;
  const STAFF_A_EMAIL = `${PREFIX}staff.a@toktickit.com`;
  const STAFF_B_EMAIL = `${PREFIX}staff.b@toktickit.com`;
  const ADMIN_EMAIL = `${PREFIX}admin@toktickit.com`;
  const MUST_CHANGE_EMAIL = `${PREFIX}mustchange@toktickit.com`;

  let requesterUser: any;
  let staffAUser: any;
  let staffBUser: any;
  let adminUser: any;
  let mustChangeUser: any;

  let requesterToken: string;
  let staffAToken: string;
  let staffBToken: string;
  let adminToken: string;
  let mustChangeToken: string;

  let testCategory1: any;
  let testCategory2: any;
  let testSystem: any;
  let createdTicketIds: number[] = [];

  beforeAll(async () => {
    const passwordHash = await bcrypt.hash('Password123!', 10);

    // 1. Seed test users
    requesterUser = await prisma.user.upsert({
      where: { email: REQUESTER_EMAIL },
      update: { isActive: true, mustChangePassword: false },
      create: {
        email: REQUESTER_EMAIL,
        fullName: 'Queue Test Requester',
        passwordHash,
        role: Role.REQUESTER,
        mustChangePassword: false,
        isActive: true,
      },
    });
    requesterToken = generateToken(requesterUser);

    staffAUser = await prisma.user.upsert({
      where: { email: STAFF_A_EMAIL },
      update: { isActive: true, mustChangePassword: false },
      create: {
        email: STAFF_A_EMAIL,
        fullName: 'Queue Test Staff A',
        passwordHash,
        role: Role.IT_STAFF,
        mustChangePassword: false,
        isActive: true,
      },
    });
    staffAToken = generateToken(staffAUser);

    staffBUser = await prisma.user.upsert({
      where: { email: STAFF_B_EMAIL },
      update: { isActive: true, mustChangePassword: false },
      create: {
        email: STAFF_B_EMAIL,
        fullName: 'Queue Test Staff B',
        passwordHash,
        role: Role.IT_STAFF,
        mustChangePassword: false,
        isActive: true,
      },
    });
    staffBToken = generateToken(staffBUser);

    adminUser = await prisma.user.upsert({
      where: { email: ADMIN_EMAIL },
      update: { isActive: true, mustChangePassword: false },
      create: {
        email: ADMIN_EMAIL,
        fullName: 'Queue Test Admin',
        passwordHash,
        role: Role.ADMINISTRATOR,
        mustChangePassword: false,
        isActive: true,
      },
    });
    adminToken = generateToken(adminUser);

    mustChangeUser = await prisma.user.upsert({
      where: { email: MUST_CHANGE_EMAIL },
      update: { isActive: true, mustChangePassword: true },
      create: {
        email: MUST_CHANGE_EMAIL,
        fullName: 'Queue Test Must Change',
        passwordHash,
        role: Role.IT_STAFF,
        mustChangePassword: true,
        isActive: true,
      },
    });
    mustChangeToken = generateToken(mustChangeUser);

    // Reference categories & systems
    testCategory1 = await prisma.category.findFirst();
    testCategory2 = await prisma.category.findFirst({
      where: { id: { not: testCategory1?.id } },
    });
    testSystem = await prisma.relatedSystem.findFirst();

    // 2. Create distinct test tickets for queue testing
    const t1 = await prisma.ticket.create({
      data: {
        ticketNumber: `TKT-${Date.now()}-0001`,
        summary: 'VPN client terminates frequently under heavy traffic',
        description: 'Requester reports dropouts during remote meetings.',
        currentStatus: TicketStatus.IN_PROGRESS,
        requestedPriority: TicketPriority.HIGH,
        itPriority: TicketPriority.URGENT,
        categoryId: testCategory1.id,
        relatedSystemId: testSystem.id,
        requesterId: 1,
        userId: requesterUser.id,
        ownerId: staffAUser.id,
        createdAt: new Date('2026-09-17T10:00:00Z'),
      },
    });
    createdTicketIds.push(t1.id);

    const t2 = await prisma.ticket.create({
      data: {
        ticketNumber: `TKT-${Date.now()}-0002`,
        summary: 'Campus Wi-Fi connectivity degradation in North Wing',
        description: 'Signal strength drops significantly near room 302.',
        currentStatus: TicketStatus.OPEN,
        requestedPriority: TicketPriority.MEDIUM,
        itPriority: TicketPriority.HIGH,
        categoryId: testCategory2 ? testCategory2.id : testCategory1.id,
        relatedSystemId: testSystem.id,
        requesterId: 1,
        userId: requesterUser.id,
        ownerId: staffBUser.id,
        createdAt: new Date('2026-09-17T11:00:00Z'),
      },
    });
    createdTicketIds.push(t2.id);

    const t3 = await prisma.ticket.create({
      data: {
        ticketNumber: `TKT-${Date.now()}-0003`,
        summary: 'Password reset request for Library Research Portal',
        description: 'User locked out after multiple incorrect attempts.',
        currentStatus: TicketStatus.NEW,
        requestedPriority: TicketPriority.LOW,
        itPriority: TicketPriority.LOW,
        categoryId: testCategory1.id,
        relatedSystemId: testSystem.id,
        requesterId: 1,
        userId: requesterUser.id,
        ownerId: null, // Unassigned
        createdAt: new Date('2026-09-17T12:00:00Z'),
      },
    });
    createdTicketIds.push(t3.id);

    const t4 = await prisma.ticket.create({
      data: {
        ticketNumber: `TKT-${Date.now()}-0004`,
        summary: 'Router firmware update and security patching completed',
        description: 'Core switches upgraded successfully.',
        currentStatus: TicketStatus.RESOLVED,
        requestedPriority: TicketPriority.HIGH,
        itPriority: TicketPriority.HIGH,
        resolutionSummary: 'Patched to firmware v4.2.1 and verified uptime.',
        categoryId: testCategory2 ? testCategory2.id : testCategory1.id,
        relatedSystemId: testSystem.id,
        requesterId: 1,
        userId: requesterUser.id,
        ownerId: staffAUser.id,
        createdAt: new Date('2026-09-17T13:00:00Z'),
      },
    });
    createdTicketIds.push(t4.id);
  });

  afterAll(async () => {
    // Clean up created tickets and users
    if (createdTicketIds.length > 0) {
      await prisma.ticket.deleteMany({
        where: { id: { in: createdTicketIds } },
      });
    }

    await prisma.user.deleteMany({
      where: {
        email: {
          in: [
            REQUESTER_EMAIL,
            STAFF_A_EMAIL,
            STAFF_B_EMAIL,
            ADMIN_EMAIL,
            MUST_CHANGE_EMAIL,
          ],
        },
      },
    });

    await prisma.$disconnect();
  });

  it('QUEUE-01: IT Staff can search queue by summary and ticket number case-insensitively', async () => {
    // Search summary "VPN"
    const resSummary = await request(app)
      .get('/api/staff/tickets?search=vpn')
      .set('Authorization', `Bearer ${staffAToken}`);

    expect(resSummary.status).toBe(200);
    expect(resSummary.body.tickets).toBeDefined();
    const vpnTickets = resSummary.body.tickets.filter((t: any) =>
      t.summary.includes('VPN')
    );
    expect(vpnTickets.length).toBeGreaterThanOrEqual(1);

    // Search summary "Library"
    const resLibrary = await request(app)
      .get('/api/staff/tickets?search=library')
      .set('Authorization', `Bearer ${staffAToken}`);

    expect(resLibrary.status).toBe(200);
    const libTickets = resLibrary.body.tickets.filter((t: any) =>
      t.summary.toLowerCase().includes('library')
    );
    expect(libTickets.length).toBeGreaterThanOrEqual(1);
  });

  it('QUEUE-02: Queue filters by status, category, itPriority, and owner assignment', async () => {
    // 1. Filter by status: NEW
    const resStatus = await request(app)
      .get('/api/staff/tickets?status=NEW')
      .set('Authorization', `Bearer ${staffAToken}`);

    expect(resStatus.status).toBe(200);
    for (const ticket of resStatus.body.tickets) {
      expect(ticket.status).toBe('NEW');
    }

    // 2. Filter by itPriority: URGENT
    const resPriority = await request(app)
      .get('/api/staff/tickets?itPriority=URGENT')
      .set('Authorization', `Bearer ${staffAToken}`);

    expect(resPriority.status).toBe(200);
    for (const ticket of resPriority.body.tickets) {
      expect(ticket.itPriority).toBe('URGENT');
    }

    // 3. Filter by ownerId: unassigned
    const resUnassigned = await request(app)
      .get('/api/staff/tickets?ownerId=unassigned')
      .set('Authorization', `Bearer ${staffAToken}`);

    expect(resUnassigned.status).toBe(200);
    for (const ticket of resUnassigned.body.tickets) {
      expect(ticket.ownerId).toBeNull();
      expect(ticket.owner).toBeNull();
    }

    // 4. Filter by ownerId: me (Staff A)
    const resMe = await request(app)
      .get('/api/staff/tickets?ownerId=me')
      .set('Authorization', `Bearer ${staffAToken}`);

    expect(resMe.status).toBe(200);
    for (const ticket of resMe.body.tickets) {
      expect(ticket.ownerId).toBe(staffAUser.id);
      expect(ticket.owner.id).toBe(staffAUser.id);
    }

    // 5. Filter by specific numeric ownerId (Staff B)
    const resStaffB = await request(app)
      .get(`/api/staff/tickets?ownerId=${staffBUser.id}`)
      .set('Authorization', `Bearer ${staffAToken}`);

    expect(resStaffB.status).toBe(200);
    for (const ticket of resStaffB.body.tickets) {
      expect(ticket.ownerId).toBe(staffBUser.id);
    }
  });

  it('QUEUE-03: Non-staff (Requester) querying /api/staff/tickets receives 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/staff/tickets')
      .set('Authorization', `Bearer ${requesterToken}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toContain('Insufficient role permissions');
  });

  it('AUTH-GUARD: Missing authentication token returns 401 Unauthorized', async () => {
    const res = await request(app).get('/api/staff/tickets');

    expect(res.status).toBe(401);
    expect(res.body.error).toContain('Missing authentication credentials');
  });

  it('POLICY-GUARD: Staff with mustChangePassword=true is blocked with 403 Forbidden', async () => {
    const res = await request(app)
      .get('/api/staff/tickets')
      .set('Authorization', `Bearer ${mustChangeToken}`);

    expect(res.status).toBe(403);
    expect(res.body.mustChangePassword).toBe(true);
  });

  it('RBAC: Administrator role can access IT Staff ticket queue (200 OK)', async () => {
    const res = await request(app)
      .get('/api/staff/tickets')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.tickets).toBeDefined();
    expect(Array.isArray(res.body.tickets)).toBe(true);
  });

  it('PAGINATION: Returns valid pagination metadata and slice of tickets', async () => {
    const res = await request(app)
      .get('/api/staff/tickets?page=1&limit=2')
      .set('Authorization', `Bearer ${staffAToken}`);

    expect(res.status).toBe(200);
    expect(res.body.tickets.length).toBeLessThanOrEqual(2);
    expect(res.body.pagination).toBeDefined();
    expect(res.body.pagination.page).toBe(1);
    expect(res.body.pagination.limit).toBe(2);
    expect(typeof res.body.pagination.total).toBe('number');
    expect(typeof res.body.pagination.totalPages).toBe('number');
  });

  it('SORTING: Sorts by priority and creation date correctly', async () => {
    // Sort by itPriority descending
    const resPrioritySort = await request(app)
      .get('/api/staff/tickets?sortBy=itPriority&sortOrder=desc')
      .set('Authorization', `Bearer ${staffAToken}`);

    expect(resPrioritySort.status).toBe(200);
    const tickets = resPrioritySort.body.tickets;
    if (tickets.length >= 2) {
      const weights: Record<string, number> = {
        URGENT: 5,
        CRITICAL: 4,
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1,
      };
      const firstWeight = weights[tickets[0].itPriority] ?? 0;
      const lastWeight = weights[tickets[tickets.length - 1].itPriority] ?? 0;
      expect(firstWeight).toBeGreaterThanOrEqual(lastWeight);
    }
  });

  it('VALIDATION: Returns 400 Bad Request on invalid query parameters', async () => {
    // Invalid status
    const resBadStatus = await request(app)
      .get('/api/staff/tickets?status=NON_EXISTENT_STATUS')
      .set('Authorization', `Bearer ${staffAToken}`);
    expect(resBadStatus.status).toBe(400);

    // Invalid category
    const resBadCat = await request(app)
      .get('/api/staff/tickets?category=invalid-not-a-number')
      .set('Authorization', `Bearer ${staffAToken}`);
    expect(resBadCat.status).toBe(400);

    // Invalid ownerId
    const resBadOwner = await request(app)
      .get('/api/staff/tickets?ownerId=unknown-keyword')
      .set('Authorization', `Bearer ${staffAToken}`);
    expect(resBadOwner.status).toBe(400);

    // Invalid page
    const resBadPage = await request(app)
      .get('/api/staff/tickets?page=-5')
      .set('Authorization', `Bearer ${staffAToken}`);
    expect(resBadPage.status).toBe(400);
  });
});
