/**
 * JSON-LD structured data generators.
 * Usados en server components — nunca importar desde 'use client'.
 */

const BASE_URL = 'https://riverhaus.xyz'
const ORG_ID = `${BASE_URL}/#organization`
const FOUNDER_ID = `${BASE_URL}/#founder`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Riverhaus',
    alternateName: 'Riverhaus · Negocio + Diseño',
    url: BASE_URL,
    logo: `${BASE_URL}/logo-riverhaus-light.svg`,
    image: `${BASE_URL}/og-fallback.png`,
    email: 'riverhaus.xyz@gmail.com',
    telephone: '+56-9-9233-9054',
    description:
      'Consultora bilingüe de negocio y diseño basada en Valdivia, Chile. Estrategia comercial e identidad digital para consolidar autoridad en tu categoría.',
    foundingDate: '2024',
    founder: { '@type': 'Person', '@id': FOUNDER_ID },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Valdivia',
      addressRegion: 'Los Ríos',
      addressCountry: 'CL',
    },
    areaServed: ['CL', 'ES', 'GB', 'LATAM'],
    sameAs: [
      'https://www.instagram.com/riverhaus',
      'https://www.linkedin.com/company/riverhaus',
    ],
  }
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BASE_URL}/#business`,
    name: 'Riverhaus',
    image: `${BASE_URL}/og-fallback.png`,
    priceRange: '$$$',
    url: BASE_URL,
    email: 'riverhaus.xyz@gmail.com',
    telephone: '+56-9-9233-9054',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Valdivia',
      addressRegion: 'Los Ríos',
      addressCountry: 'CL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -39.81,
      longitude: -73.24,
    },
    areaServed: ['CL', 'ES', 'GB'],
  }
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: 'Matías Cruzat',
    jobTitle: 'Founder & Strategy Director',
    worksFor: { '@id': ORG_ID },
    sameAs: [
      'https://www.linkedin.com/in/matiascruzat',
      'https://x.com/matiascruzat',
    ],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'Riverhaus',
    description: 'Consultora de negocio y diseño · Valdivia, Chile',
    publisher: { '@id': ORG_ID },
    inLanguage: ['es-CL', 'en'],
  }
}

export function serviceSchema(params: {
  name: string
  slug: string
  description?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    url: `${BASE_URL}/services/${params.slug}`,
    provider: { '@id': ORG_ID },
    serviceType: 'Brand & business strategy consulting',
    areaServed: ['CL', 'ES', 'GB'],
    description: params.description ?? undefined,
  }
}

export function creativeWorkSchema(params: {
  client: string
  title?: string | null
  slug: string
  year?: string | null
  category?: string | null
  description?: string | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: params.title ?? params.client,
    url: `${BASE_URL}/work/${params.slug}`,
    creator: { '@id': ORG_ID },
    description: params.description ?? undefined,
    datePublished: params.year ? `${params.year}-01-01` : undefined,
    about: params.category ?? undefined,
  }
}

export function breadcrumbSchema(
  items: Array<{ name: string; href?: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href ? `${BASE_URL}${item.href}` : undefined,
    })),
  }
}

/** Serializa uno o varios schemas como string para dangerouslySetInnerHTML. */
export function serializeSchema(
  ...schemas: Record<string, unknown>[]
): string {
  if (schemas.length === 1) return JSON.stringify(schemas[0])
  return JSON.stringify(schemas)
}
