import { test, expect } from '@playwright/test';
import { SwapPage } from '../pages/SwapPage';

const VALID_LIQUID_ADDRESS = 'lq1qqf8er278e6yvdcgt4p2e5ll3lz27yxnjxaerqvq5fwxs9l7qqqq';

test.describe('Swap — Trocar BRL ↔ BRC', () => {

  let swapPage: SwapPage;

  test.beforeEach(async ({ page }) => {
    swapPage = new SwapPage(page);
    await swapPage.goto();
  });

  test('CT-S01 | Feliz — Página carrega com título correto', async ({ page }) => {
    await expect(page).toHaveTitle('Visão geral — BRCPIX');
    await expect(swapPage.tituloTrocar).toBeVisible();
  });

  test('CT-S02 | Feliz — Input de valor visível e aceitando entrada', async () => {
    await expect(swapPage.valorInput).toBeVisible();
    await swapPage.valorInput.fill('100');
    await expect(swapPage.valorInput).toHaveValue('100');
  });

  test('CT-S03 | Feliz — Campo endereço Liquid visível com placeholder correto', async () => {
    await expect(swapPage.liquidAddressInput).toBeVisible();
    await expect(swapPage.liquidAddressInput).toHaveAttribute('placeholder', 'lq1q…');
  });

  test('CT-S04 | Feliz — Campo endereço Liquid aceita até 120 caracteres', async () => {
    await expect(swapPage.liquidAddressInput).toHaveAttribute('maxlength', '120');
  });

  test('CT-S05 | Feliz — Botão inverter direção está visível', async () => {
    await expect(swapPage.inverterDirecaoBtn).toBeVisible();
  });

  test('CT-S06 | Feliz — Slider "Deslize para confirmar" visível', async () => {
    await expect(swapPage.deslizarConfirmarSlider).toBeVisible();
  });

  test('CT-S07 | Feliz — Moeda de origem exibe BRL por padrão', async () => {
    await expect(swapPage.labelMoedaOrigem).toBeVisible();
  });

  test('CT-S08 | Feliz — Preencher valor e endereço válidos', async () => {
    await swapPage.preencherSwap('100', VALID_LIQUID_ADDRESS);
    await expect(swapPage.valorInput).toHaveValue('100');
    await expect(swapPage.liquidAddressInput).toHaveValue(VALID_LIQUID_ADDRESS);
  });

  test('CT-S09 | Feliz — Botão inverter direção é clicável', async () => {
    await expect(swapPage.inverterDirecaoBtn).toBeEnabled();
    await swapPage.inverterDirecaoBtn.click();
    await expect(swapPage.page.locator('span', { hasText: 'BRC' })).toBeVisible();
  });

  test('CT-S10 | Feliz — Seletor de moeda destino é clicável', async () => {
    await expect(swapPage.seletorMoedaBtn).toBeEnabled();
  });


  test('CT-S11 | Triste — Slider desabilitado com valor zerado', async () => {
    const sliderClass = await swapPage.deslizarConfirmarSlider.getAttribute('class');
    expect(sliderClass).toContain('opacity-60');
  });

  test('CT-S12 | Triste — Tentar confirmar swap sem endereço Liquid', async () => {
    await swapPage.valorInput.fill('100');
    const sliderClass = await swapPage.deslizarConfirmarSlider.getAttribute('class');
    expect(sliderClass).toContain('opacity-60');
  });

  test('CT-S13 | Triste — Acesso sem autenticação redireciona para /entrar', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/painel/swap');
    await expect(page).toHaveURL(/entrar/);
  });

});