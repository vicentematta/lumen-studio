import type { MetadataRoute } from 'next'
import { sanityServer } from '@/lib/sanity-server'

const BASE_URL = 'https://riverhaus.xyz'

const STATIC: Array<{
  path: string
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
}> = [
  { path: '/',         priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/work',     priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about',    priority: 0.7, changeFrequency: 'monthly' },
  { path: '/pricing',  priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact',  priority: 0.6, changeFrequency: 'yearly'  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, projects] = await Promise.all([
    sanityServer.fetch<Array<{ slug: string }>>(
      `*[_type == "service" && defined(slug.current)]{ "slug": slug.current }`,
    ),
    sanityServer.fetch<Array<{ slug: string }>>(
      `*[_type == "project" && defined(slug.current)]{ "slug": slug.current }`,
    ),
  ])

  const now = new Date()

  return [
    ...STATIC.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...services.map(({ slug }) => ({
      url: `${BASE_URL}/services/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...projects.map(({ slug }) => ({
      url: `${BASE_URL}/work/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
