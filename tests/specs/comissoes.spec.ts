import { test, expect } from '@playwright/test';
import { ComissoesPage } from '../pages/ComissoesPage';

test.describe('Comissões e Indicações', () => {

  let pg: ComissoesPage;

  // ── COMISSÕES (/painel/comissoes) ─────────────

  test.describe('Comissões', () => {
    test.beforeEach(async ({ page }) => {
      pg = new ComissoesPage(page);
      await pg.gotoComissoes();
    });

    test('CT-COM01 | Feliz — Título "Comissões" visível', async () => {
      await expect(pg.tituloComissoes).toBeVisible();
    });

    test('CT-COM02 | Feliz — Código de indicação exibido', async () => {
      await expect(pg.codigoIndicacao).toBeVisible();
      await expect(pg.codigoIndicacao).toContainText('BRC-');
    });

    test('CT-COM03 | Feliz — Botão "Copiar link" visível', async () => {
      await expect(pg.btnCopiarLinkComissoes).toBeVisible();
    });

    test('CT-COM04 | Feliz — Total de comissões exibido', async () => {
      await expect(pg.totalComissoes).toBeVisible();
    });

    test('CT-COM05 | Feliz — Estado vazio exibe mensagem de indicados', async () => {
      await expect(pg.mensagemSemIndicados).toBeVisible();
    });

    test('CT-COM06 | Feliz — Estado vazio exibe mensagem de histórico', async () => {
      await expect(pg.mensagemSemRegistros).toBeVisible();
    });

    test('CT-COM07 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
      await context.clearCookies();
      await page.goto('/painel/comissoes');
      await expect(page).toHaveURL(/entrar/);
    });
  });

  // ── INDICAÇÕES (/painel/indicacoes) ───────────

  test.describe('Indicações', () => {
    test.beforeEach(async ({ page }) => {
      pg = new ComissoesPage(page);
      await pg.gotoIndicacoes();
    });

    test('CT-IND01 | Feliz — Título "Indicações" visível', async () => {
      await expect(pg.tituloIndicacoes).toBeVisible();
    });

    test('CT-IND02 | Feliz — Código de indicação exibido', async () => {
      await expect(pg.codigoIndicacaoIndicacoes).toContainText('BRC-');
    });

    test('CT-IND03 | Feliz — Botão "Copiar link" visível', async () => {
      await expect(pg.btnCopiarLinkIndicacoes).toBeVisible();
    });

    test('CT-IND04 | Feliz — Contagem de contas criadas visível', async () => {
      await expect(pg.contasCriadasCount).toBeVisible();
    });

    test('CT-IND05 | Feliz — Tabela de indicados visível com linhas', async () => {
      await expect(pg.tabelaIndicados).toBeVisible();
      const count = await pg.linhasIndicados.count();
      expect(count).toBeGreaterThan(0);
    });

    test('CT-IND06 | Feliz — Badge "Pendente" exibido nos indicados', async ({ page }) => {
      const badge = page.locator('[data-slot="badge"]', { hasText: 'Pendente' }).first();
      await expect(badge).toBeVisible();
    });

    test('CT-IND07 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
      await context.clearCookies();
      await page.goto('/painel/indicacoes');
      await expect(page).toHaveURL(/entrar/);
    });
  });
});
