/**
 * Wallet Display Component
 * Part of pewpi-shared system - lightweight, opt-in UI
 * 
 * Features:
 * - Shows all token balances
 * - Listens to pewpi.token.created events and updates automatically
 * - Cross-tab sync support
 * - Only shows when user is authenticated
 */

import { useState, useEffect } from 'react';
import { getAllBalances } from '../wallet-unified';
import { authService } from '../auth-service';
import { tokenService } from '../token-service';

interface WalletDisplayProps {
  compact?: boolean;
  showTotal?: boolean;
  className?: string;
}

export function WalletDisplay({ 
  compact = false, 
  showTotal = false,
  className = ''
}: WalletDisplayProps) {
  const [balances, setBalances] = useState<Record<string, number>>({
    infinity_tokens: 0,
    research_tokens: 0,
    art_tokens: 0,
    music_tokens: 0
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updateBalances = async () => {
    try {
      const authenticated = await authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        const newBalances = await getAllBalances();
        setBalances(newBalances);
      } else {
        setBalances({
          infinity_tokens: 0,
          research_tokens: 0,
          art_tokens: 0,
          music_tokens: 0
        });
      }
    } catch (error) {
      console.error('Failed to update balances:', error);
    }
  };

  useEffect(() => {
    updateBalances();
    
    // Listen for token events
    const unsubscribeCreated = tokenService.on('pewpi.token.created', updateBalances);
    const unsubscribeUpdated = tokenService.on('pewpi.token.updated', updateBalances);
    const unsubscribeDeleted = tokenService.on('pewpi.token.deleted', updateBalances);
    const unsubscribeCleared = tokenService.on('pewpi.tokens.cleared', updateBalances);

    // Listen for login events
    const handleLoginChange = () => {
      updateBalances();
    };
    window.addEventListener('pewpi.login.changed', handleLoginChange);

    // Listen for storage changes (cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === 'pewpi_balances' || 
        e.key === 'pewpi_unified_auth' ||
        e.key?.startsWith('pewpi_event_')
      ) {
        updateBalances();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Poll for updates every 10 seconds as fallback
    const interval = setInterval(updateBalances, 10000);
    
    return () => {
      unsubscribeCreated();
      unsubscribeUpdated();
      unsubscribeDeleted();
      unsubscribeCleared();
      window.removeEventListener('pewpi.login.changed', handleLoginChange);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  const totalBalance = Object.values(balances).reduce((sum, val) => sum + (val || 0), 0);

  if (compact) {
    return (
      <div className={`pewpi-wallet-display compact ${className}`}>
        <span className="pewpi-wallet-total" title="Total Tokens">
          💎 {totalBalance}
        </span>
      </div>
    );
  }

  return (
    <div className={`pewpi-wallet-display ${className}`}>
      <div className="pewpi-wallet-item" title="Infinity Tokens">
        <span className="pewpi-wallet-icon">💎</span>
        <span className="pewpi-wallet-amount">{balances.infinity_tokens || 0}</span>
      </div>
      <div className="pewpi-wallet-item" title="Research Tokens">
        <span className="pewpi-wallet-icon">📚</span>
        <span className="pewpi-wallet-amount">{balances.research_tokens || 0}</span>
      </div>
      <div className="pewpi-wallet-item" title="Art Tokens">
        <span className="pewpi-wallet-icon">🎨</span>
        <span className="pewpi-wallet-amount">{balances.art_tokens || 0}</span>
      </div>
      <div className="pewpi-wallet-item" title="Music Tokens">
        <span className="pewpi-wallet-icon">🎵</span>
        <span className="pewpi-wallet-amount">{balances.music_tokens || 0}</span>
      </div>
      {showTotal && (
        <div className="pewpi-wallet-item total" title="Total Tokens">
          <span className="pewpi-wallet-icon">💰</span>
          <span className="pewpi-wallet-amount">{totalBalance}</span>
        </div>
      )}
    </div>
  );
}

export default WalletDisplay;
