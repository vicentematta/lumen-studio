import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'
import type { ServiceDoc } from '@/types/sanity'

const SERVICES_QUERY = `*[_type == "service"] | order(_createdAt asc){
  _id, _type,
  slug, name, eyebrow, short, summary,
  deliverables, process, related, seoDescription
}`

const SERVICE_QUERY = `*[_type == "service" && slug.current == $slug][0]{
  _id, _type,
  slug, name, eyebrow, short, summary,
  deliverables, process, related, seoDescription
}`

export function useServices() {
  const [services, setServices] = useState<ServiceDoc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanityClient
      .fetch<ServiceDoc[]>(SERVICES_QUERY)
      .then((data) => { if (data?.length) setServices(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { services, loading }
}

export function useService(slug: string | undefined) {
  const [service, setService] = useState<ServiceDoc | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) { setLoading(false); return }

    sanityClient
      .fetch<ServiceDoc>(SERVICE_QUERY, { slug })
      .then((data) => { if (data) setService(data) })
      .catch(() => {})
      .finally(() => setLoading(false))

    const sub = sanityClient
      .listen(`*[_type == "service" && slug.current == $slug]`, { slug }, { visibility: 'query' })
      .subscribe(() => {
        sanityClient
          .fetch<ServiceDoc>(SERVICE_QUERY, { slug })
          .then((data) => { if (data) setService(data) })
          .catch(() => {})
      })

    return () => sub.unsubscribe()
  }, [slug])

  return { service, loading }
}
