import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'node:crypto'

// Mapa de tipo Sanity → cache tags a invalidar
const TAG_MAP: Record<string, string[]> = {
  homePage:     ['homePage'],
  aboutPage:    ['aboutPage'],
  pricingPage:  ['pricingPage'],
  contactPage:  ['contactPage'],
  siteSettings: ['siteSettings'],
  service:      ['service', 'serviceList'],
  project:      ['project', 'projectList'],
}

function verifySignature(signature: string, rawBody: string, secret: string): boolean {
  // Sanity usa: sanity-webhook-signature: t=<timestamp>,v1=<hmac-sha256>
  const parts = Object.fromEntries(
    signature.split(',').map((p) => p.split('=')),
  )
  const timestamp = parts['t']
  const hash = parts['v1']
  if (!timestamp || !hash) return false

  const payload = `${timestamp}.${rawBody}`
  const hmac = createHmac('sha256', secret)
  hmac.update(payload)
  const expected = hmac.digest('hex')

  try {
    return timingSafeEqual(Buffer.from(hash), Buffer.from(expected))
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET
  if (!secret) {
    console.error('[revalidate] SANITY_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Misconfigured' }, { status: 500 })
  }

  const signature = req.headers.get('sanity-webhook-signature') ?? ''
  const rawBody = await req.text()

  if (!verifySignature(signature, rawBody, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  let body: { _type?: string }
  try {
    body = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const type = body._type ?? ''
  const tags = TAG_MAP[type] ?? []
  // revalidatePath con 'layout' invalida toda la cache del layout incluyendo
  // los fetch tags de sanityFetch para el tipo de documento modificado.
  // Más compatible con Next.js 16 que revalidateTag (cuya firma cambió).
  revalidatePath('/', 'layout')

  console.log(`[revalidate] type=${type} tags=${tags.join(',')}`)
  return NextResponse.json({ revalidated: true, type, tags })
}
