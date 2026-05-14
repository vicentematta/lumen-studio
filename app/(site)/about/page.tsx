import type { Metadata } from 'next'
import { getAboutPage } from '@/lib/queries/aboutPage'
import { AboutView } from '@/views/AboutView'

export const metadata: Metadata = {
  title: 'Nosotros',
  description:
    'Riverhaus combina desarrollo de negocio y diseño para llevar tu marca de lo común a lo relevante. Operamos desde Valdivia con clientes en Chile, LATAM y nichos seleccionados en EE.UU.',
}

export default async function AboutPage() {
  const content = await getAboutPage()

  if (!content) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-eyebrow uppercase text-brand-rio">
          Riverhaus · Studio
        </p>
        <h1 className="mt-4 font-display text-h1 text-ink">
          Pendiente · publica el documento{' '}
          <em className="italic">aboutPage</em> en Sanity Studio.
        </h1>
      </main>
    )
  }

  return <AboutView content={content} />
}
