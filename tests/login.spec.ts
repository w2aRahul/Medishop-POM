import { test, expect } from './fixtures';
import { metadata } from 'playwright-qa-reporter';

const VALID = { email: process.env.TEST_EMAIL!, password: process.env.TEST_PASSWORD! };

test.describe('MediShop login', () => {
  // Logs in with valid credentials and checks the home page and time-of-day greeting appear.
  test('valid credentials land on the home page',
    {
      annotation: metadata({
        priority: 'P0',
        severity: 'blocker',
        owner: 'Rahul',
        feature: 'Authentication',
        team: 'Platform',
        stories: ['AUTH-101', 'AUTH-102'],
        epic: 'AUTH-1',
        tags: ['smoke'],
      }),
    }, async ({ loginPage }) => {
    const home = await loginPage.login(VALID.email, VALID.password);

    await home.expectLoaded();
    await home.expectGreeting(/good (morning|afternoon|evening)/i);
  });

  // Submits a wrong password and checks an "invalid" error shows while the URL stays on login.html.
  test('wrong password shows an error and stays on login', async ({ loginPage, page }) => {
    await loginPage.loginExpectingFailure(VALID.email, 'nope');

    await loginPage.expectError(/invalid/i);
    await expect(page).toHaveURL(/login\.html/);
  });

  // Clicks the register link and checks the browser navigates to signup.html.
  test('register link goes to signup', async ({ loginPage, page }) => {
    await loginPage.goToRegister();
    await expect(page).toHaveURL(/signup\.html/);
  });
});