import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient, Role, Prisma } from '@prisma/client';
import { AuthRequest, authenticate, requireRole } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password complexity regex: at least 8 chars, 1 uppercase, 1 lowercase, 1 numeric digit
const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// All admin routes require authentication and ADMINISTRATOR role
router.use(authenticate);
router.use(requireRole(Role.ADMINISTRATOR));

/**
 * GET /api/admin/users
 * Returns list of users with optional search and filters, omitting passwordHash.
 */
router.get('/users', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { search, q, role, isActive, status } = req.query;
    const searchTerm = ((search || q) as string | undefined)?.trim();
    const where: Prisma.UserWhereInput = {};

    // Search query matching fullName or email (case-insensitive)
    if (searchTerm) {
      where.OR = [
        { fullName: { contains: searchTerm, mode: 'insensitive' } },
        { email: { contains: searchTerm, mode: 'insensitive' } },
      ];
    }

    // Role filter
    if (role && typeof role === 'string' && role.trim() !== '') {
      const upperRole = role.trim().toUpperCase();
      if (Object.values(Role).includes(upperRole as Role)) {
        where.role = upperRole as Role;
      }
    }

    // Active status filter
    const activeFilter = isActive !== undefined ? isActive : status;
    if (activeFilter !== undefined && activeFilter !== '') {
      where.isActive = String(activeFilter) === 'true' || String(activeFilter) === 'active';
    }

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [{ fullName: 'asc' }, { createdAt: 'desc' }],
    });

    const sanitizedUsers = users.map((u) => ({
      ...u,
      name: u.fullName,
    }));

    res.status(200).json(sanitizedUsers);
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).json({ error: 'Failed to retrieve user list' });
  }
});

/**
 * POST /api/admin/users
 * Creates a new user account with temporary password and mustChangePassword = true.
 */
