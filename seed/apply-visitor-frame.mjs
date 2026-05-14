// Reescribe el copy del homePage desde la voz del visitante (CEO con problema)
// en vez de la voz de Riverhaus. Aplica framework de April Dunford:
// nombra el problema → muestra el obstáculo real → describe la transformación.
//
// Preserva intacto:
//   - aboutTitle ("Equipo ligero. Trabajo serio." — mandato del cliente)
//   - aboutEyebrow ("Nosotros")
//   - heroTitle ("Conquista tu categoría." — outcome del visitante)
//   - ctaTitle ("¿Listo para conquistar tu categoría?")
//   - Todos los videos
//   - Refs (featuredServices, featuredProjects)

import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'

const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
const projectId =
  env.match(/VITE_SANITY_PROJECT_ID=(\S+)/)?.[1] || 'v9k35bzt'
const dataset = env.match(/VITE_SANITY_DATASET=(\S+)/)?.[1] || 'production'

const token = process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const VISITOR_FRAME = {
  // Hero subhead: nombra el dolor, no la oferta.
  heroSubtitle:
    'Tu producto es mejor. Tu servicio es mejor. Pero competidores inferiores te ganan visibilidad porque se ven más profesionales. Cambiemos eso.',

  // Featured method: por qué la inversión previa no se tradujo.
  featuredMethodLabel: 'Por qué la inversión no se traduce',
  featuredMethodBody:
    'Si ya invertiste en marca, web y producción y sigues perdiendo deals contra competencia inferior, no es problema de ejecución. Es que cada pieza compite sola en vez de defender tu posición.',
  featuredExploreLabel: 'Cómo lo resolvemos',

  // Philosophy: el obstáculo real (3 síntomas, 1 causa) → la transformación.
  philosophyTitle: 'De pieza suelta a posición competitiva.',
  philosophyDisciplineLabel: 'El obstáculo real',
  philosophyDisciplineBody:
    'Tu marca compite por precio porque tu identidad no comunica nada distinto. Tu web convierte poco porque los visitantes no entienden por qué elegirte. Tu contenido se ve profesional pero diluye tu posición. Tres síntomas. Una causa.',
  philosophyStandardLabel: 'Lo que cambia para ti',
  philosophyStandardBody:
    'Después de trabajar juntos, tu equipo pitcha igual desde Ventas hasta Operaciones. Tu web filtra mejores leads porque tu diferenciador queda claro. Tus campañas dejan de fragmentarse y empiezan a sumarse. Compites por valor, no por precio.',

  // Services subtitle: invitación a entrar por donde duele.
  servicesSubtitle: 'Empieza donde tu negocio lo necesita más.',

  // CTA subtitle: filtra honestamente.
  ctaSubtitle:
    '30 minutos para entender qué te impide dominar tu categoría y si podemos ayudarte. Si no somos match, te decimos.',
}

try {
  const result = await client.patch('homePage').set(VISITOR_FRAME).commit()
  console.log('✓ homePage rewritten in visitor frame')
  for (const k of Object.keys(VISITOR_FRAME)) {
    const v = result[k]
    const trim = typeof v === 'string' && v.length > 100 ? v.slice(0, 97) + '...' : v
    console.log(`  ${k.padEnd(30)} ${trim}`)
  }
} catch (e) {
  console.error('PATCH FAILED:', e.message)
  process.exit(1)
}
