import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IFile extends Document {
  repo_id: Types.ObjectId
  path: string
  filename: string
  content_hash: string
  size: number
  language?: string
  last_updated: Date
  content_preview?: string
}

const FileSchema: Schema = new Schema(
  {
    repo_id: {
      type: Schema.Types.ObjectId,
      ref: 'Repository',
      required: true,
      index: true,
    },
    path: {
      type: String,
      required: true,
      index: true,
    },
    filename: {
      type: String,
      required: true,
      index: true,
    },
    content_hash: {
      type: String,
      required: true,
      index: true,
    },
    size: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      index: true,
    },
    last_updated: {
      type: Date,
      default: Date.now,
      index: true,
    },
    content_preview: {
      type: String,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
)

// Create compound indexes for efficient querying
FileSchema.index({ repo_id: 1, path: 1 }, { unique: true })
FileSchema.index({ repo_id: 1, last_updated: -1 })
FileSchema.index({ content_hash: 1 })

export default mongoose.models.File ||
  mongoose.model<IFile>('File', FileSchema)
