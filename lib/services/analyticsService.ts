import type { IDailyMetric } from '@/models/DailyMetric';

export interface MetricSummary {
  averageHeartRate: number;
  averageSleep: number;
  averageWeight: number;
  activityMinutes: number;
  entries: number;
  lastEntryDate?: string;
}

export const buildMetricSummary = (metrics: IDailyMetric[]): MetricSummary => {
  if (!metrics.length) {
    return {
      averageHeartRate: 0,
      averageSleep: 0,
      averageWeight: 0,
      activityMinutes: 0,
      entries: 0
    };
  }

  const totals = metrics.reduce(
    (acc, metric) => {
      acc.heartRate += metric.heartRate;
      acc.sleep += metric.sleepHours;
      acc.weight += metric.weight;
      acc.activity += metric.activityMinutes;
      return acc;
    },
    { heartRate: 0, sleep: 0, weight: 0, activity: 0 }
  );

  return {
    averageHeartRate: Math.round(totals.heartRate / metrics.length),
    averageSleep: Number((totals.sleep / metrics.length).toFixed(1)),
    averageWeight: Number((totals.weight / metrics.length).toFixed(1)),
    activityMinutes: totals.activity,
    entries: metrics.length,
    lastEntryDate: metrics[0]?.date?.toISOString()
  };
};

export const buildTrendSeries = (metrics: IDailyMetric[]) =>
  metrics
    .map((metric) => ({
      date: metric.date instanceof Date ? metric.date.toISOString().slice(0, 10) : metric.date,
      weight: metric.weight,
      heartRate: metric.heartRate,
      sleep: metric.sleepHours
    }))
    .reverse();

