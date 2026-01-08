# Quick Reference Guide

## Installation

```bash
npm install dexie
```

## Core Imports

```typescript
import { tokenService } from '@/lib/shared/token-service';
import { authService } from '@/lib/shared/auth-service';
import { integrationService } from '@/lib/shared/integration-listener';
import { Login } from '@/components/Login';
import { Wallet } from '@/components/Wallet';
import '@/lib/shared/theme.css';
```

## Authentication

### Magic-Link Login (Default)

```typescript
// Request magic link (dev mode returns token directly)
const { success, token } = await authService.requestMagicLink('user@example.com');

// Verify magic link
const { success, user } = await authService.verifyMagicLink('user@example.com', token);

// Check auth status
const isAuth = await authService.isAuthenticated();

// Get current user
const user = await authService.getCurrentUser();

// Logout
await authService.logout();
```

### GitHub OAuth (Optional)

```typescript
const { success, user } = await authService.authenticateWithGitHub(githubToken);
```

## Token Management

### Create Tokens

```typescript
await tokenService.createToken(
  'infinity_tokens',  // Type: infinity, research, art, music
  100,                // Amount
  'repo-name',        // Source
  'Activity description',  // Description
  { key: 'value' }    // Optional metadata
);
```

### Get Balances

```typescript
// Single balance
const balance = await tokenService.getBalance('infinity_tokens');

// All balances
const balances = await tokenService.getAllBalances();
// Returns: { infinity_tokens: 100, research_tokens: 50, ... }
```

### Get Token History

```typescript
// All tokens
const tokens = await tokenService.getAll();

// Filtered by type
const infinityTokens = await tokenService.getAll('infinity_tokens');
```

### Clear Tokens

```typescript
await tokenService.clearAll();
```

## Event Subscription

### Using TokenService

```typescript
// Subscribe to token events
const unsubscribe = tokenService.on('pewpi.token.created', (token) => {
  console.log('New token:', token);
});

// Unsubscribe
unsubscribe();
```

### Using IntegrationService

```typescript
const unregister = integrationService.register({
  onTokenCreated: (token) => {
    console.log('Token created:', token);
  },
  onTokensCleared: () => {
    console.log('Tokens cleared');
  },
  onLoginChanged: (user) => {
    console.log('Login state:', user);
  }
});

// Unregister
unregister();
```

### Using Window Events

```typescript
window.addEventListener('pewpi.token.created', (event: CustomEvent) => {
  console.log('Token:', event.detail);
});

window.addEventListener('pewpi.login.changed', (event: CustomEvent) => {
  console.log('User:', event.detail.user);
});
```

## React Components

### Login Component

```tsx
import { Login } from '@/components/Login';

<Login
  onSuccess={() => console.log('Logged in')}
  showGitHubOption={true}
/>
```

### Wallet Component

```tsx
import { Wallet } from '@/components/Wallet';

<Wallet />
```

## Client-Side Models

```typescript
import { createModel } from '@/lib/shared/client-model';

// Define model
const UserModel = createModel('users', {
  name: { type: String, index: true },
  email: { type: String, unique: true },
  age: { type: Number }
});

// Create
const user = await UserModel.create({ name: 'John', email: 'john@example.com' });

// Find
const users = await UserModel.find({ age: 25 });
const user = await UserModel.findOne({ email: 'john@example.com' });
const user = await UserModel.findById(123);

// Update
await UserModel.updateMany({ age: 25 }, { age: 26 });
await UserModel.updateOne({ email: 'john@example.com' }, { name: 'Jane' });
await UserModel.findByIdAndUpdate(123, { name: 'Jane' });

// Delete
await UserModel.deleteMany({ age: 25 });
await UserModel.deleteOne({ email: 'john@example.com' });
await UserModel.findByIdAndDelete(123);

// Count
const count = await UserModel.count({ age: 25 });

// Clear all
await UserModel.clear();
```

## Encryption (Optional)

```typescript
import { 
  generateKey, encrypt, decrypt,
  generateECDHKeyPair, deriveSharedSecret
} from '@/lib/shared/crypto-helpers';

// AES-GCM encryption
const key = await generateKey();
const { ciphertext, iv } = await encrypt('data', key);
const decrypted = await decrypt(ciphertext, iv, key);

// ECDH key exchange
const keyPair = await generateECDHKeyPair();
const sharedSecret = await deriveSharedSecret(
  keyPair.privateKey,
  peerPublicKey
);
```

## P2P Sync (Optional)

```typescript
import { createP2PSync } from '@/lib/shared/peer-sync';

// Create connection
const p2p = await createP2PSync({
  signalingUrl: 'wss://signaling.example.com',
  encryptionEnabled: true
}, true);

// Listen for messages
p2p.on('message', (message) => {
  console.log('P2P message:', message);
});

// Send message
await p2p.send({
  type: 'token',
  payload: { amount: 100 },
  timestamp: Date.now()
});

// Close
p2p.close();
```

## Common Patterns

### Initialize on App Start

```typescript
import { tokenService } from '@/lib/shared/token-service';
import { authService } from '@/lib/shared/auth-service';

// In your main app component
useEffect(() => {
  tokenService.initAutoTracking();
  authService.restoreSession();
}, []);
```

### Award Tokens for Actions

```typescript
async function onUserAction(action: string, details: any) {
  await tokenService.createToken(
    'infinity_tokens',
    10,
    'repo-dashboard-hub',
    `User ${action}`,
    details
  );
}
```

### Require Auth for Action

```typescript
async function protectedAction() {
  const isAuth = await authService.isAuthenticated();
  if (!isAuth) {
    // Redirect to login
    return;
  }
  // Proceed with action
}
```

### Check Balance Before Spending

```typescript
async function purchaseFeature(cost: number) {
  const balance = await tokenService.getBalance('infinity_tokens');
  if (balance < cost) {
    throw new Error('Insufficient balance');
  }
  // Deduct tokens
  await tokenService.createToken(
    'infinity_tokens',
    -cost,
    'repo-dashboard-hub',
    'Purchased premium feature'
  );
}
```

## Token Types

- **infinity_tokens** 💎 - Core system tokens
- **research_tokens** 📚 - Research and learning activities
- **art_tokens** 🎨 - Creative and artistic activities
- **music_tokens** 🎵 - Music-related activities

## Theme Variables

```css
/* Colors */
--pewpi-primary
--pewpi-secondary
--pewpi-accent-infinity
--pewpi-accent-research
--pewpi-accent-art
--pewpi-accent-music

/* Backgrounds */
--pewpi-bg-primary
--pewpi-bg-secondary
--pewpi-bg-tertiary

/* Text */
--pewpi-text-primary
--pewpi-text-secondary
--pewpi-text-tertiary

/* Spacing */
--pewpi-spacing-xs
--pewpi-spacing-sm
--pewpi-spacing-md
--pewpi-spacing-lg

/* Radius */
--pewpi-radius-sm
--pewpi-radius
--pewpi-radius-lg
```

## Testing

```bash
# Run all tests
npm test

# Run specific test file
npm test -- token-service.test.ts

# Watch mode
npm test -- --watch

# Coverage
npm run test:coverage

# UI
npm run test:ui
```

## Troubleshooting

### IndexedDB Not Available
The system automatically falls back to localStorage.

### Cross-Tab Sync Not Working
Ensure both tabs are on the same origin.

### Build Errors
Run `npm install` to ensure all dependencies are installed.

### Tests Failing
Clear test databases: `rm -rf ~/.indexeddb-test-*`

## Links

- [Full Integration Guide](./INTEGRATION.md)
- [README](../README.md)
- [Source Code](../src/lib/shared/)
