import { defineType, defineField } from 'sanity'

export const cta = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Button label',
      type: 'string',
      validation: (r) => r.required().max(40),
    }),
    defineField({
      name: 'linkType',
      title: 'Tipo de link',
      type: 'string',
      options: {
        list: [
          { title: 'Página interna', value: 'internal' },
          { title: 'URL externa', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalPath',
      title: 'Ruta interna',
      type: 'string',
      description: 'Ej: /contact · /services/estrategia-comercial',
      hidden: ({ parent }: any) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL externa',
      type: 'url',
      hidden: ({ parent }: any) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'variant',
      title: 'Estilo',
      type: 'string',
      options: {
        list: [
          { title: 'Solid — primario', value: 'solid' },
          { title: 'Glass — secundario', value: 'glass' },
        ],
        layout: 'radio',
      },
      initialValue: 'solid',
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'linkType' },
  },
})
