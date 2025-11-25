import type { IDailyMetric } from '@/models/DailyMetric';

export const normalizeMetricDate = (metric: Pick<IDailyMetric, 'date'>) => {
  const date = metric.date instanceof Date ? metric.date : new Date(metric.date);
  return date.toISOString().slice(0, 10);
};

