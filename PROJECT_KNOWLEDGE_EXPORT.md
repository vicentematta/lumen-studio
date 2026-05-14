# Liquid Glass Studio — Project Knowledge Export

> Export generado para que agentes de Paperclip tengan todo el contexto del proyecto y puedan ser especializados por área.
>
> **Proyecto:** Liquid Glass Studio (sitio multi-página estilo agencia)
> **Worktree:** `cool-chatterjee-9dea31`
> **Branch:** `claude/cool-chatterjee-9dea31`
> **Stack:** React 18 + TypeScript + Vite 5 + Tailwind 3 + Framer Motion 11 + React Router 6
> **Owner:** Matías Cruzat (`matiascruzat@gmail.com`)

---

## 1. Origen e intención

### El problema
Matías tenía **tres prompts de diseño web** que ya había probado en sesiones previas y que producían sitios "single-page" estéticamente consistentes pero **funcionalmente vacíos** — los CTAs eran solo decorativos, las secciones eran máscaras visuales sin rutas reales detrás.

Los tres prompts originales (en `/Users/matiascruzat/Desktop/RIVERHAUS/ASSETS/Reverse Engenieer/`):
- **ASME.txt** — colectivo de investigación, posture editorial, tipo serif
- **Liquid Glass Agency.txt** — agencia de diseño con superficies "liquid glass"
- **Velorah.txt** — atelier de lujo silencioso, identidad cinemática

### La pregunta
> "¿Sería buena solución hacer reverse-engineering de los prompts para producir un sistema operativo de verdad — botones que naveguen, páginas que existan, una estética unificada en todo el sitio — en vez de solo una máscara?"

### El plan aprobado
1. Extraer un **design system compartido** (tokens, primitivas glass, variantes de motion, componentes UI) de los tres prompts.
2. Scaffoldear una **app multi-página** con React + Vite + react-router-dom donde **cada CTA navegue a una ruta real**.
3. Rutas mínimas: `/`, `/about`, `/services`, `/services/:slug`, `/work`, `/work/:slug`, `/pricing`, `/contact`, `/login`, `/signup`, 404.
4. Una sola identidad de marca ("Lumen") que reemplaza los tres nombres del prompt original — los proyectos ASME / Velorah / Liquid Glass / Meridian se convierten en **case studies del estudio** (no marcas separadas).

---

## 2. Arquitectura de carpetas

```
src/
├── main.tsx                    # Entry, monta RouterProvider
├── router.tsx                  # createBrowserRouter con todas las rutas
├── index.css                   # Tailwind + .liquid-glass primitives + .input-glass
├── lib/
│   ├── cn.ts                   # className merge utility
│   ├── motion.ts               # Variants compartidas (fadeRise, blurIn, stagger, inViewProps)
│   └── media.ts                # VIDEOS = { heroLoop, featured, philosophy, serviceStrategy, serviceCraft }
├── data/
│   └── projects.ts             # Tipos Block / Project, PROJECTS[], findProject(), adjacentProjects()
├── components/
│   ├── RootLayout.tsx          # Navbar + <Outlet/> + Footer + scrollTo on pathname change
│   ├── Navbar.tsx              # Brand "Lumen", nav links, login + signup, mobile drawer
│   ├── Footer.tsx              # Tres columnas, big CTA, socials
│   ├── PageHero.tsx            # Reusable header (eyebrow + title + subtitle + actions)
│   └── ui/
│       ├── Container.tsx       # Width tokens sm/md/lg/xl
│       ├── GlassButton.tsx     # Polymorfico Link/anchor/button con motion wrapper
│       ├── GlassCard.tsx       # .liquid-glass / .liquid-glass-strong + radius tokens
│       ├── VideoBackground.tsx # Video full-bleed con crossfade opcional entre loops
│       └── SectionHeading.tsx  # Eyebrow + title + subtitle estandarizados
└── pages/
    ├── Home.tsx
    ├── About.tsx
    ├── Services.tsx            # Reutilizado para /services y /services/:slug
    ├── Work.tsx                # Grid de case studies, consume PROJECTS de @/data/projects
    ├── WorkDetail.tsx          # Layout de case study (hero, overview, blocks, outcomes, gallery, prev/next)
    ├── Pricing.tsx
    ├── Contact.tsx
    ├── Auth.tsx                # mode: 'login' | 'signup'
    └── NotFound.tsx
```

