# Integration Guide

This guide explains how to integrate the pewpi-shared-token system into other repositories (banksy, v, infinity-brain-search, repo-dashboard-hub, etc.) to enable shared login and wallet state across the Pewpi Infinity ecosystem.

## Overview

The pewpi-shared-token system provides:
- **Production-grade authentication** with magic-link (passwordless) and optional GitHub OAuth
- **Token management** with IndexedDB (Dexie) backend and localStorage fallback
- **Cross-repo synchronization** via window events and storage events
- **Optional P2P sync** using WebRTC DataChannels with encryption
- **Client-side models** that work without a backend

## Quick Start

### 1. Install Dependencies

```bash
npm install dexie
```

### 2. Copy Shared Files

Copy the following files from this repository to your project:

```
src/lib/shared/
├── token-service.ts       # Token management with IndexedDB
├── auth-service.ts        # Authentication service
├── client-model.ts        # Mongoose-style frontend models
├── crypto-helpers.ts      # AES-GCM and ECDH encryption
├── integration-listener.ts # Event subscription helpers
├── peer-sync.ts           # Optional P2P sync
└── theme.css              # Shared theme CSS variables
```

### 3. Import and Initialize

```typescript
import { tokenService } from '@/lib/shared/token-service';
import { authService } from '@/lib/shared/auth-service';
import { integrationService } from '@/lib/shared/integration-listener';

// Initialize auto-tracking
tokenService.initAutoTracking();

// Register integration listeners
integrationService.register({
  onTokenCreated: (token) => {
    console.log('New token:', token);
    // Update your UI
  },
  onLoginChanged: (user) => {
    console.log('Login changed:', user);
    // Update auth state in your app
  }
});
```

## Integration Examples

### Example 1: repo-dashboard-hub

```typescript
import { tokenService } from '@/lib/shared/token-service';
import { authService } from '@/lib/shared/auth-service';

// Award tokens for repository activities
async function onRepositoryScan(repoName: string, fileCount: number) {
  await tokenService.createToken(
    'research_tokens',
    fileCount * 10,
    'repo-dashboard-hub',
    `Scanned repository: ${repoName}`
  );
}

// Check auth before sensitive operations
async function performOperation() {
  const isAuth = await authService.isAuthenticated();
  if (!isAuth) {
    // Redirect to login
    return;
  }
  // Proceed with operation
}
```

### Example 2: banksy (Art Repository)

```typescript
import { tokenService } from '@/lib/shared/token-service';
import { integrationService } from '@/lib/shared/integration-listener';

// Award art tokens when artwork is created
async function onArtworkCreated(title: string) {
  await tokenService.createToken(
    'art_tokens',
    50,
    'banksy',
    `Created artwork: ${title}`
  );
}

// Listen for token events
integrationService.register({
  onTokenCreated: (token) => {
    if (token.type === 'art_tokens') {
      // Update art gallery UI
      updateGalleryDisplay();
    }
  }
});
```

### Example 3: infinity-brain-search

```typescript
import { tokenService } from '@/lib/shared/token-service';

// Award research tokens for searches
async function onSearchPerformed(query: string, results: number) {
  const points = Math.min(results, 100); // Cap at 100
  await tokenService.createToken(
    'research_tokens',
    points,
    'infinity-brain-search',
    `Search: ${query}`
  );
}
```

### Example 4: v (Music Repository)

```typescript
import { tokenService } from '@/lib/shared/token-service';

// Award music tokens for listening
async function onSongPlayed(songTitle: string, duration: number) {
  const points = Math.floor(duration / 30); // 1 token per 30 seconds
  await tokenService.createToken(
    'music_tokens',
    points,
    'v',
    `Listened to: ${songTitle}`
  );
}
```

## Authentication Integration

### Magic-Link Authentication (Default)

```typescript
import { authService } from '@/lib/shared/auth-service';

// Request magic link (dev mode - no SMTP required)
const result = await authService.requestMagicLink('user@example.com');
if (result.success) {
  console.log('Dev token:', result.token); // Auto-filled in dev mode
}

// Verify magic link
const verifyResult = await authService.verifyMagicLink(
  'user@example.com',
  token
);
if (verifyResult.success) {
  console.log('User logged in:', verifyResult.user);
}
```

### GitHub OAuth (Optional)

```typescript
import { authService } from '@/lib/shared/auth-service';

// Authenticate with GitHub token
const result = await authService.authenticateWithGitHub(githubToken);
if (result.success) {
  console.log('User logged in:', result.user);
}
```

### Session Management

```typescript
import { authService } from '@/lib/shared/auth-service';

// Restore session on app load
await authService.restoreSession();

// Check authentication
const isAuth = await authService.isAuthenticated();

// Get current user
const user = await authService.getCurrentUser();

// Logout
await authService.logout();
```

## Cross-Repo Event Synchronization

