import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, Role, User } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'toktickit-super-secret-key-2026';

export interface AuthRequest extends Request {
  user?: User;
}

export function generateToken(user: { id: number; email: string; role: Role }): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

// Extract token from cookie or Authorization header
export function extractToken(req: Request): string | null {
  if (req.cookies && req.cookies.toktickit_token) {
    return req.cookies.toktickit_token;
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return null;
}

// Authentication middleware enforcing active account & mustChangePassword policy
export async function authenticate(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = extractToken(req);
    if (!token) {
      res.status(401).json({ error: 'Unauthorized: Missing authentication credentials' });
      return;
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ error: 'Unauthorized: Invalid email or password' });
      return;
    }

    req.user = user;

    // BR-02: A user marked as requiring a password change cannot enter the normal application
    // until a new valid password is saved. (Allowed paths: change-password, logout, me)
    if (user.mustChangePassword) {
      const normalizedPath = (req.originalUrl || req.path).split('?')[0];
      const isAllowed =
        normalizedPath.endsWith('/change-password') ||
        normalizedPath.endsWith('/logout') ||
        normalizedPath.endsWith('/me');

      if (!isAllowed) {
        res.status(403).json({
          error: 'Forbidden: Password rotation required before continuing',
          mustChangePassword: true,
        });
        return;
      }
    }

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({ error: 'Internal server error during authentication' });
  }
}

// Role-based authorization middleware
export function requireRole(...permittedRoles: Role[]) {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!permittedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden: Insufficient role permissions' });
      return;
    }

    next();
  };
}
