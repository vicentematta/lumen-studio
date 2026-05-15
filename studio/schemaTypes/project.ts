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
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Image',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'imageWithAlt',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Full width — edge to edge', value: 'full' },
                  { title: 'Contained — max width', value: 'contained' },
                  { title: 'Pair — 2 columnas (subir de a 2)', value: 'pair' },
                ],
                layout: 'radio',
              },
              initialValue: 'full',
            }),
          ],
          preview: {
            select: { media: 'image', subtitle: 'layout' },
            prepare: (v) => ({ title: `Image · ${v.subtitle ?? 'full'}`, media: v.media }),
          },
        },
        {
          type: 'object',
          name: 'videoBlock',
          title: 'Video',
          fields: [
            defineField({
              name: 'url',
              title: 'Video URL (.mp4 — CloudFront)',
              type: 'url',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'poster',
              title: 'Poster image (frame de preview — Sanity)',
              type: 'imageWithAlt',
            }),
            defineField({ name: 'posterUrl', title: 'Poster URL externa (Cargo CDN)', type: 'url' }),
            defineField({ name: 'posterAlt', title: 'Poster alt text', type: 'string' }),
            defineField({
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Full width', value: 'full' },
                  { title: 'Contained', value: 'contained' },
                ],
                layout: 'radio',
              },
              initialValue: 'full',
            }),
          ],
          preview: {
            select: { subtitle: 'url' },
            prepare: (v) => ({ title: `Video · ${v.subtitle?.split('/').pop() ?? ''}` }),
          },
        },
        {
          type: 'object',
          name: 'mediaColumnsBlock',
          title: 'Media Columns (imagen izq + items der)',
          fields: [
            defineField({ name: 'image', title: 'Columna izquierda — imagen Sanity', type: 'imageWithAlt' }),
            defineField({ name: 'leftImageUrl', title: 'Columna izquierda — URL externa (Cargo CDN)', type: 'url' }),
            defineField({ name: 'leftImageAlt', title: 'Columna izquierda — alt text', type: 'string' }),
            defineField({
              name: 'rightItems',
              title: 'Columna derecha — items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'videoItem',
                  title: 'Video',
                  fields: [
                    defineField({ name: 'url', title: 'Video URL (.mp4)', type: 'url' }),
                    defineField({ name: 'alt', title: 'Descripción / alt', type: 'string' }),
                  ],
                  preview: {
                    select: { subtitle: 'url' },
                    prepare: (v: { subtitle?: string }) => ({ title: `Video · ${v.subtitle?.split('/').pop() ?? ''}` }),
                  },
                },
                {
                  type: 'object',
                  name: 'imageItem',
                  title: 'Imagen',
                  fields: [
                    defineField({ name: 'url', title: 'URL imagen (Cargo CDN)', type: 'url' }),
                    defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
                    defineField({ name: 'widthPct', title: 'Ancho (%)', type: 'number', initialValue: 100, description: 'Porcentaje del ancho de la columna. Ej: 60 = 60%' }),
                  ],
                  preview: {
                    select: { subtitle: 'url' },
                    prepare: (v: { subtitle?: string }) => ({ title: `Imagen · ${v.subtitle?.split('/').pop() ?? ''}` }),
                  },
                },
                {
                  type: 'object',
                  name: 'spacerItem',
                  title: 'Espacio',
                  fields: [
                    defineField({ name: 'height', title: 'Altura (px)', type: 'number', initialValue: 80 }),
                  ],
                  preview: { prepare: () => ({ title: '— Espacio' }) },
                },
              ],
            }),
            defineField({ name: 'url1', title: '[Legacy] Video 1', type: 'url', hidden: true }),
            defineField({ name: 'url2', title: '[Legacy] Video 2', type: 'url', hidden: true }),
          ],
          preview: { prepare: () => ({ title: 'Media Columns · imagen + media' }) },
        },
        {
          type: 'object',
          name: 'videoRowBlock',
          title: 'Video Row (hasta 3 en fila)',
          fields: [
            defineField({ name: 'url1', title: 'Video 1', type: 'url' }),
            defineField({ name: 'url2', title: 'Video 2', type: 'url' }),
            defineField({ name: 'url3', title: 'Video 3', type: 'url' }),
          ],
          preview: { prepare: () => ({ title: 'Video Row' }) },
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
    defineField({ name: 'seoDescription', title: 'SEO Description — legacy', type: 'string', validation: (r) => r.max(160) }),
    defineField({ name: 'coverImage', title: 'Cover image', type: 'imageWithAlt' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'client', subtitle: 'year' },
    prepare: (v) => ({ title: v.title, subtitle: v.subtitle }),
  },
})
