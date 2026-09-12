import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AttachmentSection, { AttachmentItem } from '../../components/AttachmentSection';

describe('AttachmentSection Component (Issue 11 UI tests)', () => {
  const mockAttachments: AttachmentItem[] = [
    {
      id: 1,
      originalFilename: 'active-screenshot.png',
      sizeBytes: 1024 * 500, // 500 KB
      mimeType: 'image/png',
      removedAt: null,
      removalReason: null,
    },
    {
      id: 2,
      originalFilename: 'deleted-doc.pdf',
      sizeBytes: 1024 * 1024, // 1 MB
      mimeType: 'application/pdf',
      removedAt: '2026-09-06T10:00:00Z',
      removalReason: 'Uploaded wrong document',
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    globalThis.fetch = vi.fn();
  });

  it('UI-03: Displays active and soft-removed attachments properly', () => {
    render(
      <AttachmentSection
        ticketId={100}
        requesterId={1}
        attachments={mockAttachments}
      />
    );

    // Check active attachment has download and remove buttons
    expect(screen.getByText('active-screenshot.png')).toBeInTheDocument();
    expect(screen.getByTestId('btn-download-1')).toBeInTheDocument();
    expect(screen.getByTestId('btn-remove-1')).toBeInTheDocument();

    // Check soft-removed attachment has [Removed] badge and reason, but no download button
    expect(screen.getByText('deleted-doc.pdf')).toBeInTheDocument();
    expect(screen.getByTestId('badge-removed-2')).toHaveTextContent('[Removed]');
    expect(screen.getByText(/Uploaded wrong document/)).toBeInTheDocument();
    expect(screen.queryByTestId('btn-download-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('btn-remove-2')).not.toBeInTheDocument();
  });

  it('UI-04: Client-side file validation prevents uploading invalid types or files > 5MB', async () => {
    render(
      <AttachmentSection
        ticketId={100}
        requesterId={1}
        attachments={mockAttachments}
      />
    );

    const input = screen.getByTestId('attachment-input') as HTMLInputElement;

    // 1. Invalid mime type (.txt)
    const invalidFile = new File(['hello'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [invalidFile] } });

    expect(screen.getByTestId('attachment-upload-error')).toHaveTextContent(
      'Invalid file type for "test.txt"'
    );
    expect(globalThis.fetch).not.toHaveBeenCalled();

    // 2. Large file (> 5MB)
    const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'large.png', {
      type: 'image/png',
    });
    fireEvent.change(input, { target: { files: [largeFile] } });

    expect(screen.getByTestId('attachment-upload-error')).toHaveTextContent(
      'exceeds the maximum limit of 5MB'
    );
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it('AC-06: Soft-remove flow prompts for reason and calls DELETE API', async () => {
    const onRemoved = vi.fn();
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        originalFilename: 'active-screenshot.png',
        removedAt: new Date().toISOString(),
        removalReason: 'No longer needed',
      }),
    });

    render(
      <AttachmentSection
        ticketId={100}
        requesterId={1}
        attachments={mockAttachments}
        onAttachmentRemoved={onRemoved}
      />
    );

    // Click remove button for active attachment
    const removeBtn = screen.getByTestId('btn-remove-1');
    await userEvent.click(removeBtn);

    // Reason dialog should appear
    expect(screen.getByTestId('remove-reason-dialog')).toBeInTheDocument();

    // Try confirm without reason
    const confirmBtn = screen.getByTestId('btn-confirm-remove');
    await userEvent.click(confirmBtn);
    expect(screen.getByText('Please provide a reason for removing this attachment.')).toBeInTheDocument();
    expect(globalThis.fetch).not.toHaveBeenCalled();

    // Fill reason and confirm
    const reasonInput = screen.getByTestId('removal-reason-input');
    await userEvent.type(reasonInput, 'No longer needed');
    await userEvent.click(confirmBtn);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith('/api/attachments/1', expect.objectContaining({
        method: 'DELETE',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: 'Bearer dev_requester_1',
        }),
        body: JSON.stringify({ reason: 'No longer needed' }),
      }));
      expect(onRemoved).toHaveBeenCalled();
    });
  });
});
