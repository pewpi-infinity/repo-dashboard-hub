/**
 * Wallet Unified Helper
 * Part of pewpi-shared system synthesized from best implementations
 * 
 * Features:
 * - earnTokens() and spendTokens() operations
 * - getAllBalances() helper
 * - Transaction history with cross-tab storage event broadcasting
 * - Integrates with token-service for persistence
 */

import { tokenService } from './token-service';

const TRANSACTION_HISTORY_KEY = 'pewpi_transaction_history';
const MAX_TRANSACTION_HISTORY = 100;

// Token types supported across Pewpi Infinity ecosystem
export const TOKEN_TYPES = {
  INFINITY: 'infinity_tokens',
  RESEARCH: 'research_tokens',
  ART: 'art_tokens',
  MUSIC: 'music_tokens'
} as const;

export type TokenType = typeof TOKEN_TYPES[keyof typeof TOKEN_TYPES];

export interface Transaction {
  id: string;
  type: 'earn' | 'spend';
  tokenType: string;
  amount: number;
  source: string;
  description: string;
  timestamp: number;
  balance: number;
}

/**
 * Earn tokens - adds tokens to the wallet
 * @param tokenType - Type of token (infinity_tokens, research_tokens, art_tokens, music_tokens)
 * @param amount - Amount to earn (must be positive)
 * @param source - Source repository or feature
 * @param description - Description of the action
 * @returns Promise<boolean> Success status
 */
export async function earnTokens(
  tokenType: string,
  amount: number,
  source: string,
  description: string
): Promise<boolean> {
  if (!Object.values(TOKEN_TYPES).includes(tokenType as TokenType)) {
    console.error('Invalid token type:', tokenType);
    return false;
  }

  if (amount <= 0) {
    console.error('Amount must be positive');
    return false;
  }

  try {
    // Create token entry (this will update the balance)
    await tokenService.createToken(tokenType, amount, source, description);

    // Get updated balance
    const balance = await tokenService.getBalance(tokenType);

    // Save transaction to history
    saveTransaction({
      id: Date.now().toString() + Math.random().toString(36).slice(2, 11),
      type: 'earn',
      tokenType,
      amount,
      source,
      description,
      timestamp: Date.now(),
      balance
    });

    return true;
  } catch (error) {
    console.error('Failed to earn tokens:', error);
    return false;
  }
}

/**
 * Spend tokens - deducts tokens from the wallet
 * @param tokenType - Type of token
 * @param amount - Amount to spend (must be positive)
 * @param source - Source repository or feature
 * @param description - Description of the action
 * @returns Promise<boolean> Success status
 */
export async function spendTokens(
  tokenType: string,
  amount: number,
  source: string,
  description: string
): Promise<boolean> {
  if (!Object.values(TOKEN_TYPES).includes(tokenType as TokenType)) {
    console.error('Invalid token type:', tokenType);
    return false;
  }

  if (amount <= 0) {
    console.error('Amount must be positive');
    return false;
  }

  try {
    // Check balance
    const currentBalance = await tokenService.getBalance(tokenType);
    if (currentBalance < amount) {
      console.error(`Insufficient ${tokenType} balance. Required: ${amount}, Available: ${currentBalance}`);
      return false;
    }

    // Create negative token entry (this will decrease the balance)
    await tokenService.createToken(tokenType, -amount, source, description);

    // Get updated balance
    const balance = await tokenService.getBalance(tokenType);

    // Save transaction to history
    saveTransaction({
      id: Date.now().toString() + Math.random().toString(36).slice(2, 11),
      type: 'spend',
      tokenType,
      amount,
      source,
      description,
      timestamp: Date.now(),
      balance
    });

    return true;
  } catch (error) {
    console.error('Failed to spend tokens:', error);
    return false;
  }
}

/**
 * Get wallet balance for a specific token type
 * @param tokenType - Type of token
 * @returns Promise<number> Current balance
 */
export async function getBalance(tokenType: string): Promise<number> {
  try {
    return await tokenService.getBalance(tokenType);
  } catch (error) {
    console.error('Failed to get balance:', error);
    return 0;
  }
}

/**
 * Get all wallet balances
 * @returns Promise<Record<string, number>> All token balances
 */
export async function getAllBalances(): Promise<Record<string, number>> {
  try {
    return await tokenService.getAllBalances();
  } catch (error) {
    console.error('Failed to get all balances:', error);
    return {};
  }
}

/**
 * Get total value of all tokens
 * @returns Promise<number> Total token count across all types
 */
export async function getTotalBalance(): Promise<number> {
  try {
    return await tokenService.getTotalBalance();
  } catch (error) {
    console.error('Failed to get total balance:', error);
    return 0;
  }
}

/**
 * Get transaction history
 * @param limit - Number of transactions to return (default: 20)
 * @returns Transaction[] Array of recent transactions
 */
export function getTransactionHistory(limit: number = 20): Transaction[] {
  try {
    const stored = localStorage.getItem(TRANSACTION_HISTORY_KEY);
    if (!stored) return [];

    const history: Transaction[] = JSON.parse(stored);
    return history.slice(0, limit);
  } catch (error) {
    console.error('Failed to load transaction history:', error);
    return [];
  }
}

/**
 * Clear all wallet data (for testing/reset)
 */
export async function clearWallet(): Promise<void> {
  try {
    await tokenService.clearAll();
    localStorage.removeItem(TRANSACTION_HISTORY_KEY);
    
    // Emit event
    window.dispatchEvent(new CustomEvent('pewpi.wallet.cleared', { detail: {} }));
  } catch (error) {
    console.error('Failed to clear wallet:', error);
  }
}

/**
 * Save transaction to history
 */
function saveTransaction(transaction: Transaction): void {
  try {
    const stored = localStorage.getItem(TRANSACTION_HISTORY_KEY);
    const history: Transaction[] = stored ? JSON.parse(stored) : [];
    
    history.unshift(transaction);
    
    // Keep only last MAX_TRANSACTION_HISTORY transactions
    const trimmed = history.slice(0, MAX_TRANSACTION_HISTORY);
    localStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify(trimmed));

    // Broadcast to other tabs
    window.dispatchEvent(new StorageEvent('storage', {
      key: TRANSACTION_HISTORY_KEY,
      newValue: JSON.stringify(trimmed),
      url: window.location.href,
      storageArea: localStorage
    }));
  } catch (error) {
    console.error('Failed to save transaction:', error);
  }
}

// Export default object for easier imports
export default {
  earnTokens,
  spendTokens,
  getBalance,
  getAllBalances,
  getTotalBalance,
  getTransactionHistory,
  clearWallet,
  TOKEN_TYPES
};
