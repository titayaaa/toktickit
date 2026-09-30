import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient, Role, TicketPriority, TicketStatus } from '@prisma/client';
import app from '../../src/app';
import { generateToken } from '../../src/middleware/auth';

const prisma = new PrismaClient();

describe('Issue 23: Ticket Operations, Ownership & Notes API', () => {
  let requesterUser: any;
  let otherRequester: any;
  let staffAlice: any;
  let staffBob: any;
  let adminUser: any;
  let inactiveStaff: any;

  let requesterToken: string;
  let otherRequesterToken: string;
  let staffAliceToken: string;
  let staffBobToken: string;
  let adminToken: string;

  let category: any;
  let testTicket: any;

  beforeAll(async () => {
    // 1. Retrieve test category
    category = await prisma.category.findFirst({
      where: { isActive: true },
    });

    // 2. Setup users from seed for all 3 roles
    requesterUser = (await prisma.user.findUnique({
      where: { email: 'jennifer.anderson@example.com' },
    }))!;

    otherRequester = (await prisma.user.findUnique({
      where: { email: 'michael.brown@example.com' },
    }))!;

    staffAlice = (await prisma.user.findUnique({
      where: { email: 'staff.alice@toktickit.com' },
    }))!;

    staffBob = (await prisma.user.findUnique({
      where: { email: 'staff.bob@toktickit.com' },
    }))!;

    adminUser = (await prisma.user.findFirst({
      where: { role: Role.ADMINISTRATOR, isActive: true },
    }))!;

    inactiveStaff = (await prisma.user.findUnique({
      where: { email: 'staff.inactive@toktickit.com' },
    }))!;

    // Generate tokens
    requesterToken = generateToken({ id: requesterUser.id, email: requesterUser.email, role: requesterUser.role });
    otherRequesterToken = generateToken({ id: otherRequester.id, email: otherRequester.email, role: otherRequester.role });
    staffAliceToken = generateToken({ id: staffAlice.id, email: staffAlice.email, role: staffAlice.role });
    staffBobToken = generateToken({ id: staffBob.id, email: staffBob.email, role: staffBob.role });
    adminToken = generateToken({ id: adminUser.id, email: adminUser.email, role: adminUser.role });


    const relatedSystem = await prisma.relatedSystem.findFirst({ where: { isActive: true } });

    // Create a base test ticket
    testTicket = await prisma.ticket.create({
      data: {
        ticketNumber: `TKT-OPS-${Date.now()}`,
        requesterId: 1,
        userId: requesterUser.id,
        categoryId: category.id,
        relatedSystemId: relatedSystem!.id,
        summary: 'VPN disconnects frequently during triage',
        description: 'Connection breaks every 15 minutes when running high-bandwidth transfers.',
        requestedPriority: TicketPriority.MEDIUM,
        itPriority: TicketPriority.MEDIUM,
        currentStatus: TicketStatus.NEW,
        ownerId: null,
      },
    });
  });

  afterAll(async () => {
    // Cleanup created test records
    if (testTicket) {
      await prisma.internalNote.deleteMany({ where: { ticketId: testTicket.id } });
      await prisma.publicComment.deleteMany({ where: { ticketId: testTicket.id } });
      await prisma.ticket.deleteMany({ where: { id: testTicket.id } });
    }
    await prisma.$disconnect();
  });

  describe('1. IT Staff Ticket Claiming (PATCH /api/staff/tickets/:id/claim)', () => {
    it('AC-07: IT Staff claims unassigned ticket, sets ownerId and transitions NEW -> OPEN', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/claim`)
        .set('Authorization', `Bearer ${staffAliceToken}`);

      expect(res.status).toBe(200);
      expect(res.body.ticket.ownerId).toBe(staffAlice.id);
      expect(res.body.ticket.currentStatus).toBe('OPEN');
    });

    it('returns 404 for non-existent ticket ID', async () => {
      const res = await request(app)
        .patch('/api/staff/tickets/999999/claim')
        .set('Authorization', `Bearer ${staffAliceToken}`);

      expect(res.status).toBe(404);
    });

    it('blocks Requester role from claiming ticket (403 Forbidden)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/claim`)
        .set('Authorization', `Bearer ${requesterToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('2. IT Staff Ticket Assignment (PATCH /api/staff/tickets/:id/assign)', () => {
    it('reassigns ticket ownership to another active IT Staff member (200 OK)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/assign`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ ownerId: staffBob.id });

      expect(res.status).toBe(200);
      expect(res.body.ticket.ownerId).toBe(staffBob.id);
    });

    it('allows unassigning ticket by setting ownerId to null (200 OK)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/assign`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ ownerId: null });

      expect(res.status).toBe(200);
      expect(res.body.ticket.ownerId).toBeNull();
    });

    it('rejects assignment to a Requester user (422 Unprocessable Entity)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/assign`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ ownerId: requesterUser.id });

      expect(res.status).toBe(422);
      expect(res.body.error).toContain('User must be an active IT Staff');
    });

    it('rejects assignment to an inactive user (422 Unprocessable Entity)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/assign`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ ownerId: inactiveStaff.id });

      expect(res.status).toBe(422);
    });
  });

  describe('3. IT Priority Update (PATCH /api/staff/tickets/:id/priority)', () => {
    it('updates IT priority successfully to URGENT (200 OK)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/priority`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ itPriority: 'URGENT' });

      expect(res.status).toBe(200);
      expect(res.body.ticket.itPriority).toBe('URGENT');
    });

    it('rejects invalid priority values with 400 Bad Request', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/priority`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ itPriority: 'SUPER_HIGH' });

      expect(res.status).toBe(400);
    });

    it('blocks Requester from modifying IT priority (403 Forbidden)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/priority`)
        .set('Authorization', `Bearer ${requesterToken}`)
        .send({ itPriority: 'LOW' });

      expect(res.status).toBe(403);
    });
  });

  describe('4. Ticket Status Transition Matrix (PATCH /api/staff/tickets/:id/status)', () => {
    it('transitions OPEN -> IN_PROGRESS according to state transition matrix (200 OK)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/status`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ status: 'IN_PROGRESS' });

      expect(res.status).toBe(200);
      expect(res.body.ticket.currentStatus).toBe('IN_PROGRESS');
    });

    it('rejects status transition to RESOLVED via /status endpoint per API Spec (422 Unprocessable Entity)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/status`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ status: 'RESOLVED' });

      expect(res.status).toBe(422);
      expect(res.body.error).toContain('Please use the /resolve endpoint');
    });

    it('rejects invalid state transition (e.g. IN_PROGRESS -> CLOSED) with 422 Unprocessable Entity', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/status`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ status: 'CLOSED' });

      expect(res.status).toBe(422);
      expect(res.body.error).toContain('Invalid status transition');
    });
  });

  describe('5. Ticket Resolution (PATCH /api/staff/tickets/:id/resolve)', () => {
    it('AC-08: rejects resolution if resolutionSummary is missing or < 3 chars (422)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/resolve`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ resolutionSummary: 'no' });

      expect(res.status).toBe(422);
      expect(res.body.error).toContain('Resolution summary must be a non-empty string between 3 and 500 characters');
    });

    it('resolves ticket successfully with valid resolutionSummary (200 OK)', async () => {
      const res = await request(app)
        .patch(`/api/staff/tickets/${testTicket.id}/resolve`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({
          resolutionSummary: 'Updated VPN client MTU settings and adjusted tunnel routes. Verified connection is stable.',
        });

      expect(res.status).toBe(200);
      expect(res.body.ticket.currentStatus).toBe('RESOLVED');
      expect(res.body.ticket.resolutionSummary).toContain('Updated VPN client MTU settings');
    });
  });

  describe('6. Public Comments Timeline (POST & GET /api/tickets/:id/comments)', () => {
    it('Requester posts comment on their own ticket (201 Created)', async () => {
      const res = await request(app)
        .post(`/api/tickets/${testTicket.id}/comments`)
        .set('Authorization', `Bearer ${requesterToken}`)
        .send({ content: 'I have updated the driver as instructed.' });

      expect(res.status).toBe(201);
      expect(res.body.comment.content).toBe('I have updated the driver as instructed.');
      expect(res.body.comment.author.fullName).toBe(requesterUser.fullName);
    });

    it('IT Staff posts response comment on the ticket (201 Created)', async () => {
      const res = await request(app)
        .post(`/api/tickets/${testTicket.id}/comments`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ content: 'Great! Please confirm if latency is within normal range.' });

      expect(res.status).toBe(201);
      expect(res.body.comment.content).toBe('Great! Please confirm if latency is within normal range.');
      expect(res.body.comment.author.role).toBe(Role.IT_STAFF);
    });

    it('other Requester is blocked from commenting on tickets they do not own (403 Forbidden)', async () => {
      const res = await request(app)
        .post(`/api/tickets/${testTicket.id}/comments`)
        .set('Authorization', `Bearer ${otherRequesterToken}`)
        .send({ content: 'Trying to intrude on this ticket.' });

      expect(res.status).toBe(403);
    });

    it('rejects empty or whitespace-only comment (400 Bad Request)', async () => {
      const res = await request(app)
        .post(`/api/tickets/${testTicket.id}/comments`)
        .set('Authorization', `Bearer ${requesterToken}`)
        .send({ content: '     ' });

      expect(res.status).toBe(400);
    });

    it('lists public comments ordered chronologically (200 OK)', async () => {
      const res = await request(app)
        .get(`/api/tickets/${testTicket.id}/comments`)
        .set('Authorization', `Bearer ${requesterToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.comments)).toBe(true);
      expect(res.body.comments.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('7. Confidential Internal Notes (POST & GET /api/tickets/:id/notes)', () => {
    it('IT Staff creates a confidential internal note (201 Created)', async () => {
      const res = await request(app)
        .post(`/api/tickets/${testTicket.id}/notes`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ content: 'Customer has VPN client build 4.1.3; Known conflict with firewall policy #84.' });

      expect(res.status).toBe(201);
      expect(res.body.note.content).toContain('Known conflict with firewall policy');
      expect(res.body.note.author.role).toBe(Role.IT_STAFF);
    });

    it('Administrator creates an internal note (201 Created)', async () => {
      const res = await request(app)
        .post(`/api/tickets/${testTicket.id}/notes`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ content: 'Approved warranty hardware replacement if software fix fails.' });

      expect(res.status).toBe(201);
      expect(res.body.note.author.role).toBe(Role.ADMINISTRATOR);
    });

    it('AC-05: Requester attempting to create an internal note receives 403 Forbidden', async () => {
      const res = await request(app)
        .post(`/api/tickets/${testTicket.id}/notes`)
        .set('Authorization', `Bearer ${requesterToken}`)
        .send({ content: 'Requester trying to access confidential internal notes.' });

      expect(res.status).toBe(403);
      expect(res.body.error).toContain('Forbidden');
    });

    it('AC-05: Requester attempting to fetch internal notes receives 403 Forbidden without disclosing note contents', async () => {
      const res = await request(app)
        .get(`/api/tickets/${testTicket.id}/notes`)
        .set('Authorization', `Bearer ${requesterToken}`);

      expect(res.status).toBe(403);
      expect(res.body.notes).toBeUndefined();
    });

    it('IT Staff fetches confidential internal notes (200 OK)', async () => {
      const res = await request(app)
        .get(`/api/tickets/${testTicket.id}/notes`)
        .set('Authorization', `Bearer ${staffBobToken}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.notes)).toBe(true);
      expect(res.body.notes.length).toBe(2);
    });
  });

  describe('8. Requester Problem Appears Resolved (POST /api/tickets/:id/resolve-indication)', () => {
    it('AC-12: Requester indicates problem appears resolved, logs comment without closing ticket (200 OK)', async () => {
      const res = await request(app)
        .post(`/api/tickets/${testTicket.id}/resolve-indication`)
        .set('Authorization', `Bearer ${requesterToken}`)
        .send({ note: 'Tested across two full meetings, no disconnection happened.' });

      expect(res.status).toBe(200);
      expect(res.body.comment.content).toContain('[Requester Update] Problem appears resolved');

      // Verify ticket status is still RESOLVED (not prematurely CLOSED)
      const checkTicket = await prisma.ticket.findUnique({ where: { id: testTicket.id } });
      expect(checkTicket?.currentStatus).toBe(TicketStatus.RESOLVED);
    });

    it('other Requester cannot submit resolution indication on ticket they do not own (403 Forbidden)', async () => {
      const res = await request(app)
        .post(`/api/tickets/${testTicket.id}/resolve-indication`)
        .set('Authorization', `Bearer ${otherRequesterToken}`)
        .send({ note: 'Intruder comment' });

      expect(res.status).toBe(403);
    });
  });

  describe('9. Data Privacy in Ticket Detail View (GET /api/tickets/:id)', () => {
    it('AC-05: Requester viewing ticket detail receives publicComments but ZERO internalNotes', async () => {
      const res = await request(app)
        .get(`/api/tickets/${testTicket.id}`)
        .set('Authorization', `Bearer ${requesterToken}`);

      expect(res.status).toBe(200);
      expect(res.body.publicComments).toBeDefined();
      expect(res.body.publicComments.length).toBeGreaterThanOrEqual(1);
      expect(res.body.internalNotes).toBeUndefined();
    });

    it('IT Staff can view ticket detail of any ticket', async () => {
      const res = await request(app)
        .get(`/api/tickets/${testTicket.id}`)
        .set('Authorization', `Bearer ${staffAliceToken}`);

      expect(res.status).toBe(200);
      expect(res.body.ticketNumber).toBe(testTicket.ticketNumber);
      expect(res.body.publicComments).toBeDefined();
    });
  });
});
