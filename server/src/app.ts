import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer configuration for attachments
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_ACTIVE_ATTACHMENTS = 5;
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
];

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${crypto.randomUUID()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
});

// Helper for extracting Requester ID
function extractRequesterId(req: Request): number | null {
  // 1. Authorization: Bearer dev_requester_X
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer dev_requester_')) {
    const parsed = parseInt(authHeader.split('dev_requester_')[1], 10);
    if (!isNaN(parsed)) return parsed;
  }

  // 2. Query param ?X-Requester-Id= (useful for <a download> links)
  const queryId = req.query['x-requester-id'] || req.query['X-Requester-Id'];
  if (typeof queryId === 'string') {
    const parsed = parseInt(queryId, 10);
    if (!isNaN(parsed)) return parsed;
  }

  return null;
}

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'TokTickIT API'
  });
});

app.get('/api/categories', async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

app.get('/api/related-systems', async (_req: Request, res: Response) => {
  try {
    const systems = await prisma.relatedSystem.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    res.status(200).json(systems);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch related systems' });
  }
});

app.get('/api/requesters', async (_req: Request, res: Response) => {
  try {
    const requesters = await prisma.requesterUser.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
    res.status(200).json(requesters);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requesters' });
  }
});

app.post('/api/tickets', async (req: Request, res: Response): Promise<void> => {
  try {
    const requesterId = extractRequesterId(req);
    if (!requesterId) {
      res.status(401).json({ error: 'Unauthorized: Missing or invalid mock token' });
      return;
    }

    const requester = await prisma.requesterUser.findUnique({
      where: { id: requesterId, isActive: true },
    });

    if (!requester) {
      res.status(403).json({ error: 'Forbidden: Requester not found or inactive' });
      return;
    }

    const { summary, description, categoryId, relatedSystemId, requestedPriority } = req.body;

    if (!summary || summary.length < 1 || summary.length > 200) {
      res.status(400).json({ error: 'Summary must be between 1 and 200 characters' });
      return;
    }
    if (!description || description.length < 1 || description.length > 2000) {
      res.status(400).json({ error: 'Description must be between 1 and 2000 characters' });
      return;
    }
    if (typeof categoryId !== 'number' || typeof relatedSystemId !== 'number') {
      res.status(400).json({ error: 'Invalid categoryId or relatedSystemId' });
      return;
    }
    
    const validPriorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    if (!validPriorities.includes(requestedPriority)) {
      res.status(400).json({ error: 'Invalid requestedPriority' });
      return;
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId } });
    if (!category || !category.isActive) {
      res.status(400).json({ error: 'Category not found or inactive' });
      return;
    }

    const relatedSystem = await prisma.relatedSystem.findUnique({ where: { id: relatedSystemId } });
    if (!relatedSystem || !relatedSystem.isActive) {
      res.status(400).json({ error: 'Related System not found or inactive' });
      return;
    }

    const currentYear = new Date().getFullYear();
    const prefix = `TKT-${currentYear}-`;
    
    let newTicket = null;
    let retries = 0;
    const MAX_RETRIES = 3;

    while (retries < MAX_RETRIES && !newTicket) {
      try {
        const latestTicket = await prisma.ticket.findFirst({
          where: { ticketNumber: { startsWith: prefix } },
          orderBy: { ticketNumber: 'desc' },
        });

        let nextNumber = 1;
        if (latestTicket) {
          const lastNumStr = latestTicket.ticketNumber.replace(prefix, '');
          const parsedNum = parseInt(lastNumStr, 10);
          if (!isNaN(parsedNum)) {
            nextNumber = parsedNum + 1;
          }
        }

        const ticketNumber = `${prefix}${String(nextNumber).padStart(6, '0')}`;

        newTicket = await prisma.ticket.create({
          data: {
            ticketNumber,
            requesterId,
            categoryId,
            relatedSystemId,
            summary,
            description,
            requestedPriority,
            currentStatus: 'NEW',
          },
        });
      } catch (err: any) {
        if (err.code === 'P2002') {
          retries++;
          if (retries >= MAX_RETRIES) {
            res.status(500).json({ error: 'System is busy, please try again' });
            return;
          }
        } else {
          throw err;
        }
      }
    }

    res.status(201).json(newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Failed to create ticket' });
  }
});

