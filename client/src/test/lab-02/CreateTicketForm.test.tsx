import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CreateTicketForm from '../../components/CreateTicketForm';
import { useRequester } from '../../contexts/RequesterContext';

// Mock the context
vi.mock('../../contexts/RequesterContext', () => ({
  useRequester: vi.fn(),
}));

const mockCategories = [
  { id: 1, name: 'Network' },
  { id: 2, name: 'Hardware' }
];

const mockSystems = [
  { id: 1, name: 'Campus Wi-Fi' },
  { id: 2, name: 'Corporate Laptop' }
];

describe('CreateTicketForm (Issue 10 UI tests)', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock the requester context to return a selected requester
    (useRequester as any).mockReturnValue({
      selectedRequester: { id: 1, name: 'Tester', email: 'tester@example.com', isActive: true },
    });
    
    // Mock fetch globally
    globalThis.fetch = vi.fn();
  });

  it('UI-02: Form shows validation errors (red asterisks/text) when missing fields on submit', async () => {
    render(<CreateTicketForm categories={mockCategories} relatedSystems={mockSystems} />);
    
    // Check for red asterisks on required labels
    const asteriskSpanSummary = screen.getByText('Summary').querySelector('.text-danger');
    expect(asteriskSpanSummary).toBeInTheDocument();
    
    const submitButton = screen.getByRole('button', { name: /Submit Ticket/i });
    
    // Submit without filling anything
    await userEvent.click(submitButton);
    
    // API should not be called
    expect(globalThis.fetch).not.toHaveBeenCalled();
    
    // Validation messages should appear
    expect(screen.getByText('Summary is required')).toBeInTheDocument();
    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(screen.getByText('Category is required')).toBeInTheDocument();
    expect(screen.getByText('Related System is required')).toBeInTheDocument();
  });

  it('UI-03: Submit button shows Busy state while submitting', async () => {
    // Mock a fetch that resolves after a slight delay
    let resolveFetch: (value: any) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    
    (globalThis.fetch as any).mockReturnValue(fetchPromise);

    render(<CreateTicketForm categories={mockCategories} relatedSystems={mockSystems} />);
    
    // Fill required fields
    await userEvent.type(screen.getByLabelText(/Summary/i), 'Valid summary');
    await userEvent.type(screen.getByLabelText(/Description/i), 'Valid description');
    await userEvent.selectOptions(screen.getByLabelText(/Category/i), '1');
    await userEvent.selectOptions(screen.getByLabelText(/Related System/i), '1');
    
    const submitButton = screen.getByRole('button', { name: /Submit Ticket/i });
    
    // Submit the form
    fireEvent.click(submitButton); // fireEvent is sync, good for capturing immediate state
    
    // Immediately check if button is disabled and shows Busy
    expect(submitButton).toBeDisabled();
    expect(screen.getByText('Busy...')).toBeInTheDocument();
    
    // Resolve the fetch promise
    resolveFetch!({
      ok: true,
      json: async () => ({ ticketNumber: 'TKT-2026-000001' })
    });
    
    // Wait for the form to settle and show success message
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(screen.queryByText('Busy...')).not.toBeInTheDocument();
      expect(screen.getByText(/TKT-2026-000001/)).toBeInTheDocument();
    });
    
    // Verify API call arguments
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/tickets', expect.objectContaining({
      method: 'POST',
      headers: expect.objectContaining({
        'Authorization': 'Bearer dev_requester_1'
      })
    }));
  });

  it('UI-04: Displays error alert and preserves form values when API fails', async () => {
    (globalThis.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Server error occurred while creating ticket' })
    });

    render(<CreateTicketForm categories={mockCategories} relatedSystems={mockSystems} />);

    // Fill form
    await userEvent.type(screen.getByLabelText(/Summary/i), '  Test Summary  ');
    await userEvent.type(screen.getByLabelText(/Description/i), '  Test Description  ');
    await userEvent.selectOptions(screen.getByLabelText(/Category/i), '1');
    await userEvent.selectOptions(screen.getByLabelText(/Related System/i), '2');

    const submitButton = screen.getByRole('button', { name: /Submit Ticket/i });
    await userEvent.click(submitButton);

    // Check error alert
    await waitFor(() => {
      expect(screen.getByText('Server error occurred while creating ticket')).toBeInTheDocument();
    });

    // Form inputs should still retain their values
    expect(screen.getByLabelText(/Summary/i)).toHaveValue('  Test Summary  ');
    expect(screen.getByLabelText(/Description/i)).toHaveValue('  Test Description  ');
    expect(screen.getByLabelText(/Category/i)).toHaveValue('1');
    expect(screen.getByLabelText(/Related System/i)).toHaveValue('2');

    // Also verify summary and description were trimmed when payload was sent
    expect(globalThis.fetch).toHaveBeenCalledWith('/api/tickets', expect.objectContaining({
      body: JSON.stringify({
        summary: 'Test Summary',
        description: 'Test Description',
        categoryId: 1,
        relatedSystemId: 2,
        requestedPriority: 'LOW'
      })
    }));
  });
});

