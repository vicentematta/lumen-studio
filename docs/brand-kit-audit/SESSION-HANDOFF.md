# SESSION HANDOFF · Riverhaus · Lumen Studio
**Fecha de cierre:** 2026-05-14
**Último commit:** Option B product typography aplicada
**Status:** Migración Vite → Next.js en M2d completada · M2e siguiente

> Documento maestro de estado. Lo lee primero un agente que retome el proyecto. Después leer `01-BRAND-KIT.md` (brand decisions) y `05-IMPLEMENTATION-PLAN.md` (fases originales).

---

## 1. Qué es este proyecto

**Riverhaus** es una consultora **Negocio + Diseño** basada en Quitacalzón, Valdivia (Los Ríos, Chile). Operación internacional (SCL · MAD · LDN · ZAL). Bilingüe ES/EN (ES primario en Chile). Tres servicios núcleo:

1. **Estrategia Comercial** (slug: `estrategia-comercial`)
2. **Identidad Digital** (slug: `identidad-digital`)
3. **Negocio + Diseño** (slug: `negocio-diseno`)

**Lumen Studio** es el codename interno del proyecto Vite + Sanity Studio que se está migrando a Next.js 16. Brand visible al cliente es Riverhaus, no Lumen.

**Custodio único:** Matías Cruzat · `riverhaus.xyz@gmail.com` · +56 9 9233 9054 · RUT 15.097.893-9.

---

## 2. Stack actual

```
~/Desktop/RIVERHAUS/Studio/lumen-studio/   (repo git propio)
├── app/                  Next.js 16 App Router · ACTIVO en :3000
│   ├── layout.tsx        Root · fonts (Instrument Serif + Sans) · metadata
│   ├── (site)/           Route group · Navbar + Footer wrapper
│   │   ├── layout.tsx    Server · fetcha siteSettings
│   │   ├── page.tsx      Home
│   │   ├── about/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── services/page.tsx
│   │   └── services/[slug]/page.tsx
│   └── not-found.tsx     404 global (sin layout · sin Navbar/Footer)
├── src/
│   ├── components/       Navbar · Footer · PageHero · ui/* (GlassButton etc)
│   ├── views/            HomeView · AboutView · PricingView · ContactView ·
│   │                     ServicesView · ServiceDetailView
│   ├── lib/
│   │   ├── sanity-server.ts        next-sanity client + sanityFetch helper
│   │   ├── queries/                Server fetchers (6 archivos · 1 por doc type)
│   │   ├── cn.ts · media.ts · motion.ts · validation.ts (Zod)
│   │   └── analytics.ts · sanity.ts · api.ts · i18n.ts ← LEGACY (excluded del tsconfig)
│   ├── legacy-pages/     Vite páginas viejas · EXCLUDED · mueren en M6
│   ├── locales/          i18n JSONs legacy · EXCLUDED · mueren en M6
│   ├── hooks/            useHomePage etc legacy · EXCLUDED · mueren en M6
│   ├── router.tsx · main.tsx ← Vite legacy entry · mueren en M6
│   ├── data/             SERVICES static fallback data legacy
│   └── types/sanity.ts
├── studio/               Sanity Studio · workspace separado (su propio package.json)
│                         · corre en :3333 con `cd studio && npm run dev`
├── public/               assets brand kit (logos SVG, favicon set, og-fallback)
├── docs/brand-kit-audit/ 6 .md de brand kit v1.5 + brand-guidelines.html/.pdf
├── tailwind.config.js    content array incluye app/ + src/
├── tsconfig.json         excluye TODOS los archivos Vite legacy
├── next.config.ts        Turbopack root scoped al proyecto
├── package.json          scripts: dev = next dev · build = next build · dev:vite legacy
├── .gitignore            .next/ · .vite/ · .env.local · etc
└── .env.local            NEXT_PUBLIC_SANITY_* + VITE_SANITY_* (ambos sets coexisten)
```

