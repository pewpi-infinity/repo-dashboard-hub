/**
 * TokenService - Production-grade token management with IndexedDB (Dexie)
 * Part of pewpi-shared-token system
 * Provides localStorage fallback for compatibility
 */

import Dexie, { Table } from 'dexie';

export interface Token {
  id?: number;
  type: string;
  amount: number;
  source: string;
  description: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface TokenBalance {
  type: string;
  balance: number;
  lastUpdated: number;
}

class TokenDatabase extends Dexie {
  tokens!: Table<Token, number>;
  balances!: Table<TokenBalance, string>;

  constructor() {
    super('PewpiTokenDatabase');
    
    this.version(1).stores({
      tokens: '++id, type, source, timestamp',
      balances: 'type, lastUpdated'
    });
  }
}

export class TokenService {
  private db: TokenDatabase;
  private useLocalStorageFallback: boolean = false;
  private autoTrackingEnabled: boolean = false;
  private listeners: Map<string, Set<Function>> = new Map();

  constructor() {
    this.db = new TokenDatabase();
    this.checkIndexedDBSupport();
  }

  /**
   * Check if IndexedDB is supported, fallback to localStorage if not
   */
  private async checkIndexedDBSupport(): Promise<void> {
    try {
      await this.db.open();
    } catch (error) {
      console.warn('IndexedDB not available, falling back to localStorage', error);
      this.useLocalStorageFallback = true;
    }
  }

  /**
   * Create a new token entry
   */
  async createToken(
    type: string,
    amount: number,
    source: string,
    description: string,
    metadata?: Record<string, any>
  ): Promise<Token> {
    const token: Token = {
      type,
      amount,
      source,
      description,
      timestamp: Date.now(),
      metadata
    };

    try {
      if (this.useLocalStorageFallback) {
        return this.createTokenLocalStorage(token);
      }

      const id = await this.db.tokens.add(token);
      token.id = id;

      // Update balance
      await this.updateBalance(type, amount);

      // Emit event
      this.emitEvent('pewpi.token.created', token);
      
      return token;
    } catch (error) {
      console.error('Failed to create token:', error);
      throw error;
    }
  }

  /**
   * Get all tokens
   */
  async getAll(type?: string): Promise<Token[]> {
    try {
      if (this.useLocalStorageFallback) {
        return this.getAllLocalStorage(type);
      }

      if (type) {
        return await this.db.tokens.where('type').equals(type).toArray();
      }
      return await this.db.tokens.toArray();
    } catch (error) {
      console.error('Failed to get tokens:', error);
      return [];
    }
  }

  /**
   * Get token balance by type
   */
  async getBalance(type: string): Promise<number> {
    try {
      if (this.useLocalStorageFallback) {
        return this.getBalanceLocalStorage(type);
      }

      const balance = await this.db.balances.get(type);
      return balance?.balance || 0;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return 0;
    }
  }

  /**
   * Get all balances
   */
  async getAllBalances(): Promise<Record<string, number>> {
    try {
      if (this.useLocalStorageFallback) {
        return this.getAllBalancesLocalStorage();
      }

      const balances = await this.db.balances.toArray();
      const result: Record<string, number> = {};
      balances.forEach(b => {
        result[b.type] = b.balance;
      });
      return result;
    } catch (error) {
      console.error('Failed to get all balances:', error);
      return {};
    }
  }

  /**
   * Clear all tokens
   */
  async clearAll(): Promise<void> {
    try {
      if (this.useLocalStorageFallback) {
        return this.clearAllLocalStorage();
      }

      await this.db.tokens.clear();
      await this.db.balances.clear();
      
      this.emitEvent('pewpi.tokens.cleared', {});
    } catch (error) {
      console.error('Failed to clear tokens:', error);
    }
  }

