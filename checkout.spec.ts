import { test, expect } from '@playwright/test';
import { pickRandomIndices } from './random';

const SAUCE_URL = 'https://www.saucedemo.com';
const USER = { username: 'standard_user', password: 'secret_sauce' };

test('E2E: select 3 random items and complete checkout', async ({ page }) => {
  await page.goto(SAUCE_URL);
  await expect(page).toHaveTitle(/Swag Labs/);
  await page.fill('[data-test="username"]', USER.username);
  await page.fill('[data-test="password"]', USER.password);
  await page.click('[data-test="login-button"]');
  await expect(page).toHaveURL(/inventory.html/);

  const itemLocators = page.locator('.inventory_item');
  const totalItems = await itemLocators.count();
  expect(totalItems).toBeGreaterThanOrEqual(3);

  const indices = pickRandomIndices(totalItems, 3);
  const selectedNames: string[] = [];
  const selectedPrices: number[] = [];

  for (const idx of indices) {
    const item = itemLocators.nth(idx);
    const name = await item.locator('.inventory_item_name').innerText();
    const priceText = await item.locator('.inventory_item_price').innerText();
    const price = Number.parseFloat(priceText.replace(/[^0-9.]/g, ''));
    selectedNames.push(name);
    selectedPrices.push(price);
    await item.locator('button').click();
  }

  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);

  for (const name of selectedNames) {
    await expect(page.locator('.cart_item .inventory_item_name', { hasText: name })).toBeVisible();
  }

  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL(/checkout-step-one.html/);
  await page.fill('[data-test="firstName"]', 'Test');
  await page.fill('[data-test="lastName"]', 'User');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');

  await expect(page).toHaveURL(/checkout-step-two.html/);
  const expectedSubtotal = selectedPrices.reduce((sum, price) => sum + price, 0);
  const itemTotalText = await page.locator('.summary_subtotal_label').innerText();
  const displayedSubtotal = Number.parseFloat(itemTotalText.replace(/[^0-9.]/g, ''));
  expect(Math.abs(displayedSubtotal - expectedSubtotal)).toBeLessThan(0.01);

  await page.click('[data-test="finish"]');
  await expect(page).toHaveURL(/checkout-complete.html/);
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
