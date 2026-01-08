'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'

type Currency = 'KRW' | 'USD'

export default function CheckoutPage() {
  const { items, getSubtotal } = useCartStore()
  const [currency, setCurrency] = useState<Currency>('KRW')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    addressDetail: '',
    city: '',
    postalCode: '',
    phone: '',
  })

  const formatPrice = (price: number, curr: Currency = 'KRW') => {
    if (curr === 'KRW') {
      return new Intl.NumberFormat('ko-KR', {
        style: 'currency',
        currency: 'KRW',
        maximumFractionDigits: 0,
      }).format(price)
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const getPrice = (priceKRW: number, curr: Currency) => {
    if (curr === 'USD') {
      return priceKRW * 0.00075
    }
    return priceKRW
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = () => {
    return (
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.address &&
      formData.city &&
      formData.postalCode &&
      formData.phone
    )
  }

  const handlePayment = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields')
      return
    }
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    alert('Stripe payment integration coming soon')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-lg uppercase tracking-wider mb-4">No items to checkout</h1>
        <Link href="/collections/all">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="px-4 lg:px-8 py-4 border-b border-[#e5e5e5]">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#666] hover:text-black transition-colors"
        >
          <ChevronLeft size={14} />
          Back to Cart
        </Link>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="p-6 lg:p-12 lg:border-r border-[#e5e5e5]">
          <h1 className="text-lg uppercase tracking-wider mb-8">Checkout</h1>

          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-wider mb-4">Contact</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-3 border border-[#e5e5e5] bg-transparent text-sm"
              required
            />
          </div>

          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-wider mb-4">Shipping Address</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full p-3 border border-[#e5e5e5] bg-transparent text-sm"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full p-3 border border-[#e5e5e5] bg-transparent text-sm"
                  required
                />
              </div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full p-3 border border-[#e5e5e5] bg-transparent text-sm"
                required
              />
              <input
                type="text"
                name="addressDetail"
                value={formData.addressDetail}
                onChange={handleInputChange}
                placeholder="Apartment, suite, etc. (optional)"
                className="w-full p-3 border border-[#e5e5e5] bg-transparent text-sm"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full p-3 border border-[#e5e5e5] bg-transparent text-sm"
                  required
                />
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Postal Code"
                  className="w-full p-3 border border-[#e5e5e5] bg-transparent text-sm"
                  required
                />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="w-full p-3 border border-[#e5e5e5] bg-transparent text-sm"
                required
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xs uppercase tracking-wider mb-4">Payment</h2>

            <div className="mb-4">
              <label className="block text-xs uppercase tracking-wider text-[#666] mb-2">
                Currency
              </label>
              <div className="flex gap-2">
                {(['KRW', 'USD'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`flex-1 p-3 border text-xs uppercase tracking-wider transition-colors ${
                      currency === c
                        ? 'border-black bg-black text-white'
                        : 'border-[#e5e5e5] hover:border-black'
                    }`}
                  >
                    {c === 'KRW' ? '원화 (KRW)' : 'US Dollar (USD)'}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handlePayment}
              loading={loading}
              className="w-full"
              size="lg"
              disabled={!isFormValid()}
            >
              Pay {formatPrice(getPrice(getSubtotal(), currency), currency)}
            </Button>

            <p className="text-xs text-[#666] text-center mt-4">
              Secure payment powered by Stripe
            </p>
          </div>
        </div>

        <div className="p-6 lg:p-12 bg-white">
          <h2 className="text-xs uppercase tracking-wider mb-6">Order Summary</h2>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative w-16 h-16 bg-[#e5e5e5] flex-shrink-0">
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
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm">{item.product.name}</p>
                  <p className="text-xs text-[#666]">
                    {formatPrice(item.product.priceKRW * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#e5e5e5] pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Subtotal</span>
              <span>{formatPrice(getSubtotal())}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#666]">Shipping</span>
              <span>Free</span>
            </div>
          </div>

          <div className="border-t border-[#e5e5e5] mt-4 pt-4">
            <div className="flex justify-between">
              <span className="uppercase tracking-wider">Total</span>
              <span className="text-xl">{formatPrice(getSubtotal())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