---

## 3. Tokens y primitivas del sistema

### Tipografías
- **Display / serif italic:** `font-display` → Instrument Serif (énfasis, titulares, citas)
- **Body / sans:** `font-body` → Barlow (UI, párrafos, navegación, eyebrows)
- **Eyebrows:** siempre `text-xs uppercase tracking-[0.2em] text-white/40`

### Easing y duración
- `easeGlass = [0.22, 1, 0.36, 1] as const` — cubic-bezier custom para todas las transiciones
- Tailwind: `ease-glass` y `transition-all duration-300/700 ease-glass`

### Motion variants (`src/lib/motion.ts`)
```ts
fadeRise         // y: 40 → 0, opacity 0→1, 0.8s
fadeRiseSmall    // y: 20 → 0, opacity 0→1, 0.6s
fadeIn           // opacity 0→1, 0.7s
blurIn           // blur(12px)+y:24 → blur(0)+y:0, 0.9s   (titulares grandes)
stagger          // staggerChildren: 0.12, delayChildren: 0.05
slideFromLeft    // x: -40 → 0
slideFromRight   // x: 40 → 0

inViewProps = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.1, margin: '0px 0px -10% 0px' }
}
```

> **Lección clave:** `viewport.margin: '-100px'` (intento inicial) **no dispara** las animaciones cuando el contenido aparece a mitad de scroll. Usar `amount: 0.1` + margin negativa pequeña en el bottom (`'0px 0px -10% 0px'`) garantiza que `whileInView` se dispare al entrar 10% del elemento al viewport. Importante para screenshots full-page con Playwright.

### Glass primitives (`src/index.css`)
- `.liquid-glass` — `bg-rgba(255,255,255,0.01)` + `backdrop-filter: blur(4px)` + borde gradient enmascarado en `::before`
- `.liquid-glass-strong` — versión más densa: `blur(14px) saturate(140%)` + bg `rgba(255,255,255,0.04)`
- `.glass-divider` — separador horizontal sutil
- `.input-glass` — variante para inputs de formularios (Auth, Contact)

### Paleta
- Fondo: negro absoluto (`#000`)
- Texto principal: `text-white`
- Texto secundario: `text-white/70`, `text-white/60`, `text-white/40` (eyebrows)
- Acentos: `bg-white text-black` para CTAs sólidos (variant `solid` de `GlassButton`)
- Sin colores accent — la jerarquía es solo tipografía + opacidad + glass

---

## 4. Componentes clave (reusables)

### `GlassButton` (polymorfico)
- **Variants:** `glass` | `glass-strong` | `solid` | `ghost`
- **Sizes:** `sm` | `md` | `lg`
- **Pill:** `rounded-full` por default, `rounded-2xl` si `pill={false}`
- **Modo polymorfico:** detecta `to=` (Link interno), `href=` (anchor externo) o ninguno (button). Internamente envuelve cada caso en un `<motion.span>` con `whileHover={{ scale: 1.03 }}` y `whileTap={{ scale: 0.97 }}` para evitar el conflicto de tipos `motion.button` ↔ `DragEventHandler`.

### `VideoBackground`
- Props: `src, crossfade, position, overlayClassName`
- Cuando `crossfade=true`, usa `requestAnimationFrame` para hacer un fade-out 500ms antes del fin del clip y fade-in al reiniciar — produce el efecto de "loop infinito que respira" de la spec ASME.
- Cuando `crossfade=false`, usa `loop` nativo del `<video>`.

### `PageHero`
- Header reutilizable para todas las páginas (no Home).
- Estructura: eyebrow (motion fade) → titular (`blurIn`) → subtitle (`fadeRise` con delay 0.2) → actions (`fadeRise` con delay 0.35).

### `RootLayout`
- `<Navbar /> <main><Outlet /></main> <Footer />`
- Hace `window.scrollTo(0, 0)` en cada cambio de `pathname` (evita que la nueva ruta inicie scrolled).

### `Container`
- Wrap utility con tokens `sm` (max-w-3xl) / `md` (5xl) / `lg` (6xl) / `xl` (7xl) + padding horizontal estándar.

---

## 5. Modelo de datos: case studies (`src/data/projects.ts`)

