import { test, expect } from '@playwright/test';
import { TransferenciasPage } from '../pages/TransferenciasPage';

test.describe('Transferências (Enviar)', () => {

  let pg: TransferenciasPage;

  test.beforeEach(async ({ page }) => {
    pg = new TransferenciasPage(page);
    await pg.goto();
  });

  test('CT-T01 | Feliz — Título "Transferências" visível', async () => {
    await expect(pg.titulo).toBeVisible();
  });

  test('CT-T02 | Feliz — Botão Real Brasileiro visível', async () => {
    await expect(pg.btnRealBrasileiro).toBeVisible();
  });

  test('CT-T03 | Feliz — Botão Liquid Network visível', async () => {
    await expect(pg.btnLiquidNetwork).toBeVisible();
  });

  test('CT-T04 | Feliz — Saldo disponível exibido', async () => {
    await expect(pg.saldoDisponivel).toBeVisible();
  });

  test('CT-T05 | Feliz — Botão atualizar saldo clicável', async () => {
    await expect(pg.btnAtualizarSaldo).toBeVisible();
    await pg.btnAtualizarSaldo.click();
  });

  test('CT-T06 | Feliz — Botão "Transferir BRL via PIX" visível', async () => {
    await expect(pg.btnTransferirBRL).toBeVisible();
  });

  test('CT-T07 | Triste — Botão "Transferir BRL via PIX" desabilitado com saldo zerado', async () => {
    await expect(pg.btnTransferirBRL).toBeDisabled();
  });

  test('CT-T08 | Triste — Botão "Converter" desabilitado com saldo zerado', async () => {
    await expect(pg.btnConverter).toBeDisabled();
  });

  test('CT-T09 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel/saques');
    await expect(page).toHaveURL(/entrar/);
  });
});