// GET /api/tickets (Issue 12 - My Tickets API)
app.get('/api/tickets', async (req: Request, res: Response): Promise<void> => {
  try {
    const requesterId = extractRequesterId(req);
    if (!requesterId) {
      res.status(401).json({ error: 'Unauthorized: Missing or invalid mock token' });
      return;
    }

    const {
      search,
      category,
      categoryId,
      status,
      priority,
      page = '1',
      limit = '10',
      sortBy = 'createdAt',
      sort,
      sortDir = 'desc',
      order,
    } = req.query;

    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);

    if (isNaN(pageNum) || pageNum < 1 || isNaN(limitNum) || limitNum < 1) {
      res.status(400).json({ error: 'Invalid page or limit parameter' });
      return;
    }

    // Build Prisma where filter (Enforce Ownership: only own tickets)
    const where: any = {
      requesterId,
    };

    // Category filter (supports either category or categoryId)
    const catFilter = category || categoryId;
    if (catFilter) {
      const parsedCatId = parseInt(catFilter as string, 10);
      if (isNaN(parsedCatId) || parsedCatId <= 0) {
        res.status(400).json({ error: `Invalid category parameter: ${catFilter}` });
        return;
      }
      where.categoryId = parsedCatId;
    }

    // Status filter
    if (status && typeof status === 'string' && status.trim() !== '') {
      const validStatuses = ['NEW', 'OPEN', 'IN_PROGRESS', 'PENDING', 'RESOLVED', 'CLOSED', 'CANCELLED'];
      // Map friendly UI wording if needed
      const normalizedStatus = status.trim().toUpperCase().replace(/\s+/g, '_');
      if (validStatuses.includes(normalizedStatus)) {
        where.currentStatus = normalizedStatus;
      } else {
        res.status(400).json({ error: `Invalid status parameter: ${status}` });
        return;
      }
    }

    // Priority filter
    if (priority && typeof priority === 'string' && priority.trim() !== '') {
      const validPriorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
      const normalizedPriority = priority.trim().toUpperCase();
      if (validPriorities.includes(normalizedPriority)) {
        where.requestedPriority = normalizedPriority;
      } else {
        res.status(400).json({ error: `Invalid priority parameter: ${priority}` });
        return;
      }
    }

    // Search filter (ticketNumber or summary case-insensitive)
    if (search && typeof search === 'string' && search.trim() !== '') {
      const queryStr = search.trim();
      where.OR = [
        { ticketNumber: { contains: queryStr, mode: 'insensitive' } },
        { summary: { contains: queryStr, mode: 'insensitive' } },
      ];
    }

    // Sorting
    const sortField = (sort as string) || (sortBy as string) || 'createdAt';
    const sortDirection = ((order as string) || (sortDir as string) || 'desc').toLowerCase();
    const validSortDirections = ['asc', 'desc'];
    const dir = validSortDirections.includes(sortDirection) ? sortDirection : 'desc';

    const orderBy: any = {};
    if (['ticketNumber', 'summary', 'requestedPriority', 'currentStatus', 'createdAt', 'updatedAt'].includes(sortField)) {
      orderBy[sortField] = dir;
    } else {
      orderBy['createdAt'] = 'desc';
    }

    const PRIORITY_ORDER: Record<string, number> = {
      CRITICAL: 4,
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    };

    const isPrioritySort = sortField === 'requestedPriority' || sortField === 'priority';
    let tickets: any[];
    let totalCount: number;

    if (isPrioritySort) {
      const allMatching = await prisma.ticket.findMany({
        where,
        include: {
          category: { select: { id: true, name: true } },
          relatedSystem: { select: { id: true, name: true } },
          attachments: { select: { id: true, originalFilename: true, sizeBytes: true, removedAt: true } },
        },
      });

      totalCount = allMatching.length;
      allMatching.sort((a, b) => {
        const weightA = PRIORITY_ORDER[a.requestedPriority] ?? 0;
        const weightB = PRIORITY_ORDER[b.requestedPriority] ?? 0;
        return dir === 'asc' ? weightA - weightB : weightB - weightA;
      });

      tickets = allMatching.slice((pageNum - 1) * limitNum, pageNum * limitNum);
    } else {
      [totalCount, tickets] = await Promise.all([
        prisma.ticket.count({ where }),
        prisma.ticket.findMany({
          where,
          orderBy,
          skip: (pageNum - 1) * limitNum,
          take: limitNum,
          include: {
            category: { select: { id: true, name: true } },
            relatedSystem: { select: { id: true, name: true } },
            attachments: { select: { id: true, originalFilename: true, sizeBytes: true, removedAt: true } },
          },
        }),
      ]);
    }

    const totalPages = Math.ceil(totalCount / limitNum);

    // Format items to support both data/tickets properties
    const formattedTickets = tickets.map((t) => ({
      id: t.id,
      ticketNumber: t.ticketNumber,
      summary: t.summary,
      description: t.description,
      requestedPriority: t.requestedPriority,
      itPriority: t.itPriority,
      status: t.currentStatus,
      currentStatus: t.currentStatus,
      createdAt: t.createdAt.toISOString(),
      updatedAt: t.updatedAt.toISOString(),
      categoryId: t.categoryId,
      categoryName: t.category.name,
      category: t.category,
      relatedSystemId: t.relatedSystemId,
      relatedSystemName: t.relatedSystem.name,
      relatedSystem: t.relatedSystem,
      attachments: t.attachments,
    }));

    res.status(200).json({
      data: formattedTickets,
      tickets: formattedTickets,
      meta: {
        total: totalCount,
        totalCount,
        page: pageNum,
        currentPage: pageNum,
        limit: limitNum,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// GET /api/tickets/:id (Issue 14 - Ticket Detail View)
app.get('/api/tickets/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const requesterId = extractRequesterId(req);
    if (!requesterId) {
      res.status(401).json({ error: 'Unauthorized: Missing or invalid mock token' });
      return;
    }

    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id) || id <= 0) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true } },
        relatedSystem: { select: { id: true, name: true } },
        attachments: {
          select: {
            id: true,
            ticketId: true,
            originalFilename: true,
            storagePath: true,
            mimeType: true,
            sizeBytes: true,
            removedAt: true,
            removalReason: true,
            createdAt: true,
          },
          orderBy: { id: 'asc' },
        },
      },
    });

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    // AC-03 & FR-07: Prevent cross-requester access (Ownership protection)
    if (ticket.requesterId !== requesterId) {
      res.status(403).json({ error: 'Forbidden: You do not have permission to view this ticket' });
      return;
    }

    res.status(200).json({
      id: ticket.id,
      ticketNumber: ticket.ticketNumber,
      requesterId: ticket.requesterId,
      summary: ticket.summary,
      description: ticket.description,
      requestedPriority: ticket.requestedPriority,
      itPriority: ticket.itPriority,
      status: ticket.currentStatus,
      currentStatus: ticket.currentStatus,
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString(),
      categoryId: ticket.categoryId,
      categoryName: ticket.category.name,
      category: ticket.category,
      relatedSystemId: ticket.relatedSystemId,
      relatedSystemName: ticket.relatedSystem.name,
      relatedSystem: ticket.relatedSystem,
      attachments: ticket.attachments,
    });
  } catch (error) {
    console.error('Error fetching ticket detail:', error);
    res.status(500).json({ error: 'Failed to fetch ticket detail' });
  }
});