router.post('/users', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { fullName, name, email, role, initialPassword, isActive = true } = req.body;
    const rawName = fullName !== undefined ? fullName : name;

    if (typeof rawName !== 'string' || rawName.trim().length < 2) {
      res.status(400).json({ error: 'Full name must be at least 2 characters' });
      return;
    }

    const nameToUse = rawName.trim();

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim().toLowerCase())) {
      res.status(400).json({ error: 'Valid email address is required' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const upperRole = typeof role === 'string' ? role.trim().toUpperCase() : '';
    if (!Object.values(Role).includes(upperRole as Role)) {
      res.status(400).json({ error: 'Role must be one of: REQUESTER, IT_STAFF, ADMINISTRATOR' });
      return;
    }

    if (!initialPassword || typeof initialPassword !== 'string' || !PASSWORD_COMPLEXITY_REGEX.test(initialPassword)) {
      res.status(422).json({
        error: 'Password does not meet complexity requirements (min 8 characters, 1 uppercase, 1 lowercase, 1 number)',
      });
      return;
    }

    // BR-17: Check globally unique email address
    const existing = await prisma.user.findFirst({
      where: { email: { equals: normalizedEmail, mode: 'insensitive' } },
    });

    if (existing) {
      res.status(409).json({ error: 'Email address is already registered in the system' });
      return;
    }

    const passwordHash = await bcrypt.hash(initialPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName: nameToUse,
        email: normalizedEmail,
        role: upperRole as Role,
        passwordHash,
        mustChangePassword: true,
        isActive: isActive !== false,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      ...newUser,
      name: newUser.fullName,
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

/**
 * PATCH /api/admin/users/:id
 * Updates user attributes and activation status while enforcing BR-16, BR-17, BR-18, BR-19.
 */
router.patch('/users/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const targetId = parseInt(req.params.id as string, 10);
    if (isNaN(targetId) || targetId <= 0) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetId },
    });

    if (!targetUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { fullName, name, email, role, isActive } = req.body;
    const rawName = fullName !== undefined ? fullName : name;

    if (rawName !== undefined && (typeof rawName !== 'string' || rawName.trim().length < 2)) {
      res.status(400).json({ error: 'Full name must be at least 2 characters' });
      return;
    }

    if (email !== undefined && (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim().toLowerCase()))) {
      res.status(400).json({ error: 'Valid email address is required' });
      return;
    }

    if (role !== undefined && (typeof role !== 'string' || !Object.values(Role).includes(role.trim().toUpperCase() as Role))) {
      res.status(400).json({ error: 'Role must be one of: REQUESTER, IT_STAFF, ADMINISTRATOR' });
      return;
    }

    if (isActive !== undefined && typeof isActive !== 'boolean') {
      res.status(400).json({ error: 'isActive must be a boolean' });
      return;
    }

    // BR-18: Administrator cannot deactivate their own account (Self-Deactivation Guard)
    if (req.user!.id === targetId && isActive === false && targetUser.isActive === true) {
      res.status(400).json({ error: 'Administrators cannot deactivate their own account' });
      return;
    }

    // BR-18: Administrator cannot change their own role away from ADMINISTRATOR
    if (
      req.user!.id === targetId &&
      role !== undefined &&
      role.trim().toUpperCase() !== Role.ADMINISTRATOR &&
      targetUser.role === Role.ADMINISTRATOR
    ) {
      res.status(400).json({ error: 'Administrators cannot change their own role away from ADMINISTRATOR' });
      return;
    }

    // BR-19: Prevent deactivating or demoting the last active Administrator (Last Admin Protection)
    if (targetUser.role === Role.ADMINISTRATOR && targetUser.isActive === true) {
      const willBeInactive = isActive === false;
      const willDemote = role !== undefined && role.trim().toUpperCase() !== Role.ADMINISTRATOR;

      if (willBeInactive || willDemote) {
        const activeAdminCount = await prisma.user.count({
          where: { role: Role.ADMINISTRATOR, isActive: true },
        });

        if (activeAdminCount <= 1) {
          if (willBeInactive) {
            res.status(400).json({ error: 'Cannot deactivate the last active Administrator' });
            return;
          }
          if (willDemote) {
            res.status(400).json({ error: 'Cannot demote the last active Administrator' });
            return;
          }
        }
      }
    }

    // BR-17: Check globally unique email if updating email
    let normalizedEmail: string | undefined = undefined;
    if (email !== undefined && typeof email === 'string') {
      normalizedEmail = email.trim().toLowerCase();

      if (normalizedEmail !== targetUser.email.toLowerCase()) {
        const existingEmail = await prisma.user.findFirst({
          where: {
            id: { not: targetId },
            email: { equals: normalizedEmail, mode: 'insensitive' },
          },
        });

        if (existingEmail) {
          res.status(409).json({ error: 'Email address is already in use by another user' });
          return;
        }
      }
    }

    let upperRole: Role | undefined = undefined;
    if (role !== undefined && typeof role === 'string') {
      upperRole = role.trim().toUpperCase() as Role;
    }

    const updated = await prisma.user.update({
      where: { id: targetId },
      data: {
        ...(rawName !== undefined ? { fullName: rawName.trim() } : {}),
        ...(normalizedEmail ? { email: normalizedEmail } : {}),
        ...(upperRole ? { role: upperRole } : {}),
        ...(typeof isActive === 'boolean' ? { isActive } : {}),
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        isActive: true,
        mustChangePassword: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      ...updated,
      name: updated.fullName,
    });
  } catch (error) {
    console.error('Error updating admin user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
});

/**
 * POST /api/admin/users/:id/reset-password
 * Resets user password to temporary credentials and flags mustChangePassword = true.
 */
router.post('/users/:id/reset-password', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const targetId = parseInt(req.params.id as string, 10);
    if (isNaN(targetId) || targetId <= 0) {
      res.status(400).json({ error: 'Invalid user ID' });
      return;
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetId },
    });

    if (!targetUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const { initialPassword, newInitialPassword } = req.body;
    const pwdToSet = initialPassword || newInitialPassword;

    if (!pwdToSet || typeof pwdToSet !== 'string' || !PASSWORD_COMPLEXITY_REGEX.test(pwdToSet)) {
      res.status(422).json({
        error: 'Password does not meet complexity requirements (min 8 characters, 1 uppercase, 1 lowercase, 1 number)',
      });
      return;
    }

    const passwordHash = await bcrypt.hash(pwdToSet, 10);

    await prisma.user.update({
      where: { id: targetId },
      data: {
        passwordHash,
        mustChangePassword: true,
      },
    });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting admin user password:', error);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

export default router;
