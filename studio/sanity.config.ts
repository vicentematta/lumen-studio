import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { defineDocuments, defineLocations, presentationTool } from 'sanity/presentation'
import { schemaTypes } from './schemaTypes'

const isLocal =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'

const LIVE_URL = isLocal
  ? 'http://localhost:5180'
  : 'https://liquid-glass-studio.vercel.app'

export default defineConfig({
  name: 'liquid-glass-studio',
  title: 'Liquid Glass Studio',
  projectId: 'v9k35bzt',
  dataset: 'production',

  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: { origin: LIVE_URL, preview: '/' },
      resolve: {
        // URL → document mapping. When the preview iframe navigates to any
        // of these routes, the Studio's left panel auto-opens the matching
        // document for editing. Without this, Presentation only knows the
        // reverse mapping (doc → URL) via `locations` below.
        mainDocuments: defineDocuments([
          { route: '/', filter: `_type == "homePage"` },
          { route: '/about', filter: `_type == "aboutPage"` },
          { route: '/pricing', filter: `_type == "pricingPage"` },
          { route: '/contact', filter: `_type == "contactPage"` },
          { route: '/services/:slug', filter: `_type == "service" && slug.current == $slug` },
          { route: '/work/:slug', filter: `_type == "project" && slug.current == $slug` },
        ]),
        locations: {
          // Singleton pages
          homePage: defineLocations({
            message: 'Home',
            tone: 'positive',
            locations: [{ title: 'Home', href: '/' }],
          }),
          aboutPage: defineLocations({
            message: 'About',
            tone: 'positive',
            locations: [{ title: 'About', href: '/about' }],
          }),
          pricingPage: defineLocations({
            message: 'Pricing',
            tone: 'positive',
            locations: [{ title: 'Pricing', href: '/pricing' }],
          }),
          contactPage: defineLocations({
            message: 'Contact',
            tone: 'positive',
            locations: [{ title: 'Contact', href: '/contact' }],
          }),
          siteSettings: defineLocations({
            message: 'Site Settings — affects all pages',
            tone: 'caution',
            locations: [
              { title: 'Home', href: '/' },
              { title: 'About', href: '/about' },
              { title: 'Services', href: '/services' },
            ],
          }),
          // Collections
          service: defineLocations({
            message: 'Service',
            tone: 'positive',
            select: { slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                { title: 'Services list', href: '/services' },
                { title: doc?.slug ?? 'Service detail', href: `/services/${doc?.slug}` },
              ],
            }),
          }),
          project: defineLocations({
            message: 'Project',
            tone: 'positive',
            select: { slug: 'slug.current' },
            resolve: (doc) => ({
              locations: [
                { title: 'Work list', href: '/work' },
                { title: doc?.slug ?? 'Project detail', href: `/work/${doc?.slug}` },
              ],
            }),
          }),
        },
      },
    }),
  ],

  schema: { types: schemaTypes },
})
