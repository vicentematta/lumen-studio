import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // Hero
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'titlePlain', title: 'Title (plain)', type: 'string' }),
    defineField({ name: 'titleItalic', title: 'Title (italic)', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 }),
    defineField({ name: 'ctaWork', title: 'CTA primary', type: 'string' }),
    defineField({ name: 'ctaSee', title: 'CTA secondary', type: 'string' }),
    // Values section
    defineField({ name: 'valuesHeading', title: 'Values heading', type: 'string' }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Label', type: 'string' }),
          defineField({ name: 'body', title: 'Body', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'label' } },
      }],
    }),
    defineField({ name: 'videoUrl', title: 'Video URL', type: 'url',
      description: 'Video shown in the about page body section.' }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})
