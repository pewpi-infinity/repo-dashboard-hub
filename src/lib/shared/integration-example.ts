/**
 * Example Integration Demo
 * Shows how other repos can integrate with pewpi-shared-token
 */

import { tokenService } from '@/lib/shared/token-service';
import { authService } from '@/lib/shared/auth-service';
import { integrationService } from '@/lib/shared/integration-listener';

/**
 * Initialize the pewpi-shared-token system
 */
export async function initializePewpiSystem() {
  console.log('🚀 Initializing Pewpi Infinity Token System...');
  
  // Step 1: Initialize auto-tracking for cross-tab/cross-repo sync
  tokenService.initAutoTracking();
  console.log('✅ Token auto-tracking enabled');
  
  // Step 2: Restore authentication session if exists
  const restored = await authService.restoreSession();
  if (restored) {
    const user = await authService.getCurrentUser();
    console.log('✅ Session restored for:', user?.email);
  } else {
    console.log('ℹ️ No existing session found');
  }
  
  // Step 3: Set up integration listeners
  setupIntegrationListeners();
  console.log('✅ Integration listeners configured');
  
  console.log('🎉 Pewpi Infinity Token System ready!');
}

/**
 * Set up integration listeners for this repository
 */
function setupIntegrationListeners() {
  integrationService.register({
    onTokenCreated: (token) => {
      console.log('📈 New token created:', {
        type: token.type,
        amount: token.amount,
        source: token.source,
        description: token.description
      });
      
      // Update UI with new token
      updateUIWithNewToken(token);
      
      // Show notification
      showNotification(`+${token.amount} ${token.type.replace('_tokens', '')} tokens!`);
    },
    
    onTokensCleared: () => {
      console.log('🗑️ All tokens cleared');
      // Reset UI to initial state
      resetUI();
    },
    
    onLoginChanged: (user) => {
      if (user) {
        console.log('👤 User logged in:', user.email);
        // Update auth UI, show user profile, etc.
        showUserProfile(user);
      } else {
        console.log('👋 User logged out');
        // Show login screen
        showLoginScreen();
      }
    }
  });
}

/**
 * Example: Award tokens for repository activity
 */
export async function awardTokensForActivity(
  activityType: string,
  details: any
) {
  let tokenType: string;
  let amount: number;
  let description: string;
  
  switch (activityType) {
    case 'repo-scan':
      tokenType = 'research_tokens';
      amount = details.fileCount * 2;
      description = `Scanned ${details.repoName} (${details.fileCount} files)`;
      break;
      
    case 'commit':
      tokenType = 'infinity_tokens';
      amount = 10;
      description = `Committed to ${details.repoName}`;
      break;
      
    case 'artwork-created':
      tokenType = 'art_tokens';
      amount = 50;
      description = `Created artwork: ${details.title}`;
      break;
      
    case 'song-played':
      tokenType = 'music_tokens';
      amount = Math.floor(details.duration / 30);
      description = `Listened to: ${details.title}`;
      break;
      
    default:
      tokenType = 'infinity_tokens';
      amount = 1;
      description = activityType;
  }
  
  try {
    const token = await tokenService.createToken(
      tokenType,
      amount,
      'repo-dashboard-hub',
      description,
      { activityType, ...details }
    );
    
    console.log('🎁 Awarded tokens:', token);
    return token;
  } catch (error) {
    console.error('Failed to award tokens:', error);
    throw error;
  }
}

/**
 * Example: Check wallet balance before allowing action
 */
export async function checkBalanceForAction(
  requiredType: string,
  requiredAmount: number
): Promise<boolean> {
  const balance = await tokenService.getBalance(requiredType);
  
  if (balance >= requiredAmount) {
    console.log(`✅ Sufficient balance: ${balance} >= ${requiredAmount}`);
    return true;
  } else {
    console.log(`❌ Insufficient balance: ${balance} < ${requiredAmount}`);
    return false;
  }
}

/**
 * Example: Spend tokens for premium action
 */
export async function spendTokensForPremiumFeature(
  featureName: string,
  cost: number,
  tokenType: string = 'infinity_tokens'
) {
  // Check balance first
  const canAfford = await checkBalanceForAction(tokenType, cost);
  if (!canAfford) {
    throw new Error(`Insufficient ${tokenType} balance`);
  }
  
  // Create negative token to deduct balance
  await tokenService.createToken(
    tokenType,
    -cost,
    'repo-dashboard-hub',
    `Used premium feature: ${featureName}`,
    { featureName, cost, type: 'spend' }
  );
  
  console.log(`💰 Spent ${cost} ${tokenType} on ${featureName}`);
}

/**
 * Example: Get wallet summary
 */
export async function getWalletSummary() {
  const balances = await tokenService.getAllBalances();
  const tokens = await tokenService.getAll();
  
  const totalValue = Object.values(balances).reduce((sum, val) => sum + val, 0);
  const recentActivity = tokens.slice(0, 10);
  
  return {
    balances,
    totalValue,
    tokenCount: tokens.length,
    recentActivity
  };
}

/**
 * Example: Export wallet data
 */
export async function exportWalletData() {
  const tokens = await tokenService.getAll();
  const balances = await tokenService.getAllBalances();
  const user = await authService.getCurrentUser();
  
  const exportData = {
    user: user?.email,
    exportDate: new Date().toISOString(),
    balances,
    tokens,
    totalValue: Object.values(balances).reduce((sum, val) => sum + val, 0)
  };
  
  // Convert to JSON and download
  const blob = new Blob([JSON.stringify(exportData, null, 2)], {
    type: 'application/json'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pewpi-wallet-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  console.log('📥 Wallet data exported');
  return exportData;
}

// UI helper stubs (implement based on your UI framework)
function updateUIWithNewToken(token: any) {
  // Update your dashboard, show animation, etc.
}

function showNotification(message: string) {
  // Show toast/notification
  console.log('🔔', message);
}

function resetUI() {
  // Reset wallet UI to initial state
}

function showUserProfile(user: any) {
  // Display user profile in UI
}

function showLoginScreen() {
  // Show login component
}

// Auto-initialize on import (optional)
if (typeof window !== 'undefined') {
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initializePewpiSystem();
    });
  } else {
    initializePewpiSystem();
  }
}
