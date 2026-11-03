import { Router, Response } from 'express';
import { PrismaClient, Role, ActionTakenStatus } from '@prisma/client';
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

// ===========================================================================
// Sprint 4 (Lab 4) — Actions Taken Endpoints (Issue 29)
// ===========================================================================

const ACTION_STATUS_TRANSITIONS: Record<ActionTakenStatus, ActionTakenStatus[]> = {
  PENDING: [ActionTakenStatus.IN_PROGRESS, ActionTakenStatus.COMPLETED, ActionTakenStatus.CANCELLED],
  IN_PROGRESS: [ActionTakenStatus.COMPLETED, ActionTakenStatus.CANCELLED],
  COMPLETED: [],
  CANCELLED: [],
};

const ACTION_INCLUDE = {
  performedBy: {
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
    },
  },
  assignee: {
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
    },
  },
};

/**
 * Helper to validate assignee: must exist, isActive = true, role = IT_STAFF | ADMINISTRATOR
 */
async function validateAssignee(assigneeId: number) {
  if (isNaN(assigneeId) || assigneeId <= 0) {
    return { valid: false, error: 'Invalid or missing assigneeId' };
  }
  const assignee = await prisma.user.findUnique({ where: { id: assigneeId } });
  if (!assignee || !assignee.isActive || (assignee.role !== Role.IT_STAFF && assignee.role !== Role.ADMINISTRATOR)) {
    return { valid: false, error: 'Assignee must be an active IT Staff or Administrator' };
  }
  return { valid: true, assignee };
}

/**
 * GET /api/tickets/:id/actions-taken
 * Access: IT_STAFF, ADMINISTRATOR, REQUESTER (owned tickets only; unowned tickets return 404 for data isolation)
 */
router.get('/:id/actions-taken', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(404).json({ error: 'Ticket not found' });
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

    // Data isolation (BR-04): Requesters can only view actions on tickets they own
    // Return 404 Not Found (instead of 403) to prevent ticket enumeration
    if (currentUser.role === Role.REQUESTER) {
      const isOwner =
        ticket.userId === currentUser.id ||
        (ticket.requester && (ticket.requester.id === currentUser.id || ticket.requester.email === currentUser.email)) ||
        (ticket.requesterUser && ticket.requesterUser.email === currentUser.email);

      if (!isOwner) {
        res.status(404).json({ error: 'Ticket not found' });
        return;
      }
    }

    const actions = await prisma.actionTaken.findMany({
      where: { ticketId },
      include: ACTION_INCLUDE,
      orderBy: [{ actionDateTime: 'asc' }, { createdAt: 'asc' }],
    });

    res.status(200).json(actions);
  } catch (error) {
    console.error('Error fetching actions taken:', error);
    res.status(500).json({ error: 'Failed to fetch actions taken' });
  }
});

/**
 * GET /api/tickets/:id/actions-taken/:actionId
 * Access: IT_STAFF, ADMINISTRATOR, REQUESTER (owned tickets only)
 */
router.get('/:id/actions-taken/:actionId', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const ticketId = parseInt(req.params.id as string, 10);
    const actionId = parseInt(req.params.actionId as string, 10);
    if (isNaN(ticketId) || isNaN(actionId) || ticketId <= 0 || actionId <= 0) {
      res.status(404).json({ error: 'Ticket or Action Taken not found' });
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
        (ticket.requester && (ticket.requester.id === currentUser.id || ticket.requester.email === currentUser.email)) ||
        (ticket.requesterUser && ticket.requesterUser.email === currentUser.email);

      if (!isOwner) {
        res.status(404).json({ error: 'Ticket not found' });
        return;
      }
    }

    const action = await prisma.actionTaken.findFirst({
      where: { id: actionId, ticketId },
      include: ACTION_INCLUDE,
    });

    if (!action) {
      res.status(404).json({ error: 'Action Taken not found' });
      return;
    }

    res.status(200).json(action);
  } catch (error) {
    console.error('Error fetching action taken by id:', error);
    res.status(500).json({ error: 'Failed to fetch action taken' });
  }
});

/**
 * POST /api/tickets/:id/actions-taken
 * Access: IT_STAFF, ADMINISTRATOR (Requesters return 403 Forbidden)
 * Body: { assigneeId, actionDescription, actionDateTime?, status?, result?, isFollowUpRequired?, followUpNote?, attachmentNotes? }
 */
