import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient, Role, TicketPriority, TicketStatus } from '@prisma/client';
import app from '../../src/app';
import { generateToken } from '../../src/middleware/auth';

const prisma = new PrismaClient();

describe('Issue 31 / PR-05: Ticket Workflow, Resolution Gate & Concurrency API', () => {
  let staffAlice: any;
  let staffAliceToken: string;
  let category: any;
  let relatedSystem: any;
  let requesterUser: any;
  let reqJennifer: any;

  beforeAll(async () => {
    category = await prisma.category.findFirst({
      where: { isActive: true },
    });

    relatedSystem = await prisma.relatedSystem.findFirst({
      where: { isActive: true },
    });

    requesterUser = await prisma.user.findFirst({
      where: { role: Role.REQUESTER, isActive: true },
    });

    reqJennifer = await prisma.requesterUser.findFirst({
      where: { email: requesterUser.email },
    });
    if (!reqJennifer) {
      reqJennifer = await prisma.requesterUser.create({
        data: { name: requesterUser.fullName, email: requesterUser.email, isActive: true },
      });
    }

    staffAlice = await prisma.user.findUnique({
      where: { email: 'staff.alice@toktickit.com' },
    });

    staffAliceToken = generateToken({
      id: staffAlice.id,
      email: staffAlice.email,
      role: staffAlice.role,
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Resolution Gate (BR-09, AC-07, AC-08)', () => {
    it('API-07: rejects resolving ticket when a PENDING Action Taken exists with 409 Conflict', async () => {
      // Create ticket in IN_PROGRESS state
      const ticket = await prisma.ticket.create({
        data: {
          ticketNumber: `TEST-WF-01-${Date.now()}`,
          summary: 'Resolution Gate Test - Pending Action',
          description: 'Testing resolution gate blocking with pending action',
          requestedPriority: TicketPriority.MEDIUM,
          currentStatus: TicketStatus.IN_PROGRESS,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
          ownerId: staffAlice.id,
        },
      });

      // Add a PENDING action
      await prisma.actionTaken.create({
        data: {
          ticketId: ticket.id,
          performedById: staffAlice.id,
          assigneeId: staffAlice.id,
          status: 'PENDING',
          actionDescription: 'Reviewing hardware specifications',
        },
      });

      const res = await request(app)
        .patch(`/api/staff/tickets/${ticket.id}/resolve`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({
          resolutionSummary: 'Attempting to resolve despite pending action',
        });

      expect(res.status).toBe(409);
      expect(res.body.code).toBe('RESOLUTION_GATE_BLOCKED');
      expect(res.body.unresolvedCount).toBe(1);
      expect(res.body.blockingActions).toHaveLength(1);
      expect(res.body.blockingActions[0].status).toBe('PENDING');

      // Cleanup
      await prisma.actionTaken.deleteMany({ where: { ticketId: ticket.id } });
      await prisma.ticket.delete({ where: { id: ticket.id } });
    });

    it('API-08: rejects resolving ticket when an IN_PROGRESS Action Taken exists with 409 Conflict', async () => {
      const ticket = await prisma.ticket.create({
        data: {
          ticketNumber: `TEST-WF-02-${Date.now()}`,
          summary: 'Resolution Gate Test - In Progress Action',
          description: 'Testing resolution gate blocking with in-progress action',
          requestedPriority: TicketPriority.MEDIUM,
          currentStatus: TicketStatus.IN_PROGRESS,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
          ownerId: staffAlice.id,
        },
      });

      // Add an IN_PROGRESS action
      await prisma.actionTaken.create({
        data: {
          ticketId: ticket.id,
          performedById: staffAlice.id,
          assigneeId: staffAlice.id,
          status: 'IN_PROGRESS',
          actionDescription: 'Currently performing network patch',
        },
      });

      const res = await request(app)
        .patch(`/api/staff/tickets/${ticket.id}/resolve`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({
          resolutionSummary: 'Resolved with work in progress',
        });

      expect(res.status).toBe(409);
      expect(res.body.code).toBe('RESOLUTION_GATE_BLOCKED');
      expect(res.body.unresolvedCount).toBe(1);
      expect(res.body.blockingActions[0].status).toBe('IN_PROGRESS');

      // Cleanup
      await prisma.actionTaken.deleteMany({ where: { ticketId: ticket.id } });
      await prisma.ticket.delete({ where: { id: ticket.id } });
    });

    it('API-09: successfully resolves ticket when all Actions Taken are COMPLETED or CANCELLED', async () => {
      const ticket = await prisma.ticket.create({
        data: {
          ticketNumber: `TEST-WF-03-${Date.now()}`,
          summary: 'Resolution Gate Test - All Completed/Cancelled',
          description: 'Testing successful resolution with completed actions',
          requestedPriority: TicketPriority.MEDIUM,
          currentStatus: TicketStatus.IN_PROGRESS,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
          ownerId: staffAlice.id,
        },
      });

      // Add 1 COMPLETED and 1 CANCELLED action
      await prisma.actionTaken.create({
        data: {
          ticketId: ticket.id,
          performedById: staffAlice.id,
          assigneeId: staffAlice.id,
          status: 'COMPLETED',
          actionDescription: 'Replaced faulty RAM stick',
          result: 'Hardware diagnosis passed completely',
        },
      });

      await prisma.actionTaken.create({
        data: {
          ticketId: ticket.id,
          performedById: staffAlice.id,
          assigneeId: staffAlice.id,
          status: 'CANCELLED',
          actionDescription: 'Redundant test action cancelled',
        },
      });

      const res = await request(app)
        .patch(`/api/staff/tickets/${ticket.id}/resolve`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({
          resolutionSummary: 'All diagnostic actions completed successfully and verified with user.',
        });

      expect(res.status).toBe(200);
      expect(res.body.ticket.currentStatus).toBe(TicketStatus.RESOLVED);
      expect(res.body.ticket.resolutionSummary).toBe(
        'All diagnostic actions completed successfully and verified with user.'
      );

      // Cleanup
      await prisma.actionTaken.deleteMany({ where: { ticketId: ticket.id } });
      await prisma.ticket.delete({ where: { id: ticket.id } });
    });

    it('API-10: successfully resolves ticket when zero Actions Taken exist (Legacy/Direct resolution)', async () => {
      const ticket = await prisma.ticket.create({
        data: {
          ticketNumber: `TEST-WF-04-${Date.now()}`,
          summary: 'Resolution Gate Test - Zero Actions',
          description: 'Testing resolution with zero actions taken',
          requestedPriority: TicketPriority.MEDIUM,
          currentStatus: TicketStatus.IN_PROGRESS,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
          ownerId: staffAlice.id,
        },
      });

      const res = await request(app)
        .patch(`/api/staff/tickets/${ticket.id}/resolve`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({
          resolutionSummary: 'Issue resolved directly via quick configuration tweak.',
        });

      expect(res.status).toBe(200);
      expect(res.body.ticket.currentStatus).toBe(TicketStatus.RESOLVED);

      // Cleanup
      await prisma.ticket.delete({ where: { id: ticket.id } });
    });
  });

  describe('Optimistic Concurrency & Stale Update Protection (BR-14, AC-12)', () => {
    it('API-14: rejects status change when expectedUpdatedAt does not match with 409 Conflict', async () => {
      const ticket = await prisma.ticket.create({
        data: {
          ticketNumber: `TEST-WF-05-${Date.now()}`,
          summary: 'Concurrency Test Ticket',
          description: 'Testing stale update conflict detection',
          requestedPriority: TicketPriority.MEDIUM,
          currentStatus: TicketStatus.OPEN,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
          ownerId: staffAlice.id,
        },
      });

      // Send a stale expectedUpdatedAt timestamp (1 hour ago)
      const staleTimestamp = new Date(Date.now() - 3600000).toISOString();

      const res = await request(app)
        .patch(`/api/staff/tickets/${ticket.id}/status`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({
          status: 'IN_PROGRESS',
          expectedUpdatedAt: staleTimestamp,
        });

      expect(res.status).toBe(409);
      expect(res.body.code).toBe('STALE_UPDATE_CONFLICT');
      expect(res.body.error).toContain('Ticket has been modified by another user');
      expect(res.body.currentUpdatedAt).toBeDefined();

      // Successfully updates when expectedUpdatedAt matches ticket.updatedAt
      const validRes = await request(app)
        .patch(`/api/staff/tickets/${ticket.id}/status`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({
          status: 'IN_PROGRESS',
          expectedUpdatedAt: ticket.updatedAt.toISOString(),
        });

      expect(validRes.status).toBe(200);
      expect(validRes.body.ticket.currentStatus).toBe(TicketStatus.IN_PROGRESS);

      // Cleanup
      await prisma.ticket.delete({ where: { id: ticket.id } });
    });

    it('API-14: rejects resolve when expectedUpdatedAt does not match with 409 Conflict', async () => {
      const ticket = await prisma.ticket.create({
        data: {
          ticketNumber: `TEST-WF-06-${Date.now()}`,
          summary: 'Concurrency Resolve Test',
          description: 'Testing stale resolve conflict detection',
          requestedPriority: TicketPriority.MEDIUM,
          currentStatus: TicketStatus.IN_PROGRESS,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
          ownerId: staffAlice.id,
        },
      });

      const staleTimestamp = new Date(Date.now() - 7200000).toISOString();

      const res = await request(app)
        .patch(`/api/staff/tickets/${ticket.id}/resolve`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({
          resolutionSummary: 'Trying to resolve with stale timestamp',
          expectedUpdatedAt: staleTimestamp,
        });

      expect(res.status).toBe(409);
      expect(res.body.code).toBe('STALE_UPDATE_CONFLICT');

      // Cleanup
      await prisma.ticket.delete({ where: { id: ticket.id } });
    });
  });

  describe('State Machine Transition Matrix (BR-11, WORKFLOW-01)', () => {
    it('WORKFLOW-01: rejects invalid transitions with 422 Unprocessable Entity', async () => {
      // 1. NEW cannot jump directly to IN_PROGRESS
      const ticketNew = await prisma.ticket.create({
        data: {
          ticketNumber: `TEST-WF-07-${Date.now()}`,
          summary: 'State Matrix New Ticket',
          description: 'Testing invalid transition from NEW',
          requestedPriority: TicketPriority.MEDIUM,
          currentStatus: TicketStatus.NEW,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
        },
      });

      const resInvalid = await request(app)
        .patch(`/api/staff/tickets/${ticketNew.id}/status`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ status: 'IN_PROGRESS' });

      expect(resInvalid.status).toBe(422);
      expect(resInvalid.body.error).toContain('Invalid status transition');

      // 2. Direct transition to RESOLVED via /status is rejected (must use /resolve)
      const resDirectResolve = await request(app)
        .patch(`/api/staff/tickets/${ticketNew.id}/status`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ status: 'RESOLVED' });

      expect(resDirectResolve.status).toBe(422);
      expect(resDirectResolve.body.error).toContain('Please use the /resolve endpoint');

      // 3. CLOSED is terminal and cannot transition to any status
      const ticketClosed = await prisma.ticket.create({
        data: {
          ticketNumber: `TEST-WF-08-${Date.now()}`,
          summary: 'State Matrix Closed Ticket',
          description: 'Testing terminal status protection',
          requestedPriority: TicketPriority.MEDIUM,
          currentStatus: TicketStatus.CLOSED,
          categoryId: category.id,
          relatedSystemId: relatedSystem.id,
          requesterId: reqJennifer.id,
          userId: requesterUser.id,
        },
      });

      const resClosed = await request(app)
        .patch(`/api/staff/tickets/${ticketClosed.id}/status`)
        .set('Authorization', `Bearer ${staffAliceToken}`)
        .send({ status: 'OPEN' });

      expect(resClosed.status).toBe(422);
      expect(resClosed.body.error).toContain('Cannot modify status of a closed ticket');

      // Cleanup
      await prisma.ticket.deleteMany({
        where: { id: { in: [ticketNew.id, ticketClosed.id] } },
      });
    });
  });
});
