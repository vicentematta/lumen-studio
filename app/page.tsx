/**
 * M1 placeholder · Riverhaus home (ES default)
 * Será reemplazado en M2 por la migración completa de src/pages/Home.tsx.
 * Por ahora confirma que Next.js arrancó con el brand kit aplicado.
 */
export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 text-center">
      <p className="font-body text-eyebrow uppercase text-brand-rio">
        Migración · M1 · Setup OK
      </p>

      <h1 className="font-display text-display-lg text-ink text-balance md:text-display-xl">
        Riverhaus
        <br />
        <span className="italic text-ink-mute">en Next.js.</span>
      </h1>

      <p className="font-body text-lead text-ink-soft max-w-md text-balance">
        Stack server-rendered. Sin flash. Listo para AEO/SEO. Siguiente paso ·
        M2 · portar las páginas reales.
      </p>

      <div className="mt-8 flex flex-col gap-2 font-body text-caption text-ink-mute">
        <span>· Instrument Serif (display) · Instrument Sans (body)</span>
        <span>· Tokens Cal Viva + Tinta · dual theme</span>
        <span>· Vite legacy sigue corriendo en :5180 hasta M6</span>
      </div>
    </main>
  )
}
