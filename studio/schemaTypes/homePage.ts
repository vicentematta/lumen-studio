import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────
    defineField({ name: 'heroTitle', title: 'Hero · Title', type: 'string' }),
    defineField({ name: 'heroSubtitle', title: 'Hero · Subtitle 1', type: 'string' }),
    defineField({ name: 'heroSubtitle2', title: 'Hero · Subtitle 2', type: 'string' }),
    defineField({ name: 'heroPrimaryLabel', title: 'Hero · Primary CTA', type: 'string' }),
    defineField({ name: 'heroSecondaryLabel', title: 'Hero · Secondary CTA', type: 'string' }),

    // ── Empathetic call-to-visitor (post-hero) ─────────────────────────────
    // Originally "About excerpt on home". Repurposed as the empathetic
    // perspective right under the Hero: validates the visitor's goal and
    // names what actually decides who wins.
    defineField({ name: 'aboutEyebrow', title: 'Post-Hero · Eyebrow (e.g. "¿Quieres ganar?")', type: 'string' }),
    defineField({ name: 'aboutTitle', title: 'Post-Hero · Title (e.g. "Natural.")', type: 'string' }),
    defineField({ name: 'aboutBody', title: 'Post-Hero · Empathetic body', type: 'text', rows: 3 }),

    // ── Featured method card ───────────────────────────────────────────────
    defineField({ name: 'featuredMethodLabel', title: 'Featured · Method label', type: 'string' }),
    defineField({ name: 'featuredMethodBody', title: 'Featured · Method card body', type: 'text', rows: 3 }),
    defineField({ name: 'featuredExploreLabel', title: 'Featured · Explore button', type: 'string' }),

    // ── Philosophy ────────────────────────────────────────────────────────
    defineField({ name: 'philosophyTitle', title: 'Philosophy · Section title', type: 'string' }),
    defineField({ name: 'philosophyDisciplineLabel', title: 'Philosophy · "The discipline" label', type: 'string' }),
    defineField({ name: 'philosophyDisciplineBody', title: 'Philosophy · The discipline body', type: 'text', rows: 3 }),
    defineField({ name: 'philosophyStandardLabel', title: 'Philosophy · "The standard" label', type: 'string' }),
    defineField({ name: 'philosophyStandardBody', title: 'Philosophy · The standard body', type: 'text', rows: 3 }),

    // ── Services section ──────────────────────────────────────────────────
    defineField({ name: 'servicesTitle', title: 'Services · Section title', type: 'string' }),
    defineField({ name: 'servicesSubtitle', title: 'Services · Subtitle (right of title)', type: 'string' }),
    defineField({ name: 'servicesAllLabel', title: 'Services · All services button', type: 'string' }),

    // ── Confiaron en nosotros (logos strip) ──────────────────────────────
    defineField({ name: 'clientLogosEyebrow', title: 'Confiaron en nosotros · Eyebrow', type: 'string',
      description: 'Texto a la izquierda de los logos. Ej: "Confiaron en nosotros".' }),
    defineField({
      name: 'clientLogos',
      title: 'Confiaron en nosotros · Logos',
      type: 'array',
      description: 'Logos que se desplazan horizontalmente. Sube SVGs o PNGs monocromos (blanco) sobre fondo transparente.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: false } }),
          defineField({ name: 'name', title: 'Nombre (alt text)', type: 'string' }),
        ],
        preview: { select: { title: 'name', media: 'logo' } },
      }],
    }),

    // ── Bottom CTA ────────────────────────────────────────────────────────
    defineField({ name: 'ctaTitle', title: 'CTA · Headline', type: 'string' }),
    defineField({ name: 'ctaSubtitle', title: 'CTA · Subtitle', type: 'text', rows: 3,
      description: 'Hit Enter to break to a new line. Line breaks are preserved on the site.' }),
    defineField({ name: 'ctaLabel', title: 'CTA · Button label', type: 'string' }),

    // ── Videos (CloudFront URLs — paste new URL to swap clip) ────────────
    defineField({ name: 'videoHero', title: 'Video · Hero background', type: 'url',
      description: 'Fullscreen background behind "Know it then all." — dark space/galaxy scene.' }),
    defineField({ name: 'videoFeatured', title: 'Video · Featured section (large landscape)', type: 'url',
      description: 'Large full-width video below the About section — person standing in canyon/valley landscape.' }),
    defineField({ name: 'videoPhilosophy', title: 'Video · Philosophy section', type: 'url',
      description: 'Video next to "The discipline / The standard" text columns.' }),
    defineField({ name: 'videoStrategy', title: 'Video · Service card: Strategy (Research & Insight)', type: 'url',
      description: 'Background video inside the first service card on the homepage.' }),
    defineField({ name: 'videoCraft', title: 'Video · Service card: Craft (Design & Execution)', type: 'url',
      description: 'Background video inside the second service card on the homepage.' }),

    // ── Featured services (homepage cards) ───────────────────────────────
    defineField({
      name: 'featuredServices',
      title: 'Featured Services (homepage cards)',
      type: 'array',
      description: 'Pick 3 services to show as cards in the services section.',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      validation: (r) => r.max(3),
    }),

    // ── Featured projects ─────────────────────────────────────────────────
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
  ],
  preview: { select: { title: 'heroTitle' }, prepare: () => ({ title: 'Home Page' }) },
})
