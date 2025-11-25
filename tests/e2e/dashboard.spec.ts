import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should display dashboard page', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Should redirect to sign in if not authenticated
    await expect(page).toHaveURL(/.*signin/);
  });

  test('should show sign in page', async ({ page }) => {
    await page.goto('/auth/signin');
    
    await expect(page.getByText('Sign in to Health Node')).toBeVisible();
    await expect(page.getByText('Continue with Google')).toBeVisible();
  });

  test('should display home page', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByText('Health Node')).toBeVisible();
    await expect(page.getByText('Launch a health-tracking dashboard')).toBeVisible();
  });
});

