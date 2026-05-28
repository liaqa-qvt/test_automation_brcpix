import { Page, Locator } from '@playwright/test';

export class DocumentacaoPage {
  readonly page: Page;

  readonly titulo: Locator;
  readonly baseUrl: Locator;
  readonly btnBaixarLlms: Locator;
  readonly btnCopiarBaseUrl: Locator;

  readonly endpointHealth: Locator;
  readonly endpointVerify: Locator;
  readonly endpointQuote: Locator;
  readonly endpointBalance: Locator;
  readonly endpointListCharges: Locator;
  readonly endpointCreateCharge: Locator;
  readonly endpointCreateWithdrawal: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titulo          = page.locator('h1', { hasText: 'Documentação da API' });
    this.baseUrl         = page.locator('code', { hasText: 'https://api.brcpix.to' });
    this.btnBaixarLlms   = page.locator('a[download="llms.txt"]');
    this.btnCopiarBaseUrl = page.locator('button[title="Copiar"]');

    this.endpointHealth          = page.locator('button').filter({ hasText: '/health' }).first();
    this.endpointVerify          = page.locator('button').filter({ hasText: '/v1/verify' });
    this.endpointQuote           = page.locator('button').filter({ hasText: '/v1/quote' });
    this.endpointBalance         = page.locator('button').filter({ hasText: '/projections/me/balance' });
    this.endpointListCharges     = page.locator('button').filter({ hasText: '/charges?page' });
    this.endpointCreateCharge    = page.locator('button').filter({ hasText: 'POST' }).filter({ hasText: '/charges' }).first();
    this.endpointCreateWithdrawal = page.locator('button').filter({ hasText: 'POST' }).filter({ hasText: '/withdrawals' });
  }

  async goto() {
    await this.page.goto('/docs');
  }
}
