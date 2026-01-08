import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display the hero section', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('h1')).toContainText('FreeTenshi')
    await expect(page.getByText('Fashion & Art')).toBeVisible()
    await expect(page.getByRole('link', { name: /shop now/i })).toBeVisible()
  })

  test('should navigate to collections from hero', async ({ page }) => {
    await page.goto('/')
    
    await page.getByRole('link', { name: /shop now/i }).click()
    await expect(page).toHaveURL('/collections/all')
  })

  test('should display featured products', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.getByText('Featured Products')).toBeVisible()
    await expect(page.locator('.product-card, [class*="product"]')).toHaveCount(4)
  })

  test('should display NFT information section', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.getByText('Every Purchase = NFT')).toBeVisible()
  })
})
