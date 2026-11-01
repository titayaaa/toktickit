import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import RequesterDashboard, { RequesterDashboardData } from '../../components/RequesterDashboard';

// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      id: 1,
      fullName: 'Jennifer Anderson',
      name: 'Jennifer Anderson',
      email: 'jennifer@toktickit.com',
      role: 'REQUESTER',
    },
    logout: vi.fn(),
  }),
}));

const mockDashboardData: RequesterDashboardData = {
  metrics: {
    totalOpenCount: 5,
    waitingForRequesterCount: 2,
    recentlyUpdatedCount: 3,
    recentlyResolvedCount: 4,
    myOpen: 5,
    waitingForRequester: 2,
    inProgress: 3,
    resolved: 4,
    closed: 1,
  },
  actionRequiredTickets: [
    {
      id: 201,
      ticketNumber: 'TCK-2026-0001',
      summary: 'VPN profile expired and needs password confirmation',
      currentStatus: 'WAITING_FOR_REQUESTER',
      requestedPriority: 'HIGH',
      categoryName: 'Network',
      updatedAt: '2026-11-01T10:00:00.000Z',
    },
    {
      id: 202,
      ticketNumber: 'TCK-2026-0002',
      summary: 'Replacement laptop model preference required',
      currentStatus: 'WAITING_FOR_REQUESTER',
      requestedPriority: 'MEDIUM',
      categoryName: 'Hardware',
      updatedAt: '2026-11-01T11:00:00.000Z',
    },
  ],
  recentTickets: [
    {
      id: 201,
      ticketNumber: 'TCK-2026-0001',
      summary: 'VPN profile expired and needs password confirmation',
      currentStatus: 'WAITING_FOR_REQUESTER',
      requestedPriority: 'HIGH',
      categoryName: 'Network',
      updatedAt: '2026-11-01T10:00:00.000Z',
    },
    {
      id: 203,
      ticketNumber: 'TCK-2026-0003',
      summary: 'Printer driver installation on Windows 11',
      currentStatus: 'OPEN',
      requestedPriority: 'LOW',
      categoryName: 'Software',
      updatedAt: '2026-11-01T09:00:00.000Z',
    },
    {
      id: 204,
      ticketNumber: 'TCK-2026-0004',
      summary: 'Outlook calendar sync error',
      currentStatus: 'RESOLVED',
      requestedPriority: 'MEDIUM',
      categoryName: 'Software',
      updatedAt: '2026-11-01T08:00:00.000Z',
    },
  ],
  quickActions: [
    { id: 'create-ticket', label: 'Create Ticket', url: '/tickets/new' },
    { id: 'view-tickets', label: 'View My Tickets', url: '/tickets' },
  ],
};

