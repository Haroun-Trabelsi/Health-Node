'use client';

import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export interface TrendPoint {
  date: string;
  weight: number;
  heartRate: number;
  sleep: number;
}

export const MetricsTrendChart = ({ data }: { data: TrendPoint[] }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="text-base font-semibold text-slate-900">30-Day Trend</h3>
    <div className="mt-4 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#0ea5e9" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="heartRate" stroke="#22c55e" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="sleep" stroke="#a855f7" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

