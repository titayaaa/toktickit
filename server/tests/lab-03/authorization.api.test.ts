import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import express, { Response } from 'express';
import request from 'supertest';
import cookieParser from 'cookie-parser';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { authenticate, requireRole, generateToken, AuthRequest } from '../../src/middleware/auth';

const prisma = new PrismaClient();

// Setup a minimal express app to test auth middleware behaviors directly
const testApp = express();
testApp.use(cookieParser());
testApp.use(express.json());

testApp.get('/test/operational', authenticate, (_req: AuthRequest, res: Response) => {
  res.status(200).json({ success: true, message: 'Operational route accessed' });
});

testApp.get('/test/staff-only', authenticate, requireRole(Role.IT_STAFF, Role.ADMINISTRATOR), (_req: AuthRequest, res: Response) => {
  res.status(200).json({ success: true, message: 'Staff route accessed' });
});

testApp.get('/test/admin-only', authenticate, requireRole(Role.ADMINISTRATOR), (_req: AuthRequest, res: Response) => {
  res.status(200).json({ success: true, message: 'Admin route accessed' });
});

describe('Issue 19: Authorization & Middleware APIs (authorization.api.test.ts)', () => {
  const MUST_CHANGE_EMAIL = 'mustchange@toktickit.com';
  const STAFF_EMAIL = 'staff.test@toktickit.com';
  const REQUESTER_EMAIL = 'requester.test@toktickit.com';
  const ADMIN_EMAIL = 'admin.test@toktickit.com';

  let mustChangeToken: string;
  let requesterToken: string;
  let staffToken: string;
  let adminToken: string;

  beforeAll(async () => {
    const passwordHash = await bcrypt.hash('Password123!', 10);

    // 1. User with mustChangePassword = true
    const mustChangeUser = await prisma.user.upsert({
      where: { email: MUST_CHANGE_EMAIL },
      update: { mustChangePassword: true, isActive: true },
      create: {
        email: MUST_CHANGE_EMAIL,
        fullName: 'Must Change User',
        passwordHash,
        role: Role.REQUESTER,
        mustChangePassword: true,
        isActive: true,
      },
    });
    mustChangeToken = generateToken(mustChangeUser);

    // 2. Normal Requester
    const requesterUser = await prisma.user.upsert({
      where: { email: REQUESTER_EMAIL },
      update: { mustChangePassword: false, isActive: true },
      create: {
        email: REQUESTER_EMAIL,
        fullName: 'Normal Requester',
        passwordHash,
        role: Role.REQUESTER,
        mustChangePassword: false,
        isActive: true,
      },
    });
    requesterToken = generateToken(requesterUser);

    // 3. IT Staff
    const staffUser = await prisma.user.upsert({
      where: { email: STAFF_EMAIL },
      update: { mustChangePassword: false, isActive: true },
      create: {
        email: STAFF_EMAIL,
        fullName: 'Staff User',
        passwordHash,
        role: Role.IT_STAFF,
        mustChangePassword: false,
        isActive: true,
      },
    });
    staffToken = generateToken(staffUser);

    // 4. Administrator
    const adminUser = await prisma.user.upsert({
      where: { email: ADMIN_EMAIL },
      update: { mustChangePassword: false, isActive: true },
      create: {
        email: ADMIN_EMAIL,
        fullName: 'Admin User',
        passwordHash,
        role: Role.ADMINISTRATOR,
        mustChangePassword: false,
        isActive: true,
      },
    });
    adminToken = generateToken(adminUser);
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: [MUST_CHANGE_EMAIL, STAFF_EMAIL, REQUESTER_EMAIL, ADMIN_EMAIL],
        },
      },
    });
    await prisma.$disconnect();
  });

  it('AUTH-05: User with mustChangePassword=true is blocked from operational routes with 403', async () => {
    const res = await request(testApp)
      .get('/test/operational')
      .set('Authorization', `Bearer ${mustChangeToken}`);

    expect(res.status).toBe(403);
    expect(res.body.mustChangePassword).toBe(true);
  });

  it('SEC-01: Authenticated user without mustChangePassword can access operational route', async () => {
    const res = await request(testApp)
      .get('/test/operational')
      .set('Authorization', `Bearer ${requesterToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('SEC-02: Requester is rejected with 403 Forbidden when accessing staff-only route', async () => {
    const res = await request(testApp)
      .get('/test/staff-only')
      .set('Authorization', `Bearer ${requesterToken}`);

    expect(res.status).toBe(403);
    expect(res.body.error).toContain('Insufficient role permissions');
  });

  it('SEC-03: IT Staff can access staff-only route successfully', async () => {
    const res = await request(testApp)
      .get('/test/staff-only')
      .set('Authorization', `Bearer ${staffToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('SEC-04: Non-admin is rejected with 403 Forbidden when accessing admin-only route', async () => {
    const res = await request(testApp)
      .get('/test/admin-only')
      .set('Authorization', `Bearer ${staffToken}`);

    expect(res.status).toBe(403);
  });

  it('SEC-05: Administrator can access admin-only route successfully', async () => {
    const res = await request(testApp)
      .get('/test/admin-only')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
