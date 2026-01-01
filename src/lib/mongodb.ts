import mongoose from 'mongoose'

// MongoDB connection string from environment variable
// Direct client-side connection for automated multi-repo systems
// Designed to work with automatic token management and credential rotation
const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || ''

if (!MONGODB_URI && typeof window === 'undefined') {
  console.warn(
    'MongoDB connection is disabled. To enable, define VITE_MONGODB_URI in .env'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

/**
 * Connect to MongoDB database
 * @returns {Promise<typeof mongoose>} Mongoose instance
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the VITE_MONGODB_URI environment variable inside .env'
    )
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ Connected to MongoDB')
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('❌ MongoDB connection error:', e)
    throw e
  }

  return cached.conn
}

/**
 * Disconnect from MongoDB database
 */
export async function disconnectFromDatabase(): Promise<void> {
  if (cached.conn) {
    await mongoose.disconnect()
    cached.conn = null
    cached.promise = null
    console.log('🔌 Disconnected from MongoDB')
  }
}

/**
 * Check if connected to MongoDB
 */
export function isConnected(): boolean {
  return cached.conn !== null && mongoose.connection.readyState === 1
}
