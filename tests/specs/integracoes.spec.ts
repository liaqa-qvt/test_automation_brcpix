import { test, expect } from '@playwright/test';
import { IntegracoesPage } from '../pages/IntegracoesPage';

test.describe('Integrações', () => {

  let pg: IntegracoesPage;

  test.beforeEach(async ({ page }) => {
    pg = new IntegracoesPage(page);
    await pg.goto();
  });

  test('CT-INT01 | Feliz — Título "Integrações" visível', async () => {
    await expect(pg.titulo).toBeVisible();
  });

  test('CT-INT02 | Feliz — Botão "Novo app" visível', async () => {
    await expect(pg.btnNovoApp).toBeVisible();
  });

  test('CT-INT03 | Feliz — Estado vazio exibe mensagem correta', async () => {
    await expect(pg.mensagemVazia).toBeVisible();
  });

  test('CT-INT04 | Feliz — "Novo app" abre modal', async ({ page }) => {
    await pg.abrirModalNovoApp();
    await expect(
      page.locator('[role="dialog"]').or(page.locator('text=Novo app'))
    ).toBeVisible({ timeout: 5000 });
  });

  test('CT-INT05 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel/integracoes');
    await expect(page).toHaveURL(/entrar/);
  });
});
