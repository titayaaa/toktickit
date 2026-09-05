import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DevelopmentRequesterSelection from '../components/DevelopmentRequesterSelection';
import { RequesterProvider } from '../contexts/RequesterContext';

// Mock fetch globally
global.fetch = vi.fn();

describe('DevelopmentRequesterSelection', () => {
  it('renders loading state initially', () => {
    // Return a pending promise to keep it in loading state
    (global.fetch as any).mockReturnValue(new Promise(() => {}));
    
    render(
      <RequesterProvider>
        <DevelopmentRequesterSelection />
      </RequesterProvider>
    );

    expect(screen.getByText(/Loading active requesters/i)).toBeInTheDocument();
  });

  it('renders list of requesters successfully', async () => {
    const mockRequesters = [
      { id: 1, name: 'John Doe', email: 'john@example.com', isActive: true },
    ];
    
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockRequesters,
    });

    render(
      <RequesterProvider>
        <DevelopmentRequesterSelection />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
    
    expect(screen.getByRole('button', { name: /Continue/i })).toBeEnabled();
  });

  it('renders error state when fetch fails', async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
    });

    render(
      <RequesterProvider>
        <DevelopmentRequesterSelection />
      </RequesterProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Unable to load requesters/i)).toBeInTheDocument();
    });
  });
});
