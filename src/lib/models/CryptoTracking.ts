import mongoose, { Schema, Document } from 'mongoose'

export interface ICryptoTracking extends Document {
  symbol: string
  name: string
  price_usd: number
  price_change_24h: number
  market_cap?: number
  volume_24h?: number
  last_updated: Date
  user_holdings?: number
}

const CryptoTrackingSchema: Schema = new Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    price_usd: {
      type: Number,
      required: true,
      min: 0,
    },
    price_change_24h: {
      type: Number,
      default: 0,
    },
    market_cap: {
      type: Number,
      min: 0,
    },
    volume_24h: {
      type: Number,
      min: 0,
    },
    last_updated: {
      type: Date,
      default: Date.now,
      index: true,
    },
    user_holdings: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for efficient querying
CryptoTrackingSchema.index({ last_updated: -1 })
CryptoTrackingSchema.index({ symbol: 1 })

export default mongoose.models.CryptoTracking ||
  mongoose.model<ICryptoTracking>('CryptoTracking', CryptoTrackingSchema)
