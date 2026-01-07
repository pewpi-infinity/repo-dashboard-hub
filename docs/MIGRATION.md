# Migration & Rollback Guide

## Migration from Old System

### Pre-Migration Checklist

- [ ] Backup all existing user data
- [ ] Backup all existing token/wallet data
- [ ] Review current authentication flow
- [ ] Review current token management logic
- [ ] Test the new system in development environment
- [ ] Communicate changes to users

### Step 1: Install Dependencies

```bash
npm install dexie fake-indexeddb
npm install --save-dev vitest @vitest/ui happy-dom
```

### Step 2: Copy Shared Files

Copy the following directory structure to your project:

```
src/lib/shared/
├── token-service.ts
├── auth-service.ts
├── client-model.ts
├── crypto-helpers.ts
├── integration-listener.ts
├── peer-sync.ts
└── theme.css

src/components/
├── Login.tsx
└── Wallet.tsx
```

### Step 3: Update Package.json Scripts

Add test scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Step 4: Migrate User Authentication

If you have existing users, migrate them to the new auth system:

```typescript
import { authService } from '@/lib/shared/auth-service';

async function migrateUsers(oldUsers: Array<OldUser>) {
  for (const oldUser of oldUsers) {
    try {
      // Request magic link for user
      const result = await authService.requestMagicLink(oldUser.email);
      
      if (result.success) {
        // In migration mode, you might auto-verify
        await authService.verifyMagicLink(oldUser.email, result.token!);
        console.log(`✅ Migrated user: ${oldUser.email}`);
      }
    } catch (error) {
      console.error(`❌ Failed to migrate user: ${oldUser.email}`, error);
    }
  }
}
```

### Step 5: Migrate Token Data

If you have existing token/wallet data:

```typescript
import { tokenService } from '@/lib/shared/token-service';

async function migrateTokens(oldTokenData: Array<OldToken>) {
  for (const oldToken of oldTokenData) {
    try {
      // Map old token structure to new structure
      await tokenService.createToken(
        mapTokenType(oldToken.type),
        oldToken.amount,
        'migration',
        `Migrated from old system: ${oldToken.description}`,
        {
          originalId: oldToken.id,
          migrationDate: Date.now(),
          ...oldToken.metadata
        }
      );
      console.log(`✅ Migrated token: ${oldToken.id}`);
    } catch (error) {
      console.error(`❌ Failed to migrate token: ${oldToken.id}`, error);
    }
  }
}

function mapTokenType(oldType: string): string {
  const typeMap: Record<string, string> = {
    'infinity': 'infinity_tokens',
    'research': 'research_tokens',
    'art': 'art_tokens',
    'music': 'music_tokens'
  };
  return typeMap[oldType] || 'infinity_tokens';
}
```

### Step 6: Update Application Code

Replace old authentication calls:

```typescript
// Old
import { signIn, signOut } from './old-auth';
await signIn(username, password);
await signOut();

// New
import { authService } from '@/lib/shared/auth-service';
const result = await authService.requestMagicLink(email);
await authService.verifyMagicLink(email, result.token!);
await authService.logout();
```

Replace old wallet calls:

```typescript
// Old
import { earnTokens, getBalance } from './old-wallet';
await earnTokens('infinity', 100);
const balance = getBalance('infinity');

// New
import { tokenService } from '@/lib/shared/token-service';
await tokenService.createToken('infinity_tokens', 100, 'source', 'description');
const balance = await tokenService.getBalance('infinity_tokens');
```

### Step 7: Update UI Components

Replace old login/wallet components:

```typescript
// Old
import { OldLogin } from './components/OldLogin';
<OldLogin onSuccess={handleLogin} />

// New
import { Login } from '@/components/Login';
<Login onSuccess={handleLogin} showGitHubOption={true} />
```

### Step 8: Set Up Event Listeners

Add integration listeners for cross-repo sync:

```typescript
import { integrationService } from '@/lib/shared/integration-listener';

integrationService.register({
  onTokenCreated: (token) => {
    // Update UI
  },
  onLoginChanged: (user) => {
    // Update auth state
  }
});
```

### Step 9: Testing

