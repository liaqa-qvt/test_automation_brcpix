import { Page, Locator } from '@playwright/test';

export class IntegracoesPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly btnNovoApp: Locator;
  readonly mensagemVazia: Locator;

  constructor(page: Page) {
    this.page         = page;
    this.titulo       = page.locator('h1', { hasText: 'Integrações' });
    this.btnNovoApp   = page.locator('button', { hasText: 'Novo app' }).first();
    this.mensagemVazia = page.locator('h2', { hasText: 'Crie seu primeiro app' });
  }

  async goto() { await this.page.goto('/painel/integracoes'); }
  async abrirModalNovoApp() { await this.btnNovoApp.click(); }
}
