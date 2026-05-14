import { VIDEOS, type VideoEntry } from '@/lib/media'

/** Localised string: holds both language variants on the data object. */
export type LS = { en: string; es: string }

/** Return the correct locale string — defaults to English. */
export function loc(s: LS, lang: string): string {
  return lang === 'es' ? s.es : s.en
}

export type Block =
  | { kind: 'text'; eyebrow?: string; title: string; body: string }
  | { kind: 'media'; src: string; aspect?: '16/9' | '4/3' | '1/1'; caption?: string }
  | { kind: 'split'; eyebrow?: string; title: string; body: string; src: string; reverse?: boolean }
  | { kind: 'quote'; body: string; attribution: string }
  | { kind: 'stats'; items: Array<{ value: string; label: string }> }

export interface ProjectSeo {
  /** SEO-optimised description (≤160 chars). Falls back to overview. */
  description?: string
  /** Absolute URL to a static OG image. Falls back to og-default.jpg. */
  ogImage?: string
}

export interface Project {
  slug: string
  client: string
  category: LS
  title: LS
  subtitle: LS
  year: string
  role: string
  duration: string
  hero: VideoEntry
  overview: LS
  meta: Array<{ label: LS; value: string }>
  blocks: Block[]
  outcomes?: Array<{ value: string; label: LS }>
  gallery?: VideoEntry[]
  seo?: ProjectSeo
}

const META_LABELS = {
  client: { en: 'Client', es: 'Cliente' },
  year: { en: 'Year', es: 'Año' },
  role: { en: 'Role', es: 'Rol' },
  duration: { en: 'Duration', es: 'Duración' },
} satisfies Record<string, LS>

