import { expect, type Page } from '@playwright/test';
import { NavBar } from './components/NavBar';

export class ProductsPage {
  readonly navBar: NavBar;

  // Stores the Playwright page and creates the shared header navigation component.
  constructor(private readonly page: Page) {
    this.navBar = new NavBar(page);
  }

  // Opens products.html directly (relative to baseURL).
  async goto() {
    await this.page.goto('products.html');
  }

  // Finds the product card containing the given name and clicks its "Add to cart" button.
  async addToCart(productName: string) {
    const card = this.page
      .getByRole('article')
      .filter({ hasText: productName });
    await card.getByRole('button', { name: /add to cart/i }).click();
  }

  // Asserts a heading with the given product name is visible on the page.
  async expectProductVisible(productName: string) {
    await expect(this.page.getByRole('heading', { name: productName })).toBeVisible();
  }
}
