import type { Metadata } from 'next'
import { getPricingPage } from '@/lib/queries/pricingPage'
import { PricingView } from '@/views/PricingView'

export const metadata: Metadata = {
  title: 'Inversión',
  description:
    'Cómo cobramos. Primero el diagnóstico — siempre. La producción se cotiza según lo que el diagnóstico indique.',
}

export default async function PricingPage() {
  const content = await getPricingPage()

  if (!content) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-eyebrow uppercase text-brand-rio">
          Riverhaus · Studio
        </p>
        <h1 className="mt-4 font-display text-h1 text-ink">
          Pendiente · publica el documento{' '}
          <em className="italic">pricingPage</em> en Sanity Studio.
        </h1>
      </main>
    )
  }

  return <PricingView content={content} />
}
