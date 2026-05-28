import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly linkCheckout: Locator;
  readonly btnCopiarLink: Locator;
  readonly btnAbrirLink: Locator;
  readonly switchAtivarCheckout: Locator;
  readonly switchValorMinimo: Locator;
  readonly switchValorMaximo: Locator;
  readonly switchCampoNome: Locator;
  readonly switchCampoEmail: Locator;
  readonly switchCampoDocumento: Locator;
  readonly switchCampoTelefone: Locator;
  readonly switchConverterUSDT: Locator;
  readonly inputEnderecoUSDT: Locator;
  readonly seletorRede: Locator;
  readonly badgeStatus: Locator;

  constructor(page: Page) {
    this.page                 = page;
    this.titulo               = page.locator('h1', { hasText: 'Checkout' });
    this.linkCheckout         = page.locator('p.font-mono.text-xs', { hasText: 'brcpix.to/checkout/' });
    this.btnCopiarLink        = page.locator('button', { hasText: 'Copiar' });
    this.btnAbrirLink         = page.locator('a', { hasText: 'Abrir' });
    this.switchAtivarCheckout = page.locator('button[role="switch"]').nth(0);
    this.switchValorMinimo    = page.locator('button[role="switch"]').nth(1);
    this.switchValorMaximo    = page.locator('button[role="switch"]').nth(2);
    this.switchCampoNome      = page.locator('#field-name');
    this.switchCampoEmail     = page.locator('#field-email');
    this.switchCampoDocumento = page.locator('#field-document');
    this.switchCampoTelefone  = page.locator('#field-phone');
    this.switchConverterUSDT  = page.locator('button[role="switch"][aria-checked="true"]').last();
    this.inputEnderecoUSDT    = page.locator('input[placeholder="Endereço da carteira"]');
    this.seletorRede          = page.locator('button[role="combobox"]');
    this.badgeStatus          = page.locator('[data-slot="badge"]', { hasText: 'Status:' });
  }

  async goto() { await this.page.goto('/painel/checkout'); }

  async isSwitchChecked(sw: Locator): Promise<boolean> {
    return (await sw.getAttribute('aria-checked')) === 'true';
  }
}
