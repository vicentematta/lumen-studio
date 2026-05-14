import type { HomePageDoc, ServiceDoc, ProjectDoc } from '@/types/sanity'

/** Fallback shown while Sanity loads or if document is empty */
export const homeDefaults: Omit<HomePageDoc, '_id' | '_type'> = {
  heroEyebrow: 'Studio',
  heroTitle: 'Brand, identity, and digital craft for the discerning few.',
  heroSubtitle: 'A studio for companies that compete on taste.',
  heroPrimaryLabel: 'See our work',
  heroSecondaryLabel: 'Start a project',
  aboutEyebrow: 'About',
  aboutTitle: 'We build the thing behind the brand.',
  aboutBody:
    'Lumen is a small, senior team of strategists, designers, and engineers working in partnership with founders and brands who compete on taste.',
  aboutCtaLabel: 'Learn more',
  philosophyQuote:
    'Design is not just what it looks like and feels like. Design is how it works.',
  philosophyAttribution: 'Steve Jobs',
  featuredProjects: [],
}

export const serviceDefaults: Omit<ServiceDoc, '_id' | '_type'> = {
  slug: { current: '' },
  name: '',
  eyebrow: '',
  short: '',
  summary: '',
  deliverables: [],
  process: [],
  related: [],
}

export const projectDefaults: Omit<ProjectDoc, '_id' | '_type'> = {
  slug: { current: '' },
  client: '',
  category: { en: '', es: '' },
  title: { en: '', es: '' },
  subtitle: { en: '', es: '' },
  year: '',
  role: '',
  duration: '',
  overview: { en: '', es: '' },
  meta: [],
  blocks: [],
}
