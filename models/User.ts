import { Schema, model, models, type Document } from 'mongoose';

export interface UserPreferences {
  unitSystem: 'metric' | 'imperial';
  notificationsEnabled: boolean;
  focusAreas: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  image?: string;
  goals?: string[];
  preferences: UserPreferences;
}

export interface IUser extends Document, UserProfile {
  provider: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: String,
    goals: { type: [String], default: [] },
    preferences: {
      unitSystem: { type: String, enum: ['metric', 'imperial'], default: 'metric' },
      notificationsEnabled: { type: Boolean, default: true },
      focusAreas: { type: [String], default: [] }
    },
    provider: { type: String, default: 'google' }
  },
  { timestamps: true }
);

export const UserModel = models.User || model<IUser>('User', UserSchema);

