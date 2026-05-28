import { test, expect } from '@playwright/test';
import { CatalogoPage } from '../pages/CatalogoPage';

test.describe('Catálogo', () => {

  let pg: CatalogoPage;

  test.beforeEach(async ({ page }) => {
    pg = new CatalogoPage(page);
    await pg.goto();
  });

  test('CT-CAT01 | Feliz — Título "Produtos" visível', async () => {
    await expect(pg.titulo).toBeVisible();
  });

  test('CT-CAT02 | Feliz — Link do catálogo público exibido', async () => {
    await expect(pg.linkCatalogo).toBeVisible();
    await expect(pg.linkCatalogo).toContainText('brcpix.to/catalog/');
  });

  test('CT-CAT03 | Feliz — Botão "Copiar" visível', async () => {
    await expect(pg.btnCopiarLink).toBeVisible();
  });

  test('CT-CAT04 | Feliz — Link "Visualizar" aponta para URL pública', async () => {
    const href = await pg.btnVisualizarLink.getAttribute('href');
    expect(href).toContain('brcpix.to/catalog/');
  });

  test('CT-CAT05 | Feliz — Botão "Novo produto" visível', async () => {
    await expect(pg.btnNovoProduto).toBeVisible();
  });

  test('CT-CAT06 | Feliz — Tabela de produtos visível', async () => {
    await expect(pg.tabela).toBeVisible();
  });

  test('CT-CAT07 | Feliz — Produto exibe badge "Ativo"', async ({ page }) => {
    const badge = page.locator('[data-slot="badge"]', { hasText: 'Ativo' });
    await expect(badge).toBeVisible();
  });

  test('CT-CAT08 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel/catalog');
    await expect(page).toHaveURL(/entrar/);
  });
});
