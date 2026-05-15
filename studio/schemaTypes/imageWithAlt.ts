import { defineType, defineField } from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe la imagen para lectores de pantalla y SEO. Obligatorio.',
      validation: (r) => r.required().min(5).error('Alt text obligatorio — describe la imagen'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (opcional)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'alt', media: 'asset' },
  },
})
