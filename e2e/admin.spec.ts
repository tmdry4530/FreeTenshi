import { test, expect } from '@playwright/test'

test.describe('Admin Dashboard', () => {
  test('should display dashboard page', async ({ page }) => {
    await page.goto('/dashboard')
    
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
  })

  test('should display statistics cards', async ({ page }) => {
    await page.goto('/dashboard')
    
    await expect(page.getByText(/total products/i)).toBeVisible()
    await expect(page.getByText(/total orders/i)).toBeVisible()
    await expect(page.getByText(/total users/i)).toBeVisible()
    await expect(page.getByText(/revenue/i)).toBeVisible()
  })

  test('should display recent orders', async ({ page }) => {
    await page.goto('/dashboard')
    
    await expect(page.getByText(/recent orders/i)).toBeVisible()
  })

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/dashboard')
    
    await page.getByRole('link', { name: /products/i }).click()
    await expect(page).toHaveURL('/dashboard/products')
  })

  test('should navigate to orders page', async ({ page }) => {
    await page.goto('/dashboard')
    
    await page.getByRole('link', { name: /orders/i }).click()
    await expect(page).toHaveURL('/dashboard/orders')
  })
})

test.describe('Admin Products Page', () => {
  test('should display products list', async ({ page }) => {
    await page.goto('/dashboard/products')
    
    await expect(page.getByRole('heading', { name: /products/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /add product/i })).toBeVisible()
  })

  test('should navigate to add product page', async ({ page }) => {
    await page.goto('/dashboard/products')
    
    await page.getByRole('link', { name: /add product/i }).click()
    await expect(page).toHaveURL('/dashboard/products/new')
  })
})

test.describe('Admin Add Product Page', () => {
  test('should display product form', async ({ page }) => {
    await page.goto('/dashboard/products/new')
    
    await expect(page.getByRole('heading', { name: /add new product/i })).toBeVisible()
    await expect(page.getByLabel(/name \(english\)/i)).toBeVisible()
    await expect(page.getByLabel(/price \(krw\)/i)).toBeVisible()
    await expect(page.getByLabel(/stock/i)).toBeVisible()
  })
})

test.describe('Admin Orders Page', () => {
  test('should display orders list', async ({ page }) => {
    await page.goto('/dashboard/orders')
    
    await expect(page.getByRole('heading', { name: /orders/i })).toBeVisible()
  })

  test('should have status filter', async ({ page }) => {
    await page.goto('/dashboard/orders')
    
    await expect(page.getByRole('combobox')).toBeVisible()
  })
})
