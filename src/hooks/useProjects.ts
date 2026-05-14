import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'
import type { ProjectDoc } from '@/types/sanity'

const PROJECTS_QUERY = `*[_type == "project"] | order(_createdAt asc){
  _id, _type,
  slug, client, category, title, subtitle,
  year, role, duration, overview, meta, outcomes, seoDescription
}`

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]{
  _id, _type,
  slug, client, category, title, subtitle,
  year, role, duration, overview, meta, blocks, outcomes, seoDescription
}`

export function useProjects() {
  const [projects, setProjects] = useState<ProjectDoc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    sanityClient
      .fetch<ProjectDoc[]>(PROJECTS_QUERY)
      .then((data) => { if (data?.length) setProjects(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading }
}

export function useProject(slug: string | undefined) {
  const [project, setProject] = useState<ProjectDoc | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) { setLoading(false); return }

    sanityClient
      .fetch<ProjectDoc>(PROJECT_QUERY, { slug })
      .then((data) => { if (data) setProject(data) })
      .catch(() => {})
      .finally(() => setLoading(false))

    const sub = sanityClient
      .listen(`*[_type == "project" && slug.current == $slug]`, { slug }, { visibility: 'query' })
      .subscribe(() => {
        sanityClient
          .fetch<ProjectDoc>(PROJECT_QUERY, { slug })
          .then((data) => { if (data) setProject(data) })
          .catch(() => {})
      })

    return () => sub.unsubscribe()
  }, [slug])

  return { project, loading }
}
