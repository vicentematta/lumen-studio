/**
 * Server fetchers · projects (collection + detail)
 */
import { sanityFetch } from '../sanity-server'

export interface ProjectBlock {
  _type: 'textBlock' | 'quoteBlock' | 'statsBlock' | 'imageBlock' | 'videoBlock'
  _key: string
  // textBlock
  eyebrow?: string | null
  title?: string | null
  body?: string | null
  // quoteBlock
  attribution?: string | null
  // statsBlock
  items?: Array<{ value: string | null; label: string | null }>
  // imageBlock
  image?: { url: string | null; alt: string | null; caption?: string | null } | null
  layout?: 'full' | 'contained' | 'pair' | null
  // videoBlock
  url?: string | null
  poster?: { url: string | null; alt: string | null } | null
}

export interface ProjectMetaItem {
  label: string | null
  value: string | null
}

export interface ProjectListItem {
  _id: string
  slug: string | null
  client: string | null
  title: string | null
  category: string | null
  year: string | null
}

export interface ProjectDoc extends ProjectListItem {
  subtitle: string | null
  role: string | null
  duration: string | null
  overview: string | null
  meta: ProjectMetaItem[] | null
  blocks: ProjectBlock[] | null
  seoDescription: string | null
}

const LIST_QUERY = `*[_type == "project"] | order(_createdAt asc){
  _id,
  "slug": slug.current,
  client,
  "title":    coalesce(title.es,    title.en),
  "category": coalesce(category.es, category.en),
  year
}`

const DETAIL_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  "slug":     slug.current,
  client,
  "title":    coalesce(title.es,    title.en),
  "subtitle": coalesce(subtitle.es, subtitle.en),
  "category": coalesce(category.es, category.en),
  year, role, duration,
  "overview": coalesce(overview.es, overview.en),
  "meta": meta[]{
    "label": coalesce(label.es, label.en),
    value
  },
  "blocks": blocks[]{
    _type,
    _key,
    eyebrow,
    title,
    body,
    attribution,
    "items": items[]{ value, label },
    layout,
    "image": image{ "url": asset->url, alt, caption },
    "poster": poster{ "url": asset->url, alt },
    url
  },
  seoDescription
}`

const SLUGS_QUERY = `*[_type == "project" && defined(slug.current)]{
  "slug": slug.current
}`

export function getProjects(): Promise<ProjectListItem[]> {
  return sanityFetch<ProjectListItem[]>(
    LIST_QUERY,
    {},
    { tags: ['project', 'projectList'] },
  )
}

export function getProjectBySlug(slug: string): Promise<ProjectDoc | null> {
  return sanityFetch<ProjectDoc | null>(
    DETAIL_QUERY,
    { slug },
    { tags: ['project', `project:${slug}`] },
  )
}

export async function getProjectSlugs(): Promise<string[]> {
  const rows = await sanityFetch<Array<{ slug: string }>>(
    SLUGS_QUERY,
    {},
    { tags: ['project'], revalidate: 3600 },
  )
  return rows.map((r) => r.slug).filter(Boolean)
}
