export const siteConfig = {
  name: 'FreeTenshi',
  description: 'Fashion & Art Commerce Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',

  // Supported currencies
  currencies: {
    fiat: ['KRW', 'USD', 'JPY'] as const,
  },

  // Social links
  social: {
    twitter: 'https://twitter.com/freetenshi',
    instagram: 'https://instagram.com/freetenshi',
    discord: 'https://discord.gg/freetenshi',
  },
  
  // Navigation
  nav: {
    main: [
      { name: 'Shop', nameKo: '쇼핑', href: '/collections/all' },
      { name: 'Collections', nameKo: '컬렉션', href: '/collections' },
      { name: 'About', nameKo: '소개', href: '/about' },
    ],
    footer: [
      { name: 'Terms', nameKo: '이용약관', href: '/terms' },
      { name: 'Privacy', nameKo: '개인정보처리방침', href: '/privacy' },
      { name: 'Contact', nameKo: '문의', href: '/contact' },
    ],
  },
} as const

export type SiteConfig = typeof siteConfig
