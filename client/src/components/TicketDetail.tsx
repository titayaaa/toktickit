import React, { useState, useEffect, useCallback } from 'react';
import { useRequester } from '../contexts/RequesterContext';
import { AttachmentSection, AttachmentItem } from './AttachmentSection';

export interface TicketDetailData {
  id: number;
  ticketNumber: string;
  requesterId: number;
  summary: string;
  description: string;
  requestedPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' | string;
  itPriority?: string | null;
  status: 'NEW' | 'OPEN' | 'IN_PROGRESS' | 'PENDING' | 'RESOLVED' | 'CLOSED' | 'CANCELLED' | string;
  currentStatus: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  categoryName?: string;
  category?: { id: number; name: string };
  relatedSystemId?: number | null;
  relatedSystemName?: string | null;
  relatedSystem?: { id: number; name: string } | null;
  attachments: AttachmentItem[];
}

interface TicketDetailProps {
  ticketId: number;
  onBack: () => void;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({ ticketId, onBack }) => {
  const { selectedRequester } = useRequester();

  const [ticket, setTicket] = useState<TicketDetailData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTicketDetail = useCallback(async () => {
    if (!selectedRequester) return;

    setLoading(true);
    setErrorStatus(null);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/tickets/${ticketId}`, {
        headers: {
          Authorization: `Bearer dev_requester_${selectedRequester.id}`,
        },
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
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred while fetching ticket.');
    } finally {
      setLoading(false);
    }
  }, [ticketId, selectedRequester]);

  useEffect(() => {
    fetchTicketDetail();
  }, [fetchTicketDetail]);

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

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority?.toUpperCase()) {
      case 'LOW':
        return 'badge-priority-low';
      case 'MEDIUM':
        return 'badge-priority-medium';
      case 'HIGH':
        return 'badge-priority-high';
      case 'CRITICAL':
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

  // Loading State
  if (loading) {
    return (
      <div className="zen-card p-4 p-md-5 text-center" data-testid="ticket-detail-loading">
        <div className="spinner-border text-success mb-3" role="status">
          <span className="visually-hidden">Loading ticket details...</span>
        </div>
        <p className="text-muted small mb-0">Loading ticket details...</p>
      </div>
    );
  }

  // 403 Forbidden State
  if (errorStatus === 403) {
    return (
      <div className="zen-card p-4 p-md-5 text-center" data-testid="ticket-detail-forbidden">
        <div className="display-6 text-danger mb-3">🚫</div>
        <h2 className="h4 fw-bold text-dark mb-2">Access Denied</h2>
        <p className="text-muted mb-4">
          {errorMessage || 'You do not have permission to view this ticket as it belongs to another requester.'}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onBack}
        >
          &larr; Back to My Tickets
        </button>
      </div>
    );
  }

  // 404 Not Found State
  if (errorStatus === 404) {
    return (
      <div className="zen-card p-4 p-md-5 text-center" data-testid="ticket-detail-not-found">
        <div className="display-6 text-muted mb-3">🔍</div>
        <h2 className="h4 fw-bold text-dark mb-2">Ticket Not Found</h2>
        <p className="text-muted mb-4">
          {errorMessage || 'The requested ticket could not be found or may have been deleted.'}
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onBack}
        >
          &larr; Back to My Tickets
        </button>
      </div>
    );
  }

  // Generic Error State
  if (errorMessage && !ticket) {
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

  return (
    <div className="ticket-detail-container" data-testid="ticket-detail-view">
      {/* Back Navigation Button */}
      <div className="mb-3">
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm d-inline-flex align-items-center gap-1"
          onClick={onBack}
          aria-label="Back to My Tickets"
        >
          <span aria-hidden="true">&larr;</span> Back to My Tickets
        </button>
      </div>

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
                ticket.currentStatus || ticket.status
              )}`}
              data-testid="ticket-status-badge"
            >
              Status: {ticket.currentStatus || ticket.status}
            </span>
            <span
              className={`badge px-3 py-2 rounded-pill fs-6 ${getPriorityBadgeClass(
                ticket.requestedPriority
              )}`}
              data-testid="ticket-priority-badge"
            >
              Priority: {ticket.requestedPriority}
            </span>
          </div>
        </div>

        {/* Timestamps Bar */}
        <div className="row g-3 mb-4 p-3 bg-light rounded border">
          <div className="col-12 col-sm-6">
            <span className="text-muted small d-block">Created Date</span>
            <span className="fw-semibold small">{formatDateTime(ticket.createdAt)}</span>
          </div>
          <div className="col-12 col-sm-6">
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

        {/* Content Section */}
        <div className="mb-4">
          <label className="form-label text-muted small mb-1">Summary</label>
          <div className="zen-readonly-box fw-bold fs-6 mb-3">
            {ticket.summary}
          </div>

          <label className="form-label text-muted small mb-1">Description</label>
          <div
            className="zen-readonly-box"
            style={{ minHeight: '120px', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}
          >
            {ticket.description}
          </div>
        </div>

        {/* Attachments Section */}
        <div className="border-top pt-4">
          {selectedRequester && (
            <AttachmentSection
              ticketId={ticket.id}
              requesterId={selectedRequester.id}
              attachments={ticket.attachments || []}
              onAttachmentUploaded={handleAttachmentUploaded}
              onAttachmentRemoved={handleAttachmentRemoved}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
