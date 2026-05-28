import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {

  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    checkout = new CheckoutPage(page);
    await checkout.goto();
  });

  test('CT-CHK01 | Feliz — Título "Checkout" visível', async () => {
    await expect(checkout.titulo).toBeVisible();
  });

  test('CT-CHK02 | Feliz — Link de checkout exibido com URL correta', async () => {
    await expect(checkout.linkCheckout).toBeVisible();
    await expect(checkout.linkCheckout).toContainText('brcpix.to/checkout/');
  });

  test('CT-CHK03 | Feliz — Botão "Copiar" visível', async () => {
    await expect(checkout.btnCopiarLink).toBeVisible();
  });

  test('CT-CHK04 | Feliz — Botão "Abrir" aponta para URL correta', async () => {
    const href = await checkout.btnAbrirLink.getAttribute('href');
    expect(href).toContain('brcpix.to/checkout/');
  });

  test('CT-CHK05 | Feliz — Switch "Ativar checkout" está ativo (aria-checked=true)', async () => {
    const isChecked = await checkout.isSwitchChecked(checkout.switchAtivarCheckout);
    expect(isChecked).toBe(true);
  });

  test('CT-CHK06 | Feliz — Switches de campos do cliente visíveis', async () => {
    await expect(checkout.switchCampoNome).toBeVisible();
    await expect(checkout.switchCampoEmail).toBeVisible();
    await expect(checkout.switchCampoDocumento).toBeVisible();
    await expect(checkout.switchCampoTelefone).toBeVisible();
  });

  test('CT-CHK07 | Feliz — Switch "Converter em USDT" está ativo por padrão', async () => {
    const isChecked = await checkout.isSwitchChecked(checkout.switchConverterUSDT);
    expect(isChecked).toBe(true);
  });

  test('CT-CHK08 | Feliz — Seletor de rede exibe "Ethereum (ERC-20)" por padrão', async () => {
    await expect(checkout.seletorRede).toContainText('Ethereum (ERC-20)');
  });

  test('CT-CHK09 | Feliz — Badge de status visível', async () => {
    await expect(checkout.badgeStatus).toBeVisible();
  });

  test('CT-CHK10 | Feliz — Campo endereço USDT aceita entrada', async () => {
    await expect(checkout.inputEnderecoUSDT).toBeVisible();
    await checkout.inputEnderecoUSDT.fill('0x1234567890abcdef');
    await expect(checkout.inputEnderecoUSDT).toHaveValue('0x1234567890abcdef');
  });

  test('CT-CHK11 | Triste — Switch "Valor mínimo" inativo por padrão', async () => {
    const isChecked = await checkout.isSwitchChecked(checkout.switchValorMinimo);
    expect(isChecked).toBe(false);
  });

  test('CT-CHK12 | Triste — Switch "Valor máximo" inativo por padrão', async () => {
    const isChecked = await checkout.isSwitchChecked(checkout.switchValorMaximo);
    expect(isChecked).toBe(false);
  });

  test('CT-CHK13 | Triste — Acesso sem autenticação redireciona para /entrar', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/painel/checkout');
    await expect(page).toHaveURL(/entrar/);
  });

});
