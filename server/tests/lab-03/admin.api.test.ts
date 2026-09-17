import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import { generateToken } from '../../src/middleware/auth';

const prisma = new PrismaClient();

describe('Issue 25: Administrator User Management API Suite (admin.api.test.ts)', () => {
  const PREFIX = 'admin-test-';
  const ADMIN_1_EMAIL = `${PREFIX}admin1@toktickit.com`;
  const ADMIN_2_EMAIL = `${PREFIX}admin2@toktickit.com`;
  const SOLE_ADMIN_EMAIL = `${PREFIX}sole-admin@toktickit.com`;
  const STAFF_EMAIL = `${PREFIX}staff@toktickit.com`;
  const REQUESTER_EMAIL = `${PREFIX}requester@toktickit.com`;
  const MUST_CHANGE_ADMIN_EMAIL = `${PREFIX}admin-mustchange@toktickit.com`;
  const TARGET_USER_EMAIL = `${PREFIX}target@toktickit.com`;

  let admin1User: any;
  let admin2User: any;
  let staffUser: any;
  let requesterUser: any;
  let mustChangeAdminUser: any;
  let targetUser: any;

  let admin1Token: string;
  let admin2Token: string;
  let staffToken: string;
  let requesterToken: string;
  let mustChangeAdminToken: string;

  const createdUserIds: number[] = [];

  beforeAll(async () => {
    const passwordHash = await bcrypt.hash('Password123!', 10);

    // 1. Seed admin users
    admin1User = await prisma.user.upsert({
      where: { email: ADMIN_1_EMAIL },
      update: { isActive: true, mustChangePassword: false, role: Role.ADMINISTRATOR },
      create: {
        email: ADMIN_1_EMAIL,
        fullName: 'Admin One Test',
        passwordHash,
        role: Role.ADMINISTRATOR,
        mustChangePassword: false,
        isActive: true,
      },
    });
    admin1Token = generateToken(admin1User);

    admin2User = await prisma.user.upsert({
      where: { email: ADMIN_2_EMAIL },
      update: { isActive: true, mustChangePassword: false, role: Role.ADMINISTRATOR },
      create: {
        email: ADMIN_2_EMAIL,
        fullName: 'Admin Two Test',
        passwordHash,
        role: Role.ADMINISTRATOR,
        mustChangePassword: false,
        isActive: true,
      },
    });
    admin2Token = generateToken(admin2User);

    // 2. Seed non-admin users
    staffUser = await prisma.user.upsert({
      where: { email: STAFF_EMAIL },
      update: { isActive: true, mustChangePassword: false, role: Role.IT_STAFF },
      create: {
        email: STAFF_EMAIL,
        fullName: 'Staff Test User',
        passwordHash,
        role: Role.IT_STAFF,
        mustChangePassword: false,
        isActive: true,
      },
    });
    staffToken = generateToken(staffUser);

    requesterUser = await prisma.user.upsert({
      where: { email: REQUESTER_EMAIL },
      update: { isActive: true, mustChangePassword: false, role: Role.REQUESTER },
      create: {
        email: REQUESTER_EMAIL,
        fullName: 'Requester Test User',
        passwordHash,
        role: Role.REQUESTER,
        mustChangePassword: false,
        isActive: true,
      },
    });
    requesterToken = generateToken(requesterUser);

    // 3. Admin requiring password rotation
    mustChangeAdminUser = await prisma.user.upsert({
      where: { email: MUST_CHANGE_ADMIN_EMAIL },
      update: { isActive: true, mustChangePassword: true, role: Role.ADMINISTRATOR },
      create: {
        email: MUST_CHANGE_ADMIN_EMAIL,
        fullName: 'Must Change Admin',
        passwordHash,
        role: Role.ADMINISTRATOR,
        mustChangePassword: true,
        isActive: true,
      },
    });
    mustChangeAdminToken = generateToken(mustChangeAdminUser);

    // 4. Target user for modification tests
    targetUser = await prisma.user.upsert({
      where: { email: TARGET_USER_EMAIL },
      update: { isActive: true, mustChangePassword: false, role: Role.REQUESTER, fullName: 'Target User' },
      create: {
        email: TARGET_USER_EMAIL,
        fullName: 'Target User',
        passwordHash,
        role: Role.REQUESTER,
        mustChangePassword: false,
        isActive: true,
      },
    });
    createdUserIds.push(targetUser.id);
  });

  afterAll(async () => {
    // Clean up created users
    if (createdUserIds.length > 0) {
      await prisma.user.deleteMany({
        where: { id: { in: createdUserIds } },
      });
    }

    await prisma.user.deleteMany({
      where: {
        email: {
          in: [
            ADMIN_1_EMAIL,
            ADMIN_2_EMAIL,
            SOLE_ADMIN_EMAIL,
            STAFF_EMAIL,
            REQUESTER_EMAIL,
            MUST_CHANGE_ADMIN_EMAIL,
            TARGET_USER_EMAIL,
          ],
        },
      },
    });
  });

  describe('Security & Role-Based Access Control', () => {
    it('returns 401 Unauthorized when no Authorization token is provided', async () => {
      const res = await request(app).get('/api/admin/users');
      expect(res.status).toBe(401);
      expect(res.body.error).toMatch(/Unauthorized/i);
    });

    it('returns 403 Forbidden when accessed by a REQUESTER role', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${requesterToken}`);
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/Forbidden|Insufficient/i);
    });

    it('returns 403 Forbidden when accessed by an IT_STAFF role', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${staffToken}`);
      expect(res.status).toBe(403);
      expect(res.body.error).toMatch(/Forbidden|Insufficient/i);
    });

    it('returns 403 Forbidden when accessed by an Administrator flagged with mustChangePassword = true (BR-02)', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${mustChangeAdminToken}`);
      expect(res.status).toBe(403);
      expect(res.body.mustChangePassword).toBe(true);
    });
  });

  describe('GET /api/admin/users - User Roster & Filtering', () => {
    it('returns 200 OK and list of users with passwordHash omitted', async () => {
      const res = await request(app)
        .get('/api/admin/users')
        .set('Authorization', `Bearer ${admin1Token}`);

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThanOrEqual(4);

      for (const u of res.body) {
        expect(u).toHaveProperty('id');
        expect(u).toHaveProperty('fullName');
        expect(u).toHaveProperty('email');
        expect(u).toHaveProperty('role');
        expect(u).toHaveProperty('isActive');
        expect(u).toHaveProperty('mustChangePassword');
        expect(u).not.toHaveProperty('passwordHash');
      }
    });

    it('filters users by search query (name or email case-insensitively)', async () => {
      const res = await request(app)
        .get(`/api/admin/users?search=admin1`)
        .set('Authorization', `Bearer ${admin1Token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
      expect(res.body[0].email).toBe(ADMIN_1_EMAIL);
    });

    it('filters users by role (e.g. IT_STAFF)', async () => {
      const res = await request(app)
        .get('/api/admin/users?role=IT_STAFF')
        .set('Authorization', `Bearer ${admin1Token}`);

      expect(res.status).toBe(200);
      expect(res.body.length).toBeGreaterThanOrEqual(1);
      for (const u of res.body) {
        expect(u.role).toBe(Role.IT_STAFF);
      }
    });

    it('filters users by active status', async () => {
      const res = await request(app)
        .get('/api/admin/users?isActive=true')
        .set('Authorization', `Bearer ${admin1Token}`);

      expect(res.status).toBe(200);
      for (const u of res.body) {
        expect(u.isActive).toBe(true);
      }
    });
  });

  describe('POST /api/admin/users - Account Creation & Constraints', () => {
    it('returns 400 Bad Request if full name is missing or shorter than 2 chars', async () => {
      const res = await request(app)
        .post('/api/admin/users')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({
          fullName: 'A',
          email: `${PREFIX}shortname@toktickit.com`,
          role: 'REQUESTER',
          initialPassword: 'TempPassword123!',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Full name/i);
    });

    it('returns 400 Bad Request if email is invalid', async () => {
      const res = await request(app)
        .post('/api/admin/users')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({
          fullName: 'Valid Name',
          email: 'invalid-email-address',
          role: 'REQUESTER',
          initialPassword: 'TempPassword123!',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/email/i);
    });

    it('returns 400 Bad Request if role is invalid', async () => {
      const res = await request(app)
        .post('/api/admin/users')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({
          fullName: 'Valid Name',
          email: `${PREFIX}invalidrole@toktickit.com`,
          role: 'SUPER_HERO',
          initialPassword: 'TempPassword123!',
        });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Role must be/i);
    });

    it('returns 422 Unprocessable Entity if initial password fails complexity requirements', async () => {
      const res = await request(app)
        .post('/api/admin/users')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({
          fullName: 'Valid User',
          email: `${PREFIX}weakpwd@toktickit.com`,
          role: 'REQUESTER',
          initialPassword: 'weak',
        });

      expect(res.status).toBe(422);
      expect(res.body.error).toMatch(/complexity/i);
    });

    it('enforces BR-10: returns 409 Conflict if email is already registered (case-insensitive)', async () => {
      const res = await request(app)
        .post('/api/admin/users')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({
          fullName: 'Duplicate Email User',
          email: ADMIN_1_EMAIL.toUpperCase(),
          role: 'REQUESTER',
          initialPassword: 'TempPassword123!',
        });

      expect(res.status).toBe(409);
      expect(res.body.error).toMatch(/already registered/i);
    });

    it('creates new user with mustChangePassword = true and omits passwordHash in response (FR-22)', async () => {
      const newEmail = `${PREFIX}newbie@toktickit.com`;
      const res = await request(app)
        .post('/api/admin/users')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({
          fullName: 'Newbie Staff',
          email: newEmail,
          role: 'IT_STAFF',
          initialPassword: 'InitialSecret123!',
          isActive: true,
        });

      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
      createdUserIds.push(res.body.id);

      expect(res.body.fullName).toBe('Newbie Staff');
      expect(res.body.email).toBe(newEmail);
      expect(res.body.role).toBe(Role.IT_STAFF);
      expect(res.body.isActive).toBe(true);
      expect(res.body.mustChangePassword).toBe(true);
      expect(res.body.passwordHash).toBeUndefined();

      // Verify in DB that password was hashed
      const createdInDb = await prisma.user.findUnique({
        where: { id: res.body.id },
      });
      expect(createdInDb?.passwordHash).toBeDefined();
      const isMatch = await bcrypt.compare('InitialSecret123!', createdInDb!.passwordHash);
      expect(isMatch).toBe(true);
    });
  });

  describe('PATCH /api/admin/users/:id - User Modification & Safety Rules', () => {
    it('returns 400 Bad Request on invalid numeric ID', async () => {
      const res = await request(app)
        .patch('/api/admin/users/not-a-number')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({ fullName: 'Updated' });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/Invalid user ID/i);
    });

    it('returns 404 Not Found when user does not exist', async () => {
      const res = await request(app)
        .patch('/api/admin/users/9999999')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({ fullName: 'Nobody' });

      expect(res.status).toBe(404);
      expect(res.body.error).toMatch(/User not found/i);
    });

    it('enforces BR-07: returns 400 Bad Request if admin tries to deactivate own account', async () => {
      const res = await request(app)
        .patch(`/api/admin/users/${admin1User.id}`)
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({ isActive: false });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/cannot deactivate their own account/i);
    });

    it('enforces BR-08: returns 400 Bad Request if admin tries to change own role away from ADMINISTRATOR', async () => {
      const res = await request(app)
        .patch(`/api/admin/users/${admin1User.id}`)
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({ role: 'IT_STAFF' });

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/cannot change their own role away from ADMINISTRATOR/i);
    });

    it('enforces BR-09: returns 400 Bad Request if deactivating the last active Administrator', async () => {
      // Create a temporary sole admin in an isolated test
      const soleAdmin = await prisma.user.create({
        data: {
          fullName: 'Sole Admin',
          email: SOLE_ADMIN_EMAIL,
          role: Role.ADMINISTRATOR,
          isActive: true,
          passwordHash: await bcrypt.hash('Password123!', 10),
        },
      });
      createdUserIds.push(soleAdmin.id);

      try {
        // Temporarily deactivate other administrators to simulate count = 1
        await prisma.user.updateMany({
          where: { id: { not: soleAdmin.id }, role: Role.ADMINISTRATOR },
          data: { isActive: false },
        });

        const soleToken = generateToken(soleAdmin);

        // Now activeAdminCount is exactly 1 (soleAdmin)
        const res = await request(app)
          .patch(`/api/admin/users/${soleAdmin.id}`)
          .set('Authorization', `Bearer ${soleToken}`)
          .send({ isActive: false });

        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/Cannot deactivate/i);
      } finally {
        // Restore active status for all test admins
        await prisma.user.updateMany({
          where: { role: Role.ADMINISTRATOR },
          data: { isActive: true },
        });
      }
    });

    it('enforces BR-09: returns 400 Bad Request if demoting the last active Administrator', async () => {
      const soleAdmin2 = await prisma.user.create({
        data: {
          fullName: 'Sole Admin 2',
          email: `${PREFIX}sole2@toktickit.com`,
          role: Role.ADMINISTRATOR,
          isActive: true,
          passwordHash: await bcrypt.hash('Password123!', 10),
        },
      });
      createdUserIds.push(soleAdmin2.id);

      try {
        await prisma.user.updateMany({
          where: { id: { not: soleAdmin2.id }, role: Role.ADMINISTRATOR },
          data: { isActive: false },
        });

        const soleToken = generateToken(soleAdmin2);

        const res = await request(app)
          .patch(`/api/admin/users/${soleAdmin2.id}`)
          .set('Authorization', `Bearer ${soleToken}`)
          .send({ role: 'REQUESTER' });

        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/Cannot demote/i);
      } finally {
        await prisma.user.updateMany({
          where: { role: Role.ADMINISTRATOR },
          data: { isActive: true },
        });
      }
    });

    it('enforces BR-10: returns 409 Conflict if new email collides with another user', async () => {
      const res = await request(app)
        .patch(`/api/admin/users/${targetUser.id}`)
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({ email: ADMIN_1_EMAIL });

      expect(res.status).toBe(409);
      expect(res.body.error).toMatch(/already in use/i);
    });

    it('updates user details successfully (name, role, active status)', async () => {
      const res = await request(app)
        .patch(`/api/admin/users/${targetUser.id}`)
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({
          fullName: 'Updated Target Name',
          role: 'IT_STAFF',
          isActive: true,
        });

      expect(res.status).toBe(200);
      expect(res.body.fullName).toBe('Updated Target Name');
      expect(res.body.role).toBe(Role.IT_STAFF);
    });
  });

  describe('POST /api/admin/users/:id/reset-password - Password Reset Flow', () => {
    it('returns 404 when target user is not found', async () => {
      const res = await request(app)
        .post('/api/admin/users/9999999/reset-password')
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({ initialPassword: 'ResetPassword123!' });

      expect(res.status).toBe(404);
      expect(res.body.error).toMatch(/User not found/i);
    });

    it('returns 422 if new initial password fails complexity requirements', async () => {
      const res = await request(app)
        .post(`/api/admin/users/${targetUser.id}/reset-password`)
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({ initialPassword: 'weak' });

      expect(res.status).toBe(422);
      expect(res.body.error).toMatch(/complexity/i);
    });

    it('resets password, updates hash, and forces mustChangePassword = true (FR-24)', async () => {
      const res = await request(app)
        .post(`/api/admin/users/${targetUser.id}/reset-password`)
        .set('Authorization', `Bearer ${admin1Token}`)
        .send({ initialPassword: 'NewResetPass123!' });

      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/Password reset successfully/i);

      // Verify in DB
      const updatedUser = await prisma.user.findUnique({
        where: { id: targetUser.id },
      });
      expect(updatedUser?.mustChangePassword).toBe(true);

      const isMatch = await bcrypt.compare('NewResetPass123!', updatedUser!.passwordHash);
      expect(isMatch).toBe(true);
    });
  });
});
