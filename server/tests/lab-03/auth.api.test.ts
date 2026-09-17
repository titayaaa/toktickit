import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/app';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

describe('Issue 19: Authentication APIs (auth.api.test.ts)', () => {
  const TEST_EMAIL = 'auth.test.user@toktickit.com';
  const INACTIVE_EMAIL = 'auth.inactive.user@toktickit.com';
  const PASSWORD = 'InitialPassword123';

  beforeAll(async () => {
    const passwordHash = await bcrypt.hash(PASSWORD, 10);

    // Seed active user
    await prisma.user.upsert({
      where: { email: TEST_EMAIL },
      update: { passwordHash, isActive: true, mustChangePassword: true },
      create: {
        email: TEST_EMAIL,
        fullName: 'Auth Test User',
        passwordHash,
        role: Role.REQUESTER,
        isActive: true,
        mustChangePassword: true,
      },
    });

    // Seed inactive user
    await prisma.user.upsert({
      where: { email: INACTIVE_EMAIL },
      update: { passwordHash, isActive: false },
      create: {
        email: INACTIVE_EMAIL,
        fullName: 'Inactive Test User',
        passwordHash,
        role: Role.REQUESTER,
        isActive: false,
        mustChangePassword: false,
      },
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { email: { in: [TEST_EMAIL, INACTIVE_EMAIL] } },
    });
    await prisma.$disconnect();
  });

  it('AUTH-01: Valid credentials authenticate successfully and set cookie', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_EMAIL, password: PASSWORD });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user.email).toBe(TEST_EMAIL);
    expect(res.body.user.role).toBe('REQUESTER');
    expect(res.body.user.mustChangePassword).toBe(true);
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('AUTH-02: Invalid password returns 401 Unauthorized with generic message', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_EMAIL, password: 'WrongPassword999' });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid email or password');
  });

  it('AUTH-03: Inactive account returns 401 Unauthorized without disclosing account state', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: INACTIVE_EMAIL, password: PASSWORD });

    expect(res.status).toBe(401);
    expect(res.body.error).toBe('Invalid email or password');
  });

  it('AUTH-04: Explicit logout clears session cookie', async () => {
    const res = await request(app).post('/api/auth/logout');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Logged out successfully');
  });

  it('AUTH-06: Successful password rotation updates password and clears mustChangePassword', async () => {
    // 1. Login to get token
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_EMAIL, password: PASSWORD });

    const token = loginRes.body.token;
    const newPassword = 'NewSecretPassword456';

    // 2. Change password
    const changeRes = await request(app)
      .post('/api/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPassword: PASSWORD,
        newPassword,
      });

    expect(changeRes.status).toBe(200);
    expect(changeRes.body.user.mustChangePassword).toBe(false);

    // 3. Verify can login with new password
    const newLoginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_EMAIL, password: newPassword });

    expect(newLoginRes.status).toBe(200);
    expect(newLoginRes.body.user.mustChangePassword).toBe(false);
  });

  it('AUTH-07: Change password rejects weak password not satisfying complexity', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_EMAIL, password: 'NewSecretPassword456' });

    const token = loginRes.body.token;

    const weakRes = await request(app)
      .post('/api/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPassword: 'NewSecretPassword456',
        newPassword: 'short', // less than 8 chars, no digit/upper
      });

    expect(weakRes.status).toBe(422);
    expect(weakRes.body.error).toContain('at least 8 characters');
  });

  it('AUTH-08: Change password rejects reusing the exact same password', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_EMAIL, password: 'NewSecretPassword456' });

    const token = loginRes.body.token;

    const samePasswordRes = await request(app)
      .post('/api/auth/change-password')
      .set('Authorization', `Bearer ${token}`)
      .send({
        currentPassword: 'NewSecretPassword456',
        newPassword: 'NewSecretPassword456',
      });

    expect(samePasswordRes.status).toBe(422);
    expect(samePasswordRes.body.error).toContain('different from current password');
  });

  it('AUTH-09: Login and Me responses include name alias for backward compatibility', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: TEST_EMAIL, password: 'NewSecretPassword456' });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body.user).toHaveProperty('fullName');
    expect(loginRes.body.user).toHaveProperty('name');
    expect(loginRes.body.user.name).toBe(loginRes.body.user.fullName);

    const token = loginRes.body.token;
    const meRes = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${token}`);

    expect(meRes.status).toBe(200);
    expect(meRes.body.user.name).toBe(meRes.body.user.fullName);
  });
});

