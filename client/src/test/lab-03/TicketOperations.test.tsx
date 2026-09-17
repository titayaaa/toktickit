import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TicketDetail from '../../components/TicketDetail';
import { AuthProvider } from '../../contexts/AuthContext';
import { RequesterProvider } from '../../contexts/RequesterContext';

const mockStaffTicket = {
  id: 101,
  ticketNumber: 'TKT-2026-000101',
  requesterId: 1,
  requester: { id: 1, fullName: 'Jennifer Anderson', email: 'jennifer.anderson@example.com' },
  ownerId: null,
  owner: null,
  summary: 'VPN split tunneling issue during video calls',
  description: 'Connection drops when initiating video conferencing.',
  requestedPriority: 'HIGH',
  itPriority: 'HIGH',
  status: 'OPEN',
  currentStatus: 'OPEN',
  resolutionSummary: null,
  createdAt: '2026-09-17T08:00:00.000Z',
  updatedAt: '2026-09-17T09:00:00.000Z',
  categoryId: 1,
  categoryName: 'Network',
  category: { id: 1, name: 'Network' },
  relatedSystemId: 1,
  relatedSystemName: 'VPN',
  relatedSystem: { id: 1, name: 'VPN' },
  attachments: [],
  publicComments: [
    {
      id: 1,
      content: 'Please verify if the MTU mismatch has been fixed.',
      createdAt: '2026-09-17T09:30:00.000Z',
      author: { id: 2, fullName: 'Alice IT Support', role: 'IT_STAFF', email: 'staff.alice@toktickit.com' },
    },
  ],
};

const mockInternalNotes = [
  {
    id: 1,
    content: 'Internal note: Node-02 gateway latency was spikey at 09:00.',
    createdAt: '2026-09-17T09:35:00.000Z',
    author: { id: 2, fullName: 'Alice IT Support', role: 'IT_STAFF', email: 'staff.alice@toktickit.com' },
  },
];

const mockStaffUsers = [
  { id: 2, fullName: 'Alice IT Support', email: 'staff.alice@toktickit.com', role: 'IT_STAFF' },
  { id: 3, fullName: 'Bob Network Tech', email: 'staff.bob@toktickit.com', role: 'IT_STAFF' },
];

