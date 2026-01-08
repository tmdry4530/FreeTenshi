import Stripe from 'stripe'
import type { Currency } from '@/types'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
})

interface CreatePaymentIntentParams {
  amount: number
  currency: Currency
  orderId: string
  userEmail?: string
  metadata?: Record<string, string>
}

export async function createPaymentIntent({
  amount,
  currency,
  orderId,
  userEmail,
  metadata = {},
}: CreatePaymentIntentParams): Promise<Stripe.PaymentIntent> {
  const stripeCurrency = currency.toLowerCase()
  
  const params: Stripe.PaymentIntentCreateParams = {
    amount,
    currency: stripeCurrency,
    metadata: {
      orderId,
      ...metadata,
    },
    automatic_payment_methods: {
      enabled: true,
    },
  }

  if (userEmail) {
    params.receipt_email = userEmail
  }

  return stripe.paymentIntents.create(params)
}

export async function retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.retrieve(paymentIntentId)
}

export async function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
): Promise<Stripe.Event> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    throw new Error('STRIPE_WEBHOOK_SECRET not configured')
  }
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret)
}

export function convertToStripeAmount(amount: number, currency: Currency): number {
  const zeroDecimalCurrencies = ['KRW', 'JPY']
  if (zeroDecimalCurrencies.includes(currency)) {
    return Math.round(amount)
  }
  return Math.round(amount * 100)
}

export function convertFromStripeAmount(amount: number, currency: Currency): number {
  const zeroDecimalCurrencies = ['KRW', 'JPY']
  if (zeroDecimalCurrencies.includes(currency)) {
    return amount
  }
  return amount / 100
}
