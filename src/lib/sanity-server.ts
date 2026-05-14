/**
 * Sanity client para uso EN SERVER COMPONENTS de Next.js.
 *
 * - Usa el wrapper de next-sanity (integra con el cache de Next.js para ISR)
 * - Sin stega (Vite legacy lo necesita; Next.js usa Visual Editing por otro path en M5)
 * - useCdn=true en producción → respuestas servidas desde CDN edge
 *
 * NO importar desde Client Components ('use client'). Para client-side queries,
 * usar el legacy client en `@/lib/sanity` (que se elimina en M6).
 */
import { createClient } from 'next-sanity'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'v9k35bzt'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID en .env.local')
}

export const sanityServer = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
})

/**
 * Helper para fetch con tags de Next (revalidación granular vía webhook).
 *
 * Uso típico:
 *   const data = await sanityFetch(QUERY, { tags: ['homePage'] })
 *
 * Cuando un documento de tipo homePage se publica en Sanity, un webhook
 * llama a /api/revalidate con tag='homePage' → Next.js invalida la cache
 * de esta query → próxima request regenera la página.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { tags?: string[]; revalidate?: number | false } = {},
): Promise<T> {
  return sanityServer.fetch<T>(query, params, {
    next: {
      tags: options.tags,
      revalidate: options.revalidate ?? 60, // default 60s
    },
  })
}
