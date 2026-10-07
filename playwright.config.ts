import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',
  // One worker keeps the recording easy to follow.
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'always' }],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    // Keep the trailing slash so goto('login.html') stays inside this folder.
    baseURL: 'https://www.way2automation.com/MediShopWebApp/',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],
  // npm test runs one browser; Google Chrome is available explicitly for recording.
  // Override this selection with --project=chrome when required.
});
