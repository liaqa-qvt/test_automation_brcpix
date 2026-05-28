import { Page, Locator } from '@playwright/test';

/**
 * Page Object — Contas (subcontas) e Carteira (chaves PIX)
 * Contas:   https://brcpix.to/painel/contas
 * Carteira: https://brcpix.to/painel/carteira
 */
export class ContasCarteiraPage {
  readonly page: Page;

  // ─── Contas ──────────────────────────────────
  readonly tituloContas: Locator;
  readonly btnNovaConta: Locator;
  readonly mensagemVaziaContas: Locator;

  // ─── Carteira ────────────────────────────────
  readonly tituloCarteira: Locator;
  readonly btnAdicionarCarteira: Locator;
  readonly tabelaCarteira: Locator;
  readonly linhasCarteira: Locator;
  readonly badgePIX: Locator;
  readonly badgePadrao: Locator;
  readonly chavePIXValor: Locator;

  constructor(page: Page) {
    this.page = page;

    // Contas
    this.tituloContas         = page.locator('h1', { hasText: 'Contas' });
    this.btnNovaConta         = page.locator('button', { hasText: 'Nova conta' }).first();
    this.mensagemVaziaContas  = page.locator('h2', { hasText: 'Nenhuma conta disponível' });

    // Carteira
    this.tituloCarteira       = page.locator('h1', { hasText: 'Minha Carteira' });
    this.btnAdicionarCarteira = page.locator('button', { hasText: 'Adicionar à carteira' }).first();
    this.tabelaCarteira       = page.locator('table');
    this.linhasCarteira       = page.locator('tbody tr');
    this.badgePIX             = page.locator('[data-slot="badge"]', { hasText: 'PIX' }).first();
    this.badgePadrao          = page.locator('[data-slot="badge"]', { hasText: 'Padrão' }).first();
    this.chavePIXValor        = page.locator('td.font-mono.text-xs').first();
  }

  async gotoContas()    { await this.page.goto('/painel/contas'); }
  async gotoCarteira()  { await this.page.goto('/painel/carteira'); }
}
