import { test, expect } from '@playwright/test';
import { BotsTelegramPage } from '../pages/BotsTelegramPage';

test.describe('Bots Telegram', () => {

  let bots: BotsTelegramPage;

  test.beforeEach(async ({ page }) => {
    bots = new BotsTelegramPage(page);
    await bots.goto();
  });

  test('CT-BOT01 | Feliz — Título "Bots Telegram" visível', async () => {
    await expect(bots.titulo).toBeVisible();
  });

  test('CT-BOT02 | Feliz — Tab "Bots Telegram" ativa por padrão', async () => {
    await expect(bots.tabListaBots).toHaveAttribute('aria-selected', 'true');
  });

  test('CT-BOT03 | Feliz — Tab "Novo bot" visível', async () => {
    await expect(bots.tabNovoBot).toBeVisible();
  });

  test('CT-BOT04 | Feliz — Estado vazio exibe mensagem correta', async () => {
    await expect(bots.mensagemVazia).toBeVisible();
  });

  test('CT-BOT05 | Feliz — Clicar em "Novo bot" ativa a tab', async () => {
    await bots.tabNovoBot.click();
    await expect(bots.tabNovoBot).toHaveAttribute('aria-selected', 'true');
  });

  test('CT-BOT06 | Feliz — Tab "Novo bot" exibe campo Token do bot', async ({ page }) => {
    await bots.tabNovoBot.click();
    const inputToken = page.locator('input[placeholder*="ABCdef"]').or(
      page.locator('input[placeholder*="123456"]')
    );
    await expect(inputToken).toBeVisible({ timeout: 5000 });
  });

  test('CT-BOT07 | Feliz — Tab "Novo bot" exibe campo Base de conhecimento', async ({ page }) => {
    await bots.tabNovoBot.click();
    const textarea = page.locator('textarea').first();
    await expect(textarea).toBeVisible({ timeout: 5000 });
  });

  test('CT-BOT08 | Feliz — Botão "Novo bot" no estado vazio muda para a tab', async () => {
    await bots.btnNovoBotVazio.click();
    await expect(bots.tabNovoBot).toHaveAttribute('aria-selected', 'true');
  });

  test('CT-BOT09 | Triste — Registrar bot sem token não avança', async ({ page }) => {
    await bots.tabNovoBot.click();
    const btnRegistrar = page.locator('button', { hasText: 'Registrar bot' });
    await btnRegistrar.click();
    await expect(bots.tabNovoBot).toHaveAttribute('aria-selected', 'true');
  });

  test('CT-BOT10 | Triste — Acesso sem autenticação redireciona para /entrar', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/painel/telegram-bots');
    await expect(page).toHaveURL(/entrar/);
  });

});