The system emits the following window events that automatically sync across tabs and repositories:

### Token Events

```typescript
// Listen for token creation
window.addEventListener('pewpi.token.created', (event: CustomEvent) => {
  console.log('Token created:', event.detail);
});

// Listen for tokens cleared
window.addEventListener('pewpi.tokens.cleared', (event: CustomEvent) => {
  console.log('Tokens cleared');
});
```

### Login Events

```typescript
// Listen for login state changes
window.addEventListener('pewpi.login.changed', (event: CustomEvent) => {
  const user = event.detail.user;
  console.log('Login changed:', user);
});
```

### Using the Integration Service

For easier event management, use the `IntegrationService`:

```typescript
import { integrationService } from '@/lib/shared/integration-listener';

const unregister = integrationService.register({
  onTokenCreated: (token) => {
    console.log('New token:', token);
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

## UI Components

### Login Component

```tsx
import { Login } from '@/components/Login';

function App() {
  const handleLoginSuccess = () => {
    console.log('User logged in successfully');
  };

  return (
    <Login 
      onSuccess={handleLoginSuccess}
      showGitHubOption={true} // Optional: show GitHub auth tab
    />
  );
}
```

### Wallet Component

```tsx
import { Wallet } from '@/components/Wallet';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Wallet />
    </div>
  );
}
```

## Theme Integration

Import the shared theme CSS for consistent styling:

```typescript
import '@/lib/shared/theme.css';
```

The theme provides CSS variables for:
- Colors (primary, secondary, accent, token-specific)
- Backgrounds (light and dark modes)
- Text colors
- Borders
- Shadows
- Spacing
- Border radius
- Transitions
- Typography

Use the variables in your styles:

```css
.my-component {
  background: var(--pewpi-bg-primary);
  color: var(--pewpi-text-primary);
  border: 1px solid var(--pewpi-border);
  border-radius: var(--pewpi-radius);
  padding: var(--pewpi-spacing-md);
}
```

## Optional: P2P Synchronization

For advanced use cases, enable P2P synchronization between clients:

```typescript
import { createP2PSync } from '@/lib/shared/peer-sync';

// Create P2P connection
const p2p = await createP2PSync({
  signalingUrl: 'wss://your-signaling-server.com',
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ],
  encryptionEnabled: true
}, true); // true = initiator, false = receiver

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

// Close connection when done
p2p.close();
```

### P2P Configuration

- **signalingUrl**: WebSocket URL for signaling server (default: wss://signaling.pewpi-infinity.io)
- **iceServers**: STUN/TURN servers for NAT traversal
- **encryptionEnabled**: Enable end-to-end encryption using ECDH + AES-GCM (default: true)

## Migration Guide

### From localStorage-only to IndexedDB

The system automatically migrates data from localStorage to IndexedDB. No manual migration needed.

### From Old Auth System

If you have an existing auth system:

1. Export user data from your old system
2. Create users in the new system:

```typescript
import { authService } from '@/lib/shared/auth-service';

// For each user
const result = await authService.requestMagicLink(user.email);
if (result.success) {
  await authService.verifyMagicLink(user.email, result.token);
}
```

3. Award tokens based on historical data:

```typescript
import { tokenService } from '@/lib/shared/token-service';

for (const activity of historicalActivities) {
  await tokenService.createToken(
    activity.tokenType,
    activity.amount,
    'migration',
    `Migrated: ${activity.description}`
  );
}
```

## Rollback Instructions

If you need to rollback to the previous system:

1. **Backup data first**:

```typescript
import { tokenService } from '@/lib/shared/token-service';

// Export all tokens
const tokens = await tokenService.getAll();
const balances = await tokenService.getAllBalances();

// Save to file or localStorage
localStorage.setItem('backup_tokens', JSON.stringify(tokens));
localStorage.setItem('backup_balances', JSON.stringify(balances));
```

2. **Remove new files**:

```bash
rm -rf src/lib/shared/
rm src/components/Login.tsx
rm src/components/Wallet.tsx
```

3. **Restore dependencies**:

```bash
npm uninstall dexie
```

4. **Restore old auth system** (if applicable)

5. **Import backup data** into old system

## Testing

The system includes comprehensive unit tests:

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Troubleshooting

### Issue: IndexedDB not available

**Solution**: The system automatically falls back to localStorage. Check browser compatibility.

### Issue: Cross-tab sync not working

**Solution**: Ensure both tabs are on the same origin. Storage events only fire for same-origin tabs.

### Issue: Magic link not working in production

**Solution**: Configure SMTP server for email delivery. In dev mode, tokens are auto-filled.

### Issue: P2P connection fails

**Solution**: 
- Check signaling server is running
- Verify TURN server is configured for restrictive networks
- Ensure both peers can reach the signaling server

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review test files for usage examples

## License

MIT License - See LICENSE file for details
