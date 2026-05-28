import { Page, Locator } from '@playwright/test';

/**
 * Page Object — Swap (Trocar BRL ↔ BRC)
 * URL: https://brcpix.to/painel/swap
 * NOTA: seletor button#radix-_r_a_ removido — ID dinâmico do Radix que muda a cada render.
 */
export class SwapPage {
  readonly page: Page;
  readonly titulo: Locator;
  readonly valorInput: Locator;
  readonly liquidAddressInput: Locator;
  readonly inverterDirecaoBtn: Locator;
  readonly deslizarConfirmarSlider: Locator;
  readonly seletorMoedaBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titulo                  = page.locator('h1', { hasText: 'Trocar' });
    this.valorInput              = page.locator('input[inputmode="numeric"]').first();
    this.liquidAddressInput      = page.locator('#liquid-address')
      .or(page.locator('input[placeholder*="liquid"]'))
      .or(page.locator('input[placeholder*="Liquid"]')).first();
    this.inverterDirecaoBtn      = page.locator('button[aria-label="Inverter direção"]').first();
    this.deslizarConfirmarSlider = page.locator('[aria-label="Deslize para confirmar"]').first();
    // Seletor estável — evita IDs dinâmicos do Radix
    this.seletorMoedaBtn         = page.locator('button[role="combobox"]').first();
  }

  async goto() { await this.page.goto('/painel/swap'); }

  async preencherSwap(valor: string, enderecoLiquid: string) {
    await this.valorInput.fill(valor);
    await this.liquidAddressInput.fill(enderecoLiquid);
  }
}
