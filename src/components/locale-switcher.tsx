'use client'

import { useTransition } from 'react'
import { useLocale } from 'next-intl'
import { Globe } from 'lucide-react'
import { setLocale } from '@/actions/locale'
import { locales, localeNames, type Locale } from '@/i18n/config'

export function LocaleSwitcher() {
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  const handleChange = (newLocale: Locale) => {
    startTransition(() => {
      setLocale(newLocale)
      window.location.reload()
    })
  }

  const nextLocale = locale === 'ko' ? 'en' : 'ko'

  return (
    <button
      onClick={() => handleChange(nextLocale)}
      disabled={isPending}
      className="flex items-center gap-1 text-xs uppercase tracking-wider hover:opacity-60 transition-opacity disabled:opacity-50"
      title={localeNames[nextLocale]}
    >
      <Globe size={16} />
      <span className="hidden sm:inline">{locale.toUpperCase()}</span>
    </button>
  )
}

export function LocaleSwitcherDropdown() {
  const locale = useLocale()
  const [isPending, startTransition] = useTransition()

  const handleChange = (newLocale: Locale) => {
    if (newLocale === locale) return
    startTransition(() => {
      setLocale(newLocale)
      window.location.reload()
    })
  }

  return (
    <div className="relative group">
      <button
        className="flex items-center gap-1 text-xs uppercase tracking-wider hover:opacity-60 transition-opacity"
        disabled={isPending}
      >
        <Globe size={16} />
        <span>{locale.toUpperCase()}</span>
      </button>
      <div className="absolute right-0 top-full mt-2 bg-white border border-[#e5e5e5] shadow-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {locales.map((l) => (
          <button
            key={l}
            onClick={() => handleChange(l)}
            className={`block w-full px-4 py-2 text-xs uppercase tracking-wider text-left hover:bg-[#f4f4f4] transition-colors ${
              l === locale ? 'bg-[#f4f4f4]' : ''
            }`}
          >
            {localeNames[l]}
          </button>
        ))}
      </div>
    </div>
  )
}
