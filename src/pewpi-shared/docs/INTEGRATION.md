# Pewpi-Shared Integration Guide

This guide explains how to use the unified pewpi-shared authentication, wallet, and token system in your repository.

## Overview

The `pewpi-shared` system provides:
- **Production-grade authentication** with magic-link (passwordless), password, and optional GitHub OAuth
- **Token management** with IndexedDB (Dexie) backend and localStorage fallback
- **Wallet helpers** for earning and spending tokens across the Pewpi Infinity ecosystem
- **Cross-repo synchronization** via CustomEvents and storage events
- **React components** for easy UI integration

## Quick Start

### 1. Initialize Services (Already Done)

The services are automatically initialized when you import them. The main entry point (`src/main.tsx`) includes defensive initialization that:
- Calls `tokenService.initAutoTracking()` to enable cross-tab sync
- Calls `authService.restoreSession()` to restore logged-in state

### 2. Import and Use in Your Components

```typescript
import { tokenService } from '@/pewpi-shared/token-service';
import { authService } from '@/pewpi-shared/auth-service';
import { earnTokens, spendTokens, getAllBalances } from '@/pewpi-shared/wallet-unified';
import { integrationService } from '@/pewpi-shared/integration-listener';
import { WalletDisplay } from '@/pewpi-shared/components/WalletDisplay';
import { UnifiedLoginModal } from '@/pewpi-shared/components/UnifiedLoginModal';
```

## Core APIs

### Authentication

#### Login with Magic Link (Passwordless)

```typescript
// Request magic link (dev mode - token returned directly)
const result = await authService.requestMagicLink('user@example.com');
if (result.success) {
  console.log('Magic link token:', result.token); // Auto-filled in dev mode
}

// Verify magic link
const verifyResult = await authService.verifyMagicLink('user@example.com', token);
if (verifyResult.success) {
  console.log('User logged in:', verifyResult.user);
}
```

#### Login with Username/Password

```typescript
// Login
const result = await authService.login('username', 'password');
if (result.success) {
  console.log('User logged in:', result.user);
}

// Register
const registerResult = await authService.register('username', 'user@example.com', 'password');
if (registerResult.success) {
  console.log('User registered:', registerResult.user);
}
```

#### GitHub OAuth (Optional)

```typescript
// Authenticate with GitHub token
const result = await authService.authenticateWithGitHub(githubToken);
if (result.success) {
  console.log('User logged in:', result.user);
}
```

#### Session Management

```typescript
// Check authentication
const isAuth = await authService.isAuthenticated();

// Get current user
const user = await authService.getCurrentUser();

// Logout
await authService.logout();
```

### Token Management

#### Create Tokens

```typescript
// Create a token entry (automatically updates balance)
await tokenService.createToken(
  'infinity_tokens',  // Token type
  100,                // Amount
  'repo-dashboard-hub', // Source
  'Completed dashboard scan' // Description
);
```

#### Query Tokens

```typescript
// Get all tokens
const tokens = await tokenService.getAll();

// Get tokens by type
const infinityTokens = await tokenService.getAll('infinity_tokens');

// Get token by ID
const token = await tokenService.getById(1);

// Get balance for a token type
const balance = await tokenService.getBalance('infinity_tokens');

// Get all balances
const balances = await tokenService.getAllBalances();

// Get total balance across all types
const total = await tokenService.getTotalBalance();
```

#### Update and Delete Tokens

```typescript
// Update a token
await tokenService.update(tokenId, { amount: 150 });

// Delete a token
await tokenService.delete(tokenId);
```

### Wallet Operations

#### Earn and Spend Tokens

```typescript
// Earn tokens
await earnTokens(
  'research_tokens',
  50,
  'repo-dashboard-hub',
  'Scanned 10 repositories'
);

// Spend tokens
const success = await spendTokens(
  'art_tokens',
  25,
  'repo-dashboard-hub',
  'Unlocked premium theme'
);
```

#### Query Wallet

```typescript
// Get all balances
const balances = await getAllBalances();

// Get specific balance
const balance = await getBalance('infinity_tokens');

// Get total balance
const total = await getTotalBalance();

// Get transaction history
const history = getTransactionHistory(20); // Last 20 transactions
```

## Event Listeners

### Token Events

```typescript
// Listen for token creation
tokenService.on('pewpi.token.created', (token) => {
  console.log('New token:', token);
  // Update your UI
});

// Listen for token updates
tokenService.on('pewpi.token.updated', (token) => {
  console.log('Token updated:', token);
});

// Listen for token deletion
tokenService.on('pewpi.token.deleted', ({ id, token }) => {
  console.log('Token deleted:', id, token);
});

// Listen for tokens cleared
tokenService.on('pewpi.tokens.cleared', () => {
  console.log('All tokens cleared');
});
```

### Login Events

```typescript
// Listen for login state changes
window.addEventListener('pewpi.login.changed', (event: CustomEvent) => {
  const user = event.detail.user;
  console.log('Login changed:', user);
  // Update your auth UI
});
```

### Using Integration Service

For easier event management:

```typescript
import { integrationService } from '@/pewpi-shared/integration-listener';

const unregister = integrationService.register({
  onTokenCreated: (token) => {
    console.log('New token:', token);
  },
  onTokenUpdated: (token) => {
    console.log('Token updated:', token);
  },
  onTokenDeleted: ({ id, token }) => {
    console.log('Token deleted:', id, token);
  },
  onTokensCleared: () => {
    console.log('Tokens cleared');
  },
  onLoginChanged: (user) => {
    console.log('Login state:', user);
  }
});

// Later: unregister when component unmounts
unregister();
```

