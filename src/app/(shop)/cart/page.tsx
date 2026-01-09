'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-lg uppercase tracking-wider mb-4">Your Cart is Empty</h1>
        <p className="text-sm text-[#666] mb-8">Add some items to get started</p>
        <Link href="/collections/all">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 lg:px-8 py-8">
      <h1 className="text-xs uppercase tracking-wider mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="border-b border-[#e5e5e5] pb-4 mb-4 hidden lg:grid lg:grid-cols-12 gap-4">
            <div className="col-span-6 text-xs uppercase tracking-wider text-[#666]">Product</div>
            <div className="col-span-2 text-xs uppercase tracking-wider text-[#666] text-center">Quantity</div>
            <div className="col-span-2 text-xs uppercase tracking-wider text-[#666] text-right">Price</div>
            <div className="col-span-2 text-xs uppercase tracking-wider text-[#666] text-right">Total</div>
          </div>

          {items.map((item) => (
            <div key={item.id} className="border-b border-[#e5e5e5] py-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-12 lg:col-span-6 flex gap-4">
                  <div className="relative w-20 h-20 bg-[#e5e5e5] flex-shrink-0">
                    {item.product.images[0] ? (
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#999]">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-sm hover:opacity-60 transition-opacity"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-[#666] mt-1 lg:hidden">
                      {formatPrice(item.product.priceKRW)}
                    </p>
                  </div>
                </div>

                <div className="col-span-6 lg:col-span-2 flex items-center justify-start lg:justify-center">
                  <div className="flex items-center border border-[#e5e5e5]">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-2 hover:bg-[#e5e5e5] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-2 hover:bg-[#e5e5e5] transition-colors"
                      disabled={item.quantity >= item.product.maxPerOrder || item.quantity >= item.product.stock}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <div className="hidden lg:block col-span-2 text-sm text-right">
                  {formatPrice(item.product.priceKRW)}
                </div>

                <div className="col-span-5 lg:col-span-2 flex items-center justify-end gap-4">
                  <span className="text-sm">
                    {formatPrice(item.product.priceKRW * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-1 hover:opacity-60 transition-opacity"
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-[#e5e5e5] p-6 sticky top-[80px]">
            <h2 className="text-xs uppercase tracking-wider mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#666]">Subtotal</span>
                <span>{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#666]">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-[#e5e5e5] pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-sm uppercase tracking-wider">Total</span>
                <span className="text-lg">{formatPrice(getSubtotal())}</span>
              </div>
            </div>

            <Link href="/checkout" className="block">
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}
