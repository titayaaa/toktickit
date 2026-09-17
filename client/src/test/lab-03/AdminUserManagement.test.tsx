import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import AdminUserManagement from '../../components/AdminUserManagement';
import { AuthProvider } from '../../contexts/AuthContext';

const mockAdminUser = {
  id: 1,
  fullName: 'Suda Administrator',
  name: 'Suda Administrator',
  email: 'admin.suda@toktickit.com',
  role: 'ADMINISTRATOR',
  mustChangePassword: false,
};

const mockUserRoster = [
  {
    id: 1,
    fullName: 'Suda Administrator',
    name: 'Suda Administrator',
    email: 'admin.suda@toktickit.com',
    role: 'ADMINISTRATOR',
    isActive: true,
    mustChangePassword: false,
    createdAt: '2026-09-01T08:00:00.000Z',
    updatedAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 2,
    fullName: 'Somchai IT Support',
    name: 'Somchai IT Support',
    email: 'somchai.it@toktickit.com',
    role: 'IT_STAFF',
    isActive: true,
    mustChangePassword: false,
    createdAt: '2026-09-01T08:30:00.000Z',
    updatedAt: '2026-09-01T08:30:00.000Z',
  },
  {
    id: 3,
    fullName: 'Alice Requester',
    name: 'Alice Requester',
    email: 'alice.req@toktickit.com',
    role: 'REQUESTER',
    isActive: false,
    mustChangePassword: true,
    createdAt: '2026-09-02T09:00:00.000Z',
    updatedAt: '2026-09-02T09:00:00.000Z',
  },
];

