import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient, ActionTakenStatus, Role } from '@prisma/client';

const prisma = new PrismaClient();

describe('Issue 28: Lab 4 Database Evolution & Actions Taken Seed Verification', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('preserves existing Lab 2 & Lab 3 users, tickets, and notes without regression', async () => {
    const userCount = await prisma.user.count();
    const ticketCount = await prisma.ticket.count();
    expect(userCount).toBeGreaterThanOrEqual(10);
    expect(ticketCount).toBeGreaterThanOrEqual(3);
  });

  it('verifies ActionTaken table exists and contains seeded records', async () => {
    const actionsCount = await prisma.actionTaken.count();
    expect(actionsCount).toBeGreaterThanOrEqual(5);
  });

  it('verifies Actions Taken have valid relations to Ticket and User actors', async () => {
    const actions = await prisma.actionTaken.findMany({
      include: {
        ticket: true,
        performedBy: true,
        assignee: true,
      },
    });

    expect(actions.length).toBeGreaterThan(0);
    for (const act of actions) {
      expect(act.ticketId).toBeDefined();
      expect(act.ticket).not.toBeNull();
      expect(act.performedById).toBeDefined();
      expect(act.performedBy).not.toBeNull();
      expect(act.assigneeId).toBeDefined();
      expect(act.assignee).not.toBeNull();
      expect([Role.IT_STAFF, Role.ADMINISTRATOR]).toContain(act.assignee.role);
    }
  });

  it('supports multi-staff collaboration: one ticket with actions assigned to different staff members (BR-02)', async () => {
    const multiStaffTicket = await prisma.ticket.findFirst({
      where: { ticketNumber: 'TKT-2026-000103' },
      include: {
        actionsTaken: {
          include: { assignee: true },
        },
      },
    });

    expect(multiStaffTicket).not.toBeNull();
    const assignees = new Set(multiStaffTicket?.actionsTaken.map((a) => a.assignee.email));
    expect(assignees.size).toBeGreaterThanOrEqual(2);
  });

  it('verifies ActionTakenStatus enum covers COMPLETED, IN_PROGRESS, PENDING, and CANCELLED in seed', async () => {
    const statuses = await prisma.actionTaken.findMany({
      select: { status: true },
    });

    const statusSet = new Set(statuses.map((s) => s.status));
    expect(statusSet.has(ActionTakenStatus.COMPLETED)).toBe(true);
    expect(statusSet.has(ActionTakenStatus.IN_PROGRESS)).toBe(true);
    expect(statusSet.has(ActionTakenStatus.PENDING)).toBe(true);
    expect(statusSet.has(ActionTakenStatus.CANCELLED)).toBe(true);
  });

  it('validates follow-up requirement constraint in seed data (BR-07)', async () => {
    const actionsWithFollowUp = await prisma.actionTaken.findMany({
      where: { isFollowUpRequired: true },
    });

    expect(actionsWithFollowUp.length).toBeGreaterThan(0);
    for (const act of actionsWithFollowUp) {
      expect(act.followUpNote).not.toBeNull();
      expect(act.followUpNote?.trim().length).toBeGreaterThan(0);
    }
  });

  it('verifies tickets with zero actions taken are preserved for legacy backward compatibility (BR-14)', async () => {
    const ticketsWithZeroActions = await prisma.ticket.findMany({
      where: {
        actionsTaken: {
          none: {},
        },
      },
    });

    expect(ticketsWithZeroActions.length).toBeGreaterThan(0);
  });

  it('verifies result column is nullable in database and allows null for pending work (BR-16)', async () => {
    const colInfo = await prisma.$queryRaw<Array<{ column_name: string; is_nullable: string }>>`
      SELECT column_name, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'actions_taken' AND column_name = 'result';
    `;

    expect(colInfo.length).toBe(1);
    expect(colInfo[0].is_nullable).toBe('YES');

    // Pending work in seed has null result
    const pendingAction = await prisma.actionTaken.findFirst({
      where: { status: ActionTakenStatus.PENDING },
    });
    expect(pendingAction).not.toBeNull();
    expect(pendingAction?.result).toBeNull();

    // Completed work in seed must have result
    const completedActions = await prisma.actionTaken.findMany({
      where: { status: ActionTakenStatus.COMPLETED },
    });
    expect(completedActions.length).toBeGreaterThan(0);
    for (const action of completedActions) {
      expect(action.result).not.toBeNull();
      expect(action.result?.trim().length).toBeGreaterThan(0);
    }
  });

  it('validates resolution gate invariant in seed data: zero resolved tickets have open actions (BR-09)', async () => {
    const resolvedOrClosedTickets = await prisma.ticket.findMany({
      where: {
        currentStatus: { in: ['RESOLVED', 'CLOSED'] },
      },
      include: {
        actionsTaken: true,
      },
    });

    expect(resolvedOrClosedTickets.length).toBeGreaterThan(0);
    for (const ticket of resolvedOrClosedTickets) {
      const openActions = ticket.actionsTaken.filter(
        (a) => a.status === ActionTakenStatus.PENDING || a.status === ActionTakenStatus.IN_PROGRESS
      );
      expect(openActions.length).toBe(0);
    }
  });

  it('verifies composite index actions_taken_ticketId_status_idx exists for resolution gate optimization', async () => {
    const indexes = await prisma.$queryRaw<Array<{ indexname: string; indexdef: string }>>`
      SELECT indexname, indexdef 
      FROM pg_indexes 
      WHERE tablename = 'actions_taken' AND indexname = 'actions_taken_ticketId_status_idx';
    `;

    expect(indexes.length).toBe(1);
    expect(indexes[0].indexdef).toContain('ticketId');
    expect(indexes[0].indexdef).toContain('status');
  });
});
