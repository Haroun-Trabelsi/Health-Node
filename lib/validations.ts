import { z } from 'zod';

export const objectIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid object id');

export const userPreferencesSchema = z.object({
  unitSystem: z.enum(['metric', 'imperial']).default('metric'),
  notificationsEnabled: z.boolean().default(true),
  focusAreas: z.array(z.string()).default([])
});

export const userProfileSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  image: z.string().url().optional(),
  goals: z.array(z.string()).default([]),
  preferences: userPreferencesSchema
});

export const dailyMetricSchema = z.object({
  date: z.string().or(z.date()).transform((value) => new Date(value)),
  weight: z.number().min(0),
  heartRate: z.number().min(0),
  sleepHours: z.number().min(0),
  activityMinutes: z.number().min(0),
  notes: z.string().max(500).optional()
});

export type UserPreferencesInput = z.infer<typeof userPreferencesSchema>;
export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type DailyMetricInput = z.infer<typeof dailyMetricSchema>;

