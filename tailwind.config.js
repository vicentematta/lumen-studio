/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // ── Fonts · brand kit v1.5 ───────────────────────────────────
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', '"SF Mono"', 'Menlo', 'monospace'],
      },

      // ── Type scale · 12 tokens (size, lineHeight, letterSpacing) ─
      fontSize: {
        'display-xl': ['144px', { lineHeight: '144px', letterSpacing: '-0.02em' }],
        'display-lg': ['80px', { lineHeight: '84px', letterSpacing: '-0.02em' }],
        'display-md': ['56px', { lineHeight: '60px', letterSpacing: '-0.02em' }],
        h1: ['48px', { lineHeight: '56px', letterSpacing: '-0.02em' }],
        h2: ['36px', { lineHeight: '44px', letterSpacing: '-0.02em' }],
        h3: ['28px', { lineHeight: '36px', letterSpacing: '-0.01em' }],
        h4: ['22px', { lineHeight: '30px', letterSpacing: '-0.005em' }],
        lead: ['20px', { lineHeight: '30px', letterSpacing: '0' }],
        body: ['17px', { lineHeight: '28px', letterSpacing: '0.01em' }],
        'body-sm': ['15px', { lineHeight: '24px', letterSpacing: '0.02em' }],
        caption: ['13px', { lineHeight: '20px', letterSpacing: '0.03em' }],
        eyebrow: ['13px', { lineHeight: '16px', letterSpacing: '0.08em' }],
      },

      // ── Colors · dark primario + light alternativo + acentos ─────
      colors: {
        // Dark theme (primario · default)
        paper: '#000000',
        'paper-warm': '#0A0807',
        'paper-deep': '#14110D',
        line: 'rgba(255,255,255,0.10)',
        ink: '#FAF7F2', // Cal Viva — texto sobre dark
        'ink-soft': 'rgba(250,247,242,0.85)',
        'ink-mute': 'rgba(250,247,242,0.55)',
        'ink-faint': 'rgba(250,247,242,0.40)',

        // Light theme (alternativo · activable con [data-theme="light"])
        'paper-light': '#FAF7F2',
        'paper-warm-light': '#F2EDE3',
        'paper-deep-light': '#E8E1D2',
        'line-light': '#D9D2C2',
        'ink-light': '#0A0907',
        'ink-soft-light': '#36312A',
        'mute-light': '#7A746A',

        // Brand accents · Río · Bosque · Tierra (doble versión)
        'brand-rio': '#5BA3B8',
        'brand-rio-deep': '#1F4D5C',
        'brand-bosque': '#7A9B6E',
        'brand-bosque-deep': '#2D3B2A',
        'brand-tierra': '#D4926A',
        'brand-tierra-deep': '#A8633A',
      },

      // ── Spacing semántico ────────────────────────────────────────
      spacing: {
        'section-y-tight': '4rem', // 64px
        'section-y': '6rem', // 96px · default
        'section-y-loose': '10rem', // 160px
        'section-y-hero': '12rem', // 192px
        'block-y': '2.5rem', // 40px
        'heading-y': '1.5rem', // 24px
      },

      // ── Liquid Glass timing (preservado) ─────────────────────────
      transitionTimingFunction: {
        glass: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },

      // ── Animations (preservado) ──────────────────────────────────
      animation: {
        marquee: 'marquee 80s linear infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
}
