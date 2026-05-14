/**
 * Server fetcher · contactPage (singleton)
 */
import { sanityFetch } from '../sanity-server'

export interface ContactContent {
  _id: string
  eyebrow: string | null
  titlePlain: string | null
  titleItalic: string | null
  subtitle: string | null
  fieldName: string | null
  fieldEmail: string | null
  fieldCompany: string | null
  fieldBudget: string | null
  fieldMessage: string | null
  respondNote: string | null
  sendBtn: string | null
  successTitle: string | null
  successBody: string | null
}

const QUERY = `*[_type == "contactPage"][0]{
  _id, eyebrow, titlePlain, titleItalic, subtitle,
  fieldName, fieldEmail, fieldCompany, fieldBudget, fieldMessage,
  respondNote, sendBtn, successTitle, successBody
}`

export function getContactPage(): Promise<ContactContent | null> {
  return sanityFetch<ContactContent | null>(QUERY, {}, { tags: ['contactPage'] })
}
