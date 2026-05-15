import { NextResponse } from 'next/server'
import { sanityServer } from '@/lib/sanity-server'

export const revalidate = 86400 // 24h

export async function GET() {
  const services = await sanityServer.fetch<
    Array<{ name: string | null; short: string | null }>
  >(
    `*[_type == "service"] | order(_createdAt asc){ name, short }`,
  )

  const lines: string[] = [
    '# riverhaus.xyz',
    '> Consultora bilingüe de negocio y diseño basada en Valdivia, Chile.',
    '',
    '## Empresa',
    'Riverhaus es una consultora de negocio y diseño fundada por Matías Cruzat.',
    'Opera en Chile (SCL · Valdivia), España (MAD · ZAL) y Reino Unido (LDN).',
    'Bilingüe ES/EN. Especializada en empresas B2B que necesitan dejar de competir por precio.',
    '',
    '## Servicios',
    ...services.map(
      (s) =>
        `- ${s.name ?? 'Servicio'}${s.short ? ': ' + s.short : ''}`,
    ),
    '',
    '## Filosofía',
    'No diseñamos identidad sin justificación comercial.',
    'No trazamos estrategia sin un sistema visual que la haga visible.',
    'Una sola firma. Una sola tesis: negocio + diseño.',
    '',
    '## Contacto',
    '- Web: https://riverhaus.xyz',
    '- Email: riverhaus.xyz@gmail.com',
    '- WhatsApp: +56 9 9233 9054',
    '- Geo: Quitacalzón · Valdivia · Los Ríos · Chile',
  ]

  return new NextResponse(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  })
}
