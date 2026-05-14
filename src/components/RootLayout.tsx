import { useEffect, lazy, Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { initAnalytics, trackPageView } from '@/lib/analytics'

const inIframe = typeof window !== 'undefined' && window.self !== window.top

// react-router subpath uses useNavigate internally — fixes Presentation navigation
const VisualEditing = lazy(() =>
  import('@sanity/visual-editing/react-router').then((m) => ({ default: m.VisualEditing }))
)

initAnalytics()

export function RootLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Don't scroll-to-top inside Sanity Presentation iframe
    if (!inIframe) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    trackPageView(pathname)
  }, [pathname])

  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      {inIframe && (
        <Suspense fallback={null}>
          <VisualEditing />
        </Suspense>
      )}
    </div>
  )
}
