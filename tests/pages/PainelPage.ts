import { Page, Locator } from '@playwright/test';

export class PainelPage {
  readonly page: Page;

  readonly btnTrocar: Locator;
  readonly btnEnviar: Locator;
  readonly btnReceber: Locator;

  readonly shortcutCobrancas: Locator;
  readonly shortcutTransferencias: Locator;
  readonly shortcutApiKeys: Locator;
  readonly shortcutIndicacoes: Locator;

  readonly tabelaAtividade: Locator;
  readonly linkVerTodas: Locator;

  readonly navVisaoGeral: Locator;
  readonly navTrocar: Locator;
  readonly navEnviar: Locator;
  readonly navReceber: Locator;
  readonly navHistorico: Locator;
  readonly navCobrancas: Locator;
  readonly navClientes: Locator;
  readonly navCatalogo: Locator;
  readonly navCheckout: Locator;
  readonly navIntegracoes: Locator;
  readonly navBotsTelegram: Locator;
  readonly navDocumentacao: Locator;

  readonly saudacao: Locator;

  constructor(page: Page) {
    this.page = page;

    this.btnTrocar   = page.locator('a[href="/painel/swap"]').first();
    this.btnEnviar   = page.locator('a[href="/painel/saques"]').first();
    this.btnReceber  = page.locator('a[href="/painel/cobrancas"]').first();

    this.shortcutCobrancas      = page.locator('a[href="/painel/cobrancas"]').nth(1);
    this.shortcutTransferencias = page.locator('a[href="/painel/saques"]').nth(1);
    this.shortcutApiKeys        = page.locator('a[href="/painel/chaves"]');
    this.shortcutIndicacoes     = page.locator('a[href="/painel/indicacoes"]');

    this.tabelaAtividade = page.locator('table');
    this.linkVerTodas    = page.locator('a', { hasText: 'Ver todas' });

    this.navVisaoGeral    = page.locator('a[href="/painel"]').first();
    this.navTrocar        = page.locator('a[href="/painel/swap"]').first();
    this.navEnviar        = page.locator('a[href="/painel/saques"]').first();
    this.navReceber       = page.locator('a[href="/painel/cobrancas"]').first();
    this.navHistorico     = page.locator('a[href="/painel/transacoes"]');
    this.navCobrancas     = page.locator('nav a[href="/painel/cobrancas"]').last();
    this.navClientes      = page.locator('a[href="/painel/clientes"]');
    this.navCatalogo      = page.locator('a[href="/painel/catalog"]');
    this.navCheckout      = page.locator('a[href="/painel/checkout"]');
    this.navIntegracoes   = page.locator('a[href="/painel/integracoes"]');
    this.navBotsTelegram  = page.locator('a[href="/painel/telegram-bots"]');
    this.navDocumentacao  = page.locator('a[href="/docs"]');

    this.saudacao = page.locator('p', { hasText: 'Olá,' });
  }

  async goto() {
    await this.page.goto('/painel');
  }
}