import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const VALID_EMAIL    = process.env['TEST_EMAIL']!;
const VALID_PASSWORD = process.env['TEST_PASSWORD']!;

test.describe('Login', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('CT-L01 | Feliz — Login com credenciais válidas', async ({ page }) => {
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);
    await expect(page).toHaveURL(/\/painel/, { timeout: 10_000 });
  });

  test('CT-L02 | Feliz — Campos visíveis na tela', async () => {
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('CT-L03 | Feliz — Senha oculta por padrão', async () => {
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('CT-L04 | Feliz — Link "Esqueci minha senha" redireciona corretamente', async ({ page }) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/esqueci-senha/);
  });

  test('CT-L05 | Feliz — Link "Criar conta" redireciona para /cadastro', async ({ page }) => {
    await loginPage.createAccountLink.click();
    await expect(page).toHaveURL(/cadastro/);
  });

  test('CT-L06 | Feliz — Toggle mostra a senha', async () => {
    await loginPage.passwordInput.fill('minhasenha');
    await loginPage.togglePasswordButton.click();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');
  });

  test('CT-L07 | Feliz — Toggle oculta a senha novamente', async () => {
    await loginPage.passwordInput.fill('minhasenha');
    await loginPage.togglePasswordButton.click();
    await loginPage.togglePasswordButton.click();
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('CT-L08 | Feliz — Título da página correto', async ({ page }) => {
    await expect(page).toHaveTitle('Entrar — BRCPIX');
  });

  test('CT-L09 | Triste — E-mail sem @', async ({ page }) => {
    await loginPage.login('emailinvalido', VALID_PASSWORD);
    const isInvalid = await loginPage.emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid || !page.url().includes('/painel')).toBeTruthy();
  });

  test('CT-L10 | Triste — Senha incorreta', async ({ page }) => {
    await loginPage.login(VALID_EMAIL, 'senhaerrada123');
    await expect(page).not.toHaveURL(/\/painel/, { timeout: 5_000 });
  });

  test('CT-L11 | Triste — Campos vazios', async ({ page }) => {
    await loginPage.submitButton.click();
    await expect(page).toHaveURL(/entrar/);
  });

  test('CT-L12 | Triste — E-mail não cadastrado', async ({ page }) => {
    await loginPage.login('naoexiste@teste.com', 'qualquersenha');
    await expect(page).not.toHaveURL(/\/painel/, { timeout: 5_000 });
  });

  test('CT-L13 | Triste — Senha vazia', async ({ page }) => {
    await loginPage.emailInput.fill(VALID_EMAIL);
    await loginPage.submitButton.click();
    await expect(page).toHaveURL(/entrar/);
  });

  test('CT-L14 | Triste — E-mail vazio', async ({ page }) => {
    await loginPage.passwordInput.fill(VALID_PASSWORD);
    await loginPage.submitButton.click();
    await expect(page).toHaveURL(/entrar/);
  });

});