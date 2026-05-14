/**
 * Server fetcher · pricingPage (singleton)
 */
import { sanityFetch } from '../sanity-server'

export interface PricingTier {
  _key: string
  slug: string | null
  name: string | null
  price: string | null
  cadence: string | null
  tagline: string | null
  features: string[] | null
  cta: string | null
  highlight: boolean | null
}

export interface PricingContent {
  _id: string
  eyebrow: string | null
  titlePlain: string | null
  titleItalic: string | null
  subtitle: string | null
  tiers: PricingTier[]
}

const QUERY = `*[_type == "pricingPage"][0]{
  _id, eyebrow, titlePlain, titleItalic, subtitle,
  tiers
}`

export function getPricingPage(): Promise<PricingContent | null> {
  return sanityFetch<PricingContent | null>(QUERY, {}, { tags: ['pricingPage'] })
}