### Tipos
```ts
export type Block =
  | { kind: 'text'; eyebrow?: string; title: string; body: string }
  | { kind: 'media'; src: string; aspect?: '16/9' | '4/3' | '1/1'; caption?: string }
  | { kind: 'split'; eyebrow?: string; title: string; body: string; src: string; reverse?: boolean }
  | { kind: 'quote'; body: string; attribution: string }
  | { kind: 'stats'; items: Array<{ value: string; label: string }> }

export interface Project {
  slug: string
  client: string
  category: string
  title: string
  subtitle: string
  year: string
  role: string
  duration: string
  hero: string                                     // URL al video del hero
  overview: string
  meta: Array<{ label: string; value: string }>
  blocks: Block[]
  outcomes?: Array<{ value: string; label: string }>
  gallery?: string[]                                // URLs a videos
}
```

### Helpers
- `findProject(slug)` — busca por slug, retorna `Project | undefined`
- `adjacentProjects(slug)` — retorna `{ prev, next }` con módulo (cyclic) para que prev/next siempre tengan algo

### Los cuatro case studies escritos
1. **asme** — Brand & Web · 2026 · 14 weeks · "A new posture for a research collective"
   Stats: +312% session, 4.8x partners, 0 stock images
2. **velorah** — Identity · 2026 · 10 weeks · "A cinematic identity system for a quiet luxury label"
   Outcomes: 12wk sold out, 83% direct organic, 4 press features
3. **liquid-glass** — Product · 2025 · 6 months · "AI-powered design platform, end to end"
   Stats: 0→1 launch, 11k waitlist, $340k ARR en 90 días
4. **meridian** — Strategy · 2025 · 4 months · "Repositioning a 30-year-old hospitality group"
   Outcomes: +24% cross-property bookings, 9 sites unificados, 4 meses kickoff→relaunch

---

## 6. WorkDetail page — anatomía

`src/pages/WorkDetail.tsx` consume `findProject(slug)` y renderiza:

1. **Hero full-bleed** (`80vh`, `min-h-560px`) — `VideoBackground` con `crossfade`, overlay gradient, eyebrow `{client} · {category} · {year}`, h1 con `blurIn`, subtitle.
2. **Overview** — grid 12 columnas: eyebrow "Overview" en col-span-4, párrafo + `<dl>` 4-up con meta (Client/Year/Role/Duration) en col-span-8.
3. **Blocks** — itera `project.blocks[]` y por cada `Block.kind` invoca el sub-componente correspondiente:
   - `TextBlock` — grid 12-col, eyebrow + title + body
   - `MediaBlock` — `<figure>` con video full-bleed dentro de `GlassCard rounded="3xl"`, caption opcional
   - `SplitBlock` — grid 2-col 50/50, video + texto, soporta `reverse`
   - `QuoteBlock` — `<blockquote>` centrado con `blurIn`, font-display italic
   - `StatsBlock` — grid 3-col separado por `gap-px bg-white/5` (efecto de líneas hairline)
4. **Outcomes** (opcional) — header "Outcomes / What it moved." + grid 3-up con valor grande + label.
5. **Gallery** (opcional) — 3 columnas aspect-[4/5] de videos en `GlassCard rounded="2xl"`.
6. **Prev/Next nav** — `adjacentProjects(slug)` con dos `GlassCard` que muestran `aspect-[16/9]` del hero del proyecto adyacente + label "Previous case study" / "Next case study". Botón "All work" debajo.

---

## 7. Router

```tsx
// src/router.tsx
createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,             element: <Home /> },
      { path: 'about',           element: <About /> },
      { path: 'services',        element: <Services /> },
      { path: 'services/:slug',  element: <Services /> },
      { path: 'work',            element: <Work /> },
      { path: 'work/:slug',      element: <WorkDetail /> },
      { path: 'pricing',         element: <Pricing /> },
      { path: 'contact',         element: <Contact /> },
      { path: 'login',           element: <Auth mode="login" /> },
      { path: 'signup',          element: <Auth mode="signup" /> },
      { path: '*',               element: <NotFound /> },
    ],
  },
])
```

---

## 8. Vite config (importante)

```ts
// vite.config.ts
{
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { port: 5180, strictPort: true, host: '127.0.0.1' },
}
```

