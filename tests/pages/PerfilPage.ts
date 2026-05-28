import { Page, Locator } from '@playwright/test';

/**
 * Page Object — Meu Perfil
 * URL: https://brcpix.to/painel/perfil  (ou acessado pelo menu de usuário)
 * Contém abas: Conta | Segurança | Notificações
 */
export class PerfilPage {
  readonly page: Page;

  readonly titulo: Locator;

  // Navegação de abas (desktop: sidebar interna; mobile: botões no topo)
  readonly abaContaBtn: Locator;
  readonly abaSegurancaBtn: Locator;
  readonly abaNotificacoesBtn: Locator;

  // ─── Aba Conta ───────────────────────────────
  readonly emailExibido: Locator;
  readonly idConta: Locator;
  readonly btnCopiarId: Locator;
  readonly dataCriacao: Locator;
  readonly badgeSessaoAtiva: Locator;

  // Permissões
  readonly permLoginAtivo: Locator;
  readonly permCriarCobrancas: Locator;

  constructor(page: Page) {
    this.page = page;

    this.titulo = page.locator('h1', { hasText: 'Meu perfil' });

    // Abas — botões reais do HTML
    this.abaContaBtn         = page.locator('button', { hasText: 'Conta' }).first();
    this.abaSegurancaBtn     = page.locator('button', { hasText: 'Segurança' }).first();
    this.abaNotificacoesBtn  = page.locator('button', { hasText: 'Notificações' }).first();

    // Conta
    this.emailExibido   = page.locator('p.text-base.font-semibold');
    this.idConta        = page.locator('span.font-mono.text-xs').first();
    this.btnCopiarId    = page.locator('button', { hasText: 'Copiar ID' });
    this.dataCriacao    = page.locator('span.text-sm').last();
    this.badgeSessaoAtiva = page.locator('[data-slot="badge"]', { hasText: 'Ativa' });

    // Permissões
    this.permLoginAtivo      = page.locator('div', { hasText: 'Login ativo' }).last();
    this.permCriarCobrancas  = page.locator('div', { hasText: 'Pode criar cobranças' }).last();
  }

  async goto() {
    // Perfil acessado via menu do usuário ou diretamente
    await this.page.goto('/painel/perfil');
  }

  async navegarParaAba(aba: 'Conta' | 'Segurança' | 'Notificações') {
    await this.page.locator('button', { hasText: aba }).first().click();
  }
}
