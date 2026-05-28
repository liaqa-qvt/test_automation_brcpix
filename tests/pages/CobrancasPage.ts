import { Page, Locator } from '@playwright/test';

export class CobrancasPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly btnNovaCobranca: Locator;
  readonly filtroStatus: Locator;
  readonly filtroPeriodo: Locator;
  readonly tabela: Locator;
  readonly linhasTabela: Locator;
  readonly infoPaginacao: Locator;

  constructor(page: Page) {
    this.page            = page;
    this.titulo          = page.locator('h1', { hasText: 'Cobranças' });
    this.btnNovaCobranca = page.locator('button', { hasText: 'Nova cobrança' });
    this.filtroStatus    = page.locator('[data-testid="charge-filter-status"]');
    this.filtroPeriodo   = page.locator('[data-testid="charge-filter-period"]');
    this.tabela          = page.locator('table');
    this.linhasTabela    = page.locator('tbody tr');
    this.infoPaginacao   = page.locator('[data-range]');
  }

  async goto() { await this.page.goto('/painel/cobrancas'); }
  async abrirNovaCobranca() { await this.btnNovaCobranca.click(); }
}
