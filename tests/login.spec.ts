import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe.configure({ retries: 0 });

test('logs in successfully with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.expectLoginPageVisible();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.expectLoginSuccess();
});

test('shows error banner with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.expectLoginPageVisible();
  await loginPage.login('locked_out_user', 'secret_sauce');
  await loginPage.expectLoginFailure();
});
