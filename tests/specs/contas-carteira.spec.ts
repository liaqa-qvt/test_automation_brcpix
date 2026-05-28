import { test, expect } from '@playwright/test';
import { ContasCarteiraPage } from '../pages/ContasCarteiraPage';

test.describe('Contas e Carteira', () => {

  let pg: ContasCarteiraPage;

  // ── CONTAS (/painel/contas) ───────────────────

  test.describe('Contas', () => {
    test.beforeEach(async ({ page }) => {
      pg = new ContasCarteiraPage(page);
      await pg.gotoContas();
    });

    test('CT-CNT01 | Feliz — Título "Contas" visível', async () => {
      await expect(pg.tituloContas).toBeVisible();
    });

    test('CT-CNT02 | Feliz — Botão "Nova conta" visível', async () => {
      await expect(pg.btnNovaConta).toBeVisible();
    });

    test('CT-CNT03 | Feliz — Estado vazio exibe mensagem correta', async () => {
      await expect(pg.mensagemVaziaContas).toBeVisible();
    });

    test('CT-CNT04 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
      await context.clearCookies();
      await page.goto('/painel/contas');
      await expect(page).toHaveURL(/entrar/);
    });
  });

  // ── CARTEIRA (/painel/carteira) ───────────────

  test.describe('Carteira', () => {
    test.beforeEach(async ({ page }) => {
      pg = new ContasCarteiraPage(page);
      await pg.gotoCarteira();
    });

    test('CT-CAR01 | Feliz — Título "Minha Carteira" visível', async () => {
      await expect(pg.tituloCarteira).toBeVisible();
    });

    test('CT-CAR02 | Feliz — Botão "Adicionar à carteira" visível', async () => {
      await expect(pg.btnAdicionarCarteira).toBeVisible();
    });

    test('CT-CAR03 | Feliz — Tabela de carteira visível', async () => {
      await expect(pg.tabelaCarteira).toBeVisible();
    });

    test('CT-CAR04 | Feliz — Badge PIX exibido', async () => {
      await expect(pg.badgePIX).toBeVisible();
    });

    test('CT-CAR05 | Feliz — Badge "Padrão" exibido na chave principal', async () => {
      await expect(pg.badgePadrao).toBeVisible();
    });

    test('CT-CAR06 | Feliz — CNPJ da chave PIX exibido', async () => {
      await expect(pg.chavePIXValor).toBeVisible();
      await expect(pg.chavePIXValor).toContainText('43.569.475');
    });

    test('CT-CAR07 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
      await context.clearCookies();
      await page.goto('/painel/carteira');
      await expect(page).toHaveURL(/entrar/);
    });
  });
});
