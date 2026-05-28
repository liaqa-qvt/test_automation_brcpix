import { test, expect } from '@playwright/test';
import { HistoricoPage } from '../pages/HistoricoPage';

test.describe('Histórico de Transações', () => {

  let pg: HistoricoPage;

  test.beforeEach(async ({ page }) => {
    pg = new HistoricoPage(page);
    await pg.goto();
  });

  test('CT-H01 | Feliz — Título "Transações" visível', async () => {
    await expect(pg.titulo).toBeVisible();
  });

  test('CT-H02 | Feliz — Filtro "Todos" ativo por padrão', async () => {
    await expect(pg.filtreTodos).toHaveAttribute('aria-pressed', 'true');
  });

  test('CT-H03 | Feliz — Filtros Pendente, Concluído e Falhou visíveis', async () => {
    await expect(pg.filtroPendente).toBeVisible();
    await expect(pg.filtroConcluido).toBeVisible();
    await expect(pg.filtroFalhou).toBeVisible();
  });

  test('CT-H04 | Feliz — Tabela de transações visível', async () => {
    await expect(pg.tabela).toBeVisible();
  });

  test('CT-H05 | Feliz — Clicar "Concluído" ativa o botão', async () => {
    await pg.filtroConcluido.click();
    await expect(pg.filtroConcluido).toHaveAttribute('aria-pressed', 'true');
  });

  test('CT-H06 | Feliz — Paginação visível', async () => {
    await expect(pg.infoPaginacao).toBeVisible();
  });

  test('CT-H07 | Triste — Acesso sem auth redireciona para /entrar', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/painel/transacoes');
    await expect(page).toHaveURL(/entrar/);
  });
});
