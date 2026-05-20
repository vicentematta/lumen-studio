/**
 * Config del Sanity Studio embebido en Next.js (/studio).
 * Equivale a studio/sanity.config.ts pero sin visionTool
 * (que requiere @sanity/vision — solo necesario en el studio standalone).
 */
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { defineDocuments, defineLocations, presentationTool } from 'sanity/presentation'
import { schemaTypes } from '../../studio/schemaTypes'

const LIVE_URL =
  typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3000'
    : 'https://riverhaus.xyz'

export default defineConfig({
  basePath: '/studio',
  name: 'liquid-glass-studio',
  title: 'Liquid Glass Studio',
  projectId: 'v9k35bzt',
  dataset: 'production',

  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: LIVE_URL,
        preview: '/',
        draftMode: { enable: '/api/draft-mode/enable' },
      },
      resolve: {
        mainDocuments: defineDocuments([
          { route: '/', filter: `_type == "homePage"` },
          { route: '/about', filter: `_type == "aboutPage"` },
          { route: '/pricing', filter: `_type == "pricingPage"` },
          { route: '/contact', filter: `_type == "contactPage"` },
          { route: '/services/:slug', filter: `_type == "service" && slug.current == $slug` },
          { route: '/work/:slug', filter: `_type == "project" && slug.current == $slug` },
        ]),
        locations: {
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

  schema: { types: schemaTypes as any },
})