> **Lección clave (binding IPv4 vs IPv6):** Una sesión vieja de Vite estaba bindeando en `[::1]:5175` (IPv6) y la nueva en `*:5175` (IPv4) — `localhost` resolvía primero a IPv6 y servía contenido stale (la marca "Asme" en vez de "Lumen"). Solución: forzar `host: '127.0.0.1'` + `strictPort: true` y un puerto único (`5180`).

---

## 9. Errores resueltos durante el desarrollo (corpus de troubleshooting)

| Síntoma | Causa | Fix |
|---|---|---|
| `TS2339 Transition['ease'] doesn't exist` | Tipo `Transition['ease']` removido en framer-motion 11 | Usar `as const` en el tuple: `easeGlass = [0.22, 1, 0.36, 1] as const` |
| `TS2307 Cannot find 'node:path'/__dirname` | El alias `@` requería `node:path` que no estaba en `@types/node` | Cambiar a `fileURLToPath(new URL('./src', import.meta.url))` + `npm i -D @types/node` |
| `TS2322 motion.button incompatible con DragEventHandler` | Conflicto entre `onDrag` de React.HTMLProps y de Framer Motion | Refactor: render `<button>` plano dentro de `<motion.span>` con whileHover/whileTap |
| Dev server sirviendo branding stale ("Asme" en vez de "Lumen") | Otro Vite bindeando IPv6 :5175 mientras el nuevo bindea IPv4 :5175 | Force `host: '127.0.0.1'` + cambiar a `port: 5180` + `strictPort: true` |
| Animaciones `whileInView` no disparándose en screenshots full-page | `viewport.margin: '-100px'` muy restrictivo | Cambiar a `amount: 0.1, margin: '0px 0px -10% 0px'` y scrollear lentamente antes del screenshot |

---

## 10. Convenciones de código (heredadas de las reglas globales del usuario)

- **Inmutabilidad:** spread/mapping, nunca mutación in-place
- **Archivos pequeños y enfocados:** 200–400 líneas típico, máximo 800
- **Tipos en APIs públicas:** `interface` para shapes, `type` para uniones
- **No `any` en código de aplicación:** `unknown` + narrowing
- **Sin `console.log`** en producción
- **Validación en bordes:** Zod recomendado para forms (Auth, Contact) cuando se conecten a un backend real
- **Tests:** 80% de cobertura mínima, Playwright para E2E
- **Commits:** formato convencional (`feat:`, `fix:`, `refactor:`, etc.) — sin atribución a Claude (deshabilitada globalmente)

---

## 11. Estado actual del proyecto

### Lo que YA existe y funciona
- ✅ 11 rutas operativas (Home, About, Services, Services/:slug, Work, Work/:slug, Pricing, Contact, Login, Signup, 404)
- ✅ Design system completo con primitivas glass + motion variants
- ✅ Navbar + Footer compartidos en todas las páginas
- ✅ Cuatro case studies completos (asme, velorah, liquid-glass, meridian) con copy editorial, stats, outcomes, gallery
- ✅ Prev/next navigation cíclica entre case studies
- ✅ TypeScript strict + `tsc -b` limpio
- ✅ Verificado en Playwright: rutas devuelven 200, render correcto, prev/next cycling

### Lo que NO existe todavía (oportunidades para agentes especializados)
- ❌ Backend / API real (Auth y Contact son cosméticos)
- ❌ CMS / panel para editar proyectos sin tocar código
- ❌ Tests unitarios o de integración (sólo verificación manual en Playwright)
- ❌ Optimización de assets (los videos son hot-linked desde CloudFront)
- ❌ SEO meta tags, Open Graph, structured data
- ❌ Internacionalización (todo está en inglés)
- ❌ Analytics, formularios funcionales, captcha
- ❌ Build pipeline / CI / deploy
- ❌ Páginas de detalle para `/services/:slug` (la ruta existe pero renderiza el mismo Services)

---

## 12. Sugerencias de especialización por agente Paperclip

Áreas naturales para crear agentes especializados:

