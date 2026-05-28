import { test, expect } from '@playwright/test';
import { ClientesPage } from '../pages/ClientesPages';

test.describe('Clientes', () => {

  let clientes: ClientesPage;

  test.beforeEach(async ({ page }) => {
    clientes = new ClientesPage(page);
    await clientes.goto();
  });

  test('CT-CL01 | Feliz — Título "Clientes" visível', async () => {
    await expect(clientes.titulo).toBeVisible();
  });

  test('CT-CL02 | Feliz — Botão "Adicionar cliente" visível', async () => {
    await expect(clientes.btnAdicionarCliente).toBeVisible();
  });

  test('CT-CL03 | Feliz — Campo de busca visível com placeholder correto', async () => {
    await expect(clientes.campoBusca).toBeVisible();
    await expect(clientes.campoBusca).toHaveAttribute('placeholder', 'Nome, e-mail ou documento…');
  });

  test('CT-CL04 | Feliz — Campo de busca aceita texto', async () => {
    await clientes.buscarCliente('João');
    await expect(clientes.campoBusca).toHaveValue('João');
  });

  test('CT-CL05 | Feliz — Filtro Período visível', async () => {
    await expect(clientes.filtroPeriodo).toBeVisible();
  });

  test('CT-CL06 | Feliz — Filtro "Mais filtros" visível', async () => {
    await expect(clientes.filtroMaisFiltros).toBeVisible();
  });

  test('CT-CL07 | Feliz — Estado vazio exibe mensagem correta', async () => {
    await expect(clientes.mensagemVazia).toBeVisible();
  });

  test('CT-CL08 | Feliz — Botão "Adicionar cliente" no estado vazio funciona', async ({ page }) => {
    await clientes.btnAdicionarClienteVazio.click();
    await expect(page.locator('text=Adicionar cliente').or(
      page.locator('[role="dialog"]')
    )).toBeVisible({ timeout: 5000 });
  });

  test('CT-CL09 | Triste — Busca por termo inexistente não retorna resultados', async ({ page }) => {
    await clientes.buscarCliente('zzz_nao_existe_999');
    await expect(clientes.mensagemVazia).toBeVisible();
  });

  test('CT-CL10 | Triste — Acesso sem autenticação redireciona para /entrar', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/painel/clientes');
    await expect(page).toHaveURL(/entrar/);
  });

});