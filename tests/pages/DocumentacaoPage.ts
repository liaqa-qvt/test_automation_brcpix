import { Page, Locator } from '@playwright/test';

export class DocumentacaoPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly baseUrl: Locator;
  readonly endpointHealth: Locator;
  readonly endpointCreateCharge: Locator;
  readonly endpointListCharges: Locator;

  constructor(page: Page) {
    this.page                 = page;
    this.titulo               = page.locator('h1', { hasText: 'Documentação da API' });
    this.baseUrl              = page.locator('code', { hasText: 'https://api.brcpix.to' });
    this.endpointHealth       = page.locator('button').filter({ hasText: '/health' }).first();
    this.endpointCreateCharge = page.locator('button').filter({ hasText: 'POST' }).filter({ hasText: '/charges' }).first();
    this.endpointListCharges  = page.locator('button').filter({ hasText: '/charges?page' });
  }

  async goto() { await this.page.goto('/docs'); }
}