describe('Issue 25: AdminUserManagement Component Unit Tests', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    localStorage.setItem('toktickit_auth_token', 'mock-admin-token');
  });

  const renderAdminView = (rosterData = mockUserRoster) => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (url: any, init?: any) => {
      const urlStr = url.toString();

      if (urlStr.endsWith('/api/auth/me')) {
        return {
          ok: true,
          status: 200,
          json: async () => ({ user: mockAdminUser }),
        } as Response;
      }

      if (urlStr.includes('/api/admin/users')) {
        // Handle POST /api/admin/users
        if (init && init.method === 'POST') {
          const body = JSON.parse(init.body);
          return {
            ok: true,
            status: 201,
            json: async () => ({
              id: 99,
              ...body,
              mustChangePassword: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }),
          } as Response;
        }

        // Handle PATCH /api/admin/users/:id
        if (init && init.method === 'PATCH') {
          const body = JSON.parse(init.body);
          return {
            ok: true,
            status: 200,
            json: async () => ({
              id: 2,
              ...body,
              mustChangePassword: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }),
          } as Response;
        }

        // Handle GET /api/admin/users
        return {
          ok: true,
          status: 200,
          json: async () => rosterData,
        } as Response;
      }

      return {
        ok: true,
        status: 200,
        json: async () => ({}),
      } as Response;
    });

    return render(
      <AuthProvider>
        <AdminUserManagement />
      </AuthProvider>
    );
  };

  it('ADM-UI-01: Renders user roster with search bar, filter selects, and data table with (You) tag', async () => {
    renderAdminView();

    await waitFor(() => {
      expect(screen.getByTestId('admin-user-management')).toBeInTheDocument();
    });

    // Check header and primary action
    expect(screen.getByRole('heading', { name: /User Management/i })).toBeInTheDocument();
    expect(screen.getByTestId('create-user-button')).toBeInTheDocument();

    // Check filters
    expect(screen.getByTestId('admin-user-search-input')).toBeInTheDocument();
    expect(screen.getByTestId('admin-user-role-filter')).toBeInTheDocument();
    expect(screen.getByTestId('admin-user-status-filter')).toBeInTheDocument();

    // Check table and rows
    expect(screen.getByTestId('admin-users-table')).toBeInTheDocument();
    expect(screen.getAllByText('Suda Administrator')[0]).toBeInTheDocument();
    expect(screen.getAllByText('(You)')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Somchai IT Support')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Alice Requester')[0]).toBeInTheDocument();

    // Check badges
    expect(screen.getAllByText('Active')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Inactive')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Must Change')[0]).toBeInTheDocument();
  });

  it('ADM-UI-02: Debounced search query triggers API request with search parameter', async () => {
    renderAdminView();

    await waitFor(() => {
      expect(screen.getByTestId('admin-user-search-input')).toBeInTheDocument();
    });

    const searchInput = screen.getByTestId('admin-user-search-input');
    fireEvent.change(searchInput, { target: { value: 'somchai' } });

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('search=somchai'),
        expect.anything()
      );
    });
  });

  it('ADM-UI-03: Create User Modal validates real-time password complexity checklist and submits successfully', async () => {
    renderAdminView();

    await waitFor(() => {
      expect(screen.getByTestId('create-user-button')).toBeInTheDocument();
    });

    // Open modal
    fireEvent.click(screen.getByTestId('create-user-button'));
    expect(screen.getByText('Create User Account')).toBeInTheDocument();

    const nameInput = screen.getByLabelText(/Full Name \*/i);
    const emailInput = screen.getByLabelText(/Email Address \*/i);
    const roleSelect = screen.getByLabelText(/Role \*/i);
    const passwordInput = screen.getByLabelText(/Initial Temporary Password \*/i);
    const submitBtn = screen.getByTestId('create-user-submit-button');

    // Initially disabled before filling valid fields
    expect(submitBtn).toBeDisabled();

    fireEvent.change(nameInput, { target: { value: 'Jennifer IT' } });
    fireEvent.change(emailInput, { target: { value: 'jennifer.it@toktickit.com' } });
    fireEvent.change(roleSelect, { target: { value: 'IT_STAFF' } });

    // Weak password: short & missing digits
    fireEvent.change(passwordInput, { target: { value: 'weak' } });
    expect(submitBtn).toBeDisabled();

    // Valid password meeting all 4 complexity criteria
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123!' } });
    expect(submitBtn).not.toBeDisabled();

    // Submit form
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/admin/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({
            fullName: 'Jennifer IT',
            email: 'jennifer.it@toktickit.com',
            role: 'IT_STAFF',
            initialPassword: 'StrongPass123!',
            isActive: true,
          }),
        })
      );
    });
  });

  it('ADM-UI-04: Edit Modal enforces BR-18 (disables role and active checkbox when editing self)', async () => {
    renderAdminView();

    await waitFor(() => {
      expect(screen.getByTestId('edit-user-btn-1')).toBeInTheDocument();
    });

    // Click edit on own account (id: 1)
    fireEvent.click(screen.getByTestId('edit-user-btn-1'));

    expect(screen.getByText(/Edit User: Suda Administrator/i)).toBeInTheDocument();

    const roleSelect = screen.getByLabelText(/Role \*/i);
    const activeCheckbox = screen.getByLabelText(/Active Account/i);

    // Disabled per BR-18
    expect(roleSelect).toBeDisabled();
    expect(activeCheckbox).toBeDisabled();
    expect(screen.getByText(/Role cannot be changed for your own account \(BR-18\)/i)).toBeInTheDocument();
    expect(screen.getByText(/You cannot deactivate your own account \(BR-18\)/i)).toBeInTheDocument();
  });

  it('ADM-UI-05: Edit Modal enforces BR-19 (disables role and active checkbox when editing last active administrator)', async () => {
    // Only 1 active administrator in roster (Suda Administrator is the sole admin)
    const singleAdminRoster = [
      mockUserRoster[0], // Suda (Admin, Active)
      mockUserRoster[1], // Somchai (Staff)
      mockUserRoster[2], // Alice (Requester)
    ];

    renderAdminView(singleAdminRoster);

    await waitFor(() => {
      expect(screen.getByTestId('edit-user-btn-1')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('edit-user-btn-1'));

    const roleSelect = screen.getByLabelText(/Role \*/i);
    const activeCheckbox = screen.getByLabelText(/Active Account/i);

    expect(roleSelect).toBeDisabled();
    expect(activeCheckbox).toBeDisabled();
  });

  it('ADM-UI-06: Edit Modal allows modifying details for other non-protected users', async () => {
    renderAdminView();

    await waitFor(() => {
      expect(screen.getByTestId('edit-user-btn-2')).toBeInTheDocument();
    });

    // Click edit on Somchai IT Support (id: 2)
    fireEvent.click(screen.getByTestId('edit-user-btn-2'));

    expect(screen.getByText(/Edit User: Somchai IT Support/i)).toBeInTheDocument();

    const roleSelect = screen.getByLabelText(/Role \*/i);
    const activeCheckbox = screen.getByLabelText(/Active Account/i);
    const nameInput = screen.getByLabelText(/Full Name \*/i);
    const saveBtn = screen.getByTestId('edit-user-save-button');

    // Enabled
    expect(roleSelect).not.toBeDisabled();
    expect(activeCheckbox).not.toBeDisabled();

    fireEvent.change(nameInput, { target: { value: 'Somchai Senior IT' } });
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/admin/users/2',
        expect.objectContaining({
          method: 'PATCH',
          body: expect.stringContaining('Somchai Senior IT'),
        })
      );
    });
  });

  it('ADM-UI-07: Reset Password Modal validates complexity and issues reset API call', async () => {
    renderAdminView();

    await waitFor(() => {
      expect(screen.getByTestId('reset-user-btn-2')).toBeInTheDocument();
    });

    // Click reset password on Somchai (id: 2)
    fireEvent.click(screen.getByTestId('reset-user-btn-2'));

    expect(screen.getByText(/Reset Password: Somchai IT Support/i)).toBeInTheDocument();

    const pwdInput = screen.getByLabelText(/New Temporary Password \*/i);
    const confirmBtn = screen.getByTestId('reset-user-submit-button');

    // Initially disabled
    expect(confirmBtn).toBeDisabled();

    // Type valid new temporary password
    fireEvent.change(pwdInput, { target: { value: 'NewResetPass123!' } });
    expect(confirmBtn).not.toBeDisabled();

    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        '/api/admin/users/2/reset-password',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ initialPassword: 'NewResetPass123!' }),
        })
      );
    });
  });
});
