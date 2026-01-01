/**
 * Crypto API integration using CoinGecko free tier
 * Rate limit: 10-50 requests/minute (free tier)
 */

export interface CryptoPrice {
  id: string
  symbol: string
  name: string
  current_price: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  high_24h: number
  low_24h: number
  last_updated: string
}

export interface CryptoChartData {
  prices: [number, number][] // [timestamp, price]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3'

// Default crypto symbols to track
export const DEFAULT_CRYPTOS = [
  'bitcoin',
  'ethereum',
  'cardano',
  'solana',
  'polkadot',
  'chainlink',
  'litecoin',
  'stellar',
  'dogecoin',
]

// Cache for API responses
interface CacheEntry {
  data: any
  timestamp: number
}

const cache = new Map<string, CacheEntry>()
const CACHE_DURATION = 60 * 1000 // 1 minute

/**
 * Get cached data or null if expired/not found
 */
function getCached<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null
  
  const isExpired = Date.now() - entry.timestamp > CACHE_DURATION
  if (isExpired) {
    cache.delete(key)
    return null
  }
  
  return entry.data as T
}

/**
 * Set cached data
 */
function setCache(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  })
}

/**
 * Fetch current prices for multiple cryptocurrencies
 */
export async function fetchCryptoPrices(
  ids: string[] = DEFAULT_CRYPTOS
): Promise<CryptoPrice[]> {
  const cacheKey = `prices_${ids.join(',')}`
  const cached = getCached<CryptoPrice[]>(cacheKey)
  if (cached) return cached
  
  try {
    const idsParam = ids.join(',')
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?` +
        `vs_currency=usd&` +
        `ids=${idsParam}&` +
        `order=market_cap_desc&` +
        `per_page=${ids.length}&` +
        `page=1&` +
        `sparkline=false&` +
        `price_change_percentage=24h`
    )
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }
    
    const data: CryptoPrice[] = await response.json()
    setCache(cacheKey, data)
    return data
  } catch (error) {
    console.error('Error fetching crypto prices:', error)
    throw error
  }
}

/**
 * Fetch price for a single cryptocurrency
 */
export async function fetchCryptoPrice(id: string): Promise<CryptoPrice> {
  const prices = await fetchCryptoPrices([id])
  if (prices.length === 0) {
    throw new Error(`Cryptocurrency not found: ${id}`)
  }
  return prices[0]
}

/**
 * Fetch historical price data for charts
 */
export async function fetchCryptoChart(
  id: string,
  days: number = 7
): Promise<CryptoChartData> {
  const cacheKey = `chart_${id}_${days}`
  const cached = getCached<CryptoChartData>(cacheKey)
  if (cached) return cached
  
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${id}/market_chart?` +
        `vs_currency=usd&` +
        `days=${days}&` +
        `interval=daily`
    )
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }
    
    const data: CryptoChartData = await response.json()
    setCache(cacheKey, data)
    return data
  } catch (error) {
    console.error('Error fetching crypto chart:', error)
    throw error
  }
}

/**
 * Search for cryptocurrencies
 */
export async function searchCrypto(query: string): Promise<any[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/search?query=${encodeURIComponent(query)}`
    )
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`)
    }
    
    const data = await response.json()
    return data.coins || []
  } catch (error) {
    console.error('Error searching crypto:', error)
    throw error
  }
}

/**
 * Calculate portfolio value
 */
export interface PortfolioHolding {
  id: string
  symbol: string
  amount: number
}

export interface PortfolioValue {
  holdings: PortfolioHolding[]
  prices: Map<string, number>
  totalValue: number
  breakdown: Array<{
    id: string
    symbol: string
    amount: number
    value: number
    percentage: number
  }>
}

export async function calculatePortfolioValue(
  holdings: PortfolioHolding[]
): Promise<PortfolioValue> {
  if (holdings.length === 0) {
    return {
      holdings: [],
      prices: new Map(),
      totalValue: 0,
      breakdown: [],
    }
  }
  
  // Fetch prices for all holdings
  const ids = holdings.map((h) => h.id)
  const prices = await fetchCryptoPrices(ids)
  const priceMap = new Map<string, number>()
  
  prices.forEach((p) => {
    priceMap.set(p.id, p.current_price)
  })
  
  // Calculate values
  let totalValue = 0
  const breakdown = holdings.map((holding) => {
    const price = priceMap.get(holding.id) || 0
    const value = holding.amount * price
    totalValue += value
    
    return {
      id: holding.id,
      symbol: holding.symbol,
      amount: holding.amount,
      value,
      percentage: 0, // Will be calculated after we know total
    }
  })
  
  // Calculate percentages
  breakdown.forEach((item) => {
    item.percentage = totalValue > 0 ? (item.value / totalValue) * 100 : 0
  })
  
  return {
    holdings,
    prices: priceMap,
    totalValue,
    breakdown,
  }
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  if (price >= 1000) {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  } else if (price >= 1) {
    return `$${price.toFixed(2)}`
  } else if (price >= 0.01) {
    return `$${price.toFixed(4)}`
  } else {
    return `$${price.toFixed(8)}`
  }
}

/**
 * Format percentage change
 */
export function formatPercentage(change: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(2)}%`
}

/**
 * Get color for price change
 */
export function getPriceChangeColor(change: number): string {
  if (change > 0) return 'text-green'
  if (change < 0) return 'text-red'
  return 'text-muted-foreground'
}
