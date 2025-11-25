import { MetricHighlights } from '@/components/dashboard/MetricHighlights';
import { MetricTable } from '@/components/dashboard/MetricTable';
import { MetricsTrendChart } from '@/components/charts/MetricsTrendChart';
import { dailyMetricRepository } from '@/lib/repositories/dailyMetricRepository';
import { buildMetricSummary, buildTrendSeries, type MetricSummary } from '@/lib/services/analyticsService';
import { getSessionUser } from '@/lib/session';
import type { IDailyMetric } from '@/models/DailyMetric';

interface DashboardPageContentProps {
  metrics: IDailyMetric[];
  summary: MetricSummary;
  trendData: ReturnType<typeof buildTrendSeries>;
}

export const DashboardPageContent = ({ metrics, summary, trendData }: DashboardPageContentProps) => (
  <div className="space-y-8">
    <div>
      <p className="text-sm font-medium text-slate-500">Overview</p>
      <h1 className="text-3xl font-semibold text-slate-900">Daily health metrics</h1>
    </div>

    <MetricHighlights summary={summary} />

    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <MetricsTrendChart data={trendData} />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:col-span-2">
        <h3 className="text-base font-semibold text-slate-900">Wellness goals</h3>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>• Maintain resting heart rate between 55-65 bpm</li>
          <li>• Sleep 7+ hours at least 5 days per week</li>
          <li>• Log 45 minutes of moderate activity daily</li>
        </ul>
      </div>
    </div>

    <MetricTable metrics={metrics.slice(0, 10)} />
  </div>
);

export default async function DashboardPage() {
  const user = await getSessionUser();
  const metrics = await dailyMetricRepository.findRecentByUser(user.id);
  const summary = buildMetricSummary(metrics);
  const trendData = buildTrendSeries(metrics);

  return <DashboardPageContent metrics={metrics} summary={summary} trendData={trendData} />;
}

