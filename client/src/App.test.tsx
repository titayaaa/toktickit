import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import { RequesterProvider } from './contexts/RequesterContext';

describe('TokTickIT UI Tests (Lab 1 & 2)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    
    // Mock the localStorage or context so we bypass the login screen
    localStorage.setItem('toktickit_auth_token', 'mock-token');
    localStorage.setItem('toktickit_dev_requester', JSON.stringify({
      id: 1, name: 'Test User', email: 'test@example.com'
    }));
  });

  afterEach(() => {
    localStorage.removeItem('toktickit_auth_token');
    localStorage.removeItem('toktickit_dev_requester');
  });

  it('UI-01: TokTickIT heading renders and fetches reference data on mount', async () => {
    const mockCategories = [{ id: 1, name: 'Account and Access' }];
    const mockSystems = [{ id: 1, name: 'Campus Wi-Fi' }];
    const mockUser = { id: 1, name: 'Test User', fullName: 'Test User', email: 'test@example.com', role: 'REQUESTER', mustChangePassword: false };

    vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
      const urlStr = url.toString();
      if (urlStr.includes('/api/auth/me')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ user: mockUser }),
        } as Response);
      }
      if (urlStr.includes('/api/categories')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCategories),
        } as Response);
      }
      if (urlStr.includes('/api/related-systems')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSystems),
        } as Response);
      }
      return Promise.reject(new Error('Unknown URL: ' + urlStr));
    });

    render(
      <RequesterProvider>
        <App />
      </RequesterProvider>
    );
    
    // Wait for auth check and reference data loading to finish
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /TokTickIT IT Service Desk/i })).toBeInTheDocument();
      expect(screen.getByText(/Create New Ticket/i)).toBeInTheDocument();
    });
  });

  it('UI-03: API failure displays a useful error message when fetching reference data', async () => {
    const mockUser = { id: 1, name: 'Test User', fullName: 'Test User', email: 'test@example.com', role: 'REQUESTER', mustChangePassword: false };
    vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
      const urlStr = url.toString();
      if (urlStr.includes('/api/auth/me')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ user: mockUser }),
        } as Response);
      }
      return Promise.reject(new Error('Network error'));
    });

    render(
      <RequesterProvider>
        <App />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Unable to connect to TokTickIT API')).toBeInTheDocument();
    });
  });

  it('UI-04: Renders Login screen when unauthenticated (replaces dev requester selection)', async () => {
    // Clear auth token for this test
    localStorage.removeItem('toktickit_auth_token');

    render(
      <RequesterProvider>
        <App />
      </RequesterProvider>
    );

    // Should see the Login screen
    await waitFor(() => {
      expect(screen.getByText(/Sign in to your account/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^Sign In$/i })).toBeInTheDocument();
    });
    
    // Should NOT see the main app UI
    expect(screen.queryByRole('heading', { name: /TokTickIT IT Service Desk/i })).not.toBeInTheDocument();
  });

  it('UI-05: Switches between Create Ticket and My Tickets navigation tabs', async () => {
    const mockCategories = [{ id: 1, name: 'Account and Access' }];
    const mockSystems = [{ id: 1, name: 'Campus Wi-Fi' }];
    const mockUser = { id: 1, name: 'Test User', fullName: 'Test User', email: 'test@example.com', role: 'REQUESTER', mustChangePassword: false };

    vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
      const urlStr = url.toString();
      if (urlStr.includes('/api/auth/me')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ user: mockUser }),
        } as Response);
      }
      if (urlStr.includes('/api/categories')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockCategories) } as Response);
      }
      if (urlStr.includes('/api/related-systems')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve(mockSystems) } as Response);
      }
      if (urlStr.includes('/api/tickets')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ tickets: [], meta: { totalCount: 0 } }),
        } as Response);
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(
      <RequesterProvider>
        <App />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Create New Ticket/i)).toBeInTheDocument();
    });

    // Switch to My Tickets tab
    const myTicketsTab = screen.getByRole('button', { name: /My Tickets tab/i });
    fireEvent.click(myTicketsTab);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /My Tickets/i })).toBeInTheDocument();
    });

    // Switch back to Create Ticket tab
    const createTicketTab = screen.getByRole('button', { name: /Create Ticket tab/i });
    fireEvent.click(createTicketTab);

    await waitFor(() => {
      expect(screen.getByText(/Create New Ticket/i)).toBeInTheDocument();
    });
  });
});
