import path from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Scope Next al directorio del proyecto (parent dir tiene otro lockfile)
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Necesario para el Studio embebido — sanity y styled-components usan
  // CJS/ESM mixtos que Turbopack no transpila por defecto
  transpilePackages: ['sanity', 'styled-components', '@sanity/ui', '@sanity/icons'],

  // Las páginas Vite legacy viven en src/pages — excluirlas para que Next
  // no las trate como Pages Router mientras hacemos la migración M2-M6
  pageExtensions: ['tsx', 'ts'],

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'freight.cargo.site' },
      { protocol: 'https', hostname: '*.cloudfront.net' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // Excluir el workspace de Sanity Studio del build
  // (Studio se montará en app/studio/[[...index]]/page.tsx en M5)
  outputFileTracingExcludes: {
    '*': ['./studio/**/*', './src/pages/**/*', './e2e/**/*', './tests/**/*'],
  },

  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
