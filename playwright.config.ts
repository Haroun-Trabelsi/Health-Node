import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  timeout: 60000,
  use: {
    baseURL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://127.0.0.1:3000'
  },
  webServer: {
    command: 'npm run dev -- --hostname 0.0.0.0 --port 3000',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
