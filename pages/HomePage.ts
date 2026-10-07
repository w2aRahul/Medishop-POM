import { expect, type Page } from '@playwright/test';
import { NavBar } from './components/NavBar';
import { ProductsPage } from '../pages/ProductsPage';

export class HomePage {
  readonly navBar: NavBar;

  // Stores the Playwright page and creates the shared header navigation component.
  constructor(private readonly page: Page) {
    this.navBar = new NavBar(page);
  }

  // Verifies we are on home.html and the hero title shows the expected headline.
  async expectLoaded() {
    await expect(this.page).toHaveURL(/home\.html/);
    await expect(this.page.getByTestId('home_hero_title'))
      .toHaveText('Everything your practice needs, ready to ship');
  }

  // Asserts the greeting banner contains the given text or matches the given pattern.
  async expectGreeting(text: string | RegExp) {
    await expect(this.page.getByTestId('home_greeting')).toContainText(text);
  }

  // Clicks the "see all" link in the popular products section and returns the ProductsPage we land on.
  async seeAllPopular(): Promise<ProductsPage> {
    await this.page.getByTestId('popular_see_all_link').click();
    return new ProductsPage(this.page);
  }
}
