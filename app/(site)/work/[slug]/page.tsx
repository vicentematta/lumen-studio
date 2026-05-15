import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getProjects,
  getProjectBySlug,
  getProjectSlugs,
} from '@/lib/queries/projects'
import { WorkDetailView } from '@/views/WorkDetailView'

export async function generateStaticParams() {
  const slugs = await getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)
  if (!project) return { title: 'Proyecto no encontrado' }
  return {
    title: project.client ?? 'Proyecto',
    description: project.seoDescription ?? project.overview ?? undefined,
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params

  const [project, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ])

  if (!project) notFound()

  const idx = allProjects.findIndex((p) => p.slug === slug)
  const total = allProjects.length

  const prev =
    total >= 2 && idx !== -1
      ? allProjects[(idx - 1 + total) % total]
      : { ...project }
  const next =
    total >= 2 && idx !== -1
      ? allProjects[(idx + 1) % total]
      : { ...project }

  return <WorkDetailView project={project} prev={prev} next={next} />
}
