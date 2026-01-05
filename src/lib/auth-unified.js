/**
 * Unified Authentication System
 * Shared across all Pewpi Infinity repositories
 * Syncs auth state via localStorage across tabs and repos
 */

const AUTH_STORAGE_KEY = 'pewpi_unified_auth'
const SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours
const DAILY_LOGIN_KEY = 'pewpi_daily_login'

// Initialize auth state
let authState = {
  isAuthenticated: false,
  user: null,
  sessionStart: null,
  lastActivity: null
}

// Load auth state from localStorage
export function loadAuthState() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      const state = JSON.parse(stored)
      
      // Check if session is still valid
      const now = Date.now()
      if (state.sessionStart && (now - state.sessionStart) < SESSION_TIMEOUT) {
        authState = state
        return true
      } else {
        // Session expired
        clearAuth()
        return false
      }
    }
  } catch (error) {
    console.error('Failed to load auth state:', error)
  }
  return false
}

// Save auth state to localStorage
function saveAuthState() {
  try {
    authState.lastActivity = Date.now()
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState))
    
    // Trigger storage event for cross-tab sync
    window.dispatchEvent(new Event('storage'))
  } catch (error) {
    console.error('Failed to save auth state:', error)
  }
}

// Clear auth state
function clearAuth() {
  authState = {
    isAuthenticated: false,
    user: null,
    sessionStart: null,
    lastActivity: null
  }
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

/**
 * Sign in with username and password
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: any, error?: string}>}
 */
export async function signIn(username, password) {
  // Simulate API call
  if (!username || !password) {
    return { success: false, error: 'Username and password required' }
  }

  // For demo purposes, accept any credentials
  const user = {
    id: Date.now().toString(),
    username: username,
    email: `${username}@pewpi-infinity.io`,
    joinedAt: Date.now(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
  }

  authState = {
    isAuthenticated: true,
    user: user,
    sessionStart: Date.now(),
    lastActivity: Date.now()
  }

  saveAuthState()
  
  // Award daily login bonus
  awardDailyLoginBonus()

  return { success: true, user }
}

/**
 * Register a new user
 * @param {string} username 
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<{success: boolean, user?: any, error?: string}>}
 */
export async function register(username, email, password) {
  // Simulate API call
  if (!username || !email || !password) {
    return { success: false, error: 'All fields required' }
  }

  // Validate email format
  if (!email.includes('@')) {
    return { success: false, error: 'Invalid email format' }
  }

  // Create user
  const user = {
    id: Date.now().toString(),
    username: username,
    email: email,
    joinedAt: Date.now(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`
  }

  authState = {
    isAuthenticated: true,
    user: user,
    sessionStart: Date.now(),
    lastActivity: Date.now()
  }

  saveAuthState()
  
  // Award daily login bonus
  awardDailyLoginBonus()

  return { success: true, user }
}

/**
 * Sign out current user
 */
export function signOut() {
  clearAuth()
  saveAuthState()
}

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated() {
  loadAuthState()
  return authState.isAuthenticated
}

/**
 * Get current authenticated user
 * @returns {any|null}
 */
export function getCurrentUser() {
  loadAuthState()
  return authState.user
}

/**
 * Sync session across tabs
 */
export function syncSession() {
  loadAuthState()
}

/**
 * Award daily login bonus
 */
function awardDailyLoginBonus() {
  try {
    const today = new Date().toDateString()
    const lastLogin = localStorage.getItem(DAILY_LOGIN_KEY)
    
    if (lastLogin !== today) {
      // Import wallet functions dynamically to avoid circular dependency
      import('./wallet-unified.js').then(({ earnTokens }) => {
        earnTokens('infinity_tokens', 10, 'repo-dashboard-hub', 'Daily login bonus')
      })
      localStorage.setItem(DAILY_LOGIN_KEY, today)
    }
  } catch (error) {
    console.error('Failed to award daily login bonus:', error)
  }
}

// Initialize on load
loadAuthState()

// Export for external use
export default {
  signIn,
  signOut,
  register,
  isAuthenticated,
  getCurrentUser,
  syncSession
}
