import { Page, Locator } from '@playwright/test';

export class ClientesPage {
  readonly page: Page;

  readonly titulo: Locator;
  readonly btnAdicionarCliente: Locator;
  readonly btnRefresh: Locator;

  readonly campoBusca: Locator;
  readonly filtroPeriodo: Locator;
  readonly filtroMaisFiltros: Locator;

  readonly mensagemVazia: Locator;
  readonly btnAdicionarClienteVazio: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titulo              = page.locator('h1', { hasText: 'Clientes' });
    this.btnAdicionarCliente = page.locator('button', { hasText: 'Adicionar cliente' }).first();
    this.btnRefresh          = page.locator('button svg.lucide-refresh-cw').first();

    this.campoBusca      = page.locator('[data-testid="customer-filter-search"] input');
    this.filtroPeriodo   = page.locator('[data-testid="customer-filter-period"]');
    this.filtroMaisFiltros = page.locator('[data-testid="customer-filter-more"]');

    this.mensagemVazia           = page.locator('h2', { hasText: 'Adicione seu primeiro cliente' });
    this.btnAdicionarClienteVazio = page.locator('button', { hasText: 'Adicionar cliente' }).last();
  }

  async goto() {
    await this.page.goto('/painel/clientes');
  }

  async buscarCliente(termo: string) {
    await this.campoBusca.fill(termo);
  }
}