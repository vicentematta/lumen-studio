import type { Metadata, Viewport } from 'next'
import { viewport as studioViewport } from 'next-sanity/studio'

export const viewport: Viewport = studioViewport as Viewport

export const metadata: Metadata = {
  title: 'Riverhaus Studio',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
