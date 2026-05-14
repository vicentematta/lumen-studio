import { defineType, defineField } from 'sanity'

export const pricingPage = defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    // Hero
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'titlePlain', title: 'Title (plain)', type: 'string' }),
    defineField({ name: 'titleItalic', title: 'Title (italic)', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 }),
    // Tiers
    defineField({
      name: 'tiers',
      title: 'Pricing tiers',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'slug', title: 'Slug (spark/studio/atelier)', type: 'string' }),
          defineField({ name: 'name', title: 'Name', type: 'string' }),
          defineField({ name: 'price', title: 'Price', type: 'string' }),
          defineField({ name: 'cadence', title: 'Cadence', type: 'string' }),
          defineField({ name: 'tagline', title: 'Tagline', type: 'text', rows: 2 }),
          defineField({ name: 'features', title: 'Features', type: 'array', of: [{ type: 'string' }] }),
          defineField({ name: 'cta', title: 'CTA label', type: 'string' }),
          defineField({ name: 'highlight', title: 'Highlighted tier', type: 'boolean' }),
        ],
        preview: { select: { title: 'name', subtitle: 'price' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Pricing Page' }) },
})