| Agente sugerido | Ámbito | Archivos primarios |
|---|---|---|
| **content-writer** | Copy editorial de case studies, eyebrows, quotes | `src/data/projects.ts`, futuros archivos en `src/data/` |
| **design-system-keeper** | Mantener consistencia de tokens, glass primitives, motion variants | `src/index.css`, `src/lib/motion.ts`, `src/components/ui/*` |
| **page-architect** | Diseñar nuevas rutas y layouts | `src/pages/*`, `src/router.tsx` |
| **case-study-builder** | Agregar nuevos proyectos al portfolio | `src/data/projects.ts` |
| **services-detail-builder** | Implementar `/services/:slug` con su propia data layer | `src/pages/Services.tsx`, nueva `src/data/services.ts` |
| **forms-and-auth** | Convertir Auth.tsx y Contact.tsx en formularios reales con validación Zod | `src/pages/Auth.tsx`, `src/pages/Contact.tsx` |
| **seo-and-meta** | Helmet/meta tags por ruta, Open Graph, sitemap, robots | nuevo `src/components/Seo.tsx`, `index.html` |
| **media-optimizer** | Mover videos de CloudFront hot-link a CDN propio + posters | `src/lib/media.ts`, `src/components/ui/VideoBackground.tsx` |
| **i18n-translator** | Spanish/English toggle, react-i18next | nuevo `src/locales/`, modificar `src/data/projects.ts` |
| **test-author** | Vitest para units, Playwright para E2E flows críticos | nuevo `tests/`, `playwright.config.ts` |
| **deploy-engineer** | CI (GitHub Actions), preview deploys (Vercel/Netlify), env vars | `.github/workflows/`, `vercel.json` o `netlify.toml` |
| **analytics-integrator** | GA4, Plausible, o Vercel Analytics | nuevo `src/lib/analytics.ts` |

Cada agente debería leer primero las secciones 1–10 de este documento antes de modificar nada — son la "constitución" del proyecto.

---

## 13. Cómo extender el proyecto sin romper la coherencia

### Para agregar un nuevo case study
1. Subir los videos a `src/lib/media.ts` (o consumirlos desde el CDN existente)
2. Agregar un objeto `Project` al array `PROJECTS` en `src/data/projects.ts`
3. La ruta `/work/:slug` y la grid en `Work.tsx` lo recogen automáticamente

### Para agregar una nueva página
1. Crear `src/pages/NuevaPagina.tsx` siguiendo el patrón: `<PageHero>` arriba + secciones `<section>` con `<Container>` adentro
2. Agregar el route en `src/router.tsx`
3. Si es una sección del menú principal, agregarla en `src/components/Navbar.tsx`

### Para agregar un nuevo tipo de bloque a los case studies
1. Extender la unión `Block` en `src/data/projects.ts`
2. Agregar el handler en el `switch (block.kind)` de `src/pages/WorkDetail.tsx`
3. Crear el componente sub-bloque siguiendo el patrón `function NewBlock({ block }: { block: Extract<Block, { kind: 'newkind' }> })`

---

## 14. Comandos clave

```bash
# Desarrollo
npm run dev              # Vite en http://127.0.0.1:5180

# Build
npm run build            # tsc -b && vite build
npm run preview          # Sirve el build de production

# Verificación rápida
npx tsc -b --pretty false   # Type-check standalone

# Diagnóstico de puerto bloqueado
lsof -nP -iTCP:5180 -sTCP:LISTEN
```

---

## 15. Identidad de marca del estudio

**Nombre:** Lumen (Liquid Glass Studio)
**Logomark:** ícono `Globe` de lucide-react
**Voz:** editorial, contenida, italics serif para énfasis, sin claims grandilocuentes
**Posture:** "the work speaks" — el portafolio es la propuesta de valor, no las taglines

Los proyectos del portfolio (ASME, Velorah, Liquid Glass Inc., Meridian) son **clientes ficticios del estudio** — no son la marca. Esto es importante: el `Liquid Glass` del case study es un producto SaaS B2B, mientras que `Liquid Glass Studio` (a.k.a. Lumen) es la agencia.

---

## Fin del export

Cualquier agente nuevo creado a partir de este documento puede asumir que:
1. El proyecto compila limpio en TypeScript estricto
2. Las cuatro rutas `/work/:slug` están verificadas en Playwright
3. La design system es la fuente de verdad — extenderla, no duplicarla
4. Cualquier feature nueva debe empezar leyendo el archivo correspondiente listado en la **sección 2** antes de modificar nada
