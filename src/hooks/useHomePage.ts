import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'

export interface HomeContent {
  _id: string
  // Hero
  heroTitle: string
  heroSubtitle: string
  heroPrimaryLabel: string
  heroSecondaryLabel: string
  // Post-Hero empathetic call
  aboutEyebrow: string
  aboutTitle: string
  aboutBody: string
  // Featured
  featuredMethodLabel: string
  featuredMethodBody: string
  featuredExploreLabel: string
  // Philosophy
  philosophyTitle: string
  philosophyDisciplineLabel: string
  philosophyDisciplineBody: string
  philosophyStandardLabel: string
  philosophyStandardBody: string
  // Services
  servicesTitle: string
  servicesSubtitle: string
  servicesAllLabel: string
  // Confiaron en nosotros
  clientLogosEyebrow: string
  clientLogos: Array<{ name: string; logoUrl: string }>
  // CTA
  ctaTitle: string
  ctaSubtitle: string
  ctaLabel: string
  // Videos (CloudFront URLs — paste new URL in Sanity to swap clip)
  videoHero: string
  videoFeatured: string
  videoPhilosophy: string
  videoStrategy: string
  videoCraft: string
  // Featured services resolved
  featuredServices: Array<{
    _id: string
    name: string
    eyebrow: string
    short: string
    videoUrl: string
    slug: string
  }>
}

const DEFAULTS: HomeContent = {
  _id: '',
  heroTitle: 'Conquista tu categoría hoy.',
  heroSubtitle:
    'Tu oferta comercial es sólida. ¿Está tu presencia digital a la altura?',
  heroPrimaryLabel: 'Agenda diagnóstico',
  heroSecondaryLabel: 'Ver servicios',
  aboutEyebrow: '¿Quieres ganar?',
  aboutTitle: 'Natural.',
  aboutBody:
    'Trabajas duro y tu producto cumple. Pero gana quien hace que el cliente ya haya decidido antes del pitch. Eso no se logra produciendo más; se logra haciendo que cada señal de tu negocio empuje en la misma dirección.',
  featuredMethodLabel: 'Por qué tu última inversión no movió la aguja',
  featuredMethodBody:
    'Pagaste por marca, web y producción. Sigues perdiendo deals. El problema no es ejecución: cada pieza dice algo distinto.',
  featuredExploreLabel: 'Cómo lo resolvemos',
  philosophyTitle: 'El diagnóstico.',
  philosophyDisciplineLabel: 'Los síntomas',
  philosophyDisciplineBody:
    'Compites por precio porque tu identidad no comunica nada distinto. Tu web no convierte porque los visitantes no entienden por qué elegirte. Tu contenido se ve profesional pero diluye lo que vendes.',
  philosophyStandardLabel: 'Después',
  philosophyStandardBody:
    'Tu equipo pitcha igual. Tu web filtra los leads que importan. Tus campañas se suman en vez de dispersarse. Subes precio sin perder volumen.',
  servicesTitle: 'Tres formas de trabajar contigo.',
  servicesSubtitle: 'Empieza donde duele.',
  servicesAllLabel: 'Ver todos los servicios',
  clientLogosEyebrow: 'Confiaron en nosotros',
  clientLogos: [],
  ctaTitle: '¿Quieres conquistar tu categoría?',
  ctaSubtitle:
    'Tanto si importas maquinaria o produces en Chile el desafío es el mismo: tienes competencia.\n¿Quieres ser el primero? Danos 30 minutos.',
  ctaLabel: 'Agenda diagnóstico',
  videoHero: '',
  videoFeatured: '',
  videoPhilosophy: '',
  videoStrategy: '',
  videoCraft: '',
  featuredServices: [],
}

const QUERY = `*[_type == "homePage"][0]{
  _id,
  heroTitle, heroSubtitle, heroPrimaryLabel, heroSecondaryLabel,
  aboutEyebrow, aboutTitle, aboutBody,
  featuredMethodLabel, featuredMethodBody, featuredExploreLabel,
  philosophyTitle,
  philosophyDisciplineLabel, philosophyDisciplineBody,
  philosophyStandardLabel, philosophyStandardBody,
  servicesTitle, servicesSubtitle, servicesAllLabel,
  clientLogosEyebrow,
  clientLogos[]{ name, "logoUrl": logo.asset->url },
  ctaTitle, ctaSubtitle, ctaLabel,
  videoHero, videoFeatured, videoPhilosophy, videoStrategy, videoCraft,
  featuredServices[]->{
    _id, name, eyebrow, short, videoUrl,
    "slug": slug.current
  }
}`

function merge(prev: HomeContent, data: Partial<HomeContent>): HomeContent {
  return {
    ...prev,
    ...Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== null && v !== undefined && v !== '')
    ),
  } as HomeContent
}

export function useHomePage() {
  const [content, setContent] = useState<HomeContent>(DEFAULTS)

  useEffect(() => {
    sanityClient
      .fetch<HomeContent>(QUERY)
      .then((data) => { if (data) setContent((prev) => merge(prev, data)) })
      .catch(() => {})

    const sub = sanityClient
      .listen(`*[_type == "homePage"]`, {}, { visibility: 'query' })
      .subscribe(() => {
        sanityClient
          .fetch<HomeContent>(QUERY)
          .then((data) => { if (data) setContent((prev) => merge(prev, data)) })
          .catch(() => {})
      })

    return () => sub.unsubscribe()
  }, [])

  return { content }
}
