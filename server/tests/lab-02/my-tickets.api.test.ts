import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TEST_TICKET_PREFIX = 'TKT-TEST-MYTKT-';

describe('GET /api/tickets (Issue 12 - My Tickets API)', () => {
  let ownerId: number;
  let otherRequesterId: number;
  let category1Id: number;
  let category2Id: number;
  let systemId: number;

  beforeAll(async () => {
    // Setup reference records
    const requesters = await prisma.requesterUser.findMany({ where: { isActive: true }, take: 2 });
    ownerId = requesters[0].id;
    otherRequesterId = requesters[1].id;

    const categories = await prisma.category.findMany({ where: { isActive: true }, take: 2 });
    category1Id = categories[0].id;
    category2Id = categories[1].id;

    const system = await prisma.relatedSystem.findFirst({ where: { isActive: true } });
    systemId = system!.id;

    // Seed test tickets for owner
    await prisma.ticket.createMany({
      data: [
        {
          ticketNumber: `${TEST_TICKET_PREFIX}000001`,
          requesterId: ownerId,
          categoryId: category1Id,
          relatedSystemId: systemId,
          summary: 'Cannot connect to campus Wi-Fi network',
          description: 'Wi-Fi drops connection every 5 minutes in dorm A',
          requestedPriority: 'HIGH',
          currentStatus: 'NEW',
          createdAt: new Date('2026-09-01T10:00:00Z'),
        },
        {
          ticketNumber: `${TEST_TICKET_PREFIX}000002`,
          requesterId: ownerId,
          categoryId: category2Id,
          relatedSystemId: systemId,
          summary: 'Printer paper jam in library',
          description: 'Library floor 2 printer is showing jam error',
          requestedPriority: 'LOW',
          currentStatus: 'RESOLVED',
          createdAt: new Date('2026-09-02T10:00:00Z'),
        },
        {
          ticketNumber: `${TEST_TICKET_PREFIX}000003`,
          requesterId: ownerId,
          categoryId: category1Id,
          relatedSystemId: systemId,
          summary: 'Email sync failure on Outlook',
          description: 'Emails not loading on mobile device',
          requestedPriority: 'CRITICAL',
          currentStatus: 'IN_PROGRESS',
          createdAt: new Date('2026-09-03T10:00:00Z'),
        },
        // Seed ticket for another requester to test ownership
        {
          ticketNumber: `${TEST_TICKET_PREFIX}000004`,
          requesterId: otherRequesterId,
          categoryId: category1Id,
          relatedSystemId: systemId,
          summary: 'Other user private ticket',
          description: 'Secret issue not visible to owner',
          requestedPriority: 'MEDIUM',
          currentStatus: 'NEW',
          createdAt: new Date('2026-09-04T10:00:00Z'),
        },
      ],
    });
  });

  afterAll(async () => {
    await prisma.ticket.deleteMany({
      where: { ticketNumber: { startsWith: TEST_TICKET_PREFIX } },
    });
  });

  it('API-06: Ownership Filtering - Only returns tickets belonging to authenticated requester', async () => {
    const res = await request(app)
      .get('/api/tickets?limit=50')
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body).toHaveProperty('meta');

    // All tickets returned must belong to owner
    const tickets = res.body.data;
    const testTickets = tickets.filter((t: any) => t.ticketNumber.startsWith(TEST_TICKET_PREFIX));
    expect(testTickets.length).toBe(3);

    // Make sure ticket 4 (other user) is not returned
    const otherTicket = tickets.find((t: any) => t.ticketNumber === `${TEST_TICKET_PREFIX}000004`);
    expect(otherTicket).toBeUndefined();
  });

  it('API-07: Search - Matches ticketNumber or summary case-insensitively', async () => {
    // Search by summary keyword
    const resSummary = await request(app)
      .get('/api/tickets?search=wi-fi')
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resSummary.status).toBe(200);
    expect(resSummary.body.data.length).toBe(1);
    expect(resSummary.body.data[0].ticketNumber).toBe(`${TEST_TICKET_PREFIX}000001`);

    // Search by ticketNumber
    const resNum = await request(app)
      .get(`/api/tickets?search=${TEST_TICKET_PREFIX}000002`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resNum.status).toBe(200);
    expect(resNum.body.data.length).toBe(1);
    expect(resNum.body.data[0].summary).toContain('Printer paper jam');
  });

  it('API-08: Filter by category, priority, and status', async () => {
    // Filter by category
    const resCat = await request(app)
      .get(`/api/tickets?category=${category2Id}`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resCat.status).toBe(200);
    const catTickets = resCat.body.data.filter((t: any) => t.ticketNumber.startsWith(TEST_TICKET_PREFIX));
    expect(catTickets.length).toBe(1);
    expect(catTickets[0].ticketNumber).toBe(`${TEST_TICKET_PREFIX}000002`);

    // Filter by priority
    const resPriority = await request(app)
      .get('/api/tickets?priority=CRITICAL')
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resPriority.status).toBe(200);
    const priTickets = resPriority.body.data.filter((t: any) => t.ticketNumber.startsWith(TEST_TICKET_PREFIX));
    expect(priTickets.length).toBe(1);
    expect(priTickets[0].requestedPriority).toBe('CRITICAL');

    // Filter by status
    const resStatus = await request(app)
      .get('/api/tickets?status=RESOLVED')
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resStatus.status).toBe(200);
    const statTickets = resStatus.body.data.filter((t: any) => t.ticketNumber.startsWith(TEST_TICKET_PREFIX));
    expect(statTickets.length).toBe(1);
    expect(statTickets[0].currentStatus).toBe('RESOLVED');
  });

  it('Filters by multiple parameters simultaneously (category + status + priority)', async () => {
    const res = await request(app)
      .get(`/api/tickets?categoryId=${category1Id}&status=NEW&priority=HIGH&limit=50`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(res.status).toBe(200);
    const filtered = res.body.data.filter((t: any) => t.ticketNumber.startsWith(TEST_TICKET_PREFIX));
    expect(filtered.length).toBe(1);
    expect(filtered[0].ticketNumber).toBe(`${TEST_TICKET_PREFIX}000001`);
  });

  it('Returns empty array and 0 total when search matches no tickets', async () => {
    const res = await request(app)
      .get('/api/tickets?search=nonexistentkeyword12345')
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
    expect(res.body.meta.total).toBe(0);
    expect(res.body.meta.totalPages).toBe(0);
  });

  it('API-09: Sorting by field and direction', async () => {
    // Sort by createdAt asc
    const resAsc = await request(app)
      .get(`/api/tickets?search=${TEST_TICKET_PREFIX}&sortBy=createdAt&sortDir=asc`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resAsc.status).toBe(200);
    const ascList = resAsc.body.data;
    expect(ascList[0].ticketNumber).toBe(`${TEST_TICKET_PREFIX}000001`);
    expect(ascList[2].ticketNumber).toBe(`${TEST_TICKET_PREFIX}000003`);

    // Sort by createdAt desc
    const resDesc = await request(app)
      .get(`/api/tickets?search=${TEST_TICKET_PREFIX}&sortBy=createdAt&sortDir=desc`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resDesc.status).toBe(200);
    const descList = resDesc.body.data;
    expect(descList[0].ticketNumber).toBe(`${TEST_TICKET_PREFIX}000003`);
    expect(descList[2].ticketNumber).toBe(`${TEST_TICKET_PREFIX}000001`);

    // Sort by requestedPriority desc (must order by severity: CRITICAL > HIGH > LOW)
    const resPrioDesc = await request(app)
      .get(`/api/tickets?search=${TEST_TICKET_PREFIX}&sortBy=requestedPriority&sortDir=desc`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resPrioDesc.status).toBe(200);
    const prioList = resPrioDesc.body.data;
    expect(prioList[0].requestedPriority).toBe('CRITICAL');
    expect(prioList[1].requestedPriority).toBe('HIGH');
    expect(prioList[2].requestedPriority).toBe('LOW');

    // Sort by requestedPriority asc (LOW < HIGH < CRITICAL)
    const resPrioAsc = await request(app)
      .get(`/api/tickets?search=${TEST_TICKET_PREFIX}&sortBy=requestedPriority&sortDir=asc`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resPrioAsc.status).toBe(200);
    const prioAscList = resPrioAsc.body.data;
    expect(prioAscList[0].requestedPriority).toBe('LOW');
    expect(prioAscList[1].requestedPriority).toBe('HIGH');
    expect(prioAscList[2].requestedPriority).toBe('CRITICAL');
  });

  it('API-10: Pagination with page and limit and meta fields', async () => {
    const resPage = await request(app)
      .get(`/api/tickets?search=${TEST_TICKET_PREFIX}&page=1&limit=2`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resPage.status).toBe(200);
    expect(resPage.body.data.length).toBe(2);
    expect(resPage.body.meta.page).toBe(1);
    expect(resPage.body.meta.limit).toBe(2);
    expect(resPage.body.meta.total).toBe(3);
    expect(resPage.body.meta.totalPages).toBe(2);

    // Page 2
    const resPage2 = await request(app)
      .get(`/api/tickets?search=${TEST_TICKET_PREFIX}&page=2&limit=2`)
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resPage2.status).toBe(200);
    expect(resPage2.body.data.length).toBe(1);
    expect(resPage2.body.meta.page).toBe(2);
  });

  it('Validation: Returns 400 Bad Request on invalid page, status, or category parameter', async () => {
    const resInvalidPage = await request(app)
      .get('/api/tickets?page=-1')
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resInvalidPage.status).toBe(400);

    const resInvalidStatus = await request(app)
      .get('/api/tickets?status=NOT_A_STATUS')
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resInvalidStatus.status).toBe(400);
    expect(resInvalidStatus.body.error).toContain('Invalid status parameter');

    const resInvalidCategory = await request(app)
      .get('/api/tickets?categoryId=abc')
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resInvalidCategory.status).toBe(400);
    expect(resInvalidCategory.body.error).toContain('Invalid category parameter');

    const resInvalidCategory2 = await request(app)
      .get('/api/tickets?category=invalid')
      .set('Authorization', `Bearer dev_requester_${ownerId}`);

    expect(resInvalidCategory2.status).toBe(400);
    expect(resInvalidCategory2.body.error).toContain('Invalid category parameter');
  });

  it('Authentication: Returns 401 Unauthorized when token is missing', async () => {
    const res = await request(app).get('/api/tickets');
    expect(res.status).toBe(401);
  });
});
