import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IActivity extends Document {
  repo_id: Types.ObjectId
  event_type: string
  timestamp: Date
  details: Record<string, any>
}

const ActivitySchema: Schema = new Schema(
  {
    repo_id: {
      type: Schema.Types.ObjectId,
      ref: 'Repository',
      required: true,
      index: true,
    },
    event_type: {
      type: String,
      required: true,
      enum: [
        'push',
        'pull_request',
        'issue',
        'commit',
        'release',
        'fork',
        'star',
        'sync',
        'file_change',
        'health_check',
        'other',
      ],
      index: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    details: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
)

// Create compound indexes for efficient querying
ActivitySchema.index({ repo_id: 1, timestamp: -1 })
ActivitySchema.index({ event_type: 1, timestamp: -1 })
ActivitySchema.index({ timestamp: -1 })

export default mongoose.models.Activity ||
  mongoose.model<IActivity>('Activity', ActivitySchema)
