import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import './globals.css'
import { Providers } from '@/components/providers'
import { AdminLoginModal } from '@/components/admin/login-modal'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'FreeTenshi | Fashion & Art',
    template: '%s | FreeTenshi',
  },
  description: 'Fashion & Art Commerce Platform - Express your style',
  keywords: ['fashion', 'art', 'clothing', 'collectibles', 'streetwear'],
  authors: [{ name: 'FreeTenshi' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://freetenshi.com',
    siteName: 'FreeTenshi',
    title: 'FreeTenshi | Fashion & Art',
    description: 'Fashion & Art Commerce Platform - Express your style',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeTenshi | Fashion & Art',
    description: 'Fashion & Art Commerce Platform - Express your style',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <AdminLoginModal />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
