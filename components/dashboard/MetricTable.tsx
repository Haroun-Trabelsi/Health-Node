import type { IDailyMetric } from '@/models/DailyMetric';

interface MetricTableProps {
  metrics: IDailyMetric[];
}

export const MetricTable = ({ metrics }: MetricTableProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-base font-semibold text-slate-900">Recent Entries</h3>
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="text-slate-500">
          <tr>
            <th className="px-2 py-1">Date</th>
            <th className="px-2 py-1">Weight</th>
            <th className="px-2 py-1">Heart Rate</th>
            <th className="px-2 py-1">Sleep</th>
            <th className="px-2 py-1">Activity</th>
            <th className="px-2 py-1">Notes</th>
          </tr>
        </thead>
        <tbody>
          {metrics.map((metric) => (
            <tr key={metric._id?.toString() ?? metric.date.toString()} className="border-t border-slate-100">
              <td className="px-2 py-2 font-medium text-slate-900">
                {new Date(metric.date).toLocaleDateString()}
              </td>
              <td className="px-2 py-2">{metric.weight} kg</td>
              <td className="px-2 py-2">{metric.heartRate} bpm</td>
              <td className="px-2 py-2">{metric.sleepHours} hrs</td>
              <td className="px-2 py-2">{metric.activityMinutes} min</td>
              <td className="px-2 py-2 text-slate-500">{metric.notes ?? '—'}</td>
            </tr>
          ))}
          {!metrics.length && (
            <tr>
              <td className="px-2 py-4 text-center text-slate-500" colSpan={6}>
                No metrics yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

