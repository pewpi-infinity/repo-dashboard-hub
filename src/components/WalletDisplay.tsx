import { useState, useEffect } from 'react'
import { getAllBalances, updateWallet } from '@/lib/wallet-unified.js'
import { isAuthenticated } from '@/lib/auth-unified.js'

export function WalletDisplay() {
  const [balances, setBalances] = useState({
    infinity_tokens: 0,
    research_tokens: 0,
    art_tokens: 0,
    music_tokens: 0
  })

  const updateBalances = () => {
    if (isAuthenticated()) {
      const newBalances = getAllBalances()
      setBalances(newBalances)
    } else {
      setBalances({
        infinity_tokens: 0,
        research_tokens: 0,
        art_tokens: 0,
        music_tokens: 0
      })
    }
  }

  useEffect(() => {
    updateBalances()
    
    // Listen for storage changes (cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pewpi_unified_wallet' || e.key === 'pewpi_unified_auth') {
        updateBalances()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Poll for updates every 5 seconds to reduce load
    const interval = setInterval(updateBalances, 5000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  if (!isAuthenticated()) {
    return null
  }

  return (
    <div className="wallet-display">
      <span title="Infinity Tokens" className="wallet-item">
        💎 {balances.infinity_tokens || 0}
      </span>
      <span title="Research Tokens" className="wallet-item">
        📚 {balances.research_tokens || 0}
      </span>
      <span title="Art Tokens" className="wallet-item">
        🎨 {balances.art_tokens || 0}
      </span>
      <span title="Music Tokens" className="wallet-item">
        🎵 {balances.music_tokens || 0}
      </span>
    </div>
  )
}
