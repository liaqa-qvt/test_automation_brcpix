import { test, expect } from '@playwright/test';
import { TransferenciasPage } from '../pages/TransferenciasPage';

test.describe('Transferências (Enviar)', () => {

  let page_: TransferenciasPage;

  test.beforeEach(async ({ page }) => {
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

  test('CT-T05 | Feliz — Botão atualizar saldo clicável', async () => {
    await expect(page_.btnAtualizarSaldo).toBeVisible();
    await page_.btnAtualizarSaldo.click();
  });

  test('CT-T06 | Feliz — Destino CNPJ exibido', async () => {
    await expect(page_.destinoCNPJ).toBeVisible();
  });

  test('CT-T07 | Feliz — Selecionar método Liquid Network', async () => {
    await page_.btnLiquidNetwork.click();
    const cls = await page_.btnLiquidNetwork.getAttribute('class');
    expect(cls).toContain('bg-primary');
  });

  test('CT-T08 | Triste — Botão "Transferir BRL via PIX" desabilitado com saldo zerado', async () => {
    await expect(page_.btnTransferirBRL).toBeDisabled();
  });

  test('CT-T09 | Triste — Botão "Converter" desabilitado com saldo zerado', async () => {
    await expect(page_.btnConverter).toBeDisabled();
  });

  test('CT-T10 | Triste — Acesso sem autenticação redireciona para /entrar', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/painel/saques');
    await expect(page).toHaveURL(/entrar/);
  });

});