'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { GlassButton } from '@/components/ui/GlassButton'
import { cn } from '@/lib/cn'
import type { SiteSettings } from '@/lib/queries/siteSettings'

interface Props {
  settings: SiteSettings | null
}

export function Navbar({ settings }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const NAV_LINKS = [
    { label: settings?.navLinkWork ?? '', href: '/work' },
    { label: settings?.navLinkServices ?? '', href: '/services' },
    { label: settings?.navLinkAbout ?? '', href: '/about' },
    { label: settings?.navLinkPricing ?? '', href: '/pricing' },
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-5 sm:px-6 sm:pt-6">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-24 lg:gap-32">
          <Link
            href="/"
            className="flex origin-left scale-[0.8] items-center gap-2 text-white md:scale-100"
          >
            <img
              src={settings?.siteLogoUrl ?? '/logo-riverhaus-light.svg'}
              alt={settings?.siteName ?? 'Riverhaus'}
              className="h-7 w-auto object-contain"
            />
          </Link>
          <ul className="hidden items-center gap-[2.275rem] md:flex">
            {NAV_LINKS.filter((l) => l.label).map((l) => {
              const isActive = pathname === l.href || pathname?.startsWith(l.href + '/')
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={cn(
                      'font-body text-sm font-normal uppercase !tracking-[0.05em] transition-colors',
                      isActive ? 'text-white' : 'text-white/70 hover:text-white',
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          {/* CTA: solo desde lg (≥1024px). Apunta a /contact (Auth eliminado en M2a) */}
          <div className="hidden lg:block">
            <GlassButton to="/contact" variant="solid" size="sm" className="whitespace-nowrap">
              {settings?.navCtaLabel ?? 'Agenda diagnóstico'}
            </GlassButton>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-white md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="liquid-glass mx-auto mt-3 max-w-5xl rounded-3xl p-4 md:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.filter((l) => l.label).map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 font-body text-sm font-normal uppercase !tracking-[0.05em] text-white/80 hover:bg-white/[0.04] hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-4">
              <GlassButton
                to="/contact"
                variant="solid"
                size="sm"
                className="w-full justify-center"
                onClick={() => setOpen(false)}
              >
                {settings?.navCtaLabel ?? 'Agenda diagnóstico'}
              </GlassButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
