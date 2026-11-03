import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import TicketDetail from '../../components/TicketDetail';
import { AuthProvider } from '../../contexts/AuthContext';
import { RequesterProvider } from '../../contexts/RequesterContext';

const mockStaffUser = {
  id: 2,
  email: 'staff.alice@toktickit.com',
  fullName: 'Alice Staff',
  role: 'IT_STAFF',
};

const mockTicketDataWithPendingAction = {
  id: 101,
  ticketNumber: 'TCK-2026-0101',
  summary: 'Network Printer Failure',
  description: 'Cannot connect to 3rd floor laser printer.',
  status: 'IN_PROGRESS',
  currentStatus: 'IN_PROGRESS',
  requestedPriority: 'MEDIUM',
  itPriority: 'HIGH',
  ownerId: 2,
  owner: { id: 2, fullName: 'Alice Staff', email: 'staff.alice@toktickit.com' },
  requesterId: 10,
  requester: { id: 10, fullName: 'Bob Requester', email: 'bob@example.com' },
  categoryId: 1,
  categoryName: 'Hardware',
  category: { id: 1, name: 'Hardware' },
  createdAt: '2026-11-01T08:00:00.000Z',
  updatedAt: '2026-11-01T09:00:00.000Z',
  attachments: [],
  publicComments: [],
  actionsTaken: [
    {
      id: 501,
      ticketId: 101,
      actionDateTime: '2026-11-01T08:30:00.000Z',
      actionDescription: 'Check IP subnet and ping printer',
      status: 'PENDING',
      assigneeId: 2,
      performedById: 2,
      result: null,
      isFollowUpRequired: false,
    },
  ],
};

const mockTicketDataAllCompleted = {
  ...mockTicketDataWithPendingAction,
  actionsTaken: [
    {
      id: 501,
      ticketId: 101,
      actionDateTime: '2026-11-01T08:30:00.000Z',
      actionDescription: 'Replaced toner and updated firmware',
      status: 'COMPLETED',
      assigneeId: 2,
      performedById: 2,
      result: 'Printer is online and operational',
      isFollowUpRequired: false,
    },
  ],
};

const renderWithProviders = (ui: React.ReactElement) => {
  localStorage.setItem('toktickit_auth_token', 'mock-staff-token');
  return render(
    <AuthProvider>
      <RequesterProvider>
        {ui}
      </RequesterProvider>
    </AuthProvider>
  );
};

