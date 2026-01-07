/**
 * Production Authentication Service
 * Supports magic-link (passwordless) and optional GitHub OAuth
 * No GitHub API key required for default experience
 */

import { generateRandomString, hash } from './crypto-helpers';
import { ClientModel, createModel } from './client-model';

export interface User {
  id?: number;
  email: string;
  username?: string;
  authMethod: 'magic-link' | 'github';
  githubId?: string;
  avatar?: string;
  createdAt?: number;
  lastLogin?: number;
}

export interface MagicLink {
  id?: number;
  email: string;
  token: string;
  tokenHash: string;
  expiresAt: number;
  used: boolean;
  createdAt?: number;
}

export interface AuthSession {
  id?: number;
  userId: number;
  token: string;
  expiresAt: number;
  createdAt?: number;
}

// Create models
const UserModel = createModel<User>('users', {
  email: { type: String, unique: true, index: true },
  username: { type: String },
  authMethod: { type: String },
  githubId: { type: String },
  avatar: { type: String },
  createdAt: { type: Number },
  lastLogin: { type: Number }
});

const MagicLinkModel = createModel<MagicLink>('magic_links', {
  email: { type: String, index: true },
  token: { type: String },
  tokenHash: { type: String, index: true },
  expiresAt: { type: Number },
  used: { type: Boolean },
  createdAt: { type: Number }
});

const SessionModel = createModel<AuthSession>('auth_sessions', {
  userId: { type: Number, index: true },
  token: { type: String, index: true },
  expiresAt: { type: Number },
  createdAt: { type: Number }
});

const AUTH_STORAGE_KEY = 'pewpi_auth_session';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
const MAGIC_LINK_TIMEOUT = 15 * 60 * 1000; // 15 minutes

export class AuthService {
  private currentSession: AuthSession | null = null;
  private currentUser: User | null = null;

  /**
   * Request magic link (dev mode - no SMTP)
   */
  async requestMagicLink(email: string): Promise<{ success: boolean; token?: string; error?: string }> {
    if (!this.isValidEmail(email)) {
      return { success: false, error: 'Invalid email address' };
    }

    try {
      // Generate magic link token
      const token = generateRandomString(32);
      const tokenHash = await hash(token);

      // Create magic link entry
      await MagicLinkModel.create({
        email,
        token,
        tokenHash,
        expiresAt: Date.now() + MAGIC_LINK_TIMEOUT,
        used: false
      });

      // In dev mode, return the token directly
      // In production, this would send an email
      console.log(`Magic link for ${email}: ${token}`);
      
      return { success: true, token };
    } catch (error) {
      console.error('Failed to create magic link:', error);
      return { success: false, error: 'Failed to create magic link' };
    }
  }

  /**
   * Verify magic link and create session
   */
  async verifyMagicLink(email: string, token: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const tokenHash = await hash(token);

      // Find valid magic link
      const links = await MagicLinkModel.find({ email, tokenHash, used: false });
      const magicLink = links.find(link => link.expiresAt > Date.now());

      if (!magicLink) {
        return { success: false, error: 'Invalid or expired magic link' };
      }

      // Mark link as used
      await MagicLinkModel.updateOne({ id: magicLink.id }, { used: true });

      // Find or create user
      let user = await UserModel.findOne({ email });
      if (!user) {
        user = await UserModel.create({
          email,
          authMethod: 'magic-link',
          avatar: this.generateAvatar(email),
          lastLogin: Date.now()
        });
      } else {
        await UserModel.updateOne({ id: user.id }, { lastLogin: Date.now() });
      }

      // Create session
      await this.createSession(user.id!);

      // Emit login event
      this.emitLoginEvent(user);

      return { success: true, user };
    } catch (error) {
      console.error('Failed to verify magic link:', error);
      return { success: false, error: 'Failed to verify magic link' };
    }
  }

  /**
   * GitHub OAuth authentication (optional)
   */
  async authenticateWithGitHub(githubToken: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Fetch GitHub user info
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${githubToken}`
        }
      });

      if (!response.ok) {
        return { success: false, error: 'Failed to authenticate with GitHub' };
      }

      const githubUser = await response.json();

      // Find or create user
      let user = await UserModel.findOne({ githubId: githubUser.id.toString() });
      if (!user) {
        user = await UserModel.create({
          email: githubUser.email || `${githubUser.login}@github.local`,
          username: githubUser.login,
          authMethod: 'github',
          githubId: githubUser.id.toString(),
          avatar: githubUser.avatar_url,
          lastLogin: Date.now()
        });
      } else {
        await UserModel.updateOne({ id: user.id }, { lastLogin: Date.now() });
      }

      // Create session
      await this.createSession(user.id!);

      // Emit login event
      this.emitLoginEvent(user);

      return { success: true, user };
    } catch (error) {
      console.error('Failed to authenticate with GitHub:', error);
      return { success: false, error: 'Failed to authenticate with GitHub' };
    }
  }

  /**
   * Create session
   */
  private async createSession(userId: number): Promise<AuthSession> {
    const sessionToken = generateRandomString(48);
    
    const session = await SessionModel.create({
      userId,
      token: sessionToken,
      expiresAt: Date.now() + SESSION_TIMEOUT
    });

    this.currentSession = session;
    
    // Save to localStorage
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

    return session;
  }

  /**
   * Restore session from storage
   */
  async restoreSession(): Promise<boolean> {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!stored) return false;

      const session: AuthSession = JSON.parse(stored);

      // Check if session is expired
      if (session.expiresAt < Date.now()) {
        await this.logout();
        return false;
      }

      // Validate session in database
      const dbSession = await SessionModel.findOne({ token: session.token });
      if (!dbSession || dbSession.expiresAt < Date.now()) {
        await this.logout();
        return false;
      }

      // Load user
      const user = await UserModel.findById(session.userId);
      if (!user) {
        await this.logout();
        return false;
      }

      this.currentSession = session;
      this.currentUser = user;

      return true;
    } catch (error) {
      console.error('Failed to restore session:', error);
      return false;
    }
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    if (this.currentSession) {
      await SessionModel.deleteOne({ token: this.currentSession.token });
    }

    this.currentSession = null;
    this.currentUser = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);

    // Emit logout event
    this.emitLoginEvent(null);
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<User | null> {
    if (this.currentUser) return this.currentUser;

    if (await this.restoreSession()) {
      return this.currentUser;
    }

    return null;
  }

  /**
   * Check if authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    return await this.getCurrentUser() !== null;
  }

  /**
   * Emit login state change event
   */
  private emitLoginEvent(user: User | null): void {
    const event = new CustomEvent('pewpi.login.changed', {
      detail: { user, timestamp: Date.now() }
    });
    window.dispatchEvent(event);

    // Broadcast to other tabs
    try {
      const broadcastKey = `pewpi_event_login_changed_${Date.now()}`;
      localStorage.setItem(broadcastKey, JSON.stringify({ user }));
      setTimeout(() => localStorage.removeItem(broadcastKey), 1000);
    } catch (error) {
      console.error('Failed to broadcast login event:', error);
    }
  }

  /**
   * Validate email format
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Generate avatar URL
   */
  private generateAvatar(email: string): string {
    const seed = email.toLowerCase().trim();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
