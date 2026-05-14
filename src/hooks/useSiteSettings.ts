import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'

export interface SiteSettings {
  _id: string
  siteLogoUrl: string   // resolved from siteLogo.asset->url
  siteName: string
  siteTagline: string
  // Footer CTA
  footerEyebrow: string
  footerHeading: string
  footerHeadingItalic: string
  footerSubtitle: string
  footerCtaBook: string
  footerCtaWork: string
  footerCopyright: string
  // Top navbar
  navLinkServices: string
  navLinkPricing: string
  // Footer nav columns
  navCol1Heading: string
  navLinkAbout: string
  navLinkWork: string
  navCol2Heading: string
  navLinkStrategy: string
  navLinkDesign: string
  navLinkEngineering: string
  navCol3Heading: string
  navLinkContact: string
  navLinkLogin: string
  navLinkSignup: string
  // Social
  socialInstagram: string
  socialTwitter: string
  socialWebsite: string
}

const DEFAULTS: SiteSettings = {
  _id: '',
  siteLogoUrl: '',
  siteName: 'Riverhaus',
  siteTagline: 'Conquista tu categoría.',
  footerEyebrow: 'Conquista tu categoría',
  footerHeading: 'Construye una marca que',
  footerHeadingItalic: 'supere a tu competencia.',
  footerSubtitle: 'Diagnostiquemos tu posición, construyamos tu ángulo y aplíquemoslo donde tu negocio compite — digital o físico.',
  footerCtaBook: 'Agenda diagnóstico',
  footerCtaWork: 'Ver trabajos',
  footerCopyright: '© 2026 Riverhaus · Valdivia, Chile',
  navLinkServices: 'Servicios',
  navLinkPricing: 'Inversión',
  navCol1Heading: 'Estudio',
  navLinkAbout: 'Nosotros',
  navLinkWork: 'Trabajos',
  navCol2Heading: 'Servicios',
  navLinkStrategy: 'Estrategia Comercial',
  navLinkDesign: 'Identidad Digital',
  navLinkEngineering: 'Negocio + Diseño',
  navCol3Heading: 'Contacto',
  navLinkContact: 'Escríbenos',
  navLinkLogin: 'Acceso clientes',
  navLinkSignup: 'Agenda diagnóstico',
  socialInstagram: '',
  socialTwitter: '',
  socialWebsite: '',
}

const QUERY = `*[_type == "siteSettings"][0]{
  _id,
  "siteLogoUrl": siteLogo.asset->url,
  siteName, siteTagline,
  footerEyebrow, footerHeading, footerHeadingItalic,
  footerSubtitle, footerCtaBook, footerCtaWork, footerCopyright,
  navLinkServices, navLinkPricing,
  navCol1Heading, navLinkAbout, navLinkWork,
  navCol2Heading, navLinkStrategy, navLinkDesign, navLinkEngineering,
  navCol3Heading, navLinkContact, navLinkLogin, navLinkSignup,
  socialInstagram, socialTwitter, socialWebsite
}`

function merge(prev: SiteSettings, data: Partial<SiteSettings>): SiteSettings {
  return {
    ...prev,
    ...Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== null && v !== undefined && v !== '')
    ),
  } as SiteSettings
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS)

  useEffect(() => {
    sanityClient
      .fetch<SiteSettings>(QUERY)
      .then((data) => { if (data) setSettings((prev) => merge(prev, data)) })
      .catch(() => {})

    const sub = sanityClient
      .listen(`*[_type == "siteSettings"]`, {}, { visibility: 'query' })
      .subscribe(() => {
        sanityClient
          .fetch<SiteSettings>(QUERY)
          .then((data) => { if (data) setSettings((prev) => merge(prev, data)) })
          .catch(() => {})
      })

    return () => sub.unsubscribe()
  }, [])

  return { settings }
}