Run comprehensive tests before deploying:

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Manual testing
npm run dev
```

Test scenarios:
- [ ] New user registration with magic link
- [ ] Existing user login
- [ ] Token creation and balance updates
- [ ] Cross-tab synchronization
- [ ] Logout and session cleanup
- [ ] Data persistence after page reload

### Step 10: Deploy

1. Deploy to staging environment first
2. Run smoke tests
3. Monitor error logs
4. Deploy to production with gradual rollout
5. Monitor user feedback

## Rollback Procedure

If issues arise, follow these steps to rollback:

### Step 1: Backup New Data

Before rolling back, backup data from the new system:

```typescript
import { tokenService } from '@/lib/shared/token-service';
import { authService } from '@/lib/shared/auth-service';

// Export all tokens
const tokens = await tokenService.getAll();
const balances = await tokenService.getAllBalances();

// Export user data
const user = await authService.getCurrentUser();

// Save to backup
const backup = {
  tokens,
  balances,
  user,
  timestamp: Date.now()
};

localStorage.setItem('pewpi_rollback_backup', JSON.stringify(backup));
console.log('✅ Backup created');
```

### Step 2: Remove New Files

```bash
# Remove shared library
rm -rf src/lib/shared/

# Remove new components
rm src/components/Login.tsx
rm src/components/Wallet.tsx

# Remove tests
rm -rf src/lib/shared/__tests__/
rm vitest.config.ts

# Remove docs
rm docs/INTEGRATION.md
rm docs/QUICKREF.md
rm docs/APP_EXAMPLE.tsx
rm docs/MIGRATION.md
```

### Step 3: Uninstall Dependencies

```bash
npm uninstall dexie fake-indexeddb vitest @vitest/ui happy-dom
```

### Step 4: Restore Old Code

```bash
# Checkout previous commit (before migration)
git checkout <previous-commit-hash> -- src/

# Or restore from backup
cp -r backup/src/* src/
```

### Step 5: Restore Old Package.json

Remove the test scripts added during migration:

```json
{
  "scripts": {
    // Remove these
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Step 6: Import Backup Data

If you need to import the backed-up data into the old system:

```typescript
// Load backup
const backupStr = localStorage.getItem('pewpi_rollback_backup');
const backup = JSON.parse(backupStr);

// Import into old system
await importToOldSystem(backup.tokens, backup.balances, backup.user);
```

### Step 7: Test Rollback

- [ ] Verify old authentication works
- [ ] Verify old wallet functionality works
- [ ] Check that no data was lost
- [ ] Verify all features are functional

### Step 8: Clear New System Data

Clean up IndexedDB databases:

```typescript
// In browser console
const databases = await indexedDB.databases();
for (const db of databases) {
  if (db.name?.startsWith('Pewpi')) {
    indexedDB.deleteDatabase(db.name);
  }
}

// Clear localStorage
localStorage.removeItem('pewpi_auth_session');
localStorage.removeItem('pewpi_tokens');
localStorage.removeItem('pewpi_balances');
```

### Step 9: Deploy Rollback

1. Deploy rolled-back code to staging
2. Verify rollback is successful
3. Deploy to production
4. Monitor for issues

## Post-Rollback

### Analyze Issues

Document what went wrong:
- What issues caused the rollback?
- Which components failed?
- What can be improved?

### Plan Next Attempt

If rolling back due to bugs:
1. Fix identified issues
2. Add more tests
3. Expand staging testing period
4. Plan gradual rollout strategy

## Gradual Migration Strategy

For large user bases, consider a gradual migration:

### Phase 1: Parallel Systems (Week 1-2)

- Keep old system active
- Deploy new system alongside
- Allow users to opt-in to new system
- Monitor both systems

### Phase 2: Soft Launch (Week 3-4)

- Enable new system for 10% of users
- Monitor metrics and feedback
- Fix any issues discovered

### Phase 3: Expanded Rollout (Week 5-6)

- Enable for 50% of users
- Continue monitoring
- Address feedback

### Phase 4: Full Migration (Week 7-8)

- Enable for 100% of users
- Keep old system as backup
- Monitor for 2 weeks

### Phase 5: Deprecate Old System (Week 9+)

- Remove old system code
- Clean up old data
- Complete migration

## Support

For migration assistance:
- Check [INTEGRATION.md](./INTEGRATION.md)
- Check [QUICKREF.md](./QUICKREF.md)
- Review [APP_EXAMPLE.tsx](./APP_EXAMPLE.tsx)
- Open GitHub issue if needed
