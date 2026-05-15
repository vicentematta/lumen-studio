import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getServices,
  getServiceBySlug,
  getServiceSlugs,
} from '@/lib/queries/services'
import { ServiceDetailView } from '@/views/ServiceDetailView'
import { serviceSchema, breadcrumbSchema, serializeSchema } from '@/lib/jsonld'

/**
 * generateStaticParams pre-renderiza todas las páginas de servicios en
 * build time. Si Sanity agrega un nuevo service después del build, se
 * genera on-demand en la primera request gracias a fallback (default).
 */
export async function generateStaticParams() {
  const slugs = await getServiceSlugs()
  return slugs.map((slug) => ({ slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return { title: 'Servicio no encontrado' }
  return {
    title: service.name ?? 'Servicio',
    description: service.seoDescription ?? service.summary ?? undefined,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params

  // Fetch en paralelo: el servicio actual + todos los servicios (para prev/next)
  const [service, allServices] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
  ])

  if (!service) {
    notFound()
  }

  // Resolver prev/next desde la lista ordenada (wrap-around)
  const idx = allServices.findIndex((s) => s.slug === slug)
  const total = allServices.length

  // Si solo hay 1 servicio o no se encuentra, usar el mismo como prev y next
  const prev =
    total >= 2 && idx !== -1
      ? allServices[(idx - 1 + total) % total]
      : ({ ...service, _id: service._id })
  const next =
    total >= 2 && idx !== -1
      ? allServices[(idx + 1) % total]
      : ({ ...service, _id: service._id })

  const ldJson = serializeSchema(
    serviceSchema({
      name: service.name ?? service.slug ?? '',
      slug: service.slug ?? '',
      description: service.seoDescription ?? service.summary,
    }),
    breadcrumbSchema([
      { name: 'Inicio', href: '/' },
      { name: 'Servicios', href: '/services' },
      { name: service.name ?? '' },
    ]),
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson }} />
      <ServiceDetailView service={service} prev={prev} next={next} />
    </>
  )
}
