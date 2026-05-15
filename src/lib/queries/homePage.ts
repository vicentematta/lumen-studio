/**
 * Server fetcher · homePage (singleton)
 * Migrado de src/hooks/useHomePage.ts (que se elimina en M6).
 * SIN DEFAULTS · Sanity es la única fuente de verdad.
 */
import { sanityFetch } from '../sanity-server'

export interface HomeFeaturedService {
  _id: string
  name: string | null
  eyebrow: string | null
  short: string | null
  videoUrl: string | null
  slug: string | null
}

export interface HomeClientLogo {
  name: string | null
  logoUrl: string | null
}

export interface HomeContent {
  _id: string
  // Hero
  heroTitle: string | null
  heroSubtitle: string | null
  heroSubtitle2: string | null
  heroPrimaryLabel: string | null
  heroSecondaryLabel: string | null
  // Post-Hero empathetic
  aboutEyebrow: string | null
  aboutTitle: string | null
  aboutBody: string | null
  // Featured method card
  featuredMethodLabel: string | null
  featuredMethodBody: string | null
  featuredExploreLabel: string | null
  // Philosophy
  philosophyTitle: string | null
  philosophyDisciplineLabel: string | null
  philosophyDisciplineBody: string | null
  philosophyStandardLabel: string | null
  philosophyStandardBody: string | null
  // Services section
  servicesTitle: string | null
  servicesSubtitle: string | null
  servicesAllLabel: string | null
  // Clientes
  clientLogosEyebrow: string | null
  clientLogos: HomeClientLogo[]
  // CTA
  ctaTitle: string | null
  ctaSubtitle: string | null
  ctaLabel: string | null
  // Videos (CloudFront URLs)
  videoHero: string | null
  videoFeatured: string | null
  videoPhilosophy: string | null
  videoStrategy: string | null
  videoCraft: string | null
  // Featured services
  featuredServices: HomeFeaturedService[]
}

const QUERY = `*[_type == "homePage"][0]{
  _id,
  heroTitle, heroSubtitle, heroSubtitle2, heroPrimaryLabel, heroSecondaryLabel,
  aboutEyebrow, aboutTitle, aboutBody,
  featuredMethodLabel, featuredMethodBody, featuredExploreLabel,
  philosophyTitle,
  philosophyDisciplineLabel, philosophyDisciplineBody,
  philosophyStandardLabel, philosophyStandardBody,
  servicesTitle, servicesSubtitle, servicesAllLabel,
  clientLogosEyebrow,
  clientLogos[]{ name, "logoUrl": logo.asset->url },
  ctaTitle, ctaSubtitle, ctaLabel,
  videoHero, videoFeatured, videoPhilosophy, videoStrategy, videoCraft,
  featuredServices[]->{
    _id, name, eyebrow, short, videoUrl,
    "slug": slug.current
  }
}`

export function getHomePage(): Promise<HomeContent | null> {
  return sanityFetch<HomeContent | null>(QUERY, {}, { tags: ['homePage'] })
}
