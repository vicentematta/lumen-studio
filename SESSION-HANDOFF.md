# Lumen Studio — Session Handoff

## Para arrancar una nueva sesión

Pegale esto a Claude Code al inicio:

> "Hola. Vengo continuando el proyecto Riverhaus Lumen Studio en `/Users/matiascruzat/Desktop/RIVERHAUS/Studio/lumen-studio`. Lee los últimos commits de git y `SESSION-HANDOFF.md` para contexto."

Claude Code leerá este archivo + el git log + los archivos de memoria y retomará desde donde estamos.

---

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Sanity CMS** (`next-sanity 12`, GROQ, Studio embebido en `/studio`)
- **Tailwind CSS v4** + **Framer Motion**
- **Cargo CDN** (`freight.cargo.site`) para todos los videos e imágenes — nunca subir media a Sanity sin preguntar
- Dev: `npm run dev` en puerto 3000

---

## Estado actual del proyecto

### Proyectos en Sanity (slugs)
| Slug | Cliente | Estado |
|------|---------|--------|
| `chilechallenge` | #ChileChallenge / Sernatur | ✅ Completo |
| `duros-de-roer` | Duros de Roer | ✅ Completo |
| `acres` | ACRES S.A. | ✅ Completo |
| `cruzat-excom` | Cruzat Excom | ✅ Completo |
| `undurraga-wines` | Viña Undurraga / T.H | ✅ Completo |

### Bloques de contenido disponibles
- `videoBlock` — video full o contained. `contained` usa Container `md`. Tiene `posterUrl` (externa), fullscreen btn, Sound On/Off pill
- `videoRowBlock` — hasta 3 videos en grid. Container `lg`
- `mediaColumnsBlock` — columna izquierda (imagen) + `rightItems[]` (videoItem / imageItem / spacerItem con widthPct)
- `imageBlock` — full / contained / pair
- `textBlock`, `quoteBlock`, `statsBlock`

---

## Funcionalidades clave implementadas

### `/work` (WorkView)
- Cards con hover video: film grain + CSS filter cinemático + `scale(1.3)` con `clip-path`
- Video arranca desde el medio del clip (excepto `undurraga-wines` → segundo 5)
- Loop de 8s, `preload="metadata"` para carga rápida
- Opacidad video: `0.27`
- `overlayRef` para control directo de DOM (sin re-renders de React)

### `/work/[slug]` (WorkDetailView)
- Nav cards al final también tienen hover video (mismo sistema)
- Sugerencias: `rh_seen_work` + `rh_work_history` en localStorage — nunca repite los últimos 2 visitados
- Videos: botón fullscreen (top-right) + Sound Off/On pill (bottom-right)
- `VideoWithUnmute` y `RightColumnVideo` con mismos controles

### Footer
- `WorkCTAButton` — si ya estás en `/work`, hace scroll to top en lugar de navegar

---

## Archivos clave
```
src/
  views/WorkView.tsx          ← hover video cards
  views/WorkDetailView.tsx    ← detail page + nav cards + video blocks
  lib/queries/projects.ts     ← GROQ queries + tipos TypeScript
  components/WorkCTAButton.tsx ← footer "Ver trabajos" con scroll-to-top
  components/Footer.tsx
app/globals.css               ← @keyframes film-grain
studio/schemaTypes/project.ts ← schema Sanity de bloques
docs/brand-kit-audit/PERSPECTIVAS.md ← principios de diseño emergentes
```

---

## Reglas importantes
1. **Media hosting → Cargo CDN siempre.** Nunca subir a Sanity sin preguntar al cliente.
2. **Sanity token** está en `.env.local` (SANITY_API_READ_TOKEN). Usar para mutar documentos vía API.
3. **Cache Next.js en dev** — después de mutar Sanity, usar `page.goto()` (no `reload()`) para ver cambios.
4. **Imágenes externas** → usar `leftImageUrl` / `posterUrl` en los schemas (no `imageWithAlt` que requiere asset Sanity).

---

## Últimos commits
```bash
git log --oneline -5
```
