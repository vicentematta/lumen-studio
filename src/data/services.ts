import { VIDEOS, type VideoEntry } from '@/lib/media'

export interface ServiceSeo {
  /** SEO-optimised description (≤160 chars). Falls back to summary. */
  description?: string
  /** Absolute URL to a static OG image. Falls back to og-default.jpg. */
  ogImage?: string
}

export interface Service {
  slug: string
  name: string
  eyebrow: string
  short: string
  summary: string
  deliverables: string[]
  process: Array<{ step: number; title: string; body: string }>
  related: string[]
  hero: VideoEntry
  seo?: ServiceSeo
}

export const SERVICES: Service[] = [
  {
    slug: 'strategy',
    name: 'Research & Insight',
    eyebrow: 'Strategy',
    short: 'Surface insights that drive lasting change.',
    summary:
      'We start where the questions are sharpest — your customers, the market, the patterns nobody is naming yet. Then we translate that signal into a roadmap your team can actually run. No generic frameworks, no slide decks that gather dust.',
    deliverables: [
      'Market & user research',
      'Brand & product positioning',
      'Competitive landscape maps',
      'Strategic roadmap',
      'Messaging architecture',
    ],
    process: [
      {
        step: 1,
        title: 'Discovery',
        body: "We interview your customers, your team, and your competitors' customers. We read every review, every support ticket, every forum thread where your category lives.",
      },
      {
        step: 2,
        title: 'Synthesis',
        body: 'Raw signal becomes structured insight. We map the jobs-to-be-done, the anxieties, the moments where trust is won or lost — then find the white space only you can own.',
      },
      {
        step: 3,
        title: 'Positioning',
        body: 'A single, defensible position that your team can repeat without a deck. We stress-test it against every persona, every channel, every pitch scenario.',
      },
      {
        step: 4,
        title: 'Roadmap',
        body: "Priorities ranked by signal strength, not gut feel. Each initiative mapped to a measurable outcome so you know when it's working.",
      },
    ],
    related: ['design', 'engineering'],
    hero: VIDEOS.serviceStrategy,
  },
  {
    slug: 'design',
    name: 'Design & Execution',
    eyebrow: 'Craft',
    short: 'Experiences that feel effortless and look extraordinary.',
    summary:
      'Identity, interface, motion, and copy — pulled into a single coherent expression. We design what ships, not what looks good in a deck. Every pixel earns its place, every interaction has a reason.',
    deliverables: [
      'Visual identity systems',
      'Product & web design',
      'Motion & art direction',
      'Design tokens & component library',
      'Brand guidelines',
    ],
    process: [
      {
        step: 1,
        title: 'Direction',
        body: "Before a single frame, we align on a creative brief: the feeling we're chasing, the references we respect, the lines we won't cross. Direction saves weeks of revision.",
      },
      {
        step: 2,
        title: 'Identity',
        body: 'Logomark, typographic system, color palette, and motion signature — built as a system, not a set of assets. Everything derives from the core mark.',
      },
      {
        step: 3,
        title: 'Interface',
        body: 'Wireframes, then high-fidelity — in that order. We test with real users before we make it beautiful, so beauty and function land together.',
      },
      {
        step: 4,
        title: 'Handoff',
        body: 'A complete design system: tokens, components, interaction specs, and a living Figma library your engineering team can build from without a translator.',
      },
    ],
    related: ['strategy', 'engineering'],
    hero: VIDEOS.serviceCraft,
  },
  {
    slug: 'engineering',
    name: 'Engineering & Launch',
    eyebrow: 'Build',
    short: 'Production-grade builds, end to end.',
    summary:
      "From the codebase to the day-one launch. We build with the same craft we design with — typed, tested, and tuned. Fast by default, accessible without compromise, maintainable long after we're gone.",
    deliverables: [
      'Web & mobile builds',
      'Performance & Core Web Vitals',
      'DX tooling & CI/CD',
      'Launch operations',
      'Post-launch monitoring',
    ],
    process: [
      {
        step: 1,
        title: 'Architecture',
        body: "We choose the stack that fits the problem, not the stack we're comfortable with. Every architectural decision is documented with a rationale so future teams understand the why.",
      },
      {
        step: 2,
        title: 'Build',
        body: 'Component-driven, type-safe, tested. We write the kind of code that other engineers are relieved to inherit — legible names, small files, zero magic.',
      },
      {
        step: 3,
        title: 'Performance',
        body: 'Core Web Vitals from day one, not as an afterthought. We tune load times, animation budgets, and bundle size before the first user lands.',
      },
      {
        step: 4,
        title: 'Launch',
        body: "Staged rollout, monitoring in place, rollback rehearsed. We stay on call through the first 72 hours so you don't have to hold your breath alone.",
      },
    ],
    related: ['strategy', 'design'],
    hero: VIDEOS.featured,
  },
]

export function findService(slug: string | undefined): Service | undefined {
  if (!slug) return undefined
  return SERVICES.find((s) => s.slug === slug)
}

export function adjacentServices(slug: string): { prev: Service; next: Service } {
  const i = SERVICES.findIndex((s) => s.slug === slug)
  const prev = SERVICES[(i - 1 + SERVICES.length) % SERVICES.length]
  const next = SERVICES[(i + 1) % SERVICES.length]
  return { prev, next }
}
