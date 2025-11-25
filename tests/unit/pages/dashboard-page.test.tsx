import { render, screen } from '@testing-library/react';

import { DashboardPageContent } from '@/app/dashboard/page';

const summary = {
  averageHeartRate: 60,
  averageSleep: 7.5,
  averageWeight: 72.4,
  activityMinutes: 320,
  entries: 5
};

const metrics = [
  {
    _id: '1',
    user: 'user-1',
    date: new Date().toISOString(),
    weight: 72,
    heartRate: 60,
    sleepHours: 7.2,
    activityMinutes: 50,
    notes: 'Felt good'
  }
];

const trendData = [
  { date: '2024-01-01', weight: 72, heartRate: 60, sleep: 7.2 }
];

describe('DashboardPageContent', () => {
  it('shows overview title and metrics', () => {
    render(<DashboardPageContent metrics={metrics as never} summary={summary} trendData={trendData} />);
    expect(screen.getByText('Daily health metrics')).toBeInTheDocument();
    expect(screen.getByText(/Avg Heart Rate/)).toBeInTheDocument();
  });
});
