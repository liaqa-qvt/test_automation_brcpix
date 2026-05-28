import { test, expect } from '@playwright/test';
import { ClientesPage } from '../pages/ClientesPage';

test.describe('Clientes', () => {

  let pg: ClientesPage;

  test.beforeEach(async ({ page }) => {
    pg = new ClientesPage(page);
    await pg.goto();
  });

  test('CT-CL01 | Feliz — Título "Clientes" visível', async () => {
    await expect(pg.titulo).toBeVisible();
  });

  test('CT-CL02 | Feliz — Botão "Adicionar cliente" visível', async () => {
    await expect(pg.btnAdicionarCliente).toBeVisible();
  });

  test('CT-CL03 | Feliz — Campo busca com placeholder correto', async () => {
    await expect(pg.campoBusca).toHaveAttribute('placeholder', 'Nome, e-mail ou documento…');
  });

  test('CT-CL04 | Feliz — Campo busca aceita texto', async () => {
    await pg.buscarCliente('João');
    await expect(pg.campoBusca).toHaveValue('João');
  });

  test('CT-CL05 | Feliz — Filtros Período e Mais filtros visíveis', async () => {
    await expect(pg.filtroPeriodo).toBeVisible();
    await expect(pg.filtroMaisFiltros).toBeVisible();
  });

  test('CT-CL06 | Feliz — Estado vazio exibe mensagem correta', async () => {
    await expect(pg.mensagemVazia).toBeVisible();
  });

  test('CT-CL07 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel/clientes');
    await expect(page).toHaveURL(/entrar/);
  });
});
