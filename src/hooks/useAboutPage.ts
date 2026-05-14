import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'

export interface AboutValue { _key: string; label: string; body: string }
export interface AboutContent {
  _id: string
  eyebrow: string; titlePlain: string; titleItalic: string; subtitle: string
  ctaWork: string; ctaSee: string
  valuesHeading: string; values: AboutValue[]
  videoUrl: string
}
const DEFAULTS: AboutContent = {
  _id: '', eyebrow: 'Nosotros', titlePlain: 'Equipo ligero.', titleItalic: 'Trabajo serio.',
  subtitle: 'Riverhaus combina desarrollo de negocio y diseño para llevar tu marca de lo común a lo relevante. Operamos desde Valdivia con clientes en Chile, LATAM y nichos seleccionados en EE.UU.',
  ctaWork: 'Ver trabajos', ctaSee: 'Conversemos',
  valuesHeading: 'Por qué somos distintos',
  values: [
    { _key:'v1', label:'vs. agencias de publicidad', body:'Ellas parten del creativo. Nosotros del diagnóstico comercial — el creativo es derivada del ángulo, no el punto de partida.' },
    { _key:'v2', label:'vs. freelancers', body:'Ellos ejecutan tu pieza. Nosotros pensamos primero qué pieza sirve — y por qué.' },
    { _key:'v3', label:'vs. agencias creativas', body:'Ellas optimizan estética. Nosotros optimizamos posición competitiva — la marca destaca en su categoría comercial, no en concursos de diseño.' },
    { _key:'v4', label:'vs. consultoras estratégicas', body:'Ellas entregan un PDF y se van. Nosotros producimos lo que el diagnóstico indica que sirve — digital o físico.' },
  ],
  videoUrl: '',
}
const QUERY = `*[_type=="aboutPage"][0]{_id,eyebrow,titlePlain,titleItalic,subtitle,ctaWork,ctaSee,valuesHeading,values,videoUrl}`

function merge(prev: AboutContent, data: Partial<AboutContent>): AboutContent {
  return { ...prev, ...Object.fromEntries(Object.entries(data).filter(([,v])=>v!=null&&v!==undefined&&v!=='')) } as AboutContent
}
export function useAboutPage() {
  const [content, setContent] = useState<AboutContent>(DEFAULTS)
  useEffect(() => {
    sanityClient.fetch<AboutContent>(QUERY).then(d => { if(d) setContent(p=>merge(p,d)) }).catch(()=>{})
    const sub = sanityClient.listen(`*[_type=="aboutPage"]`,{},{visibility:'query'}).subscribe(()=>{
      sanityClient.fetch<AboutContent>(QUERY).then(d=>{ if(d) setContent(p=>merge(p,d)) }).catch(()=>{})
    })
    return ()=>sub.unsubscribe()
  }, [])
  return { content }
}
