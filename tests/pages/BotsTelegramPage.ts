import { Page, Locator } from '@playwright/test';

export class BotsTelegramPage {
  readonly page: Page;

  readonly titulo: Locator;
  readonly btnRefresh: Locator;

  readonly tabListaBots: Locator;
  readonly tabNovoBot: Locator;

  readonly mensagemVazia: Locator;
  readonly btnNovoBotVazio: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titulo     = page.locator('h1', { hasText: 'Bots Telegram' });
    this.btnRefresh = page.locator('button').filter({ has: page.locator('svg.lucide-refresh-cw') }).first();

    this.tabListaBots = page.locator('[role="tab"]', { hasText: 'Bots Telegram' });
    this.tabNovoBot   = page.locator('[role="tab"]', { hasText: 'Novo bot' });

    this.mensagemVazia   = page.locator('h2', { hasText: 'Registre seu primeiro bot' });
    this.btnNovoBotVazio = page.locator('button', { hasText: 'Novo bot' }).last();
  }

  async goto() {
    await this.page.goto('/painel/telegram-bots');
  }
}
