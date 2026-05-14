import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'

export interface PricingTier {
  _key: string; slug: string; name: string; price: string
  cadence: string; tagline: string; features: string[]; cta: string; highlight: boolean
}
export interface PricingContent {
  _id: string; eyebrow: string; titlePlain: string; titleItalic: string; subtitle: string
  tiers: PricingTier[]
}
const DEFAULTS: PricingContent = {
  _id: '', eyebrow: 'Inversión', titlePlain: 'Cómo se cobra', titleItalic: '',
  subtitle: 'Primero el diagnóstico. La producción se cotiza después según lo que el diagnóstico indique.',
  tiers: [
    { _key:'t1', slug:'spark', name:'Diagnóstico', price:'CLP $40.000', cadence:'Descontable del proyecto', tagline:'Sesión de 1 hora con liderazgo. Salimos con un obstáculo identificado y un go/no-go honesto.', features:['Brief estratégico documentado','Análisis express de posición competitiva','Recomendación de siguiente paso','CLP $40.000 descontable del proyecto final'], cta:'Agendar diagnóstico', highlight:false },
    { _key:'t2', slug:'studio', name:'Servicio Único', price:'A medida', cadence:'Según industria y alcance', tagline:'Un servicio canónico ejecutado a fondo: Estrategia, Identidad o Producción.', features:['1 de los 3 servicios canónicos','Diagnóstico incluido','Roadmap ejecutable','6-12 semanas según servicio'], cta:'Conversemos', highlight:true },
    { _key:'t3', slug:'atelier', name:'Sistema Integrado', price:'Por proyecto', cadence:'Transformación', tagline:'Los tres servicios operando juntos. 12-16 semanas iniciales más retainer.', features:['Los 3 servicios integrados','Alineación de equipo comercial','Roadmap 12 meses + retainer','12-16 semanas iniciales'], cta:'Hablemos del proyecto', highlight:false },
  ],
}
const QUERY = `*[_type=="pricingPage"][0]{_id,eyebrow,titlePlain,titleItalic,subtitle,tiers}`

export function usePricingPage() {
  const [content, setContent] = useState<PricingContent>(DEFAULTS)
  useEffect(() => {
    sanityClient.fetch<PricingContent>(QUERY).then(d=>{ if(d&&d.tiers?.length) setContent(d) }).catch(()=>{})
    const sub = sanityClient.listen(`*[_type=="pricingPage"]`,{},{visibility:'query'}).subscribe(()=>{
      sanityClient.fetch<PricingContent>(QUERY).then(d=>{ if(d&&d.tiers?.length) setContent(d) }).catch(()=>{})
    })
    return ()=>sub.unsubscribe()
  }, [])
  return { content }
}
