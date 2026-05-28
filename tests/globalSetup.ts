import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use;
  const email    = process.env['TEST_EMAIL']!;
  const password = process.env['TEST_PASSWORD']!;

  if (!email || !password) {
    throw new Error('TEST_EMAIL e TEST_PASSWORD precisam estar no .env');
  }

  const browser = await chromium.launch();
  const page    = await browser.newPage();

  await page.goto(`${baseURL}/entrar`);
  await page.locator('#login-email').fill(email);
  await page.locator('#login-password').fill(password);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL('**/painel', { timeout: 15000 });

  await page.context().storageState({ path: 'tests/.auth/user.json' });
  await browser.close();
}

export default globalSetup;
