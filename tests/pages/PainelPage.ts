import { Page, Locator } from '@playwright/test';

export class PainelPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly navTrocar: Locator;
  readonly navEnviar: Locator;
  readonly navReceber: Locator;
  readonly navHistorico: Locator;

  constructor(page: Page) {
    this.page        = page;
    this.titulo      = page.locator('h1').first();
    this.navTrocar   = page.locator('a[href="/painel/swap"]').first();
    this.navEnviar   = page.locator('a[href="/painel/saques"]').first();
    this.navReceber  = page.locator('a[href="/painel/cobrancas"]').first();
    this.navHistorico = page.locator('a[href="/painel/transacoes"]').first();
  }

  async goto() { await this.page.goto('/painel'); }
}
