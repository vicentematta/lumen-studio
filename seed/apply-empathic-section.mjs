// Aplica:
//   1. Sección post-Hero como llamado empático al visitante
//      (aboutEyebrow / aboutTitle / aboutBody — reutilizando los slots).
//   2. Renombra el título de servicios (mata "Tres puertas a tu categoría").
//   3. Agrega 3ra ref a featuredServices (Negocio + Diseño).
//
// Marco teórico: Cialdini (pre-suasión: validar la motivación del visitante)
// + Rumelt (nombrar el cambio que decide quién gana). El body responde a
// "¿Quieres ganar? Natural." con la perspectiva empática.

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

const PATCH = {
  // Sección post-Hero — llamado empático al visitante.
  aboutEyebrow: '¿Quieres ganar?',
  aboutTitle: 'Natural.',
  aboutBody:
    'Trabajas duro y tu producto cumple. Pero gana quien hace que el cliente ya haya decidido antes del pitch. Eso no se logra produciendo más; se logra haciendo que cada señal de tu negocio empuje en la misma dirección.',

  // Sección de servicios — mata el nombre malo.
  servicesTitle: 'Tres formas de trabajar contigo.',

  // 3 cards: Estrategia + Identidad + Negocio + Diseño.
  featuredServices: [
    {_key: 'fs1', _type: 'reference', _ref: 'service-estrategia-comercial'},
    {_key: 'fs2', _type: 'reference', _ref: 'service-identidad-digital'},
    {_key: 'fs3', _type: 'reference', _ref: 'service-negocio-diseno'},
  ],
}

try {
  const result = await client.patch('homePage').set(PATCH).commit()
  console.log('✓ Post-Hero empathic section + 3rd service card applied')
  console.log('  aboutEyebrow     ', result.aboutEyebrow)
  console.log('  aboutTitle       ', result.aboutTitle)
  console.log('  aboutBody        ', result.aboutBody)
  console.log('  servicesTitle    ', result.servicesTitle)
  console.log('  featuredServices ', result.featuredServices.map((r) => r._ref).join(', '))
} catch (e) {
  console.error('PATCH FAILED:', e.message)
  process.exit(1)
}
