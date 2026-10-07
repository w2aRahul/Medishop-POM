import { expect, type Page } from '@playwright/test';

export class NavBar {
  constructor(private readonly page: Page) {}

  // Scopes all nav locators to the site header so they can't match links elsewhere on the page.
  private get root() {
    return this.page.getByTestId('site_header');
  }

  // Clicks the "Products" link in the header to open the products listing.
  async goToProducts() {
    await this.root.getByRole('link', { name: 'Products' }).click();
  }

  // Clicks the cart link in the header (matched case-insensitively) to open the cart.
  async openCart() {
    await this.root.getByRole('link', { name: /cart/i }).click();
  }

  // Asserts the cart badge shows the given number of items, after a short fixed wait for the badge to update.
  async expectCartCount(count: number) {
    await this.page.waitForTimeout(2000);
    await expect(this.root.getByTestId('cart_count')).toHaveText(String(count));
  }

  // Clicks the "Log out" / "Logout" button in the header to end the session.
  async logout() {
    await this.root.getByRole('button', { name: /log ?out/i }).click();
  }
}