describe('Issue 24: IT Staff Ticket Operations & Confidential Notes UI', () => {
  const onBackMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    onBackMock.mockClear();
    localStorage.clear();
  });

  const renderWithStaffAuth = (ticketId = 101) => {
    // Setup staff authentication in localStorage
    localStorage.setItem('toktickit_auth_token', 'mock-staff-jwt-token');

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url: any) => {
      const urlStr = url.toString();

      if (urlStr.endsWith('/api/auth/me')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            user: {
              id: 2,
              email: 'staff.alice@toktickit.com',
              fullName: 'Alice IT Support',
              name: 'Alice IT Support',
              role: 'IT_STAFF',
              mustChangePassword: false,
            },
          }),
        } as Response;
      }

      if (urlStr.endsWith('/api/staff/users')) {
        return {
          ok: true,
          status: 200,
          json: async () => mockStaffUsers,
        } as Response;
      }

      if (urlStr.endsWith('/api/tickets/101/notes')) {
        return {
          ok: true,
          status: 200,
          json: async () => mockInternalNotes,
        } as Response;
      }

      if (urlStr.endsWith('/api/tickets/101/comments')) {
        return {
          ok: true,
          status: 200,
          json: async () => mockStaffTicket.publicComments,
        } as Response;
      }

      if (urlStr.endsWith('/api/tickets/101')) {
        return {
          ok: true,
          status: 200,
          json: async () => mockStaffTicket,
        } as Response;
      }

      return {
        ok: true,
        status: 200,
        json: async () => ({}),
      } as Response;
    });

    return render(
      <AuthProvider>
        <RequesterProvider>
          <TicketDetail ticketId={ticketId} onBack={onBackMock} />
        </RequesterProvider>
      </AuthProvider>
    );
  };

  const renderWithRequesterAuth = (ticketId = 101) => {
    localStorage.setItem('toktickit_auth_token', 'mock-requester-jwt-token');

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url: any) => {
      const urlStr = url.toString();

      if (urlStr.endsWith('/api/auth/me')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            user: {
              id: 1,
              email: 'jennifer.anderson@example.com',
              fullName: 'Jennifer Anderson',
              name: 'Jennifer Anderson',
              role: 'REQUESTER',
              mustChangePassword: false,
            },
          }),
        } as Response;
      }

      if (urlStr.endsWith('/api/tickets/101')) {
        return {
          ok: true,
          status: 200,
          json: async () => mockStaffTicket,
        } as Response;
      }

      if (urlStr.endsWith('/api/tickets/101/comments')) {
        return {
          ok: true,
          status: 200,
          json: async () => mockStaffTicket.publicComments,
        } as Response;
      }

      return {
        ok: true,
        status: 200,
        json: async () => ({}),
      } as Response;
    });

    return render(
      <AuthProvider>
        <RequesterProvider>
          <TicketDetail ticketId={ticketId} onBack={onBackMock} />
        </RequesterProvider>
      </AuthProvider>
    );
  };

  it('OP-01: Renders IT Staff Operations toolbar with Claim, Assign, IT Priority, and Status', async () => {
    renderWithStaffAuth();

    await waitFor(() => {
      expect(screen.getByTestId('staff-operations-toolbar')).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: /Claim Ownership/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Assigned Owner/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/IT Priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Change Status/i)).toBeInTheDocument();
  });

  it('OP-02: Claiming ticket sends PATCH /api/staff/tickets/:id/claim and updates ticket', async () => {
    renderWithStaffAuth();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Claim Ownership/i })).toBeInTheDocument();
    });

    const claimBtn = screen.getByRole('button', { name: /Claim Ownership/i });
    fireEvent.click(claimBtn);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/staff/tickets/101/claim'),
        expect.objectContaining({ method: 'PATCH' })
      );
    });
  });

  it('OP-03: Resolve modal displays live character counter and validates mandatory 3-500 chars', async () => {
    // Return ticket with IN_PROGRESS status where RESOLVED transition is available
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url: any) => {
      const urlStr = url.toString();
      if (urlStr.endsWith('/api/auth/me')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            user: { id: 2, email: 'staff.alice@toktickit.com', fullName: 'Alice IT Support', role: 'IT_STAFF', mustChangePassword: false },
          }),
        } as Response;
      }
      if (urlStr.endsWith('/api/tickets/101')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ ...mockStaffTicket, currentStatus: 'IN_PROGRESS', status: 'IN_PROGRESS' }),
        } as Response;
      }
      if (urlStr.endsWith('/api/tickets/101/notes')) return { ok: true, status: 200, json: async () => mockInternalNotes } as Response;
      if (urlStr.endsWith('/api/tickets/101/comments')) return { ok: true, status: 200, json: async () => mockStaffTicket.publicComments } as Response;
      if (urlStr.endsWith('/api/staff/users')) return { ok: true, status: 200, json: async () => mockStaffUsers } as Response;
      return { ok: true, status: 200, json: async () => ({}) } as Response;
    });

    localStorage.setItem('toktickit_auth_token', 'mock-staff-jwt-token');
    render(
      <AuthProvider>
        <RequesterProvider>
          <TicketDetail ticketId={101} onBack={onBackMock} />
        </RequesterProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^Resolve$/i })).toBeInTheDocument();
    });

    // Click Resolve button to open modal
    const resolveBtn = screen.getByRole('button', { name: /^Resolve$/i });
    fireEvent.click(resolveBtn);

    expect(screen.getByText(/Resolve Ticket TKT-2026-000101/i)).toBeInTheDocument();
    const textarea = screen.getByLabelText(/Resolution Summary \*/i);
    const confirmBtn = screen.getByRole('button', { name: /Confirm Resolution/i });

    // Initially disabled (empty input < 3 chars)
    expect(confirmBtn).toBeDisabled();
    expect(screen.getByText('0 / 500')).toBeInTheDocument();

    // Type 2 chars -> still disabled
    fireEvent.change(textarea, { target: { value: 'No' } });
    expect(confirmBtn).toBeDisabled();
    expect(screen.getByText('2 / 500')).toBeInTheDocument();

    // Type valid summary >= 3 chars -> enabled
    fireEvent.change(textarea, { target: { value: 'Reconfigured client MTU to 1420; stable now.' } });
    expect(confirmBtn).not.toBeDisabled();
    expect(screen.getByText('44 / 500')).toBeInTheDocument();

    // Click confirm resolution
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/staff/tickets/101/resolve'),
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ resolutionSummary: 'Reconfigured client MTU to 1420; stable now.' }),
        })
      );
    });
  });

  it('OP-04: Dual-Stream Conversation: IT Staff can switch to Internal Notes with Amber styling', async () => {
    renderWithStaffAuth();

    await waitFor(() => {
      expect(screen.getByTestId('public-comments-tab')).toBeInTheDocument();
      expect(screen.getByTestId('internal-notes-tab')).toBeInTheDocument();
    });

    // Switch to Internal Notes
    fireEvent.click(screen.getByTestId('internal-notes-tab'));

    await waitFor(() => {
      expect(screen.getByTestId('internal-notes-panel')).toBeInTheDocument();
      expect(screen.getByText(/Confidential Internal Notes/i)).toBeInTheDocument();
      expect(screen.getByText(/Node-02 gateway latency was spikey/i)).toBeInTheDocument();
    });

    // Post an internal note
    const noteTextarea = screen.getByLabelText(/Add Internal Note/i);
    const postNoteBtn = screen.getByRole('button', { name: /Add Internal Note/i });

    fireEvent.change(noteTextarea, { target: { value: 'New diagnostic observation noted.' } });
    fireEvent.click(postNoteBtn);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/tickets/101/notes'),
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ content: 'New diagnostic observation noted.' }),
        })
      );
    });
  });

  it('OP-05: AC-05 Requester Privacy: Requesters never see Staff Operations or Internal Notes tab', async () => {
    renderWithRequesterAuth();

    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-view')).toBeInTheDocument();
    });

    // Staff Operations Toolbar must NOT exist
    expect(screen.queryByTestId('staff-operations-toolbar')).not.toBeInTheDocument();

    // Internal Notes tab must NOT exist
    expect(screen.queryByTestId('internal-notes-tab')).not.toBeInTheDocument();
    expect(screen.queryByTestId('internal-notes-panel')).not.toBeInTheDocument();

    // Public comments remain visible
    expect(screen.getByTestId('public-comments-tab')).toBeInTheDocument();
    expect(screen.getByText(/Please verify if the MTU mismatch has been fixed./i)).toBeInTheDocument();
  });

  it('OP-06: AC-12: Requester can click "Problem Appears Resolved" button to send indication', async () => {
    renderWithRequesterAuth();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Problem Appears Resolved/i })).toBeInTheDocument();
    });

    const resolveIndicationBtn = screen.getByRole('button', { name: /Problem Appears Resolved/i });
    fireEvent.click(resolveIndicationBtn);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/tickets/101/resolve-indication'),
        expect.objectContaining({ method: 'POST' })
      );
    });
  });

  it('OP-07: Displays Resolution Summary Card when ticket is in RESOLVED status', async () => {
    const resolvedTicket = {
      ...mockStaffTicket,
      currentStatus: 'RESOLVED',
      status: 'RESOLVED',
      resolutionSummary: 'Firmware upgraded to v4.8 and split tunnel routes successfully validated.',
    };

    localStorage.setItem('toktickit_auth_token', 'mock-requester-jwt-token');

    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url: any) => {
      const urlStr = url.toString();
      if (urlStr.endsWith('/api/auth/me')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            user: {
              id: 1,
              email: 'jennifer.anderson@example.com',
              fullName: 'Jennifer Anderson',
              name: 'Jennifer Anderson',
              role: 'REQUESTER',
              mustChangePassword: false,
            },
          }),
        } as Response;
      }
      if (urlStr.endsWith('/api/tickets/101')) {
        return {
          ok: true,
          status: 200,
          json: async () => resolvedTicket,
        } as Response;
      }
      return { ok: true, status: 200, json: async () => ({}) } as Response;
    });

    render(
      <AuthProvider>
        <RequesterProvider>
          <TicketDetail ticketId={101} onBack={onBackMock} />
        </RequesterProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('resolution-summary-card')).toBeInTheDocument();
      expect(screen.getByText(/Firmware upgraded to v4.8/i)).toBeInTheDocument();
    });
  });
});
