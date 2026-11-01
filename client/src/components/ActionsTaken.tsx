import React, { useState, useEffect, useMemo, useCallback } from 'react';

export interface ActionPerformer {
  id: number;
  fullName?: string;
  name?: string;
  email: string;
  role: string;
}

export interface ActionAssignee {
  id: number;
  fullName?: string;
  name?: string;
  email: string;
  role: string;
}

export interface ActionTakenItem {
  id: number;
  ticketId: number;
  actionDateTime: string;
  actionDescription: string;
  performedById: number;
  assigneeId: number;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | string;
  result?: string | null;
  isFollowUpRequired: boolean;
  followUpNote?: string | null;
  attachmentNotes?: string | null;
  createdAt: string;
  updatedAt: string;
  performedBy: ActionPerformer;
  assignee: ActionAssignee;
}

export interface AssignableUser {
  id: number;
  fullName?: string;
  name?: string;
  email: string;
  role: string;
}

interface ActionsTakenProps {
  ticketId: number;
  actions?: ActionTakenItem[];
  currentUserRole?: string;
  currentUserId?: number;
  onActionsChange?: (actions: ActionTakenItem[]) => void;
}

export const ActionsTaken: React.FC<ActionsTakenProps> = ({
  ticketId,
  actions = [],
  currentUserRole,
  currentUserId,
  onActionsChange,
}) => {
  const [items, setItems] = useState<ActionTakenItem[]>(actions);
  const [assignableStaff, setAssignableStaff] = useState<AssignableUser[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAction, setEditingAction] = useState<ActionTakenItem | null>(null);

  // Form State
  const [actionDateTime, setActionDateTime] = useState<string>('');
  const [assigneeId, setAssigneeId] = useState<number | string>('');
  const [status, setStatus] = useState<string>('PENDING');
  const [actionDescription, setActionDescription] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isFollowUpRequired, setIsFollowUpRequired] = useState<boolean>(false);
  const [followUpNote, setFollowUpNote] = useState<string>('');
  const [attachmentNotes, setAttachmentNotes] = useState<string>('');

  // UI state
  const [isSaving, setIsSaving] = useState(false);
  const [busyActionId, setBusyActionId] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const canManage = currentUserRole === 'IT_STAFF' || currentUserRole === 'ADMINISTRATOR';

  useEffect(() => {
    setItems(actions);
  }, [actions]);

  // Helper for resilient auth token retrieval
  const getAuthToken = () => localStorage.getItem('toktickit_auth_token') || localStorage.getItem('token');

  // Load assignable staff when form opens or component mounts for staff
  const loadAssignableStaff = useCallback(async () => {
    if (!canManage) return;
    try {
      const token = getAuthToken();
      const res = await fetch('/api/users/assignable', {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setAssignableStaff(data);
      }
    } catch {
      // Ignored: fallback to empty list
    }
  }, [canManage]);

  useEffect(() => {
    if (canManage) {
      loadAssignableStaff();
    }
  }, [canManage, loadAssignableStaff]);

  // Open open actions count
  const openActionsCount = useMemo(() => {
    return items.filter((a) => a.status === 'PENDING' || a.status === 'IN_PROGRESS').length;
  }, [items]);

  const openCreateForm = () => {
    setEditingAction(null);
    setActionDateTime(new Date().toISOString().slice(0, 16));
    setAssigneeId(currentUserId || (assignableStaff[0]?.id ?? ''));
    setStatus('PENDING');
    setActionDescription('');
    setResult('');
    setIsFollowUpRequired(false);
    setFollowUpNote('');
    setAttachmentNotes('');
    setFormError(null);
    setFieldErrors({});
    setIsFormOpen(true);
  };

  const openEditForm = (action: ActionTakenItem) => {
    setEditingAction(action);
    setActionDateTime(
      action.actionDateTime
        ? new Date(action.actionDateTime).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16)
    );
    setAssigneeId(action.assigneeId);
    setStatus(action.status);
    setActionDescription(action.actionDescription);
    setResult(action.result || '');
    setIsFollowUpRequired(action.isFollowUpRequired);
    setFollowUpNote(action.followUpNote || '');
    setAttachmentNotes(action.attachmentNotes || '');
    setFormError(null);
    setFieldErrors({});
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingAction(null);
    setFormError(null);
    setFieldErrors({});
  };

  // Keyboard Escape listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFormOpen) {
        closeForm();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFormOpen]);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!String(actionDescription).trim()) {
      errors.actionDescription = 'Action description is required.';
    } else if (actionDescription.trim().length < 3) {
      errors.actionDescription = 'Action description must be at least 3 characters.';
    }

    if (!assigneeId) {
      errors.assigneeId = 'Assignee is required.';
    }

    if (status === 'COMPLETED' && (!result || result.trim().length < 2)) {
      errors.result = 'Result summary is required (min 2 characters) when completing an action.';
    }

    if (isFollowUpRequired && (!followUpNote || followUpNote.trim().length < 2)) {
      errors.followUpNote = 'Follow-up note is mandatory (min 2 characters) when follow-up is required.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSaving) return;

    setIsSaving(true);
    setFormError(null);

    const token = getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const payload = {
      actionDateTime: actionDateTime ? new Date(actionDateTime).toISOString() : new Date().toISOString(),
      assigneeId: Number(assigneeId),
      actionDescription: actionDescription.trim(),
      status,
      result: result.trim() ? result.trim() : null,
      isFollowUpRequired,
      followUpNote: isFollowUpRequired ? followUpNote.trim() : null,
      attachmentNotes: attachmentNotes.trim() ? attachmentNotes.trim() : null,
    };

    try {
      if (editingAction) {
        // Edit Action: PATCH /api/tickets/:ticketId/actions-taken/:actionId
        const res = await fetch(`/api/tickets/${ticketId}/actions-taken/${editingAction.id}`, {
          method: 'PATCH',
          headers,
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || data.message || `Failed to update action (HTTP ${res.status})`);
        }

        const updated = await res.json();
        const nextItems = items.map((a) => (a.id === editingAction.id ? updated : a));
        setItems(nextItems);
        onActionsChange?.(nextItems);
      } else {
        // Create Action: POST /api/tickets/:ticketId/actions-taken
        const res = await fetch(`/api/tickets/${ticketId}/actions-taken`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || data.message || `Failed to create action (HTTP ${res.status})`);
        }

        const created = await res.json();
        const nextItems = [...items, created];
        setItems(nextItems);
        onActionsChange?.(nextItems);
      }

      closeForm();
    } catch (err: any) {
      setFormError(err.message || 'An error occurred while saving action taken.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleQuickStatusChange = async (action: ActionTakenItem, nextStatus: 'COMPLETED' | 'CANCELLED') => {
    if (busyActionId !== null) return;

    if (nextStatus === 'COMPLETED' && (!action.result || action.result.trim().length < 2)) {
      openEditForm({ ...action, status: 'COMPLETED' });
      return;
    }

    setBusyActionId(action.id);
    const token = getAuthToken();
    try {
      const res = await fetch(`/api/tickets/${ticketId}/actions-taken/${action.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: nextStatus }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || data.message || 'Failed to update action status');
      }

      const updated = await res.json();
      const nextItems = items.map((a) => (a.id === action.id ? updated : a));
      setItems(nextItems);
      onActionsChange?.(nextItems);
    } catch (err: any) {
      alert(err.message || 'Failed to update action status.');
    } finally {
      setBusyActionId(null);
    }
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return iso;
    }
  };

  const renderStatusBadge = (actionStatus: string) => {
    let bg = '#FFFBEB';
    let color = '#92400E';

    switch (actionStatus) {
      case 'IN_PROGRESS':
        bg = '#EFF6FF';
        color = '#1E40AF';
        break;
      case 'COMPLETED':
        bg = '#F0FDF4';
        color = '#166534';
        break;
      case 'CANCELLED':
        bg = '#FEF2F2';
        color = '#991B1B';
        break;
      case 'PENDING':
      default:
        bg = '#FFFBEB';
        color = '#92400E';
        break;
    }

    return (
      <span
        className="badge rounded-pill fw-semibold px-2 py-1"
        style={{ backgroundColor: bg, color }}
        data-testid={`action-status-badge-${actionStatus}`}
      >
        {actionStatus}
      </span>
    );
  };

  const renderRoleBadge = (role?: string, testId?: string) => {
    if (!role) return null;
    let bg = '#E0F2FE';
    let color = '#0369A1';
    if (role === 'ADMINISTRATOR') {
      bg = '#EDE9FE';
      color = '#6D28D9';
    } else if (role === 'REQUESTER') {
      bg = '#F3F4F6';
      color = '#374151';
    }
    return (
      <span
        className="badge rounded-pill fw-normal px-2"
        style={{ backgroundColor: bg, color, fontSize: '0.75rem' }}
        data-testid={testId}
      >
        {role}
      </span>
    );
  };

  return (
    <div
      className="zen-card p-4 mb-4"
      style={{ borderRadius: '12px', backgroundColor: '#FFFFFF' }}
      data-testid="actions-taken-section"
    >
      {/* Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3 pb-2 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <h3 className="h5 fw-bold mb-0 text-dark" style={{ color: '#1A2B22' }}>
            Actions Taken
          </h3>
          <span
            className="badge rounded-pill px-2 py-1 fw-bold"
            style={{ backgroundColor: '#EAF6EF', color: '#006B3C' }}
            data-testid="actions-taken-count"
          >
            {items.length}
          </span>
        </div>

        {canManage && !isFormOpen && (
          <button
            type="button"
            className="btn btn-sm text-white fw-semibold d-inline-flex align-items-center gap-1"
            style={{ backgroundColor: '#006B3C', borderColor: '#006B3C', minHeight: 44 }}
            onClick={openCreateForm}
            data-testid="add-action-taken-btn"
          >
            <span aria-hidden="true">+</span> Add Action Taken
          </button>
        )}
      </div>

      {/* Resolution Warning Banner if pending actions exist */}
      {openActionsCount > 0 && (
        <div
          className="alert border-0 shadow-sm d-flex align-items-center gap-2 mb-3"
          role="status"
          style={{ backgroundColor: '#FEF3C7', color: '#92400E', border: '1px solid #F59E0B' }}
          data-testid="actions-resolution-warning"
        >
          <span aria-hidden="true">⚠️</span>
          <span className="small fw-semibold">
            {openActionsCount} action(s) in progress. Complete or cancel all actions before resolving ticket.
          </span>
        </div>
      )}

      {/* Create / Edit Form Modal */}
      {isFormOpen && (
        <div
          className="border rounded-3 p-3 mb-4 shadow-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="action-modal-title"
          style={{ backgroundColor: '#F8FBF9', borderColor: '#B4D7C5' }}
          data-testid="action-taken-form"
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 id="action-modal-title" className="h6 fw-bold mb-0 text-dark">
              {editingAction ? 'Edit Action Taken' : 'New Action Taken'}
            </h4>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={closeForm}
              disabled={isSaving}
            />
          </div>

          {formError && (
            <div
              className="alert alert-danger py-2 px-3 small mb-3"
              role="alert"
              data-testid="action-form-error"
            >
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Assignee */}
              <div className="col-12 col-md-4">
                <label htmlFor="action-assignee" className="form-label fw-semibold small text-dark mb-1">
                  Assignee <span className="text-danger">*</span>
                </label>
                <select
                  id="action-assignee"
                  className={`form-select ${fieldErrors.assigneeId ? 'is-invalid' : ''}`}
                  value={assigneeId}
                  onChange={(e) => {
                    setAssigneeId(e.target.value);
                    if (fieldErrors.assigneeId) setFieldErrors((prev) => ({ ...prev, assigneeId: '' }));
                  }}
                  disabled={isSaving}
                  data-testid="action-assignee-select"
                  style={{ minHeight: 44 }}
                >
                  <option value="">Select Assignee…</option>
                  {assignableStaff.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.fullName || u.name} ({u.role})
                    </option>
                  ))}
                </select>
                {fieldErrors.assigneeId && (
                  <div className="text-danger small mt-1" role="alert" data-testid="action-assignee-error">
                    {fieldErrors.assigneeId}
                  </div>
                )}
              </div>

              {/* Status */}
              <div className="col-12 col-md-4">
                <label htmlFor="action-status" className="form-label fw-semibold small text-dark mb-1">
                  Status <span className="text-danger">*</span>
                </label>
                <select
                  id="action-status"
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={Boolean(isSaving || (editingAction && ['COMPLETED', 'CANCELLED'].includes(editingAction.status)))}
                  data-testid="action-status-select"
                  style={{ minHeight: 44 }}
                >
                  {editingAction?.status === 'COMPLETED' ? (
                    <option value="COMPLETED">COMPLETED</option>
                  ) : editingAction?.status === 'CANCELLED' ? (
                    <option value="CANCELLED">CANCELLED</option>
                  ) : editingAction?.status === 'IN_PROGRESS' ? (
                    <>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </>
                  ) : (
                    <>
                      <option value="PENDING">PENDING</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </>
                  )}
                </select>
              </div>

              {/* Action Date / Time */}
              <div className="col-12 col-md-4">
                <label htmlFor="action-date-time" className="form-label fw-semibold small text-dark mb-1">
                  Action Date & Time
                </label>
                <input
                  id="action-date-time"
                  type="datetime-local"
                  className="form-control"
                  value={actionDateTime}
                  onChange={(e) => setActionDateTime(e.target.value)}
                  disabled={isSaving}
                  data-testid="action-date-time-input"
                  style={{ minHeight: 44 }}
                />
              </div>

              {/* Description */}
              <div className="col-12">
                <label htmlFor="action-description" className="form-label fw-semibold small text-dark mb-1">
                  Action Description <span className="text-danger">*</span>
                </label>
                <textarea
                  id="action-description"
                  className={`form-control ${fieldErrors.actionDescription ? 'is-invalid' : ''}`}
                  rows={3}
                  maxLength={1000}
                  value={actionDescription}
                  onChange={(e) => {
                    setActionDescription(e.target.value);
                    if (fieldErrors.actionDescription) setFieldErrors((prev) => ({ ...prev, actionDescription: '' }));
                  }}
                  placeholder="Describe technical investigation or remediation steps taken…"
                  disabled={isSaving}
                  data-testid="action-description-input"
                  style={{ minHeight: 80 }}
                />
                {fieldErrors.actionDescription && (
                  <div className="text-danger small mt-1" role="alert" data-testid="action-description-error">
                    {fieldErrors.actionDescription}
                  </div>
                )}
              </div>

              {/* Result Summary */}
              <div className="col-12">
                <label htmlFor="action-result" className="form-label fw-semibold small text-dark mb-1">
                  Result {status === 'COMPLETED' ? <span className="text-danger">*</span> : <span className="text-muted small">(optional)</span>}
                </label>
                <textarea
                  id="action-result"
                  className={`form-control ${fieldErrors.result ? 'is-invalid' : ''}`}
                  rows={2}
                  maxLength={1000}
                  value={result}
                  onChange={(e) => {
                    setResult(e.target.value);
                    if (fieldErrors.result) setFieldErrors((prev) => ({ ...prev, result: '' }));
                  }}
                  placeholder={status === 'COMPLETED' ? 'Mandatory outcome summary upon completion…' : 'Observed outcome or diagnostics…'}
                  disabled={isSaving}
                  data-testid="action-result-input"
                  style={{ minHeight: 70 }}
                />
                {fieldErrors.result && (
                  <div className="text-danger small mt-1" role="alert" data-testid="action-result-error">
                    {fieldErrors.result}
                  </div>
                )}
              </div>

              {/* Follow-up Required Toggle */}
              <div className="col-12">
                <div className="form-check form-switch">
                  <input
                    id="action-followup-toggle"
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={isFollowUpRequired}
                    onChange={(e) => {
                      setIsFollowUpRequired(e.target.checked);
                      if (!e.target.checked) setFollowUpNote('');
                    }}
                    disabled={isSaving}
                    data-testid="action-followup-toggle"
                  />
                  <label htmlFor="action-followup-toggle" className="form-check-label fw-semibold small text-dark">
                    Follow-Up Action Required
                  </label>
                </div>
              </div>

              {/* Follow-up Note */}
              {isFollowUpRequired && (
                <div className="col-12">
                  <label htmlFor="action-followup-note" className="form-label fw-semibold small text-dark mb-1">
                    Follow-Up Note <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="action-followup-note"
                    className={`form-control ${fieldErrors.followUpNote ? 'is-invalid' : ''}`}
                    rows={2}
                    maxLength={500}
                    value={followUpNote}
                    onChange={(e) => {
                      setFollowUpNote(e.target.value);
                      if (fieldErrors.followUpNote) setFieldErrors((prev) => ({ ...prev, followUpNote: '' }));
                    }}
                    placeholder="Details of next actions or pending customer feedback…"
                    disabled={isSaving}
                    data-testid="action-followup-note-input"
                    style={{ minHeight: 70 }}
                  />
                  {fieldErrors.followUpNote && (
                    <div className="text-danger small mt-1" role="alert" data-testid="action-followup-note-error">
                      {fieldErrors.followUpNote}
                    </div>
                  )}
                </div>
              )}

              {/* Attachment Notes */}
              <div className="col-12">
                <label htmlFor="action-attachment-notes" className="form-label fw-semibold small text-dark mb-1">
                  Attachment Notes <span className="text-muted small">(optional)</span>
                </label>
                <input
                  id="action-attachment-notes"
                  type="text"
                  className="form-control"
                  maxLength={500}
                  value={attachmentNotes}
                  onChange={(e) => setAttachmentNotes(e.target.value)}
                  placeholder="e.g. Refer to attachment network-diag.pcap"
                  disabled={isSaving}
                  data-testid="action-attachment-notes"
                  style={{ minHeight: 44 }}
                />
              </div>
            </div>

            {/* Form Action Buttons */}
            <div className="d-flex flex-wrap gap-2 mt-3 pt-2 border-top">
              <button
                type="submit"
                className="btn text-white fw-semibold"
                style={{ backgroundColor: '#006B3C', borderColor: '#006B3C', minHeight: 44 }}
                disabled={isSaving}
                data-testid="action-save"
              >
                {isSaving ? 'Saving…' : editingAction ? 'Save Changes' : 'Save Action'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary fw-semibold"
                style={{ minHeight: 44 }}
                onClick={closeForm}
                disabled={isSaving}
                data-testid="action-form-cancel"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Actions List */}
      {items.length === 0 ? (
        <p className="text-muted small mb-0" data-testid="actions-taken-empty">
          No Actions Taken recorded yet.
        </p>
      ) : (
        <div className="d-flex flex-column gap-3" data-testid="actions-taken-list">
          {items.map((action) => {
            const isOpen = action.status === 'PENDING' || action.status === 'IN_PROGRESS';
            const performerName = action.performedBy?.fullName || action.performedBy?.name || 'Staff Member';
            const assigneeName = action.assignee?.fullName || action.assignee?.name || 'Unassigned';

            return (
              <div
                key={action.id}
                className="border rounded-3 p-3 shadow-sm"
                style={{ backgroundColor: '#FFFFFF', borderColor: '#E5E7EB' }}
                data-testid={`action-card-${action.id}`}
              >
                {/* Card Top Row: Timestamp, Status, Edit Button */}
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2">
                  <div className="d-flex align-items-center gap-2">
                    <small className="fw-semibold text-dark">{formatDate(action.actionDateTime)}</small>
                    {renderStatusBadge(action.status)}
                  </div>

                  {canManage && !isFormOpen && (
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-secondary fw-semibold"
                      style={{ minHeight: 44 }}
                      onClick={() => openEditForm(action)}
                      data-testid={`action-edit-${action.id}`}
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* Actors Row */}
                <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                  <span className="small text-muted">Performed by:</span>
                  <strong className="small text-dark">{performerName}</strong>
                  {renderRoleBadge(action.performedBy?.role, `action-performer-role-${action.id}`)}

                  <span className="small text-muted ms-md-3">Assigned to:</span>
                  <strong className="small text-dark">{assigneeName}</strong>
                  {renderRoleBadge(action.assignee?.role, `action-assignee-role-${action.id}`)}
                </div>

                {/* Description */}
                <div
                  className="text-dark mb-2"
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                  data-testid={`action-description-${action.id}`}
                >
                  {action.actionDescription}
                </div>

                {/* Result */}
                {action.result && (
                  <div
                    className="small mb-2 p-2 rounded"
                    style={{ backgroundColor: '#F9FAFB', borderLeft: '3px solid #006B3C', whiteSpace: 'pre-wrap' }}
                    data-testid={`action-result-${action.id}`}
                  >
                    <span className="fw-bold text-dark">Result: </span>
                    <span className="text-dark">{action.result}</span>
                  </div>
                )}

                {/* Follow-up Note Callout */}
                {action.isFollowUpRequired && (
                  <div
                    className="small mb-2 p-2 rounded d-flex flex-wrap align-items-center gap-2"
                    style={{ backgroundColor: '#FFFBEB', border: '1px solid #F59E0B' }}
                    data-testid={`action-followup-${action.id}`}
                  >
                    <span
                      className="badge rounded-pill fw-semibold"
                      style={{ backgroundColor: '#FEF3C7', color: '#92400E' }}
                    >
                      <span aria-hidden="true">⚠️</span> Follow-Up Required
                    </span>
                    <span className="text-dark">{action.followUpNote}</span>
                  </div>
                )}

                {/* Attachment Reference Notes */}
                {action.attachmentNotes && (
                  <div
                    className="small text-muted mb-2 fst-italic"
                    data-testid={`action-attachment-notes-${action.id}`}
                  >
                    <span aria-hidden="true">📎</span> {action.attachmentNotes}
                  </div>
                )}

                {/* Quick Transition Action Buttons */}
                {canManage && isOpen && !isFormOpen && (
                  <div className="d-flex flex-wrap gap-2 mt-2 pt-2 border-top">
                    <button
                      type="button"
                      className="btn btn-sm text-white fw-semibold"
                      style={{ backgroundColor: '#0B7A46', borderColor: '#0B7A46', minHeight: 44 }}
                      onClick={() => handleQuickStatusChange(action, 'COMPLETED')}
                      disabled={busyActionId === action.id}
                      data-testid={`action-complete-${action.id}`}
                    >
                      {busyActionId === action.id ? 'Saving…' : 'Complete'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger fw-semibold"
                      style={{ minHeight: 44 }}
                      onClick={() => handleQuickStatusChange(action, 'CANCELLED')}
                      disabled={busyActionId === action.id}
                      data-testid={`action-cancel-status-${action.id}`}
                    >
                      Cancel Action
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActionsTaken;