**Dependencies clave:**
- next 16.2.6 (Turbopack)
- next-sanity 12.4.5 (instalado con --legacy-peer-deps · React 18 vs 19 peer)
- react 18.3.1
- @sanity/client 7.22.0
- @sanity/visual-editing 2.15.4 (para M5)
- tailwindcss 3.4.15
- framer-motion 11.11.17 (animaciones · funciona en client components)
- lucide-react · zod · posthog-js

**Sanity config:**
- projectId: `v9k35bzt`
- dataset: `production`
- apiVersion: `2024-01-01`
- Plan: Free tier (suficiente · ver `01-BRAND-KIT.md` para análisis viabilidad)

---

## 3. Estado git

Repo a nivel proyecto (no home). 11 commits hasta cierre de sesión:

```
0b8762c  fix(ui): scale prev/next nav card titles + icon          (M2d patch)
[hash]   feat(brand-kit): products typography · Option B          (último · TYPO products)
02891a8  fix(ui): deliverables grid adapts columns to item count  (M2d patch)
[hash]   fix(ui): apply brand kit typography + italic card titles (M2d patch)
149c200  feat(next-migration): M2d · services + /services/[slug]
66c9f40  fix(hydration): suppress warning for browser extension
51f7518  feat(next-migration): M2c · about + pricing + contact + 404
6839ce8  feat(next-migration): M2b · home end-to-end con Sanity SSR
df33f49  feat(next-migration): M2a · sanity server fetchers + delete Auth
6dc6e1c  feat(next-migration): M1  · setup Next.js 16 + brand kit aplicado
1879a15  feat(brand-kit): phase 2 · Instrument fonts + dual theme tokens
a1c4cde  chore: initial commit · Lumen Studio (Riverhaus)
```

Verificar al retomar:
```bash
cd ~/Desktop/RIVERHAUS/Studio/lumen-studio
git log --oneline | head -15
git status
```

---

## 4. URLs funcionales (al cierre)

Servidor dev: `npm run dev` en lumen-studio/ → `http://localhost:3000`

| URL | Status | Fuente Sanity |
|---|---|---|
| `/` | ✓ Static ISR 60s | homePage doc |
| `/about` | ✓ Static ISR 60s | aboutPage doc |
| `/pricing` | ✓ Static ISR 60s | pricingPage doc |
| `/contact` | ✓ Dynamic (searchParams) | contactPage doc |
| `/services` | ✓ Static ISR 60s | service[] list |
| `/services/estrategia-comercial` | ✓ Static prerender | service doc |
| `/services/identidad-digital` | ✓ Static prerender | service doc |
| `/services/negocio-diseno` | ✓ Static prerender | service doc |
| `/non-existent` | ✓ 404 + noindex | hardcoded ES |

Servidor Sanity Studio: `cd studio && npm run dev` → `http://localhost:3333` (workspace separado · NO embebido todavía · va en M5)

---

## 5. Migración Vite → Next.js · plan de 6 fases (M1–M6)

| Sub | Status | Qué entrega |
|---|---|---|
| **M1** | ✅ DONE | Next.js 16 instalado · app/ + layout root · brand kit Phase 2 aplicado · fonts via next/font/google |
| **M2a** | ✅ DONE | sanity-server.ts + queries/siteSettings + queries/homePage · Auth eliminado |
| **M2b** | ✅ DONE | Home end-to-end · 7 secciones · server-rendered · sin DEFAULTS · ISR cache |
| **M2c** | ✅ DONE | /about + /pricing + /contact + /not-found · 3 queries + 3 views + 4 routes |
| **M2d** | ✅ DONE | /services + /services/[slug] dynamic · generateStaticParams · prev/next nav · 3 slugs prerendered |
| **M2e** | ⏭ NEXT | /work + /work/[slug] dynamic · case studies con `blocks` (textBlock, quoteBlock, statsBlock) |
| **M2f** | ⏭ TODO | Routes EN bajo `/en/*` mirror de todas · LanguageSwitcher refactorizado |
| **M3** | ⏭ TODO | SEO base · JSON-LD generators · sitemap.xml · robots.txt · llms.txt |
| **M4** | ⏭ TODO | Sanity objects nuevos · blockContent · seo · cta · imageWithAlt · theme · localizedPortableText |
| **M5** | ⏭ TODO | Sanity Studio embebido en `app/studio/[[...index]]/page.tsx` · Visual Editing wired |
| **M6** | ⏭ TODO | DELETE Vite legacy completo · src/legacy-pages · src/hooks · src/router.tsx · src/main.tsx · vite.config |

