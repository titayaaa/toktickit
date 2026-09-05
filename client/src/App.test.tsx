import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { RequesterProvider } from './contexts/RequesterContext';

describe('TokTickIT UI Tests (Lab 1)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    
    // Mock the localStorage or context so we bypass the login screen
    // Since we wrapped App in RequesterProvider, we can just mock localStorage
    localStorage.setItem('toktickit_dev_requester', JSON.stringify({
      id: 1, name: 'Test User', email: 'test@example.com'
    }));
  });

  afterEach(() => {
    localStorage.removeItem('toktickit_dev_requester');
  });

  it('UI-01: TokTickIT heading renders', () => {
    render(
      <RequesterProvider>
        <App />
      </RequesterProvider>
    );
    expect(screen.getByRole('heading', { name: /TokTickIT IT Service Desk/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Check System/i })).toBeInTheDocument();
  });

  it('UI-02: Loading state changes to category list', async () => {
    const mockCategories = [
      { id: 1, name: 'Account and Access' },
      { id: 2, name: 'Hardware' },
      { id: 3, name: 'Software' },
      { id: 4, name: 'Network' },
    ];

    vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
      if (url === '/api/health') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ status: 'ok', service: 'TokTickIT API' }),
        } as Response);
      }
      if (url === '/api/categories') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCategories),
        } as Response);
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(
      <RequesterProvider>
        <App />
      </RequesterProvider>
    );
    const checkBtn = screen.getByRole('button', { name: /Check System/i });
    fireEvent.click(checkBtn);

    await waitFor(() => {
      expect(screen.getByText(/System Status:/i)).toBeInTheDocument();
      expect(screen.getByText('Online')).toBeInTheDocument();
    });

    expect(screen.getByText('Account and Access')).toBeInTheDocument();
    expect(screen.getByText('Hardware')).toBeInTheDocument();
    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.getByText('Network')).toBeInTheDocument();
  });

  it('UI-03: API failure displays a useful error message', async () => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('Network error'))
    );

    render(
      <RequesterProvider>
        <App />
      </RequesterProvider>
    );
    const checkBtn = screen.getByRole('button', { name: /Check System/i });
    fireEvent.click(checkBtn);

    await waitFor(() => {
      expect(screen.getByText('Offline')).toBeInTheDocument();
    });

    expect(screen.getByText('Unable to connect to TokTickIT API')).toBeInTheDocument();
  });

  it('UI-04: Renders Requester Selection when no requester is selected', async () => {
    // Clear the localStorage for this specific test
    localStorage.removeItem('toktickit_dev_requester');
    
    // Mock fetch for the requesters API
    const mockRequesters = [
      { id: 1, name: 'John Doe', email: 'john@example.com', isActive: true },
    ];
    vi.spyOn(globalThis, 'fetch').mockImplementation((url) => {
      if (url === '/api/requesters') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockRequesters),
        } as Response);
      }
      return Promise.reject(new Error('Unknown URL'));
    });

    render(
      <RequesterProvider>
        <App />
      </RequesterProvider>
    );

    // Should see the selection screen
    await waitFor(() => {
      expect(screen.getByText(/Select Development Requester/i)).toBeInTheDocument();
    });
    
    // Should NOT see the main app UI
    expect(screen.queryByRole('heading', { name: /TokTickIT IT Service Desk/i })).not.toBeInTheDocument();
  });
});
