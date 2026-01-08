'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    nameKo: '',
    slug: '',
    description: '',
    descriptionKo: '',
    priceKRW: '',
    priceUSD: '',
    stock: '',
    maxPerOrder: '1',
    collectionId: '',
    isActive: true,
    isFeatured: false,
  })
  const [images, setImages] = useState<string[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    if (name === 'name' && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }))
    }
  }

  const handleImageUpload = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      setImages(prev => [...prev, url])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          priceKRW: parseInt(formData.priceKRW),
          priceUSD: formData.priceUSD ? parseInt(formData.priceUSD) : null,
          stock: parseInt(formData.stock),
          maxPerOrder: parseInt(formData.maxPerOrder),
          images,
        }),
      })

      if (response.ok) {
        router.push('/dashboard/products')
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to create product')
      }
    } catch (error) {
      console.error('Failed to create product:', error)
      alert('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/dashboard/products"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Products
        </Link>
      </div>

      <h1 className="text-2xl font-normal mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        <div className="border border-gray-200 p-6 space-y-6">
          <h2 className="text-sm uppercase tracking-wider text-gray-500">Basic Information</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Name (English)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 border border-gray-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Name (Korean)
              </label>
              <input
                type="text"
                name="nameKo"
                value={formData.nameKo}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-200 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              required
              className="w-full p-3 border border-gray-200 text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Description (English)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-gray-200 text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
              Description (Korean)
            </label>
            <textarea
              name="descriptionKo"
              value={formData.descriptionKo}
              onChange={handleInputChange}
              rows={4}
              className="w-full p-3 border border-gray-200 text-sm resize-none"
            />
          </div>
        </div>

        <div className="border border-gray-200 p-6 space-y-6">
          <h2 className="text-sm uppercase tracking-wider text-gray-500">Pricing & Inventory</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Price (KRW)
              </label>
              <input
                type="number"
                name="priceKRW"
                value={formData.priceKRW}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full p-3 border border-gray-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Price (USD)
              </label>
              <input
                type="number"
                name="priceUSD"
                value={formData.priceUSD}
                onChange={handleInputChange}
                min="0"
                className="w-full p-3 border border-gray-200 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full p-3 border border-gray-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                Max Per Order
              </label>
              <input
                type="number"
                name="maxPerOrder"
                value={formData.maxPerOrder}
                onChange={handleInputChange}
                required
                min="1"
                className="w-full p-3 border border-gray-200 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 p-6 space-y-6">
          <h2 className="text-sm uppercase tracking-wider text-gray-500">Images</h2>
          
          <div className="flex flex-wrap gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative w-24 h-24 bg-gray-100 group">
                <img src={image} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 w-6 h-6 bg-black text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleImageUpload}
              className="w-24 h-24 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black transition-colors"
            >
              <Upload size={20} />
              <span className="text-xs mt-1">Add</span>
            </button>
          </div>
        </div>

        <div className="border border-gray-200 p-6 space-y-4">
          <h2 className="text-sm uppercase tracking-wider text-gray-500">Settings</h2>
          
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="text-sm">Active (visible in shop)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="text-sm">Featured (show on homepage)</span>
          </label>
        </div>

        <div className="flex gap-4">
          <Button type="submit" loading={loading} className="flex-1">
            Create Product
          </Button>
          <Link href="/dashboard/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
