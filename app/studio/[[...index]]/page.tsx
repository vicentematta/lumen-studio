'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/lib/studio-embedded-config'

// Sanity v3.99.0 leaks the `disableTransition` prop from its internal
// SortableListItem onto a DOM <div>, producing a noisy React warning.
// The bug is scoped to the Studio UI. We swallow just that one warning
// here, installed at module scope so the filter is active before React
// renders. Remove this block after upgrading sanity past v3.99
// (v5 stable, when we migrate the schema).
//
// React invariant warnings use printf-style format strings:
//   console.error('React does not recognize the `%s` prop ...', 'disableTransition')
// So we match on args[0] (format string) + args[1] (substituted prop name).
if (typeof window !== 'undefined') {
  const originalError = console.error
  const SUPPRESSED_PROPS = new Set(['disableTransition'])
  console.error = (...args: unknown[]) => {
    const formatStr = typeof args[0] === 'string' ? args[0] : ''
    const propName = typeof args[1] === 'string' ? args[1] : ''
    if (
      formatStr.includes('React does not recognize the `%s` prop') &&
      SUPPRESSED_PROPS.has(propName)
    ) {
      return
    }
    originalError(...args)
  }
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
