import { Page, Locator } from '@playwright/test';

export class TransferenciasPage {
  readonly page: Page;

  readonly titulo: Locator;
  readonly btnRealBrasileiro: Locator;
  readonly btnLiquidNetwork: Locator;
  readonly saldoDisponivel: Locator;
  readonly btnTransferirBRL: Locator;
  readonly btnConverter: Locator;
  readonly btnAtualizarSaldo: Locator;
  readonly destinoCNPJ: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titulo            = page.locator('h1', { hasText: 'Transferências' });
    this.btnRealBrasileiro = page.locator('button', { hasText: 'Real Brasileiro' });
    this.btnLiquidNetwork  = page.locator('button', { hasText: 'Liquid Network' });
    this.saldoDisponivel   = page.locator('p.font-mono.text-3xl');
    this.btnTransferirBRL  = page.locator('button', { hasText: 'Transferir BRL via PIX' });
    this.btnConverter      = page.locator('button', { hasText: 'Converter' });
    this.btnAtualizarSaldo = page.locator('button[aria-label="Atualizar saldo (consulta repetida por até 1 minuto se o valor mudar)"]');
    this.destinoCNPJ       = page.locator('span.font-medium.text-foreground').first();
  }

  async goto() {
    await this.page.goto('/painel/saques');
  }
}