import { Page, Locator } from '@playwright/test';

/**
 * Page Object — Comissões e Indicações
 * Comissões: https://brcpix.to/painel/comissoes
 * Indicações: https://brcpix.to/painel/indicacoes
 */
export class ComissoesPage {
  readonly page: Page;

  // ─── Comissões ───────────────────────────────
  readonly tituloComissoes: Locator;
  readonly codigoIndicacao: Locator;       // "BRC-QUAL5699"
  readonly btnCopiarLinkComissoes: Locator;
  readonly totalComissoes: Locator;        // "R$ 0,00" em font-bold text-primary
  readonly indicadosAtivos: Locator;
  readonly totalIndicados: Locator;
  readonly filtroStatusHistorico: Locator;
  readonly mensagemSemIndicados: Locator;
  readonly mensagemSemRegistros: Locator;

  // ─── Indicações ──────────────────────────────
  readonly tituloIndicacoes: Locator;
  readonly codigoIndicacaoIndicacoes: Locator;
  readonly btnCopiarLinkIndicacoes: Locator;
  readonly convidosCount: Locator;
  readonly contasCriadasCount: Locator;
  readonly comissaoAcumulada: Locator;
  readonly tabelaIndicados: Locator;
  readonly linhasIndicados: Locator;
  readonly infoPaginacao: Locator;

  constructor(page: Page) {
    this.page = page;

    // Comissões
    this.tituloComissoes       = page.locator('h1', { hasText: 'Comissões' });
    this.codigoIndicacao       = page.locator('p.font-mono', { hasText: 'BRC-' }).first();
    this.btnCopiarLinkComissoes = page.locator('button', { hasText: 'Copiar link' }).first();
    this.totalComissoes        = page.locator('p.text-4xl').or(page.locator('p.text-5xl')).first();
    this.indicadosAtivos       = page.locator('p.tabular-nums').nth(1);
    this.totalIndicados        = page.locator('p.tabular-nums').last();
    this.filtroStatusHistorico = page.locator('button[aria-haspopup="menu"]').filter({ hasText: 'Status' });
    this.mensagemSemIndicados  = page.locator('h2', { hasText: 'Nenhum indicado encontrado' });
    this.mensagemSemRegistros  = page.locator('h2', { hasText: 'Nenhum registro encontrado' });

    // Indicações
    this.tituloIndicacoes          = page.locator('h1', { hasText: 'Indicações' });
    this.codigoIndicacaoIndicacoes = page.locator('p.font-mono', { hasText: 'BRC-' });
    this.btnCopiarLinkIndicacoes   = page.locator('button', { hasText: 'Copiar link' }).first();
    this.convidosCount             = page.locator('p.tabular-nums').first();
    this.contasCriadasCount        = page.locator('p.tabular-nums').nth(1);
    this.comissaoAcumulada         = page.locator('p.text-primary.tabular-nums');
    this.tabelaIndicados           = page.locator('table');
    this.linhasIndicados           = page.locator('tbody tr');
    this.infoPaginacao             = page.locator('[data-range]');
  }

  async gotoComissoes()  { await this.page.goto('/painel/comissoes'); }
  async gotoIndicacoes() { await this.page.goto('/painel/indicacoes'); }
}
