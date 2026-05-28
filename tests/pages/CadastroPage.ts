import { Page, Locator } from '@playwright/test';

export class CadastroPage {
  readonly page: Page;
  readonly nomeInput: Locator;
  readonly emailInput: Locator;
  readonly senhaInput: Locator;
  readonly confirmarSenhaInput: Locator;
  readonly codigoConviteInput: Locator;
  readonly termosCheckbox: Locator;
  readonly submitBtn: Locator;

  constructor(page: Page) {
    this.page                 = page;
    this.nomeInput            = page.locator('#reg-fullName');
    this.emailInput           = page.locator('#reg-email');
    this.senhaInput           = page.locator('#reg-password');
    this.confirmarSenhaInput  = page.locator('#reg-confirm');
    this.codigoConviteInput   = page.locator('#reg-inviteCode');
    this.termosCheckbox       = page.locator('#reg-terms');
    this.submitBtn            = page.locator('button[type="submit"]');
  }

  async goto() { await this.page.goto('/cadastro'); }
}
