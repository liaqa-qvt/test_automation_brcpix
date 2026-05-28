import { test, expect } from '@playwright/test';
import { CobrancasPage } from '../pages/CobrancasPage';

test.describe('Cobranças', () => {

  let pg: CobrancasPage;

  test.beforeEach(async ({ page }) => {
    pg = new CobrancasPage(page);
    await pg.goto();
  });

  test('CT-CB01 | Feliz — Título "Cobranças" visível', async () => {
    await expect(pg.titulo).toBeVisible();
  });

  test('CT-CB02 | Feliz — Botão "Nova cobrança" visível', async () => {
    await expect(pg.btnNovaCobranca).toBeVisible();
  });

  test('CT-CB03 | Feliz — Filtro de Status visível', async () => {
    await expect(pg.filtroStatus).toBeVisible();
  });

  test('CT-CB04 | Feliz — Filtro de Período visível', async () => {
    await expect(pg.filtroPeriodo).toBeVisible();
  });

  test('CT-CB05 | Feliz — Tabela de cobranças visível', async () => {
    await expect(pg.tabela).toBeVisible();
  });

  test('CT-CB06 | Feliz — Paginação exibe contagem', async () => {
    await expect(pg.infoPaginacao).toBeVisible();
  });

  test('CT-CB07 | Feliz — "Nova cobrança" abre modal', async ({ page }) => {
    await pg.abrirNovaCobranca();
    await expect(
      page.locator('[role="dialog"]').or(page.locator('text=Escolha a moeda'))
    ).toBeVisible({ timeout: 5000 });
  });

  test('CT-CB08 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel/cobrancas');
    await expect(page).toHaveURL(/entrar/);
  });
});
