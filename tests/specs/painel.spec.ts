import { test, expect } from '@playwright/test';
import { PainelPage } from '../pages/PainelPage';

test.describe('Painel — Visão Geral', () => {

  let painel: PainelPage;

  test.beforeEach(async ({ page }) => {
    painel = new PainelPage(page);
    await painel.goto();
  });

  test('CT-P01 | Feliz — Painel carrega após login', async ({ page }) => {
    await expect(page).toHaveURL(/painel/);
  });

  test('CT-P02 | Feliz — Navegação lateral contém links principais', async () => {
    await expect(painel.navTrocar).toBeVisible();
    await expect(painel.navEnviar).toBeVisible();
    await expect(painel.navReceber).toBeVisible();
    await expect(painel.navHistorico).toBeVisible();
  });

  test('CT-P03 | Feliz — Link Trocar aponta para /painel/swap', async () => {
    await expect(painel.navTrocar).toHaveAttribute('href', '/painel/swap');
  });

  test('CT-P04 | Feliz — Link Receber aponta para /painel/cobrancas', async () => {
    await expect(painel.navReceber).toHaveAttribute('href', '/painel/cobrancas');
  });

  test('CT-P05 | Feliz — Link Enviar aponta para /painel/saques', async () => {
    await expect(painel.navEnviar).toHaveAttribute('href', '/painel/saques');
  });

  test('CT-P06 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel');
    await expect(page).toHaveURL(/entrar/);
  });
});
