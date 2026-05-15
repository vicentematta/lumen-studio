import type { Metadata } from 'next'
import { getProjects } from '@/lib/queries/projects'
import { WorkView } from '@/views/WorkView'

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Casos de estudio de estrategia comercial e identidad digital. Problemas reales, resultados concretos.',
}

export default async function WorkPage() {
  const projects = await getProjects()
  return <WorkView projects={projects} />
}
