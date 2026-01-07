/**
 * Unit tests for TokenService
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TokenService } from '../token-service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    service = new TokenService();
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('createToken', () => {
    it('should create a token successfully', async () => {
      const token = await service.createToken(
        'infinity_tokens',
        100,
        'test-repo',
        'Test token'
      );

      expect(token).toBeDefined();
      expect(token.type).toBe('infinity_tokens');
      expect(token.amount).toBe(100);
      expect(token.source).toBe('test-repo');
      expect(token.description).toBe('Test token');
      expect(token.timestamp).toBeDefined();
    });

    it('should create a token with metadata', async () => {
      const metadata = { userId: '123', action: 'login' };
      const token = await service.createToken(
        'infinity_tokens',
        50,
        'test-repo',
        'Test token with metadata',
        metadata
      );

      expect(token.metadata).toEqual(metadata);
    });

    it('should update balance after creating token', async () => {
      await service.createToken('infinity_tokens', 100, 'test-repo', 'Token 1');
      await service.createToken('infinity_tokens', 50, 'test-repo', 'Token 2');

      const balance = await service.getBalance('infinity_tokens');
      expect(balance).toBe(150);
    });

    it('should emit token created event', async () => {
      const eventSpy = vi.fn();
      service.on('pewpi.token.created', eventSpy);

      const token = await service.createToken(
        'infinity_tokens',
        100,
        'test-repo',
        'Test token'
      );

      expect(eventSpy).toHaveBeenCalledWith(token);
    });
  });

  describe('getAll', () => {
    it('should return empty array when no tokens exist', async () => {
      const tokens = await service.getAll();
      expect(tokens).toEqual([]);
    });

    it('should return all tokens', async () => {
      await service.createToken('infinity_tokens', 100, 'test-repo', 'Token 1');
      await service.createToken('research_tokens', 50, 'test-repo', 'Token 2');

      const tokens = await service.getAll();
      expect(tokens).toHaveLength(2);
    });

    it('should filter tokens by type', async () => {
      await service.createToken('infinity_tokens', 100, 'test-repo', 'Token 1');
      await service.createToken('research_tokens', 50, 'test-repo', 'Token 2');
      await service.createToken('infinity_tokens', 75, 'test-repo', 'Token 3');

      const infinityTokens = await service.getAll('infinity_tokens');
      expect(infinityTokens).toHaveLength(2);
      expect(infinityTokens.every(t => t.type === 'infinity_tokens')).toBe(true);
    });
  });

  describe('getBalance', () => {
    it('should return 0 for non-existent token type', async () => {
      const balance = await service.getBalance('infinity_tokens');
      expect(balance).toBe(0);
    });

    it('should return correct balance', async () => {
      await service.createToken('infinity_tokens', 100, 'test-repo', 'Token 1');
      await service.createToken('infinity_tokens', 50, 'test-repo', 'Token 2');

      const balance = await service.getBalance('infinity_tokens');
      expect(balance).toBe(150);
    });

    it('should track different token types separately', async () => {
      await service.createToken('infinity_tokens', 100, 'test-repo', 'Token 1');
      await service.createToken('research_tokens', 50, 'test-repo', 'Token 2');

      const infinityBalance = await service.getBalance('infinity_tokens');
      const researchBalance = await service.getBalance('research_tokens');

      expect(infinityBalance).toBe(100);
      expect(researchBalance).toBe(50);
    });
  });

  describe('getAllBalances', () => {
    it('should return empty object when no tokens exist', async () => {
      const balances = await service.getAllBalances();
      expect(balances).toEqual({});
    });

    it('should return all balances', async () => {
      await service.createToken('infinity_tokens', 100, 'test-repo', 'Token 1');
      await service.createToken('research_tokens', 50, 'test-repo', 'Token 2');
      await service.createToken('art_tokens', 75, 'test-repo', 'Token 3');

      const balances = await service.getAllBalances();
      expect(balances).toEqual({
        infinity_tokens: 100,
        research_tokens: 50,
        art_tokens: 75
      });
    });
  });

  describe('clearAll', () => {
    it('should clear all tokens', async () => {
      await service.createToken('infinity_tokens', 100, 'test-repo', 'Token 1');
      await service.createToken('research_tokens', 50, 'test-repo', 'Token 2');

      await service.clearAll();

      const tokens = await service.getAll();
      const balances = await service.getAllBalances();

      expect(tokens).toEqual([]);
      expect(balances).toEqual({});
    });

    it('should emit cleared event', async () => {
      const eventSpy = vi.fn();
      service.on('pewpi.tokens.cleared', eventSpy);

      await service.clearAll();

      expect(eventSpy).toHaveBeenCalled();
    });
  });

  describe('initAutoTracking', () => {
    it('should enable auto-tracking', () => {
      service.initAutoTracking();
      // Auto-tracking should be enabled without errors
    });

    it('should not re-enable if already enabled', () => {
      service.initAutoTracking();
      service.initAutoTracking();
      // Should not throw error
    });
  });

  describe('event subscription', () => {
    it('should allow subscribing to events', () => {
      const callback = vi.fn();
      const unsubscribe = service.on('pewpi.token.created', callback);

      expect(typeof unsubscribe).toBe('function');
    });

    it('should unsubscribe from events', async () => {
      const callback = vi.fn();
      const unsubscribe = service.on('pewpi.token.created', callback);

      await service.createToken('infinity_tokens', 100, 'test-repo', 'Token');
      expect(callback).toHaveBeenCalledTimes(1);

      unsubscribe();

      await service.createToken('infinity_tokens', 50, 'test-repo', 'Token 2');
      expect(callback).toHaveBeenCalledTimes(1); // Should not be called again
    });
  });
});
