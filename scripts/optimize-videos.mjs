#!/usr/bin/env node
/**
 * scripts/optimize-videos.mjs
 *
 * Downloads each raw CloudFront video, then generates:
 *   - <name>.mp4       h264, full-res (kept as-is if already mp4)
 *   - <name>.webm      vp9, crf 33, full-res
 *   - <name>-poster.jpg  first-frame JPEG @1280×720
 *   - <name>-mobile.mp4 h264, ≤720px wide, crf 28
 *
 * Prerequisites:
 *   brew install ffmpeg            # macOS
 *   # or: apt-get install ffmpeg   # Linux
 *
 * Usage:
 *   node scripts/optimize-videos.mjs
 *
 * Outputs land in public/videos/. After running, update src/lib/media.ts
 * to point each VideoEntry's webm / poster / mobile fields at the generated
 * paths (served by Vite from public/ as /videos/<name>.webm etc.).
 */

import { execSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

// ─── Config ──────────────────────────────────────────────────────────────────

const OUT_DIR = join(import.meta.dirname, '..', 'public', 'videos')

const CF = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P'

/** Edit these paths to match the keys in src/lib/media.ts */
const SOURCES = {
  heroLoop:        `${CF}/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4`,
  featured:        `${CF}/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4`,
  philosophy:      `${CF}/hf_20260307_083826_e938b09f-a43a-41ec-a153-3d4730578ab8.mp4`,
  serviceStrategy: `${CF}/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4`,
  serviceCraft:    `${CF}/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4`,
  aetheraCinematic:`${CF}/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4`,
  vexVentures:     `${CF}/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4`,
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function run(cmd) {
  console.log(`  $ ${cmd}`)
  execSync(cmd, { stdio: 'inherit' })
}

function ffmpeg(args) {
  run(`ffmpeg -y ${args}`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

mkdirSync(OUT_DIR, { recursive: true })

for (const [name, srcUrl] of Object.entries(SOURCES)) {
  console.log(`\n▶ ${name}`)

  const mp4Out    = join(OUT_DIR, `${name}.mp4`)
  const webmOut   = join(OUT_DIR, `${name}.webm`)
  const posterOut = join(OUT_DIR, `${name}-poster.jpg`)
  const mobileOut = join(OUT_DIR, `${name}-mobile.mp4`)

  // 1. Download / copy full-res mp4 (cached — skip if already present)
  if (!existsSync(mp4Out)) {
    run(`curl -L -o "${mp4Out}" "${srcUrl}"`)
  } else {
    console.log(`  ✓ ${name}.mp4 already present, skipping download`)
  }

  // 2. VP9 webm — full-res, good compression
  if (!existsSync(webmOut)) {
    ffmpeg(
      `-i "${mp4Out}" -c:v libvpx-vp9 -crf 33 -b:v 0 -an -threads 4 "${webmOut}"`,
    )
  }

  // 3. Poster — first frame as 1280×720 JPEG
  if (!existsSync(posterOut)) {
    ffmpeg(
      `-ss 0 -i "${mp4Out}" -frames:v 1 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -q:v 4 "${posterOut}"`,
    )
  }

  // 4. Mobile mp4 — h264, max-width 720px, slightly tighter crf
  if (!existsSync(mobileOut)) {
    ffmpeg(
      `-i "${mp4Out}" -c:v libx264 -crf 28 -preset slow -vf "scale='min(720,iw)':-2" -an -movflags +faststart "${mobileOut}"`,
    )
  }

  console.log(`  ✓ ${name} done`)
}

console.log(`
✅ All videos optimised → ${OUT_DIR}

Next: update src/lib/media.ts — set each VideoEntry's fields, e.g.

  heroLoop: {
    mp4:    '/videos/heroLoop.mp4',
    webm:   '/videos/heroLoop.webm',
    poster: '/videos/heroLoop-poster.jpg',
    mobile: '/videos/heroLoop-mobile.mp4',
  },

Then rebuild and run Lighthouse on /work/asme (target ≥ 85).
`)
