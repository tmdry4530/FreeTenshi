'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(price)
  }

  const isOutOfStock = product.stock === 0

  return (
    <Link href={`/products/${product.slug}`} className="product-card group">
      <div className="relative aspect-square overflow-hidden bg-[#e5e5e5]">
        {product.images[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#999]">
            No Image
          </div>
        )}
        
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={product.name}
            fill
            className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs uppercase tracking-wider">Sold Out</span>
          </div>
        )}

        {product.isFeatured && !isOutOfStock && (
          <div className="absolute top-2 left-2">
            <span className="bg-black text-white text-[10px] uppercase tracking-wider px-2 py-1">
              Featured
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3 bg-[#f4f4f4]">
        <h3 className="text-xs uppercase tracking-wider truncate">
          {product.name}
        </h3>
        <p className="text-xs text-[#666] mt-1">
          {formatPrice(product.priceKRW)}
        </p>
      </div>
    </Link>
  )
}
