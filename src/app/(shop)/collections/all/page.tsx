import { ProductGrid } from '@/components/shop/product-grid'
import { getAllActiveProducts } from '@/data/mock-products'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse all FreeTenshi products',
}

export default function AllProductsPage() {
  const products = getAllActiveProducts()

  return (
    <div>
      <div className="py-8 px-4 lg:px-8 border-b border-[#e5e5e5]">
        <h1 className="text-xs uppercase tracking-wider">All Products</h1>
        <p className="text-xs text-[#666] mt-2">{products.length} items</p>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}
