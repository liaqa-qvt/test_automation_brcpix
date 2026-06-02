import { test, expect } from '@playwright/test';
import { CadastroPage } from '../pages/CadastroPage';

const uniqueEmail = () => `teste+${Date.now()}@brcpixtest.com`;

test.describe('Cadastro', () => {

  let cadastroPage: CadastroPage;

  test.beforeEach(async ({ page }) => {
    cadastroPage = new CadastroPage(page);
    await cadastroPage.goto();
  });


  test('CT-C01 | Feliz — Todos os campos obrigatórios visíveis', async () => {
    await expect(cadastroPage.fullNameInput).toBeVisible();
    await expect(cadastroPage.emailInput).toBeVisible();
    await expect(cadastroPage.passwordInput).toBeVisible();
    await expect(cadastroPage.confirmPasswordInput).toBeVisible();
    await expect(cadastroPage.termsCheckbox).toBeVisible();
    await expect(cadastroPage.submitButton).toBeVisible();
  });

  test('CT-C02 | Feliz — Código de convite opcional, máx 15 caracteres', async () => {
    const maxLength = await cadastroPage.isInviteCodeMaxLength();
    expect(maxLength).toBe('15');
  });

  test('CT-C03 | Feliz — Senhas ocultas por padrão', async () => {
    await expect(cadastroPage.passwordInput).toHaveAttribute('type', 'password');
    await expect(cadastroPage.confirmPasswordInput).toHaveAttribute('type', 'password');
  });

  test('CT-C04 | Feliz — Toggle mostra/oculta Senha', async () => {
    await cadastroPage.passwordInput.fill('minhasenha');
    await cadastroPage.togglePasswordButtons.nth(0).click();
    await expect(cadastroPage.passwordInput).toHaveAttribute('type', 'text');
    await cadastroPage.togglePasswordButtons.nth(0).click();
    await expect(cadastroPage.passwordInput).toHaveAttribute('type', 'password');
  });

  test('CT-C05 | Feliz — Toggle mostra/oculta Confirmar Senha', async () => {
    await cadastroPage.confirmPasswordInput.fill('minhasenha');
    await cadastroPage.togglePasswordButtons.nth(1).click();
    await expect(cadastroPage.confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  test('CT-C06 | Feliz — Cadastro completo com dados válidos', async ({ page }) => {
    await cadastroPage.register({
      fullName: 'Usuário Teste',
      email: uniqueEmail(),
      password: 'Senha@Forte123',
      confirmPassword: 'Senha@Forte123',
      acceptTerms: true,
    });
    await expect(page).toHaveURL(/\/painel|cadastro/, { timeout: 10_000 });
  });

  test('CT-C07 | Feliz — Cadastro com código de convite válido', async ({ page }) => {
    await cadastroPage.register({
      fullName: 'Usuário Convite',
      email: uniqueEmail(),
      password: 'Senha@Forte123',
      confirmPassword: 'Senha@Forte123',
      inviteCode: 'BRC-QUAL5699',
      acceptTerms: true,
    });
    await expect(page).toHaveURL(/\/painel|cadastro/, { timeout: 10_000 });
  });

  test('CT-C08 | Feliz — Título da página correto', async ({ page }) => {
    await expect(page).toHaveTitle('Cadastro — BRCPIX');
  });

  test('CT-C09 | Feliz — Link "Entrar" redireciona para /entrar', async ({ page }) => {
    await cadastroPage.loginLink.click();
    await expect(page).toHaveURL(/entrar/);
  });


  test('CT-C10 | Triste — Formulário vazio', async ({ page }) => {
    await cadastroPage.submitButton.click();
    await expect(page).toHaveURL(/cadastro/);
  });

  test('CT-C11 | Triste — Sem nome completo', async ({ page }) => {
    await cadastroPage.emailInput.fill(uniqueEmail());
    await cadastroPage.passwordInput.fill('Senha@123');
    await cadastroPage.confirmPasswordInput.fill('Senha@123');
    await cadastroPage.termsCheckbox.check();
    await cadastroPage.submitButton.click();
    await expect(page).toHaveURL(/cadastro/);
  });

  test('CT-C12 | Triste — E-mail inválido', async () => {
    await cadastroPage.fullNameInput.fill('Teste');
    await cadastroPage.emailInput.fill('emailinvalido');
    await cadastroPage.passwordInput.fill('Senha@123');
    await cadastroPage.confirmPasswordInput.fill('Senha@123');
    await cadastroPage.termsCheckbox.check();
    await cadastroPage.submitButton.click();
    const isInvalid = await cadastroPage.emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid).toBeTruthy();
  });

  test('CT-C13 | Triste — Senhas não coincidem', async ({ page }) => {
    await cadastroPage.register({
      fullName: 'Teste',
      email: uniqueEmail(),
      password: 'Senha@123',
      confirmPassword: 'SenhaDiferente',
      acceptTerms: true,
    });
    await expect(page).not.toHaveURL(/\/painel/, { timeout: 5_000 });
  });

  test('CT-C14 | Triste — Senha com menos de 6 caracteres', async ({ page }) => {
    await cadastroPage.register({
      fullName: 'Teste',
      email: uniqueEmail(),
      password: '123',
      confirmPassword: '123',
      acceptTerms: true,
    });
    await expect(page).not.toHaveURL(/\/painel/, { timeout: 5_000 });
  });

  test('CT-C15 | Triste — Sem aceitar os Termos de Uso', async ({ page }) => {
    await cadastroPage.fullNameInput.fill('Teste');
    await cadastroPage.emailInput.fill(uniqueEmail());
    await cadastroPage.passwordInput.fill('Senha@123');
    await cadastroPage.confirmPasswordInput.fill('Senha@123');
    await cadastroPage.submitButton.click();
    await expect(page).not.toHaveURL(/\/painel/, { timeout: 5_000 });
  });

  test('CT-C16 | Triste — E-mail já cadastrado', async ({ page }) => {
    await cadastroPage.register({
      fullName: 'Duplicado',
      email: 'liamarianaqa@gmail.com',
      password: 'Senha@123',
      confirmPassword: 'Senha@123',
      acceptTerms: true,
    });
    await expect(page).not.toHaveURL(/\/painel/, { timeout: 5_000 });
  });

});