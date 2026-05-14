# Implementation Plan · Riverhaus Brand Kit + Sanity
**Versión:** 1.5 (alineado con `brand-guidelines.pdf` v1.5)
**Fecha:** 2026-05-14
**Status:** Plan listo · ningún archivo de producción tocado todavía

---

## Principio rector

Cada fase es **atómica, testeable, y commiteable por separado**. Si algo falla, hacemos rollback de UNA fase sin perder las anteriores. Nada de "big bang refactor".

---

## Fase 0 · Pre-flight (5 min)

- [ ] Studio (`localhost:3333`) y preview (`localhost:5180`) corriendo
- [ ] `cd ~/Desktop/RIVERHAUS/Studio/lumen-studio && git status` — branch limpio
- [ ] `git checkout -b feat/brand-kit-v1.5`
- [ ] Backup: `tar -czf /tmp/lumen-pre-brand.tar.gz studio/schemaTypes src/index.css tailwind.config.js index.html public 2>/dev/null`

---

## Fase 1 · Assets · Logos + favicon + email (10 min) · NO RISK

**Toca:** copia de archivos a `public/` y `src/assets/`

```bash
# Logos
cp ~/Desktop/RIVERHAUS/Studio/lumen-studio/docs/brand-kit-audit/assets/logo-riverhaus*.svg \
   ~/Desktop/RIVERHAUS/Studio/lumen-studio/public/

# Favicon set completo
cp -r ~/Desktop/RIVERHAUS/Studio/lumen-studio/docs/brand-kit-audit/assets/favicon/* \
      ~/Desktop/RIVERHAUS/Studio/lumen-studio/public/

# Google Profile (para meta tags og:image fallback)
cp ~/Desktop/RIVERHAUS/Studio/lumen-studio/docs/brand-kit-audit/assets/logo-google-profile.png \
   ~/Desktop/RIVERHAUS/Studio/lumen-studio/public/og-fallback.png
```

### Actualizar `public/site.webmanifest`

Reemplazar defaults genéricos:

```json
{
  "name": "Riverhaus",
  "short_name": "Riverhaus",
  "description": "Negocio + Diseño. Una sola firma.",
  "icons": [
    { "src": "/web-app-manifest-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/web-app-manifest-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "theme_color": "#000000",
  "background_color": "#000000",
  "display": "standalone",
  "start_url": "/"
}
```

### Commit
```
chore(assets): import official logo system + favicon set
```

---

## Fase 2 · Tokens visuales · Tailwind + CSS vars + fonts (30 min) · LOW RISK

**Toca:** `tailwind.config.js`, `src/index.css`, `index.html`

### 2.1 `index.html`

```html
<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;1,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">

<!-- Favicons -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">

<!-- Theme color matches Tinta primary -->
<meta name="theme-color" content="#000000">
```

### 2.2 `tailwind.config.js`

```js
fontFamily: {
  display: ['"Instrument Serif"', 'Georgia', 'serif'],
  body:    ['"Instrument Sans"', 'system-ui', 'sans-serif'],
  mono:    ['ui-monospace', '"SF Mono"', 'monospace'],
},
fontSize: {
  'display-xl': ['144px', { lineHeight: '144px', letterSpacing: '-0.02em' }],
  'display-lg': ['80px',  { lineHeight: '84px',  letterSpacing: '-0.02em' }],
  'display-md': ['56px',  { lineHeight: '60px',  letterSpacing: '-0.02em' }],
  'h1':         ['48px',  { lineHeight: '56px',  letterSpacing: '-0.02em' }],
  'h2':         ['36px',  { lineHeight: '44px',  letterSpacing: '-0.02em' }],
  'h3':         ['28px',  { lineHeight: '36px',  letterSpacing: '-0.01em' }],
  'h4':         ['22px',  { lineHeight: '30px',  letterSpacing: '-0.005em' }],
  'lead':       ['20px',  { lineHeight: '30px',  letterSpacing: '0' }],
  'body':       ['17px',  { lineHeight: '28px',  letterSpacing: '0.01em' }],
  'body-sm':    ['15px',  { lineHeight: '24px',  letterSpacing: '0.02em' }],
  'caption':    ['13px',  { lineHeight: '20px',  letterSpacing: '0.03em' }],
  'eyebrow':    ['13px',  { lineHeight: '16px',  letterSpacing: '0.08em' }],
},
colors: {
  // Dark theme (primario · default)
  paper:        '#000000',
  'paper-warm': '#0A0807',
  'paper-deep': '#14110D',
  line:         'rgba(255,255,255,0.10)',
  ink:          '#FAF7F2',          // Cal Viva text on dark
  'ink-soft':   'rgba(250,247,242,0.85)',
  'ink-mute':   'rgba(250,247,242,0.55)',
  'ink-faint':  'rgba(250,247,242,0.40)',

  // Light theme (alternativo)
  'paper-light':        '#FAF7F2',
  'paper-warm-light':   '#F2EDE3',
  'paper-deep-light':   '#E8E1D2',
  'line-light':         '#D9D2C2',
  'ink-light':          '#0A0907',
  'ink-soft-light':     '#36312A',
  'mute-light':         '#7A746A',

  // Brand accents (doble versión)
  'brand-rio':         '#5BA3B8',
  'brand-rio-deep':    '#1F4D5C',
  'brand-bosque':      '#7A9B6E',
  'brand-bosque-deep': '#2D3B2A',
  'brand-tierra':      '#D4926A',
  'brand-tierra-deep': '#A8633A',
},
spacing: {
  'section-y-tight': '4rem',
  'section-y':       '6rem',
  'section-y-loose': '10rem',
  'section-y-hero':  '12rem',
  'block-y':         '2.5rem',
  'heading-y':       '1.5rem',
},
```

