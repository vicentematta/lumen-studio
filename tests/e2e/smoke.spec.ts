import { test, expect } from '@playwright/test'

// All 11 concrete routes the app must serve without error
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/work',
  '/pricing',
  '/contact',
  '/login',
  '/signup',
  '/work/asme',
  '/work/velorah',
  '/work/liquid-glass',
]

for (const route of ROUTES) {
  test(`smoke: GET ${route} returns 200`, async ({ page }) => {
    const response = await page.goto(route)
    expect(response?.status()).toBe(200)
  })
}

test('smoke: root page renders brand name Lumen in navbar', async ({ page }) => {
  await page.goto('/')
  // Scope to <header> to avoid any footer text matches
  await expect(page.locator('header').getByText('Lumen')).toBeVisible()
})

test('smoke: unknown route shows 404 page (not a crash)', async ({ page }) => {
  const response = await page.goto('/this-does-not-exist')
  // SPA serves index.html (200), router renders NotFound component
  expect(response?.status()).toBe(200)
  // Should render something, not a blank page
  await expect(page.locator('body')).not.toBeEmpty()
})