// ---------------------------------------------------------------------------
// Attachment Endpoints (Issue 11)
// ---------------------------------------------------------------------------

// POST /api/tickets/:id/attachments
app.post('/api/tickets/:id/attachments', async (req: Request, res: Response): Promise<void> => {
  const requesterId = extractRequesterId(req);
  if (!requesterId) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid mock token' });
    return;
  }

  const ticketId = parseInt(req.params.id as string, 10);
  if (isNaN(ticketId)) {
    res.status(404).json({ error: 'Ticket not found' });
    return;
  }

  const ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    res.status(404).json({ error: 'Ticket not found' });
    return;
  }

  if (ticket.requesterId !== requesterId) {
    res.status(403).json({ error: 'Forbidden: You do not have permission to add attachments to this ticket' });
    return;
  }

  upload.single('file')(req, res, async (err: any) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({ error: 'File size exceeds maximum limit of 5MB' });
        return;
      }
      res.status(400).json({ error: err.message || 'Upload failed' });
      return;
    }

    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Check file type
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype.toLowerCase())) {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      res.status(400).json({ error: 'Invalid file type. Only JPG, PNG, WEBP, and PDF are allowed.' });
      return;
    }

    try {
      // Check active attachment count (max 5)
      const activeCount = await prisma.attachment.count({
        where: {
          ticketId,
          removedAt: null,
        },
      });

      if (activeCount >= MAX_ACTIVE_ATTACHMENTS) {
        if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
        res.status(400).json({ error: `Maximum active attachments limit (${MAX_ACTIVE_ATTACHMENTS}) reached for this ticket` });
        return;
      }

      const attachment = await prisma.attachment.create({
        data: {
          ticketId,
          originalFilename: file.originalname,
          storagePath: file.filename,
          mimeType: file.mimetype,
          sizeBytes: file.size,
        },
      });

      res.status(201).json(attachment);
    } catch (createErr) {
      if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
      console.error('Error creating attachment:', createErr);
      res.status(500).json({ error: 'Failed to save attachment' });
    }
  });
});

