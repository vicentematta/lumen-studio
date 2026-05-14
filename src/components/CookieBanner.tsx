import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { enableAnalytics, declineAnalytics } from '@/lib/analytics'

const STORAGE_KEY = 'lgs_cookie_consent'

type ConsentState = 'accepted' | 'declined' | null

function readConsent(): ConsentState {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'accepted' || v === 'declined') return v
  } catch {
    // localStorage may be unavailable (private browsing edge cases)
  }
  return null
}

function writeConsent(value: 'accepted' | 'declined'): void {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // ignore
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only show when no prior decision exists
    if (readConsent() === null) {
      // Small delay so the banner doesn't flash on first paint
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
    // Re-apply stored consent on mount (e.g. page reload)
    if (readConsent() === 'accepted') enableAnalytics()
  }, [])

  const accept = () => {
    writeConsent('accepted')
    enableAnalytics()
    setVisible(false)
  }

  const decline = () => {
    writeConsent('declined')
    declineAnalytics()
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-2xl border border-white/10 bg-black/80 p-5 shadow-2xl backdrop-blur-xl"
        >
          <p className="text-sm leading-relaxed text-white/70">
            We use analytics cookies to understand how visitors interact with the site.
            No personal data is collected without your consent.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={accept}
              className="rounded-full bg-white px-5 py-2 text-xs font-medium text-black transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Accept
            </button>
            <button
              onClick={decline}
              className="rounded-full border border-white/20 px-5 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/40 hover:text-white"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
