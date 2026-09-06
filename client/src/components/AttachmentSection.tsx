import React, { useState } from 'react';

export interface AttachmentItem {
  id: number;
  originalFilename: string;
  sizeBytes: number;
  mimeType: string;
  removedAt?: string | null;
  removalReason?: string | null;
}

interface AttachmentSectionProps {
  ticketId: number;
  requesterId: number;
  attachments: AttachmentItem[];
  onAttachmentUploaded?: (newAttachment: AttachmentItem) => void;
  onAttachmentRemoved?: (removedAttachment: AttachmentItem) => void;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const AttachmentSection: React.FC<AttachmentSectionProps> = ({
  ticketId,
  requesterId,
  attachments,
  onAttachmentUploaded,
  onAttachmentRemoved,
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [removalReason, setRemovalReason] = useState('');
  const [removalError, setRemovalError] = useState<string | null>(null);
  const [submittingRemove, setSubmittingRemove] = useState(false);

  const activeAttachments = attachments.filter((a) => !a.removedAt);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      setUploadError(`Invalid file type for "${file.name}". Only JPG, PNG, WEBP, and PDF are allowed.`);
      e.target.value = '';
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError(`File "${file.name}" exceeds the maximum limit of 5MB.`);
      e.target.value = '';
      return;
    }

    if (activeAttachments.length >= 5) {
      setUploadError('Maximum active attachments limit (5) reached for this ticket.');
      e.target.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await fetch(`/api/tickets/${ticketId}/attachments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer dev_requester_${requesterId}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload attachment');
      }

      if (onAttachmentUploaded) {
        onAttachmentUploaded(data);
      }
    } catch (err: any) {
      setUploadError(err.message || 'Failed to upload attachment');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleConfirmRemove = async (attachmentId: number) => {
    if (!removalReason.trim()) {
      setRemovalError('Please provide a reason for removing this attachment.');
      return;
    }

    setSubmittingRemove(true);
    setRemovalError(null);

    try {
      const res = await fetch(`/api/attachments/${attachmentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer dev_requester_${requesterId}`,
        },
        body: JSON.stringify({ reason: removalReason.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to remove attachment');
      }

      if (onAttachmentRemoved) {
        onAttachmentRemoved(data);
      }

      setRemovingId(null);
      setRemovalReason('');
    } catch (err: any) {
      setRemovalError(err.message || 'Failed to remove attachment');
    } finally {
      setSubmittingRemove(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm mt-4 p-4" data-testid="attachment-section">
      <h5 className="fw-bold text-success mb-3">Attachments</h5>
      <p className="text-muted small mb-3">
        Upload up to 5 files (Max 5MB each). Permitted types: JPG, PNG, WEBP, PDF.
      </p>

      {uploadError && (
        <div className="alert alert-danger py-2 small" role="alert" data-testid="attachment-upload-error">
          {uploadError}
        </div>
      )}

      {/* Upload File Input */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <input
          type="file"
          id="attachment-file-input"
          className="form-control form-control-sm w-auto"
          accept=".jpg,.jpeg,.png,.webp,.pdf"
          onChange={handleFileUpload}
          disabled={uploading || activeAttachments.length >= 5}
          data-testid="attachment-input"
        />
        {uploading && (
          <span className="text-muted small">
            <span className="spinner-border spinner-border-sm me-1" role="status"></span>
            Uploading...
          </span>
        )}
        {activeAttachments.length >= 5 && (
          <span className="badge bg-warning text-dark">Limit reached (5/5)</span>
        )}
      </div>

      {/* Attachments List */}
      {attachments.length === 0 ? (
        <div className="text-muted small text-center py-3" data-testid="no-attachments">
          No attachments uploaded yet.
        </div>
      ) : (
        <ul className="list-group list-group-flush" data-testid="attachments-list">
          {attachments.map((att) => (
            <li
              key={att.id}
              className="list-group-item d-flex justify-content-between align-items-center px-0 py-2"
              data-testid={`attachment-item-${att.id}`}
            >
              <div>
                <span className="fw-semibold me-2">{att.originalFilename}</span>
                <span className="text-muted small">({formatBytes(att.sizeBytes)})</span>

                {att.removedAt && (
                  <div className="mt-1">
                    <span className="badge bg-secondary me-2" data-testid={`badge-removed-${att.id}`}>
                      [Removed]
                    </span>
                    <span className="text-muted small fst-italic">
                      Reason: {att.removalReason || 'No reason specified'}
                    </span>
                  </div>
                )}
              </div>

              <div>
                {!att.removedAt ? (
                  <div className="d-flex gap-2">
                    <a
                      href={`/api/attachments/${att.id}/download?X-Requester-Id=${requesterId}`}
                      className="btn btn-sm btn-outline-success"
                      download
                      data-testid={`btn-download-${att.id}`}
                    >
                      Download
                    </a>
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => {
                        setRemovingId(att.id);
                        setRemovalReason('');
                        setRemovalError(null);
                      }}
                      data-testid={`btn-remove-${att.id}`}
                    >
                      Remove
                    </button>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Removal Reason Modal / Card */}
      {removingId !== null && (
        <div className="card border-danger mt-3 p-3 bg-light" data-testid="remove-reason-dialog">
          <h6 className="fw-bold text-danger mb-2">Confirm Soft-Removal</h6>
          <p className="small text-muted mb-2">
            Please provide a reason for removing this attachment. Removed files will no longer be downloadable.
          </p>

          {removalError && (
            <div className="alert alert-danger py-1 small mb-2">{removalError}</div>
          )}

          <textarea
            className="form-control form-control-sm mb-2"
            rows={2}
            placeholder="e.g. Uploaded incorrect evidence document"
            value={removalReason}
            onChange={(e) => setRemovalReason(e.target.value)}
            data-testid="removal-reason-input"
          />

          <div className="d-flex gap-2 justify-content-end">
            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => {
                setRemovingId(null);
                setRemovalReason('');
              }}
              disabled={submittingRemove}
              data-testid="btn-cancel-remove"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => handleConfirmRemove(removingId)}
              disabled={submittingRemove}
              data-testid="btn-confirm-remove"
            >
              {submittingRemove ? 'Removing...' : 'Confirm Remove'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentSection;
