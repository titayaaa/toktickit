import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import TicketDetail from '../../components/TicketDetail';
import { RequesterProvider } from '../../contexts/RequesterContext';

const mockTicketData = {
  id: 42,
  ticketNumber: 'TKT-2026-000042',
  requesterId: 1,
  summary: 'Wi-Fi connection issues in library',
  description: 'Cannot connect to campus Wi-Fi network on 2nd floor.',
  requestedPriority: 'HIGH',
  status: 'IN_PROGRESS',
  currentStatus: 'IN_PROGRESS',
  createdAt: '2026-09-01T10:00:00.000Z',
  updatedAt: '2026-09-02T14:30:00.000Z',
  categoryId: 1,
  categoryName: 'Network & Connectivity',
  category: { id: 1, name: 'Network & Connectivity' },
  relatedSystemId: 2,
  relatedSystemName: 'Campus Wi-Fi',
  relatedSystem: { id: 2, name: 'Campus Wi-Fi' },
  attachments: [
    {
      id: 10,
      originalFilename: 'wifi-error.png',
      sizeBytes: 2048,
      mimeType: 'image/png',
      removedAt: null,
      removalReason: null,
    },
  ],
};

describe('TicketDetail Component (Issue 14 UI Tests)', () => {
  const onBackMock = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    onBackMock.mockClear();

    localStorage.setItem(
      'toktickit_dev_requester',
      JSON.stringify({ id: 1, name: 'Alice Test', email: 'alice@example.com' })
    );
  });

  afterEach(() => {
    localStorage.removeItem('toktickit_dev_requester');
  });

  it('UI-01: Renders ticket details with all fields, badges, and attachments', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockTicketData,
    } as Response);

    render(
      <RequesterProvider>
        <TicketDetail ticketId={42} onBack={onBackMock} />
      </RequesterProvider>
    );

    // Initial loading indicator
    expect(screen.getByTestId('ticket-detail-loading')).toBeInTheDocument();

    // Wait for ticket detail to be displayed
    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-view')).toBeInTheDocument();
    });

    // Verify fields
    expect(screen.getByText('TKT-2026-000042')).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi connection issues in library')).toBeInTheDocument();
    expect(screen.getByText('Cannot connect to campus Wi-Fi network on 2nd floor.')).toBeInTheDocument();
    expect(screen.getByText('Network & Connectivity')).toBeInTheDocument();
    expect(screen.getByText('Campus Wi-Fi')).toBeInTheDocument();

    // Verify badges
    const statusBadge = screen.getByTestId('ticket-status-badge');
    expect(statusBadge).toHaveTextContent(/IN_PROGRESS/i);

    const priorityBadge = screen.getByTestId('ticket-priority-badge');
    expect(priorityBadge).toHaveTextContent(/HIGH/i);

    // Verify attachment is rendered
    expect(screen.getByText('wifi-error.png')).toBeInTheDocument();
  });

  it('UI-02: Renders 403 Forbidden state when user does not have permission', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 403,
      json: async () => ({
        error: 'Forbidden: You do not have permission to view this ticket',
      }),
    } as Response);

    render(
      <RequesterProvider>
        <TicketDetail ticketId={99} onBack={onBackMock} />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-forbidden')).toBeInTheDocument();
    });

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(
      screen.getByText(/Forbidden: You do not have permission to view this ticket/i)
    ).toBeInTheDocument();

    // Back button in 403 screen works
    const backBtn = screen.getByRole('button', { name: /Back to My Tickets/i });
    fireEvent.click(backBtn);
    expect(onBackMock).toHaveBeenCalledTimes(1);
  });

  it('UI-03: Renders 404 Not Found state when ticket does not exist', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({
        error: 'Ticket not found',
      }),
    } as Response);

    render(
      <RequesterProvider>
        <TicketDetail ticketId={9999} onBack={onBackMock} />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-not-found')).toBeInTheDocument();
    });

    expect(screen.getByText('Ticket Not Found')).toBeInTheDocument();

    // Back button in 404 screen works
    const backBtn = screen.getByRole('button', { name: /Back to My Tickets/i });
    fireEvent.click(backBtn);
    expect(onBackMock).toHaveBeenCalledTimes(1);
  });

  it('UI-04: Clicking back button in ticket detail calls onBack callback', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockTicketData,
    } as Response);

    render(
      <RequesterProvider>
        <TicketDetail ticketId={42} onBack={onBackMock} />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-view')).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: /Back to My Tickets/i });
    fireEvent.click(backButton);

    expect(onBackMock).toHaveBeenCalledTimes(1);
  });

  it('UI-05: Renders generic error state on network/server error and supports Retry', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Internal server error' }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockTicketData,
      } as Response);

    render(
      <RequesterProvider>
        <TicketDetail ticketId={42} onBack={onBackMock} />
      </RequesterProvider>
    );

    // Shows generic error state
    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-error')).toBeInTheDocument();
    });

    expect(screen.getByText('Unable to Load Ticket')).toBeInTheDocument();
    expect(screen.getByText('Internal server error')).toBeInTheDocument();

    // Clicking Retry attempts fetch again and loads detail
    const retryBtn = screen.getByRole('button', { name: /Retry/i });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(screen.getByTestId('ticket-detail-view')).toBeInTheDocument();
    });

    expect(fetchSpy).toHaveBeenCalledTimes(2);
    expect(screen.getByText('TKT-2026-000042')).toBeInTheDocument();
  });
});
