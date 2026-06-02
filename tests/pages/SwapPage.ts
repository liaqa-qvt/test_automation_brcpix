import { Page, Locator } from '@playwright/test';

export class SwapPage {
  readonly page: Page;

  readonly valorInput: Locator;
  readonly liquidAddressInput: Locator;

  readonly inverterDirecaoBtn: Locator;
  readonly deslizarConfirmarSlider: Locator;
  readonly seletorMoedaBtn: Locator;

  readonly tituloTrocar: Locator;
  readonly labelMoedaOrigem: Locator;

  constructor(page: Page) {
    this.page = page;

    this.valorInput = page.locator('input[inputmode="numeric"]');

    this.liquidAddressInput = page.locator('#liquid-address');

    this.inverterDirecaoBtn      = page.locator('button[aria-label="Inverter direção"]');
    this.deslizarConfirmarSlider = page.locator('[aria-label="Deslize para confirmar"]');
    this.seletorMoedaBtn         = page.locator('button', { hasText: 'BRC' }).first();

    this.tituloTrocar     = page.locator('h1', { hasText: 'Trocar' });
    this.labelMoedaOrigem = page.locator('span', { hasText: 'BRL' });
  }

  async goto() {
    await this.page.goto('/painel/swap');
  }

  async preencherSwap(valor: string, enderecoLiquid: string) {
    await this.valorInput.fill(valor);
    await this.liquidAddressInput.fill(enderecoLiquid);
  }
}