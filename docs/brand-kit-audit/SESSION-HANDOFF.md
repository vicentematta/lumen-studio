# SESSION HANDOFF · Riverhaus · Lumen Studio
**Fecha de cierre:** 2026-05-15
**Último commit:** fix(studio): basePath /studio
**Status:** Migración Vite → Next.js COMPLETA (M1–M6) ✅

---

## 1. Qué es este proyecto

**Riverhaus** es una consultora **Negocio + Diseño** basada en Quitacalzón, Valdivia (Los Ríos, Chile). Operación internacional (SCL · MAD · LDN · ZAL). Bilingüe ES/EN (ES primario). Tres servicios núcleo:

1. **Estrategia Comercial** (slug: `estrategia-comercial`)
2. **Identidad Digital** (slug: `identidad-digital`)
3. **Negocio + Diseño** (slug: `negocio-diseno`)

**Lumen Studio** es el codename interno del proyecto. Brand visible al cliente es Riverhaus.
**Custodio único:** Matías Cruzat · `riverhaus.xyz@gmail.com` · +56 9 9233 9054 · RUT 15.097.893-9.

---

## 2. Stack actual

```
~/Desktop/RIVERHAUS/Studio/lumen-studio/   (repo git)
├── app/
│   ├── layout.tsx          Root · fonts · metadata · JSON-LD global · VisualEditing
│   ├── globals.css
│   ├── sitemap.ts          Dinámico — lee Sanity
│   ├── robots.ts           Permite GPTBot · ClaudeBot · PerplexityBot
│   ├── llms.txt/           route.ts — dinámico con servicios de Sanity
│   ├── not-found.tsx       404 global sin Navbar/Footer
│   ├── (site)/             Route group con Navbar + Footer
│   │   ├── layout.tsx
│   │   ├── page.tsx        Home
│   │   ├── about/
│   │   ├── pricing/
│   │   ├── contact/
│   │   ├── services/       index + [slug] con generateStaticParams
│   │   └── work/           index + [slug] con generateStaticParams
│   ├── studio/             Sanity Studio embebido
│   │   ├── layout.tsx      noindex · studioViewport
│   │   └── [[...index]]/   NextStudio con embedded config
│   └── api/
│       ├── draft-mode/enable/   defineEnableDraftMode con token Editor
│       ├── draft-mode/disable/
│       └── revalidate/          Webhook Sanity → revalidatePath('/', 'layout')
├── src/
│   ├── components/         Navbar · Footer · PageHero · ui/*
│   ├── views/              HomeView · AboutView · PricingView · ContactView ·
│   │                       ServicesView · ServiceDetailView · WorkView · WorkDetailView
│   └── lib/
│       ├── sanity-server.ts    sanityServer (published) + sanityDraft (previewDrafts+stega)
│       ├── studio-embedded-config.ts  Config para Studio en /studio (sin visionTool)
│       ├── jsonld.ts           Generators: Organization · LocalBusiness · Person · WebSite
│       │                       Service · CreativeWork · BreadcrumbList
│       ├── queries/            6 fetchers por doc type + projects.ts
│       ├── cn · media · motion · validation · dataAttr · defaults
│       └── types/sanity.ts
├── studio/                 Sanity Studio standalone → :3333
│   ├── sanity.config.ts    Con visionTool — para dev local
│   └── schemaTypes/        blockContent · seo · imageWithAlt · cta · person +
│                           service · project · homePage · aboutPage · etc.
├── public/                 logos SVG · favicon set · og-fallback.png
├── tailwind.config.js      content: app/ + src/
├── tsconfig.json           incluye studio/sanity.config.ts + studio/schemaTypes/**
├── next.config.ts          transpilePackages: sanity · styled-components · @sanity/ui · @sanity/icons
├── package.json            solo Next.js deps · sin Vite · sin vitest · sin react-router
└── .env.local              NEXT_PUBLIC_SANITY_* + SANITY_API_READ_TOKEN + SANITY_WEBHOOK_SECRET
```

**Dependencies clave:**
- next 16.2.6 (Turbopack)
- next-sanity 12.4.5 (React 18, --legacy-peer-deps)
- sanity 3.99.0 (en root para Studio embebido)
- react 18.3.1
- tailwindcss 3.4.15
- framer-motion 11.11.17

**Sanity config:**
- projectId: `v9k35bzt`
- dataset: `production`
- Token: Editor role (no solo Viewer — permite draft fetching)

---

## 3. Estado de la migración

| Sub | Status | Qué entrega |
|---|---|---|
| **M1** | ✅ DONE | Next.js 16 · brand kit Phase 2 · fonts |
| **M2a** | ✅ DONE | sanity-server + queries/siteSettings + homePage |
| **M2b** | ✅ DONE | Home end-to-end SSR |
| **M2c** | ✅ DONE | /about + /pricing + /contact + /not-found |
| **M2d** | ✅ DONE | /services + /services/[slug] |
| **M2e** | ✅ DONE | /work + /work/[slug] · case studies |
| **M2f** | ⏸ SKIP | EN routes — bilingüismo diferido al final |
| **M3** | ✅ DONE | sitemap · robots · llms.txt · JSON-LD global + per-page |
| **M4** | ✅ DONE | Schemas nuevos: blockContent · seo · imageWithAlt · cta · person |
| **M5** | ✅ DONE | Studio embebido /studio · draft mode · stega Visual Editing |
| **M6** | ✅ DONE | Vite legacy eliminado (39 archivos · 5012 líneas) |

