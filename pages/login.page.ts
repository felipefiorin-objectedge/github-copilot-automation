import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorBanner: Locator;
  readonly inventoryContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name, input[name="user-name"], input[data-test="username"]');
    this.passwordInput = page.locator('#password, input[name="password"], input[data-test="password"]');
    this.loginButton = page.locator('#login-button, input[name="login-button"], input[data-test="login-button"], button[data-test="login-button"], button:has-text("Login")');
    this.errorBanner = page.locator('[data-test="error"]');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginPageVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async expectLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.inventoryContainer).toBeVisible();
  }

  async expectLoginFailure() {
    await expect(this.page).toHaveURL(/saucedemo\.com\/?$/);
    await expect(this.errorBanner).toBeVisible();
    await expect(this.errorBanner).toContainText(/epic sadface/i);
  }
}
