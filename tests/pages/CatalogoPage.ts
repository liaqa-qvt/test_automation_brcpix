import { Page, Locator } from '@playwright/test';

export class CatalogoPage {
  readonly page: Page;

  readonly titulo: Locator;
  readonly btnNovoProduto: Locator;
  readonly btnRefresh: Locator;

  readonly linkCatalogo: Locator;
  readonly btnCopiarLink: Locator;
  readonly btnVisualizarLink: Locator;

  readonly tabela: Locator;
  readonly linhasTabela: Locator;

  readonly mensagemVazia: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titulo          = page.locator('h1', { hasText: 'Produtos' });
    this.btnNovoProduto  = page.locator('button', { hasText: 'Novo produto' }).first();
    this.btnRefresh      = page.locator('button').filter({ has: page.locator('svg.lucide-refresh-cw') }).first();

    this.linkCatalogo    = page.locator('p.font-mono.text-xs', { hasText: 'brcpix.to/catalog/' });
    this.btnCopiarLink   = page.locator('button', { hasText: 'Copiar' });
    this.btnVisualizarLink = page.locator('a', { hasText: 'Visualizar' });

    this.tabela      = page.locator('table');
    this.linhasTabela = page.locator('tbody tr');

    this.mensagemVazia = page.locator('h2', { hasText: 'Crie seu primeiro produto' });
  }

  async goto() {
    await this.page.goto('/painel/catalog');
  }
}
