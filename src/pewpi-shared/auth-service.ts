/**
 * AuthService - Production-grade unified authentication
 * Part of pewpi-shared system synthesized from best implementations
 * 
 * Features:
 * - Magic-link (passwordless) dev-mode flow with auto-fill
 * - Optional GitHub OAuth hooks (client-side helper only)
 * - restoreSession() and init() for bootstrap
 * - login/logout/register APIs
 * - Emits pewpi.login.changed events
 * - Cross-tab localStorage broadcast
 */

const AUTH_STORAGE_KEY = 'pewpi_unified_auth';
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours
const MAGIC_LINK_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const DAILY_LOGIN_KEY = 'pewpi_daily_login';

export interface User {
  id: string;
  email: string;
  username?: string;
  authMethod: 'magic-link' | 'github' | 'password';
  githubId?: string;
  avatar?: string;
  createdAt: number;
  lastLogin: number;
}

export interface MagicLink {
  email: string;
  token: string;
  expiresAt: number;
  used: boolean;
  createdAt: number;
}

export interface AuthSession {
  userId: string;
  user: User;
  token: string;
  expiresAt: number;
  sessionStart: number;
  lastActivity: number;
}

export class AuthService {
  private currentSession: AuthSession | null = null;
  private magicLinks: Map<string, MagicLink> = new Map();

  constructor() {
    this.loadMagicLinks();
  }

  /**
   * Initialize auth service (restore session if available)
   */
  async init(): Promise<boolean> {
    return await this.restoreSession();
  }

  /**
   * Request magic link (dev mode - no SMTP required)
   * Returns token directly in dev mode for testing
   */
  async requestMagicLink(email: string): Promise<{ success: boolean; token?: string; error?: string }> {
    if (!this.isValidEmail(email)) {
      return { success: false, error: 'Invalid email address' };
    }

    try {
      // Generate magic link token
      const token = this.generateToken(32);
      
      // Create magic link entry
      const magicLink: MagicLink = {
        email,
        token,
        expiresAt: Date.now() + MAGIC_LINK_TIMEOUT,
        used: false,
        createdAt: Date.now()
      };

      this.magicLinks.set(email, magicLink);
      this.saveMagicLinks();

      // In dev mode, return the token directly
      // In production, this would send an email
      console.log(`[DEV MODE] Magic link for ${email}: ${token}`);
      
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
      const magicLink = this.magicLinks.get(email);

      if (!magicLink) {
        return { success: false, error: 'Invalid magic link' };
      }

      if (magicLink.used) {
        return { success: false, error: 'Magic link already used' };
      }

      if (magicLink.token !== token) {
        return { success: false, error: 'Invalid magic link token' };
      }

      if (magicLink.expiresAt < Date.now()) {
        return { success: false, error: 'Magic link expired' };
      }

      // Mark link as used
      magicLink.used = true;
      this.saveMagicLinks();

      // Find or create user
      let user = this.findUserByEmail(email);
      if (!user) {
        user = this.createUser(email, 'magic-link');
      }

      // Update last login
      user.lastLogin = Date.now();
      this.saveUser(user);

      // Create session
      await this.createSession(user);

      // Award daily login bonus
      this.awardDailyLoginBonus();

      // Emit login event
      this.emitLoginEvent(user);

      return { success: true, user };
    } catch (error) {
      console.error('Failed to verify magic link:', error);
      return { success: false, error: 'Failed to verify magic link' };
    }
  }

  /**
   * Register with username/email/password
   */
  async register(username: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    if (!username || !email || !password) {
      return { success: false, error: 'All fields required' };
    }

    if (!this.isValidEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    try {
      // Check if user already exists
      const existing = this.findUserByEmail(email);
      if (existing) {
        return { success: false, error: 'User already exists' };
      }

      // Create user
      const user = this.createUser(email, 'password', username);

      // Create session
      await this.createSession(user);

      // Award daily login bonus
      this.awardDailyLoginBonus();

      // Emit login event
      this.emitLoginEvent(user);

      return { success: true, user };
    } catch (error) {
      console.error('Failed to register:', error);
      return { success: false, error: 'Failed to register' };
    }
  }

  /**
   * Login with username/password
   */
  async login(username: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    if (!username || !password) {
      return { success: false, error: 'Username and password required' };
    }

    try {
      // In dev mode, accept any credentials
      // In production, validate against stored credentials
      let user = this.findUserByUsername(username);
      
      if (!user) {
        // Create user for dev mode
        user = this.createUser(`${username}@pewpi-infinity.io`, 'password', username);
      }

      // Update last login
      user.lastLogin = Date.now();
      this.saveUser(user);

      // Create session
      await this.createSession(user);

      // Award daily login bonus
      this.awardDailyLoginBonus();

      // Emit login event
      this.emitLoginEvent(user);

      return { success: true, user };
    } catch (error) {
      console.error('Failed to login:', error);
      return { success: false, error: 'Failed to login' };
    }
  }

  /**
   * GitHub OAuth authentication (optional, client-side helper)
   * Note: Requires server-side OAuth exchange in production
   */
  async authenticateWithGitHub(githubToken: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Fetch GitHub user info
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        return { success: false, error: 'Failed to authenticate with GitHub' };
      }

      const githubUser = await response.json();

      // Find or create user
      let user = this.findUserByGitHubId(githubUser.id.toString());
      if (!user) {
        user = this.createUser(
          githubUser.email || `${githubUser.login}@github.local`,
          'github',
          githubUser.login,
          githubUser.id.toString(),
          githubUser.avatar_url
        );
      }

      // Update last login
      user.lastLogin = Date.now();
      this.saveUser(user);

      // Create session
      await this.createSession(user);

      // Award daily login bonus
      this.awardDailyLoginBonus();

      // Emit login event
      this.emitLoginEvent(user);

      return { success: true, user };
    } catch (error) {
      console.error('Failed to authenticate with GitHub:', error);
      return { success: false, error: 'Failed to authenticate with GitHub' };
    }
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