  /**
   * Initialize auto-tracking of token events
   */
  initAutoTracking(): void {
    if (this.autoTrackingEnabled) return;
    
    this.autoTrackingEnabled = true;
    
    // Listen for cross-tab/cross-repo token events
    window.addEventListener('storage', this.handleStorageChange.bind(this));
    window.addEventListener('pewpi.token.created' as any, this.handleTokenEvent.bind(this));
    
    console.log('TokenService: Auto-tracking initialized');
  }

  /**
   * Subscribe to token events
   */
  on(event: string, callback: Function): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  /**
   * Emit custom event
   */
  private emitEvent(eventName: string, detail: any): void {
    // Emit CustomEvent for same-window listeners
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);

    // Call registered listeners
    this.listeners.get(eventName)?.forEach(callback => {
      try {
        callback(detail);
      } catch (error) {
        console.error('Error in event listener:', error);
      }
    });

    // Broadcast to other tabs via localStorage
    try {
      const broadcastKey = `pewpi_event_${eventName}_${Date.now()}`;
      localStorage.setItem(broadcastKey, JSON.stringify(detail));
      // Clean up after a short delay
      setTimeout(() => localStorage.removeItem(broadcastKey), 1000);
    } catch (error) {
      console.error('Failed to broadcast event:', error);
    }
  }

  /**
   * Handle storage change events (cross-tab sync)
   */
  private handleStorageChange(event: StorageEvent): void {
    if (event.key?.startsWith('pewpi_event_')) {
      try {
        const eventName = event.key.split('_')[2];
        const detail = JSON.parse(event.newValue || '{}');
        this.listeners.get(`pewpi.${eventName}`)?.forEach(callback => {
          callback(detail);
        });
      } catch (error) {
        console.error('Failed to handle storage change:', error);
      }
    }
  }

  /**
   * Handle token events
   */
  private handleTokenEvent(event: CustomEvent): void {
    console.log('Token event received:', event.detail);
  }

  /**
   * Update balance for a token type
   */
  private async updateBalance(type: string, amount: number): Promise<void> {
    try {
      const current = await this.db.balances.get(type);
      const newBalance = (current?.balance || 0) + amount;

      await this.db.balances.put({
        type,
        balance: newBalance,
        lastUpdated: Date.now()
      });
    } catch (error) {
      console.error('Failed to update balance:', error);
    }
  }

  // ============= LocalStorage Fallback Methods =============

  private createTokenLocalStorage(token: Token): Token {
    const stored = localStorage.getItem('pewpi_tokens') || '[]';
    const tokens: Token[] = JSON.parse(stored);
    token.id = Date.now();
    tokens.push(token);
    localStorage.setItem('pewpi_tokens', JSON.stringify(tokens));

    // Update balance
    this.updateBalanceLocalStorage(token.type, token.amount);

    // Emit event
    this.emitEvent('pewpi.token.created', token);

    return token;
  }

  private getAllLocalStorage(type?: string): Token[] {
    const stored = localStorage.getItem('pewpi_tokens') || '[]';
    const tokens: Token[] = JSON.parse(stored);
    
    if (type) {
      return tokens.filter(t => t.type === type);
    }
    return tokens;
  }

  private getBalanceLocalStorage(type: string): number {
    const stored = localStorage.getItem('pewpi_balances') || '{}';
    const balances: Record<string, number> = JSON.parse(stored);
    return balances[type] || 0;
  }

  private getAllBalancesLocalStorage(): Record<string, number> {
    const stored = localStorage.getItem('pewpi_balances') || '{}';
    return JSON.parse(stored);
  }

  private updateBalanceLocalStorage(type: string, amount: number): void {
    const stored = localStorage.getItem('pewpi_balances') || '{}';
    const balances: Record<string, number> = JSON.parse(stored);
    balances[type] = (balances[type] || 0) + amount;
    localStorage.setItem('pewpi_balances', JSON.stringify(balances));
  }

  private clearAllLocalStorage(): void {
    localStorage.removeItem('pewpi_tokens');
    localStorage.removeItem('pewpi_balances');
    this.emitEvent('pewpi.tokens.cleared', {});
  }
}

// Export singleton instance
export const tokenService = new TokenService();
export default tokenService;
