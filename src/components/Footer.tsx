import Link from 'next/link'
import { Instagram, Twitter, Globe } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { GlassButton } from '@/components/ui/GlassButton'
import { WorkCTAButton } from '@/components/WorkCTAButton'
import type { SiteSettings } from '@/lib/queries/siteSettings'

interface Props {
  settings: SiteSettings | null
}

export function Footer({ settings }: Props) {
  const COLUMNS = [
    {
      heading: settings?.navCol1Heading ?? '',
      links: [
        { label: settings?.navLinkAbout, href: '/about' },
        { label: settings?.navLinkWork, href: '/work' },
        { label: settings?.navLinkPricing, href: '/pricing' },
      ],
    },
    {
      heading: settings?.navCol2Heading ?? '',
      links: [
        { label: settings?.navLinkStrategy, href: '/services/estrategia-comercial' },
        { label: settings?.navLinkDesign, href: '/services/identidad-digital' },
        { label: settings?.navLinkEngineering, href: '/services/negocio-diseno' },
      ],
    },
    {
      heading: settings?.navCol3Heading ?? '',
      links: [{ label: settings?.navLinkContact, href: '/contact' }],
    },
  ]

  return (
    <footer className="relative overflow-hidden bg-black pb-12 pt-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <Container width="lg">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-end">
          <div className="max-w-md">
            {settings?.footerEyebrow ? (
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
                {settings.footerEyebrow}
              </p>
            ) : null}
            {settings?.footerHeading ? (
              <h3 className="font-display text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">
                {settings.footerHeading}
                {settings.footerHeadingItalic ? (
                  <>
                    {' '}
                    <em className="italic text-white/60">{settings.footerHeadingItalic}</em>
                  </>
                ) : null}
                .
              </h3>
            ) : null}
            {settings?.footerSubtitle ? (
              <p className="mt-5 text-sm leading-relaxed text-white/60">
                {settings.footerSubtitle}
              </p>
            ) : null}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <GlassButton to="/contact" variant="solid" size="lg">
                {settings?.footerCtaBook ?? 'Hablemos (30 min)'}
              </GlassButton>
              <WorkCTAButton label={settings?.footerCtaWork ?? 'Ver trabajos'} />
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-8 md:w-auto md:gap-14">
            {COLUMNS.map((col, i) => (
              <div key={`${col.heading}-${i}`}>
                {col.heading ? (
                  <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
                    {col.heading}
                  </p>
                ) : null}
                <ul className="space-y-3">
                  {col.links
                    .filter((l) => l.label)
                    .map((l) => (
                      <li key={l.href}>
                        <Link
                          href={l.href}
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
            © {new Date().getFullYear()} {settings?.footerCopyright ?? 'Riverhaus'}
          </p>
          <div className="flex items-center gap-3">
            {settings?.socialInstagram ? (
              <a
                href={settings.socialInstagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
            ) : null}
            {settings?.socialTwitter ? (
              <a
                href={settings.socialTwitter}
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
              >
                <Twitter className="h-4 w-4" />
              </a>
            ) : null}
            {settings?.socialWebsite ? (
              <a
                href={settings.socialWebsite}
                aria-label="Website"
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-white"
              >
                <Globe className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </footer>
  )
}
