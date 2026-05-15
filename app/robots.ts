import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*',                allow: '/' },
      { userAgent: 'GPTBot',           allow: '/' },
      { userAgent: 'ClaudeBot',        allow: '/' },
      { userAgent: 'PerplexityBot',    allow: '/' },
      { userAgent: 'GoogleExtended',   allow: '/' },
      { userAgent: 'anthropic-ai',     allow: '/' },
      { userAgent: 'CCBot',            allow: '/' },
    ],
    sitemap: 'https://riverhaus.xyz/sitemap.xml',
  }
}
