import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export interface AdminUserItem {
  id: number;
  fullName: string;
  name?: string;
  email: string;
  role: 'REQUESTER' | 'IT_STAFF' | 'ADMINISTRATOR';
  isActive: boolean;
  mustChangePassword: boolean;
  createdAt: string;
  updatedAt: string;
}

export const AdminUserManagement: React.FC = () => {
  const { user: currentUser, token } = useAuth();

  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<AdminUserItem | null>(null);
  const [resettingUser, setResettingUser] = useState<AdminUserItem | null>(null);

  // Form states - Create User
  const [createFullName, setCreateFullName] = useState<string>('');
  const [createEmail, setCreateEmail] = useState<string>('');
  const [createRole, setCreateRole] = useState<'REQUESTER' | 'IT_STAFF' | 'ADMINISTRATOR'>('REQUESTER');
  const [createPassword, setCreatePassword] = useState<string>('');
  const [createIsActive, setCreateIsActive] = useState<boolean>(true);
  const [createError, setCreateError] = useState<string | null>(null);
  const [isSubmittingCreate, setIsSubmittingCreate] = useState<boolean>(false);

  // Form states - Edit User
  const [editFullName, setEditFullName] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editRole, setEditRole] = useState<'REQUESTER' | 'IT_STAFF' | 'ADMINISTRATOR'>('REQUESTER');
  const [editIsActive, setEditIsActive] = useState<boolean>(true);
  const [editError, setEditError] = useState<string | null>(null);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState<boolean>(false);

  // Form states - Reset Password
  const [resetPasswordInput, setResetPasswordInput] = useState<string>('');
  const [resetError, setResetError] = useState<string | null>(null);
  const [isSubmittingReset, setIsSubmittingReset] = useState<boolean>(false);

  // Unified Request Headers
  const getAuthHeaders = useCallback((): HeadersInit => {
    if (token) {
      return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  }, [token]);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 250);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch Users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (debouncedSearch) params.append('search', debouncedSearch);
      if (roleFilter) params.append('role', roleFilter);
      if (statusFilter) params.append('isActive', statusFilter);

      const url = `/api/admin/users${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, { headers: getAuthHeaders() });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to fetch user list');
      }

      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || 'Error loading user roster');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, roleFilter, statusFilter, getAuthHeaders]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Count active administrators to enforce BR-19 client-side guard
  const activeAdminCount = useMemo(() => {
    return users.filter((u) => u.role === 'ADMINISTRATOR' && u.isActive).length;
  }, [users]);

  // Password Complexity Checker
  const checkPasswordComplexity = (pwd: string) => ({
    hasLength: pwd.length >= 8,
    hasUpper: /[A-Z]/.test(pwd),
    hasLower: /[a-z]/.test(pwd),
    hasNumber: /[0-9]/.test(pwd),
  });

  const createComplexity = checkPasswordComplexity(createPassword);
  const isCreatePasswordValid =
    createComplexity.hasLength &&
    createComplexity.hasUpper &&
    createComplexity.hasLower &&
    createComplexity.hasNumber;

  const resetComplexity = checkPasswordComplexity(resetPasswordInput);
  const isResetPasswordValid =
    resetComplexity.hasLength &&
    resetComplexity.hasUpper &&
    resetComplexity.hasLower &&
    resetComplexity.hasNumber;

  // Handle Create Submit
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createFullName.trim() || createFullName.trim().length < 2) {
      setCreateError('Full name must be at least 2 characters');
      return;
    }
    if (!createEmail.trim()) {
      setCreateError('Valid email address is required');
      return;
    }
    if (!isCreatePasswordValid) {
      setCreateError('Password does not meet complexity requirements');
      return;
    }

    setIsSubmittingCreate(true);
    setCreateError(null);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          fullName: createFullName.trim(),
          email: createEmail.trim(),
          role: createRole,
          initialPassword: createPassword,
          isActive: createIsActive,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create user account');
      }

      setShowCreateModal(false);
      setCreateFullName('');
      setCreateEmail('');
      setCreateRole('REQUESTER');
      setCreatePassword('');
      setCreateIsActive(true);
      setSuccessMessage(`User "${data.fullName || data.name}" created successfully with temporary password.`);
      await fetchUsers();
    } catch (err: any) {
      setCreateError(err.message || 'Failed to create user');
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  // Open Edit Modal
  const openEditModal = (target: AdminUserItem) => {
    setEditingUser(target);
    setEditFullName(target.fullName || target.name || '');
    setEditEmail(target.email);
    setEditRole(target.role);
    setEditIsActive(target.isActive);
    setEditError(null);
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    if (!editFullName.trim() || editFullName.trim().length < 2) {
      setEditError('Full name must be at least 2 characters');
      return;
    }
    if (!editEmail.trim()) {
      setEditError('Valid email address is required');
      return;
    }

    setIsSubmittingEdit(true);
    setEditError(null);
    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          fullName: editFullName.trim(),
          email: editEmail.trim(),
          role: editRole,
          isActive: editIsActive,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update user profile');
      }

      setEditingUser(null);
      setSuccessMessage(`User "${data.fullName || data.name}" updated successfully.`);
      await fetchUsers();
    } catch (err: any) {
      setEditError(err.message || 'Failed to update user');
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  // Open Reset Modal
  const openResetModal = (target: AdminUserItem) => {
    setResettingUser(target);
    setResetPasswordInput('');
    setResetError(null);
  };

  // Handle Reset Submit
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resettingUser) return;

    if (!isResetPasswordValid) {
      setResetError('Password does not meet complexity requirements');
      return;
    }

    setIsSubmittingReset(true);
    setResetError(null);
    try {
      const res = await fetch(`/api/admin/users/${resettingUser.id}/reset-password`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          initialPassword: resetPasswordInput,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset user password');
      }

      setResettingUser(null);
      setSuccessMessage(`Password for "${resettingUser.email}" has been reset. User must rotate it on next login.`);
      await fetchUsers();
    } catch (err: any) {
      setResetError(err.message || 'Failed to reset password');
    } finally {
      setIsSubmittingReset(false);
    }
  };

  const getRoleBadge = (role: string) => {
    if (role === 'ADMINISTRATOR') {
      return (
        <span
          className="badge"
          style={{ backgroundColor: '#EDE7F6', color: '#512DA8', border: '1px solid #B39DDB' }}
        >
          Administrator
        </span>
      );
    }
    if (role === 'IT_STAFF') {
      return (
        <span
          className="badge"
          style={{ backgroundColor: '#E3F2FD', color: '#1565C0', border: '1px solid #90CAF9' }}
        >
          IT Staff
        </span>
      );
    }
    return (
      <span
        className="badge"
        style={{ backgroundColor: '#E8F5E9', color: '#2E7D32', border: '1px solid #A5D6A7' }}
      >
        Requester
      </span>
    );
  };

  return (
    <div className="admin-user-management" data-testid="admin-user-management">
      {/* Header & Primary Actions */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 p-4 bg-white rounded shadow-sm border">
        <div>
          <h2 className="h4 fw-bold text-success mb-1">User Management</h2>
          <p className="text-muted small mb-0">
            System user roster, role assignments, status administration, and temporary credentials ({users.length} total)
          </p>
        </div>
        <button
          type="button"
          className="btn btn-success d-inline-flex align-items-center gap-2 mt-2 mt-sm-0 fw-semibold"
          onClick={() => {
            setShowCreateModal(true);
            setCreateError(null);
          }}
          data-testid="create-user-button"
        >
          <span>+</span> Create New User
        </button>
      </div>

      {/* Global Alerts */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show mb-4" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show mb-4" role="alert">
          {successMessage}
          <button type="button" className="btn-close" onClick={() => setSuccessMessage(null)} aria-label="Close"></button>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="p-3 mb-4 bg-white rounded shadow-sm border">
        <div className="row g-3 align-items-center">
          {/* Search Input */}
          <div className="col-12 col-md-6 col-lg-5">
            <label htmlFor="user-search-input" className="form-label small text-muted mb-1">
              Search Users
            </label>
            <input
              id="user-search-input"
              type="text"
              className="form-control form-control-sm"
              placeholder="Search by full name or email address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="admin-user-search-input"
            />
          </div>

          {/* Role Filter */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-3">
            <label htmlFor="user-role-filter" className="form-label small text-muted mb-1">
              Filter by Role
            </label>
            <select
              id="user-role-filter"
              className="form-select form-select-sm"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              data-testid="admin-user-role-filter"
            >
              <option value="">All Roles</option>
              <option value="ADMINISTRATOR">Administrator</option>
              <option value="IT_STAFF">IT Staff</option>
              <option value="REQUESTER">Requester</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-3">
            <label htmlFor="user-status-filter" className="form-label small text-muted mb-1">
              Filter by Status
            </label>
            <select
              id="user-status-filter"
              className="form-select form-select-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              data-testid="admin-user-status-filter"
            >
              <option value="">All Statuses</option>
              <option value="true">Active Only</option>
              <option value="false">Inactive Only</option>
            </select>
          </div>

          {/* Reset Filters */}
          <div className="col-12 col-lg-1 d-flex align-items-end">
            {(debouncedSearch || roleFilter || statusFilter) && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm w-100"
                onClick={() => {
                  setSearchQuery('');
                  setRoleFilter('');
                  setStatusFilter('');
                }}
                title="Reset all filters"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* User Roster Table (Desktop & Tablet) */}
      <div className="bg-white rounded shadow-sm border mb-4 d-none d-md-block overflow-hidden">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading users...</span>
            </div>
            <div className="small text-muted mt-2">Loading user roster...</div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-5 text-muted" data-testid="no-users-message">
            <div className="fs-4 mb-2">🔍</div>
            <p className="mb-0">No users match the selected search or filter criteria.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0" data-testid="admin-users-table">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: '25%' }}>Full Name</th>
                  <th scope="col" style={{ width: '25%' }}>Email Address</th>
                  <th scope="col" style={{ width: '15%' }}>Role</th>
                  <th scope="col" style={{ width: '12%' }}>Status</th>
                  <th scope="col" style={{ width: '13%' }}>Password Flag</th>
                  <th scope="col" style={{ width: '10%', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isSelf = currentUser?.id === u.id;
                  return (
                    <tr key={u.id} data-testid={`user-row-${u.id}`}>
                      <td>
                        <span className="fw-semibold text-dark">{u.fullName || u.name}</span>
                        {isSelf && (
                          <span
                            className="badge bg-pale-green text-primary-green border border-success ms-2"
                            style={{ fontSize: '10px' }}
                          >
                            (You)
                          </span>
                        )}
                      </td>
                      <td className="text-muted font-monospace small">{u.email}</td>
                      <td>{getRoleBadge(u.role)}</td>
                      <td>
                        {u.isActive ? (
                          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">
                            Active
                          </span>
                        ) : (
                          <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td>
                        {u.mustChangePassword ? (
                          <span className="badge bg-warning-subtle text-dark border border-warning-subtle">
                            Must Change
                          </span>
                        ) : (
                          <span className="text-muted small">Standard</span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="btn-group btn-group-sm">
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => openEditModal(u)}
                            data-testid={`edit-user-btn-${u.id}`}
                            title="Edit User"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-warning"
                            onClick={() => openResetModal(u)}
                            data-testid={`reset-user-btn-${u.id}`}
                            title="Reset Password"
                          >
                            Reset
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Mobile Card Stack (<768px) */}
      <div className="d-block d-md-none mb-4" data-testid="admin-users-mobile-cards">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-4 bg-white rounded border text-muted">
            No users match your criteria.
          </div>
        ) : (
          users.map((u) => {
            const isSelf = currentUser?.id === u.id;
            return (
              <div key={u.id} className="bg-white p-3 rounded shadow-sm border mb-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="h6 fw-bold mb-0">
                      {u.fullName || u.name}
                      {isSelf && (
                        <span className="badge bg-pale-green text-primary-green border border-success ms-2 small">
                          (You)
                        </span>
                      )}
                    </h5>
                    <div className="text-muted small font-monospace">{u.email}</div>
                  </div>
                  <div>{getRoleBadge(u.role)}</div>
                </div>

                <div className="d-flex justify-content-between align-items-center small text-muted border-top pt-2 mt-2">
                  <div>
                    Status:{' '}
                    {u.isActive ? (
                      <span className="badge bg-success-subtle text-success">Active</span>
                    ) : (
                      <span className="badge bg-danger-subtle text-danger">Inactive</span>
                    )}
                  </div>
                  <div>
                    {u.mustChangePassword ? (
                      <span className="badge bg-warning-subtle text-dark">Must Change Pwd</span>
                    ) : (
                      <span>Pwd Active</span>
                    )}
                  </div>
                </div>

                <div className="d-flex gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm flex-fill"
                    onClick={() => openEditModal(u)}
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-warning btn-sm flex-fill"
                    onClick={() => openResetModal(u)}
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Create User */}
      {showCreateModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-pale-green border-bottom">
                <h5 className="modal-title fw-bold text-primary-green">Create User Account</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                  disabled={isSubmittingCreate}
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleCreateSubmit}>
                <div className="modal-body">
                  {createError && <div className="alert alert-danger py-2 small">{createError}</div>}

                  <div className="mb-3">
                    <label htmlFor="create-fullname-input" className="form-label small fw-semibold">
                      Full Name *
                    </label>
                    <input
                      id="create-fullname-input"
                      type="text"
                      className="form-control form-control-sm"
                      value={createFullName}
                      onChange={(e) => setCreateFullName(e.target.value)}
                      placeholder="e.g. Suda Administrator"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="create-email-input" className="form-label small fw-semibold">
                      Email Address *
                    </label>
                    <input
                      id="create-email-input"
                      type="email"
                      className="form-control form-control-sm"
                      value={createEmail}
                      onChange={(e) => setCreateEmail(e.target.value)}
                      placeholder="e.g. user@toktickit.com"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="create-role-select" className="form-label small fw-semibold">
                      Role *
                    </label>
                    <select
                      id="create-role-select"
                      className="form-select form-select-sm"
                      value={createRole}
                      onChange={(e) => setCreateRole(e.target.value as any)}
                    >
                      <option value="REQUESTER">Requester</option>
                      <option value="IT_STAFF">IT Staff</option>
                      <option value="ADMINISTRATOR">Administrator</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="create-password-input" className="form-label small fw-semibold">
                      Initial Temporary Password *
                    </label>
                    <input
                      id="create-password-input"
                      type="password"
                      className="form-control form-control-sm"
                      value={createPassword}
                      onChange={(e) => setCreatePassword(e.target.value)}
                      placeholder="Enter temporary password"
                      required
                    />
                    {/* Live Password Complexity Checklist */}
                    <div className="p-2 mt-2 bg-light rounded border small">
                      <div className="fw-semibold text-muted mb-1" style={{ fontSize: '11px' }}>
                        Password Requirements:
                      </div>
                      <div className={`d-flex align-items-center gap-1 ${createComplexity.hasLength ? 'text-success' : 'text-muted'}`}>
                        <span>{createComplexity.hasLength ? '✓' : '○'}</span> At least 8 characters
                      </div>
                      <div className={`d-flex align-items-center gap-1 ${createComplexity.hasUpper ? 'text-success' : 'text-muted'}`}>
                        <span>{createComplexity.hasUpper ? '✓' : '○'}</span> At least one uppercase letter (A-Z)
                      </div>
                      <div className={`d-flex align-items-center gap-1 ${createComplexity.hasLower ? 'text-success' : 'text-muted'}`}>
                        <span>{createComplexity.hasLower ? '✓' : '○'}</span> At least one lowercase letter (a-z)
                      </div>
                      <div className={`d-flex align-items-center gap-1 ${createComplexity.hasNumber ? 'text-success' : 'text-muted'}`}>
                        <span>{createComplexity.hasNumber ? '✓' : '○'}</span> At least one numeric digit (0-9)
                      </div>
                    </div>
                  </div>

                  <div className="form-check">
                    <input
                      id="create-active-checkbox"
                      type="checkbox"
                      className="form-check-input"
                      checked={createIsActive}
                      onChange={(e) => setCreateIsActive(e.target.checked)}
                    />
                    <label htmlFor="create-active-checkbox" className="form-check-label small">
                      Active Account
                    </label>
                  </div>
                </div>

                <div className="modal-footer border-top">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setShowCreateModal(false)}
                    disabled={isSubmittingCreate}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success btn-sm fw-semibold"
                    disabled={isSubmittingCreate || !isCreatePasswordValid || !createFullName.trim() || !createEmail.trim()}
                    data-testid="create-user-submit-button"
                  >
                    {isSubmittingCreate ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Edit User */}
      {editingUser && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-pale-green border-bottom">
                <h5 className="modal-title fw-bold text-primary-green">
                  Edit User: {editingUser.fullName || editingUser.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingUser(null)}
                  disabled={isSubmittingEdit}
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="modal-body">
                  {editError && <div className="alert alert-danger py-2 small">{editError}</div>}

                  <div className="mb-3">
                    <label htmlFor="edit-fullname-input" className="form-label small fw-semibold">
                      Full Name *
                    </label>
                    <input
                      id="edit-fullname-input"
                      type="text"
                      className="form-control form-control-sm"
                      value={editFullName}
                      onChange={(e) => setEditFullName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="edit-email-input" className="form-label small fw-semibold">
                      Email Address *
                    </label>
                    <input
                      id="edit-email-input"
                      type="email"
                      className="form-control form-control-sm"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      required
                    />
                  </div>

                  {/* Role Select with BR-18 & BR-19 safety guards */}
                  {(() => {
                    const isSelf = currentUser?.id === editingUser.id;
                    const isLastActiveAdmin = editingUser.role === 'ADMINISTRATOR' && editingUser.isActive && activeAdminCount <= 1;
                    const isRoleDisabled = isSelf || isLastActiveAdmin;

                    return (
                      <div className="mb-3">
                        <label htmlFor="edit-role-select" className="form-label small fw-semibold">
                          Role *
                        </label>
                        <select
                          id="edit-role-select"
                          className="form-select form-select-sm"
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value as any)}
                          disabled={isRoleDisabled}
                        >
                          <option value="REQUESTER">Requester</option>
                          <option value="IT_STAFF">IT Staff</option>
                          <option value="ADMINISTRATOR">Administrator</option>
                        </select>
                        {isSelf && (
                          <div className="text-danger small mt-1" style={{ fontSize: '11px' }}>
                            Role cannot be changed for your own account (BR-18)
                          </div>
                        )}
                        {!isSelf && isLastActiveAdmin && (
                          <div className="text-danger small mt-1" style={{ fontSize: '11px' }}>
                            Cannot demote the last active Administrator (BR-19)
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Active Checkbox with BR-18 & BR-19 safety guards */}
                  {(() => {
                    const isSelf = currentUser?.id === editingUser.id;
                    const isLastActiveAdmin = editingUser.role === 'ADMINISTRATOR' && editingUser.isActive && activeAdminCount <= 1;
                    const isActiveDisabled = isSelf || isLastActiveAdmin;

                    return (
                      <div className="mb-3">
                        <div className="form-check">
                          <input
                            id="edit-active-checkbox"
                            type="checkbox"
                            className="form-check-input"
                            checked={editIsActive}
                            onChange={(e) => setEditIsActive(e.target.checked)}
                            disabled={isActiveDisabled}
                          />
                          <label htmlFor="edit-active-checkbox" className="form-check-label small fw-semibold">
                            Active Account
                          </label>
                        </div>
                        {isSelf && (
                          <div className="text-danger small mt-1" style={{ fontSize: '11px' }}>
                            You cannot deactivate your own account (BR-18)
                          </div>
                        )}
                        {!isSelf && isLastActiveAdmin && (
                          <div className="text-danger small mt-1" style={{ fontSize: '11px' }}>
                            Cannot deactivate the last active Administrator (BR-19)
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                <div className="modal-footer border-top">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setEditingUser(null)}
                    disabled={isSubmittingEdit}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success btn-sm fw-semibold"
                    disabled={isSubmittingEdit || !editFullName.trim() || !editEmail.trim()}
                    data-testid="edit-user-save-button"
                  >
                    {isSubmittingEdit ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Reset Password */}
      {resettingUser && (
        <div className="modal show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-pale-green border-bottom">
                <h5 className="modal-title fw-bold text-primary-green">
                  Reset Password: {resettingUser.fullName || resettingUser.name}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setResettingUser(null)}
                  disabled={isSubmittingReset}
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleResetSubmit}>
                <div className="modal-body">
                  {resetError && <div className="alert alert-danger py-2 small">{resetError}</div>}

                  <p className="small text-muted mb-3">
                    Assign a new temporary password for <strong>{resettingUser.email}</strong>. The user will be required
                    to change their password upon their next login.
                  </p>

                  <div className="mb-3">
                    <label htmlFor="reset-password-input" className="form-label small fw-semibold">
                      New Temporary Password *
                    </label>
                    <input
                      id="reset-password-input"
                      type="password"
                      className="form-control form-control-sm"
                      value={resetPasswordInput}
                      onChange={(e) => setResetPasswordInput(e.target.value)}
                      placeholder="Enter new temporary password"
                      required
                    />

                    {/* Live Password Complexity Checklist */}
                    <div className="p-2 mt-2 bg-light rounded border small">
                      <div className="fw-semibold text-muted mb-1" style={{ fontSize: '11px' }}>
                        Password Requirements:
                      </div>
                      <div className={`d-flex align-items-center gap-1 ${resetComplexity.hasLength ? 'text-success' : 'text-muted'}`}>
                        <span>{resetComplexity.hasLength ? '✓' : '○'}</span> At least 8 characters
                      </div>
                      <div className={`d-flex align-items-center gap-1 ${resetComplexity.hasUpper ? 'text-success' : 'text-muted'}`}>
                        <span>{resetComplexity.hasUpper ? '✓' : '○'}</span> At least one uppercase letter (A-Z)
                      </div>
                      <div className={`d-flex align-items-center gap-1 ${resetComplexity.hasLower ? 'text-success' : 'text-muted'}`}>
                        <span>{resetComplexity.hasLower ? '✓' : '○'}</span> At least one lowercase letter (a-z)
                      </div>
                      <div className={`d-flex align-items-center gap-1 ${resetComplexity.hasNumber ? 'text-success' : 'text-muted'}`}>
                        <span>{resetComplexity.hasNumber ? '✓' : '○'}</span> At least one numeric digit (0-9)
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer border-top">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => setResettingUser(null)}
                    disabled={isSubmittingReset}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning btn-sm fw-semibold"
                    disabled={isSubmittingReset || !isResetPasswordValid}
                    data-testid="reset-user-submit-button"
                  >
                    {isSubmittingReset ? 'Resetting...' : 'Confirm & Reset Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
