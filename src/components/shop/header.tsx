'use client'

import Link from 'next/link'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import { siteConfig } from '@/config/site'
import { LocaleSwitcher } from '@/components/locale-switcher'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const cartItemCount = useCartStore((state) => state.items.length)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f4f4f4] border-b border-[#e5e5e5]">
      <div className="flex items-center justify-between h-[60px] px-4 lg:px-8">
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {siteConfig.nav.main.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs uppercase tracking-wider hover:opacity-60 transition-opacity"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <span className="text-lg font-normal tracking-widest uppercase">
            {siteConfig.name}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          
          <Link
            href="/cart"
            className="flex items-center gap-2 text-xs uppercase tracking-wider hover:opacity-60 transition-opacity"
          >
            <div className="relative">
              <ShoppingBag size={18} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className="hidden lg:inline">Cart</span>
          </Link>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-[60px] left-0 right-0 bg-[#f4f4f4] border-b border-[#e5e5e5] animate-slide-up">
          <nav className="flex flex-col p-4 gap-4">
            {siteConfig.nav.main.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-wider py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
