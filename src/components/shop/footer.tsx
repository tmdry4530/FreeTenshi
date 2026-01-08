import Link from 'next/link'
import { siteConfig } from '@/config/site'

export function Footer() {
  return (
    <footer className="border-t border-[#e5e5e5] bg-[#f4f4f4]">
      <div className="px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xs uppercase tracking-wider mb-4">{siteConfig.name}</h3>
            <p className="text-xs text-[#666] leading-relaxed">
              {siteConfig.description}
            </p>
          </div>
          
          <div>
            <h3 className="text-xs uppercase tracking-wider mb-4">Links</h3>
            <ul className="space-y-2">
              {siteConfig.nav.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-[#666] hover:text-black transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xs uppercase tracking-wider mb-4">Social</h3>
            <div className="flex gap-4">
              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#666] hover:text-black transition-colors"
              >
                Twitter
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#666] hover:text-black transition-colors"
              >
                Instagram
              </a>
              <a
                href={siteConfig.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#666] hover:text-black transition-colors"
              >
                Discord
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
          <p className="text-xs text-[#666] text-center">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
