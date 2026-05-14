import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Instrument_Sans } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const instrumentSans = Instrument_Sans({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://riverhaus.xyz'),
  title: {
    default: 'Riverhaus · Negocio + Diseño',
    template: '%s · Riverhaus',
  },
  description:
    'Consultora bilingüe de negocio y diseño basada en Valdivia, Chile. Estrategia comercial + identidad digital para consolidar tu autoridad en tu categoría.',
  alternates: {
    canonical: '/',
    languages: {
      'es-CL': '/',
      en: '/en',
    },
  },
  openGraph: {
    siteName: 'Riverhaus',
    title: 'Riverhaus · Negocio + Diseño',
    description: 'Consultora bilingüe de negocio y diseño basada en Valdivia, Chile.',
    locale: 'es_CL',
    alternateLocale: 'en_US',
    type: 'website',
    images: ['/og-fallback.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riverhaus · Negocio + Diseño',
    description: 'Consultora bilingüe de negocio y diseño basada en Valdivia, Chile.',
    images: ['/og-fallback.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="es-CL"
      className={`${instrumentSerif.variable} ${instrumentSans.variable}`}
      suppressHydrationWarning
    >
      {/* suppressHydrationWarning ignora atributos inyectados por extensiones
          de Chrome (ColorZilla, Grammarly, etc.) que añaden al <body> antes
          de que React hidrate. Sin esto, React tira un warning permanente. */}
      <body className="bg-paper text-ink" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
