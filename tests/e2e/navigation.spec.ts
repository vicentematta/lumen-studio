import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('Navbar Work link navigates to /work', async ({ page }) => {
    await page.goto('/')
    // Wait for the nav to be visible before clicking
    await expect(page.locator('nav a[href="/work"]')).toBeVisible({ timeout: 10_000 })
    await page.click('nav a[href="/work"]')
    await expect(page).toHaveURL('/work')
  })

  test('Work page card click navigates to /work/asme', async ({ page }) => {
    await page.goto('/work')
    await expect(page.locator('a[href="/work/asme"]')).toBeVisible({ timeout: 10_000 })
    await page.click('a[href="/work/asme"]')
    await expect(page).toHaveURL('/work/asme')
  })

  test('WorkDetail renders with prev/next navigation controls', async ({ page }) => {
    await page.goto('/work/asme')
    // ProjectNavCard renders as <Link to="/work/slug"> → <a href="/work/slug">
    // toBeVisible already retries until the element appears — no networkidle needed
    const adjLinks = page.locator('a[href^="/work/"]:not([href="/work"])')
    await expect(adjLinks.first()).toBeVisible({ timeout: 10_000 })
    const count = await adjLinks.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('Prev/next cycling: navigating from first project reaches another project', async ({ page }) => {
    await page.goto('/work/asme')
    const adjLinks = page.locator('a[href^="/work/"]:not([href="/work"])')
    await expect(adjLinks.first()).toBeVisible({ timeout: 10_000 })

    const href = await adjLinks.first().getAttribute('href')
    await adjLinks.first().click()
    await expect(page).toHaveURL(href!)
  })

  test('Prev/next cycling: navigating from last project links back to another', async ({ page }) => {
    await page.goto('/work/meridian')
    const adjLinks = page.locator('a[href^="/work/"]:not([href="/work"])')
    await expect(adjLinks.first()).toBeVisible({ timeout: 10_000 })

    const href = await adjLinks.first().getAttribute('href')
    await adjLinks.first().click()
    await expect(page).toHaveURL(href!)
  })

  test('direct URL navigation to /work/velorah loads that case study', async ({ page }) => {
    await page.goto('/work/velorah')
    await expect(page).toHaveURL('/work/velorah')
    await expect(page.locator('body')).not.toBeEmpty()
  })
})
