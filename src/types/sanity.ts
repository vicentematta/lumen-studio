// ── Localized string (EN + ES) ────────────────────────────────────────────────
export interface LS { en: string; es: string }

// ── Home Page document ────────────────────────────────────────────────────────
export interface HomePageDoc {
  _id: string
  _type: 'homePage'
  heroEyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroPrimaryLabel: string
  heroSecondaryLabel: string
  aboutEyebrow: string
  aboutTitle: string
  aboutBody: string
  aboutCtaLabel: string
  philosophyQuote: string
  philosophyAttribution: string
  featuredProjects: Array<{ _ref: string }>
}

// ── Service document ──────────────────────────────────────────────────────────
export interface ServiceDoc {
  _id: string
  _type: 'service'
  slug: { current: string }
  name: string
  eyebrow: string
  short: string
  summary: string
  deliverables: string[]
  process: Array<{ _key: string; step: number; title: string; body: string }>
  related: string[]
  seoDescription?: string
}

// ── Project document ──────────────────────────────────────────────────────────
export type BlockKind = 'text' | 'quote' | 'stats'

export interface ProjectDoc {
  _id: string
  _type: 'project'
  slug: { current: string }
  client: string
  category: LS
  title: LS
  subtitle: LS
  year: string
  role: string
  duration: string
  overview: LS
  meta: Array<{ _key: string; label: LS; value: string }>
  blocks: Array<{
    _key: string
    kind: BlockKind
    eyebrow?: string
    title?: string
    body?: string
    attribution?: string
    items?: Array<{ value: string; label: string }>
  }>
  outcomes?: Array<{ _key: string; value: string; label: LS }>
  seoDescription?: string
}
