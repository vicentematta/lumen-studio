import { Helmet } from 'react-helmet-async'

export const SITE_URL = 'https://riverhaus.xyz'
const SITE_NAME = 'Riverhaus'
const DEFAULT_DESCRIPTION =
  'Consultora bilingüe de negocio y diseño basada en Valdivia, Chile. Estrategia comercial + identidad digital para consolidar tu autoridad en tu categoría.'
const DEFAULT_IMAGE = `${SITE_URL}/og-fallback.png`

export interface SeoProps {
  title?: string
  description?: string
  image?: string
  /** Pathname starting with /  e.g. "/work/asme" */
  url?: string
  type?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

export function Seo({
  title,
  description,
  image,
  url,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME
  const metaDescription = description ?? DEFAULT_DESCRIPTION
  const metaImage = image ?? DEFAULT_IMAGE
  const metaUrl = url ? `${SITE_URL}${url}` : SITE_URL

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={metaUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* JSON-LD structured data */}
      {jsonLd !== undefined && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
