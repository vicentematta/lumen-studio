/**
 * Server fetchers · services (collection + detail)
 */
import { sanityFetch } from '../sanity-server'

export interface ServiceProcessStep {
  step: number | null
  title: string | null
  body: string | null
}

export interface ServiceListItem {
  _id: string
  slug: string | null
  name: string | null
  eyebrow: string | null
  short: string | null
  videoUrl: string | null
}

export interface ServiceDoc extends ServiceListItem {
  summary: string | null
  deliverables: string[] | null
  process: ServiceProcessStep[]
  seoDescription: string | null
}

const LIST_QUERY = `*[_type == "service"] | order(_createdAt asc){
  _id,
  "slug": slug.current,
  name, eyebrow, short, videoUrl
}`

const DETAIL_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  name, eyebrow, short, summary, videoUrl,
  deliverables,
  process,
  seoDescription
}`

const SLUGS_QUERY = `*[_type == "service" && defined(slug.current)]{
  "slug": slug.current
}`

export function getServices(): Promise<ServiceListItem[]> {
  return sanityFetch<ServiceListItem[]>(
    LIST_QUERY,
    {},
    { tags: ['service', 'serviceList'] },
  )
}

export function getServiceBySlug(slug: string): Promise<ServiceDoc | null> {
  return sanityFetch<ServiceDoc | null>(
    DETAIL_QUERY,
    { slug },
    { tags: ['service', `service:${slug}`] },
  )
}

export async function getServiceSlugs(): Promise<string[]> {
  const rows = await sanityFetch<Array<{ slug: string }>>(
    SLUGS_QUERY,
    {},
    { tags: ['service'], revalidate: 3600 },
  )
  return rows.map((r) => r.slug).filter(Boolean)
}
