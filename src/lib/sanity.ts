import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? 'v9k35bzt',
  dataset: import.meta.env.VITE_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  // Required: tells the API to return field-level source maps for stega
  resultSourceMap: 'withKeyArraySelector',
  // Always enabled — invisible chars have zero visual impact in production.
  // VisualEditing only renders overlays when inside Presentation iframe.
  stega: {
    enabled: true,
    studioUrl: 'http://localhost:3333',
  },
})