**Migración completa.** Próximos pasos: contenido real (copy final, imágenes, videos) + deploy a Vercel.

---

## 4. URLs funcionales

Servidor dev: `npm run dev` → `http://localhost:3000`

| URL | Status | Fuente |
|---|---|---|
| `/` | ✓ ISR 60s | homePage doc |
| `/about` | ✓ ISR 60s | aboutPage doc |
| `/pricing` | ✓ ISR 60s | pricingPage doc |
| `/contact` | ✓ Dynamic | contactPage doc |
| `/services` | ✓ ISR 60s | service[] list |
| `/services/[slug]` | ✓ Static prerender | service doc |
| `/work` | ✓ ISR 60s | project[] list |
| `/work/[slug]` | ✓ Static prerender | project doc |
| `/studio` | ✓ Studio embebido | next-sanity/studio |
| `/sitemap.xml` | ✓ Dinámico | Sanity slugs |
| `/robots.txt` | ✓ Estático | next MetadataRoute |
| `/llms.txt` | ✓ Dinámico 24h | servicios Sanity |
| `/api/draft-mode/enable` | ✓ Seguro con token | defineEnableDraftMode |
| `/api/revalidate` | ✓ HMAC firmado | webhook Sanity |

Sanity Studio standalone: `cd studio && npm run dev` → `:3333` (con Vision tool)

---

## 5. Decisiones de brand vigentes

### Typography Product Names (Opción B)
```css
font-family: Instrument Sans · weight: 400
text-transform: UPPERCASE · letter-spacing: +0.05em
color: white 100%
```
**Tailwind:** `font-body font-normal uppercase !tracking-[0.05em]`
El `!` fuerza override del letter-spacing built-in de los tokens text-h*.

### Card titles generales (no product)
- title: `font-display text-h2 italic`
- body: `text-body`
- eyebrow: `text-eyebrow uppercase`

---

## 6. Infraestructura pendiente (próxima sesión)

1. **Deploy a Vercel** — configurar env vars + webhook URL producción
2. **Contenido real** — copy final · imágenes · videos en Sanity
3. **coverImage en Work/Services** — cuando haya imágenes, actualizar queries + views
4. **PostHog** — crear `src/lib/analytics-next.ts` con `NEXT_PUBLIC_POSTHOG_KEY`
5. **Contact form real** — `app/api/contact/route.ts` con Resend/SendGrid
6. **Bilingüismo EN** — `/en/*` routes (M2f diferido)
7. **Tokens Sanity en Vercel** — `SANITY_API_READ_TOKEN` + `SANITY_WEBHOOK_SECRET` en env vars

---

## 7. Gotchas críticos

### next build + next dev colisión
**NUNCA** correr `next build` mientras `next dev` está activo. Wipea `.next/` → 500 en todas las requests.
```bash
pkill -9 -f next && rm -rf .next && npx next dev --port 3000
```

### Tailwind letter-spacing override
Tokens `text-h1`/`text-display-md` incluyen letter-spacing. Para override usar `!tracking-[Xem]` con `!`.

### Studio embebido vs standalone
- `/studio` (embebido): Structure + Presentation. Sin Vision tool. Config en `src/lib/studio-embedded-config.ts`. **Necesita `basePath: '/studio'`.**
- `:3333` (standalone): Todos los tools incluyendo Vision. Config en `studio/sanity.config.ts`.

### sanity@3 en root
`sanity@3.99.0` está instalado en root (necesario para Studio embebido). **No instalar** `@sanity/vision` en root — causa conflicto de versiones con el config del Studio.

### revalidateTag en Next.js 16
`revalidateTag` requiere 2 argumentos en Next.js 16 (nuevo profile param). El webhook usa `revalidatePath('/', 'layout')` en su lugar.

### Draft mode + Visual Editing
- Token necesita ser **Editor** (no Viewer) para fetching de borradores.
- `sanityFetch()` selecciona automáticamente `sanityDraft` (previewDrafts + stega) cuando draft mode está activo.
- Stega encoding habilita click-to-edit overlays en Presentation.

---

## 8. Cómo retomar en sesión nueva

```bash
cd ~/Desktop/RIVERHAUS/Studio/lumen-studio
git log --oneline | head -10
git status

# Levantar Next.js
npm run dev

# Levantar Studio standalone (opcional)
cd studio && npm run dev
```

Verificar: `curl -I http://localhost:3000` → 200 OK
Studio embebido: `http://localhost:3000/studio`

**Leer este archivo primero. Luego `01-BRAND-KIT.md` si hay dudas de brand.**
