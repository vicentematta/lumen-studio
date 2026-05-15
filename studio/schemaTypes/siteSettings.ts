import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // ── Identity ──────────────────────────────────────────────────────────
    defineField({ name: 'siteLogo', title: 'Logo (image)', type: 'image',
      description: 'Upload the site logo. Replaces the default icon in the navbar.',
      options: { hotspot: false } }),
    defineField({ name: 'siteName', title: 'Site name', type: 'string' }),
    defineField({ name: 'siteTagline', title: 'Site tagline', type: 'string' }),

    // ── Footer CTA ────────────────────────────────────────────────────────
    defineField({ name: 'footerEyebrow', title: 'Footer · Eyebrow', type: 'string' }),
    defineField({ name: 'footerHeading', title: 'Footer · Heading (plain)', type: 'string' }),
    defineField({ name: 'footerHeadingItalic', title: 'Footer · Heading (italic part)', type: 'string' }),
    defineField({ name: 'footerSubtitle', title: 'Footer · Subtitle', type: 'text', rows: 2 }),
    defineField({ name: 'footerCtaBook', title: 'Footer · CTA Book label', type: 'string' }),
    defineField({ name: 'footerCtaWork', title: 'Footer · CTA Work label', type: 'string' }),
    defineField({ name: 'footerCopyright', title: 'Footer · Copyright text', type: 'string' }),

    // ── Top Navbar ────────────────────────────────────────────────────────
    defineField({ name: 'navCtaLabel', title: 'Nav · CTA button label', type: 'string',
      description: 'Texto del botón de acción en la barra de navegación. Ej: "Agenda un meet"' }),
    defineField({ name: 'navLinkServices', title: 'Nav · Services label', type: 'string' }),
    defineField({ name: 'navLinkPricing', title: 'Nav · Pricing label', type: 'string' }),

    // ── Footer nav — Column 1: Studio ─────────────────────────────────────
    defineField({ name: 'navCol1Heading', title: 'Nav Col 1 · Heading', type: 'string', description: 'e.g. "Studio"' }),
    defineField({ name: 'navLinkAbout', title: 'Nav Col 1 · About label', type: 'string' }),
    defineField({ name: 'navLinkWork', title: 'Nav Col 1 · Work label', type: 'string' }),

    // ── Footer nav — Column 2: Services ───────────────────────────────────
    defineField({ name: 'navCol2Heading', title: 'Nav Col 2 · Heading', type: 'string', description: 'e.g. "Services"' }),
    defineField({ name: 'navLinkStrategy', title: 'Nav Col 2 · Strategy label', type: 'string' }),
    defineField({ name: 'navLinkDesign', title: 'Nav Col 2 · Design label', type: 'string' }),
    defineField({ name: 'navLinkEngineering', title: 'Nav Col 2 · Engineering label', type: 'string' }),

    // ── Footer nav — Column 3: Reach ──────────────────────────────────────
    defineField({ name: 'navCol3Heading', title: 'Nav Col 3 · Heading', type: 'string', description: 'e.g. "Reach"' }),
    defineField({ name: 'navLinkContact', title: 'Nav Col 3 · Contact label', type: 'string' }),
    defineField({ name: 'navLinkLogin', title: 'Nav Col 3 · Login label', type: 'string' }),
    defineField({ name: 'navLinkSignup', title: 'Nav Col 3 · Sign Up label', type: 'string' }),

    // ── Social links ──────────────────────────────────────────────────────
    defineField({ name: 'socialInstagram', title: 'Social · Instagram URL', type: 'url' }),
    defineField({ name: 'socialTwitter', title: 'Social · Twitter/X URL', type: 'url' }),
    defineField({ name: 'socialLinkedin', title: 'Social · LinkedIn URL', type: 'url' }),
    defineField({ name: 'socialWebsite', title: 'Social · Website URL', type: 'url' }),

    // ── SEO global fallback ───────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO Global (fallback)',
      type: 'seo',
      description: 'Valores por defecto cuando una página no tiene SEO propio configurado.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
