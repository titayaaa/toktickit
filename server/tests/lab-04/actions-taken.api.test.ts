import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient, Role, ActionTakenStatus } from '@prisma/client';
import app from '../../src/app';
import { generateToken } from '../../src/middleware/auth';

const prisma = new PrismaClient();

describe('Issue 29 / PR-03: Actions Taken REST API & Authorization (actions-taken.api.test.ts)', () => {
  let requester: any;
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

  let ownTicket: any;
  let otherTicket: any;
  let testAction: any;

  beforeAll(async () => {
    // 1. Fetch seed users
    requester = (await prisma.user.findUnique({
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

    // 2. Generate tokens
    requesterToken = generateToken({ id: requester.id, email: requester.email, role: requester.role });
    otherRequesterToken = generateToken({ id: otherRequester.id, email: otherRequester.email, role: otherRequester.role });
    staffAliceToken = generateToken({ id: staffAlice.id, email: staffAlice.email, role: staffAlice.role });
    staffBobToken = generateToken({ id: staffBob.id, email: staffBob.email, role: staffBob.role });
    adminToken = generateToken({ id: adminUser.id, email: adminUser.email, role: adminUser.role });

    // 3. Setup test tickets
    const category = (await prisma.category.findFirst({ where: { isActive: true } }))!;

    ownTicket = await prisma.ticket.create({
      data: {
        ticketNumber: `TCK-TEST-ACT-${Date.now()}`,
        summary: 'Test ticket for actions taken suite',
        description: 'Test description for actions taken integration tests',
        categoryId: category.id,
        userId: requester.id,
        requesterId: requester.id,
        currentStatus: 'IN_PROGRESS',
      },
    });

    otherTicket = await prisma.ticket.create({
      data: {
        ticketNumber: `TCK-TEST-OTH-${Date.now()}`,
        summary: 'Other ticket for data isolation tests',
        description: 'Other description',
        categoryId: category.id,
        userId: otherRequester.id,
        requesterId: otherRequester.id,
        currentStatus: 'OPEN',
      },
    });
  });

  afterAll(async () => {
    // Cleanup created test tickets (cascade deletes actions)
    if (ownTicket?.id) {
      await prisma.ticket.deleteMany({ where: { id: ownTicket.id } });
    }
    if (otherTicket?.id) {
      await prisma.ticket.deleteMany({ where: { id: otherTicket.id } });
    }
    await prisma.$disconnect();
  });

  it('API-01: IT Staff creates a valid Action Taken record (HTTP 201)', async () => {
    const res = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Inspected power supply unit and tightened connectors',
        isFollowUpRequired: true,
        followUpNote: 'Monitor voltage levels over the next 24 hours',
        attachmentNotes: 'psu-connector-photo.jpg',
      });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.ticketId).toBe(ownTicket.id);
    expect(res.body.performedById).toBe(staffAlice.id); // JWT Identity enforcement
    expect(res.body.assigneeId).toBe(staffBob.id);
    expect(res.body.status).toBe('PENDING');
    expect(res.body.result).toBeNull();
    expect(res.body.isFollowUpRequired).toBe(true);
    expect(res.body.followUpNote).toBe('Monitor voltage levels over the next 24 hours');
    expect(res.body.attachmentNotes).toBe('psu-connector-photo.jpg');
    expect(res.body.performedBy.fullName).toBe(staffAlice.fullName);
    expect(res.body.assignee.fullName).toBe(staffBob.fullName);

    testAction = res.body;
  });

  it('API-02: Requester is forbidden from creating an Action Taken (HTTP 403)', async () => {
    const res = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${requesterToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Requester trying to create action',
      });

    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/Forbidden/i);
  });

  it('API-03: Create Action Taken with followUpRequired=true but missing followUpNote returns 400', async () => {
    const res = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Action missing follow up note',
        isFollowUpRequired: true,
        followUpNote: '   ',
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Follow-up note is required/i);
  });

  it('API-04: IT Staff updates an existing Action Taken (HTTP 200)', async () => {
    const res = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${testAction.id}`)
      .set('Authorization', `Bearer ${staffBobToken}`)
      .send({
        actionDescription: 'Inspected power supply unit and replaced faulty capacitor',
        attachmentNotes: 'psu-repaired.jpg',
      });

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(testAction.id);
    expect(res.body.actionDescription).toBe('Inspected power supply unit and replaced faulty capacitor');
    expect(res.body.attachmentNotes).toBe('psu-repaired.jpg');
    expect(res.body.performedById).toBe(staffAlice.id); // PerformedBy remains immutable
  });

  it('API-05: Requester can list own Actions Taken but gets 404 for unowned tickets (Data Isolation)', async () => {
    // 1. Own ticket -> 200 OK array
    const ownRes = await request(app)
      .get(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${requesterToken}`);

    expect(ownRes.status).toBe(200);
    expect(Array.isArray(ownRes.body)).toBe(true);
    expect(ownRes.body.map((a: any) => a.id)).toContain(testAction.id);

    // 2. Other user ticket -> 404 Not Found (anti-enumeration)
    const otherRes = await request(app)
      .get(`/api/tickets/${otherTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${requesterToken}`);

    expect(otherRes.status).toBe(404);
    expect(otherRes.body.error).toMatch(/Ticket not found/i);

    // 3. Other owner -> 200 OK
    const otherOwnerRes = await request(app)
      .get(`/api/tickets/${otherTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${otherRequesterToken}`);

    expect(otherOwnerRes.status).toBe(200);
    expect(Array.isArray(otherOwnerRes.body)).toBe(true);

    // 4. Staff -> 200 OK for any ticket
    const staffRes = await request(app)
      .get(`/api/tickets/${otherTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`);

    expect(staffRes.status).toBe(200);

    // 5. Non-existent ticket -> 404
    const nonExistentRes = await request(app)
      .get('/api/tickets/9999999/actions-taken')
      .set('Authorization', `Bearer ${staffAliceToken}`);

    expect(nonExistentRes.status).toBe(404);
  });

  it('API-08: Description length validation (min 3, max 1000 characters)', async () => {
    // Too short (< 3 chars)
    const shortRes = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Hi',
      });
    expect(shortRes.status).toBe(400);

    // Too long (> 1000 chars)
    const longRes = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'A'.repeat(1001),
      });
    expect(longRes.status).toBe(400);
  });

  it('API-12: Inactive, requester, or non-existent assignees are rejected with 422', async () => {
    const countBefore = await prisma.actionTaken.count({ where: { ticketId: ownTicket.id } });

    // Inactive staff
    const resInactive = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: inactiveStaff.id,
        actionDescription: 'Assigning to inactive staff',
      });
    expect(resInactive.status).toBe(422);

    // Requester role
    const resReq = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: requester.id,
        actionDescription: 'Assigning to requester',
      });
    expect(resReq.status).toBe(422);

    // Non-existent user
    const resNonExistent = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: 999999,
        actionDescription: 'Assigning to ghost user',
      });
    expect(resNonExistent.status).toBe(422);

    // Patch with invalid assignee
    const resPatchInvalid = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${testAction.id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ assigneeId: inactiveStaff.id });
    expect(resPatchInvalid.status).toBe(422);

    const countAfter = await prisma.actionTaken.count({ where: { ticketId: ownTicket.id } });
    expect(countAfter).toBe(countBefore);
  });

  it('API-14: Status transitions follow Action Taken Status Matrix', async () => {
    const created = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Status lifecycle test action',
        status: 'PENDING',
      });
    expect(created.status).toBe(201);
    const id = created.body.id;

    // PENDING -> IN_PROGRESS: allowed
    const inProgress = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ status: 'IN_PROGRESS' });
    expect(inProgress.status).toBe(200);
    expect(inProgress.body.status).toBe('IN_PROGRESS');

    // IN_PROGRESS -> COMPLETED: allowed (with result)
    const completed = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ status: 'COMPLETED', result: 'Capacitor verified stable under oscilloscope' });
    expect(completed.status).toBe(200);
    expect(completed.body.status).toBe('COMPLETED');
    expect(completed.body.result).toBe('Capacitor verified stable under oscilloscope');

    // COMPLETED -> IN_PROGRESS: disallowed (terminal state)
    const reopen = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ status: 'IN_PROGRESS' });
    expect(reopen.status).toBe(400);

    // COMPLETED -> CANCELLED: disallowed
    const cancelCompleted = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ status: 'CANCELLED' });
    expect(cancelCompleted.status).toBe(400);

    // PENDING -> CANCELLED: allowed
    const cancellable = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Action intended for cancellation',
        status: 'PENDING',
      });
    expect(cancellable.status).toBe(201);

    const cancelled = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${cancellable.body.id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ status: 'CANCELLED' });
    expect(cancelled.status).toBe(200);
    expect(cancelled.body.status).toBe('CANCELLED');

    // CANCELLED -> COMPLETED: disallowed
    const uncancel = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${cancellable.body.id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ status: 'COMPLETED', result: 'Try to complete cancelled' });
    expect(uncancel.status).toBe(400);
  });

  it('API-15: Result is optional for open work (PENDING/IN_PROGRESS) but required for COMPLETED', async () => {
    // 1. Create PENDING without result -> 201, result is null
    const pending = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Pending action with no result',
        status: 'PENDING',
      });
    expect(pending.status).toBe(201);
    expect(pending.body.result).toBeNull();

    // 2. Create COMPLETED without result -> 400
    const completedNoResult = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Direct complete without result',
        status: 'COMPLETED',
      });
    expect(completedNoResult.status).toBe(400);

    // 3. Create COMPLETED with blank result -> 400
    const completedBlank = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Direct complete with whitespace',
        status: 'COMPLETED',
        result: '   ',
      });
    expect(completedBlank.status).toBe(400);

    // 4. Create COMPLETED with valid result -> 201
    const completedValid = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Direct complete with valid result',
        status: 'COMPLETED',
        result: 'Tested and verified operational',
      });
    expect(completedValid.status).toBe(201);
    expect(completedValid.body.result).toBe('Tested and verified operational');

    // 5. Patch PENDING to COMPLETED without result -> 400
    const patchNoResult = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${pending.body.id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ status: 'COMPLETED' });
    expect(patchNoResult.status).toBe(400);

    // 6. Patch PENDING to COMPLETED with valid result -> 200
    const patchWithResult = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${pending.body.id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ status: 'COMPLETED', result: 'Diagnosed and resolved successfully' });
    expect(patchWithResult.status).toBe(200);
    expect(patchWithResult.body.status).toBe('COMPLETED');
    expect(patchWithResult.body.result).toBe('Diagnosed and resolved successfully');
  });

  it('API-16: Assignable staff endpoint lists active IT Staff and Admin, rejecting Requesters (HTTP 403)', async () => {
    // IT Staff calling /api/users/assignable -> 200
    const res = await request(app)
      .get('/api/users/assignable')
      .set('Authorization', `Bearer ${staffAliceToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);

    const ids = res.body.map((u: any) => u.id);
    expect(ids).toContain(staffAlice.id);
    expect(ids).toContain(staffBob.id);
    expect(ids).toContain(adminUser.id);
    expect(ids).not.toContain(inactiveStaff.id);
    expect(ids).not.toContain(requester.id);

    expect(res.body.every((u: any) => u.role === 'IT_STAFF' || u.role === 'ADMINISTRATOR')).toBe(true);
    expect(res.body.every((u: any) => u.isActive === true)).toBe(true);

    // Requester calling /api/users/assignable -> 403
    const reqRes = await request(app)
      .get('/api/users/assignable')
      .set('Authorization', `Bearer ${requesterToken}`);
    expect(reqRes.status).toBe(403);
  });

  it('API-17: Ticket detail view includes actionsTaken array for frontend rendering', async () => {
    const res = await request(app)
      .get(`/api/tickets/${ownTicket.id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.actionsTaken)).toBe(true);
    expect(res.body.actionsTaken.length).toBeGreaterThan(0);

    const action = res.body.actionsTaken.find((a: any) => a.id === testAction.id);
    expect(action).toBeDefined();
    expect(action.performedBy.id).toBe(staffAlice.id);
    expect(action.assignee.id).toBe(staffBob.id);
  });
});
