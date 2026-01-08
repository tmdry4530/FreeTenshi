import { Header } from '@/components/shop/header'
import { Footer } from '@/components/shop/footer'

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[60px]">
        {children}
      </main>
      <Footer />
    </div>
  )
}