router.post('/:id/actions-taken', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const currentUser = req.user!;
    if (currentUser.role === Role.REQUESTER) {
      res.status(403).json({ error: 'Forbidden: Insufficient role permissions' });
      return;
    }

    const ticketId = parseInt(req.params.id as string, 10);
    if (isNaN(ticketId) || ticketId <= 0) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });
    if (!ticket) {
      res.status(404).json({ error: 'Ticket not found' });
      return;
    }

    const {
      assigneeId,
      actionDescription,
      actionDateTime: rawActionDateTime,
      status: rawStatus,
      result: rawResult,
      isFollowUpRequired: rawFollowUp,
      followUpNote: rawFollowUpNote,
      attachmentNotes: rawAttachmentNotes,
    } = req.body;

    // Validate actionDescription (3 - 1000 characters)
    const desc = typeof actionDescription === 'string' ? actionDescription.trim() : '';
    if (!desc || desc.length < 3 || desc.length > 1000) {
      res.status(400).json({ error: 'Action description must be between 3 and 1,000 characters' });
      return;
    }

    // Validate assigneeId (422 Unprocessable Entity)
    const assigneeCheck = await validateAssignee(parseInt(assigneeId, 10));
    if (!assigneeCheck.valid) {
      res.status(422).json({ error: assigneeCheck.error });
      return;
    }

    // Validate status
    const status: ActionTakenStatus = rawStatus || ActionTakenStatus.PENDING;
    if (!Object.values(ActionTakenStatus).includes(status)) {
      res.status(400).json({ error: 'Invalid action status' });
      return;
    }

    // Validate result (optional for PENDING/IN_PROGRESS, mandatory 2-1000 chars for COMPLETED)
    let result: string | null = null;
    if (rawResult !== undefined && rawResult !== null) {
      if (typeof rawResult === 'string') {
        const trimmed = rawResult.trim();
        result = trimmed.length > 0 ? trimmed : null;
      }
    }

    if (result && result.length > 1000) {
      res.status(400).json({ error: 'Result summary exceeds maximum length of 1,000 characters' });
      return;
    }

    if (status === ActionTakenStatus.COMPLETED) {
      if (!result || result.length < 2) {
        res.status(400).json({ error: 'Result is required (at least 2 characters) when action status is COMPLETED' });
        return;
      }
    }

    // Validate follow-up
    const isFollowUpRequired = Boolean(rawFollowUp);
    let followUpNote: string | null = null;
    if (isFollowUpRequired) {
      const noteStr = typeof rawFollowUpNote === 'string' ? rawFollowUpNote.trim() : '';
      if (!noteStr || noteStr.length < 2 || noteStr.length > 500) {
        res.status(400).json({ error: 'Follow-up note is required (minimum 2 characters, maximum 500 characters) when follow-up is requested' });
        return;
      }
      followUpNote = noteStr;
    }

    // Validate actionDateTime
    let actionDateTime = new Date();
    if (rawActionDateTime !== undefined && rawActionDateTime !== null) {
      const parsed = new Date(rawActionDateTime);
      if (isNaN(parsed.getTime())) {
        res.status(400).json({ error: 'Invalid actionDateTime format' });
        return;
      }
      actionDateTime = parsed;
    }

    // Validate attachmentNotes (optional, max 500 chars)
    let attachmentNotes: string | null = null;
    if (rawAttachmentNotes !== undefined && rawAttachmentNotes !== null) {
      if (typeof rawAttachmentNotes === 'string') {
        const trimmed = rawAttachmentNotes.trim();
        if (trimmed.length > 500) {
          res.status(400).json({ error: 'Attachment notes exceed maximum length of 500 characters' });
          return;
        }
        attachmentNotes = trimmed.length > 0 ? trimmed : null;
      }
    }

    // Performed by authenticated user (anti-spoofing)
    const action = await prisma.actionTaken.create({
      data: {
        ticketId,
        performedById: currentUser.id,
        assigneeId: parseInt(assigneeId, 10),
        actionDateTime,
        actionDescription: desc,
        result,
        isFollowUpRequired,
        followUpNote,
        attachmentNotes,
        status,
      },
      include: ACTION_INCLUDE,
    });

    res.status(201).json(action);
  } catch (error) {
    console.error('Error creating action taken:', error);
    res.status(500).json({ error: 'Failed to create action taken' });
  }
});

/**
 * PATCH /api/tickets/:id/actions-taken/:actionId
 * Access: IT_STAFF, ADMINISTRATOR
 * Body: partial fields (status, result, actionDescription, assigneeId, isFollowUpRequired, followUpNote, attachmentNotes, actionDateTime)
 */
