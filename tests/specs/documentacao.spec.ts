import { test, expect } from '@playwright/test';
import { DocumentacaoPage } from '../pages/DocumentacaoPage';

test.describe('Documentação da API', () => {

  let pg: DocumentacaoPage;

  test.beforeEach(async ({ page }) => {
    pg = new DocumentacaoPage(page);
    await pg.goto();
  });

  test('CT-DOC01 | Feliz — Título "Documentação da API" visível', async () => {
    await expect(pg.titulo).toBeVisible();
  });

  test('CT-DOC02 | Feliz — Base URL "https://api.brcpix.to" exibida', async () => {
    await expect(pg.baseUrl).toBeVisible();
  });

  test('CT-DOC03 | Feliz — Endpoint GET /health listado', async () => {
    await expect(pg.endpointHealth).toBeVisible();
  });

  test('CT-DOC04 | Feliz — Endpoint POST /charges listado', async () => {
    await expect(pg.endpointCreateCharge).toBeVisible();
  });

  test('CT-DOC05 | Feliz — Endpoint GET /charges listado', async () => {
    await expect(pg.endpointListCharges).toBeVisible();
  });

  // /docs é público — NÃO redireciona sem auth
  test('CT-DOC06 | Feliz — Página pública acessível sem login', async ({ page, context }) => {
    await context.clearCookies();
    await page.goto('/docs');
    await expect(page).not.toHaveURL(/entrar/, { timeout: 5000 });
    await expect(pg.titulo).toBeVisible();
  });
});
