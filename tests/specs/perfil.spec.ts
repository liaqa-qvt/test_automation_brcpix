import { test, expect } from '@playwright/test';
import { PerfilPage } from '../pages/PerfilPage';

test.describe('Meu Perfil', () => {

  let pg: PerfilPage;

  test.beforeEach(async ({ page }) => {
    pg = new PerfilPage(page);
    await pg.goto();
  });

  test('CT-PRF01 | Feliz — Título "Meu perfil" visível', async () => {
    await expect(pg.titulo).toBeVisible();
  });

  test('CT-PRF02 | Feliz — Abas Conta, Segurança e Notificações visíveis', async () => {
    await expect(pg.abaContaBtn).toBeVisible();
    await expect(pg.abaSegurancaBtn).toBeVisible();
    await expect(pg.abaNotificacoesBtn).toBeVisible();
  });

  test('CT-PRF03 | Feliz — Aba "Conta" ativa por padrão', async () => {
    // A aba Conta tem bg-primary/10 quando ativa
    const cls = await pg.abaContaBtn.getAttribute('class');
    expect(cls).toContain('primary');
  });

  test('CT-PRF04 | Feliz — E-mail da conta exibido', async () => {
    await expect(pg.emailExibido).toBeVisible();
    await expect(pg.emailExibido).toContainText('@');
  });

  test('CT-PRF05 | Feliz — ID da conta exibido', async () => {
    await expect(pg.idConta).toBeVisible();
  });

  test('CT-PRF06 | Feliz — Botão "Copiar ID" visível', async () => {
    await expect(pg.btnCopiarId).toBeVisible();
  });

  test('CT-PRF07 | Feliz — Badge "Sessão Ativa" visível', async () => {
    await expect(pg.badgeSessaoAtiva).toBeVisible();
  });

  test('CT-PRF08 | Feliz — Navegar para aba Segurança', async () => {
    await pg.navegarParaAba('Segurança');
    const cls = await pg.abaSegurancaBtn.getAttribute('class');
    expect(cls).toContain('primary');
  });

  test('CT-PRF09 | Feliz — Navegar para aba Notificações', async () => {
    await pg.navegarParaAba('Notificações');
    const cls = await pg.abaNotificacoesBtn.getAttribute('class');
    expect(cls).toContain('primary');
  });

  test('CT-PRF10 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel/perfil');
    await expect(page).toHaveURL(/entrar/);
  });
});
