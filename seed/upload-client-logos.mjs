// Sube los PNG de Logos Clientes/Listos a Sanity y patcha
// homePage.clientLogos con sus referencias.
//
// Uso:
//   SANITY_AUTH_TOKEN=<token> node seed/upload-client-logos.mjs

import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'
import {basename} from 'node:path'

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

const LOGOS_DIR =
  '/Users/matiascruzat/Desktop/RIVERHAUS/CLIENTES/RIVERHAUS/Para la Web Riverhaus/Logos Clientes/Listos'

// Filename → display name (alt text)
const LOGOS = [
  {file: 'Nike-Logo.png', name: 'Nike'},
  {file: 'enel-logo.png', name: 'Enel'},
  {file: 'the_national_gallery_lnd.png', name: 'The National Gallery'},
  {file: 'logo_tvn.png', name: 'TVN'},
  {file: 'sernatur.png', name: 'Sernatur'},
  {file: 'undurraga_wines.png', name: 'Undurraga'},
  {file: 'dg_medios.png', name: 'DG Medios'},
  {file: 'editable_sonar_sitio.png', name: 'Sonar'},
  {file: 'sodapoptv.png', name: 'SodaPopTV'},
  {file: 'salasur_galeria.png', name: 'Sala Sur'},
  {file: 'honesto_mike.png', name: 'Honesto Mike'},
]

try {
  const refs = []
  for (const {file, name} of LOGOS) {
    const buffer = readFileSync(`${LOGOS_DIR}/${file}`)
    const asset = await client.assets.upload('image', buffer, {filename: file})
    console.log(`✓ uploaded ${name.padEnd(22)} → ${asset._id}`)
    refs.push({
      _key: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      logo: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}},
      name,
    })
  }

  await client.patch('homePage').set({
    clientLogosEyebrow: 'Confiaron en nosotros',
    clientLogos: refs,
  }).commit()

  console.log(`\n✓ homePage.clientLogos populated with ${refs.length} entries`)
} catch (e) {
  console.error('UPLOAD FAILED:', e.message)
  process.exit(1)
}
