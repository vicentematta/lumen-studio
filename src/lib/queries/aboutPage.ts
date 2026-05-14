/**
 * Server fetcher · aboutPage (singleton)
 */
import { sanityFetch } from '../sanity-server'

export interface AboutValue {
  _key: string
  label: string | null
  body: string | null
}

export interface AboutContent {
  _id: string
  eyebrow: string | null
  titlePlain: string | null
  titleItalic: string | null
  subtitle: string | null
  ctaWork: string | null
  ctaSee: string | null
  valuesHeading: string | null
  values: AboutValue[]
  videoUrl: string | null
}

const QUERY = `*[_type == "aboutPage"][0]{
  _id, eyebrow, titlePlain, titleItalic, subtitle,
  ctaWork, ctaSee, valuesHeading, values, videoUrl
}`

export function getAboutPage(): Promise<AboutContent | null> {
  return sanityFetch<AboutContent | null>(QUERY, {}, { tags: ['aboutPage'] })
}
