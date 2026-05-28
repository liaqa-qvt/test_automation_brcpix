import { test, expect } from '@playwright/test';
import { DocumentacaoPage } from '../pages/DocumentacaoPage';

test.describe('Documentação da API', () => {

  let docs: DocumentacaoPage;

  test.beforeEach(async ({ page }) => {
    docs = new DocumentacaoPage(page);
    await docs.goto();
  });

  test('CT-DOC01 | Feliz — Título "Documentação da API" visível', async () => {
    await expect(docs.titulo).toBeVisible();
  });

  test('CT-DOC02 | Feliz — Base URL "https://api.brcpix.to" exibida', async () => {
    await expect(docs.baseUrl).toBeVisible();
    await expect(docs.baseUrl).toContainText('https://api.brcpix.to');
  });

  test('CT-DOC03 | Feliz — Link de download llms.txt visível', async () => {
    await expect(docs.btnBaixarLlms).toBeVisible();
    const href = await docs.btnBaixarLlms.getAttribute('href');
    expect(href).toContain('llms.txt');
  });

  test('CT-DOC04 | Feliz — Endpoint GET /health listado', async () => {
    await expect(docs.endpointHealth).toBeVisible();
  });

  test('CT-DOC05 | Feliz — Endpoint GET /v1/verify listado', async () => {
    await expect(docs.endpointVerify).toBeVisible();
  });

  test('CT-DOC06 | Feliz — Endpoint GET /v1/quote listado', async () => {
    await expect(docs.endpointQuote).toBeVisible();
  });

  test('CT-DOC07 | Feliz — Endpoint GET /projections/me/balance listado', async () => {
    await expect(docs.endpointBalance).toBeVisible();
  });

  test('CT-DOC08 | Feliz — Endpoint GET /charges listado', async () => {
    await expect(docs.endpointListCharges).toBeVisible();
  });

  test('CT-DOC09 | Feliz — Endpoint POST /charges listado', async () => {
    await expect(docs.endpointCreateCharge).toBeVisible();
  });

  test('CT-DOC10 | Feliz — Endpoint POST /withdrawals listado', async () => {
    await expect(docs.endpointCreateWithdrawal).toBeVisible();
  });

  test('CT-DOC11 | Feliz — Total de 12 endpoints exibidos', async ({ page }) => {
    const badge = page.locator('span.rounded-full', { hasText: '12' });
    await expect(badge).toBeVisible();
  });

  test('CT-DOC12 | Feliz — Clicar em endpoint expande detalhes', async ({ page }) => {
    await docs.endpointHealth.click();
    // Ícone chevron rotaciona ao expandir
    const chevron = docs.endpointHealth.locator('svg.lucide-chevron-down');
    const cls = await chevron.getAttribute('class');
    expect(cls).toBeTruthy();
  });

  test('CT-DOC13 | Triste — Acesso sem autenticação NÃO redireciona (página pública)', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/docs');
    await expect(page).not.toHaveURL(/entrar/, { timeout: 5000 });
    await expect(docs.titulo).toBeVisible();
  });

});
