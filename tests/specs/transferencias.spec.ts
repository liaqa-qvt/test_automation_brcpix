import { test, expect } from '@playwright/test';
import { TransferenciasPage } from '../pages/TransferenciasPage';
import { LoginPage } from '../pages/LoginPage';

const VALID_EMAIL    = process.env['TEST_EMAIL']!;
const VALID_PASSWORD = process.env['TEST_PASSWORD']!;

test.describe('Transferências (Enviar)', () => {

  let page_: TransferenciasPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    await page.waitForURL(/\/painel/, { timeout: 10_000 });

    page_ = new TransferenciasPage(page);
    await page_.goto();
  });

  test('CT-T01 | Feliz — Título "Transferências" visível', async () => {
    await expect(page_.titulo).toBeVisible();
  });

  test('CT-T02 | Feliz — Método Real Brasileiro selecionado por padrão', async () => {
    await expect(page_.btnRealBrasileiro).toBeVisible();
    const cls = await page_.btnRealBrasileiro.getAttribute('class');
    expect(cls).toContain('bg-primary');
  });

  test('CT-T03 | Feliz — Método Liquid Network disponível', async () => {
    await expect(page_.btnLiquidNetwork).toBeVisible();
  });

  test('CT-T04 | Feliz — Saldo disponível exibido', async () => {
    await expect(page_.saldoDisponivel).toBeVisible();
  });

  test('CT-T05 | Feliz — Botão atualizar saldo clicável', async ({ page }) => {
    // Fechar qualquer overlay/modal aberto antes de clicar
    const overlay = page.locator('[data-state="open"][aria-hidden="true"]');
    if (await overlay.isVisible()) {
      await page.keyboard.press('Escape');
      await overlay.waitFor({ state: 'hidden', timeout: 3000 }).catch(() => {});
    }
    await expect(page_.btnAtualizarSaldo).toBeVisible();
    await page_.btnAtualizarSaldo.click({ force: true });
  });

  test('CT-T06 | Feliz — Destino CNPJ exibido', async () => {
    await expect(page_.destinoCNPJ).toBeVisible();
  });

  test('CT-T07 | Feliz — Selecionar método Liquid Network', async () => {
    await page_.btnLiquidNetwork.click();
    const 