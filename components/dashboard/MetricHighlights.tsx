import { MetricCard } from '@/components/dashboard/MetricCard';
import type { MetricSummary } from '@/lib/services/analyticsService';

interface MetricHighlightsProps {
  summary: MetricSummary;
}

export const MetricHighlights = ({ summary }: MetricHighlightsProps) => (
  <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <MetricCard label="Avg Heart Rate" value={`${summary.averageHeartRate} bpm`} helperText={`${summary.entries} entries`} />
    <MetricCard label="Avg Sleep" value={`${summary.averageSleep} hrs`} helperText="Last 30 days" />
    <MetricCard label="Avg Weight" value={`${summary.averageWeight} kg`} helperText="Tracking body weight" />
    <MetricCard label="Activity Minutes" value={summary.activityMinutes} helperText="Total minutes" />
  </section>
);