### 2.3 `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
  --paper: #000000;
  --paper-warm: #0A0807;
  --paper-deep: #14110D;
  --line: rgba(255,255,255,0.10);
  --ink: #FAF7F2;
  --ink-soft: rgba(250,247,242,0.85);
  --ink-mute: rgba(250,247,242,0.55);
  --ink-faint: rgba(250,247,242,0.40);

  --rio: #5BA3B8;
  --bosque: #7A9B6E;
  --tierra: #D4926A;
}

[data-theme="light"] {
  color-scheme: light;
  --paper: #FAF7F2;
  --paper-warm: #F2EDE3;
  --paper-deep: #E8E1D2;
  --line: #D9D2C2;
  --ink: #0A0907;
  --ink-soft: #36312A;
  --ink-mute: #7A746A;
  --ink-faint: #ACA59B;

  --rio: #1F4D5C;
  --bosque: #2D3B2A;
  --tierra: #A8633A;
}

html, body, #root { height: 100%; }

body {
  background: var(--paper);
  color: var(--ink);
  font-family: 'Instrument Sans', system-ui, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection { background: rgba(255,255,255,0.15); color: var(--ink); }

/* Mantener clases liquid-glass existentes — son parte de la identidad */
@layer components {
  .liquid-glass {
    background: rgba(255,255,255,0.01);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.10);
  }
  /* ... resto de liquid-glass-strong, glass-divider, etc. preservar tal cual */
}
```

### Verificación

- [ ] `npm run dev` arranca sin error
- [ ] Fonts Instrument Sans + Serif cargan (DevTools → Fonts)
- [ ] Toggle `<html data-theme="light">` → cambia paleta entera
- [ ] Hero existente ("Conquista tu categoría.") sigue renderizando bien

### Commit
```
feat(design): introduce brand kit v1.5 tokens — dark primary + Instrument fonts + Cal Viva alt
```

---

## Fase 3 · SEO base · `<Seo>` + JSON-LD + favicon (45 min) · LOW RISK

**Toca:** `src/components/Seo.tsx`, nuevos `src/lib/jsonld.ts`

### 3.1 Ampliar `Seo.tsx`

Añadir: OG completo, Twitter Card, hreflang `es-CL`/`en`, canonical estable.

```tsx
// Ver detalle en 02-SEO-AEO-PLAN.md §B.2-B.4
```

### 3.2 Crear `src/lib/jsonld.ts`

Generadores tipados:
- `organizationLd()` — name, logo, founder, address, sameAs
- `localBusinessLd()` — geo de Valdivia
- `personLd(founder)` — Matías Cruzat con sameAs LinkedIn/X
- `serviceLd(service)`
- `projectLd(project)`
- `breadcrumbLd(items)`

### 3.3 Inyectar JSON-LD en root layout

```tsx
<head>
  <script type="application/ld+json">{organizationLd()}</script>
  <script type="application/ld+json">{localBusinessLd()}</script>
  <script type="application/ld+json">{personLd(siteSettings.siteAuthor)}</script>
