import { Page, Locator } from '@playwright/test';

export class HistoricoPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly contadorRegistros: Locator;
  readonly filtreTodos: Locator;
  readonly filtroPendente: Locator;
  readonly filtroConcluido: Locator;
  readonly filtroFalhou: Locator;
  readonly tabela: Locator;
  readonly linhasTabela: Locator;
  readonly infoPaginacao: Locator;

  constructor(page: Page) {
    this.page              = page;
    this.titulo            = page.locator('h1', { hasText: 'Transações' });
    this.contadorRegistros = page.locator('span.tabular-nums');
    this.filtreTodos       = page.locator('button[aria-pressed]', { hasText: 'Todos' });
    this.filtroPendente    = page.locator('button[aria-pressed]', { hasText: 'Pendente' });
    this.filtroConcluido   = page.locator('button[aria-pressed]', { hasText: 'Concluído' });
    this.filtroFalhou      = page.locator('button[aria-pressed]', { hasText: 'Falhou' });
    this.tabela            = page.locator('table');
    this.linhasTabela      = page.locator('tbody tr');
    this.infoPaginacao     = page.locator('[data-range]');
  }

  async goto() { await this.page.goto('/painel/transacoes'); }
}
