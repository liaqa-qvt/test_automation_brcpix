import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitBtn: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page          = page;
    this.emailInput    = page.locator('#login-email');
    this.passwordInput = page.locator('#login-password');
    this.submitBtn     = page.locator('button[type="submit"]');
    this.errorMsg      = page.locator('[role="alert"]').or(page.locator('.text-destructive')).first();
  }

  async goto() { await this.page.goto('/entrar'); }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
  }
}
