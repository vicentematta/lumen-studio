import { defineType, defineField } from 'sanity'

const ls = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'en', title: 'English', type: 'string' }),
      defineField({ name: 'es', title: 'Español', type: 'string' }),
    ],
  })

const lsText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
      defineField({ name: 'es', title: 'Español', type: 'text', rows: 3 }),
    ],
  })

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'client' }, validation: (r) => r.required() }),
    defineField({ name: 'client', title: 'Client', type: 'string', validation: (r) => r.required() }),
    ls('category', 'Category'),
    ls('title', 'Title'),
    ls('subtitle', 'Subtitle'),
    defineField({ name: 'year', title: 'Year', type: 'string' }),
    defineField({ name: 'role', title: 'Role', type: 'string' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string' }),
    lsText('overview', 'Overview'),

    // Meta
    defineField({
      name: 'meta',
      title: 'Meta items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            ls('label', 'Label'),
            defineField({ name: 'value', title: 'Value', type: 'string' }),
          ],
          preview: { select: { title: 'label.en', subtitle: 'value' } },
        },
      ],
    }),

    // Blocks
    defineField({
      name: 'blocks',
      title: 'Content blocks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textBlock',
          title: 'Text',
          fields: [
            defineField({ name: 'kind', type: 'string', initialValue: 'text', hidden: true }),
            defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 4 }),
          ],
          preview: { select: { title: 'title' }, prepare: (v) => ({ title: `Text: ${v.title}` }) },
        },
        {
          type: 'object',
          name: 'quoteBlock',
          title: 'Quote',
          fields: [
            defineField({ name: 'kind', type: 'string', initialValue: 'quote', hidden: true }),
            defineField({ name: 'body', title: 'Quote', type: 'text', rows: 3 }),
            defineField({ name: 'attribution', title: 'Attribution', type: 'string' }),
          ],
          preview: { select: { title: 'body' }, prepare: (v) => ({ title: `Quote: ${v.title}` }) },
        },
        {
          type: 'object',
          name: 'statsBlock',
          title: 'Stats',
          fields: [
            defineField({ name: 'kind', type: 'string', initialValue: 'stats', hidden: true }),
            defineField({
              name: 'items',
              title: 'Stat items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'value', title: 'Value', type: 'string' }),
                    defineField({ name: 'label', title: 'Label', type: 'string' }),
                  ],
                },
              ],
            }),
          ],
          preview: { prepare: () => ({ title: 'Stats block' }) },
        },
      ],
    }),

    // Outcomes
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            ls('label', 'Label'),
          ],
        },
      ],
    }),

    // SEO
    defineField({ name: 'seoDescription', title: 'SEO Description (≤160 chars)', type: 'string', validation: (r) => r.max(160) }),
  ],
  preview: {
    select: { title: 'client', subtitle: 'year' },
    prepare: (v) => ({ title: v.title, subtitle: v.subtitle }),
  },
})
