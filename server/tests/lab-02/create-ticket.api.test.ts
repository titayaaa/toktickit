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
    
    // Verify it was actually saved
    const savedTicket = await prisma.ticket.findUnique({ where: { id: response.body.id } });
    expect(savedTicket).not.toBeNull();
    expect(savedTicket?.ticketNumber).toBe(response.body.ticketNumber);
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
});
