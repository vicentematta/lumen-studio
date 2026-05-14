/**
 * analytics.ts — PostHog wrapper with typed events.
 *
 * Rationale for PostHog:
 *   - GDPR opt-in mode built in (no cookies until consent)
 *   - Generous free tier, no sampling below 1 M events/mo
 *   - SPA-aware: manual pageview capture fits React Router
 *   - Zero-PII by default when autocapture is disabled
 *
 * Required env vars:
 *   VITE_POSTHOG_KEY  — PostHog project API key
 *   VITE_POSTHOG_HOST — PostHog host (defaults to https://app.posthog.com)
 */

import posthog from 'posthog-js'

// ─── typed events ─────────────────────────────────────────────────────────────

export type AnalyticsEvent =
  | { name: 'page_viewed'; path: string; title: string }
  | { name: 'cta_clicked'; label: string; destination: string; location: string }
  | { name: 'form_submitted'; form_id: string; budget?: string }
  | { name: 'email_subscribed'; location: string }
  | { name: 'consent_accepted' }
  | { name: 'consent_declined' }

// ─── init ─────────────────────────────────────────────────────────────────────

let initialised = false

export function initAnalytics(): void {
  const key = import.meta.env.VITE_POSTHOG_KEY as string | undefined
  if (!key) return // graceful no-op when key is absent

  posthog.init(key, {
    api_host: (import.meta.env.VITE_POSTHOG_HOST as string | undefined) ?? 'https://app.posthog.com',
    // Opt-in persistence: no cookies / localStorage until the user consents.
    persistence: 'memory',
    autocapture: false,    // we instrument manually for precision
    capture_pageview: false, // we call trackPageView on route change
    disable_session_recording: true,
  })

  initialised = true
}

/** Call after the user grants consent. Switches to cookie persistence. */
export function enableAnalytics(): void {
  if (!initialised) return
  posthog.set_config({ persistence: 'localStorage+cookie' })
  trackEvent({ name: 'consent_accepted' })
}

/** Call when the user declines consent. */
export function declineAnalytics(): void {
  if (!initialised) return
  trackEvent({ name: 'consent_declined' })
  posthog.opt_out_capturing()
}

// ─── tracking helpers ─────────────────────────────────────────────────────────

export function trackPageView(path: string): void {
  if (!initialised) return
  trackEvent({ name: 'page_viewed', path, title: document.title })
}

export function trackEvent(event: AnalyticsEvent): void {
  if (!initialised) return
  const { name, ...props } = event
  posthog.capture(name, props)
}
