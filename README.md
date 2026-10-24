# SauceDemo Playwright Test Suite

End-to-end UI test for the public SauceDemo sample store using Playwright and TypeScript.

[Playwright tests](https://github.com/Ibrahim-56/Saucedemo-Test/actions/workflows/playwright.yml)

## Coverage

- Sign in with the standard sample account.
- Select three distinct products at random.
- Verify the cart count and selected products.
- Complete the checkout information form.
- Compare the displayed subtotal with the selected product prices.
- Confirm the order completion message.

## Requirements

- Node.js 20 or later
- npm

## Run locally

Install dependencies and the Chromium browser:

```bash
npm install
npx playwright install chromium
```

Run the test suite:

```bash
npm test
```

Run with a visible browser:

```bash
npm run test:headed
```

Open the HTML report after a run:

```bash
npm run test:report
```

## CI

GitHub Actions runs the Playwright test on pushes and pull requests targeting `main`. The workflow installs Chromium and uploads the HTML report when available.

The most recent recorded run passed: [view run](https://github.com/Ibrahim-56/Saucedemo-Test/actions/runs/40075696066).

## Notes

This test uses the public demonstration website and its standard sample account. It is a portfolio automation exercise, not a test of a production e-commerce system.
