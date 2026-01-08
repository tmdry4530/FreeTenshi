'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockProducts } from '@/data/mock-products'

const adminProducts = mockProducts.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.slug,
  priceKRW: p.priceKRW,
  stock: p.stock,
  image: p.images[0],
  isActive: p.isActive,
}))

export default function ProductsPage() {
  const [products] = useState(adminProducts)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-normal">Products</h1>
        <Link href="/dashboard/products/new">
          <Button>
            <Plus size={16} className="mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Product</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Price</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Stock</th>
                <th className="text-left p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Status</th>
                <th className="text-right p-4 text-xs uppercase tracking-wider text-gray-500 font-normal">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 bg-gray-100">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{formatPrice(product.priceKRW)}</td>
                  <td className="p-4">
                    <span className={`text-sm ${product.stock < 10 ? 'text-red-600' : ''}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 ${
                      product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="View in shop"
                      >
                        <ExternalLink size={16} className="text-gray-400" />
                      </Link>
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} className="text-gray-400" />
                      </Link>
                      <button
                        className="p-2 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