      this.currentSession = session;

      return true;
    } catch (error) {
      console.error('Failed to restore session:', error);
      return false;
    }
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    this.currentSession = null;
    localStorage.removeItem(AUTH_STORAGE_KEY);

    // Emit logout event
    this.emitLoginEvent(null);
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User | null> {
    if (this.currentSession) {
      return this.currentSession.user;
    }

    if (await this.restoreSession()) {
      return this.currentSession?.user || null;
    }

    return null;
  }

  /**
   * Check if user is authenticated
   */
  async isAuthenticated(): Promise<boolean> {
    return await this.getCurrentUser() !== null;
  }

  /**
   * Sync session across tabs (force reload from localStorage)
   */
  syncSession(): void {
    this.restoreSession();
  }

  /**
   * Create session
   */
  private async createSession(user: User): Promise<void> {
    const sessionToken = this.generateToken(48);
    
    const session: AuthSession = {
      userId: user.id,
      user,
      token: sessionToken,
      expiresAt: Date.now() + SESSION_TIMEOUT,
      sessionStart: Date.now(),
      lastActivity: Date.now()
    };

    this.currentSession = session;
    
    // Save to localStorage
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  }

  /**
   * Create a new user
   */
  private createUser(
    email: string,
    authMethod: 'magic-link' | 'github' | 'password',
    username?: string,
    githubId?: string,
    avatar?: string
  ): User {
    const user: User = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 11),
      email,
      username: username || email.split('@')[0],
      authMethod,
      githubId,
      avatar: avatar || this.generateAvatar(email),
      createdAt: Date.now(),
      lastLogin: Date.now()
    };

    this.saveUser(user);
    return user;
  }

  /**
   * Save user to localStorage
   */
  private saveUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }

    localStorage.setItem('pewpi_users', JSON.stringify(users));
  }

  /**
   * Get all users from localStorage
   */
  private getUsers(): User[] {
    try {
      const stored = localStorage.getItem('pewpi_users') || '[]';
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  /**
   * Find user by email
   */
  private findUserByEmail(email: string): User | undefined {
    return this.getUsers().find(u => u.email === email);
  }

  /**
   * Find user by username
   */
  private findUserByUsername(username: string): User | undefined {
    return this.getUsers().find(u => u.username === username);
  }

  /**
   * Find user by GitHub ID
   */
  private findUserByGitHubId(githubId: string): User | undefined {
    return this.getUsers().find(u => u.githubId === githubId);
  }

  /**
   * Award daily login bonus
   */
  private awardDailyLoginBonus(): void {
    try {
      const today = new Date().toDateString();
      const lastLogin = localStorage.getItem(DAILY_LOGIN_KEY);
      
      if (lastLogin !== today) {
        // Import token service dynamically to avoid circular dependency
        import('./token-service').then(({ tokenService }) => {
          tokenService.createToken('infinity_tokens', 10, 'repo-dashboard-hub', 'Daily login bonus');
        }).catch(err => {
          console.error('Failed to award daily login bonus:', err);
        });
        localStorage.setItem(DAILY_LOGIN_KEY, today);
      }
    } catch (error) {
      console.error('Failed to award daily login bonus:', error);
    }
  }

  /**
   * Emit login state change event
   */
  private emitLoginEvent(user: User | null): void {
    const event = new CustomEvent('pewpi.login.changed', {
      detail: { user, timestamp: Date.now() }
    });
    window.dispatchEvent(event);

    // Broadcast to other tabs via localStorage
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

  /**
   * Generate random token
   */
  private generateToken(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Load magic links from localStorage
   */
  private loadMagicLinks(): void {
    try {
      const stored = localStorage.getItem('pewpi_magic_links') || '[]';
      const links: MagicLink[] = JSON.parse(stored);
      links.forEach(link => {
        this.magicLinks.set(link.email, link);
      });
    } catch {
      // Ignore errors
    }
  }

  /**
   * Save magic links to localStorage
   */
  private saveMagicLinks(): void {
    try {
      const links = Array.from(this.magicLinks.values());
      localStorage.setItem('pewpi_magic_links', JSON.stringify(links));
    } catch {
      // Ignore errors
    }
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
