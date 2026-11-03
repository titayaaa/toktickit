import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import React from 'react';
import StaffDashboard, { StaffDashboardData } from '../../components/StaffDashboard';

// Mock AuthContext
vi.mock('../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: {
      id: 2,
      fullName: 'Alice Staff',
      name: 'Alice Staff',
      email: 'staff.alice@toktickit.com',
      role: 'IT_STAFF',
    },
    logout: vi.fn(),
  }),
}));

const mockDashboardData: StaffDashboardData = {
  metrics: {
    unassignedTicketsCount: 7,
    myAssignedTicketsCount: 4,
    urgentTicketsCount: 3,
    myPendingActionsCount: 5,
    openTicketsCount: 8,
    inProgressTicketsCount: 6,
    unassigned: 7,
    myAssigned: 4,
    urgent: 3,
    myPendingActions: 5,
  },
  urgentTickets: [
    {
      id: 101,
      ticketNumber: 'TICK-101',
      summary: 'Database connection pool exhausted',
      itPriority: 'URGENT',
      currentStatus: 'OPEN',
      category: { id: 1, name: 'Database' },
      relatedSystem: { id: 1, name: 'Production DB' },
      owner: null,
      createdAt: '2026-11-01T08:00:00.000Z',
      updatedAt: '2026-11-01T09:00:00.000Z',
    },
    {
      id: 102,
      ticketNumber: 'TICK-102',
      summary: 'Payment gateway SSL handshake timeout',
      itPriority: 'URGENT',
      currentStatus: 'IN_PROGRESS',
      category: { id: 2, name: 'Network' },
      relatedSystem: { id: 2, name: 'Payment Gateway' },
      owner: { id: 2, fullName: 'Alice Staff', email: 'alice@toktickit.com' },
      createdAt: '2026-11-01T09:30:00.000Z',
      updatedAt: '2026-11-01T10:00:00.000Z',
    },
  ],
  myAssignedActions: [
    {
      id: 201,
      ticketId: 102,
      ticketNumber: 'TICK-102',
      ticketSummary: 'Payment gateway SSL handshake timeout',
      actionDescription: 'Rotate expired TLS root certificates',
      status: 'PENDING',
      actionDateTime: '2026-11-01T10:15:00.000Z',
    },
  ],
  recentTickets: [
    {
      id: 103,
      ticketNumber: 'TICK-103',
      summary: 'Printer driver installation error',
      itPriority: 'LOW',
      currentStatus: 'NEW',
      category: { id: 3, name: 'Hardware' },
      relatedSystem: null,
      owner: null,
      createdAt: '2026-11-01T11:00:00.000Z',
      updatedAt: '2026-11-01T11:00:00.000Z',
    },
  ],
};

