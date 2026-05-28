import { test, expect } from '@playwright/test';
import { SwapPage } from '../pages/SwapPage';

test.describe('Swap — Trocar BRL ↔ BRC', () => {

  let swapPage: SwapPage;

  test.beforeEach(async ({ page }) => {
    swapPage = new SwapPage(page);
    await swapPage.goto();
  });

  test('CT-S01 | Feliz — Página carrega na URL correta', async ({ page }) => {
    await expect(page).toHaveURL(/swap/);
  });

  test('CT-S02 | Feliz — Input de valor visível', async () => {
    await expect(swapPage.valorInput).toBeVisible();
  });

  test('CT-S03 | Feliz — Input aceita valor numérico', async () => {
    await swapPage.valorInput.fill('100');
    await expect(swapPage.valorInput).toHaveValue('100');
  });

  test('CT-S04 | Feliz — Campo endereço Liquid visível', async () => {
    await expect(swapPage.liquidAddressInput).toBeVisible();
  });

  test('CT-S05 | Feliz — Slider "Deslize para confirmar" visível', async () => {
    await expect(swapPage.deslizarConfirmarSlider).toBeVisible();
  });

  test('CT-S06 | Feliz — Botão inverter direção visível', async () => {
    await expect(swapPage.inverterDirecaoBtn).toBeVisible();
  });

  test('CT-S07 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel/swap');
    await expect(page).toHaveURL(/entrar/);
  });
});
