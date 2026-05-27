import { Page, Locator } from '@playwright/test';

export class CadastroPage {
  readonly page: Page;

  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly inviteCodeInput: Locator;
  readonly termsCheckbox: Locator;
  readonly submitButton: Locator;
  readonly loginLink: Locator;
  readonly togglePasswordButtons: Locator;

  constructor(page: Page) {
    this.page = page;

    this.fullNameInput        = page.locator('#reg-fullName');
    this.emailInput           = page.locator('#reg-email');
    this.passwordInput        = page.locator('#reg-password');
    this.confirmPasswordInput = page.locator('#reg-confirm');
    this.inviteCodeInput      = page.locator('#reg-inviteCode');
    this.termsCheckbox        = page.locator('#reg-terms');
    this.submitButton         = page.locator('button[type="submit"]');
    this.loginLink            = page.locator('a[href="/entrar"]');
    this.togglePasswordButtons = page.locator('button[tabindex="-1"]');
  }

  async goto() {
    await this.page.goto('/cadastro');
  }

  async register(data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    inviteCode?: string;
    acceptTerms?: boolean;
  }) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
    await this.confirmPasswordInput.fill(data.confirmPassword);

    if (data.inviteCode) {
      await this.inviteCodeInput.fill(data.inviteCode);
    }
    if (data.acceptTerms !== false) {
      await this.termsCheckbox.check();
    }

    await this.submitButton.click();
  }

  async getToastMessage(): Promise<string> {
    const toast = this.page.locator('[data-sonner-toast]').first();
    await toast.waitFor({ timeout: 5000 });
    return (await toast.textContent()) ?? '';
  }

  async isInviteCodeMaxLength(): Promise<string | null> {
    return this.inviteCodeInput.getAttribute('maxlength');
  }
}