import Link from 'next/link'
import { Container } from '@/components/ui/Container'

/**
 * Global 404 page · Server Component
 *
 * Live en `app/not-found.tsx` (NO dentro de (site)/) para que cualquier
 * ruta desconocida lo use. Si en el futuro queremos un 404 con Navbar/Footer,
 * mover a `app/(site)/not-found.tsx`.
 *
 * Textos hardcoded en ES por ahora · en M2f se cambian a routing es/en.
 */
export const metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <section className="flex min-h-dvh items-center justify-center bg-black px-6 py-32">
      <Container width="md" className="text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">404</p>
        <h1 className="mt-4 font-display text-5xl text-white md:text-7xl">
          Página{' '}
          <em className="italic text-white/60">no encontrada</em>.
        </h1>
        <p className="mt-6 text-base text-white/60">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-white/90"
          >
            Ir al inicio
          </Link>
          <Link
            href="/contact"
            className="liquid-glass inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-white/[0.04]"
          >
            Escríbenos
          </Link>
        </div>
      </Container>
    </section>
  )
}
