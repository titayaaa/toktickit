import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../../src/app.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('API-04: Create Ticket Endpoint', () => {
  let activeRequesterId: number;
  let inactiveRequesterId: number;
  let validCategoryId: number;
  let validSystemId: number;

  beforeEach(async () => {
    // Find requesters
    const activeReq = await prisma.requesterUser.findFirst({ where: { isActive: true } });
    const inactiveReq = await prisma.requesterUser.findFirst({ where: { isActive: false } });
    
    // Find category and system
    const category = await prisma.category.findFirst({ where: { isActive: true } });
    const system = await prisma.relatedSystem.findFirst({ where: { isActive: true } });

    if (!activeReq || !inactiveReq || !category || !system) {
      throw new Error('Seed data missing for tests');
    }

    activeRequesterId = activeReq.id;
    inactiveRequesterId = inactiveReq.id;
    validCategoryId = category.id;
    validSystemId = system.id;
    
    // Clean up any test tickets created before each test to reset numbering
    await prisma.ticket.deleteMany({
      where: { summary: { contains: 'Test Ticket' } }
    });
  });

  it('POST /api/tickets creates a ticket and returns 201 with ticketNumber', async () => {
    const payload = {
      summary: 'Test Ticket for Wi-Fi',
      description: 'The Wi-Fi in building A is very slow.',
      categoryId: validCategoryId,
      relatedSystemId: validSystemId,
      requestedPriority: 'MEDIUM'
    };

    const response = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${activeRequesterId}`)
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.ticketNumber).toMatch(/^TKT-\d{4}-\d{6}$/);
    expect(response.body.currentStatus).toBe('NEW');
    expect(response.body.summary).toBe(payload.summary);
    
    // Verify it was actually saved and bound to the logged-in requesterId
    const savedTicket = await prisma.ticket.findUnique({ where: { id: response.body.id } });
    expect(savedTicket).not.toBeNull();
    expect(savedTicket?.ticketNumber).toBe(response.body.ticketNumber);
    expect(savedTicket?.requesterId).toBe(activeRequesterId);
  });

  it('POST /api/tickets returns 401 when missing auth header', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .send({ summary: 'Test', description: 'Test', categoryId: 1, relatedSystemId: 1, requestedPriority: 'LOW' });
    
    expect(response.status).toBe(401);
  });

  it('POST /api/tickets returns 403 for inactive requester', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${inactiveRequesterId}`)
      .send({ summary: 'Test', description: 'Test', categoryId: validCategoryId, relatedSystemId: validSystemId, requestedPriority: 'LOW' });
    
    expect(response.status).toBe(403);
  });

  it('POST /api/tickets returns 400 for invalid priority', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${activeRequesterId}`)
      .send({ summary: 'Test', description: 'Test', categoryId: validCategoryId, relatedSystemId: validSystemId, requestedPriority: 'URGENT' }); // URGENT is invalid in our PR
    
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Invalid requestedPriority');
  });

  it('POST /api/tickets returns 400 for missing summary', async () => {
    const response = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${activeRequesterId}`)
      .send({ description: 'Test', categoryId: validCategoryId, relatedSystemId: validSystemId, requestedPriority: 'LOW' });
    
    expect(response.status).toBe(400);
  });

  it('POST /api/tickets accepts boundary lengths for summary (200) and description (2000)', async () => {
    const boundarySummary = 'a'.repeat(200);
    const boundaryDescription = 'b'.repeat(2000);

    const payload = {
      summary: boundarySummary,
      description: boundaryDescription,
      categoryId: validCategoryId,
      relatedSystemId: validSystemId,
      requestedPriority: 'LOW'
    };

    const response = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${activeRequesterId}`)
      .send(payload);

    expect(response.status).toBe(201);
    expect(response.body.summary).toBe(boundarySummary);
    expect(response.body.description).toBe(boundaryDescription);
  });

  it('POST /api/tickets rejects summary exceeding 200 chars or description exceeding 2000 chars', async () => {
    const payloadLongSummary = {
      summary: 'a'.repeat(201),
      description: 'test',
      categoryId: validCategoryId,
      relatedSystemId: validSystemId,
      requestedPriority: 'LOW'
    };
    const response1 = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${activeRequesterId}`)
      .send(payloadLongSummary);
    expect(response1.status).toBe(400);

    const payloadLongDesc = {
      summary: 'test',
      description: 'b'.repeat(2001),
      categoryId: validCategoryId,
      relatedSystemId: validSystemId,
      requestedPriority: 'LOW'
    };
    const response2 = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${activeRequesterId}`)
      .send(payloadLongDesc);
    expect(response2.status).toBe(400);
  });

  it('POST /api/tickets returns 400 when category or related system does not exist', async () => {
    const payloadInvalidCategory = {
      summary: 'Test',
      description: 'Test',
      categoryId: 99999, // Non-existent
      relatedSystemId: validSystemId,
      requestedPriority: 'LOW'
    };
    const res1 = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${activeRequesterId}`)
      .send(payloadInvalidCategory);
    expect(res1.status).toBe(400);
    expect(res1.body.error).toContain('Category');

    const payloadInvalidSystem = {
      summary: 'Test',
      description: 'Test',
      categoryId: validCategoryId,
      relatedSystemId: 99999, // Non-existent
      requestedPriority: 'LOW'
    };
    const res2 = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${activeRequesterId}`)
      .send(payloadInvalidSystem);
    expect(res2.status).toBe(400);
    expect(res2.body.error).toContain('Related System');
  });

  it('POST /api/tickets returns 400 when category or related system is inactive', async () => {
    // Find inactive category and system
    const inactiveCategory = await prisma.category.findFirst({ where: { isActive: false } });
    const inactiveSystem = await prisma.relatedSystem.findFirst({ where: { isActive: false } });

    if (!inactiveCategory || !inactiveSystem) {
      expect.fail('Missing inactive category or inactive related system in seed data for testing');
    }

    const payloadInactiveCategory = {
      summary: 'Test',
      description: 'Test',
      categoryId: inactiveCategory.id,
      relatedSystemId: validSystemId,
      requestedPriority: 'LOW'
    };
    const res1 = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${activeRequesterId}`)
      .send(payloadInactiveCategory);
    expect(res1.status).toBe(400);
    expect(res1.body.error).toContain('inactive');

    const payloadInactiveSystem = {
      summary: 'Test',
      description: 'Test',
      categoryId: validCategoryId,
      relatedSystemId: inactiveSystem.id,
      requestedPriority: 'LOW'
    };
    const res2 = await request(app)
      .post('/api/tickets')
      .set('Authorization', `Bearer dev_requester_${activeRequesterId}`)
      .send(payloadInactiveSystem);
    expect(res2.status).toBe(400);
    expect(res2.body.error).toContain('inactive');
  });
});
