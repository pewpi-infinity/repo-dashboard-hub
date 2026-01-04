import { useState, useEffect } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Badge } from './ui/badge'
import { PencilSimple, Check, X, Lock, LockOpen, TrendUp, TrendDown } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { fetchCryptoPrices, formatPrice, type CryptoPrice } from '../lib/crypto-api'

interface SilverPriceDisplayProps {
  compact?: boolean
}

export function SilverPriceDisplay({ compact = false }: SilverPriceDisplayProps) {
  const [silverPrice, setSilverPrice] = useKV('truvio-silver-price', '32.45')
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(silverPrice || '32.45')
  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)
  const [previousPrice, setPreviousPrice] = useState<string | null>(null)
  const [cryptoPrices, setCryptoPrices] = useState<CryptoPrice[]>([])
  const [cryptoLoading, setCryptoLoading] = useState(true)

  const currentPrice = silverPrice || '32.45'

  useEffect(() => {
    const checkOwnership = async () => {
      try {
        if (!window.spark || typeof window.spark.user !== 'function') {
          console.warn('Spark user API not available')
          setIsOwner(false)
          setLoading(false)
          return
        }
        const user = await window.spark.user()
        setIsOwner(user?.isOwner || false)
      } catch (error) {
        console.error('Failed to check user ownership:', error)
        setIsOwner(false)
      } finally {
        setLoading(false)
      }
    }

    checkOwnership()
  }, [])

  useEffect(() => {
    const loadCryptoPrices = async () => {
      try {
        const prices = await fetchCryptoPrices(['bitcoin', 'ethereum', 'cardano'])
        setCryptoPrices(prices)
      } catch (error) {
        console.error('Failed to load crypto prices:', error)
      } finally {
        setCryptoLoading(false)
      }
    }

    loadCryptoPrices()
    // Refresh every 2 minutes
    const interval = setInterval(loadCryptoPrices, 120000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setEditValue(currentPrice)
  }, [currentPrice])

  const handleEdit = () => {
    if (!isOwner) {
      toast.error('Access Denied', {
        description: 'Only the device owner can edit the silver price.'
      })
      return
    }
    setIsEditing(true)
  }

  const handleSave = () => {
    const numValue = parseFloat(editValue)
    if (isNaN(numValue) || numValue <= 0) {
      toast.error('Invalid Price', {
        description: 'Please enter a valid price greater than 0.'
      })
      return
    }

    setPreviousPrice(currentPrice)
    setSilverPrice(editValue)
    setIsEditing(false)
    
    toast.success('Silver Price Updated', {
      description: `True silver price set to $${editValue}/oz`,
      duration: 3000
    })
  }

  const handleCancel = () => {
    setEditValue(currentPrice)
    setIsEditing(false)
  }

  const priceChange = previousPrice && currentPrice
    ? ((parseFloat(currentPrice) - parseFloat(previousPrice)) / parseFloat(previousPrice) * 100).toFixed(2)
    : null

  const priceUp = priceChange && parseFloat(priceChange) > 0
  const priceDown = priceChange && parseFloat(priceChange) < 0

  if (loading) {
    return (
      <Card className="p-4 bg-gradient-to-br from-gold/20 via-yellow/10 to-gold/20 backdrop-blur-sm border-gold/30 animate-pulse">
        <div className="h-16 bg-muted/20 rounded"></div>
      </Card>
    )
  }

  if (compact) {
    return (
      <Card className="p-3 bg-gradient-to-br from-gold/20 via-yellow/10 to-gold/20 backdrop-blur-sm border-gold/30">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground mb-1">True Silver Price</div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                ${currentPrice}
              </span>
              <span className="text-xs text-muted-foreground">/oz</span>
            </div>
          </div>
          {isOwner && !isEditing && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEdit}
              className="h-8 w-8 p-0 text-gold hover:text-gold hover:bg-gold/10"
            >
              <PencilSimple size={14} />
            </Button>
          )}
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-gold/20 via-yellow/10 to-gold/20 backdrop-blur-sm border-gold/30 glow-border-accent">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-gold mb-1 flex items-center gap-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            💰 Truvio Studios Treasury
          </h3>
          <p className="text-xs text-muted-foreground">True Silver Price - Unmanipulated Value</p>
        </div>
        <Badge variant="outline" className="bg-gold/20 border-gold/30 text-gold">
          {isOwner ? (
            <>
              <LockOpen size={12} className="mr-1" />
              Owner
            </>
          ) : (
            <>
              <Lock size={12} className="mr-1" />
              View Only
            </>
          )}
        </Badge>
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gold">$</span>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="text-2xl font-bold bg-background/50 border-gold/30 text-gold"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
                autoFocus
              />
              <span className="text-sm text-muted-foreground">/oz</span>
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleSave}
                className="flex-1 gap-2 bg-gradient-to-r from-gold to-yellow hover:from-gold/90 hover:to-yellow/90"
              >
                <Check size={16} weight="bold" />
                Save Price
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCancel}
                className="gap-2"
              >
                <X size={16} weight="bold" />
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="display"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-5xl font-bold text-gold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                ${currentPrice}
              </span>
              <span className="text-lg text-muted-foreground">/oz</span>
            </div>

            {priceChange && (
              <div className={`flex items-center gap-2 text-sm mb-4 ${priceUp ? 'text-green' : priceDown ? 'text-red' : 'text-muted-foreground'}`}>
                {priceUp ? <TrendUp size={16} weight="bold" /> : priceDown ? <TrendDown size={16} weight="bold" /> : null}
                <span className="font-bold">
                  {priceUp ? '+' : ''}{priceChange}%
                </span>
                <span className="text-muted-foreground text-xs">
                  from ${previousPrice}
                </span>
              </div>
            )}

            <div className="space-y-2 text-xs text-muted-foreground">
              <p>🏦 <strong className="text-foreground">Real Value:</strong> This represents the true, unmanipulated market value of silver</p>
              <p>🎬 <strong className="text-foreground">Truvio Studios:</strong> Media production meets precious metal treasury tracking</p>
              {isOwner && (
                <p className="pt-2 border-t border-border/30">
                  🔐 <strong className="text-gold">Owner Access:</strong> You can edit the presentation logic for accurate price display
                </p>
              )}
            </div>

            {isOwner && (
              <Button
                size="sm"
                onClick={handleEdit}
                className="w-full mt-4 gap-2 bg-gradient-to-r from-gold to-yellow hover:from-gold/90 hover:to-yellow/90"
              >
                <PencilSimple size={16} weight="bold" />
                Edit Silver Price
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 pt-4 border-t border-border/30">
        <div className="grid grid-cols-3 gap-3 text-center">
          {cryptoLoading ? (
            <>
              <div>
                <div className="text-xs text-muted-foreground mb-1">BTC</div>
                <div className="text-sm font-bold text-yellow">Loading...</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">ETH</div>
                <div className="text-sm font-bold text-blue">Loading...</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">ADA</div>
                <div className="text-sm font-bold text-purple">Loading...</div>
              </div>
            </>
          ) : cryptoPrices.length > 0 ? (
            <>
              {cryptoPrices[0] && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Bitcoin</div>
                  <div className="text-sm font-bold text-yellow">{formatPrice(cryptoPrices[0].current_price)}</div>
                  <div className={`text-xs ${cryptoPrices[0].price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'}`}>
                    {cryptoPrices[0].price_change_percentage_24h >= 0 ? '+' : ''}{cryptoPrices[0].price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              )}
              {cryptoPrices[1] && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Ethereum</div>
                  <div className="text-sm font-bold text-blue">{formatPrice(cryptoPrices[1].current_price)}</div>
                  <div className={`text-xs ${cryptoPrices[1].price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'}`}>
                    {cryptoPrices[1].price_change_percentage_24h >= 0 ? '+' : ''}{cryptoPrices[1].price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              )}
              {cryptoPrices[2] && (
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Cardano</div>
                  <div className="text-sm font-bold text-purple">{formatPrice(cryptoPrices[2].current_price)}</div>
                  <div className={`text-xs ${cryptoPrices[2].price_change_percentage_24h >= 0 ? 'text-green' : 'text-red'}`}>
                    {cryptoPrices[2].price_change_percentage_24h >= 0 ? '+' : ''}{cryptoPrices[2].price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Gold</div>
                <div className="text-sm font-bold text-yellow">$2,045</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Platinum</div>
                <div className="text-sm font-bold text-blue">$925</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Palladium</div>
                <div className="text-sm font-bold text-purple">$1,015</div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
