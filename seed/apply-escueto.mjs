// Reescribe homePage y pricingPage en versión escueta — sin patrones
// de marketing-speak. Una idea por frase. Outcome concreto sobre metáfora.
// Cero binarios decorativos, cero cierres aforísticos.

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

const HOME = {
  heroSubtitle:
    'Compites contra negocios inferiores que ganan por verse mejor.',
  featuredMethodLabel: 'Por qué tu última inversión no movió la aguja',
  featuredMethodBody:
    'Pagaste por marca, web y producción. Sigues perdiendo deals. El problema no es ejecución: cada pieza dice algo distinto.',
  philosophyTitle: 'El diagnóstico.',
  philosophyDisciplineLabel: 'Los síntomas',
  philosophyDisciplineBody:
    'Compites por precio porque tu identidad no comunica nada distinto. Tu web no convierte porque los visitantes no entienden por qué elegirte. Tu contenido se ve profesional pero diluye lo que vendes.',
  philosophyStandardLabel: 'Después',
  philosophyStandardBody:
    'Tu equipo pitcha igual. Tu web filtra los leads que importan. Tus campañas se suman en vez de dispersarse. Subes precio sin perder volumen.',
  servicesSubtitle: 'Empieza donde duele.',
  ctaSubtitle:
    '30 minutos. Si no podemos ayudarte, te lo decimos en la llamada — antes de cobrar nada.',
}

const PRICING_TOP = {
  titlePlain: 'Cómo se cobra',
  titleItalic: '',
  subtitle:
    'Primero el diagnóstico. La producción se cotiza después según lo que el diagnóstico indique.',
}

const PRICING_TIERS = {
  spark:
    'Sesión de 1 hora con liderazgo. Salimos con un obstáculo identificado y un go/no-go honesto.',
  studio:
    'Un servicio canónico ejecutado a fondo: Estrategia, Identidad o Producción.',
  atelier:
    'Los tres servicios operando juntos. 12-16 semanas iniciales más retainer.',
}

try {
  // Patch homePage (set-level fields)
  await client.patch('homePage').set(HOME).commit()
  console.log('✓ homePage rewritten escueto')

  // Patch pricingPage top-level
  await client.patch('pricingPage').set(PRICING_TOP).commit()
  console.log('✓ pricingPage top-level rewritten')

  // Patch pricingPage tier taglines by slug (array items)
  const current = await client.fetch(`*[_id=="pricingPage"][0]{tiers}`)
  const tiers = current?.tiers ?? []
  for (let i = 0; i < tiers.length; i++) {
    const slug = tiers[i].slug
    const newTagline = PRICING_TIERS[slug]
    if (newTagline) {
      await client.patch('pricingPage').set({[`tiers[${i}].tagline`]: newTagline}).commit()
      console.log(`  ✓ tier ${slug}.tagline updated`)
    }
  }

  console.log('\nDone.')
} catch (e) {
  console.error('PATCH FAILED:', e.message)
  process.exit(1)
}
