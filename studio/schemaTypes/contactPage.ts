import { defineType, defineField } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    // Hero
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'titlePlain', title: 'Title (plain)', type: 'string' }),
    defineField({ name: 'titleItalic', title: 'Title (italic)', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2 }),
    // Form labels
    defineField({ name: 'fieldName', title: 'Field: Name', type: 'string' }),
    defineField({ name: 'fieldEmail', title: 'Field: Email', type: 'string' }),
    defineField({ name: 'fieldCompany', title: 'Field: Company', type: 'string' }),
    defineField({ name: 'fieldBudget', title: 'Field: Budget label', type: 'string' }),
    defineField({ name: 'fieldMessage', title: 'Field: Message', type: 'string' }),
    defineField({ name: 'respondNote', title: 'Respond note', type: 'string' }),
    defineField({ name: 'sendBtn', title: 'Send button', type: 'string' }),
    // Success state
    defineField({ name: 'successTitle', title: 'Success title', type: 'string' }),
    defineField({ name: 'successBody', title: 'Success body', type: 'text', rows: 2 }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})
