import React, { useState, useEffect, useCallback } from 'react';
import { useRequester } from '../contexts/RequesterContext';
import { useAuth } from '../contexts/AuthContext';
import { AttachmentSection, AttachmentItem } from './AttachmentSection';

export interface PublicCommentItem {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    fullName?: string;
    name?: string;
    email: string;
    role: string;
  };
}

export interface InternalNoteItem {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    fullName?: string;
    name?: string;
    email: string;
    role: string;
  };
}

export interface StaffUserItem {
  id: number;
  fullName: string;
  email: string;
  role: string;
}

export interface TicketDetailData {
  id: number;
  ticketNumber: string;
  requesterId: number;
  requester?: { id: number; fullName?: string; name?: string; email: string };
  ownerId?: number | null;
  owner?: { id: number; fullName?: string; name?: string; email: string; role?: string } | null;
  summary: string;
  description: string;
  requestedPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string;
  itPriority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' | string | null;
  status: 'NEW' | 'OPEN' | 'IN_PROGRESS' | 'WAITING_FOR_REQUESTER' | 'RESOLVED' | 'CLOSED' | 'CANCELLED' | 'REOPENED' | string;
  currentStatus: string;
  resolutionSummary?: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  categoryName?: string;
  category?: { id: number; name: string };
  relatedSystemId?: number | null;
  relatedSystemName?: string | null;
  relatedSystem?: { id: number; name: string } | null;
  attachments: AttachmentItem[];
  publicComments?: PublicCommentItem[];
}

