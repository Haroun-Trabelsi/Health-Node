import { GET } from '@/app/api/metrics/route';
import { dailyMetricRepository } from '@/lib/repositories/dailyMetricRepository';
import { buildMetricSummary } from '@/lib/services/analyticsService';
import { getSessionUser } from '@/lib/session';

jest.mock('@/lib/session');
jest.mock('@/lib/repositories/dailyMetricRepository');
jest.mock('@/lib/services/analyticsService');

describe('GET /api/metrics', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('returns metrics with summary', async () => {
    (getSessionUser as jest.Mock).mockResolvedValue({ id: 'user-1' });
    (dailyMetricRepository.findRecentByUser as jest.Mock).mockResolvedValue([
      { date: new Date(), weight: 74, heartRate: 60, sleepHours: 7.5, activityMinutes: 45 }
    ]);
    (buildMetricSummary as jest.Mock).mockReturnValue({
      averageHeartRate: 60,
      averageSleep: 7.5,
      averageWeight: 74,
      activityMinutes: 45,
      entries: 1
    });

    const response = await GET();
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.success).toBe(true);
    expect(payload.data.summary.entries).toBe(1);
  });
});
