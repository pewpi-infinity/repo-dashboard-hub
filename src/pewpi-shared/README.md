# Pewpi-Shared: Unified Auth + Wallet + Token Library

A production-grade, unified authentication, wallet, and token management system for the Pewpi Infinity ecosystem, synthesized from the best implementations across the organization.

## Features

✨ **Production-Grade Authentication**
- Magic-link (passwordless) authentication with dev-mode auto-fill
- Username/password authentication
- Optional GitHub OAuth support (client-side helper)
- Session management with 24-hour timeout
- Cross-tab login state synchronization

💰 **Token Management**
- Dexie-backed IndexedDB with automatic localStorage fallback
- Full CRUD operations: create, read, update, delete tokens
- Auto-tracking with `initAutoTracking()`
- Balance tracking and total balance calculations
- CustomEvent emission for real-time updates

🔄 **Wallet Operations**
- `earnTokens()` and `spendTokens()` helpers
- Transaction history tracking (last 100 transactions)
- Cross-tab balance synchronization
- Support for 4 token types: infinity, research, art, music

📡 **Event System**
- `pewpi.token.created` - Fired when tokens are created
- `pewpi.token.updated` - Fired when tokens are updated
- `pewpi.token.deleted` - Fired when tokens are deleted
- `pewpi.login.changed` - Fired when login state changes
- Cross-tab event broadcasting via localStorage

🎨 **React Components**
- `UnifiedLoginModal` - Lightweight, opt-in login UI
- `WalletDisplay` - Token balance display with auto-updates
- TypeScript support
- Customizable and themeable

## Quick Start

### Import Services

```typescript
import { tokenService } from '@/pewpi-shared/token-service';
import { authService } from '@/pewpi-shared/auth-service';
import { earnTokens, spendTokens, getAllBalances } from '@/pewpi-shared/wallet-unified';
import { integrationService } from '@/pewpi-shared/integration-listener';
```

### Initialize (Already Done in main.tsx)

```typescript
// Enable auto-tracking for cross-tab sync
tokenService.initAutoTracking();

// Restore session if available
await authService.restoreSession();
```

### Login

```typescript
// Magic link (passwordless)
const result = await authService.requestMagicLink('user@example.com');
await authService.verifyMagicLink('user@example.com', result.token);

// Or username/password
await authService.login('username', 'password');
```

### Manage Tokens

```typescript
// Earn tokens
await earnTokens('infinity_tokens', 100, 'repo-dashboard-hub', 'Completed scan');

// Spend tokens
await spendTokens('infinity_tokens', 50, 'repo-dashboard-hub', 'Unlocked feature');

// Check balance
const balance = await tokenService.getBalance('infinity_tokens');

// Get all balances
const balances = await getAllBalances();
```

### Listen to Events

```typescript
// Token events
tokenService.on('pewpi.token.created', (token) => {
  console.log('New token:', token);
});

// Login events
window.addEventListener('pewpi.login.changed', (event) => {
  console.log('Login changed:', event.detail.user);
});
```

### Use React Components

```tsx
import { WalletDisplay } from '@/pewpi-shared/components/WalletDisplay';
import { UnifiedLoginModal } from '@/pewpi-shared/components/UnifiedLoginModal';

function App() {
  return (
    <>
      <WalletDisplay />
      <UnifiedLoginModal onSuccess={() => console.log('Logged in!')} />
    </>
  );
}
```

## Architecture

```
src/pewpi-shared/
├── token-service.ts           # Token management with IndexedDB
├── auth-service.ts            # Authentication service
├── wallet-unified.ts          # Wallet helpers (earn/spend tokens)
├── integration-listener.ts    # Event subscription utilities
├── components/
│   ├── UnifiedLoginModal.tsx  # Login UI component
│   └── WalletDisplay.tsx      # Wallet balance display
└── docs/
    ├── INTEGRATION.md         # Full integration guide
    └── README.md              # This file
```

