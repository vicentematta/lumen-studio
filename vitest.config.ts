import { defineConfig } from 'vitest/config'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    include: ['tests/unit/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/lib/**', 'src/data/**'],
      // analytics.ts (PostHog side-effects) and i18n.ts (localStorage at import)
      // require a DOM/browser environment — excluded from unit-test coverage.
      exclude: ['src/lib/analytics.ts', 'src/lib/i18n.ts'],
      reporter: ['text', 'html'],
      thresholds: {
        lines: 80,
      },
    },
  },
})
