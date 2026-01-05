/**
 * Unified Wallet System
 * Manages token balances across all Pewpi Infinity repositories
 * Supports multiple token types: infinity, research, art, music
 */

const WALLET_STORAGE_KEY = 'pewpi_unified_wallet'
const TRANSACTION_HISTORY_KEY = 'pewpi_transaction_history'
const MAX_TRANSACTION_HISTORY = 100

// Token types
export const TOKEN_TYPES = {
  INFINITY: 'infinity_tokens',
  RESEARCH: 'research_tokens',
  ART: 'art_tokens',
  MUSIC: 'music_tokens'
}

// Initialize wallet state
let walletState = {
  infinity_tokens: 0,
  research_tokens: 0,
  art_tokens: 0,
  music_tokens: 0,
  lastUpdated: Date.now()
}

// Load wallet state from localStorage
function loadWalletState() {
  try {
    const stored = localStorage.getItem(WALLET_STORAGE_KEY)
    if (stored) {
      walletState = { ...walletState, ...JSON.parse(stored) }
    }
  } catch (error) {
    console.error('Failed to load wallet state:', error)
  }
  return walletState
}

// Save wallet state to localStorage
function saveWalletState() {
  try {
    walletState.lastUpdated = Date.now()
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(walletState))
    
    // Trigger storage event for cross-tab sync
    window.dispatchEvent(new StorageEvent('storage', {
      key: WALLET_STORAGE_KEY,
      newValue: JSON.stringify(walletState),
      url: window.location.href,
      storageArea: localStorage
    }))
  } catch (error) {
    console.error('Failed to save wallet state:', error)
  }
}

// Load transaction history
function loadTransactionHistory() {
  try {
    const stored = localStorage.getItem(TRANSACTION_HISTORY_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load transaction history:', error)
    return []
  }
}

// Save transaction to history
function saveTransaction(transaction) {
  try {
    const history = loadTransactionHistory()
    history.unshift(transaction)
    
    // Keep only last MAX_TRANSACTION_HISTORY transactions
    const trimmed = history.slice(0, MAX_TRANSACTION_HISTORY)
    localStorage.setItem(TRANSACTION_HISTORY_KEY, JSON.stringify(trimmed))
  } catch (error) {
    console.error('Failed to save transaction:', error)
  }
}

/**
 * Earn tokens
 * @param {string} tokenType - Type of token (infinity_tokens, music_tokens, etc)
 * @param {number} amount - Amount to earn
 * @param {string} source - Source repository or feature
 * @param {string} description - Description of the action
 * @returns {boolean} Success status
 */
export function earnTokens(tokenType, amount, source, description) {
  if (!Object.values(TOKEN_TYPES).includes(tokenType)) {
    console.error('Invalid token type:', tokenType)
    return false
  }

  if (amount <= 0) {
    console.error('Amount must be positive')
    return false
  }

  loadWalletState()
  
  // Update balance
  walletState[tokenType] = (walletState[tokenType] || 0) + amount
  
  // Save state
  saveWalletState()
  
  // Save transaction
  saveTransaction({
    id: Date.now().toString() + Math.random().toString(36).slice(2, 11),
    type: 'earn',
    tokenType,
    amount,
    source,
    description,
    timestamp: Date.now(),
    balance: walletState[tokenType]
  })

  return true
}

/**
 * Spend tokens
 * @param {string} tokenType - Type of token
 * @param {number} amount - Amount to spend
 * @param {string} source - Source repository or feature
 * @param {string} description - Description of the action
 * @returns {boolean} Success status
 */
export function spendTokens(tokenType, amount, source, description) {
  if (!Object.values(TOKEN_TYPES).includes(tokenType)) {
    console.error('Invalid token type:', tokenType)
    return false
  }

  if (amount <= 0) {
    console.error('Amount must be positive')
    return false
  }

  loadWalletState()
  
  // Check balance
  const currentBalance = walletState[tokenType] || 0
  if (currentBalance < amount) {
    console.error(`Insufficient ${tokenType} balance. Required: ${amount}, Available: ${currentBalance}`)
    return false
  }

  // Update balance
  walletState[tokenType] = (walletState[tokenType] || 0) - amount
  
  // Save state
  saveWalletState()
  
  // Save transaction
  saveTransaction({
    id: Date.now().toString() + Math.random().toString(36).slice(2, 11),
    type: 'spend',
    tokenType,
    amount,
    source,
    description,
    timestamp: Date.now(),
    balance: walletState[tokenType]
  })

  return true
}

/**
 * Get wallet balance for a specific token type
 * @param {string} tokenType - Type of token
 * @returns {number} Balance
 */
export function getWalletBalance(tokenType) {
  loadWalletState()
  return walletState[tokenType] || 0
}

/**
 * Get all wallet balances
 * @returns {object} All balances
 */
export function getAllBalances() {
  loadWalletState()
  return { ...walletState }
}

/**
 * Get total value of all tokens
 * @returns {number} Total token count
 */
export function getTotalValue() {
  loadWalletState()
  return Object.values(TOKEN_TYPES).reduce((total, tokenType) => {
    return total + (walletState[tokenType] || 0)
  }, 0)
}

/**
 * Update wallet (force refresh from storage)
 */
export function updateWallet() {
  loadWalletState()
  return walletState
}

/**
 * Get transaction history
 * @param {number} limit - Number of transactions to return
 * @returns {Array} Transaction history
 */
export function getTransactionHistory(limit = 20) {
  const history = loadTransactionHistory()
  return history.slice(0, limit)
}

/**
 * Clear wallet (for testing/reset)
 */
export function clearWallet() {
  walletState = {
    infinity_tokens: 0,
    research_tokens: 0,
    art_tokens: 0,
    music_tokens: 0,
    lastUpdated: Date.now()
  }
  saveWalletState()
  localStorage.removeItem(TRANSACTION_HISTORY_KEY)
}

// Initialize on load
loadWalletState()

// Export for external use
export default {
  earnTokens,
  spendTokens,
  getWalletBalance,
  getAllBalances,
  getTotalValue,
  updateWallet,
  getTransactionHistory,
  clearWallet,
  TOKEN_TYPES
}
