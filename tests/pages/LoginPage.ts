import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly togglePasswordButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly createAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput           = page.locator('#login-email');
    this.passwordInput        = page.locator('#login-password');
    this.submitButton         = page.locator('button[type="submit"]');
    this.togglePasswordButton = page.locator('button[tabindex="-1"]').first();
    this.forgotPasswordLink   = page.locator('a[href="/esqueci-senha"]');
    this.createAccountLink    = page.locator('a[href="/cadastro"]');
  }

  async goto() {
    await this.page.goto('/entrar');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getToastMessage(): Promise<string> {
    const toast = this.page.locator('[data-sonner-toast]').first();
    await toast.waitFor({ timeout: 5000 });
    return (await toast.textContent()) ?? '';
  }
}