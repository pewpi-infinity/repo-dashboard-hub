import mongoose, { Schema, Document } from 'mongoose'

export interface IRepository extends Document {
  github_id: number
  name: string
  owner: string
  full_name: string
  description?: string
  url: string
  language?: string
  stars: number
  forks: number
  last_sync: Date
  health_score: number
  file_count: number
  created_at: Date
  updated_at: Date
}

const RepositorySchema: Schema = new Schema(
  {
    github_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      index: true,
    },
    owner: {
      type: String,
      required: true,
      index: true,
    },
    full_name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      index: true,
    },
    stars: {
      type: Number,
      default: 0,
      index: true,
    },
    forks: {
      type: Number,
      default: 0,
    },
    last_sync: {
      type: Date,
      default: Date.now,
      index: true,
    },
    health_score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    file_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Create indexes for efficient querying
RepositorySchema.index({ owner: 1, name: 1 })
RepositorySchema.index({ last_sync: -1 })
RepositorySchema.index({ health_score: -1 })

export default mongoose.models.Repository ||
  mongoose.model<IRepository>('Repository', RepositorySchema)