**Plan original detallado** en `05-IMPLEMENTATION-PLAN.md` (12 fases · 8.5h estimado). El plan original tiene Phases 4-7 que ahora corresponden a M4-M5 + M3 mezcladas en el contexto Next.js.

---

## 6. Decisiones de brand consolidadas en ESTA sesión

Algunas decisiones se tomaron DURANTE la sesión y refinan/extienden los .md originales. Si hay conflicto, **esta lista es la última verdad**.

### 6.1 Typography para Product Names (Opción B confirmada)

> NUEVA regla añadida al brand kit · NO está en versión PDF v1.5 · pendiente integrar en `01-BRAND-KIT.md` §3.

Los nombres de servicios (productos vendibles) tienen su propio tratamiento tipográfico para diferenciarse del "discurso" editorial:

```css
font-family: Instrument Sans
font-weight: 400 (preserva la regla canónica single-weight)
text-transform: UPPERCASE
letter-spacing: +0.05em (abierto · feel editorial luxe tag)
color: white 100%

Card scale: 22px (text-h4 base)
Hero scale: 56px (text-display-md desktop)
```

**Aplica a:** nombres de servicios en cards (Home Services section, Services index, Service nav cards prev/next, hero h1 de Service Detail).

**NO aplica a:** títulos de sección, headings de filosofía, body copy, eyebrows. Esos siguen su regla canónica (Serif italic para hero, Sans para body).

**Tailwind classes:** `font-body font-normal uppercase !tracking-[0.05em] text-h4` (cards) · `... text-h1 md:text-display-md` (hero). El `!` fuerza override del letter-spacing built-in de los tokens text-h*/display-* (que vienen con -2% del brand kit canónico).

**Razón:** El wordmark RIVERHAUS es uppercase outlined custom. Los productos heredan ese ADN uppercase. Los servicios = "hijos visuales del wordmark". Lecturable como producto, no como prosa.

### 6.2 Card titles generales (NO product cards)

Para cards que NO son productos (Process cards, Values, Featured method, About sections):

- title: `font-display text-h2 italic` (36px Instrument Serif italic)
- body: `text-body` (17px Instrument Sans · ls +1%)
- eyebrow: `text-eyebrow uppercase` (13px UPPER · ls +8%)

### 6.3 Service nav cards prev/next (revisión)

> Conflicto pendiente: el usuario originalmente dijo "no cambies estos" sobre las nav cards en italic Serif. Después confirmó Option B (UPPER Sans) que también las cambió. Si visualmente prefiere las nav cards en italic Serif (decisión "lectura suave entre productos"), revertir SOLO el ServiceNavCard al pattern `font-display text-h2 italic`.

### 6.4 Deliverables grid

Lógica de columnas dinámicas para evitar celdas grises vacías:
- N=4: `lg:grid-cols-4` (1 fila · 4 cards)
- N=5: `lg:grid-cols-5` (1 fila · 5 cards · más angosto pero clean)
- N=3, 6, 9: `md:grid-cols-3` (default)
- N=7, 8: default · puede dejar 1 celda vacía (raro en práctica)

### 6.5 404 vive fuera del (site) layout

`app/not-found.tsx` está en root de app/ · sin Navbar/Footer · sin shell. Si el cliente quiere 404 con shell completo, mover a `app/(site)/not-found.tsx`.

