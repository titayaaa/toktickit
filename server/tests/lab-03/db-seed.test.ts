import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

describe('Issue 18: Database Evolution and Seed Verification', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('preserves existing Lab 2 tickets and attachments', async () => {
    const ticketCount = await prisma.ticket.count();
    const attachmentCount = await prisma.attachment.count();
    expect(ticketCount).toBeGreaterThan(0);
    expect(attachmentCount).toBeGreaterThan(0);
  });

  it('contains at least 4 active Requesters and 1 inactive Requester', async () => {
    const activeRequesters = await prisma.user.count({
      where: { role: Role.REQUESTER, isActive: true },
    });
    const inactiveRequesters = await prisma.user.count({
      where: { role: Role.REQUESTER, isActive: false },
    });

    expect(activeRequesters).toBeGreaterThanOrEqual(4);
    expect(inactiveRequesters).toBeGreaterThanOrEqual(1);
  });

  it('contains at least 3 active IT Staff and 1 inactive IT Staff', async () => {
    const activeStaff = await prisma.user.count({
      where: { role: Role.IT_STAFF, isActive: true },
    });
    const inactiveStaff = await prisma.user.count({
      where: { role: Role.IT_STAFF, isActive: false },
    });

    expect(activeStaff).toBeGreaterThanOrEqual(3);
    expect(inactiveStaff).toBeGreaterThanOrEqual(1);
  });

  it('contains at least 1 active Administrator', async () => {
    const activeAdmins = await prisma.user.count({
      where: { role: Role.ADMINISTRATOR, isActive: true },
    });

    expect(activeAdmins).toBeGreaterThanOrEqual(1);
  });

  it('verifies backfill of userId and itPriority on existing tickets', async () => {
    const ticketsWithoutPriority = await prisma.ticket.count({
      where: { itPriority: null },
    });
    expect(ticketsWithoutPriority).toBe(0);

    const ticketsWithUserId = await prisma.ticket.count({
      where: { userId: { not: null } },
    });
    expect(ticketsWithUserId).toBeGreaterThan(0);
  });

  it('contains realistic sample tickets, public comments, and internal notes', async () => {
    const commentCount = await prisma.publicComment.count();
    const noteCount = await prisma.internalNote.count();
    expect(commentCount).toBeGreaterThanOrEqual(2);
    expect(noteCount).toBeGreaterThanOrEqual(1);

    const sampleTicket = await prisma.ticket.findUnique({
      where: { ticketNumber: 'TKT-2026-000101' },
      include: { publicComments: true, internalNotes: true },
    });
    expect(sampleTicket).toBeDefined();
    expect(sampleTicket?.publicComments.length).toBeGreaterThanOrEqual(2);
    expect(sampleTicket?.internalNotes.length).toBeGreaterThanOrEqual(1);
  });
});
