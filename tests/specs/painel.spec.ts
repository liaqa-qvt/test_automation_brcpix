import { test, expect } from '@playwright/test';
import { PainelPage } from '../pages/PainelPage';

test.describe('Painel — Visão Geral', () => {

  let painel: PainelPage;

  test.beforeEach(async ({ page }) => {
    painel = new PainelPage(page);
    await painel.goto();
  });

  test('CT-P01 | Feliz — Título da página correto', async ({ page }) => {
    await expect(page).toHaveTitle('Visão geral — BRCPIX');
  });

  test('CT-P02 | Feliz — URL após login aponta para /painel', async ({ page }) => {
    await expect(page).toHaveURL(/\/painel/);
  });

  test('CT-P03 | Feliz — Saudação com nome do usuário visível', async () => {
    await expect(painel.saudacao).toBeVisible();
    await expect(painel.saudacao).toContainText('Olá,');
  });

  test('CT-P04 | Feliz — Botões de ação rápida visíveis (Trocar, Enviar, Receber)', async () => {
    await expect(painel.btnTrocar).toBeVisible();
    await expect(painel.btnEnviar).toBeVisible();
    await expect(painel.btnReceber).toBeVisible();
  });

  test('CT-P05 | Feliz — Atalhos do negócio visíveis', async () => {
    await expect(painel.shortcutCobrancas).toBeVisible();
    await expect(painel.shortcutTransferencias).toBeVisible();
    await expect(painel.shortcutApiKeys).toBeVisible();
    await expect(painel.shortcutIndicacoes).toBeVisible();
  });

  test('CT-P06 | Feliz — Link "Ver todas" aponta para /painel/cobrancas', async () => {
    await expect(painel.linkVerTodas).toHaveAttribute('href', '/painel/cobrancas');
  });

  test('CT-P07 | Feliz — Tabela de atividade recente visível', async () => {
    await expect(painel.tabelaAtividade).toBeVisible();
  });

  test('CT-P08 | Feliz — Navegação lateral contém todos os itens esperados', async () => {
    await expect(painel.navCobrancas).toBeVisible();
    await expect(painel.navClientes).toBeVisible();
    await expect(painel.navCatalogo).toBeVisible();
    await expect(painel.navCheckout).toBeVisible();
    await expect(painel.navIntegracoes).toBeVisible();
    await expect(painel.navBotsTelegram).toBeVisible();
    await expect(painel.navDocumentacao).toBeVisible();
  });

  test('CT-P09 | Feliz — Botão Trocar redireciona para /painel/swap', async ({ page }) => {
    await painel.btnTrocar.click();
    await expect(page).toHaveURL(/\/painel\/swap/);
  });

  test('CT-P10 | Feliz — Botão Receber redireciona para /painel/cobrancas', async ({ page }) => {
    await painel.btnReceber.click();
    await expect(page).toHaveURL(/\/painel\/cobrancas/);
  });

  test('CT-P11 | Feliz — Botão Enviar redireciona para /painel/saques', async ({ page }) => {
    await painel.btnEnviar.click();
    await expect(page).toHaveURL(/\/painel\/saques/);
  });

  test('CT-P12 | Triste — Acesso sem autenticação redireciona para /entrar', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/painel');
    await expect(page).toHaveURL(/entrar/);
  });

});