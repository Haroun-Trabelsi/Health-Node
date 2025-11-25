import { test, expect } from '@playwright/test';

test.describe('API Routes', () => {
  test('should return 401 for unauthenticated metrics request', async ({ request }) => {
    const response = await request.get('/api/metrics');
    
    expect(response.status()).toBe(401);
    const body = await response.json();
    expect(body.success).toBe(false);
    expect(body.error).toContain('Unauthorized');
  });

  test('should reject invalid metric creation', async ({ request }) => {
    const response = await request.post('/api/metrics', {
      data: {
        weight: -10, // Invalid negative weight
        heartRate: 50,
        sleepHours: 7,
        activityMinutes: 30
      }
    });
    
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });
});

