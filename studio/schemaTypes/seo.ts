import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title (override)',
      type: 'string',
      description: 'Opcional. Si vacío, se usa el título de la página. Máx 60 chars.',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: '120–160 chars. Aparece en Google y AI engines (ChatGPT, Perplexity, Claude).',
      validation: (r) =>
        r.min(50).max(160).warning('Apunta a 120–160 caracteres'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image (1200×630)',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen al compartir en redes. Si vacío, usa el fallback del sitio.',
    }),
    defineField({
      name: 'noIndex',
      title: 'No indexar esta página',
      type: 'boolean',
      initialValue: false,
      description: 'Activa para excluir de Google y AI engines.',
    }),
  ],
})
