import { z } from 'zod';

const envSchema = z.object({
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_TRUST_HOST: z.string().optional(),
  MONGODB_URI: z.string().min(1),
  MONGODB_DB_NAME: z.string().default('health-node'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  SENTRY_ENVIRONMENT: z.string().default('local')
});

export const appConfig = envSchema.parse(process.env);

