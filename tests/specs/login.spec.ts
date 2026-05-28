import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';
dotenv.config();

const EMAIL    = process.env['TEST_EMAIL']!;
const PASSWORD = process.env['TEST_PASSWORD']!;

// Login usa storageState do globalSetup — estes testes verificam a tela de login
// em si, sem depender da sessão salva.
test.describe('Login', () => {

  test('CT-L01 | Feliz — Campos de e-mail e senha visíveis', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await expect(login.emailInput).toBeVisible();
    await expect(login.passwordInput).toBeVisible();
    await expect(login.submitBtn).toBeVisible();
  });

  test('CT-L02 | Feliz — Formulário aceita e-mail e senha', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.emailInput.fill(EMAIL);
    await login.passwordInput.fill(PASSWORD);
    await expect(login.emailInput).toHaveValue(EMAIL);
  });

  test('CT-L03 | Triste — Login com senha errada exibe erro', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(EMAIL, 'senha_errada_123');
    await expect(page.locator('text=inválid').or(page.locator('[role="alert"]'))).toBeVisible({ timeout: 8000 });
  });

  test('CT-L04 | Triste — Login com e-mail vazio não submete', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.passwordInput.fill(PASSWORD);
    await login.submitBtn.click();
    await expect(page).toHaveURL(/entrar/);
  });

  test('CT-L05 | Triste — Login com campos vazios não submete', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.submitBtn.click();
    await expect(page).toHaveURL(/entrar/);
  });
});
