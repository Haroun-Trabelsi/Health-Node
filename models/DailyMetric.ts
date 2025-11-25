import { Schema, model, models, type Document, type Types } from 'mongoose';

export interface DailyMetricPayload {
  date: Date;
  weight: number;
  heartRate: number;
  sleepHours: number;
  activityMinutes: number;
  notes?: string;
}

export interface IDailyMetric extends Document, DailyMetricPayload {
  user: Types.ObjectId;
}

const DailyMetricSchema = new Schema<IDailyMetric>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    weight: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    sleepHours: { type: Number, required: true },
    activityMinutes: { type: Number, required: true },
    notes: { type: String }
  },
  { timestamps: true }
);

DailyMetricSchema.index({ user: 1, date: -1 }, { unique: true });

export const DailyMetricModel = models.DailyMetric || model<IDailyMetric>('DailyMetric', DailyMetricSchema);

