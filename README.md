# MediShop – Modern Playwright POM

Playwright + TypeScript test suite for the MediShop demo web app, built with the Page Object Model (POM) pattern.

App under test: https://www.way2automation.com/MediShopWebApp/

## Project structure

```
pages/
  HomePage.ts
  LoginPage.ts
  ProductsPage.ts
  components/NavBar.ts   # reusable component object
tests/
  fixtures.ts            # custom fixtures that provide page objects
  login.spec.ts
  cart.spec.ts
playwright.config.ts
```

## Prerequisites

- Node.js 18+
- Google Chrome (only for the `chrome` project)

## Setup

```bash
npm install
npx playwright install chromium
```

Environment variables are loaded from a `.env` file (git-ignored) via `dotenv`.

## Running tests

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm test`             | Run all tests headless on Chromium       |
| `npm run test:headed`  | Run on Chromium in headed mode           |
| `npm run test:chrome`  | Run on installed Google Chrome, headed   |
| `npm run typecheck`    | Type-check the project with `tsc`        |

## Reports

- Playwright HTML report: `playwright-report/` (`npx playwright show-report`)
- JSON results: `test-results/results.json`
- `playwright-qa-reporter` single-file report: `playwright-report.html`, with run history in `.playwright-report-history.json`

Traces are retained on failure.
