import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem, Currency } from '@/types'

interface CartState {
  items: CartItem[]
  currency: Currency
  
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setCurrency: (currency: Currency) => void
  
  getSubtotal: () => number
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      currency: 'KRW',

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.productId === product.id)
          
          if (existingItem) {
            const newQuantity = Math.min(
              existingItem.quantity + quantity,
              product.maxPerOrder,
              product.stock
            )
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            }
          }

          const newItem: CartItem = {
            id: `cart-${product.id}-${Date.now()}`,
            productId: product.id,
            product,
            quantity: Math.min(quantity, product.maxPerOrder, product.stock),
          }

          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.productId === productId
              ? {
                  ...item,
                  quantity: Math.min(
                    Math.max(0, quantity),
                    item.product.maxPerOrder,
                    item.product.stock
                  ),
                }
              : item
          ).filter((item) => item.quantity > 0),
        }))
      },

      clearCart: () => set({ items: [] }),

      setCurrency: (currency) => set({ currency }),

      getSubtotal: () => {
        const { items, currency } = get()
        return items.reduce((total, item) => {
          const price = currency === 'KRW' ? item.product.priceKRW : (item.product.priceUSD || 0)
          return total + price * item.quantity
        }, 0)
      },

      getTotal: () => {
        return get().getSubtotal()
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'freetenshi-cart',
      partialize: (state) => ({ items: state.items, currency: state.currency }),
    }
  )
)
