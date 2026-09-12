import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TEST_TICKET_PREFIX = `TKT-TEST-DTL-${Date.now()}-`;

describe('GET /api/tickets/:id (Issue 14 - Ticket Detail API)', () => {
  let ownerId: number;
  let otherRequesterId: number;
  let categoryId: number;
  let systemId: number;
  let ownerTicketId: number;
  let otherTicketId: number;

  beforeAll(async () => {
    // Clean up any leftovers
    await prisma.attachment.deleteMany({
      where: { ticket: { ticketNumber: { startsWith: 'TKT-TEST-DTL-' } } },
    });
    await prisma.ticket.deleteMany({
      where: { ticketNumber: { startsWith: 'TKT-TEST-DTL-' } },
    });
    // Reference records
    const requesters = await prisma.requesterUser.findMany({ where: { isActive: true }, take: 2 });
    ownerId = requesters[0].id;
    otherRequesterId = requesters[1].id;

    const category = await prisma.category.findFirst({ where: { isActive: true } });
    categoryId = category!.id;

    const system = await prisma.relatedSystem.findFirst({ where: { isActive: true } });
    systemId = system!.id;

    // Create a ticket for owner
    const t1 = await prisma.ticket.create({
      data: {
        ticketNumber: `${TEST_TICKET_PREFIX}000001`,
        requesterId: ownerId,
        categoryId: categoryId,
        relatedSystemId: systemId,
        summary: 'Unique Detail Specimen Summary',
        description: 'Unique Detail Specimen Description for testing view',
        requestedPriority: 'HIGH',
        currentStatus: 'NEW',
      },
    });
    ownerTicketId = t1.id;

    // Add an attachment for owner ticket
    await prisma.attachment.create({
      data: {
        ticketId: ownerTicketId,
        originalFilename: 'detail-specimen.png',
        storagePath: 'test/detail-specimen.png',
        mimeType: 'image/png',
        sizeBytes: 1024,
      },
    });

    // Create a ticket for other requester
    const t2 = await prisma.ticket.create({
      data: {
        ticketNumber: `${TEST_TICKET_PREFIX}000002`,
        requesterId: otherRequesterId,
        categoryId: categoryId,
        relatedSystemId: systemId,
        summary: 'Other user secret ticket',
        description: 'Not accessible by owner',
        requestedPriority: 'LOW',
        currentStatus: 'NEW',
      },
    });
    otherTicketId = t2.id;
  });

  afterAll(async () => {
    await prisma.attachment.deleteMany({
      where: { ticket: { ticketNumber: { startsWith: TEST_TICKET_PREFIX } } },
    });
    await prisma.ticket.deleteMany({
      where: { ticketNumber: { startsWith: TEST_TICKET_PREFIX } },
    });
  });

  it('API-01: Returns 200 OK with full ticket details, relations, and attachments for owner', async () => {
    const res = await request(app)
      .get(`/api/tickets/${ownerTicketId}`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(res.status).toBe(200);
    expect(res.body.id).toBe(ownerTicketId);
    expect(res.body.ticketNumber).toBe(`${TEST_TICKET_PREFIX}000001`);
    expect(res.body.summary).toBe('Unique Detail Specimen Summary');
    expect(res.body.description).toBe('Unique Detail Specimen Description for testing view');
    expect(res.body.requestedPriority).toBe('HIGH');
    expect(res.body.status).toBe('NEW');
    expect(res.body.category).toBeDefined();
    expect(res.body.category.id).toBe(categoryId);
    expect(res.body.relatedSystem).toBeDefined();
    expect(res.body.relatedSystem.id).toBe(systemId);
    expect(Array.isArray(res.body.attachments)).toBe(true);
    expect(res.body.attachments.length).toBe(1);
    expect(res.body.attachments[0].originalFilename).toBe('detail-specimen.png');
  });

  it('API-02: Returns 403 Forbidden when ticket belongs to another requester', async () => {
    const res = await request(app)
      .get(`/api/tickets/${otherTicketId}`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toMatch(/Forbidden/i);
  });

  it('API-03: Returns 404 Not Found when ticket does not exist', async () => {
    const res = await request(app)
      .get('/api/tickets/99999999')
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toMatch(/not found/i);
  });

  it('API-04: Returns 401 Unauthorized when token is missing', async () => {
    const res = await request(app)
      .get(`/api/tickets/${ownerTicketId}`);

    expect(res.status).toBe(401);
    expect(res.body.error).toMatch(/Unauthorized/i);
  });
});