describe('Issue 32 / PR-06: IT Staff Dashboard Frontend UI (UI-05, STYLE-01, RESP-01)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (globalThis as any).fetch = vi.fn().mockImplementation((url: string) => {
      if (url.includes('/api/staff/dashboard') || url.includes('/api/dashboard/staff')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockDashboardData),
        });
      }
      return Promise.reject(new Error(`Unhandled request to ${url}`));
    });
  });

  describe('UI-05: Staff Dashboard Metrics, Urgent Tickets & Drill-downs', () => {
    it('renders the 4 authoritative metric cards with exact counts', async () => {
      render(<StaffDashboard />);

      // Wait for data load
      await waitFor(() => {
        expect(screen.getByTestId('staff-metric-value-unassigned')).toBeInTheDocument();
      });

      expect(screen.getByTestId('staff-metric-value-unassigned')).toHaveTextContent('7');
      expect(screen.getByTestId('staff-metric-value-my-assigned')).toHaveTextContent('4');
      expect(screen.getByTestId('staff-metric-value-urgent')).toHaveTextContent('3');
      expect(screen.getByTestId('staff-metric-value-my-pending-actions')).toHaveTextContent('5');
    });

    it('triggers onDrillDown when metric cards are clicked', async () => {
      const handleDrillDown = vi.fn();
      render(<StaffDashboard onDrillDown={handleDrillDown} />);

      await waitFor(() => {
        expect(screen.getByTestId('staff-metric-card-unassigned')).toBeInTheDocument();
      });

      // Click Unassigned card
      fireEvent.click(screen.getByTestId('staff-metric-card-unassigned'));
      expect(handleDrillDown).toHaveBeenCalledWith({ ownerFilter: 'unassigned' });

      // Click My Assigned card
      fireEvent.click(screen.getByTestId('staff-metric-card-my-assigned'));
      expect(handleDrillDown).toHaveBeenCalledWith({ ownerFilter: 'me' });

      // Click Urgent card
      fireEvent.click(screen.getByTestId('staff-metric-card-urgent'));
      expect(handleDrillDown).toHaveBeenCalledWith({ itPriority: 'URGENT' });

      // Click My Pending Actions card
      fireEvent.click(screen.getByTestId('staff-metric-card-my-pending-actions'));
      expect(handleDrillDown).toHaveBeenCalledWith({ status: 'IN_PROGRESS', ownerFilter: 'me' });
    });

    it('renders urgent incident queue with correct ticket numbers and summaries', async () => {
      const handleSelectTicket = vi.fn();
      render(<StaffDashboard onSelectTicket={handleSelectTicket} />);

      await waitFor(() => {
        expect(screen.getByTestId('staff-recent-tickets-panel')).toBeInTheDocument();
      });

      expect(screen.getAllByText('TICK-101').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Database connection pool exhausted').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('TICK-102').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Payment gateway SSL handshake timeout').length).toBeGreaterThanOrEqual(1);

      // Click inspect button for TICK-101
      const inspectButtons = screen.getAllByRole('button', { name: /Inspect Ticket/i });
      expect(inspectButtons.length).toBeGreaterThanOrEqual(1);
      fireEvent.click(inspectButtons[0]);
      expect(handleSelectTicket).toHaveBeenCalledWith(101);
    });

    it('renders assigned actions and quick actions panel', async () => {
      const handleDrillDown = vi.fn();
      render(<StaffDashboard onDrillDown={handleDrillDown} />);

      await waitFor(() => {
        expect(screen.getByTestId('staff-actions-panel')).toBeInTheDocument();
        expect(screen.getByTestId('staff-quick-actions-panel')).toBeInTheDocument();
      });

      expect(screen.getByText('Rotate expired TLS root certificates')).toBeInTheDocument();

      // Quick action: Filter My Assigned
      fireEvent.click(screen.getByTestId('staff-quick-action-my-queue'));
      expect(handleDrillDown).toHaveBeenCalledWith({ ownerFilter: 'me' });
    });
  });

  describe('STYLE-01: Zen Green Aesthetic & Visual Tokens Compliance', () => {
    it('applies Zen Green brand colors, badges, and background tints', async () => {
      render(<StaffDashboard />);

      await waitFor(() => {
        expect(screen.getByTestId('staff-dashboard')).toBeInTheDocument();
      });

      // Greeting header has Zen Green color
      const greeting = screen.getByTestId('staff-dashboard-greeting');
      expect(greeting).toHaveStyle({ color: '#006B3C' });

      // Refresh button has Zen Green border/color
      const refreshBtn = screen.getByTestId('staff-dashboard-refresh');
      expect(refreshBtn).toHaveStyle({ minHeight: '44px', color: '#006B3C', borderColor: '#006B3C' });

      // Open Service Queue button has primary Zen Green background
      const queueBtn = screen.getByTestId('staff-quick-action-view-queue');
      expect(queueBtn).toHaveStyle({ backgroundColor: '#006B3C' });
    });
  });

  describe('RESP-01: Responsive Layout & Mobile Touch Target Compliance', () => {
    it('ensures all interactive buttons and cards have touch targets >= 44px', async () => {
      render(<StaffDashboard />);

      await waitFor(() => {
        expect(screen.getByTestId('staff-dashboard')).toBeInTheDocument();
      });

      const clickableCards = [
        screen.getByTestId('staff-metric-card-unassigned'),
        screen.getByTestId('staff-metric-card-my-assigned'),
        screen.getByTestId('staff-metric-card-urgent'),
        screen.getByTestId('staff-metric-card-my-pending-actions'),
      ];

      for (const card of clickableCards) {
        expect(card).toHaveStyle({ minHeight: '44px' });
      }

      const quickActions = [
        screen.getByTestId('staff-quick-action-view-queue'),
        screen.getByTestId('staff-quick-action-my-queue'),
        screen.getByTestId('staff-quick-action-unassigned'),
      ];

      for (const btn of quickActions) {
        expect(btn).toHaveStyle({ minHeight: '44px' });
      }
    });

    it('has zero horizontal overflow container style', async () => {
      render(<StaffDashboard />);

      await waitFor(() => {
        expect(screen.getByTestId('staff-dashboard')).toBeInTheDocument();
      });

      const container = screen.getByTestId('staff-dashboard');
      expect(container).toHaveStyle({ overflowX: 'hidden' });
    });
  });
});
