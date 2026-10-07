import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

type Pages = {
  loginPage: LoginPage;
  loggedInHome: HomePage;
};

export const test = base.extend<Pages>({
  // Fixture: creates a LoginPage, opens the login screen, and hands it to the test.
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);

  },

  // Fixture: depends on loginPage, signs in with the trainer account, confirms the
  // home page loaded, and hands the HomePage to the test so it starts already logged in.
  loggedInHome: async ({ loginPage }, use) => {
    const home = await loginPage.login(process.env.TEST_EMAIL!, process.env.TEST_PASSWORD!);
    await home.expectLoaded();
    await use(home);
  },
});

export { expect } from '@playwright/test';
