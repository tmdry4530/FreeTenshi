import { NextRequest, NextResponse } from 'next/server'
import { createPaymentIntent, convertToStripeAmount } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const createPaymentSchema = z.object({
  orderId: z.string(),
  currency: z.enum(['KRW', 'USD', 'JPY']),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, currency } = createPaymentSchema.parse(body)

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    if (order.paymentStatus !== 'PENDING') {
      return NextResponse.json(
        { success: false, error: 'Order already processed' },
        { status: 400 }
      )
    }

    const amount = convertToStripeAmount(order.total, currency)

    const paymentIntent = await createPaymentIntent({
      amount,
      currency,
      orderId: order.id,
      userEmail: order.email,
      metadata: {
        orderNumber: order.orderNumber,
      },
    })

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentIntentId: paymentIntent.id,
        paymentStatus: 'PROCESSING',
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    })
  } catch (error) {
    console.error('Failed to create payment intent:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request data', details: error.issues },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create payment' },
      { status: 500 }
    )
  }
}
