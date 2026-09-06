import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

describe('Attachment Management API (Issue 11)', () => {
  let ownerId: number;
  let otherRequesterId: number;
  let ticketId: number;
  let otherTicketId: number;
  let categoryId: number;
  let relatedSystemId: number;

  const testFilePath = path.join(process.cwd(), 'test-upload.png');
  const largeFilePath = path.join(process.cwd(), 'test-large.png');
  const invalidFilePath = path.join(process.cwd(), 'test-invalid.txt');

  beforeAll(async () => {
    // Create test dummy files
    fs.writeFileSync(testFilePath, Buffer.from('fake image content'));
    fs.writeFileSync(invalidFilePath, 'fake text content');
    // Create 6MB file for large test
    const largeBuffer = Buffer.alloc(6 * 1024 * 1024);
    fs.writeFileSync(largeFilePath, largeBuffer);

    // Setup database records
    const category = await prisma.category.findFirst({ where: { isActive: true } });
    const system = await prisma.relatedSystem.findFirst({ where: { isActive: true } });
    const requesters = await prisma.requesterUser.findMany({ where: { isActive: true }, take: 2 });

    ownerId = requesters[0].id;
    otherRequesterId = requesters[1].id;
    categoryId = category!.id;
    relatedSystemId = system!.id;

    // Create tickets
    const ticket1 = await prisma.ticket.create({
      data: {
        ticketNumber: `TKT-TEST-${Date.now()}-1`,
        requesterId: ownerId,
        categoryId,
        relatedSystemId,
        summary: 'Owner Ticket for Attachment Test',
        description: 'Testing attachments',
        requestedPriority: 'MEDIUM',
        currentStatus: 'NEW',
      },
    });
    ticketId = ticket1.id;

    const ticket2 = await prisma.ticket.create({
      data: {
        ticketNumber: `TKT-TEST-${Date.now()}-2`,
        requesterId: otherRequesterId,
        categoryId,
        relatedSystemId,
        summary: 'Other Ticket for Attachment Test',
        description: 'Testing permissions',
        requestedPriority: 'LOW',
        currentStatus: 'NEW',
      },
    });
    otherTicketId = ticket2.id;
  });

  afterAll(async () => {
    // Clean up dummy test files
    if (fs.existsSync(testFilePath)) fs.unlinkSync(testFilePath);
    if (fs.existsSync(largeFilePath)) fs.unlinkSync(largeFilePath);
    if (fs.existsSync(invalidFilePath)) fs.unlinkSync(invalidFilePath);

    // Clean up database
    await prisma.attachment.deleteMany({ where: { ticketId: { in: [ticketId, otherTicketId] } } });
    await prisma.ticket.deleteMany({ where: { id: { in: [ticketId, otherTicketId] } } });
  });

  describe('POST /api/tickets/:id/attachments (Upload)', () => {
    it('AC-04: Successfully uploads valid attachment', async () => {
      const res = await request(app)
        .post(`/api/tickets/${ticketId}/attachments`)
        .set('Authorization', `Bearer dev_requester_${ownerId}`)
        .attach('file', testFilePath);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.originalFilename).toBe('test-upload.png');
      expect(res.body.mimeType).toBe('image/png');
      expect(res.body.ticketId).toBe(ticketId);
    });

    it('AC-04: Rejects file larger than 5MB with 400 Bad Request', async () => {
      const res = await request(app)
        .post(`/api/tickets/${ticketId}/attachments`)
        .set('Authorization', `Bearer dev_requester_${ownerId}`)
        .attach('file', largeFilePath);

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('limit of 5MB');
    });

    it('AC-04: Rejects unsupported file type (e.g. .txt)', async () => {
      const res = await request(app)
        .post(`/api/tickets/${ticketId}/attachments`)
        .set('Authorization', `Bearer dev_requester_${ownerId}`)
        .attach('file', invalidFilePath);

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Invalid file type');
    });

    it('AC-04: Rejects upload if ticket already has 5 active attachments', async () => {
      // Current active attachments count = 1. Upload 4 more to reach 5.
      for (let i = 0; i < 4; i++) {
        await request(app)
          .post(`/api/tickets/${ticketId}/attachments`)
          .set('Authorization', `Bearer dev_requester_${ownerId}`)
          .attach('file', testFilePath);
      }

      // 6th upload should fail
      const res = await request(app)
        .post(`/api/tickets/${ticketId}/attachments`)
        .set('Authorization', `Bearer dev_requester_${ownerId}`)
        .attach('file', testFilePath);

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Maximum active attachments limit');
    });

    it('Ownership Protection: Rejects upload if requester does not own the ticket (403)', async () => {
      const res = await request(app)
        .post(`/api/tickets/${ticketId}/attachments`)
        .set('Authorization', `Bearer dev_requester_${otherRequesterId}`)
        .attach('file', testFilePath);

      expect(res.status).toBe(403);
      expect(res.body.error).toContain('Forbidden');
    });
  });

  describe('GET /api/attachments/:id/download & DELETE /api/attachments/:id (Soft-Remove)', () => {
    let attachmentId: number;

    beforeAll(async () => {
      // Find an active attachment created earlier
      const att = await prisma.attachment.findFirst({
        where: { ticketId, removedAt: null },
      });
      attachmentId = att!.id;
    });

    it('Downloads active attachment successfully with Bearer token', async () => {
      const res = await request(app)
        .get(`/api/attachments/${attachmentId}/download`)
        .set('Authorization', `Bearer dev_requester_${ownerId}`);

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toBe('image/png');
    });

    it('Downloads active attachment successfully with query param ?X-Requester-Id=', async () => {
      const res = await request(app)
        .get(`/api/attachments/${attachmentId}/download?X-Requester-Id=${ownerId}`);

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toBe('image/png');
    });

    it('Ownership Protection: Rejects download if another requester accesses it (403)', async () => {
      const res = await request(app)
        .get(`/api/attachments/${attachmentId}/download`)
        .set('Authorization', `Bearer dev_requester_${otherRequesterId}`);

      expect(res.status).toBe(403);
    });

    it('AC-06: Soft-remove without reason returns 400 Bad Request', async () => {
      const res = await request(app)
        .delete(`/api/attachments/${attachmentId}`)
        .set('Authorization', `Bearer dev_requester_${ownerId}`)
        .send({});

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Removal reason is required');
    });

    it('AC-06: Soft-remove with valid reason succeeds (200 OK)', async () => {
      const res = await request(app)
        .delete(`/api/attachments/${attachmentId}`)
        .set('Authorization', `Bearer dev_requester_${ownerId}`)
        .send({ reason: 'Uploaded wrong document' });

      expect(res.status).toBe(200);
      expect(res.body.removedAt).not.toBeNull();
      expect(res.body.removalReason).toBe('Uploaded wrong document');
    });

    it('AC-06: Block download of soft-removed attachment (400 Bad Request)', async () => {
      const res = await request(app)
        .get(`/api/attachments/${attachmentId}/download`)
        .set('Authorization', `Bearer dev_requester_${ownerId}`);

      expect(res.status).toBe(400);
      expect(res.body.error).toContain('Attachment has been removed');
    });
  });
});
