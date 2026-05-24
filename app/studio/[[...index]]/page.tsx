'use client'

import { useEffect } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '@/lib/studio-embedded-config'

// Sanity v3.99.0 leaks the `disableTransition` prop from its internal
// SortableListItem onto a DOM <div>, producing a noisy React warning.
// The bug is scoped to the Studio UI. We swallow just that one warning
// here, scoped to this route. Remove this hook after upgrading sanity
// past v3.99 (v5 stable, when we migrate the schema).
function useSilenceSanityDisableTransitionWarning() {
  useEffect(() => {
    const original = console.error
    console.error = (...args: unknown[]) => {
      const first = args[0]
      if (
        typeof first === 'string' &&
        first.includes('React does not recognize the `disableTransition`')
      ) {
        return
      }
      original(...args)
    }
    return () => {
      console.error = original
    }
  }, [])
}

export default function StudioPage() {
  useSilenceSanityDisableTransitionWarning()
  return <NextStudio config={config} />
}
