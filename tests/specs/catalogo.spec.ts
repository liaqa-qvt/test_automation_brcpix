import { test, expect } from '@playwright/test';
import { CatalogoPage } from '../pages/CatalogoPage';

test.describe('Catálogo', () => {

  let catalogo: CatalogoPage;

  test.beforeEach(async ({ page }) => {
    catalogo = new CatalogoPage(page);
    await catalogo.goto();
  });

  test('CT-CAT01 | Feliz — Título "Produtos" visível', async () => {
    await expect(catalogo.titulo).toBeVisible();
  });

  test('CT-CAT02 | Feliz — Link do catálogo público exibido', async () => {
    await expect(catalogo.linkCatalogo).toBeVisible();
    await expect(catalogo.linkCatalogo).toContainText('brcpix.to/catalog/');
  });

  test('CT-CAT03 | Feliz — Botão "Copiar" link visível', async () => {
    await expect(catalogo.btnCopiarLink).toBeVisible();
  });

  test('CT-CAT04 | Feliz — Link "Visualizar" aponta para URL pública', async () => {
    await expect(catalogo.btnVisualizarLink).toBeVisible();
    const href = await catalogo.btnVisualizarLink.getAttribute('href');
    expect(href).toContain('brcpix.to/catalog/');
  });

  test('CT-CAT05 | Feliz — Botão "Novo produto" visível', async () => {
    await expect(catalogo.btnNovoProduto).toBeVisible();
  });

  test('CT-CAT06 | Feliz — Tabela de produtos visível com produto existente', async () => {
    await expect(catalogo.tabela).toBeVisible();
    await expect(catalogo.linhasTabela.first()).toBeVisible();
  });

  test('CT-CAT07 | Feliz — Produto na tabela exibe badge "Ativo"', async () => {
    const badge = catalogo.page.locator('[data-slot="badge"]', { hasText: 'Ativo' });
    await expect(badge).toBeVisible();
  });

  test('CT-CAT08 | Feliz — Botão de ações (ellipsis) visível por produto', async ({ page }) => {
    const btnAcoes = page.locator('button[id^="radix-"]').first();
    await expect(btnAcoes).toBeVisible();
  });

  test('CT-CAT09 | Triste — Acesso sem autenticação redireciona para /entrar', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/painel/catalog');
    await expect(page).toHaveURL(/entrar/);
  });

});
