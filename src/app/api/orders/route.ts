import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const createOrderSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  address: z.string(),
  addressDetail: z.string().optional(),
  city: z.string(),
  postalCode: z.string(),
  country: z.string().default('KR'),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
  })),
  currency: z.enum(['KRW', 'USD', 'JPY']),
  paymentMethod: z.enum(['STRIPE_KRW', 'STRIPE_USD', 'STRIPE_JPY']),
})

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `FT-${timestamp}-${random}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createOrderSchema.parse(body)

    const products = await prisma.product.findMany({
      where: {
        id: { in: data.items.map(item => item.productId) },
        isActive: true,
      },
    })

    if (products.length !== data.items.length) {
      return NextResponse.json(
        { success: false, error: 'One or more products not found' },
        { status: 400 }
      )
    }

    for (const item of data.items) {
      const product = products.find((p) => p.id === item.productId)
      if (!product) continue

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { success: false, error: `Insufficient stock for ${product.name}` },
          { status: 400 }
        )
      }

      if (item.quantity > product.maxPerOrder) {
        return NextResponse.json(
          { success: false, error: `Maximum ${product.maxPerOrder} per order for ${product.name}` },
          { status: 400 }
        )
      }
    }

    let subtotal = 0
    const orderItems = data.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!
      const price = data.currency === 'KRW' ? product.priceKRW : (product.priceUSD || 0)
      subtotal += price * item.quantity

      return {
        productId: item.productId,
        quantity: item.quantity,
        priceAtTime: price,
        currency: data.currency,
      }
    })

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        address: data.address,
        addressDetail: data.addressDetail,
        city: data.city,
        postalCode: data.postalCode,
        country: data.country,
        subtotal,
        total: subtotal,
        currency: data.currency,
        paymentMethod: data.paymentMethod,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    })

    for (const item of data.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
        },
      })
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error('Failed to create order:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get('email')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    const where: Record<string, unknown> = {}

    if (email) {
      where.email = email
    }

    if (status) {
      where.status = status
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: { product: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.order.count({ where }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        items: orders,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    })
  } catch (error) {
    console.error('Failed to fetch orders:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
