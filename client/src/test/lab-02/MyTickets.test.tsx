import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MyTickets from '../../components/MyTickets';
import { RequesterProvider } from '../../contexts/RequesterContext';

const mockCategories = [
  { id: 1, name: 'Account and Access' },
  { id: 2, name: 'Hardware' },
];

const mockTickets = [
  {
    id: 101,
    ticketNumber: 'TKT-2026-000001',
    summary: 'Cannot connect to Campus Wi-Fi',
    description: 'Wi-Fi disconnects frequently in building 3',
    requestedPriority: 'HIGH',
    currentStatus: 'NEW',
    createdAt: '2026-09-07T10:00:00.000Z',
    updatedAt: '2026-09-07T10:00:00.000Z',
    categoryName: 'Network',
    category: { id: 3, name: 'Network' },
    relatedSystemName: 'Campus Wi-Fi',
  },
  {
    id: 102,
    ticketNumber: 'TKT-2026-000002',
    summary: 'Password reset request',
    description: 'Forgot email password',
    requestedPriority: 'LOW',
    currentStatus: 'RESOLVED',
    createdAt: '2026-09-07T08:00:00.000Z',
    updatedAt: '2026-09-07T09:30:00.000Z',
    categoryName: 'Account and Access',
    category: { id: 1, name: 'Account and Access' },
    relatedSystemName: 'Email',
  },
];

