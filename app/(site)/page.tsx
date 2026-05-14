/**
 * Home page · Server Component · /
 *
 * Fetch del homePage en el servidor antes de mandar HTML al cliente.
 * Sin DEFAULTS · sin client-side flash · contenido renderizado en SSR.
 *
 * Si Sanity devuelve null (documento no publicado todavía), mostramos
 * un mensaje al editor pidiéndole crear el documento en Studio.
 */
import type { Metadata } from 'next'
import { getHomePage } from '@/lib/queries/homePage'
import { HomeView } from '@/views/HomeView'

export const metadata: Metadata = {
  // `absolute` evita que el template '%s · Riverhaus' del root layout
  // duplique el nombre en la home
  title: { absolute: 'Riverhaus · Negocio + Diseño' },
  description:
    'Consultora bilingüe de negocio y diseño basada en Valdivia, Chile. Estrategia comercial + identidad digital para consolidar tu autoridad en tu categoría.',
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Riverhaus',
  url: 'https://riverhaus.xyz',
  description:
    'Consultora bilingüe de negocio y diseño basada en Valdivia, Chile.',
  logo: {
    '@type': 'ImageObject',
    url: 'https://riverhaus.xyz/logo-riverhaus-light.svg',
  },
}

export default async function HomePage() {
  const content = await getHomePage()

  if (!content) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-eyebrow uppercase text-brand-rio">
          Riverhaus · Studio
        </p>
        <h1 className="mt-4 font-display text-h1 text-ink">
          Pendiente · publica el documento <em className="italic">homePage</em>{' '}
          en Sanity Studio.
        </h1>
      </main>
    )
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomeView content={content} />
    </>
  )
}
