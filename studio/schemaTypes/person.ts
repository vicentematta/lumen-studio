import { defineType, defineField } from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job title',
      type: 'string',
      description: 'Ej: "Founder & Strategy Director" — se usa en schema.org Person (E-E-A-T)',
    }),
    defineField({
      name: 'photo',
      title: 'Foto',
      type: 'imageWithAlt',
    }),
    defineField({
      name: 'bio',
      title: 'Bio breve',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'sameAs',
      title: 'Perfiles externos',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'LinkedIn, X, Instagram — schema.org Person.sameAs (E-E-A-T)',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'jobTitle', media: 'photo' },
  },
})