describe('Issue 31: Ticket Workflow Operations & Resolution Gate UI (UI-04)', () => {
  const onBackMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('UI-04: displays Resolution Gate warning banner when active Actions Taken exist', async () => {
    (globalThis as any).fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/api/auth/me')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ user: mockStaffUser, token: 'mock-staff-token' }),
        });
      }
      if (url.includes('/api/tickets/101/comments')) {
        return Promise.resolve({ ok: true, json: async () => [] });
      }
      if (url.includes('/api/tickets/101/notes')) {
        return Promise.resolve({ ok: true, json: async () => [] });
      }
      if (url.includes('/api/staff/users')) {
        return Promise.resolve({ ok: true, json: async () => [] });
      }
      if (url.includes('/api/tickets/101')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockTicketDataWithPendingAction,
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });

    renderWithProviders(<TicketDetail ticketId={101} onBack={onBackMock} />);

    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-view')).toBeInTheDocument();
    });

    // Check Resolution Gate Warning Banner in Operations Toolbar
    const warningBanner = screen.getByTestId('resolution-gate-warning');
    expect(warningBanner).toBeInTheDocument();
    expect(warningBanner).toHaveTextContent(/Resolution Gate Active/i);
    expect(warningBanner).toHaveTextContent(/1/); // 1 active action

    // Open Resolve Modal
    const resolveBtn = screen.getByRole('button', { name: /resolve/i });
    fireEvent.click(resolveBtn);

    // Modal should show active actions warning
    expect(screen.getByTestId('modal-resolution-gate-warning')).toBeInTheDocument();
    expect(screen.getByTestId('modal-resolution-gate-warning')).toHaveTextContent(
      /Active Actions Detected/i
    );
  });

  it('UI-04: Resolution Gate banner disappears when all actions are completed', async () => {
    (globalThis as any).fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/api/auth/me')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ user: mockStaffUser, token: 'mock-staff-token' }),
        });
      }
      if (url.includes('/api/tickets/101/comments')) {
        return Promise.resolve({ ok: true, json: async () => [] });
      }
      if (url.includes('/api/tickets/101/notes')) {
        return Promise.resolve({ ok: true, json: async () => [] });
      }
      if (url.includes('/api/staff/users')) {
        return Promise.resolve({ ok: true, json: async () => [] });
      }
      if (url.includes('/api/tickets/101')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockTicketDataAllCompleted,
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });

    renderWithProviders(<TicketDetail ticketId={101} onBack={onBackMock} />);

    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-view')).toBeInTheDocument();
    });

    // Banner should NOT be in the document
    expect(screen.queryByTestId('resolution-gate-warning')).not.toBeInTheDocument();

    // Open Resolve Modal
    const resolveBtn = screen.getByRole('button', { name: /resolve/i });
    fireEvent.click(resolveBtn);

    expect(screen.queryByTestId('modal-resolution-gate-warning')).not.toBeInTheDocument();
  });

  it('UI-04: handles 409 Conflict for Resolution Gate when server blocks resolution', async () => {
    (globalThis as any).fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/api/auth/me')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ user: mockStaffUser, token: 'mock-staff-token' }),
        });
      }
      if (url.includes('/api/tickets/101/comments') || url.includes('/api/tickets/101/notes') || url.includes('/api/staff/users')) {
        return Promise.resolve({ ok: true, json: async () => [] });
      }
      if (url.includes('/api/staff/tickets/101/resolve')) {
        return Promise.resolve({
          ok: false,
          status: 409,
          json: async () => ({
            code: 'RESOLUTION_GATE_BLOCKED',
            error: 'Cannot resolve ticket while unresolved actions taken exist.',
            unresolvedCount: 1,
          }),
        });
      }
      if (url.includes('/api/tickets/101')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockTicketDataWithPendingAction,
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });

    renderWithProviders(<TicketDetail ticketId={101} onBack={onBackMock} />);

    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-view')).toBeInTheDocument();
    });

    // Open Resolve Modal
    fireEvent.click(screen.getByRole('button', { name: /resolve/i }));

    // Fill in valid resolution summary (>= 3 chars)
    const textarea = screen.getByPlaceholderText(/describe the diagnosis/i);
    fireEvent.change(textarea, { target: { value: 'Diagnosed and attempted resolution.' } });

    // Click Confirm Resolution
    const confirmBtn = screen.getByRole('button', { name: /confirm resolution/i });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      const errorAlert = screen.getByTestId('resolve-error-alert');
      expect(errorAlert).toBeInTheDocument();
      expect(errorAlert).toHaveTextContent(/Resolution Gate Blocked/i);
    });
  });

  it('UI-04: handles 409 Stale Update Conflict by prompting user to refresh', async () => {
    let statusCallPayload: any = null;
    (globalThis as any).fetch = vi.fn().mockImplementation((url: string, opts: any) => {
      if (url.includes('/api/auth/me')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ user: mockStaffUser, token: 'mock-staff-token' }),
        });
      }
      if (url.includes('/api/tickets/101/comments') || url.includes('/api/tickets/101/notes') || url.includes('/api/staff/users')) {
        return Promise.resolve({ ok: true, json: async () => [] });
      }
      if (url.includes('/api/staff/tickets/101/status')) {
        statusCallPayload = JSON.parse(opts.body);
        return Promise.resolve({
          ok: false,
          status: 409,
          json: async () => ({
            code: 'STALE_UPDATE_CONFLICT',
            error: 'Ticket has been modified by another user.',
          }),
        });
      }
      if (url.includes('/api/tickets/101')) {
        return Promise.resolve({
          ok: true,
          json: async () => mockTicketDataWithPendingAction,
        });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    });

    renderWithProviders(<TicketDetail ticketId={101} onBack={onBackMock} />);

    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-view')).toBeInTheDocument();
    });

    // Change status from dropdown
    const select = screen.getByLabelText(/change status/i);
    fireEvent.change(select, { target: { value: 'WAITING_FOR_REQUESTER' } });

    await waitFor(() => {
      expect(statusCallPayload).not.toBeNull();
      expect(statusCallPayload.expectedUpdatedAt).toBe('2026-11-01T09:00:00.000Z');
      expect(screen.getByText(/modified by another user/i)).toBeInTheDocument();
    });
  });
});
