import { test, expect } from '@playwright/test';

test('login: empty submit shows inline errors', async ({ page }) => {
  await page.goto('http://127.0.0.1:5174/login');
  await page.click('button[type=submit]');
  await expect(page.locator('text=Invalid email address')).toBeVisible();
  await expect(page.locator('text=Password must be at least 8 characters')).toBeVisible();
});

test('login: valid submit shows success state', async ({ page }) => {
  await page.goto('http://127.0.0.1:5174/login');
  await page.fill('#email', 'test@example.com');
  await page.fill('#password', 'password123');
  await page.click('button[type=submit]');
  await expect(page.locator('text=Welcome back.')).toBeVisible({ timeout: 3000 });
});

test('contact: empty submit shows inline errors', async ({ page }) => {
  await page.goto('http://127.0.0.1:5174/contact');
  await page.click('button[type=submit]');
  await expect(page.locator('text=Name is required')).toBeVisible();
  await expect(page.locator('text=Invalid email address')).toBeVisible();
  await expect(page.locator('text=Message must be at least 20 characters')).toBeVisible();
});

test('contact: valid submit shows success state', async ({ page }) => {
  await page.goto('http://127.0.0.1:5174/contact');
  await page.fill('[name=name]', 'Alice Test');
  await page.fill('[name=email]', 'alice@example.com');
  await page.fill('[name=message]', 'This is a detailed message about what we are building together.');
  await page.click('button[type=submit]');
  await expect(page.locator('text=Thank you, Alice')).toBeVisible({ timeout: 3000 });
});
