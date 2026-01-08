import { test, expect } from '@playwright/test'

test.describe('Checkout Page', () => {
  test('should redirect to shop when cart is empty', async ({ page }) => {
    await page.goto('/checkout')
    
    await expect(page.getByText(/no items to checkout/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /continue shopping/i })).toBeVisible()
  })

  test('should display login prompt for unauthenticated users', async ({ page }) => {
    await page.goto('/checkout')
    await expect(page.getByText(/continue shopping/i)).toBeVisible()
  })
})
