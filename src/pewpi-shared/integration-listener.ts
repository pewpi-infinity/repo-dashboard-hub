/**
 * Integration Listener
 * Part of pewpi-shared system - utility to subscribe to cross-repo events
 * 
 * Features:
 * - Subscribe to pewpi.token.created, pewpi.token.updated, pewpi.token.deleted events
 * - Subscribe to pewpi.login.changed events
 * - Forward events to registered listeners
 * - Cross-tab synchronization support
 */

import { tokenService, Token } from './token-service';
import { authService, User } from './auth-service';

export interface IntegrationListener {
  onTokenCreated?: (token: Token) => void;
  onTokenUpdated?: (token: Token) => void;
  onTokenDeleted?: (data: { id: number; token: Token }) => void;
  onTokensCleared?: () => void;
  onLoginChanged?: (user: User | null) => void;
}

export class IntegrationService {
  private listeners: IntegrationListener[] = [];
  private unsubscribers: (() => void)[] = [];

  /**
   * Register an integration listener
   * Returns an unregister function
   */
  register(listener: IntegrationListener): () => void {
    this.listeners.push(listener);

    // Subscribe to token events
    if (listener.onTokenCreated) {
      const unsub1 = tokenService.on('pewpi.token.created', (token: Token) => {
        listener.onTokenCreated?.(token);
      });
      this.unsubscribers.push(unsub1);
    }

    if (listener.onTokenUpdated) {
      const unsub2 = tokenService.on('pewpi.token.updated', (token: Token) => {
        listener.onTokenUpdated?.(token);
      });
      this.unsubscribers.push(unsub2);
    }

    if (listener.onTokenDeleted) {
      const unsub3 = tokenService.on('pewpi.token.deleted', (data: { id: number; token: Token }) => {
        listener.onTokenDeleted?.(data);
      });
      this.unsubscribers.push(unsub3);
    }

    if (listener.onTokensCleared) {
      const unsub4 = tokenService.on('pewpi.tokens.cleared', () => {
        listener.onTokensCleared?.();
      });
      this.unsubscribers.push(unsub4);
    }

    // Subscribe to login events
    if (listener.onLoginChanged) {
      const handleLoginChange = (event: Event) => {
        const customEvent = event as CustomEvent;
        listener.onLoginChanged?.(customEvent.detail?.user || null);
      };
      window.addEventListener('pewpi.login.changed', handleLoginChange);
      
      this.unsubscribers.push(() => {
        window.removeEventListener('pewpi.login.changed', handleLoginChange);
      });
    }

    // Return unregister function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Unregister all listeners
   */
  unregisterAll(): void {
    this.unsubscribers.forEach(unsub => unsub());
    this.unsubscribers = [];
    this.listeners = [];
  }

  /**
   * Manually trigger token sync from storage
   */
  async syncFromStorage(): Promise<void> {
    try {
      const balances = await tokenService.getAllBalances();
      console.log('Synced balances from storage:', balances);
      
      const user = await authService.getCurrentUser();
      console.log('Synced user from storage:', user);
    } catch (error) {
      console.error('Failed to sync from storage:', error);
    }
  }

  /**
   * Get listener count
   */
  getListenerCount(): number {
    return this.listeners.length;
  }
}

/**
 * Example integration for repo-dashboard-hub
 */
export function createDashboardIntegration(): IntegrationService {
  const integration = new IntegrationService();

  integration.register({
    onTokenCreated: (token) => {
      console.log('[Dashboard Integration] Token created:', token);
      // Update dashboard UI, show notification, etc.
    },
    onTokenUpdated: (token) => {
      console.log('[Dashboard Integration] Token updated:', token);
      // Update dashboard UI
    },
    onTokenDeleted: (data) => {
      console.log('[Dashboard Integration] Token deleted:', data);
      // Update dashboard UI
    },
    onTokensCleared: () => {
      console.log('[Dashboard Integration] Tokens cleared');
      // Reset dashboard state
    },
    onLoginChanged: (user) => {
      console.log('[Dashboard Integration] Login changed:', user);
      // Update auth UI, redirect if needed
    }
  });

  return integration;
}

/**
 * Example integration for banksy repo (art-focused)
 */
export function createBanksyIntegration(): IntegrationService {
  const integration = new IntegrationService();

  integration.register({
    onTokenCreated: (token) => {
      console.log('[Banksy Integration] Token created:', token);
      if (token.type === 'art_tokens') {
        // Award bonus art tokens for art-related activities
        console.log('Art token earned!');
      }
    },
    onLoginChanged: (user) => {
      console.log('[Banksy Integration] Login changed:', user);
      // Sync art gallery state
    }
  });

  return integration;
}

/**
 * Example integration for infinity-brain-search repo
 */
export function createSearchIntegration(): IntegrationService {
  const integration = new IntegrationService();

  integration.register({
    onTokenCreated: (token) => {
      console.log('[Search Integration] Token created:', token);
      if (token.type === 'research_tokens') {
        // Update search analytics, award bonus for searches
        console.log('Research token earned!');
      }
    },
    onLoginChanged: (user) => {
      console.log('[Search Integration] Login changed:', user);
      // Load user search history
    }
  });

  return integration;
}

/**
 * Example integration for v repo (music-focused)
 */
export function createMusicIntegration(): IntegrationService {
  const integration = new IntegrationService();

  integration.register({
    onTokenCreated: (token) => {
      console.log('[Music Integration] Token created:', token);
      if (token.type === 'music_tokens') {
        // Award bonus music tokens for listening
        console.log('Music token earned!');
      }
    },
    onLoginChanged: (user) => {
      console.log('[Music Integration] Login changed:', user);
      // Sync music preferences
    }
  });

  return integration;
}

// Export singleton instance
export const integrationService = new IntegrationService();
export default integrationService;
