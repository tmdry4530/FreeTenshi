// Product Types
export interface Product {
  id: string
  name: string
  nameKo?: string | null
  nameEn?: string | null
  slug: string
  description?: string | null
  descriptionKo?: string | null
  descriptionEn?: string | null
  priceKRW: number
  priceUSD?: number | null
  images: string[]
  stock: number
  maxPerOrder: number
  collectionId?: string | null
  collection?: Collection | null
  isActive: boolean
  isFeatured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Collection {
  id: string
  name: string
  nameKo?: string | null
  nameEn?: string | null
  slug: string
  description?: string | null
  image?: string | null
  isActive: boolean
  sortOrder: number
  products?: Product[]
  createdAt: Date
  updatedAt: Date
}

// Cart Types
export interface CartItem {
  id: string
  quantity: number
  product: Product
  productId: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  total: number
  currency: Currency
}

// Order Types
export type Currency = 'KRW' | 'USD' | 'JPY'
export type PaymentMethod = 'STRIPE_KRW' | 'STRIPE_USD' | 'STRIPE_JPY'
export type PaymentStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'REFUNDED'
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

export interface Order {
  id: string
  orderNumber: string
  subtotal: number
  total: number
  currency: Currency
  paymentMethod: PaymentMethod
  paymentStatus: PaymentStatus
  paymentIntentId?: string | null
  shippingAddress?: ShippingAddress | null
  status: OrderStatus
  items: OrderItem[]
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  quantity: number
  priceAtTime: number
  currency: Currency
  product: Product
  productId: string
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  addressDetail?: string
  city: string
  postalCode: string
  country: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
