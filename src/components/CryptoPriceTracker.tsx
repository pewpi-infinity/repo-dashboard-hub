import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Skeleton } from './ui/skeleton'
import { Alert, AlertDescription } from './ui/alert'
import { 
  fetchCryptoPrices, 
  formatPrice, 
  formatPercentage, 
  getPriceChangeColor,
  DEFAULT_CRYPTOS,
  type CryptoPrice 
} from '../lib/crypto-api'
import { TrendingUp, TrendingDown, RefreshCw, Coins } from 'lucide-react'
import { WifiSlash } from '@phosphor-icons/react'
import { useOnlineStatus } from '@/hooks/use-online-status'

interface CryptoPriceTrackerProps {
  compact?: boolean
  showPortfolio?: boolean
  cryptoIds?: string[]
}

export function CryptoPriceTracker({ 
  compact = false, 
  showPortfolio = false,
  cryptoIds = DEFAULT_CRYPTOS 
}: CryptoPriceTrackerProps) {
  const [prices, setPrices] = useState<CryptoPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const { isOnline } = useOnlineStatus()

  const loadPrices = async () => {
    if (!isOnline) {
      setError('Offline - crypto prices unavailable')
      setLoading(false)
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchCryptoPrices(cryptoIds)
      setPrices(data)
      setLastUpdate(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load prices')
      console.error('Error loading crypto prices:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPrices()
    
    // Auto-refresh every 2 minutes
    const interval = setInterval(loadPrices, 120000)
    
    return () => clearInterval(interval)
  }, [cryptoIds])

  if (loading && prices.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            Crypto Prices
          </CardTitle>
          <CardDescription>Loading cryptocurrency prices...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {!isOnline ? <WifiSlash className="w-5 h-5" /> : <Coins className="w-5 h-5" />}
            Crypto Prices
          </CardTitle>
          <CardDescription className="text-destructive">{error}</CardDescription>
        </CardHeader>
        <CardContent>
          {!isOnline ? (
            <Alert className="border-orange bg-orange/10">
              <WifiSlash size={20} className="text-orange" weight="fill" />
              <AlertDescription className="ml-2">
                Cryptocurrency prices require an internet connection. Reconnect to view live prices.
              </AlertDescription>
            </Alert>
          ) : (
            <Button onClick={loadPrices} variant="outline" className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Coins className="w-4 h-4" />
              Crypto Prices
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadPrices}
              disabled={loading}
              className="h-7 w-7 p-0"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          {lastUpdate && (
            <CardDescription className="text-xs">
              Updated {lastUpdate.toLocaleTimeString()}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-2">
          {prices.slice(0, 5).map((crypto) => (
            <div key={crypto.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium">{crypto.symbol.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono">{formatPrice(crypto.current_price)}</span>
                <span className={`text-xs ${getPriceChangeColor(crypto.price_change_percentage_24h)}`}>
                  {formatPercentage(crypto.price_change_percentage_24h)}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Cryptocurrency Tracker
            </CardTitle>
            <CardDescription>
              Real-time prices powered by CoinGecko
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadPrices}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        {lastUpdate && (
          <CardDescription className="text-xs mt-2">
            Last updated: {lastUpdate.toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {prices.map((crypto) => (
            <div
              key={crypto.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold">{crypto.name}</h3>
                  <Badge variant="secondary" className="text-xs">
                    {crypto.symbol.toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    MCap: ${(crypto.market_cap / 1e9).toFixed(2)}B
                  </span>
                  <span>
                    Vol: ${(crypto.total_volume / 1e9).toFixed(2)}B
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold font-mono mb-1">
                  {formatPrice(crypto.current_price)}
                </div>
                <div className={`flex items-center gap-1 justify-end text-sm font-medium ${getPriceChangeColor(crypto.price_change_percentage_24h)}`}>
                  {crypto.price_change_percentage_24h > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {formatPercentage(crypto.price_change_percentage_24h)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
