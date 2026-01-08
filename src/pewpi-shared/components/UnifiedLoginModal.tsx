/**
 * Unified Login Modal Component
 * Part of pewpi-shared system - lightweight, opt-in UI
 * 
 * Features:
 * - Magic-link (passwordless) as default
 * - Optional GitHub OAuth tab
 * - Username/password fallback
 * - Dev-mode auto-fill for testing
 */

import { useState } from 'react';
import { authService } from '../auth-service';

interface UnifiedLoginModalProps {
  onSuccess?: () => void;
  onClose?: () => void;
  showGitHubOption?: boolean;
  showPasswordOption?: boolean;
}

export function UnifiedLoginModal({ 
  onSuccess, 
  onClose,
  showGitHubOption = false,
  showPasswordOption = true 
}: UnifiedLoginModalProps) {
  const [activeTab, setActiveTab] = useState<'magic' | 'password' | 'github'>('magic');
  const [email, setEmail] = useState('');
  const [magicLinkToken, setMagicLinkToken] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [githubToken, setGithubToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleRequestMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.requestMagicLink(email);
      
      if (result.success && result.token) {
        setMagicLinkSent(true);
        // In dev mode, auto-fill the token for convenience
        setMagicLinkToken(result.token);
      } else {
        setError(result.error || 'Failed to send magic link');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.verifyMagicLink(email, magicLinkToken);
      
      if (result.success) {
        onSuccess?.();
        onClose?.();
      } else {
        setError(result.error || 'Failed to verify magic link');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = isRegister
        ? await authService.register(username, email, password)
        : await authService.login(username, password);
      
      if (result.success) {
        onSuccess?.();
        onClose?.();
      } else {
        setError(result.error || 'Authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.authenticateWithGitHub(githubToken);
      
      if (result.success) {
        onSuccess?.();
        onClose?.();
      } else {
        setError(result.error || 'GitHub authentication failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pewpi-login-modal-overlay" onClick={onClose}>
      <div className="pewpi-login-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pewpi-login-modal-header">
          <h2>Login to Pewpi Infinity</h2>
          {onClose && (
            <button className="pewpi-login-modal-close" onClick={onClose}>
              ×
            </button>
          )}
        </div>

        <div className="pewpi-login-tabs">
          <button
            className={`pewpi-login-tab ${activeTab === 'magic' ? 'active' : ''}`}
            onClick={() => setActiveTab('magic')}
          >
            Magic Link
          </button>
          {showPasswordOption && (
            <button
              className={`pewpi-login-tab ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              Password
            </button>
          )}
          {showGitHubOption && (
            <button
              className={`pewpi-login-tab ${activeTab === 'github' ? 'active' : ''}`}
              onClick={() => setActiveTab('github')}
            >
              GitHub
            </button>
          )}
        </div>

        <div className="pewpi-login-content">
          {error && (
            <div className="pewpi-login-error">
              {error}
            </div>
          )}

          {activeTab === 'magic' && (
            <div className="pewpi-login-panel">
              {!magicLinkSent ? (
                <form onSubmit={handleRequestMagicLink}>
                  <div className="pewpi-login-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      disabled={loading}
                    />
                  </div>
                  <button type="submit" disabled={loading} className="pewpi-login-button">
                    {loading ? 'Sending...' : 'Send Magic Link'}
                  </button>
                  <p className="pewpi-login-help">
                    We'll send you a magic link to sign in without a password.
                  </p>
                </form>
              ) : (
                <form onSubmit={handleVerifyMagicLink}>
                  <div className="pewpi-login-field">
                    <label htmlFor="token">Magic Link Token</label>
                    <input
                      id="token"
                      type="text"
                      value={magicLinkToken}
                      onChange={(e) => setMagicLinkToken(e.target.value)}
                      placeholder="Enter token from email"
                      required
                      disabled={loading}
                    />
                  </div>
                  <button type="submit" disabled={loading} className="pewpi-login-button">
                    {loading ? 'Verifying...' : 'Verify & Login'}
                  </button>
                  <p className="pewpi-login-help">
                    Dev mode: Token auto-filled above. Check console for details.
                  </p>
                  <button
                    type="button"
                    onClick={() => setMagicLinkSent(false)}
                    className="pewpi-login-button-secondary"
                  >
                    Back
                  </button>
                </form>
              )}
            </div>
          )}

          {activeTab === 'password' && (
            <div className="pewpi-login-panel">
              <form onSubmit={handlePasswordAuth}>
                <div className="pewpi-login-field">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                    required
                    disabled={loading}
                  />
                </div>
                {isRegister && (
                  <div className="pewpi-login-field">
                    <label htmlFor="reg-email">Email</label>
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      disabled={loading}
                    />
                  </div>
                )}
                <div className="pewpi-login-field">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>
                <button type="submit" disabled={loading} className="pewpi-login-button">
                  {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="pewpi-login-button-secondary"
                >
                  {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="pewpi-login-panel">
              <form onSubmit={handleGitHubAuth}>
                <div className="pewpi-login-field">
                  <label htmlFor="github-token">GitHub Personal Access Token</label>
                  <input
                    id="github-token"
                    type="password"
                    value={githubToken}
                    onChange={(e) => setGithubToken(e.target.value)}
                    placeholder="ghp_..."
                    required
                    disabled={loading}
                  />
                </div>
                <button type="submit" disabled={loading} className="pewpi-login-button">
                  {loading ? 'Authenticating...' : 'Login with GitHub'}
                </button>
                <p className="pewpi-login-help">
                  Note: This is a client-side helper. Production apps should use server-side OAuth.
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UnifiedLoginModal;
