import { connectToDatabase } from '@/lib/db';
import { DailyMetricModel, type DailyMetricPayload, type IDailyMetric } from '@/models/DailyMetric';

export const dailyMetricRepository = {
  async findByUser(userId: string) {
    await connectToDatabase();
    return DailyMetricModel.find({ user: userId }).sort({ date: -1 }).lean<IDailyMetric[]>().exec();
  },

  async findRecentByUser(userId: string, limit = 30) {
    await connectToDatabase();
    return DailyMetricModel.find({ user: userId }).sort({ date: -1 }).limit(limit).lean<IDailyMetric[]>().exec();
  },

  async findById(metricId: string, userId: string) {
    await connectToDatabase();
    return DailyMetricModel.findOne({ _id: metricId, user: userId }).lean<IDailyMetric | null>().exec();
  },

  async create(userId: string, payload: DailyMetricPayload) {
    await connectToDatabase();
    return DailyMetricModel.create({ ...payload, user: userId });
  },

  async update(metricId: string, userId: string, payload: Partial<DailyMetricPayload>) {
    await connectToDatabase();
    return DailyMetricModel.findOneAndUpdate({ _id: metricId, user: userId }, payload, { new: true }).lean<IDailyMetric | null>().exec();
  },

  async remove(metricId: string, userId: string) {
    await connectToDatabase();
    return DailyMetricModel.findOneAndDelete({ _id: metricId, user: userId }).lean<IDailyMetric | null>().exec();
  }
};

