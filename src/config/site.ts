export const siteConfig = {
  name: 'FreeTenshi',
  description: 'Web3 Fashion & Art Commerce Platform',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Supported currencies
  currencies: {
    fiat: ['KRW', 'USD', 'JPY'] as const,
    crypto: ['ETH', 'USDT', 'USDC'] as const,
  },
  
  // Blockchain config
  chain: {
    id: Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 84532, // Base Sepolia
    name: 'Base Sepolia',
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.base.org',
    blockExplorer: 'https://sepolia.basescan.org',
    nftContract: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '',
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