## Token Types

| Type | Icon | Description |
|------|------|-------------|
| `infinity_tokens` | 💎 | Core system tokens |
| `research_tokens` | 📚 | Research and search activities |
| `art_tokens` | 🎨 | Art creation and gallery |
| `music_tokens` | 🎵 | Music listening and creation |

## Cross-Repository Sync

The system automatically synchronizes across:
- Multiple tabs of the same repository
- Different Pewpi Infinity repositories on the same machine
- Uses CustomEvents and localStorage for real-time updates

## Key Differences from src/lib/shared

This `pewpi-shared` system is synthesized from the best implementations across the organization and provides:
- **More complete API**: Full CRUD operations for tokens
- **Better error handling**: Try/catch in all operations
- **Enhanced events**: Token updated and deleted events
- **Simplified wallet**: Direct earn/spend operations
- **React components**: Ready-to-use UI components
- **Better documentation**: Comprehensive integration guide

## Dev Mode Features

- **Magic links**: Tokens auto-filled in console (no email needed)
- **Password auth**: Accepts any credentials
- **Daily bonuses**: 10 infinity tokens on first login each day

## Production Considerations

- Magic links require SMTP configuration for email delivery
- GitHub OAuth requires server-side token exchange
- Consider rate limiting for token operations
- IndexedDB provides better performance than localStorage

## Documentation

- [Integration Guide](./docs/INTEGRATION.md) - Complete usage guide with examples
- [API Reference](#api-reference) - See below

## API Reference

### TokenService

```typescript
// Create token
await tokenService.createToken(type, amount, source, description, metadata?)

// Query tokens
await tokenService.getAll(type?)
await tokenService.getById(id)

// Update/delete
await tokenService.update(id, updates)
await tokenService.delete(id)

// Balances
await tokenService.getBalance(type)
await tokenService.getAllBalances()
await tokenService.getTotalBalance()

// Clear
await tokenService.clearAll()

// Initialize
tokenService.initAutoTracking()

// Events
tokenService.on(eventName, callback)
```

### AuthService

```typescript
// Magic link
await authService.requestMagicLink(email)
await authService.verifyMagicLink(email, token)

// Password
await authService.login(username, password)
await authService.register(username, email, password)

// GitHub
await authService.authenticateWithGitHub(githubToken)

// Session
await authService.restoreSession()
await authService.logout()
await authService.getCurrentUser()
await authService.isAuthenticated()

// Initialize
await authService.init()
```

### Wallet Helpers

```typescript
// Earn/spend
await earnTokens(type, amount, source, description)
await spendTokens(type, amount, source, description)

// Query
await getBalance(type)
await getAllBalances()
await getTotalBalance()

// History
getTransactionHistory(limit?)

// Clear
await clearWallet()
```

### IntegrationService

```typescript
// Register listeners
const unregister = integrationService.register({
  onTokenCreated: (token) => {},
  onTokenUpdated: (token) => {},
  onTokenDeleted: ({ id, token }) => {},
  onTokensCleared: () => {},
  onLoginChanged: (user) => {}
});

// Unregister
unregister();

// Sync
await integrationService.syncFromStorage();
```

## Browser Compatibility

- **IndexedDB**: All modern browsers
- **LocalStorage**: Fallback for older browsers
- **CustomEvents**: All modern browsers
- **TypeScript**: Compiled to ES2015+

## Dependencies

- `dexie` - IndexedDB wrapper (already in package.json)
- React 19.0+ (for components)
- TypeScript 5.9+ (for type safety)

## License

MIT License - Part of Pewpi Infinity ecosystem

## Contributing

This is a synthesized library. To improve it:
1. Review implementations across the organization
2. Identify best patterns
3. Update this library
4. Test across all repos

## Support

For issues and questions:
- Check [Integration Guide](./docs/INTEGRATION.md)
- Review source code for implementation details
- Open an issue on the repository
