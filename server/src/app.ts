import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'TokTickIT API'
  });
});

app.get('/api/categories', async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer dev_requester_')) {
      res.status(401).json({ error: 'Unauthorized: Missing or invalid mock token' });
      return;
    }

    const requesterIdStr = authHeader.split('dev_requester_')[1];
    const requesterId = parseInt(requesterIdStr, 10);

    if (isNaN(requesterId)) {
      res.status(401).json({ error: 'Unauthorized: Invalid requester ID format' });
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
        // Find the latest ticket for the current year
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

export default app;
