import { test, expect } from '@playwright/test'

test.describe('Cart Page', () => {
  test('should display empty cart message', async ({ page }) => {
    await page.goto('/cart')
    
    await expect(page.getByText(/your cart is empty/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /continue shopping/i })).toBeVisible()
  })

  test('should navigate to shop from empty cart', async ({ page }) => {
    await page.goto('/cart')
    
    await page.getByRole('link', { name: /continue shopping/i }).click()
    await expect(page).toHaveURL('/collections/all')
  })
})

test.describe('Product to Cart Flow', () => {
  test('should add product to cart from product page', async ({ page }) => {
    await page.goto('/products/oversized-hoodie-black')
    
    await expect(page.getByRole('button', { name: /add to cart/i })).toBeVisible()
    
    await page.getByRole('button', { name: /add to cart/i }).click()
    
    await expect(page.getByText(/added to cart/i)).toBeVisible()
  })
})
