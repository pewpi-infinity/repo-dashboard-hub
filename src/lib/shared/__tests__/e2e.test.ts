/**
 * E2E test for login and wallet flow
 * Tests magic-link dev-mode login + token creation + wallet feed update
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { authService } from '../auth-service';
import { tokenService } from '../token-service';
import Dexie from 'dexie';

describe('E2E: Login and Wallet Flow', () => {
  beforeEach(async () => {
    // Clear all databases
    const databases = await Dexie.getDatabaseNames();
    for (const dbName of databases) {
      await Dexie.delete(dbName);
    }
    localStorage.clear();
  });

  afterEach(async () => {
    await authService.logout();
    await tokenService.clearAll();
    
    const databases = await Dexie.getDatabaseNames();
    for (const dbName of databases) {
      await Dexie.delete(dbName);
    }
    localStorage.clear();
  });

  it('should complete full user journey: login -> earn tokens -> check wallet', async () => {
    // Step 1: User requests magic link
    const email = 'test@pewpi-infinity.io';
    const magicLinkResult = await authService.requestMagicLink(email);
    
    expect(magicLinkResult.success).toBe(true);
    expect(magicLinkResult.token).toBeDefined();
    
    // Step 2: User verifies magic link (dev mode)
    const verifyResult = await authService.verifyMagicLink(
      email,
      magicLinkResult.token!
    );
    
    expect(verifyResult.success).toBe(true);
    expect(verifyResult.user).toBeDefined();
    expect(verifyResult.user?.email).toBe(email);
    
    // Step 3: Check authentication status
    const isAuth = await authService.isAuthenticated();
    expect(isAuth).toBe(true);
    
    const currentUser = await authService.getCurrentUser();
    expect(currentUser).toBeDefined();
    expect(currentUser?.email).toBe(email);
    
    // Step 4: Earn some tokens (simulating user activities)
    await tokenService.createToken(
      'infinity_tokens',
      100,
      'repo-dashboard-hub',
      'Completed repository scan'
    );
    
    await tokenService.createToken(
      'research_tokens',
      50,
      'infinity-brain-search',
      'Performed research search'
    );
    
    await tokenService.createToken(
      'art_tokens',
      75,
      'banksy',
      'Created artwork'
    );
    
    await tokenService.createToken(
      'music_tokens',
      25,
      'v',
      'Listened to song'
    );
    
    // Step 5: Check wallet balances
    const infinityBalance = await tokenService.getBalance('infinity_tokens');
    expect(infinityBalance).toBe(100);
    
    const researchBalance = await tokenService.getBalance('research_tokens');
    expect(researchBalance).toBe(50);
    
    const artBalance = await tokenService.getBalance('art_tokens');
    expect(artBalance).toBe(75);
    
    const musicBalance = await tokenService.getBalance('music_tokens');
    expect(musicBalance).toBe(25);
    
    // Step 6: Get all balances
    const allBalances = await tokenService.getAllBalances();
    expect(allBalances).toEqual({
      infinity_tokens: 100,
      research_tokens: 50,
      art_tokens: 75,
      music_tokens: 25
    });
    
    // Step 7: Get token history
    const allTokens = await tokenService.getAll();
    expect(allTokens).toHaveLength(4);
    
    // Step 8: Test live feed (event subscription)
    let feedUpdated = false;
    const unsubscribe = tokenService.on('pewpi.token.created', () => {
      feedUpdated = true;
    });
    
    await tokenService.createToken(
      'infinity_tokens',
      10,
      'repo-dashboard-hub',
      'Live feed test'
    );
    
    expect(feedUpdated).toBe(true);
    unsubscribe();
    
    // Step 9: Logout
    await authService.logout();
    
    const isAuthAfterLogout = await authService.isAuthenticated();
    expect(isAuthAfterLogout).toBe(false);
  });

  it('should sync wallet state across sessions', async () => {
    // Create tokens
    await tokenService.createToken(
      'infinity_tokens',
      100,
      'test-repo',
      'Test token'
    );
    
    // Get balances
    const balance1 = await tokenService.getBalance('infinity_tokens');
    expect(balance1).toBe(100);
    
    // Clear service instance (simulating page reload)
    const databases = await Dexie.getDatabaseNames();
    for (const dbName of databases) {
      const db = new Dexie(dbName);
      await db.open();
      await db.close();
    }
    
    // Create new service instance (would happen on page reload)
    const { TokenService } = await import('../token-service');
    const newService = new TokenService();
    
    // Check if data persists
    const balance2 = await newService.getBalance('infinity_tokens');
    expect(balance2).toBe(100);
  });

  it('should handle login state changes via events', async () => {
    let loginEventFired = false;
    let loginEventUser = null;
    
    // Listen for login events
    const handleLoginChange = (event: CustomEvent) => {
      loginEventFired = true;
      loginEventUser = event.detail.user;
    };
    
    window.addEventListener('pewpi.login.changed', handleLoginChange as EventListener);
    
    // Login
    const email = 'event-test@pewpi-infinity.io';
    const magicLinkResult = await authService.requestMagicLink(email);
    await authService.verifyMagicLink(email, magicLinkResult.token!);
    
    // Small delay for event propagation
    await new Promise(resolve => setTimeout(resolve, 10));
    
    expect(loginEventFired).toBe(true);
    expect(loginEventUser).toBeDefined();
    
    window.removeEventListener('pewpi.login.changed', handleLoginChange as EventListener);
  });

  it('should support multiple token types concurrently', async () => {
    // Create multiple tokens of different types concurrently
    await Promise.all([
      tokenService.createToken('infinity_tokens', 10, 'test', 'Token 1'),
      tokenService.createToken('research_tokens', 20, 'test', 'Token 2'),
      tokenService.createToken('art_tokens', 30, 'test', 'Token 3'),
      tokenService.createToken('music_tokens', 40, 'test', 'Token 4'),
    ]);
    
    const allBalances = await tokenService.getAllBalances();
    expect(allBalances.infinity_tokens).toBe(10);
    expect(allBalances.research_tokens).toBe(20);
    expect(allBalances.art_tokens).toBe(30);
    expect(allBalances.music_tokens).toBe(40);
  });
});
