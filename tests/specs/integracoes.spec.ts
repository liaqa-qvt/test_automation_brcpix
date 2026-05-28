import { test, expect } from '@playwright/test';
import { IntegracoesPage } from '../pages/IntegracoesPage';

test.describe('Integrações', () => {

  let integracoes: IntegracoesPage;

  test.beforeEach(async ({ page }) => {
    integracoes = new IntegracoesPage(page);
    await integracoes.goto();
  });

  test('CT-INT01 | Feliz — Título "Integrações" visível', async () => {
    await expect(integracoes.titulo).toBeVisible();
  });

  test('CT-INT02 | Feliz — Botão "Novo app" visível', async () => {
    await expect(integracoes.btnNovoApp).toBeVisible();
  });

  test('CT-INT03 | Feliz — Estado vazio exibe mensagem correta', async () => {
    await expect(integracoes.mensagemVazia).toBeVisible();
  });

  test('CT-INT04 | Feliz — Clicar "Novo app" abre modal', async ({ page }) => {
    await integracoes.abrirModalNovoApp();
    await expect(page.locator('text=Novo app').or(
      page.locator('[role="dialog"]')
    )).toBeVisible({ timeout: 5000 });
  });

  test('CT-INT05 | Feliz — Modal "Novo app" contém campo Nome obrigatório', async ({ page }) => {
    await integracoes.abrirModalNovoApp();
    const inputNome = page.locator('input').first();
    await expect(inputNome).toBeVisible();
  });

  test('CT-INT06 | Feliz — Modal "Novo app" contém campo Descrição opcional', async ({ page }) => {
    await integracoes.abrirModalNovoApp();
    const inputDescricao = page.locator('textarea, input[placeholder*="escri"]').first();
    await expect(inputDescricao).toBeVisible();
  });

  test('CT-INT07 | Triste — Criar app sem nome não avança', async ({ page }) => {
    await integracoes.abrirModalNovoApp();
    await page.locator('button', { hasText: 'Criar app' }).click();
    await expect(page.locator('text=Novo app')).toBeVisible();
  });

  test('CT-INT08 | Triste — Acesso sem autenticação redireciona para /entrar', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/painel/integracoes');
    await expect(page).toHaveURL(/entrar/);
  });

});
