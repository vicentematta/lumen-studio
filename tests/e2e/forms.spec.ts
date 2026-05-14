import { test, expect } from '@playwright/test'

test.describe('Contact form', () => {
  test('renders name, email, and message fields', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('textarea')).toBeVisible()
  })

  test('empty submit shows inline validation errors', async ({ page }) => {
    await page.goto('/contact')
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText('Name is required')).toBeVisible()
    await expect(page.getByText('Invalid email address')).toBeVisible()
    await expect(page.getByText('Message must be at least 20 characters')).toBeVisible()
  })

  test('does not show success state when submitted without required fields', async ({ page }) => {
    await page.goto('/contact')
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText(/thank you/i)).not.toBeVisible()
  })

  test('shows success state after submitting with valid data', async ({ page }) => {
    await page.goto('/contact')

    await page.locator('input[name="name"]').fill('Alice Tester')
    await page.locator('input[name="email"]').fill('alice@example.com')
    await page.locator('textarea').fill('This is a test message longer than twenty characters.')

    await page.locator('button[type="submit"]').click()

    await expect(page.getByText(/thank you, alice/i)).toBeVisible({ timeout: 3000 })
  })
})

test.describe('Auth — Login form', () => {
  test('renders email and password fields', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('login form does not show a name field', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('input[name="name"]')).toHaveCount(0)
  })

  test('empty submit shows inline validation errors', async ({ page }) => {
    await page.goto('/login')
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText('Invalid email address')).toBeVisible()
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible()
  })

  test('valid submit goes through loading to success state', async ({ page }) => {
    await page.goto('/login')
    await page.locator('input[type="email"]').fill('user@example.com')
    await page.locator('input[type="password"]').fill('password123')
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText('Welcome back.')).toBeVisible({ timeout: 3000 })
  })
})

test.describe('Auth — Signup form', () => {
  test('renders name, email, and password fields', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('input[type="password"]')).toBeVisible()
  })

  test('empty submit shows inline validation errors', async ({ page }) => {
    await page.goto('/signup')
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText('Name is required')).toBeVisible()
    await expect(page.getByText('Invalid email address')).toBeVisible()
    await expect(page.getByText('Password must be at least 12 characters')).toBeVisible()
  })

  test('weak password shows specific error', async ({ page }) => {
    await page.goto('/signup')
    await page.locator('input[name="name"]').fill('Bob')
    await page.locator('input[type="email"]').fill('bob@example.com')
    await page.locator('input[type="password"]').fill('shortpass')
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText('Password must be at least 12 characters')).toBeVisible()
  })

  test('valid submit goes through loading to success state', async ({ page }) => {
    await page.goto('/signup')
    await page.locator('input[name="name"]').fill('Bob Smith')
    await page.locator('input[type="email"]').fill('bob@example.com')
    await page.locator('input[type="password"]').fill('SecurePass1word')
    await page.locator('button[type="submit"]').click()
    await expect(page.getByText("You're in.")).toBeVisible({ timeout: 3000 })
  })
})
