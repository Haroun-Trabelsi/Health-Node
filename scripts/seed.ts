import 'dotenv/config';

import bcrypt from 'bcryptjs';

import { connectToDatabase } from '../lib/db';
import { DailyMetricModel } from '../models/DailyMetric';
import { UserModel } from '../models/User';

const seed = async () => {
  await connectToDatabase();

  const seedPassword = process.env.SEED_USER_PASSWORD ?? 'Password123!';
  const passwordHash = await bcrypt.hash(seedPassword, 10);

  const user = await UserModel.findOneAndUpdate(
    { email: 'sample@healthnode.dev' },
    {
      name: 'Sample Health Pro',
      goals: ['Sleep 7h', 'Drink 3L water'],
      preferences: {
        unitSystem: 'metric',
        notificationsEnabled: true,
        focusAreas: ['sleep', 'recovery']
      },
      passwordHash
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const today = new Date();
  const sampleMetrics = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - index);
    return {
      user: user._id,
      date,
      weight: 74 + index * 0.2,
      heartRate: 62 + index,
      sleepHours: 7.5 - index * 0.1,
      activityMinutes: 45 + index * 3,
      notes: 'Auto-generated seed metric'
    };
  });

  await DailyMetricModel.deleteMany({ user: user._id });
  await DailyMetricModel.insertMany(sampleMetrics);

  console.log('Seed data generated for', user.email);
  console.log('Use the following credentials to sign in with Credentials provider:');
  console.log(`Email: ${user.email}`);
  console.log(`Password: ${seedPassword}`);
};

seed()
  .catch((error) => {
    console.error('Seed failed', error);
    process.exit(1);
  })
  .finally(() => process.exit(0));
