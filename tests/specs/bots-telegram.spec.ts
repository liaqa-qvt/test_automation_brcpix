import { test, expect } from '@playwright/test';
import { BotsTelegramPage } from '../pages/BotsTelegramPage';

test.describe('Bots Telegram', () => {

  let pg: BotsTelegramPage;

  test.beforeEach(async ({ page }) => {
    pg = new BotsTelegramPage(page);
    await pg.goto();
  });

  test('CT-BOT01 | Feliz — Título "Bots Telegram" visível', async () => {
    await expect(pg.titulo).toBeVisible();
  });

  test('CT-BOT02 | Feliz — Tab "Bots Telegram" ativa por padrão', async () => {
    await expect(pg.tabListaBots).toHaveAttribute('aria-selected', 'true');
  });

  test('CT-BOT03 | Feliz — Tab "Novo bot" visível', async () => {
    await expect(pg.tabNovoBot).toBeVisible();
  });

  test('CT-BOT04 | Feliz — Estado vazio exibe mensagem correta', async () => {
    await expect(pg.mensagemVazia).toBeVisible();
  });

  test('CT-BOT05 | Feliz — Clicar "Novo bot" ativa a tab', async () => {
    await pg.tabNovoBot.click();
    await expect(pg.tabNovoBot).toHaveAttribute('aria-selected', 'true');
  });

  test('CT-BOT06 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel/telegram-bots');
    await expect(page).toHaveURL(/entrar/);
  });
});
