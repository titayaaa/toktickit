import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('TokTickIT UI Tests (Lab 1)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('UI-01: TokTickIT heading renders', () => {
    render(<App />);
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

    render(<App />);
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

    render(<App />);
    const checkBtn = screen.getByRole('button', { name: /Check System/i });
    fireEvent.click(checkBtn);

    await waitFor(() => {
      expect(screen.getByText('Offline')).toBeInTheDocument();
    });

    expect(screen.getByText('Unable to connect to TokTickIT API')).toBeInTheDocument();
  });
});
