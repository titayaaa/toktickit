import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, authenticate, generateToken } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Password complexity regex: at least 8 chars, 1 uppercase, 1 lowercase, 1 digit
const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // BR-01: Only an active user with valid credentials may authenticate.
    // Return identical 401 message for nonexistent or inactive accounts to prevent account enumeration.
    if (!user || !user.isActive) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = generateToken(user);

    // Set secure HTTP-only cookie
    res.cookie('toktickit_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        mustChangePassword: user.mustChangePassword,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Failed to process login request' });
  }
});

// POST /api/auth/logout
router.post('/logout', (_req: Request, res: Response): void => {
  res.clearCookie('toktickit_token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// GET /api/auth/me
router.get('/me', authenticate, (req: AuthRequest, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  res.status(200).json({
    user: {
      id: req.user.id,
      email: req.user.email,
      fullName: req.user.fullName,
      role: req.user.role,
      mustChangePassword: req.user.mustChangePassword,
    },
  });
});

// POST /api/auth/change-password
router.post('/change-password', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!currentPassword || !newPassword) {
      res.status(422).json({ error: 'Current password and new password are required' });
      return;
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, req.user.passwordHash);
    if (!isMatch) {
      res.status(422).json({ error: 'Current password is incorrect' });
      return;
    }

    // BR-04: Validate password complexity
    if (!PASSWORD_COMPLEXITY_REGEX.test(newPassword)) {
      res.status(422).json({
        error: 'New password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one numeric digit',
      });
      return;
    }

    // Cannot reuse exact same password
    const isSameAsCurrent = await bcrypt.compare(newPassword, req.user.passwordHash);
    if (isSameAsCurrent) {
      res.status(422).json({ error: 'New password must be different from current password' });
      return;
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        passwordHash: newHash,
        mustChangePassword: false,
      },
    });

    res.status(200).json({
      message: 'Password changed successfully',
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        role: updatedUser.role,
        mustChangePassword: updatedUser.mustChangePassword,
      },
    });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

export default router;
