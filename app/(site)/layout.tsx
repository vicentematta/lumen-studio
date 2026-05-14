/**
 * (site) route group layout · Server Component
 *
 * Wrappea las rutas públicas con Navbar + Footer. El route group con paréntesis
 * NO añade segmento de URL — solo organiza para compartir layout.
 *
 * Otras rutas que NO usan este layout: app/studio/[[...index]] (Sanity Studio),
 * app/api/* (route handlers).
 *
 * Fetch de siteSettings sucede aquí (servidor) y se pasa a Navbar/Footer
 * (client/server respectively). Una sola request por render gracias al cache
 * de Next.js + tag-based revalidation.
 */
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { getSiteSettings } from '@/lib/queries/siteSettings'

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <Navbar settings={settings} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} />
    </div>
  )
}
