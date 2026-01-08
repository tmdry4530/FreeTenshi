import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart } from 'lucide-react'
import { AdminLogoutButton } from '@/components/admin/logout-button'

const adminNav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
]

async function checkAuth() {
  const cookieStore = await cookies()
  const session = cookieStore.get('freetenshi-admin-session')
  return !!session?.value
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <aside className="w-64 min-h-screen bg-black text-white fixed">
          <div className="p-6">
            <Link href="/dashboard" className="text-lg tracking-widest uppercase">
              FreeTenshi
            </Link>
            <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
          </div>
          
          <nav className="px-4 space-y-1">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded transition-colors"
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 w-64 p-4 border-t border-white/10 space-y-2">
            <Link
              href="/"
              className="block text-xs text-gray-500 hover:text-white transition-colors"
            >
              ← Back to Shop
            </Link>
            <AdminLogoutButton />
          </div>
        </aside>

        <main className="flex-1 p-8 ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}
