import { useState, useEffect } from 'react'
import { sanityClient } from '@/lib/sanity'

export interface ContactContent {
  _id: string; eyebrow: string; titlePlain: string; titleItalic: string; subtitle: string
  fieldName: string; fieldEmail: string; fieldCompany: string; fieldBudget: string; fieldMessage: string
  respondNote: string; sendBtn: string; successTitle: string; successBody: string
}
const DEFAULTS: ContactContent = {
  _id: '', eyebrow: 'Contacto', titlePlain: 'Coordinemos una', titleItalic: 'conversación.',
  subtitle: '30 minutos para conversar sobre tu modelo, necesidades y objetivos. Sin venta forzada. Si no somos match, te lo decimos — y te recomendamos a quien sí pueda ayudarte.',
  fieldName: 'Tu nombre', fieldEmail: 'Email', fieldCompany: 'Empresa', fieldBudget: 'Inversión estimada',
  fieldMessage: 'Cuéntanos brevemente tu situación competitiva', respondNote: 'Respondemos en 24 horas hábiles.',
  sendBtn: 'Enviar mensaje', successTitle: 'Mensaje enviado.',
  successBody: 'Te contactamos dentro de 24 horas hábiles. Mientras, mira nuestros trabajos.',
}
const QUERY = `*[_type=="contactPage"][0]{_id,eyebrow,titlePlain,titleItalic,subtitle,fieldName,fieldEmail,fieldCompany,fieldBudget,fieldMessage,respondNote,sendBtn,successTitle,successBody}`

function merge(prev: ContactContent, data: Partial<ContactContent>): ContactContent {
  return { ...prev, ...Object.fromEntries(Object.entries(data).filter(([,v])=>v!=null&&v!==undefined&&v!=='')) } as ContactContent
}
export function useContactPage() {
  const [content, setContent] = useState<ContactContent>(DEFAULTS)
  useEffect(() => {
    sanityClient.fetch<ContactContent>(QUERY).then(d=>{ if(d) setContent(p=>merge(p,d)) }).catch(()=>{})
    const sub = sanityClient.listen(`*[_type=="contactPage"]`,{},{visibility:'query'}).subscribe(()=>{
      sanityClient.fetch<ContactContent>(QUERY).then(d=>{ if(d) setContent(p=>merge(p,d)) }).catch(()=>{})
    })
    return ()=>sub.unsubscribe()
  }, [])
  return { content }
}
