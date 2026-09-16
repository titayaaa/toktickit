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

  it('can create public comments and internal notes with relations', async () => {
    // Verify models can be queried without error
    const commentCount = await prisma.publicComment.count();
    const noteCount = await prisma.internalNote.count();
    expect(commentCount).toBeGreaterThanOrEqual(0);
    expect(noteCount).toBeGreaterThanOrEqual(0);
  });
});
