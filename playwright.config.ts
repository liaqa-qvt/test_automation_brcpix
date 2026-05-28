import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: false,
  retries: 1,
  timeout: 30_000,

  use: {
    baseURL: 'https://brcpix.to',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'pt-BR',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});