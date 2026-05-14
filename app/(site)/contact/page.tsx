import type { Metadata } from 'next'
import { getContactPage } from '@/lib/queries/contactPage'
import { ContactView } from '@/views/ContactView'

export const metadata: Metadata = {
  title: 'Escríbenos',
  description:
    'Coordinemos una conversación de 30 minutos. Sin venta forzada. Si no somos match, te lo decimos.',
}

interface Props {
  searchParams: Promise<{ email?: string; tier?: string }>
}

export default async function ContactPage({ searchParams }: Props) {
  const [content, params] = await Promise.all([
    getContactPage(),
    searchParams,
  ])

  if (!content) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <p className="font-body text-eyebrow uppercase text-brand-rio">
          Riverhaus · Studio
        </p>
        <h1 className="mt-4 font-display text-h1 text-ink">
          Pendiente · publica el documento{' '}
          <em className="italic">contactPage</em> en Sanity Studio.
        </h1>
      </main>
    )
  }

  return <ContactView content={content} initialEmail={params.email} />
}
