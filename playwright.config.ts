import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
 
dotenv.config();
 
export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: true,
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 2 : 1,
  workers: process.env['CI'] ? 1 : undefined,
  reporter: 'html',
  globalSetup: require.resolve('./tests/globalSetup'),
  use: {
    baseURL: 'https://brcpix.to',
    trace: 'on-first-retry',
    storageState: 'tests/.auth/user.json',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});