## React Components

### WalletDisplay Component

```tsx
import { WalletDisplay } from '@/pewpi-shared/components/WalletDisplay';

function MyComponent() {
  return (
    <div>
      {/* Full display with all token types */}
      <WalletDisplay />
      
      {/* Compact display (total only) */}
      <WalletDisplay compact />
      
      {/* With total row */}
      <WalletDisplay showTotal />
    </div>
  );
}
```

### UnifiedLoginModal Component

```tsx
import { UnifiedLoginModal } from '@/pewpi-shared/components/UnifiedLoginModal';
import { useState } from 'react';

function MyComponent() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <button onClick={() => setShowLogin(true)}>Login</button>
      
      {showLogin && (
        <UnifiedLoginModal
          onSuccess={() => {
            console.log('Login successful!');
            setShowLogin(false);
          }}
          onClose={() => setShowLogin(false)}
          showGitHubOption={false}  // Optional: show/hide GitHub tab
          showPasswordOption={true}  // Optional: show/hide password tab
        />
      )}
    </div>
  );
}
```

## Token Types

The system supports four token types across the Pewpi Infinity ecosystem:

- **infinity_tokens** (💎) - Core system tokens
- **research_tokens** (📚) - Earned from research and search activities
- **art_tokens** (🎨) - Earned from art creation and gallery activities
- **music_tokens** (🎵) - Earned from music listening and creation

## Example Use Cases

### Award Tokens for Activity

```typescript
// Award tokens when user completes a scan
async function onRepositoryScan(repoName: string, fileCount: number) {
  await earnTokens(
    'research_tokens',
    fileCount * 10,
    'repo-dashboard-hub',
    `Scanned repository: ${repoName}`
  );
}

// Award tokens when user creates content
async function onArtworkCreated(title: string) {
  await earnTokens(
    'art_tokens',
    50,
    'banksy',
    `Created artwork: ${title}`
  );
}
```

### Check Balance Before Action

```typescript
async function unlockPremiumFeature() {
  const balance = await getBalance('infinity_tokens');
  
  if (balance < 100) {
    alert('Insufficient tokens. You need 100 infinity tokens.');
    return;
  }
  
  const success = await spendTokens(
    'infinity_tokens',
    100,
    'repo-dashboard-hub',
    'Unlocked premium feature'
  );
  
  if (success) {
    // Enable the premium feature
    enablePremiumFeature();
  }
}
```

### Protect Routes

```typescript
async function ProtectedRoute({ children }) {
  const isAuth = await authService.isAuthenticated();
  
  if (!isAuth) {
    return <Redirect to="/login" />;
  }
  
  return children;
}
```

## Cross-Tab Synchronization

The system automatically synchronizes state across:
- Multiple tabs of the same app
- Different Pewpi Infinity apps on the same machine
- Uses localStorage events and CustomEvents for real-time sync

No additional configuration needed!

## Testing

### Dev Mode Features

- Magic links auto-fill tokens (check console)
- Password auth accepts any credentials
- Daily login bonuses awarded automatically

### Testing Token Operations

```typescript
// Award test tokens
await earnTokens('infinity_tokens', 1000, 'test', 'Test tokens');

// Check balance
const balance = await getBalance('infinity_tokens');
console.log('Balance:', balance);

// Clear all data
await clearWallet();
```

## Styling

Add CSS for the components:

```css
/* Wallet Display */
.pewpi-wallet-display {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.pewpi-wallet-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.pewpi-wallet-icon {
  font-size: 1.2rem;
}

.pewpi-wallet-amount {
  font-weight: 600;
}

/* Login Modal */
.pewpi-login-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.pewpi-login-modal {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.pewpi-login-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.pewpi-login-tab {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.pewpi-login-tab.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.pewpi-login-field {
  margin-bottom: 1rem;
}

.pewpi-login-field label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.pewpi-login-field input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

.pewpi-login-button {
  width: 100%;
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 0.5rem;
}

.pewpi-login-button:hover {
  background: #2563eb;
}

.pewpi-login-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pewpi-login-button-secondary {
  width: 100%;
  padding: 0.5rem;
  background: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
}

.pewpi-login-error {
  padding: 0.75rem;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.pewpi-login-help {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.5rem;
}
```

## Troubleshooting

### Issue: Balances not updating

**Solution**: Make sure `tokenService.initAutoTracking()` is called on app initialization. This is already done in `src/main.tsx`.

### Issue: Cross-tab sync not working

**Solution**: Ensure both tabs are on the same origin (protocol + domain + port). Storage events only fire for same-origin tabs.

### Issue: Magic link expired

**Solution**: Magic links expire after 15 minutes. Request a new one.

### Issue: IndexedDB not available

**Solution**: The system automatically falls back to localStorage. No action needed.

## Migration from Existing Systems

If your repository already has auth or wallet code:

1. **Don't remove existing code** - The pewpi-shared system is additive
2. **Gradually migrate** - Start using pewpi-shared for new features
3. **Test thoroughly** - Both systems can coexist during transition
4. **Use feature flags** - Toggle between old and new systems

## Support

For issues and questions:
- Check this documentation
- Review component source code in `src/pewpi-shared/`
- Open an issue on the repository

## License

MIT License - See LICENSE file for details
