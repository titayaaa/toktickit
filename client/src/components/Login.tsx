import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const { login, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email.trim() || !password) {
      setLocalError('Email address and password are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (err: any) {
      setLocalError(err.message || 'Invalid email or password');
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
          maxWidth: '420px',
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 107, 60, 0.08)',
          border: '1px solid #DCE3DE',
          padding: '36px 32px',
        }}
      >
        {/* Branding Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              backgroundColor: '#006B3C',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#006B3C', margin: '0 0 6px 0' }}>
            TokTickIT
          </h1>
          <p style={{ fontSize: '14px', color: '#5A6E63', margin: 0 }}>
            Sign in to your account
          </p>
        </div>

        {/* Error Alert Box */}
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
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B71C1C" strokeWidth="2" style={{ marginRight: '10px', flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{displayError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label
              htmlFor="email"
              style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1A2E23', marginBottom: '6px' }}
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. jennifer.anderson@example.com"
              required
              autoFocus
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '14px',
                borderRadius: '8px',
                border: '1px solid #DCE3DE',
                outline: 'none',
                color: '#1A2E23',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#1A2E23', marginBottom: '6px' }}
            >
              Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '10px 60px 10px 14px',
                  fontSize: '14px',
                  borderRadius: '8px',
                  border: '1px solid #DCE3DE',
                  outline: 'none',
                  color: '#1A2E23',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#006B3C',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: '8px',
              padding: '12px',
              fontSize: '15px',
              fontWeight: '600',
              color: '#FFFFFF',
              backgroundColor: isSubmitting ? '#5A6E63' : '#006B3C',
              border: 'none',
              borderRadius: '8px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: '#5A6E63' }}>
          TokTickIT Service Desk • Zen Green Edition
        </div>
      </div>
    </div>
  );
};

export default Login;
