// Documents — singletons
import { homePage } from './homePage'
import { aboutPage } from './aboutPage'
import { pricingPage } from './pricingPage'
import { contactPage } from './contactPage'
import { siteSettings } from './siteSettings'

// Documents — collections
import { service } from './service'
import { project } from './project'
import { person } from './person'

// Objects — reutilizables (registrar para que los documentos puedan referenciarlos por nombre)
import { seo } from './seo'
import { imageWithAlt } from './imageWithAlt'
import { cta } from './cta'
import { blockContent } from './blockContent'

export const schemaTypes = [
  // Singletons
  homePage,
  aboutPage,
  pricingPage,
  contactPage,
  siteSettings,

  // Collections
  service,
  project,
  person,

  // Objects
  seo,
  imageWithAlt,
  cta,
  blockContent,
]
