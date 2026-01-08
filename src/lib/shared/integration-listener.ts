/**
 * Integration Listener Module
 * Example module that demonstrates subscribing to token and login events
 * Other repos (banksy, v, infinity-brain-search) can use this pattern
 */

import { tokenService, Token } from './token-service';
import { authService, User } from './auth-service';

export interface IntegrationListener {
  onTokenCreated?: (token: Token) => void;
  onTokensCleared?: () => void;
  onLoginChanged?: (user: User | null) => void;
}

export class IntegrationService {
  private listeners: IntegrationListener[] = [];
  private unsubscribers: (() => void)[] = [];

  /**
   * Register an integration listener
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

    if (listener.onTokensCleared) {
      const unsub2 = tokenService.on('pewpi.tokens.cleared', () => {
        listener.onTokensCleared?.();
      });
      this.unsubscribers.push(unsub2);
    }

    // Subscribe to login events
    if (listener.onLoginChanged) {
      const handleLoginChange = (event: CustomEvent) => {
        listener.onLoginChanged?.(event.detail?.user || null);
      };
      window.addEventListener('pewpi.login.changed', handleLoginChange as EventListener);
      
      this.unsubscribers.push(() => {
        window.removeEventListener('pewpi.login.changed', handleLoginChange as EventListener);
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
}

/**
 * Example integration for repo-dashboard-hub
 */
export function createDashboardIntegration() {
  const integration = new IntegrationService();

  integration.register({
    onTokenCreated: (token) => {
      console.log('[Dashboard Integration] Token created:', token);
      // Update dashboard UI, show notification, etc.
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
 * Example integration for banksy repo
 */
export function createBanksyIntegration() {
  const integration = new IntegrationService();

  integration.register({
    onTokenCreated: (token) => {
      console.log('[Banksy Integration] Token created:', token);
      if (token.type === 'art_tokens') {
        // Award bonus art tokens for art-related activities
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
export function createSearchIntegration() {
  const integration = new IntegrationService();

  integration.register({
    onTokenCreated: (token) => {
      console.log('[Search Integration] Token created:', token);
      if (token.type === 'research_tokens') {
        // Update search analytics, award bonus for searches
      }
    },
    onLoginChanged: (user) => {
      console.log('[Search Integration] Login changed:', user);
      // Load user search history
    }
  });

  return integration;
}

// Export singleton instance
export const integrationService = new IntegrationService();
export default integrationService;
