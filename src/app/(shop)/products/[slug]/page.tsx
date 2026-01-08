'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Minus, Plus, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { Button } from '@/components/ui/button'
import { getProductBySlug, mockCollections } from '@/data/mock-products'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params)
  const product = getProductBySlug(resolvedParams.slug)
  const collection = product?.collectionId 
    ? mockCollections.find(c => c.id === product.collectionId) 
    : null

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl mb-4">Product Not Found</h1>
          <Link href="/collections/all" className="text-sm underline">
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }
  
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [added, setAdded] = useState(false)
  
  const addItem = useCartStore((state) => state.addItem)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const isOutOfStock = product.stock === 0

  return (
    <div className="min-h-screen">
      <div className="px-4 lg:px-8 py-4 border-b border-[#e5e5e5]">
        <Link
          href="/collections/all"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#666] hover:text-black transition-colors"
        >
          <ChevronLeft size={14} />
          Back to Shop
        </Link>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="relative aspect-square lg:aspect-auto lg:h-[calc(100vh-120px)] lg:sticky lg:top-[60px]">
          <div className="relative w-full h-full bg-[#e5e5e5]">
            {product.images[currentImageIndex] ? (
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#999]">
                No Image
              </div>
            )}

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-black' : 'bg-black/30'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="p-6 lg:p-12">
          <div className="max-w-md">
            {collection && (
              <Link
                href={`/collections/${collection.slug}`}
                className="text-xs uppercase tracking-wider text-[#666] hover:text-black transition-colors"
              >
                {collection.name}
              </Link>
            )}
            
            <h1 className="text-2xl lg:text-3xl font-normal tracking-wide mt-2 mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-xl">{formatPrice(product.priceKRW)}</span>
              {product.priceUSD && (
                <span className="text-sm text-[#666]">≈ ${product.priceUSD} USD</span>
              )}
            </div>

            {product.description && (
              <p className="text-sm text-[#666] leading-relaxed mb-8">
                {product.description}
              </p>
            )}

            {!isOutOfStock ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase tracking-wider text-[#666] w-20">
                    Quantity
                  </span>
                  <div className="flex items-center border border-[#e5e5e5]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-[#e5e5e5] transition-colors"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-12 text-center text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.maxPerOrder, product.stock, quantity + 1))}
                      className="p-3 hover:bg-[#e5e5e5] transition-colors"
                      disabled={quantity >= product.maxPerOrder || quantity >= product.stock}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-xs text-[#666]">
                    {product.stock} in stock
                  </span>
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full"
                  size="lg"
                  disabled={added}
                >
                  {added ? (
                    <>
                      <Check size={16} className="mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </Button>

                <p className="text-xs text-[#666] text-center">
                  Free worldwide shipping
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Button disabled className="w-full" size="lg">
                  Sold Out
                </Button>
                <p className="text-xs text-[#666] text-center">
                  This item is currently out of stock
                </p>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
              <h3 className="text-xs uppercase tracking-wider mb-4">Shipping Info</h3>
              <ul className="space-y-2 text-sm text-[#666]">
                <li className="flex justify-between">
                  <span>Delivery</span>
                  <span>3-7 business days</span>
                </li>
                <li className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free worldwide</span>
                </li>
                <li className="flex justify-between">
                  <span>Returns</span>
                  <span>14 days</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
