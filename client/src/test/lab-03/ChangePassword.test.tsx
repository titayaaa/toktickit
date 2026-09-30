import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ChangePassword from '../../components/ChangePassword';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock global fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('Issue 20: ChangePassword Component Tests (ChangePassword.test.tsx)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    // Simulate authenticated session with mustChangePassword = true
    localStorage.setItem('toktickit_auth_token', 'temp-auth-token');
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        user: {
          id: 10,
          email: 'firstlogin@toktickit.com',
          fullName: 'First Login User',
          name: 'First Login User',
          role: 'REQUESTER',
          mustChangePassword: true,
        },
      }),
    });
  });

  it('renders Password Change screen with amber notice and complexity checklist', async () => {
    render(
      <AuthProvider>
        <ChangePassword />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Password Change Required/i })).toBeInTheDocument();
    });

    expect(screen.getByText(/Access to tickets and operational screens is locked/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Current \(Temporary\) Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^New Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm New Password/i)).toBeInTheDocument();

    // Check checklist items
    expect(screen.getByText(/At least 8 characters long/i)).toBeInTheDocument();
    expect(screen.getByText(/At least one uppercase letter \(A-Z\)/i)).toBeInTheDocument();
    expect(screen.getByText(/At least one lowercase letter \(a-z\)/i)).toBeInTheDocument();
    expect(screen.getByText(/At least one numeric digit \(0-9\)/i)).toBeInTheDocument();
  });

  it('submit button remains disabled until all complexity requirements and confirmation match', async () => {
    render(
      <AuthProvider>
        <ChangePassword />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Password Change Required/i })).toBeInTheDocument();
    });

    const submitBtn = screen.getByRole('button', { name: /Update Password & Continue/i });
    expect(submitBtn).toBeDisabled();

    const currentPass = screen.getByLabelText(/Current \(Temporary\) Password/i);
    const newPass = screen.getByLabelText(/^New Password$/i);
    const confirmPass = screen.getByLabelText(/Confirm New Password/i);

    fireEvent.change(currentPass, { target: { value: 'OldTempPass1' } });
    fireEvent.change(newPass, { target: { value: 'ValidPass123' } });

    // Still disabled because confirmation does not match
    expect(submitBtn).toBeDisabled();

    // Mismatch confirmation
    fireEvent.change(confirmPass, { target: { value: 'MismatchPass' } });
    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();

    // Match confirmation
    fireEvent.change(confirmPass, { target: { value: 'ValidPass123' } });
    expect(submitBtn).toBeEnabled();
  });

  it('submits updated password and calls backend endpoint', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        user: {
          id: 10,
          email: 'firstlogin@toktickit.com',
          fullName: 'First Login User',
          name: 'First Login User',
          role: 'REQUESTER',
          mustChangePassword: true,
        },
      }),
    });

    render(
      <AuthProvider>
        <ChangePassword />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Password Change Required/i })).toBeInTheDocument();
    });

    // Mock change-password call response
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        message: 'Password changed successfully',
        token: 'new-fresh-token',
        user: {
          id: 10,
          email: 'firstlogin@toktickit.com',
          fullName: 'First Login User',
          name: 'First Login User',
          role: 'REQUESTER',
          mustChangePassword: false,
        },
      }),
    });

    const currentPass = screen.getByLabelText(/Current \(Temporary\) Password/i);
    const newPass = screen.getByLabelText(/^New Password$/i);
    const confirmPass = screen.getByLabelText(/Confirm New Password/i);
    const submitBtn = screen.getByRole('button', { name: /Update Password & Continue/i });

    fireEvent.change(currentPass, { target: { value: 'OldTempPass1' } });
    fireEvent.change(newPass, { target: { value: 'NewSecurePass123' } });
    fireEvent.change(confirmPass, { target: { value: 'NewSecurePass123' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/auth/change-password',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ currentPassword: 'OldTempPass1', newPassword: 'NewSecurePass123' }),
        })
      );
    });
  });
});
