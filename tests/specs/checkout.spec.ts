import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {

  let pg: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    pg = new CheckoutPage(page);
    await pg.goto();
  });

  test('CT-CHK01 | Feliz — Título "Checkout" visível', async () => {
    await expect(pg.titulo).toBeVisible();
  });

  test('CT-CHK02 | Feliz — Link de checkout exibido', async () => {
    await expect(pg.linkCheckout).toContainText('brcpix.to/checkout/');
  });

  test('CT-CHK03 | Feliz — Botão "Copiar" visível', async () => {
    await expect(pg.btnCopiarLink).toBeVisible();
  });

  test('CT-CHK04 | Feliz — Switch "Ativar checkout" está ativo', async () => {
    const checked = await pg.isSwitchChecked(pg.switchAtivarCheckout);
    expect(checked).toBe(true);
  });

  test('CT-CHK05 | Feliz — Switches de campos do cliente visíveis', async () => {
    await expect(pg.switchCampoNome).toBeVisible();
    await expect(pg.switchCampoEmail).toBeVisible();
    await expect(pg.switchCampoDocumento).toBeVisible();
    await expect(pg.switchCampoTelefone).toBeVisible();
  });

  test('CT-CHK06 | Feliz — Seletor de rede exibe "Ethereum"', async () => {
    await expect(pg.seletorRede).toContainText('Ethereum');
  });

  test('CT-CHK07 | Feliz — Campo endereço USDT aceita entrada', async () => {
    await pg.inputEnderecoUSDT.fill('0x1234567890abcdef');
    await expect(pg.inputEnderecoUSDT).toHaveValue('0x1234567890abcdef');
  });

  test('CT-CHK08 | Triste — Switch "Valor mínimo" inativo por padrão', async () => {
    const checked = await pg.isSwitchChecked(pg.switchValorMinimo);
    expect(checked).toBe(false);
  });

  test('CT-CHK09 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel/checkout');
    await expect(page).toHaveURL(/entrar/);
  });
});
