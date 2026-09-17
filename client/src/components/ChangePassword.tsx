import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const ChangePassword: React.FC = () => {
  const { user, changePassword, error, clearError } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Complexity rules check
  const hasMinLength = newPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(newPassword);
  const hasLowercase = /[a-z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const isComplexityValid = hasMinLength && hasUppercase && hasLowercase && hasNumber;
  const passwordsMatch = newPassword === confirmPassword && confirmPassword.length > 0;
  const canSubmit = isComplexityValid && passwordsMatch && currentPassword.length > 0 && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!currentPassword) {
      setLocalError('Please enter your current temporary password');
      return;
    }

    if (!isComplexityValid) {
      setLocalError('New password does not satisfy all complexity requirements');
      return;
    }

    if (newPassword !== confirmPassword) {
      setLocalError('New password and confirmation password do not match');
      return;
    }

    if (currentPassword === newPassword) {
      setLocalError('New password must be different from current password');
      return;
    }

    setIsSubmitting(true);
    try {
      await changePassword(currentPassword, newPassword);
    } catch (err: any) {
      setLocalError(err.message || 'Failed to update password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = localError || error;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F7F6',
        padding: '20px',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #DCE3DE',
          padding: '36px 32px',
        }}
      >
        {/* Header with Security Lock */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#FFF8E1',
              border: '1px solid #FFA000',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              color: '#B45309',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFA000" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1A2E23', margin: '0 0 6px 0' }}>
            Password Change Required
          </h1>
          <p style={{ fontSize: '13px', color: '#5A6E63', margin: 0 }}>
            Welcome, <strong>{user?.fullName || user?.name || 'User'}</strong>. You must rotate your initial password before accessing TokTickIT.
          </p>
        </div>

        {/* Amber Callout Box */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            backgroundColor: '#FFF8E1',
            border: '1px solid #FFE082',
            borderRadius: '8px',
            padding: '12px 14px',
            marginBottom: '20px',
            color: '#78350F',
            fontSize: '13px',
            lineHeight: '1.4',
          }}
        >
          <span style={{ marginRight: '8px', fontSize: '16px' }}>🔒</span>
          <span>Access to tickets and operational screens is locked until your new password is saved.</span>
        </div>

        {/* Error Alert */}
        {displayError && (
          <div
            role="alert"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFEBEE',
              border: '1px solid #FFCDD2',
              borderRadius: '8px',
              padding: '12px 14px',
              marginBottom: '20px',
              color: '#B71C1C',
              fontSize: '13px',
              lineHeight: '1.4',
            }}
          >
            <span style={{ marginRight: '8px', fontWeight: 'bold' }}>✕</span>
            <span>{displayError}</span>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              htmlFor="current-password"
              style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1A2E23', marginBottom: '6px' }}
            >
              Current (Temporary) Password
            </label>
            <input
              id="current-password"
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
              required
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                borderRadius: '8px',
                border: '1px solid #DCE3DE',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="new-password"
              style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1A2E23', marginBottom: '6px' }}
            >
              New Password
            </label>
            <input
              id="new-password"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new secure password"
              required
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                borderRadius: '8px',
                border: '1px solid #DCE3DE',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* Interactive Real-time Checklist */}
          <div
            style={{
              backgroundColor: '#F5F7F6',
              border: '1px solid #DCE3DE',
              borderRadius: '8px',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#1A2E23', marginBottom: '2px' }}>
              Password Requirements:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: hasMinLength ? '#006B3C' : '#5A6E63' }}>
              <span style={{ marginRight: '8px', fontWeight: 'bold' }}>{hasMinLength ? '✓' : '○'}</span>
              <span>At least 8 characters long</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: hasUppercase ? '#006B3C' : '#5A6E63' }}>
              <span style={{ marginRight: '8px', fontWeight: 'bold' }}>{hasUppercase ? '✓' : '○'}</span>
              <span>At least one uppercase letter (A-Z)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: hasLowercase ? '#006B3C' : '#5A6E63' }}>
              <span style={{ marginRight: '8px', fontWeight: 'bold' }}>{hasLowercase ? '✓' : '○'}</span>
              <span>At least one lowercase letter (a-z)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: '12px', color: hasNumber ? '#006B3C' : '#5A6E63' }}>
              <span style={{ marginRight: '8px', fontWeight: 'bold' }}>{hasNumber ? '✓' : '○'}</span>
              <span>At least one numeric digit (0-9)</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1A2E23', marginBottom: '6px' }}
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                borderRadius: '8px',
                border: '1px solid #DCE3DE',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            {confirmPassword && !passwordsMatch && (
              <span style={{ display: 'block', fontSize: '12px', color: '#B71C1C', marginTop: '4px' }}>
                Passwords do not match
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              id="toggle-password"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
            />
            <label htmlFor="toggle-password" style={{ fontSize: '12px', color: '#5A6E63', cursor: 'pointer' }}>
              Show passwords
            </label>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            style={{
              marginTop: '8px',
              padding: '12px',
              fontSize: '15px',
              fontWeight: '600',
              color: '#FFFFFF',
              backgroundColor: canSubmit ? '#006B3C' : '#A0AEC0',
              border: 'none',
              borderRadius: '8px',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s',
            }}
          >
            {isSubmitting ? 'Updating Password...' : 'Update Password & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
