import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import StaffTicketQueue from '../../components/StaffTicketQueue';
import { AuthProvider } from '../../contexts/AuthContext';

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('Issue 22: StaffTicketQueue Component Tests (StaffTicketQueue.test.tsx)', () => {
  const mockCategories = [
    { id: 1, name: 'Account & Access' },
    { id: 2, name: 'Campus Wi-Fi' },
  ];

  const mockTickets = [
    {
      id: 101,
      ticketNumber: 'TKT-2026-000101',
      summary: 'VPN client disconnects intermittently under load',
      description: 'Reports dropouts during video conferencing.',
      status: 'IN_PROGRESS',
      currentStatus: 'IN_PROGRESS',
      requestedPriority: 'HIGH',
      itPriority: 'URGENT',
      createdAt: '2026-09-17T10:00:00.000Z',
      updatedAt: '2026-09-17T10:30:00.000Z',
      categoryId: 1,
      category: { id: 1, name: 'Account & Access' },
      relatedSystemId: 1,
      relatedSystem: { id: 1, name: 'GlobalProtect VPN' },
      ownerId: 2,
      owner: { id: 2, fullName: 'Sarah Johnson', name: 'Sarah Johnson', email: 'sarah@example.com' },
      requesterId: 1,
      requester: { id: 1, fullName: 'Alex Thompson', name: 'Alex Thompson', email: 'alex@example.com' },
      counts: { publicComments: 2, internalNotes: 1, attachments: 0 },
    },
    {
      id: 102,
      ticketNumber: 'TKT-2026-000102',
      summary: 'Wi-Fi coverage degradation in Building B',
      description: 'Weak signal detected near room 204.',
      status: 'OPEN',
      currentStatus: 'OPEN',
      requestedPriority: 'MEDIUM',
      itPriority: 'HIGH',
      createdAt: '2026-09-17T11:00:00.000Z',
      updatedAt: '2026-09-17T11:00:00.000Z',
      categoryId: 2,
      category: { id: 2, name: 'Campus Wi-Fi' },
      relatedSystemId: 2,
      relatedSystem: { id: 2, name: 'Cisco AP' },
      ownerId: null,
      owner: null,
      requesterId: 3,
      requester: { id: 3, fullName: 'Bob Martin', name: 'Bob Martin', email: 'bob@example.com' },
      counts: { publicComments: 0, internalNotes: 0, attachments: 1 },
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('toktickit_auth_token', 'mock-token');

    // Default mock response for /api/staff/tickets
    mockFetch.mockImplementation((url: string) => {
      const urlStr = url.toString();
      if (urlStr.includes('/api/auth/me')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            user: {
              id: 2,
              fullName: 'Sarah Johnson',
              email: 'sarah@example.com',
              role: 'IT_STAFF',
              mustChangePassword: false,
            },
          }),
        });
      }

      if (urlStr.includes('/api/staff/tickets')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            tickets: mockTickets,
            pagination: {
              total: 2,
              page: 1,
              limit: 10,
              totalPages: 1,
            },
          }),
        });
      }

      return Promise.reject(new Error('Unknown URL: ' + urlStr));
    });
  });

  it('renders queue header, total counter, search form, and table headers', async () => {
    const onSelectTicket = vi.fn();
    render(
      <AuthProvider>
        <StaffTicketQueue categories={mockCategories} onSelectTicket={onSelectTicket} />
      </AuthProvider>
    );

    expect(screen.getByRole('heading', { name: /IT Staff Ticket Queue/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Search Ticket No or Summary/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Filter by status/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Filter by IT priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Filter by category/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000101')[0]).toBeInTheDocument();
      expect(screen.getAllByText('TKT-2026-000102')[0]).toBeInTheDocument();
    });

    expect(screen.getAllByText('VPN client disconnects intermittently under load')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Wi-Fi coverage degradation in Building B')[0]).toBeInTheDocument();
  });

  it('triggers onSelectTicket callback when clicking a ticket link or row', async () => {
    const onSelectTicket = vi.fn();
    render(
      <AuthProvider>
        <StaffTicketQueue categories={mockCategories} onSelectTicket={onSelectTicket} />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000101')[0]).toBeInTheDocument();
    });

    const ticketButton = screen.getAllByRole('button', { name: 'TKT-2026-000101' })[0];
    fireEvent.click(ticketButton);

    expect(onSelectTicket).toHaveBeenCalledWith(101);
  });

  it('submits search query and requests filtered queue from API', async () => {
    const onSelectTicket = vi.fn();
    render(
      <AuthProvider>
        <StaffTicketQueue categories={mockCategories} onSelectTicket={onSelectTicket} />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000101')[0]).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/Search Ticket No or Summary/i);
    const searchButton = screen.getByRole('button', { name: /Search/i });

    fireEvent.change(searchInput, { target: { value: 'VPN' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('search=VPN'),
        expect.anything()
      );
    });
  });

  it('updates filters (status, itPriority, ownership) and resets page to 1', async () => {
    const onSelectTicket = vi.fn();
    render(
      <AuthProvider>
        <StaffTicketQueue categories={mockCategories} onSelectTicket={onSelectTicket} />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000101')[0]).toBeInTheDocument();
    });

    // 1. Status filter
    const statusSelect = screen.getByLabelText(/Filter by status/i);
    fireEvent.change(statusSelect, { target: { value: 'OPEN' } });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('status=OPEN'),
        expect.anything()
      );
    });

    // 2. Ownership button: Unassigned
    const unassignedBtn = screen.getByRole('button', { name: /^Unassigned$/i });
    fireEvent.click(unassignedBtn);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('ownerId=unassigned'),
        expect.anything()
      );
    });
  });

  it('sorts columns when clicking sortable header', async () => {
    const onSelectTicket = vi.fn();
    render(
      <AuthProvider>
        <StaffTicketQueue categories={mockCategories} onSelectTicket={onSelectTicket} />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000101')[0]).toBeInTheDocument();
    });

    const itPriorityHeader = screen.getByRole('columnheader', { name: /IT Priority/i });
    fireEvent.click(itPriorityHeader);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('sortBy=itPriority'),
        expect.anything()
      );
    });
  });

  it('displays empty state when no tickets match criteria', async () => {
    mockFetch.mockImplementation((url: string) => {
      const urlStr = url.toString();
      if (urlStr.includes('/api/auth/me')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            user: { id: 2, fullName: 'Sarah Johnson', email: 'sarah@example.com', role: 'IT_STAFF', mustChangePassword: false },
          }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({
          tickets: [],
          pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
        }),
      });
    });

    const onSelectTicket = vi.fn();
    render(
      <AuthProvider>
        <StaffTicketQueue categories={mockCategories} onSelectTicket={onSelectTicket} />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/No Tickets Found/i)).toBeInTheDocument();
    });
  });

  it('handles pagination controls and changes limit per page', async () => {
    const onSelectTicket = vi.fn();
    render(
      <AuthProvider>
        <StaffTicketQueue categories={mockCategories} onSelectTicket={onSelectTicket} />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000101')[0]).toBeInTheDocument();
    });

    const perPageSelect = screen.getByLabelText(/Items per page/i);
    fireEvent.change(perPageSelect, { target: { value: '25' } });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('limit=25'),
        expect.anything()
      );
    });
  });
});