// GET /api/attachments/:id/download
app.get('/api/attachments/:id/download', async (req: Request, res: Response): Promise<void> => {
  try {
    const requesterId = extractRequesterId(req);
    if (!requesterId) {
      res.status(401).json({ error: 'Unauthorized: Missing or invalid mock token' });
      return;
    }

    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(404).json({ error: 'Attachment not found' });
      return;
    }

    const attachment = await prisma.attachment.findUnique({
      where: { id },
      include: { ticket: true },
    });

    if (!attachment) {
      res.status(404).json({ error: 'Attachment not found' });
      return;
    }

    if (attachment.ticket.requesterId !== requesterId) {
      res.status(403).json({ error: 'Forbidden: You do not have permission to access this attachment' });
      return;
    }

    if (attachment.removedAt) {
      res.status(400).json({ error: 'Attachment has been removed and cannot be downloaded' });
      return;
    }

    const filePath = path.join(uploadsDir, attachment.storagePath);
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: 'Attachment file not found on server' });
      return;
    }

    res.setHeader('Content-Type', attachment.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(attachment.originalFilename)}"`);
    res.sendFile(filePath);
  } catch (error) {
    console.error('Error downloading attachment:', error);
    res.status(500).json({ error: 'Failed to download attachment' });
  }
});

// DELETE /api/attachments/:id
app.delete('/api/attachments/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const requesterId = extractRequesterId(req);
    if (!requesterId) {
      res.status(401).json({ error: 'Unauthorized: Missing or invalid mock token' });
      return;
    }

    const id = parseInt(req.params.id as string, 10);
    if (isNaN(id)) {
      res.status(404).json({ error: 'Attachment not found' });
      return;
    }

    const { reason } = req.body;
    if (!reason || typeof reason !== 'string' || !reason.trim()) {
      res.status(400).json({ error: 'Removal reason is required' });
      return;
    }

    const attachment = await prisma.attachment.findUnique({
      where: { id },
      include: { ticket: true },
    });

    if (!attachment) {
      res.status(404).json({ error: 'Attachment not found' });
      return;
    }

    if (attachment.ticket.requesterId !== requesterId) {
      res.status(403).json({ error: 'Forbidden: You do not have permission to remove this attachment' });
      return;
    }

    const updated = await prisma.attachment.update({
      where: { id },
      data: {
        removedAt: new Date(),
        removalReason: reason.trim(),
      },
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error('Error soft-removing attachment:', error);
    res.status(500).json({ error: 'Failed to remove attachment' });
  }
});

export default app;