### 6.6 Hydration warning

Para extensiones Chrome (ColorZilla, Grammarly) que inyectan attrs al body, `suppressHydrationWarning` en `<html>` y `<body>` del root layout. Es zero-cost en prod (solo dev overlay).

### 6.7 Analytics legacy desconectado

`trackEvent()` se eliminó de las new views (Contact form, Hero CTA, etc.). PostHog necesita wireado con `NEXT_PUBLIC_POSTHOG_KEY`. Cuando se conecte: crear `src/lib/analytics-next.ts` que use `process.env` en lugar de `import.meta.env`.

### 6.8 Form submit en Contact

`api.contact()` mock fue reemplazado por `setTimeout(800)` placeholder en `ContactView.tsx`. Real implementation: crear `app/api/contact/route.ts` que reciba POST + envíe email vía Resend / SendGrid / etc.

### 6.9 Domain canónico

`riverhaus.xyz` (NO `riverhaus.cl`). Email primario `riverhaus.xyz@gmail.com`. Legal/notif `riverhaus@protonmail.com`.

---

## 7. Gotchas críticos · NO repetir

### 7.1 `next build` + `next dev` colisión

**NUNCA correr `next build` mientras `next dev` está activo.** Wipea/sobrescribe `.next/` y causa `500 Internal Server Error` consistente al servir requests. Patrón correcto:

```bash
pkill -9 -f next         # 1. kill all next
rm -rf .next             # 2. clean
npx next dev --port 3000 # 3. start fresh
```

Si tienes que verificar build de producción: `pkill -9 -f next && rm -rf .next && next build && rm -rf .next && next dev` (build + clean + restart dev).

Detalle completo en memoria: `~/.claude/projects/-Users-matiascruzat/memory/feedback_next_build_dev_conflict.md`.

### 7.2 Tailwind letter-spacing override

Los tokens `text-h1`/`text-display-md`/etc. del brand kit incluyen letter-spacing built-in (-2%, -0.5%, etc.). Si necesitas otro letter-spacing para un caso específico (como Product Names UPPER ls +5%), usa `!tracking-[Xem]` con `!` important. Sin el `!`, el token gana.

Solución limpia futura: agregar tokens propios `text-product` y `text-product-display` al `tailwind.config.js` con letter-spacing +5% built-in. Esto se puede hacer en M2f o M6.

### 7.3 Vite legacy roto · es esperado

Cuando portamos componentes (Navbar/Footer/GlassButton) a Next.js, eliminamos el código react-router-dom interno. **Vite legacy en :5180 deja de compilar**. Esto es esperado · Vite muere en M6.

Si el cliente intenta correr `npm run dev:vite` (script renombrado), va a fallar con import errors. No es un bug · es transición.

### 7.4 Studio embebido viene en M5

Sanity Studio actualmente vive en su propio workspace `studio/` con `cd studio && npm run dev` → :3333. **NO está embebido en Next.js todavía.** Va en M5 (`app/studio/[[...index]]/page.tsx` con `<NextStudio>`).

### 7.5 EN routes no existen todavía

Todo el sitio Next.js es ES-only por ahora. EN viene en M2f con routing `/en/*`. El brand kit y SEO plan asumen bilingüismo · cuando se llegue ahí, mirror todas las routes.

---

## 8. Cómo retomar en sesión nueva

### Paso 1 · Abrir terminal en el proyecto

```bash
cd ~/Desktop/RIVERHAUS/Studio/lumen-studio
git status                # debe estar limpio
git log --oneline | head -15  # ver historia
```

### Paso 2 · Levantar servicios

```bash
# Frontend Next.js (puerto 3000)
npm run dev &

# Sanity Studio (puerto 3333) - opcional, solo si vas a editar contenido
cd studio && npm run dev &
cd ..
```

Verificar: `curl -I http://localhost:3000` → 200 OK.

### Paso 3 · Abrir Claude Code y darle el bootstrap