router.patch('/:id/actions-taken/:actionId', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const currentUser = req.user!;
    if (currentUser.role === Role.REQUESTER) {
      res.status(403).json({ error: 'Forbidden: Insufficient role permissions' });
      return;
    }

    const ticketId = parseInt(req.params.id as string, 10);
    const actionId = parseInt(req.params.actionId as string, 10);
    if (isNaN(ticketId) || isNaN(actionId) || ticketId <= 0 || actionId <= 0) {
      res.status(404).json({ error: 'Ticket or Action Taken not found' });
      return;
    }

    const existingAction = await prisma.actionTaken.findUnique({
      where: { id: actionId },
    });

    if (!existingAction || existingAction.ticketId !== ticketId) {
      res.status(404).json({ error: 'Action Taken not found for this ticket' });
      return;
    }

    const {
      status: targetStatusRaw,
      result: targetResultRaw,
      actionDescription: targetDescRaw,
      assigneeId: targetAssigneeRaw,
      isFollowUpRequired: targetFollowUpRaw,
      followUpNote: targetFollowUpNoteRaw,
      attachmentNotes: targetAttachRaw,
      actionDateTime: targetDateRaw,
    } = req.body;

    // Check status transition validity (BR-14 / BR-11)
    let targetStatus = existingAction.status;
    if (targetStatusRaw !== undefined && targetStatusRaw !== existingAction.status) {
      if (!Object.values(ActionTakenStatus).includes(targetStatusRaw)) {
        res.status(400).json({ error: 'Invalid action status' });
        return;
      }
      const allowedTransitions = ACTION_STATUS_TRANSITIONS[existingAction.status];
      if (!allowedTransitions.includes(targetStatusRaw)) {
        res.status(400).json({
          error: `Invalid status transition from ${existingAction.status} to ${targetStatusRaw}`,
        });
        return;
      }
      targetStatus = targetStatusRaw;
    }

    // Validate result
    let finalResult = existingAction.result;
    if (targetResultRaw !== undefined) {
      if (targetResultRaw === null) {
        finalResult = null;
      } else if (typeof targetResultRaw === 'string') {
        const trimmed = targetResultRaw.trim();
        finalResult = trimmed.length > 0 ? trimmed : null;
      }
    }

    if (finalResult && finalResult.length > 1000) {
      res.status(400).json({ error: 'Result summary exceeds maximum length of 1,000 characters' });
      return;
    }

    if (targetStatus === ActionTakenStatus.COMPLETED) {
      if (!finalResult || finalResult.length < 2) {
        res.status(400).json({
          error: 'Result is required (at least 2 characters) when action status is COMPLETED',
        });
        return;
      }
    }

    // Validate assignee if updated (422 Unprocessable Entity)
    let targetAssigneeId = existingAction.assigneeId;
    if (targetAssigneeRaw !== undefined) {
      const assigneeCheck = await validateAssignee(parseInt(targetAssigneeRaw, 10));
      if (!assigneeCheck.valid) {
        res.status(422).json({ error: assigneeCheck.error });
        return;
      }
      targetAssigneeId = parseInt(targetAssigneeRaw, 10);
    }

    // Validate follow-up if updated
    const targetFollowUpRequired = targetFollowUpRaw !== undefined
      ? Boolean(targetFollowUpRaw)
      : existingAction.isFollowUpRequired;

    let targetFollowUpNote = existingAction.followUpNote;
    if (targetFollowUpRequired) {
      if (targetFollowUpNoteRaw !== undefined) {
        const noteStr = typeof targetFollowUpNoteRaw === 'string' ? targetFollowUpNoteRaw.trim() : '';
        if (!noteStr || noteStr.length < 2 || noteStr.length > 500) {
          res.status(400).json({ error: 'Follow-up note is required (minimum 2 characters, maximum 500 characters) when follow-up is requested' });
          return;
        }
        targetFollowUpNote = noteStr;
      } else if (!targetFollowUpNote || targetFollowUpNote.length < 2) {
        res.status(400).json({ error: 'Follow-up note is required (minimum 2 characters, maximum 500 characters) when follow-up is requested' });
        return;
      }
    } else {
      // Clear followUpNote when followUpRequired is false (BR-07)
      targetFollowUpNote = null;
    }

    // Validate description if updated
    let targetDescription = existingAction.actionDescription;
    if (targetDescRaw !== undefined) {
      const desc = typeof targetDescRaw === 'string' ? targetDescRaw.trim() : '';
      if (!desc || desc.length < 3 || desc.length > 1000) {
        res.status(400).json({ error: 'Action description must be between 3 and 1,000 characters' });
        return;
      }
      targetDescription = desc;
    }

    // Validate attachment notes if updated
    let targetAttachmentNotes = existingAction.attachmentNotes;
    if (targetAttachRaw !== undefined && targetAttachRaw !== null) {
      if (typeof targetAttachRaw === 'string') {
        const trimmed = targetAttachRaw.trim();
        if (trimmed.length > 500) {
          res.status(400).json({ error: 'Attachment notes exceed maximum length of 500 characters' });
          return;
        }
        targetAttachmentNotes = trimmed.length > 0 ? trimmed : null;
      }
    } else if (targetAttachRaw === null) {
      targetAttachmentNotes = null;
    }

    // Validate date if updated
    let targetActionDateTime = existingAction.actionDateTime;
    if (targetDateRaw !== undefined && targetDateRaw !== null) {
      const parsed = new Date(targetDateRaw);
      if (isNaN(parsed.getTime())) {
        res.status(400).json({ error: 'Invalid actionDateTime format' });
        return;
      }
      targetActionDateTime = parsed;
    }

    const updated = await prisma.actionTaken.update({
      where: { id: actionId },
      data: {
        actionDescription: targetDescription,
        assigneeId: targetAssigneeId,
        status: targetStatus,
        result: finalResult,
        isFollowUpRequired: targetFollowUpRequired,
        followUpNote: targetFollowUpNote,
        attachmentNotes: targetAttachmentNotes,
        actionDateTime: targetActionDateTime,
      },
      include: ACTION_INCLUDE,
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error('Error updating action taken:', error);
    res.status(500).json({ error: 'Failed to update action taken' });
  }
});

export default router;