</head>
```

### Verificación

- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) → 0 errores
- [ ] DevTools → `<head>` muestra JSON-LD bien formado
- [ ] OG image se ve correcto en [Facebook Debugger](https://developers.facebook.com/tools/debug/)

### Commit
```
feat(seo): full schema.org structured data + OG + Twitter + hreflang
```

---

## Fase 4 · Sanity schemas · Objects reutilizables (45 min) · LOW RISK

**Toca:** crear `studio/schemaTypes/objects/`

Ver detalle completo en `03-SANITY-CONTENT-MODEL.md` y `04-PORTABLE-TEXT-SETUP.md`.

Archivos a crear:
1. `objects/localizedString.ts`
2. `objects/localizedText.ts`
3. `objects/theme.ts`
4. `objects/imageWithAlt.ts`
5. `objects/seo.ts`
6. `objects/cta.ts`
7. `objects/blockContent.ts`
8. `objects/localizedPortableText.ts`

Registrar en `schemaTypes/index.ts`.

### Commit
```
feat(sanity): add reusable schema objects (blockContent, seo, image, cta, theme)
```

---

## Fase 5 · Sanity schemas · Documentos nuevos (30 min) · LOW RISK

**Toca:** crear nuevos documents en `studio/schemaTypes/`

- `person.ts` — founder + colaboradores (E-E-A-T)
- `category.ts` — taxonomy facetada para projects
- `faq.ts` — pregunta/respuesta para AEO

Crear un Person dummy (Matías Cruzat) y publicar para verificar.

### Commit
```
feat(sanity): add person, category, faq documents for E-E-A-T + taxonomy
```

---

## Fase 6 · Sanity schemas · Refactor existentes (60 min) · MEDIUM RISK

**Toca:** `homePage.ts`, `aboutPage.ts`, `contactPage.ts`, `pricingPage.ts`, `project.ts`, `service.ts`, `siteSettings.ts`

Commits separados, uno por schema. Ver `03-SANITY-CONTENT-MODEL.md` para detalle.

**Importante:**
- NO borrar fields legacy (`overview`, `summary`, `seoDescription`) — añadir nuevos en paralelo
- Migration script en Fase 9

Cinco commits:
```
refactor(sanity): siteSettings — add author + defaultSeo + org schema
refactor(sanity): service — portable text summary + faqs + seo
refactor(sanity): project — portable text overview + theme + categories
refactor(sanity): aboutPage — body in portable text + founder
refactor(sanity): page schemas — add seo + theme per section
```

---

## Fase 7 · Frontend Portable Text renderer (90 min) · MEDIUM RISK

**Toca:** `src/components/PortableText.tsx`, `src/lib/queries.ts`, `src/lib/portable-text-utils.ts`

```bash
cd ~/Desktop/RIVERHAUS/Studio/lumen-studio && npm install @portabletext/react @portabletext/toolkit
```

Crear renderer con `components` map. Ver `04-PORTABLE-TEXT-SETUP.md §2`.

### Verificación crítica
- [ ] Project con overview rico (italic + link interno + image) renderiza correctamente
- [ ] Italic en Serif italic
- [ ] Link interno navega
- [ ] Imagen embebida tiene alt
- [ ] Bilingüe ES↔EN funciona

### Commit
```
feat(frontend): portable text renderer with Tailwind brand kit components
```

---

## Fase 8 · Sitemap + robots + llms.txt (30 min) · LOW RISK

**Toca:** rutas dinámicas en frontend

### 8.1 `/sitemap.xml`

Ruta dinámica que lee Sanity, genera XML con `<xhtml:link rel="alternate" hreflang="...">`.

### 8.2 `/robots.txt`

Static, con AI bots allowed:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://riverhaus.xyz/sitemap.xml
```

### 8.3 `/llms.txt`

Dinámico, lee servicios + casos relevantes desde Sanity.

### Commit
```
feat(seo): sitemap + robots + llms.txt for crawl + AI engines
```

---

## Fase 9 · Data migration (45 min) · ONE-TIME

**Toca:** `studio/scripts/migrate-to-portable-text.ts`

Backfill: project.overview (text) → overviewRich (portable text).

```bash
cd studio && npx sanity@latest exec scripts/migrate-to-portable-text.ts --with-user-token
```

