import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Header } from '@/components/shop/header'
import { Footer } from '@/components/shop/footer'
import { ProductGrid } from '@/components/shop/product-grid'
import { getFeaturedProducts, mockCollections } from '@/data/mock-products'

const featuredProducts = getFeaturedProducts()

export default async function HomePage() {
  const t = await getTranslations('home')
  const common = await getTranslations('common')

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[60px]">
        <section className="h-[70vh] flex items-center justify-center bg-[#f4f4f4] border-b border-[#e5e5e5] relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-black rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-black" />
          </div>
          <div className="text-center px-4 relative z-10">
            <h1 className="text-4xl md:text-6xl font-normal tracking-widest uppercase mb-4">
              FreeTenshi
            </h1>
            <p className="text-sm md:text-base text-[#666] tracking-wider mb-8">
              {t('tagline')}
            </p>
            <Link
              href="/collections/all"
              className="inline-block border border-black px-8 py-3 text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-all"
            >
              {common('shopNow')}
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 lg:px-8 border-b border-[#e5e5e5]">
          <h2 className="text-xs uppercase tracking-wider mb-8 text-center">{t('collections')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group relative aspect-square overflow-hidden bg-[#f4f4f4]"
              >
                <Image
                  src={collection.image || ''}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity group-hover:bg-black/50">
                  <div className="text-center text-white">
                    <span className="text-xs uppercase tracking-widest">{collection.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="py-12 px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xs uppercase tracking-wider">{t('featuredProducts')}</h2>
            <Link
              href="/collections/all"
              className="text-xs uppercase tracking-wider text-[#666] hover:text-black transition-colors"
            >
              {common('viewAll')}
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </section>

        <section className="py-16 px-4 lg:px-8 bg-black text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-normal tracking-wider uppercase mb-4">
              {t('limitedEdition')}
            </h2>
            <p className="text-sm text-[#999] leading-relaxed mb-8">
              {t('limitedEditionDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-12 text-xs uppercase tracking-wider">
              <div>
                <span className="block text-3xl font-light mb-2">01</span>
                <span className="text-[#999]">{t('step1')}</span>
              </div>
              <div>
                <span className="block text-3xl font-light mb-2">02</span>
                <span className="text-[#999]">{t('step2')}</span>
              </div>
              <div>
                <span className="block text-3xl font-light mb-2">03</span>
                <span className="text-[#999]">{t('step3')}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 lg:px-8 border-t border-[#e5e5e5]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs uppercase tracking-wider mb-8 text-center">{t('about')}</h2>
            <p className="text-sm text-[#666] leading-relaxed text-center max-w-2xl mx-auto">
              {t('aboutDesc')}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