describe('MyTickets Component (Issue 13 UI Tests)', () => {
  const onNavigateToCreate = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
    onNavigateToCreate.mockClear();

    localStorage.setItem(
      'toktickit_dev_requester',
      JSON.stringify({ id: 1, name: 'Alice Test', email: 'alice@example.com' })
    );
  });

  afterEach(() => {
    localStorage.removeItem('toktickit_dev_requester');
  });

  it('UI-04: Renders tickets list with correct data and badges', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        tickets: mockTickets,
        meta: { totalCount: 2, page: 1, limit: 10, totalPages: 1 },
      }),
    } as Response);

    render(
      <RequesterProvider>
        <MyTickets categories={mockCategories} onNavigateToCreate={onNavigateToCreate} />
      </RequesterProvider>
    );

    // Initial loading indicator
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

    // Wait for tickets to load
    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000001')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Cannot connect to Campus Wi-Fi')[0]).toBeInTheDocument();
      expect(screen.getAllByText('TKT-2026-000002')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Password reset request')[0]).toBeInTheDocument();
    });

    // Check badges
    expect(screen.getAllByText('HIGH')[0]).toBeInTheDocument();
    expect(screen.getAllByText('NEW')[0]).toBeInTheDocument();
    expect(screen.getAllByText('LOW')[0]).toBeInTheDocument();
    expect(screen.getAllByText('RESOLVED')[0]).toBeInTheDocument();
  });

  it('BR-11 & UI-04: Displays Empty State when requester has no tickets at all', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        tickets: [],
        meta: { totalCount: 0, page: 1, limit: 10, totalPages: 1 },
      }),
    } as Response);

    render(
      <RequesterProvider>
        <MyTickets categories={mockCategories} onNavigateToCreate={onNavigateToCreate} />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('empty-state')).toBeInTheDocument();
      expect(screen.getByText(/You haven't submitted any tickets yet/i)).toBeInTheDocument();
    });

    // Clicking "Create Your First Ticket" navigates to create form
    const createBtn = screen.getByRole('button', { name: /Create Your First Ticket/i });
    fireEvent.click(createBtn);
    expect(onNavigateToCreate).toHaveBeenCalledTimes(1);
  });

  it('BR-11 & UI-04: Displays No-Results State when filters yield 0 results', async () => {
    // Initial fetch returns empty list with an active search
    vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
      const urlStr = url.toString();
      if (urlStr.includes('search=nonexistent')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            tickets: [],
            meta: { totalCount: 0, page: 1, limit: 10, totalPages: 1 },
          }),
        } as Response);
      }
      return Promise.resolve({
        ok: true,
        json: async () => ({
          tickets: mockTickets,
          meta: { totalCount: 2, page: 1, limit: 10, totalPages: 1 },
        }),
      } as Response);
    });

    render(
      <RequesterProvider>
        <MyTickets categories={mockCategories} onNavigateToCreate={onNavigateToCreate} />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000001')[0]).toBeInTheDocument();
    });

    // Enter search term and submit
    const searchInput = screen.getByRole('textbox', { name: /search tickets/i });
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    const searchBtn = screen.getByRole('button', { name: /submit search/i });
    fireEvent.click(searchBtn);

    await waitFor(() => {
      expect(screen.getByTestId('no-results-state')).toBeInTheDocument();
      expect(screen.getByText(/No tickets found/i)).toBeInTheDocument();
    });

    // Clicking "Clear Filters" resets and reloads
    const clearBtn = screen.getByRole('button', { name: /clear filters/i });
    fireEvent.click(clearBtn);

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000001')[0]).toBeInTheDocument();
    });
  });

  it('UI-04: Handles category, status, and priority filters correctly', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        tickets: mockTickets,
        meta: { totalCount: 2, page: 1, limit: 10, totalPages: 1 },
      }),
    } as Response);

    render(
      <RequesterProvider>
        <MyTickets categories={mockCategories} onNavigateToCreate={onNavigateToCreate} />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000001')[0]).toBeInTheDocument();
    });

    // Filter by Category
    const categorySelect = screen.getByRole('combobox', { name: /filter by category/i });
    fireEvent.change(categorySelect, { target: { value: '2' } });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenLastCalledWith(
        expect.stringContaining('categoryId=2'),
        expect.any(Object)
      );
    });

    // Filter by Status
    const statusSelect = screen.getByRole('combobox', { name: /filter by status/i });
    fireEvent.change(statusSelect, { target: { value: 'IN_PROGRESS' } });

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenLastCalledWith(
        expect.stringContaining('status=IN_PROGRESS'),
        expect.any(Object)
      );
    });
  });

  it('UI-04: Handles pagination controls and disables Prev/Next at boundaries', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        tickets: [mockTickets[0]],
        meta: { totalCount: 15, page: 1, limit: 5, totalPages: 3 },
      }),
    } as Response);

    render(
      <RequesterProvider>
        <MyTickets categories={mockCategories} onNavigateToCreate={onNavigateToCreate} />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Page 1 of 3/i)).toBeInTheDocument();
    });

    const prevBtn = screen.getByRole('button', { name: /previous page/i });
    const nextBtn = screen.getByRole('button', { name: /next page/i });

    // Prev should be disabled on page 1
    expect(prevBtn).toBeDisabled();
    expect(nextBtn).toBeEnabled();

    // Click next page
    fireEvent.click(nextBtn);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenLastCalledWith(
        expect.stringContaining('page=2'),
        expect.any(Object)
      );
    });
  });

  it('UI-04: Displays error alert and handles retry on API failure', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch')
      .mockRejectedValueOnce(new Error('Server unavailable'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          tickets: mockTickets,
          meta: { totalCount: 2, page: 1, limit: 10, totalPages: 1 },
        }),
      } as Response);

    render(
      <RequesterProvider>
        <MyTickets categories={mockCategories} onNavigateToCreate={onNavigateToCreate} />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Server unavailable')).toBeInTheDocument();
    });

    const retryBtn = screen.getByRole('button', { name: /retry/i });
    fireEvent.click(retryBtn);

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000001')[0]).toBeInTheDocument();
    });
  });

  it('UI-04: Top Create Ticket button triggers onNavigateToCreate', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        tickets: mockTickets,
        meta: { totalCount: 2, page: 1, limit: 10, totalPages: 1 },
      }),
    } as Response);

    render(
      <RequesterProvider>
        <MyTickets categories={mockCategories} onNavigateToCreate={onNavigateToCreate} />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getAllByText('TKT-2026-000001')[0]).toBeInTheDocument();
    });

    const topCreateBtn = screen.getByRole('button', { name: /\+ Create Ticket/i });
    fireEvent.click(topCreateBtn);
    expect(onNavigateToCreate).toHaveBeenCalledTimes(1);
  });
});
