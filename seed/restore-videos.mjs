// Patch quirúrgico: restaura URLs de video perdidas en el import del 2026-05-11.
// Usa el cliente local del Studio. Solo toca campos *video* — nada más.
import {createClient} from '@sanity/client'
import {readFileSync} from 'node:fs'

const env = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
const projectId =
  env.match(/VITE_SANITY_PROJECT_ID=(\S+)/)?.[1] || 'v9k35bzt'
const dataset = env.match(/VITE_SANITY_DATASET=(\S+)/)?.[1] || 'production'

const token = process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error(
    'ERROR: SANITY_AUTH_TOKEN missing. Run with `SANITY_AUTH_TOKEN=$(./node_modules/.bin/sanity debug --secrets | grep -oE "sk[A-Za-z0-9]+" | head -1) node seed/restore-videos.mjs`',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const HOME_VIDEOS = {
  videoHero:
    'https://tryout-sanity-648597472790-us-east-2-an.s3.us-east-2.amazonaws.com/RIVERHAUS+vid3.mp4',
  videoFeatured:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4',
  videoPhilosophy:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4',
  videoStrategy:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4',
  videoCraft:
    'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4',
}

const SERVICE_VIDEOS = {
  'service-estrategia-comercial': HOME_VIDEOS.videoStrategy,
  'service-identidad-digital': HOME_VIDEOS.videoCraft,
}

try {
  const homePatch = await client.patch('homePage').set(HOME_VIDEOS).commit()
  console.log('✓ homePage videos restored')
  console.log('  videoHero        ', homePatch.videoHero)
  console.log('  videoFeatured    ', homePatch.videoFeatured)
  console.log('  videoPhilosophy  ', homePatch.videoPhilosophy)
  console.log('  videoStrategy    ', homePatch.videoStrategy)
  console.log('  videoCraft       ', homePatch.videoCraft)

  for (const [id, url] of Object.entries(SERVICE_VIDEOS)) {
    const p = await client.patch(id).set({videoUrl: url}).commit()
    console.log(`✓ ${id}.videoUrl restored → ${p.videoUrl}`)
  }
} catch (e) {
  console.error('PATCH FAILED:', e.message)
  process.exit(1)
}
