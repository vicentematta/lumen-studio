import { Link } from 'react-router-dom'
import { Instagram, Twitter, Globe } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { GlassButton } from '@/components/ui/GlassButton'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export function Footer() {
  const { settings } = useSiteSettings()

  const COLUMNS = [
    {
      heading: settings.navCol1Heading,
      links: [
        { label: settings.navLinkAbout, to: '/about' },
        { label: settings.navLinkWork, to: '/work' },
        { label: settings.navLinkPricing, to: '/pricing' },
      ],
    },
    {
      heading: settings.navCol2Heading,
      links: [
        { label: settings.navLinkStrategy, to: '/services/strategy' },
        { label: settings.navLinkDesign, to: '/services/design' },
        { label: settings.navLinkEngineering, to: '/services/engineering' },
      ],
    },
    {
      heading: settings.navCol3Heading,
      links: [
        { label: settings.navLinkContact, to: '/contact' },
        { label: settings.navLinkSignup, to: '/signup' },
      ],
    },
  ]

  return (
    <footer className="relative overflow-hidden bg-black pb-12 pt-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <Container width="lg">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div className="max-w-md">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
              {settings.footerEyebrow}
            </p>
            <h3 className="font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
              {settings.footerHeading}{' '}
              <em className="italic text-white/60">{settings.footerHeadingItalic}</em>.
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-white/60">{settings.footerSubtitle}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <GlassButton to="/contact" variant="solid" size="lg">
                {settings.footerCtaBook}
              </GlassButton>
              <GlassButton to="/work" variant="glass" size="lg">
                {settings.footerCtaWork}
              </GlassButton>
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-8 md:w-auto md:gap-14">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
                  {col.heading}
                </p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="text-sm text-white/70 transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} {settings.footerCopyright}
          </p>
          <div className="flex items-center gap-3">
            <a href={settings.socialInstagram} aria-label="Instagram"
              className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={settings.socialTwitter} aria-label="Twitter"
              className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white">
              <Twitter className="h-4 w-4" />
            </a>
            <a href={settings.socialWebsite} aria-label="Website"
              className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white">
              <Globe className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
