import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Globe, Menu, X } from 'lucide-react'
import { GlassButton } from '@/components/ui/GlassButton'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { cn } from '@/lib/cn'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { settings } = useSiteSettings()

  const NAV_LINKS = [
    { label: settings.navLinkWork, to: '/work' },
    { label: settings.navLinkServices, to: '/services' },
    { label: settings.navLinkAbout, to: '/about' },
    { label: settings.navLinkPricing, to: '/pricing' },
    { label: settings.navLinkContact, to: '/contact' },
  ]

  return (
    <header className="absolute inset-x-0 top-0 z-30 px-4 pt-5 sm:px-6 sm:pt-6">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex origin-left scale-[0.8] items-center gap-2 text-white md:scale-100">
            {settings.siteLogoUrl
              ? <img src={settings.siteLogoUrl} alt={settings.siteName} className="h-8 w-auto object-contain" />
              : <>
                  <Globe className="h-5 w-5" />
                  <span className="text-base font-semibold tracking-tight">{settings.siteName}</span>
                </>
            }
          </Link>
          <ul className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    cn('text-sm font-medium transition-colors', isActive ? 'text-white' : 'text-white/70 hover:text-white')
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          {/* CTA: visible only from md up. On mobile the hamburger menu
              surfaces the same CTA inside the drawer (see below). */}
          {/* CTA: solo desde lg (≥1024px). En md el botón aprieta el logo;
              en mobile el hamburger surfacea la misma CTA. */}
          <div className="hidden lg:block">
            <GlassButton to="/signup" variant="glass-strong" size="sm" className="whitespace-nowrap">
              {settings.navLinkSignup}
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
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-white/80 hover:bg-white/[0.04] hover:text-white"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-2 px-4">
              <GlassButton to="/signup" variant="glass-strong" size="sm" className="w-full justify-center">
                {settings.navLinkSignup}
              </GlassButton>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