Abrir nuevo chat de Claude Code en el directorio del proyecto:

```bash
cd ~/Desktop/RIVERHAUS/Studio/lumen-studio
claude
```

Luego pegar el contenido de `NEW-CHAT-PROMPT.md` (mismo folder que este archivo) como primer mensaje. Eso lee:
- Este `SESSION-HANDOFF.md` (estado completo)
- `01-BRAND-KIT.md` (decisiones de brand)
- `05-IMPLEMENTATION-PLAN.md` (fases originales)
- Memoria personal (`~/.claude/projects/-Users-matiascruzat/memory/MEMORY.md`)

Y le indica: "continuar con M2e".

### Paso 4 · M2e plan resumido (para Claude nuevo)

**Objetivo M2e**: portar Work index y `/work/[slug]` dynamic routes (case studies).

Pattern conocido de M2d:
1. Crear `src/lib/queries/projects.ts` con `getProjects()`, `getProjectBySlug(slug)`, `getProjectSlugs()`
2. Crear `src/views/WorkView.tsx` (index) y `src/views/WorkDetailView.tsx` (detalle)
3. Crear `app/(site)/work/page.tsx` y `app/(site)/work/[slug]/page.tsx` (con generateStaticParams)
4. Verificar 3+ projects en Sanity, prerender ok, prev/next nav

**Diferencia con M2d**: project tiene campo `blocks` que es array de tipos custom (`textBlock`, `quoteBlock`, `statsBlock`). Hay que renderearlos. Es la semilla del Portable Text que viene formal en M4 + Phase 7 del plan original.

Para M2e usar render naive (switch por `_type`) · refactor a Portable Text proper en M4.

Schemas relevantes en `studio/schemaTypes/project.ts` (ya existe).

### Paso 5 · Branches y commits

Trabajamos en `main`. Cada sub-fase es un commit separado con mensaje:
`feat(next-migration): M2X · <descripción corta>`

Sin AI attribution (regla user). Convencional commits format.

---

## 9. Archivos críticos para consultar

En orden de prioridad:

1. **`SESSION-HANDOFF.md`** (este archivo) · estado completo
2. **`01-BRAND-KIT.md`** · decisiones de brand · paleta · tipografía · tokens
3. **`05-IMPLEMENTATION-PLAN.md`** · 12 fases originales (algunas merged en M1-M6 Next migration)
4. **`02-SEO-AEO-PLAN.md`** · SEO/AEO plan para M3
5. **`03-SANITY-CONTENT-MODEL.md`** · schemas para M4
6. **`04-PORTABLE-TEXT-SETUP.md`** · render Portable Text para M4-M5
7. **`00-AUDIT-SUMMARY.md`** · contexto histórico (auditoría instrument.com)

Visuales:
- `brand-guidelines.pdf` v1.5 · 21 páginas · master visual document
- `brand-guidelines.html` · misma cosa interactiva
- `assets/` · logos, favicons, email templates, cotización/invoice templates

---

## 10. Tareas low-priority pendientes (cuando haya tiempo)

- Actualizar `01-BRAND-KIT.md` §3 con la regla Product Names (Option B)
- Limpiar duplicación de hooks en `~/.claude/settings.json` (Opción B del fix CLAUDE_PLUGIN_ROOT)
- Generar versión SVG del wordmark Riverhaus (actualmente PNG raster en `assets/`)
- Actualizar `site.webmanifest` con datos Riverhaus (DONE en Phase 1 brand kit)
- Wireado real de PostHog con `NEXT_PUBLIC_POSTHOG_KEY`
- Implementar `app/api/contact/route.ts` real (actualmente mock)
- Upgrade React 18 → 19 (resuelve peer warning de next-sanity)
- Auditar accesibilidad WCAG (LH, alt texts, focus states)

---

**Fin del documento.** Si tienes dudas, leer en orden: este archivo → `01-BRAND-KIT.md` → `05-IMPLEMENTATION-PLAN.md`.
