import { expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export class LoginPage {
  // Stores the Playwright page used by all login actions.
  constructor(private readonly page: Page) {}

  // Opens login.html (relative to baseURL) and waits until the "Welcome back" heading confirms it loaded.
  async goto() {
    await this.page.goto('login.html');
    await expect(this.page.getByTestId('login_heading')).toHaveText('Welcome back');
  }

  // User action, not page structure. Returns the page we land on.
  // Fills in the credentials, clicks "Sign in", and hands back a HomePage for the successful-login case.
  async login(email: string, password: string): Promise<HomePage> {
    await this.fillCredentials(email, password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    return new HomePage(this.page);
  }

  // Same form, but we stay on the login page — so no HomePage returned.
  // Submits credentials that are expected to be rejected.
  async loginExpectingFailure(email: string, password: string) {
    await this.fillCredentials(email, password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
  }

  // Asserts the login alert box contains the given message text or pattern.
  async expectError(message: string | RegExp) {
    await expect(this.page.getByTestId('login_alert')).toContainText(message);
  }

  // Clicks the "Register your clinic" link to navigate to the signup page.
  async goToRegister() {
    await this.page.getByRole('link', { name: 'Register your clinic' }).click();
  }

  // Helper that types the email and password into the login form (does not submit it).
  // `.first()` is used because more than one field can match the "Password" label.
  private async fillCredentials(email: string, password: string) {
    await this.page.getByLabel('Email address').fill(email);
    await this.page.getByLabel('Password').first().fill(password);
  }
}
