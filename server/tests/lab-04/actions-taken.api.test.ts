import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient, Role, ActionTakenStatus, TicketPriority } from '@prisma/client';
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
    const relatedSystem = (await prisma.relatedSystem.findFirst({ where: { isActive: true } }))!;

    let reqJennifer = await prisma.requesterUser.findFirst({ where: { email: requester.email } });
    if (!reqJennifer) {
      reqJennifer = await prisma.requesterUser.create({
        data: { name: requester.fullName, email: requester.email, isActive: true },
      });
    }

    let reqMichael = await prisma.requesterUser.findFirst({ where: { email: otherRequester.email } });
    if (!reqMichael) {
      reqMichael = await prisma.requesterUser.create({
        data: { name: otherRequester.fullName, email: otherRequester.email, isActive: true },
      });
    }

    ownTicket = await prisma.ticket.create({
      data: {
        ticketNumber: `TCK-TEST-ACT-${Date.now()}`,
        summary: 'Test ticket for actions taken suite',
        description: 'Test description for actions taken integration tests',
        categoryId: category.id,
        relatedSystemId: relatedSystem.id,
        requestedPriority: TicketPriority.MEDIUM,
        userId: requester.id,
        requesterId: reqJennifer.id,
        currentStatus: 'IN_PROGRESS',
      },
    });

    otherTicket = await prisma.ticket.create({
      data: {
        ticketNumber: `TCK-TEST-OTH-${Date.now()}`,
        summary: 'Other ticket for data isolation tests',
        description: 'Other description',
        categoryId: category.id,
        relatedSystemId: relatedSystem.id,
        requestedPriority: TicketPriority.MEDIUM,
        userId: otherRequester.id,
        requesterId: reqMichael.id,
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

  it('API-03: Requester retrieves Actions Taken for owned ticket (HTTP 200 array)', async () => {
    const res = await request(app)
      .get(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${requesterToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.map((a: any) => a.id)).toContain(testAction.id);
  });

  it('API-04: Requester attempts to retrieve Actions Taken for unowned ticket returns HTTP 404 (Data Isolation)', async () => {
    const res = await request(app)
      .get(`/api/tickets/${otherTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${requesterToken}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/Ticket not found/i);
  });

  it('API-05: IT Staff updates an existing Action Taken (HTTP 200)', async () => {
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

  it('API-06 / UNIT-01: Inactive, requester, or non-existent assignees are rejected with 422', async () => {
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

  it('UNIT-02: Follow-up note validation requires non-empty note (min 2 chars), and clearing followUp clears note to null', async () => {
    // 1. Missing note when followUpRequired=true -> 400
    const resBlank = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Action missing follow up note',
        isFollowUpRequired: true,
        followUpNote: '   ',
      });
    expect(resBlank.status).toBe(400);
    expect(resBlank.body.error).toMatch(/Follow-up note is required/i);

    // 2. Note too short (< 2 chars) -> 400
    const resShort = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Action with single char follow up note',
        isFollowUpRequired: true,
        followUpNote: 'A',
      });
    expect(resShort.status).toBe(400);

    // 3. Clear follow-up via PATCH { isFollowUpRequired: false } -> followUpNote becomes null
    const resClear = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${testAction.id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        isFollowUpRequired: false,
      });
    expect(resClear.status).toBe(200);
    expect(resClear.body.isFollowUpRequired).toBe(false);
    expect(resClear.body.followUpNote).toBeNull();
  });

  it('UNIT-03: Result is optional for open work (PENDING/IN_PROGRESS) but required for COMPLETED (min 2, max 1000)', async () => {
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

    // 3. Create COMPLETED with single char result -> 400
    const completedShort = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Direct complete with single char',
        status: 'COMPLETED',
        result: 'X',
      });
    expect(completedShort.status).toBe(400);

    // 4. Create with result > 1000 chars -> 400
    const completedTooLong = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Action with huge result',
        status: 'PENDING',
        result: 'R'.repeat(1001),
      });
    expect(completedTooLong.status).toBe(400);

    // 5. Create COMPLETED with valid result -> 201
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

    // 6. Patch PENDING to COMPLETED with valid result -> 200
    const patchWithResult = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${pending.body.id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ status: 'COMPLETED', result: 'Diagnosed and resolved successfully' });
    expect(patchWithResult.status).toBe(200);
    expect(patchWithResult.body.status).toBe('COMPLETED');
    expect(patchWithResult.body.result).toBe('Diagnosed and resolved successfully');
  });

  it('GET /api/tickets/:id/actions-taken/:actionId: retrieves a single Action Taken by ID', async () => {
    // 1. Staff can retrieve single action -> 200
    const res = await request(app)
      .get(`/api/tickets/${ownTicket.id}/actions-taken/${testAction.id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(testAction.id);
    expect(res.body.performedBy).toBeDefined();
    expect(res.body.assignee).toBeDefined();

    // 2. Owner requester can retrieve single action -> 200
    const reqRes = await request(app)
      .get(`/api/tickets/${ownTicket.id}/actions-taken/${testAction.id}`)
      .set('Authorization', `Bearer ${requesterToken}`);
    expect(reqRes.status).toBe(200);
    expect(reqRes.body.id).toBe(testAction.id);

    // 3. Other requester gets 404 (Data Isolation)
    const otherReqRes = await request(app)
      .get(`/api/tickets/${ownTicket.id}/actions-taken/${testAction.id}`)
      .set('Authorization', `Bearer ${otherRequesterToken}`);
    expect(otherReqRes.status).toBe(404);

    // 4. Non-existent action ID -> 404
    const notFoundRes = await request(app)
      .get(`/api/tickets/${ownTicket.id}/actions-taken/999999`)
      .set('Authorization', `Bearer ${staffAliceToken}`);
    expect(notFoundRes.status).toBe(404);
  });

  it('Input validations: actionDateTime format, description length, and attachmentNotes length', async () => {
    // 1. Invalid actionDateTime in POST -> 400
    const invalidDatePost = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Invalid date post',
        actionDateTime: 'not-a-valid-date-string',
      });
    expect(invalidDatePost.status).toBe(400);
    expect(invalidDatePost.body.error).toMatch(/Invalid actionDateTime/i);

    // 2. Invalid actionDateTime in PATCH -> 400
    const invalidDatePatch = await request(app)
      .patch(`/api/tickets/${ownTicket.id}/actions-taken/${testAction.id}`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({ actionDateTime: 'invalid-date' });
    expect(invalidDatePatch.status).toBe(400);

    // 3. attachmentNotes > 500 chars in POST -> 400
    const longNotesPost = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Valid description for long attachment test',
        attachmentNotes: 'N'.repeat(501),
      });
    expect(longNotesPost.status).toBe(400);
    expect(longNotesPost.body.error).toMatch(/Attachment notes exceed maximum length/i);

    // 4. Description too short (< 3 chars) -> 400
    const shortDesc = await request(app)
      .post(`/api/tickets/${ownTicket.id}/actions-taken`)
      .set('Authorization', `Bearer ${staffAliceToken}`)
      .send({
        assigneeId: staffBob.id,
        actionDescription: 'Hi',
      });
    expect(shortDesc.status).toBe(400);
  });

  it('Status transitions follow Action Taken Status Matrix', async () => {
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

  it('GET /api/users/assignable lists active IT Staff and Admin, rejecting Requesters (HTTP 403)', async () => {
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

  it('GET /api/tickets/:id includes actionsTaken array for frontend rendering', async () => {
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

  it('SAFE-01: Safe error responses return generic message on internal failures without stack leaks', async () => {
    // Test safe error handling when invalid id is passed
    const res = await request(app)
      .get('/api/tickets/abc/actions-taken')
      .set('Authorization', `Bearer ${staffAliceToken}`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Ticket not found');
    expect(res.body.stack).toBeUndefined();
  });
});
