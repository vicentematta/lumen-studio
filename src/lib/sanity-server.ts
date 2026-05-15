/**
 * Sanity clients para Next.js App Router.
 *
 * - sanityServer   → contenido publicado, CDN, sin token (rutas públicas)
 * - sanityDraft    → borradores + stega encoding, con token Editor (draft mode)
 * - sanityFetch()  → selector automático según draftMode() de Next.js
 */
import { createClient } from 'next-sanity'
import { draftMode } from 'next/headers'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'v9k35bzt'
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID en .env.local')
}

// Cliente público — producción, CDN, solo contenido publicado
export const sanityServer = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: false,
})

// Cliente draft — borradores en tiempo real, stega encoding para click-to-edit
export const sanityDraft = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})

/**
 * Fetch con selección automática de cliente según draft mode.
 *
 * - Modo normal:  sanityServer (ISR cache, contenido publicado)
 * - Draft mode:   sanityDraft  (sin cache, borradores, stega encoding)
 *
 * Las tags de revalidación siguen activas en modo normal para el webhook.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: { tags?: string[]; revalidate?: number | false } = {},
): Promise<T> {
  // draftMode() lanza fuera de contexto HTTP (ej. generateStaticParams en build time).
  // En ese caso siempre usamos el cliente publicado.
  let isDraft = false
  try {
    const dm = await draftMode()
    isDraft = dm.isEnabled
  } catch {
    isDraft = false
  }

  const client = isDraft ? sanityDraft : sanityServer

  return client.fetch<T>(query, params, {
    next: {
      tags: options.tags,
      revalidate: isDraft ? 0 : (options.revalidate ?? 60),
    },
  })
}
