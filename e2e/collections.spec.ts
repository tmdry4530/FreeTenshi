import { test, expect } from '@playwright/test'

test.describe('Collections Page', () => {
  test('should display all products', async ({ page }) => {
    await page.goto('/collections/all')
    
    await expect(page.getByRole('heading', { name: /all products/i })).toBeVisible()
    await expect(page.getByText(/items/i)).toBeVisible()
  })

  test('should display product grid', async ({ page }) => {
    await page.goto('/collections/all')
    
    const productCards = page.locator('[class*="product"]').first()
    await expect(productCards).toBeVisible()
  })

  test('should navigate to product detail on click', async ({ page }) => {
    await page.goto('/collections/all')
    
    const firstProduct = page.locator('a[href*="/products/"]').first()
    await firstProduct.click()
    
    await expect(page).toHaveURL(/\/products\//)
  })
})