interface TicketDetailProps {
  ticketId: number;
  onBack: () => void;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({ ticketId, onBack }) => {
  const { selectedRequester } = useRequester();
  let user: any = null;
  let token: string | null = null;
  try {
    const auth = useAuth();
    user = auth.user;
    token = auth.token;
  } catch {
    user = null;
    token = null;
  }

  const isStaffOrAdmin = user?.role === 'IT_STAFF' || user?.role === 'ADMINISTRATOR';

  const [ticket, setTicket] = useState<TicketDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Operations state
  const [staffUsers, setStaffUsers] = useState<StaffUserItem[]>([]);
  const [isPerformingOp, setIsPerformingOp] = useState<boolean>(false);
  const [operationMessage, setOperationMessage] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

  // Dual-Stream conversation state
  const [activeTab, setActiveTab] = useState<'comments' | 'notes'>('comments');
  const [comments, setComments] = useState<PublicCommentItem[]>([]);
  const [notes, setNotes] = useState<InternalNoteItem[]>([]);
  const [commentInput, setCommentInput] = useState<string>('');
  const [noteInput, setNoteInput] = useState<string>('');
  const [isSubmittingComment, setIsSubmittingComment] = useState<boolean>(false);
  const [isSubmittingNote, setIsSubmittingNote] = useState<boolean>(false);

  // Resolve Modal state
  const [showResolveModal, setShowResolveModal] = useState<boolean>(false);
  const [resolutionInput, setResolutionInput] = useState<string>('');
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [resolveError, setResolveError] = useState<string | null>(null);

  // Requester resolution indication
  const [isSubmittingIndication, setIsSubmittingIndication] = useState<boolean>(false);
  const [hasIndicatedResolved, setHasIndicatedResolved] = useState<boolean>(false);

  // Unified Request Headers Helper
  const getAuthHeaders = useCallback((): HeadersInit => {
    if (token) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
    }
    if (selectedRequester) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer dev_requester_${selectedRequester.id}`,
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  }, [token, selectedRequester]);

  // 1. Fetch Ticket Detail
  const fetchTicketDetail = useCallback(async () => {
    setLoading(true);
    setErrorStatus(null);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        setErrorStatus(response.status);
        const data = await response.json().catch(() => ({}));
        if (response.status === 403) {
          setErrorMessage(data.error || 'You do not have permission to view this ticket.');
        } else if (response.status === 404) {
          setErrorMessage(data.error || 'Ticket not found.');
        } else {
          setErrorMessage(data.error || 'Failed to load ticket details.');
        }
        return;
      }

      const data: TicketDetailData = await response.json();
      setTicket(data);
      if (data.publicComments) {
        setComments(data.publicComments);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred while fetching ticket.');
    } finally {
      setLoading(false);
    }
  }, [ticketId, getAuthHeaders]);

  // 2. Fetch Public Comments
  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/tickets/${ticketId}/comments`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setComments(Array.isArray(data) ? data : data.comments || []);
      }
    } catch (e) {
      console.error('Failed to fetch comments:', e);
    }
  }, [ticketId, getAuthHeaders]);

  // 3. Fetch Internal Notes (Strictly for Staff & Admin)
  const fetchNotes = useCallback(async () => {
    if (!isStaffOrAdmin) return;
    try {
      const res = await fetch(`/api/tickets/${ticketId}/notes`, {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setNotes(Array.isArray(data) ? data : data.notes || []);
      }
    } catch (e) {
      console.error('Failed to fetch internal notes:', e);
    }
  }, [ticketId, isStaffOrAdmin, getAuthHeaders]);

  // 4. Fetch Active Staff Users for assignment
  const fetchStaffUsers = useCallback(async () => {
    if (!isStaffOrAdmin) return;
    try {
      const res = await fetch('/api/staff/users', {
        headers: getAuthHeaders(),
      });
      if (res.ok) {
        const data = await res.json();
        setStaffUsers(Array.isArray(data) ? data : []);
      }
    } catch (e) {
      console.error('Failed to fetch staff roster:', e);
    }
  }, [isStaffOrAdmin, getAuthHeaders]);

  useEffect(() => {
    fetchTicketDetail();
  }, [fetchTicketDetail]);

  useEffect(() => {
    if (ticket && isStaffOrAdmin) {
      fetchNotes();
      fetchStaffUsers();
    }
  }, [ticket?.id, isStaffOrAdmin, fetchNotes, fetchStaffUsers]);

  // Attachment Handlers
  const handleAttachmentUploaded = (newAttachment: AttachmentItem) => {
    if (!ticket) return;
    setTicket({
      ...ticket,
      attachments: [...(ticket.attachments || []), newAttachment],
    });
  };

  const handleAttachmentRemoved = (removedAttachment: AttachmentItem) => {
    if (!ticket) return;
    setTicket({
      ...ticket,
      attachments: (ticket.attachments || []).map((a) =>
        a.id === removedAttachment.id ? removedAttachment : a
      ),
    });
  };

  // Operations: Claim Ticket
  const handleClaim = async () => {
    setIsPerformingOp(true);
    setOperationMessage(null);
    try {
      const res = await fetch(`/api/staff/tickets/${ticketId}/claim`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (!res.ok) {
        setOperationMessage({ type: 'danger', text: data.error || 'Failed to claim ticket' });
      } else {
        setOperationMessage({ type: 'success', text: 'Ticket claimed successfully' });
        await fetchTicketDetail();
      }
    } catch (err: any) {
      setOperationMessage({ type: 'danger', text: err.message || 'Error claiming ticket' });
    } finally {
      setIsPerformingOp(false);
    }
  };

  // Operations: Reassign Owner
  const handleAssign = async (targetOwnerId: number | null) => {
    setIsPerformingOp(true);
    setOperationMessage(null);
    try {
      const res = await fetch(`/api/staff/tickets/${ticketId}/assign`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ownerId: targetOwnerId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOperationMessage({ type: 'danger', text: data.error || 'Failed to assign ticket' });
      } else {
        setOperationMessage({ type: 'success', text: 'Ticket assignment updated successfully' });
        await fetchTicketDetail();
      }
    } catch (err: any) {
      setOperationMessage({ type: 'danger', text: err.message || 'Error assigning ticket' });
    } finally {
      setIsPerformingOp(false);
    }
  };

  // Operations: Update IT Priority
  const handlePriorityChange = async (newPriority: string) => {
    setIsPerformingOp(true);
    setOperationMessage(null);
    try {
      const res = await fetch(`/api/staff/tickets/${ticketId}/priority`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ itPriority: newPriority }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOperationMessage({ type: 'danger', text: data.error || 'Failed to update IT priority' });
      } else {
        setOperationMessage({ type: 'success', text: 'IT Priority updated successfully' });
        await fetchTicketDetail();
      }
    } catch (err: any) {
      setOperationMessage({ type: 'danger', text: err.message || 'Error updating priority' });
    } finally {
      setIsPerformingOp(false);
    }
  };

  // Operations: Update Status
  const handleStatusChange = async (targetStatus: string) => {
    if (targetStatus === 'RESOLVED') {
      setResolutionInput('');
      setResolveError(null);
      setShowResolveModal(true);
      return;
    }

    setIsPerformingOp(true);
    setOperationMessage(null);
    try {
      const res = await fetch(`/api/staff/tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: targetStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOperationMessage({ type: 'danger', text: data.error || 'Failed to update status' });
      } else {
        setOperationMessage({ type: 'success', text: `Status updated to ${targetStatus}` });
        await fetchTicketDetail();
      }
    } catch (err: any) {
      setOperationMessage({ type: 'danger', text: err.message || 'Error updating status' });
    } finally {
      setIsPerformingOp(false);
    }
  };

  // Operations: Submit Resolution
  const handleConfirmResolve = async () => {
    const trimmed = resolutionInput.trim();
    if (trimmed.length < 3 || trimmed.length > 500) {
      setResolveError('Resolution summary must be between 3 and 500 characters.');
      return;
    }

    setIsResolving(true);
    setResolveError(null);
    try {
      const res = await fetch(`/api/staff/tickets/${ticketId}/resolve`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ resolutionSummary: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResolveError(data.error || 'Failed to resolve ticket');
      } else {
        setShowResolveModal(false);
        setOperationMessage({ type: 'success', text: 'Ticket resolved successfully' });
        await fetchTicketDetail();
      }
    } catch (err: any) {
      setResolveError(err.message || 'Error resolving ticket');
    } finally {
      setIsResolving(false);
    }
  };

  // Requester: Submit Problem Appears Resolved
  const handleResolveIndication = async () => {
    setIsSubmittingIndication(true);
    try {
      const res = await fetch(`/api/tickets/${ticketId}/resolve-indication`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ note: 'Verified by requester via Ticket Detail view' }),
      });
      if (res.ok) {
        setHasIndicatedResolved(true);
        await fetchComments();
        await fetchTicketDetail();
      }
    } catch (err) {
      console.error('Failed to submit resolution indication:', err);
    } finally {
      setIsSubmittingIndication(false);
    }
  };

  // Dual-Stream: Submit Public Comment
  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = commentInput.trim();
    if (!trimmed) return;

    setIsSubmittingComment(true);
    try {
      const res = await fetch(`/api/tickets/${ticketId}/comments`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ content: trimmed }),
      });
      if (res.ok) {
        setCommentInput('');
        await fetchComments();
      }
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Dual-Stream: Submit Internal Note
  const handlePostNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = noteInput.trim();
    if (!trimmed) return;

    setIsSubmittingNote(true);
    try {
      const res = await fetch(`/api/tickets/${ticketId}/notes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ content: trimmed }),
      });
      if (res.ok) {
        setNoteInput('');
        await fetchNotes();
      }
    } catch (err) {
      console.error('Failed to post internal note:', err);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  // Allowed Next Statuses based on current ticket status (State Transition Matrix)
  const getAllowedNextStatuses = (currStatus?: string): string[] => {
    switch (currStatus?.toUpperCase()) {
      case 'NEW':
        return ['OPEN', 'CANCELLED'];
      case 'OPEN':
        return ['IN_PROGRESS', 'WAITING_FOR_REQUESTER', 'CANCELLED'];
      case 'IN_PROGRESS':
        return ['WAITING_FOR_REQUESTER', 'RESOLVED', 'CANCELLED'];
      case 'WAITING_FOR_REQUESTER':
        return ['IN_PROGRESS', 'RESOLVED', 'CANCELLED'];
      case 'RESOLVED':
        return ['CLOSED', 'REOPENED'];
      case 'REOPENED':
        return ['IN_PROGRESS', 'RESOLVED', 'CANCELLED'];
      default:
        return [];
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority?.toUpperCase()) {
      case 'LOW':
        return 'badge-priority-low';
      case 'MEDIUM':
        return 'badge-priority-medium';
      case 'HIGH':
        return 'badge-priority-high';
      case 'CRITICAL':
      case 'URGENT':
        return 'badge-priority-critical';
      default:
        return 'bg-secondary text-white';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'NEW':
        return 'badge-status-new';
      case 'OPEN':
      case 'IN_PROGRESS':
      case 'WAITING_FOR_REQUESTER':
      case 'REOPENED':
        return 'badge-status-in-progress';
      case 'RESOLVED':
        return 'badge-status-resolved';
      case 'CLOSED':
      case 'CANCELLED':
        return 'badge-status-closed';
      default:
        return 'bg-secondary text-white';
    }
  };

  const formatDateTime = (isoDate?: string) => {
    if (!isoDate) return '-';
    try {
      const date = new Date(isoDate);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoDate;
    }
  };

  // Loading View
  if (loading) {
    return (
      <div
        className="zen-card p-5 text-center my-5"
        data-testid="ticket-detail-loading"
      >
        <div className="spinner-border text-primary-green mb-3" role="status">
          <span className="visually-hidden">Loading ticket details...</span>
        </div>
        <div className="text-muted fw-medium">Loading ticket details...</div>
      </div>
    );
  }

  // Error Views
  if (errorStatus === 403) {
    return (
      <div
        className="zen-card p-4 p-md-5 text-center"
        data-testid="ticket-detail-forbidden"
      >
        <div className="display-6 text-danger mb-3">⛔</div>
        <h2 className="h4 fw-bold text-dark mb-2">Access Denied</h2>
        <p className="text-muted mb-4">{errorMessage}</p>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onBack}
          aria-label="Back to My Tickets"
        >
          &larr; Back to My Tickets
        </button>
      </div>
    );
  }

  if (errorStatus === 404) {
    return (
      <div
        className="zen-card p-4 p-md-5 text-center"
        data-testid="ticket-detail-not-found"
      >
        <div className="display-6 text-warning mb-3">🔍</div>
        <h2 className="h4 fw-bold text-dark mb-2">Ticket Not Found</h2>
        <p className="text-muted mb-4">{errorMessage}</p>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onBack}
          aria-label="Back to My Tickets"
        >
          &larr; Back to My Tickets
        </button>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="zen-card p-4 p-md-5 text-center" data-testid="ticket-detail-error">
        <div className="display-6 text-warning mb-3">⚠️</div>
        <h2 className="h4 fw-bold text-dark mb-2">Unable to Load Ticket</h2>
        <p className="text-danger mb-4">{errorMessage}</p>
        <div className="d-flex justify-content-center gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onBack}
            aria-label="Back to My Tickets"
          >
            &larr; Back to My Tickets
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={fetchTicketDetail}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!ticket) return null;

  const currentTicketStatus = ticket.currentStatus || ticket.status;
  const isTerminal = currentTicketStatus === 'CLOSED' || currentTicketStatus === 'CANCELLED';
  const isResolved = currentTicketStatus === 'RESOLVED';
  const allowedNextStatuses = getAllowedNextStatuses(currentTicketStatus);

  return (
    <div className="ticket-detail-container" data-testid="ticket-detail-view">
      {/* Back Navigation Button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
          onClick={onBack}
          data-testid="ticket-detail-back-button"
          aria-label="Back to My Tickets"
        >
          <span aria-hidden="true">&larr;</span> Back to My Tickets
        </button>

        {isStaffOrAdmin && (
          <span className="badge bg-pale-green text-primary-green border border-success px-3 py-1 small fw-semibold">
            🛡️ Staff Operations Mode
          </span>
        )}
      </div>

      {operationMessage && (
        <div
          className={`alert alert-${operationMessage.type} alert-dismissible fade show mb-4`}
          role="alert"
        >
          {operationMessage.text}
          <button
            type="button"
            className="btn-close"
            onClick={() => setOperationMessage(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Main Ticket Card */}
      <div className="zen-card p-4 mb-4">
        {/* Header Bar */}
        <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 border-bottom pb-3 mb-4">
          <div>
            <div className="small text-muted mb-1">Ticket Number</div>
            <h2 className="h3 fw-bold text-primary-green mb-0">
              {ticket.ticketNumber}
            </h2>
          </div>
          <div className="d-flex flex-wrap gap-2 align-items-center">
            <span
              className={`badge px-3 py-2 rounded-pill fs-6 ${getStatusBadgeClass(
                currentTicketStatus
              )}`}
              data-testid="ticket-status-badge"
            >
              Status: {currentTicketStatus}
            </span>
            <span
              className={`badge px-3 py-2 rounded-pill fs-6 ${getPriorityBadgeClass(
                ticket.itPriority || ticket.requestedPriority
              )}`}
              data-testid="ticket-priority-badge"
            >
              Priority: {ticket.itPriority || ticket.requestedPriority}
            </span>
          </div>
        </div>

        {/* Staff & Admin Operational Toolbar */}
        {isStaffOrAdmin && (
          <div
            className="p-3 mb-4 rounded border"
            style={{ backgroundColor: '#F8FAF9', borderColor: '#D1E7DD' }}
            data-testid="staff-operations-toolbar"
          >
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="fw-bold text-primary-green small text-uppercase tracking-wider">
                ⚙️ IT Staff Ticket Operations
              </span>
            </div>

            <div className="row g-3 align-items-end">
              {/* Claim Action */}
              <div className="col-12 col-sm-6 col-md-3">
                <label className="form-label small text-muted mb-1">Claim Ticket</label>
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm w-100 fw-semibold"
                    onClick={handleClaim}
                    disabled={isPerformingOp || ticket.ownerId === user?.id}
                    title={
                      ticket.ownerId === user?.id
                        ? 'You already own this ticket'
                        : 'Claim ownership of this ticket'
                    }
                  >
                    {ticket.ownerId === user?.id ? '✓ Claimed by You' : '🙋 Claim Ownership'}
                  </button>
                </div>
              </div>

              {/* Assign Dropdown */}
              <div className="col-12 col-sm-6 col-md-3">
                <label htmlFor="assign-owner-select" className="form-label small text-muted mb-1">
                  Assigned Owner
                </label>
                <select
                  id="assign-owner-select"
                  className="form-select form-select-sm"
                  value={ticket.ownerId || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    handleAssign(val ? parseInt(val, 10) : null);
                  }}
                  disabled={isPerformingOp}
                >
                  <option value="">-- Unassigned --</option>
                  {staffUsers.map((su) => (
                    <option key={su.id} value={su.id}>
                      {su.fullName} ({su.role === 'ADMINISTRATOR' ? 'Admin' : 'Staff'})
                    </option>
                  ))}
                </select>
              </div>

              {/* IT Priority Select */}
              <div className="col-12 col-sm-6 col-md-3">
                <label htmlFor="it-priority-select" className="form-label small text-muted mb-1">
                  IT Priority
                </label>
                <select
                  id="it-priority-select"
                  className="form-select form-select-sm"
                  value={ticket.itPriority || ticket.requestedPriority}
                  onChange={(e) => handlePriorityChange(e.target.value)}
                  disabled={isPerformingOp || isTerminal}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>

              {/* Status Transition Select */}
              <div className="col-12 col-sm-6 col-md-3">
                <label htmlFor="status-transition-select" className="form-label small text-muted mb-1">
                  Change Status
                </label>
                <div className="d-flex gap-1">
                  <select
                    id="status-transition-select"
                    className="form-select form-select-sm"
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) {
                        handleStatusChange(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    disabled={isPerformingOp || isTerminal || allowedNextStatuses.length === 0}
                  >
                    <option value="" disabled>
                      {allowedNextStatuses.length === 0 ? 'Terminal (No Changes)' : 'Transition to...'}
                    </option>
                    {allowedNextStatuses.map((st) => (
                      <option key={st} value={st}>
                        &rarr; {st}
                      </option>
                    ))}
                  </select>

                  {/* Quick Resolve Button */}
                  {allowedNextStatuses.includes('RESOLVED') && (
                    <button
                      type="button"
                      className="btn btn-success btn-sm text-nowrap fw-semibold px-2"
                      onClick={() => {
                        setResolutionInput('');
                        setResolveError(null);
                        setShowResolveModal(true);
                      }}
                      title="Resolve Ticket"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timestamps & Parties Bar */}
        <div className="row g-3 mb-4 p-3 bg-light rounded border">
          <div className="col-12 col-sm-6 col-md-3">
            <span className="text-muted small d-block">Requester</span>
            <span className="fw-semibold small">
              {ticket.requester?.fullName || ticket.requester?.name || `User #${ticket.requesterId}`}
            </span>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <span className="text-muted small d-block">Assigned IT Staff</span>
            <span className="fw-semibold small">
              {ticket.owner ? (
                <span className="text-primary-green">
                  👤 {ticket.owner.fullName || ticket.owner.name}
                </span>
              ) : (
                <span className="text-muted fst-italic">Unassigned</span>
              )}
            </span>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <span className="text-muted small d-block">Created Date</span>
            <span className="fw-semibold small">{formatDateTime(ticket.createdAt)}</span>
          </div>
          <div className="col-12 col-sm-6 col-md-3">
            <span className="text-muted small d-block">Last Updated</span>
            <span className="fw-semibold small">{formatDateTime(ticket.updatedAt)}</span>
          </div>
        </div>

        {/* Classification Fields Grid */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label text-muted small mb-1">Category</label>
            <div className="zen-readonly-box fw-medium">
              {ticket.categoryName || ticket.category?.name || '-'}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <label className="form-label text-muted small mb-1">Related System</label>
            <div className="zen-readonly-box fw-medium">
              {ticket.relatedSystemName || ticket.relatedSystem?.name || 'None'}
            </div>
          </div>
        </div>

        {/* Summary & Description */}
        <div className="mb-4">
          <label className="form-label text-muted small mb-1">Summary</label>
          <div className="zen-readonly-box fw-bold fs-6 mb-3">
            {ticket.summary}
          </div>

          <label className="form-label text-muted small mb-1">Description</label>
          <div
            className="zen-readonly-box"
            style={{ minHeight: '100px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}
          >
            {ticket.description}
          </div>
        </div>

        {/* Resolution Summary Card (Visible if resolved/closed) */}
        {(isResolved || currentTicketStatus === 'CLOSED') && ticket.resolutionSummary && (
          <div className="resolution-summary-card mb-4" data-testid="resolution-summary-card">
            <div className="d-flex align-items-center gap-2 mb-2 text-primary-green fw-bold">
              <span>✅ Formal Resolution Summary</span>
            </div>
            <p className="mb-0 text-dark" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
              {ticket.resolutionSummary}
            </p>
          </div>
        )}

        {/* Requester "Problem Appears Resolved" Section (For Requesters on active tickets) */}
        {!isStaffOrAdmin && !isTerminal && !isResolved && (
          <div className="p-3 mb-4 rounded border bg-light d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div>
              <div className="fw-bold text-dark small mb-1">Does the problem appear resolved?</div>
              <div className="text-muted small">
                If the issue has been resolved on your end, let the IT team know!
              </div>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-outline-success btn-sm fw-semibold"
                onClick={handleResolveIndication}
                disabled={isSubmittingIndication || hasIndicatedResolved}
              >
                {hasIndicatedResolved
                  ? '✓ Indicated as Resolved'
                  : '👍 Problem Appears Resolved'}
              </button>
            </div>
          </div>
        )}

        {/* Attachments Section */}
        <div className="border-top pt-4 mb-4">
          <AttachmentSection
            ticketId={ticket.id}
            requesterId={ticket.requesterId}
            attachments={ticket.attachments || []}
            onAttachmentUploaded={handleAttachmentUploaded}
            onAttachmentRemoved={handleAttachmentRemoved}
          />
        </div>
      </div>

      {/* Dual-Stream Communication Section */}
      <div className="zen-card p-4 mb-5" data-testid="ticket-conversation-section">
        {/* Tab Header */}
        <div className="d-flex border-bottom pb-2 mb-3 gap-2">
          <button
            type="button"
            className={`zen-nav-tab ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
            data-testid="public-comments-tab"
          >
            💬 Public Comments ({comments.length})
          </button>

          {isStaffOrAdmin && (
            <button
              type="button"
              className={`zen-nav-tab ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
              data-testid="internal-notes-tab"
              style={
                activeTab === 'notes'
                  ? { backgroundColor: '#FFA000', borderColor: '#FFA000', color: '#FFFFFF' }
                  : {}
              }
            >
              🔒 Internal Notes ({notes.length})
            </button>
          )}
        </div>

        {/* Public Comments Tab Content */}
        {activeTab === 'comments' && (
          <div data-testid="public-comments-panel">
            <div className="text-muted small mb-3">
              Visible to the requester, assigned IT staff, and administrators.
            </div>

            {/* Comments List */}
            <div className="d-flex flex-column gap-3 mb-4">
              {comments.length === 0 ? (
                <div className="text-center text-muted py-4 fst-italic">
                  No public comments yet. Post the first message below.
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="comment-bubble-green">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="fw-bold small text-primary-green">
                        {comment.author?.fullName || comment.author?.name || 'User'}
                        {comment.author?.role && comment.author.role !== 'REQUESTER' && (
                          <span className="badge bg-secondary ms-2 small">
                            {comment.author.role === 'ADMINISTRATOR' ? 'Admin' : 'IT Staff'}
                          </span>
                        )}
                      </div>
                      <span className="text-muted small">{formatDateTime(comment.createdAt)}</span>
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                      {comment.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Composer */}
            <form onSubmit={handlePostComment}>
              <div className="mb-2">
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Type a public message or update..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  disabled={isSubmittingComment}
                  maxLength={2000}
                  aria-label="Add Public Comment"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">{commentInput.length}/2000</span>
                <button
                  type="submit"
                  className="btn btn-primary btn-sm px-3 fw-semibold"
                  disabled={isSubmittingComment || !commentInput.trim()}
                >
                  {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Confidential Internal Notes Tab Content (Staff & Admin Only) */}
        {activeTab === 'notes' && isStaffOrAdmin && (
          <div data-testid="internal-notes-panel">
            <div className="confidential-banner d-flex align-items-center gap-2 mb-3">
              <span>🔒</span>
              <span>
                <strong>Confidential Internal Notes</strong> — Strictly visible only to IT Staff and Administrators. Never disclosed to Requesters.
              </span>
            </div>

            {/* Notes List */}
            <div className="d-flex flex-column gap-3 mb-4">
              {notes.length === 0 ? (
                <div className="text-center text-muted py-4 fst-italic">
                  No internal notes recorded yet.
                </div>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="note-bubble-amber">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="fw-bold small" style={{ color: '#B06000' }}>
                        🔒 {note.author?.fullName || note.author?.name || 'Staff Member'}
                        <span className="badge bg-warning text-dark ms-2 small">
                          {note.author?.role === 'ADMINISTRATOR' ? 'Admin' : 'IT Staff'}
                        </span>
                      </div>
                      <span className="text-muted small">{formatDateTime(note.createdAt)}</span>
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                      {note.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Note Composer */}
            <form onSubmit={handlePostNote}>
              <div className="mb-2">
                <textarea
                  className="form-control border-warning"
                  rows={3}
                  placeholder="Record private technical observation, triage step, or internal note..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  disabled={isSubmittingNote}
                  maxLength={2000}
                  aria-label="Add Internal Note"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">{noteInput.length}/2000</span>
                <button
                  type="submit"
                  className="btn btn-warning btn-sm px-3 fw-semibold text-dark"
                  disabled={isSubmittingNote || !noteInput.trim()}
                >
                  {isSubmittingNote ? 'Saving Note...' : 'Add Internal Note'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Resolve Ticket Modal */}
      {showResolveModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-pale-green text-primary-green">
                <h5 className="modal-title fw-bold">Resolve Ticket {ticket.ticketNumber}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowResolveModal(false)}
                  disabled={isResolving}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body p-4">
                <p className="text-muted small mb-3">
                  Please provide a clear, detailed explanation of how this issue was resolved. This resolution summary is mandatory (3–500 characters) and will be visible to the requester.
                </p>

                {resolveError && (
                  <div className="alert alert-danger small py-2 mb-3" role="alert">
                    {resolveError}
                  </div>
                )}

                <div className="mb-2">
                  <label htmlFor="resolution-summary-input" className="form-label small fw-bold">
                    Resolution Summary *
                  </label>
                  <textarea
                    id="resolution-summary-input"
                    className="form-control"
                    rows={4}
                    placeholder="Describe the diagnosis and steps taken to resolve the issue..."
                    value={resolutionInput}
                    onChange={(e) => setResolutionInput(e.target.value)}
                    maxLength={500}
                    disabled={isResolving}
                  />
                </div>
                <div className="d-flex justify-content-between small text-muted">
                  <span>Minimum 3 characters</span>
                  <span
                    className={
                      resolutionInput.trim().length < 3 || resolutionInput.trim().length > 500
                        ? 'text-danger fw-semibold'
                        : 'text-success fw-semibold'
                    }
                  >
                    {resolutionInput.trim().length} / 500
                  </span>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => setShowResolveModal(false)}
                  disabled={isResolving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success btn-sm fw-semibold px-3"
                  onClick={handleConfirmResolve}
                  disabled={
                    isResolving ||
                    resolutionInput.trim().length < 3 ||
                    resolutionInput.trim().length > 500
                  }
                >
                  {isResolving ? 'Resolving...' : 'Confirm Resolution'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