export const PROJECTS: Project[] = [
  {
    slug: 'quorum',
    client: 'Quorum',
    category: { en: 'Editorial Direction', es: 'Dirección Editorial' },
    title: {
      en: 'A copy sequencing protocol for long-form thought.',
      es: 'Un protocolo de secuenciación de copy para el pensamiento de largo aliento.',
    },
    subtitle: {
      en: 'Helping a media collective move from case-study brevity to editorial depth — a content architecture that sequences ideas without losing readers.',
      es: 'Ayudando a un colectivo de medios a pasar de la brevedad del case study a la profundidad editorial — una arquitectura de contenido que secuencia ideas sin perder lectores.',
    },
    year: '2026',
    role: 'Editorial strategy · Content architecture · Art direction',
    duration: '12 weeks',
    hero: VIDEOS.philosophy,
    overview: {
      en: 'Quorum had spent two years publishing research in case-study format — tight, structured, useful. But readers wanted more: the argument behind the finding, the texture behind the number. We built a sequencing protocol that moves copy from summary to story without losing the rigour. The result is a content system their editorial team now uses as a constitution.',
      es: 'Quorum había pasado dos años publicando investigaciones en formato de case study — precisas, estructuradas, útiles. Pero los lectores querían más: el argumento detrás del hallazgo, la textura detrás del número. Construimos un protocolo de secuenciación que mueve el copy del resumen a la historia sin perder el rigor. El resultado es un sistema de contenido que el equipo editorial usa como constitución.',
    },
    meta: [
      { label: META_LABELS.client, value: 'Quorum Media' },
      { label: META_LABELS.year, value: '2026' },
      { label: META_LABELS.role, value: 'Editorial strategy · Content architecture' },
      { label: META_LABELS.duration, value: '12 weeks' },
    ],
    blocks: [
      {
        kind: 'text',
        eyebrow: 'The brief',
        title: 'Case study brevity is not editorial authority.',
        body: "Quorum's existing format answered one question per piece: what happened and what did it cost. Their audience had outgrown that. Readers arrived with context and left for synthesis elsewhere. The brief was to design a content sequence that earns longer attention without becoming a book.",
      },
      {
        kind: 'split',
        eyebrow: 'Architecture',
        title: 'Four moves, in order.',
        body: 'We distilled the protocol to four sequential moves: orient (the one-sentence context), complicate (the real tension the case study omits), develop (the argument in full), resolve (the implication, not the conclusion). Every piece follows the same arc. The format is invisible; the thinking is not.',
        src: VIDEOS.serviceStrategy.mp4,
      },
      {
        kind: 'media',
        src: VIDEOS.philosophy.mp4,
        aspect: '16/9',
        caption: 'The sequencing grid — four moves, each with its own typographic weight and editorial intent.',
      },
      {
        kind: 'stats',
        items: [
          { value: '4', label: 'Protocol moves in the system' },
          { value: '+68%', label: 'Avg. read completion rate' },
          { value: '12 wks', label: 'Brief to full editorial rollout' },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Outcome',
        title: 'A format that taught itself.',
        body: "Within three months, the editorial team was applying the protocol without reference to the guide. The four moves had become instinct. Quorum's pieces are now cited as models by two peer publications — not for their conclusions, but for how the argument moves.",
      },
    ],
    outcomes: [
      { value: '+68%', label: { en: 'Read completion rate', es: 'Tasa de lectura completa' } },
      { value: '4', label: { en: 'Protocol moves, org-wide', es: 'Movimientos del protocolo adoptados' } },
      { value: '12 wks', label: { en: 'From brief to rollout', es: 'Del brief al lanzamiento' } },
    ],
    gallery: [VIDEOS.philosophy, VIDEOS.serviceStrategy, VIDEOS.serviceCraft],
  },
  {
    slug: 'asme',
    client: 'ASME',
    category: { en: 'Brand & Web', es: 'Marca y Web' },
    title: {
      en: 'A new posture for a research collective.',
      es: 'Una nueva postura para un colectivo de investigación.',
    },
    subtitle: {
      en: 'Re-positioning a 40-year research collective as the trusted destination for serious independent thought.',
      es: 'Reposicionando un colectivo de investigación de 40 años como el destino de confianza para el pensamiento independiente serio.',
    },
    year: '2026',
    role: 'Brand strategy · Identity · Web',
    duration: '14 weeks',
    hero: VIDEOS.heroLoop,
    overview: {
      en: 'ASME approached us with a quiet problem: their work was world-class, but their public surface looked like a 2010 portfolio site. The audience they wanted — researchers, PhDs, institutional partners — had drifted to newer collectives that felt sharper. We rebuilt the posture: a tighter editorial voice, a serif-led identity, and a single-page experience that lets the work breathe.',
      es: 'ASME llegó con un problema silencioso: su trabajo era de clase mundial, pero su presencia pública parecía un sitio de portafolio de 2010. El público que querían — investigadores, PhDs, socios institucionales — había migrado hacia colectivos más nuevos y más nítidos. Reconstruimos la postura: una voz editorial más precisa, una identidad con serifa, y una experiencia de página única que deja respirar el trabajo.',
    },
    meta: [
      { label: META_LABELS.client, value: 'ASME Research Collective' },
      { label: META_LABELS.year, value: '2026' },
      { label: META_LABELS.role, value: 'Brand · Identity · Web' },
      { label: META_LABELS.duration, value: '14 weeks' },
    ],
    blocks: [
      {
        kind: 'text',
        eyebrow: 'The brief',
        title: 'Make the work the only thing in the room.',
        body: 'The previous site competed with itself — five hero modules, three CTAs, a mid-page newsletter pop. We removed everything except the writing, the films, and a single way in. The brand became a posture, not a logo.',
      },
      {
        kind: 'split',
        eyebrow: 'Identity',
        title: 'A serif that thinks for itself.',
        body: "We paired Instrument Serif italic for emphasis with a tightly tracked sans for body. The wordmark is a globe — borrowed from cartography — to signal that the collective's scope is genuinely global.",
        src: VIDEOS.philosophy.mp4,
      },
      {
        kind: 'media',
        src: VIDEOS.featured.mp4,
        aspect: '16/9',
        caption: 'The home loop — a single 12-second video that crossfades back to black between plays.',
      },
      {
        kind: 'quote',
        body: 'It is the first time our public face has matched the rigor of our private work.',
        attribution: 'Director of Communications, ASME',
      },
      {
        kind: 'stats',
        items: [
          { value: '+312%', label: 'Avg. session duration' },
          { value: '4.8x', label: 'Inbound research partners' },
          { value: '0', label: 'Stock images shipped' },
        ],
      },
    ],
    outcomes: [
      { value: '+312%', label: { en: 'Session duration', es: 'Duración de sesión' } },
      { value: '4.8x', label: { en: 'Inbound partners', es: 'Socios entrantes' } },
      { value: '<1.4s', label: { en: 'Largest contentful paint', es: 'Mayor renderizado de contenido' } },
    ],
    gallery: [VIDEOS.heroLoop, VIDEOS.philosophy, VIDEOS.featured],
  },
  {
    slug: 'velorah',
    client: 'Velorah',
    category: { en: 'Identity', es: 'Identidad' },
    title: {
      en: 'A cinematic identity system for a quiet luxury label.',
      es: 'Un sistema de identidad cinematográfico para una marca de lujo silenciosa.',
    },
    subtitle: {
      en: "Building a brand world for a slow-fashion atelier that wanted to stay invisible to anyone who wasn't paying close attention.",
      es: 'Construyendo un mundo de marca para un taller de moda lenta que quería pasar desapercibido para quienes no prestaban atención.',
    },
    year: '2026',
    role: 'Brand · Identity · Art direction',
    duration: '10 weeks',
    hero: VIDEOS.philosophy,
    overview: {
      en: "Velorah's founders had spent three years sourcing materials and refusing to launch. When they finally did, they wanted the brand to feel like discovering a place rather than seeing an ad. We built an identity that rewards attention — long-loop films, monolithic typography, a palette of black and warm dust.",
      es: 'Los fundadores de Velorah habían pasado tres años eligiendo materiales y negándose a lanzar. Cuando finalmente lo hicieron, querían que la marca se sintiera como descubrir un lugar en vez de ver un anuncio. Construimos una identidad que recompensa la atención — films en loop largo, tipografía monolítica, una paleta de negro y polvo cálido.',
    },
    meta: [
      { label: META_LABELS.client, value: 'Velorah Atelier' },
      { label: META_LABELS.year, value: '2026' },
      { label: META_LABELS.role, value: 'Brand · Identity · Art direction' },
      { label: META_LABELS.duration, value: '10 weeks' },
    ],
    blocks: [
      {
        kind: 'text',
        eyebrow: 'Direction',
        title: 'Quiet by design.',
        body: "No claims, no taglines, no hero copy. Velorah's site opens on a single moving image and a single line of italic. The intent is for the viewer to feel something before they read anything.",
      },
      {
        kind: 'split',
        eyebrow: 'Films',
        title: 'Films that do not shout.',
        body: 'Three long-form looping films were shot at the atelier — on the loom, at the bench, in the drying room. No music, no voiceover. The brand is the work in motion.',
        src: VIDEOS.serviceCraft.mp4,
        reverse: true,
      },
      {
        kind: 'media',
        src: VIDEOS.heroLoop.mp4,
        aspect: '16/9',
      },
      {
        kind: 'quote',
        body: 'You made our brand feel like a place. People email us from a single page; we have never had to explain ourselves.',
        attribution: 'Founder, Velorah',
      },
    ],
    outcomes: [
      { value: '12 weeks', label: { en: 'Sold out first drop', es: 'Primera gota agotada' } },
      { value: '83%', label: { en: 'Direct organic traffic', es: 'Tráfico orgánico directo' } },
      { value: '4', label: { en: 'Press features without outreach', es: 'Apariciones en prensa sin outreach' } },
    ],
    gallery: [VIDEOS.philosophy, VIDEOS.serviceCraft, VIDEOS.heroLoop],
  },
  {
    slug: 'aethera',
    client: 'Aethera',
    category: { en: 'Brand & Identity', es: 'Marca e Identidad' },
    title: {
      en: 'A still, considered identity for a creative collective.',
      es: 'Una identidad quieta y considerada para un colectivo creativo.',
    },
    subtitle: {
      en: 'Building the visual and editorial language for a film-led collective that moves at the pace of thought, not trend.',
      es: 'Construyendo el lenguaje visual y editorial para un colectivo liderado por cine que se mueve al ritmo del pensamiento, no de la tendencia.',
    },
    year: '2026',
    role: 'Brand · Identity · Editorial direction',
    duration: '8 weeks',
    hero: VIDEOS.aetheraCinematic,
    overview: {
      en: 'Aethera came with a clear ambition and no need to advertise it. The collective produces films, books, and objects — each a slow-made thing. Our task was to find a visual language that did not crowd the work. We built a system of deliberate restraint: a single typeface, a palette of fog and warm stone, and a hero film that holds a single frame for twelve seconds before it moves.',
      es: 'Aethera llegó con una ambición clara y sin necesidad de publicidad. El colectivo produce films, libros y objetos — cada uno elaborado con calma. Nuestra tarea fue encontrar un lenguaje visual que no saturara el trabajo. Construimos un sistema de contención deliberada: una sola tipografía, una paleta de niebla y piedra cálida, y un film de apertura que sostiene un único fotograma durante doce segundos antes de moverse.',
    },
    meta: [
      { label: META_LABELS.client, value: 'Aethera Collective' },
      { label: META_LABELS.year, value: '2026' },
      { label: META_LABELS.role, value: 'Brand · Identity · Editorial direction' },
      { label: META_LABELS.duration, value: '8 weeks' },
    ],
    blocks: [
      {
        kind: 'text',
        eyebrow: 'Direction',
        title: 'Restraint as a medium.',
        body: 'The brief arrived as two sentences. No mood boards, no competitor lists. The collective knew exactly what it was and wanted the identity to know it too — without explanation, without persuasion.',
      },
      {
        kind: 'split',
        eyebrow: 'Identity',
        title: 'One typeface. One weight. No exceptions.',
        body: 'We anchored the entire system in Instrument Serif italic — used both for display and for running text. The monotypographic constraint forces every design decision to be resolved by spacing, not style variety. The wordmark is the word, set at one size, in one weight.',
        src: VIDEOS.aetheraCinematic.mp4,
      },
      {
        kind: 'media',
        src: VIDEOS.heroLoop.mp4,
        aspect: '16/9',
        caption: 'The opening sequence — a slow dissolve from black to the first frame, held for twelve seconds.',
      },
      {
        kind: 'stats',
        items: [
          { value: '1', label: 'Typeface in the system' },
          { value: '8 wks', label: 'From brief to launch' },
          { value: '0', label: 'Revisions to the wordmark' },
        ],
      },
      {
        kind: 'text',
        eyebrow: 'Outcome',
        title: 'The work found its audience before we wrote a press release.',
        body: 'Within six weeks of launch, three international publications had covered the collective unprompted. The identity held — not because it was clever, but because it was consistent and impossible to misread.',
      },
    ],
    outcomes: [
      { value: '3', label: { en: 'Press features, no outreach', es: 'Apariciones en prensa, sin outreach' } },
      { value: '8 wks', label: { en: 'Brief to live site', es: 'Del brief al sitio en vivo' } },
      { value: '100%', label: { en: 'Editorial voice retained', es: 'Voz editorial retenida' } },
    ],
    gallery: [VIDEOS.aetheraCinematic, VIDEOS.heroLoop, VIDEOS.philosophy],
  },
  {
    slug: 'liquid-glass',
    client: 'Liquid Glass',
    category: { en: 'Product', es: 'Producto' },
    title: {
      en: 'AI-powered design platform, end to end.',
      es: 'Plataforma de diseño con IA, de inicio a fin.',
    },
    subtitle: {
      en: 'Designing and shipping a new product surface for an AI agency tool — landing page, onboarding, dashboard.',
      es: 'Diseñando y lanzando una nueva superficie de producto para una herramienta de agencia IA — landing, onboarding, dashboard.',
    },
    year: '2025',
    role: 'Product · Design · Engineering',
    duration: '6 months',
    hero: VIDEOS.featured,
    overview: {
      en: 'Liquid Glass came to us mid-pivot — strong eng team, no public product surface. We took the project from a bare repo to a paying customer base in two quarters. The studio designed the entire surface; the studio shipped it.',
      es: 'Liquid Glass llegó en medio de un giro estratégico — equipo de ingeniería sólido, sin superficie de producto pública. Llevamos el proyecto desde un repositorio vacío hasta una base de clientes pagos en dos trimestres. El estudio diseñó toda la superficie; el estudio la lanzó.',
    },
    meta: [
      { label: META_LABELS.client, value: 'Liquid Glass Inc.' },
      { label: META_LABELS.year, value: '2025' },
      { label: META_LABELS.role, value: 'Product · Design · Engineering' },
      { label: META_LABELS.duration, value: '6 months' },
    ],
    blocks: [
      {
        kind: 'text',
        eyebrow: 'Scope',
        title: 'From repo to revenue.',
        body: 'Marketing site, onboarding, dashboard, billing, doc site. We worked alongside their two-person eng team in a single shared repo, with a senior designer embedded full-time for 14 weeks.',
      },
      {
        kind: 'split',
        eyebrow: 'Surface',
        title: 'Glass over depth.',
        body: 'Every interactive surface earned the glass treatment — but we were ruthless about contrast and motion budgets. Glass is a finish, not a foundation.',
        src: VIDEOS.serviceStrategy.mp4,
      },
      {
        kind: 'media',
        src: VIDEOS.featured.mp4,
        aspect: '16/9',
      },
      {
        kind: 'stats',
        items: [
          { value: '0 → 1', label: 'Public product launch' },
          { value: '11k', label: 'Waitlist in week one' },
          { value: '$340k', label: 'ARR within 90 days' },
        ],
      },
    ],
    outcomes: [
      { value: '11k', label: { en: 'Waitlist (week 1)', es: 'Lista de espera (semana 1)' } },
      { value: '$340k', label: { en: 'ARR in 90 days', es: 'ARR en 90 días' } },
      { value: '92', label: { en: 'Lighthouse perf', es: 'Rendimiento Lighthouse' } },
    ],
    gallery: [VIDEOS.featured, VIDEOS.serviceStrategy, VIDEOS.philosophy],
  },
  {
    slug: 'meridian',
    client: 'Meridian',
    category: { en: 'Strategy', es: 'Estrategia' },
    title: {
      en: 'Repositioning a 30-year-old hospitality group.',
      es: 'Reposicionando un grupo hotelero de 30 años.',
    },
    subtitle: {
      en: 'A four-month strategic engagement — naming, narrative, and a portfolio reset across nine properties.',
      es: 'Un compromiso estratégico de cuatro meses — naming, narrativa y un reset de portafolio en nueve propiedades.',
    },
    year: '2025',
    role: 'Strategy · Naming · Narrative',
    duration: '4 months',
    hero: VIDEOS.serviceCraft,
    overview: {
      en: 'Meridian had grown from one boutique hotel into a portfolio of nine — but the brand had not grown with it. We led a strategy engagement that produced a new parent narrative, a sub-brand system for the properties, and a master portfolio architecture.',
      es: 'Meridian había crecido de un hotel boutique a un portafolio de nueve — pero la marca no había crecido con él. Lideramos un compromiso estratégico que produjo una nueva narrativa madre, un sistema de submarca para las propiedades, y una arquitectura de portafolio maestra.',
    },
    meta: [
      { label: META_LABELS.client, value: 'Meridian Hospitality Group' },
      { label: META_LABELS.year, value: '2025' },
      { label: META_LABELS.role, value: 'Strategy · Naming · Narrative' },
      { label: META_LABELS.duration, value: '4 months' },
    ],
    blocks: [
      {
        kind: 'text',
        eyebrow: 'Insight',
        title: 'A portfolio is not a brand.',
        body: "The group had been treating its parent brand as a holding-company logo. Each property had drifted into its own visual world. We resolved the tension with a parent narrative and a sub-brand grammar — properties keep their personalities, the parent gets the trust.",
      },
      {
        kind: 'split',
        eyebrow: 'System',
        title: 'A frame, not a uniform.',
        body: "The new brand grammar lets each property keep its name, palette, and voice — but borrows the parent's typographic posture and editorial cadence. Repeatable, recognizable, never identical.",
        src: VIDEOS.philosophy.mp4,
      },
      {
        kind: 'quote',
        body: 'The portfolio finally feels like a single decision. Booking patterns shifted within the first quarter.',
        attribution: 'CEO, Meridian Hospitality',
      },
    ],
    outcomes: [
      { value: '+24%', label: { en: 'Cross-property bookings', es: 'Reservas entre propiedades' } },
      { value: '9', label: { en: 'Property sites unified', es: 'Sitios de propiedades unificados' } },
      { value: '4 mo', label: { en: 'From kickoff to relaunch', es: 'Del inicio al relanzamiento' } },
    ],
    gallery: [VIDEOS.serviceCraft, VIDEOS.philosophy, VIDEOS.heroLoop],
  },
  {
    slug: 'vex-ventures',
    client: 'Vex Ventures',
    category: { en: 'Brand & Web', es: 'Marca y Web' },
    title: {
      en: 'A digital identity as sharp as the thesis.',
      es: 'Una identidad digital tan precisa como la tesis.',
    },
    subtitle: {
      en: 'Designing the public face of a thesis-driven venture fund that needed to attract the right founders — not all founders.',
      es: 'Diseñando la cara pública de un fondo de capital de riesgo orientado por tesis que necesitaba atraer a los fundadores correctos — no a todos.',
    },
    year: '2025',
    role: 'Brand · Web · Art direction',
    duration: '6 weeks',
    hero: VIDEOS.vexVentures,
    overview: {
      en: 'Vex arrived with a firm brief and no patience for ambiguity. The fund had a thesis, a track record, and founders who read. What it lacked was a site that signalled the same quality of thought. We designed a surface that rewards close reading — no hero copy, no feature list, no stock imagery. A single thesis statement, a long scroll, and a single way in.',
      es: 'Vex llegó con un brief firme y sin paciencia para la ambigüedad. El fondo tenía una tesis, un historial y fundadores que leían. Lo que le faltaba era un sitio que señalara la misma calidad de pensamiento. Diseñamos una superficie que recompensa la lectura atenta — sin hero copy, sin lista de características, sin imágenes de stock. Una sola declaración de tesis, un scroll largo y una sola entrada.',
    },
    meta: [
      { label: META_LABELS.client, value: 'Vex Ventures' },
      { label: META_LABELS.year, value: '2025' },
      { label: META_LABELS.role, value: 'Brand · Web · Art direction' },
      { label: META_LABELS.duration, value: '6 weeks' },
    ],
    blocks: [
      {
        kind: 'text',
        eyebrow: 'The brief',
        title: 'Signal, not noise.',
        body: 'The previous site looked like every other fund. Partners grid, portfolio logos, a PDF deck behind a contact form. We replaced it with a thesis — written in full, with no apology for its length. The founders who mattered read every word.',
      },
      {
        kind: 'split',
        eyebrow: 'Surface',
        title: 'Dark matter. Warm type.',
        body: 'A black field with warm off-white serif. No gradients, no glass effects on the primary surface — glass only on secondary UI. The restraint communicates that the fund itself is the product, not the interface.',
        src: VIDEOS.vexVentures.mp4,
        reverse: true,
      },
      {
        kind: 'media',
        src: VIDEOS.serviceStrategy.mp4,
        aspect: '16/9',
        caption: 'Portfolio section — each company introduced with a single sentence and one image.',
      },
      {
        kind: 'stats',
        items: [
          { value: '+41%', label: 'Qualified inbound applications' },
          { value: '6 wks', label: 'Brief to launch' },
          { value: '0', label: 'Stock images shipped' },
        ],
      },
    ],
    outcomes: [
      { value: '+41%', label: { en: 'Qualified inbound', es: 'Solicitudes calificadas entrantes' } },
      { value: '6 wks', label: { en: 'Brief to launch', es: 'Del brief al lanzamiento' } },
      { value: '2', label: { en: 'Portfolio spotlights earned', es: 'Destacados de portafolio ganados' } },
    ],
    gallery: [VIDEOS.vexVentures, VIDEOS.serviceStrategy, VIDEOS.featured],
  },
]

export function findProject(slug: string | undefined): Project | undefined {
  if (!slug) return undefined
  return PROJECTS.find((p) => p.slug === slug)
}

export function adjacentProjects(slug: string): { prev: Project; next: Project } {
  const i = PROJECTS.findIndex((p) => p.slug === slug)
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length]
  const next = PROJECTS[(i + 1) % PROJECTS.length]
  return { prev, next }
}