describe('Issue 33 / PR-07: Requester Dashboard Component (UI-06, FR-13, AC-10)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.setItem('toktickit_auth_token', 'mock_requester_token');
  });

  it('UI-06: Renders greeting, personal metric cards, action required banner, and recent requests', async () => {
    (globalThis as any).fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockDashboardData,
    });

    render(<RequesterDashboard />);

    // 1. Loading state initially visible
    expect(screen.getByTestId('requester-dashboard-loading')).toBeInTheDocument();

    // 2. Wait for data to load
    await waitFor(() => {
      expect(screen.getByTestId('requester-dashboard-container')).toBeInTheDocument();
    });

    // 3. Greeting with user name
    expect(screen.getByText(/Welcome back, Jennifer Anderson!/i)).toBeInTheDocument();

    // 4. Metric Cards with accurate values
    expect(screen.getByTestId('metric-value-open')).toHaveTextContent('5');
    expect(screen.getByTestId('metric-value-waiting')).toHaveTextContent('2');
    expect(screen.getByTestId('metric-value-recent')).toHaveTextContent('3');
    expect(screen.getByTestId('metric-value-resolved')).toHaveTextContent('4');

    // 5. Action Required banner
    expect(screen.getByTestId('requester-action-required-banner')).toBeInTheDocument();
    expect(screen.getByText(/Action Required: 2 ticket\(s\) waiting for your response/i)).toBeInTheDocument();

    // 6. Recent tickets table
    expect(screen.getByTestId('requester-recent-table')).toBeInTheDocument();
    expect(screen.getAllByText('TCK-2026-0001').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('TCK-2026-0003').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('TCK-2026-0004').length).toBeGreaterThanOrEqual(1);
  });

  it('UI-06: Handles interactive metric card drill-down navigation', async () => {
    (globalThis as any).fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockDashboardData,
    });

    const handleDrillDown = vi.fn();
    render(<RequesterDashboard onDrillDown={handleDrillDown} />);

    await waitFor(() => {
      expect(screen.getByTestId('requester-dashboard-container')).toBeInTheDocument();
    });

    // Click Open card
    fireEvent.click(screen.getByTestId('requester-metric-card-open'));
    expect(handleDrillDown).toHaveBeenCalledWith({ status: 'OPEN' });

    // Click Waiting card
    fireEvent.click(screen.getByTestId('requester-metric-card-waiting'));
    expect(handleDrillDown).toHaveBeenCalledWith({ status: 'WAITING_FOR_REQUESTER' });

    // Click Recently Updated card
    fireEvent.click(screen.getByTestId('requester-metric-card-recent'));
    expect(handleDrillDown).toHaveBeenCalledWith({ status: 'IN_PROGRESS' });

    // Click Resolved card
    fireEvent.click(screen.getByTestId('requester-metric-card-resolved'));
    expect(handleDrillDown).toHaveBeenCalledWith({ status: 'RESOLVED' });
  });

  it('UI-06: Action Required inspect button triggers onSelectTicket', async () => {
    (globalThis as any).fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockDashboardData,
    });

    const handleSelectTicket = vi.fn();
    render(<RequesterDashboard onSelectTicket={handleSelectTicket} />);

    await waitFor(() => {
      expect(screen.getByTestId('action-required-ticket-201')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('action-required-ticket-201'));
    expect(handleSelectTicket).toHaveBeenCalledWith(201);
  });

  it('UI-06: Quick Action buttons trigger appropriate navigation callbacks', async () => {
    (globalThis as any).fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockDashboardData,
    });

    const handleCreate = vi.fn();
    const handleViewTickets = vi.fn();

    render(
      <RequesterDashboard
        onNavigateToCreate={handleCreate}
        onNavigateToMyTickets={handleViewTickets}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('requester-quick-actions')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('requester-quick-action-create-ticket'));
    expect(handleCreate).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('requester-quick-action-view-tickets'));
    expect(handleViewTickets).toHaveBeenCalledWith('');
  });

  it('UI-06: Renders empty state guidance and CTA when requester has zero tickets', async () => {
    const emptyData: RequesterDashboardData = {
      metrics: {
        totalOpenCount: 0,
        waitingForRequesterCount: 0,
        recentlyUpdatedCount: 0,
        recentlyResolvedCount: 0,
      },
      actionRequiredTickets: [],
      recentTickets: [],
    };

    (globalThis as any).fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => emptyData,
    });

    const handleCreate = vi.fn();
    render(<RequesterDashboard onNavigateToCreate={handleCreate} />);

    await waitFor(() => {
      expect(screen.getByTestId('requester-empty-state')).toBeInTheDocument();
    });

    expect(screen.getByText(/You don't have any service requests yet/i)).toBeInTheDocument();
    expect(screen.queryByTestId('requester-action-required-banner')).not.toBeInTheDocument();

    const ctaBtn = screen.getByTestId('requester-empty-cta');
    fireEvent.click(ctaBtn);
    expect(handleCreate).toHaveBeenCalledTimes(1);
  });

  it('UI-06: Displays error alert on failure and supports retry', async () => {
    (globalThis as any).fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error('Network connection timeout'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockDashboardData,
      });

    render(<RequesterDashboard />);

    await waitFor(() => {
      expect(screen.getByTestId('requester-dashboard-error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Network connection timeout/i)).toBeInTheDocument();

    // Click retry
    fireEvent.click(screen.getByTestId('requester-dashboard-retry'));

    await waitFor(() => {
      expect(screen.getByTestId('requester-dashboard-container')).toBeInTheDocument();
    });

    expect(screen.getAllByText('TCK-2026-0001').length).toBeGreaterThanOrEqual(1);
  });
});
