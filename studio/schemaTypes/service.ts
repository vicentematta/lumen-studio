import { defineType, defineField } from 'sanity'

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'en', title: 'English', type: 'string' }),
      defineField({ name: 'es', title: 'Español', type: 'string' }),
    ],
  })

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'short', title: 'Short description', type: 'string' }),
    defineField({ name: 'summary', title: 'Summary', type: 'text', rows: 4 }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'process',
      title: 'Process steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'step', title: 'Step #', type: 'number' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'step' } },
        },
      ],
    }),
    defineField({
      name: 'related',
      title: 'Related service slugs',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Slugs of related services',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Card video URL',
      type: 'url',
      description: 'Video shown in the homepage service card. Paste a CloudFront .mp4 URL.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (≤160 chars)',
      type: 'string',
      validation: (r) => r.max(160),
    }),
  ],
  preview: { select: { title: 'name', subtitle: 'slug.current' } },
})