Dry-run primero (`--dry-run`) + backup dataset (`sanity dataset export`).

### Commit
```
chore(migration): backfill portable text from legacy plain-text fields
```

---

## Fase 10 · Templates comerciales · Cotización + Invoice (15 min) · NO RISK

**Toca:** copia + setup

```bash
# Copiar templates al public para servir como PDFs descargables
mkdir -p ~/Desktop/RIVERHAUS/Studio/lumen-studio/public/templates
cp ~/Desktop/RIVERHAUS/Studio/lumen-studio/docs/brand-kit-audit/assets/templates/*.{html,pdf} \
   ~/Desktop/RIVERHAUS/Studio/lumen-studio/public/templates/
```

**Opcional · Sanity integration:**
- Schema `commercialDoc` para llevar registro de cotizaciones/invoices emitidos
- Fields: type (cotizacion/invoice), number, client (ref), date, status, items, total
- Permite generar el PDF desde Studio con datos pre-llenados (futura iteración)

### Commit
```
feat(templates): add Cotización + Invoice branded templates
```

---

## Fase 11 · Email signature deploy (10 min) · NO RISK

**Toca:** Gmail/Outlook signature setup

1. Abrir Gmail → Configuración → Firma
2. Crear nueva firma "Riverhaus"
3. Pegar contenido HTML de `assets/email-signature.html`
4. Verificar render en email de prueba
5. Configurar default para nuevos emails + respuestas

**Para cada miembro del equipo:** misma signature con nombre + cargo personalizado.

---

## Fase 12 · QA visual + Lighthouse (60 min) · NO RISK

- [ ] Lighthouse en cada tipo de página → ≥ 90 en SEO + Accessibility + Performance
- [ ] Schema.org Validator → 0 errores
- [ ] hreflang Validator → pares simétricos
- [ ] Visual QA en Presentation mode (`http://localhost:3333/presentation/...`)
- [ ] Mobile QA 390×844
- [ ] Light theme QA (`<html data-theme="light">`)
- [ ] Print preview de letterhead + cotización + invoice

---

## Tabla de riesgos

| Fase | Riesgo | Mitigación |
|---|---|---|
| 1 | Favicon paths rotos | Confirmar con `<link>` en `<head>` + curl /favicon.svg |
| 2 | Fonts no cargan | Fallback chain + `font-display: swap` |
| 3 | JSON-LD malformado | Validar con Rich Results Test pre-deploy |
| 4 | Type errors en Sanity | Build local antes de commit |
| 6 | Romper documentos existentes | NUNCA borrar fields legacy |
| 7 | GROQ queries rotas | Mantener queries antiguas hasta validar nuevas |
| 9 | Data corrupta en migration | Dry-run + `sanity dataset export` previo |

---

## Estimación

| Fase | Tiempo | Risk |
|---|---|---|
| 0 — Pre-flight | 5 min | — |
| 1 — Assets (logos + favicon) | 10 min | None |
| 2 — Tokens visuales | 30 min | Low |
| 3 — SEO base + JSON-LD | 45 min | Low |
| 4 — Sanity objects | 45 min | Low |
| 5 — Sanity new docs | 30 min | Low |
| 6 — Refactor existentes | 60 min | Medium |
| 7 — Portable Text renderer | 90 min | Medium |
| 8 — Sitemap + robots + llms | 30 min | Low |
| 9 — Data migration | 45 min | One-time |
| 10 — Templates comerciales | 15 min | None |
| 11 — Email signature deploy | 10 min | None |
| 12 — QA + Lighthouse | 60 min | None |
| **Total** | **~8.5h** | — |

Distribuible en 2-3 sesiones. Cada fase commiteada por separado permite parar y retomar.

---

## Estado actual (al cierre de v1.5)

**Documentación completa ✅**
- 6 archivos `.md` en `docs/brand-kit-audit/` (este y los otros 5)
- `brand-guidelines.html / .pdf` v1.5 — 21 páginas master
- `assets/` completo con logos, favicons, email assets, templates branded

**Producción aún sin tocar ✅**
- `tailwind.config.js` sigue con Barlow + colors mínimos
- `index.css` sigue dark con `--bg #000 / --fg #fff`
- Schemas Sanity sin Portable Text
- No hay favicon en `index.html`

**Pendiente tu OK para empezar Fase 1.**
