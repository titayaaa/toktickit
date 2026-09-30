import { Router, Response } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Apply authenticate middleware to comment, note, and resolution endpoints
/**
 * POST /api/tickets/:id/comments
 * Access: Ticket Requester (must own ticket), IT_STAFF, ADMINISTRATOR
 * Body: { content: string, indicatesResolved?: boolean }
 * BR-14: Append-only communication.
 * BR-15: Content must be non-empty string between 1 and 2,000 characters.
 */
router.post('/:id/comments', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(400).json({ error: 'Invalid ticket ID' });
      return;
    }

    const { content, indicatesResolved } = req.body;
    let commentText = typeof content === 'string' ? content.trim() : '';

    // If indicatesResolved is true and content is empty, provide default text per AC-12
    if (indicatesResolved && !commentText) {
      commentText = 'Requester indicated that the problem appears resolved.';
    }

    if (!commentText || commentText.length < 1 || commentText.length > 2000) {
      res.status(400).json({
        error: 'Comment content must be a non-empty string between 1 and 2,000 characters',
      });
      return;
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { requester: true, requesterUser: true },
    });

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const currentUser = req.user!;

    // Requesters can only comment on tickets they own
    if (currentUser.role === Role.REQUESTER) {
      const isOwner =
        ticket.userId === currentUser.id ||
        ticket.requesterId === currentUser.id ||
        (ticket.requester && ticket.requester.id === currentUser.id) ||
        (ticket.requesterUser && ticket.requesterUser.email === currentUser.email);

      if (!isOwner) {
        res.status(403).json({
          error: 'Forbidden: You do not have permission to comment on this ticket',
        });
        return;
      }
    }

    const newComment = await prisma.publicComment.create({
      data: {
        ticketId,
        userId: currentUser.id,
        content: commentText,
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Public comment created successfully',
      comment: newComment,
      data: newComment,
    });
  } catch (error) {
    console.error('Error creating public comment:', error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
});

/**
 * GET /api/tickets/:id/comments
 * Access: Ticket Requester (must own ticket), IT_STAFF, ADMINISTRATOR
 */
router.get('/:id/comments', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(400).json({ error: 'Invalid ticket ID' });
      return;
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { requester: true, requesterUser: true },
    });

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const currentUser = req.user!;

    // Requesters can only view comments on tickets they own
    if (currentUser.role === Role.REQUESTER) {
      const isOwner =
        ticket.userId === currentUser.id ||
        ticket.requesterId === currentUser.id ||
        (ticket.requester && ticket.requester.id === currentUser.id) ||
        (ticket.requesterUser && ticket.requesterUser.email === currentUser.email);

      if (!isOwner) {
        res.status(403).json({
          error: 'Forbidden: You do not have permission to view comments for this ticket',
        });
        return;
      }
    }

    const comments = await prisma.publicComment.findMany({
      where: { ticketId },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.status(200).json({
      comments,
      data: comments,
    });
  } catch (error) {
    console.error('Error retrieving comments:', error);
    res.status(500).json({ error: 'Failed to retrieve comments' });
  }
});

/**
 * POST /api/tickets/:id/notes
 * Access: IT_STAFF, ADMINISTRATOR ONLY
 * BR-13 & AC-05: Strictly confidential. Requesters receive 403 Forbidden without disclosing note contents.
 * BR-15: Content must be non-empty string between 1 and 2,000 characters.
 */
router.post('/:id/notes', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const currentUser = req.user!;

    // BR-13 & AC-05: Reject Requesters with 403 Forbidden
    if (currentUser.role === Role.REQUESTER) {
      res.status(403).json({
        error: 'Forbidden: Requesters are strictly prohibited from creating internal notes',
      });
      return;
    }

    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(400).json({ error: 'Invalid ticket ID' });
      return;
    }

    const { content } = req.body;
    const noteText = typeof content === 'string' ? content.trim() : '';

    if (!noteText || noteText.length < 1 || noteText.length > 2000) {
      res.status(400).json({
        error: 'Note content must be a non-empty string between 1 and 2,000 characters',
      });
      return;
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const newNote = await prisma.internalNote.create({
      data: {
        ticketId,
        userId: currentUser.id,
        content: noteText,
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Internal note created successfully',
      note: newNote,
      data: newNote,
    });
  } catch (error) {
    console.error('Error creating internal note:', error);
    res.status(500).json({ error: 'Failed to create internal note' });
  }
});

/**
 * GET /api/tickets/:id/notes
 * Access: IT_STAFF, ADMINISTRATOR ONLY
 * BR-13 & AC-05: Strictly confidential. Requesters receive 403 Forbidden without disclosing note contents.
 */
router.get('/:id/notes', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const currentUser = req.user!;

    // BR-13 & AC-05: Reject Requesters with 403 Forbidden
    if (currentUser.role === Role.REQUESTER) {
      res.status(403).json({
        error: 'Forbidden: Requesters are strictly prohibited from viewing internal notes',
      });
      return;
    }

    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(400).json({ error: 'Invalid ticket ID' });
      return;
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const notes = await prisma.internalNote.findMany({
      where: { ticketId },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: { createdAt: 'asc' },
    });

    res.status(200).json({
      notes,
      data: notes,
    });
  } catch (error) {
    console.error('Error retrieving internal notes:', error);
    res.status(500).json({ error: 'Failed to retrieve internal notes' });
  }
});

/**
 * POST /api/tickets/:id/resolve-indication
 * Access: Authenticated Requester who owns the ticket
 * BR-10 & AC-12: Requester indicates "Problem Appears Resolved" without directly closing ticket.
 */
router.post('/:id/resolve-indication', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(400).json({ error: 'Invalid ticket ID' });
      return;
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId },
      include: { requester: true, requesterUser: true },
    });

    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const currentUser = req.user!;

    if (currentUser.role === Role.REQUESTER) {
      const isOwner =
        ticket.userId === currentUser.id ||
        ticket.requesterId === currentUser.id ||
        (ticket.requester && ticket.requester.id === currentUser.id) ||
        (ticket.requesterUser && ticket.requesterUser.email === currentUser.email);

      if (!isOwner) {
        res.status(403).json({
          error: 'Forbidden: You do not have permission to indicate resolution on this ticket',
        });
        return;
      }
    }

    const { note } = req.body;
    const additionalText = typeof note === 'string' && note.trim() ? ` - ${note.trim()}` : '';
    const content = `[Requester Update] Problem appears resolved${additionalText}`;

    const comment = await prisma.publicComment.create({
      data: {
        ticketId,
        userId: currentUser.id,
        content,
      },
      include: {
        author: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
      },
    });

    res.status(200).json({
      message: 'Resolution indication submitted successfully',
      comment,
      data: comment,
    });
  } catch (error) {
    console.error('Error submitting resolution indication:', error);
    res.status(500).json({ error: 'Failed to submit resolution indication' });
  }
});

export default router;
