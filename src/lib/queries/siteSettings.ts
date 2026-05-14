/**
 * Server fetcher · siteSettings (singleton)
 * Migrado de src/hooks/useSiteSettings.ts (que se elimina en M6).
 * SIN DEFAULTS · Sanity es la única fuente de verdad.
 */
import { sanityFetch } from '../sanity-server'

export interface SiteSettings {
  _id: string
  siteLogoUrl: string | null
  siteName: string | null
  siteTagline: string | null

  // Footer CTA
  footerEyebrow: string | null
  footerHeading: string | null
  footerHeadingItalic: string | null
  footerSubtitle: string | null
  footerCtaBook: string | null
  footerCtaWork: string | null
  footerCopyright: string | null

  // Top navbar
  navLinkServices: string | null
  navLinkPricing: string | null

  // Footer nav columns
  navCol1Heading: string | null
  navLinkAbout: string | null
  navLinkWork: string | null
  navCol2Heading: string | null
  navLinkStrategy: string | null
  navLinkDesign: string | null
  navLinkEngineering: string | null
  navCol3Heading: string | null
  navLinkContact: string | null
  navLinkLogin: string | null
  navLinkSignup: string | null

  // Social
  socialInstagram: string | null
  socialTwitter: string | null
  socialWebsite: string | null
}

const QUERY = `*[_type == "siteSettings"][0]{
  _id,
  "siteLogoUrl": siteLogo.asset->url,
  siteName, siteTagline,
  footerEyebrow, footerHeading, footerHeadingItalic, footerSubtitle,
  footerCtaBook, footerCtaWork, footerCopyright,
  navLinkServices, navLinkPricing,
  navCol1Heading, navLinkAbout, navLinkWork,
  navCol2Heading, navLinkStrategy, navLinkDesign, navLinkEngineering,
  navCol3Heading, navLinkContact, navLinkLogin, navLinkSignup,
  socialInstagram, socialTwitter, socialWebsite
}`

export function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>(QUERY, {}, { tags: ['siteSettings'] })
}
