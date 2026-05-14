# Auditoría tipográfica · instrument.com → Riverhaus

**Fecha:** 2026-05-14
**Páginas auditadas:** Home, About, Case Study (Feeld), Services (Brand)
**Breakpoints:** Desktop 1440 · Mobile 390
**Método:** browser-harness · computed styles del DOM (no inspección visual)

> **Nota v1.5:** Este documento captura los hallazgos crudos del modelo (instrument.com). Las decisiones aplicadas para Riverhaus están consolidadas en `01-BRAND-KIT.md` v1.5 y visualmente en `brand-guidelines.pdf` v1.5 (21 páginas). Cambios clave después de v1.0: theme primario invertido a Tinta (dark), headings en Serif (no Sans como instrument.com), Cal Viva como theme alternativo + único para print.

---

## Hallazgos clave

### 1. Sistema tipográfico minimalista — solo 2 familias

| Familia | Uso | Variantes detectadas |
|---|---|---|
| **Instrument Serif** | Hero displays únicamente | Regular + Italic |
| **Instrument Sans** | Todo lo demás (UI, body, headings medios) | Regular |

**Sorprendente: NO usan weights pesados.** Toda la página corre en `font-weight: 400`. La jerarquía se construye 100% con **tamaño + familia + letter-spacing**, no con bold.

### 2. Escala tipográfica detectada (1440 desktop)

| Rol | Size / LH | Familia | LS | Ejemplo |
|---|---|---|---|---|
| **display-xl** | `184px / 184px` | Instrument Serif | `-2%` | "Feeld", "20 Years" (hero case study/about) |
| **display-lg** | `64px / 72px` | Instrument Serif | `-2%` | "We're a digital-first design agency…" (home) |
| **display-md** | `52px / 56px` | Instrument Sans | `-2.5%` | Big nav, CTAs grandes |
| **h1** | `44px / 48px` | Instrument Sans | `-2.5%` | "Meet our talented team…" (about section) |
| **h2** | `36px / 40px` | Instrument Sans | `-2.5%` | "Shape a better future" (home) |
| **h3** | `28px / 32px` | Instrument Sans | `-1%` | "We make brands, products, websites…" |
| **h4 / lead** | `23px / 28px` | Instrument Sans | `-0.5%` | "Keep up to date with our quarterly newsletter…" |
| **body-lg** | `19px / 24px` | Instrument Sans | `+0.5%` | Lead paragraph |
| **body** | `18px / 28px` | Instrument Sans | `+2%` | Default paragraph (case study body) |
| **body-sm** | `15px / 24px` | Instrument Sans | `+3%` | Footer, captions |
| **eyebrow** | `16px / 16px` | Instrument Sans | `0` | Nav, simple labels |
| **meta / caps** | `14px / 20px` | Instrument Sans | `+8%` | UPPERCASE tags ("STRATEGY", "BRAND CAPABILITIES") |

### 3. Escala responsive (mobile 390)

| Rol | Desktop | Mobile | Ratio |
|---|---|---|---|
| display-xl | 184px | 64px | 0.35× (drástico) |
| display-lg | 64px | 35px | 0.55× |
| h1 | 44px | 36px | 0.82× |
| h2 | 36px | 31px | 0.86× |
| h3 | 28px | 26px | 0.93× |
| h4 | 23px | 20px | 0.87× |
| body | 18px | 16px | 0.89× |
| body-sm | 15px | 13px | 0.87× |
| meta caps | 14px | 12px | 0.86× |

**Pattern:** Headings displays bajan agresivo (0.35×–0.55×). Headings medios y body bajan suave (0.85×–0.95×). Esto preserva legibilidad sin sacrificar impacto visual en desktop.

### 4. Letter-spacing inverso — regla universal

Letter-spacing **negativo en tamaños grandes**, **positivo en chicos**:

- `>= 28px` → negativo (–0.5% a –2.5%)
- `18–24px` → ligeramente positivo (+0.5% a +2%)
- `<= 15px` → más positivo (+3% a +8%)

Esto es un estándar de tipografía editorial: tamaños grandes se ven "abiertos", chicos se ven "apretados" — el LS los iguala visualmente.

### 5. Line-height por rol

| Categoría | LH ratio | Aplicación |
|---|---|---|
| Display tight | 1.00–1.05 | Heros (184px/184px, 64px/72px) |
| Heading normal | 1.10–1.15 | h1, h2, h3 |
| Body lead | 1.20–1.26 | h4, body-lg |
| Body reading | 1.55–1.60 | body, body-sm, body-xs |

### 6. Color & background

- No hay un fondo único: **cada página tiene paleta propia** (case studies con color brand del cliente)
- Home: `#FFFFFF` / texto `#070708`
- About: `#868895` / texto `#FFFFFF`
- Feeld: `#394ACB` / texto `#F4F6FF`
- Brand services: `#27063B` / texto `#DDD8E8`

Implicación para Riverhaus: el sistema debe soportar **inversión de tema por sección/página** (no asumir light o dark globalmente).

### 7. Layout / containers

- **Max-widths típicos:**
  - `640px` — texto leíble (body content)
  - `1070px` — medio (about, services)
  - `1296px` — wide (case studies con media)
- Padding lateral en mobile típicamente `16–24px`
- **No usan grid pesado** — más bien flow vertical con max-widths anidados

---

## Implicaciones para Riverhaus

### Lo que SÍ adoptar (alineado con tu intención)

1. **Type scale de 10–12 tokens** con responsive (desktop/mobile)
2. **Solo 2 familias**: Instrument Serif (display) + Instrument Sans (todo)
3. **Solo `font-weight: 400`** — eliminar bold/semibold de los headings (gran simplificación)
4. **Letter-spacing inverso por tamaño** (regla automática en tokens)
5. **Eyebrows en caps con LS +8%** para tags y meta info
6. **Containers anidados** (640 / 1070 / 1296) en vez de un solo container global

### Lo que NO copiar (mantener tu identidad)

- Su uso de hero `184px` es extremo — Riverhaus puede preferir `120–144px` para no perder elegancia (la arquitectura/inmobiliario es menos "agency-loud")
- Su paleta por-página es de portafolio creativo; Riverhaus probablemente quiere paleta más estable
- Su contenido scroll-heavy (case study Feeld = 12,000px) es porfolio; Riverhaus es más curado

### Trade-off principal — RESUELTO en v1.5

**Display max size:** `144px` desktop / `56px` mobile. Más editorial, menos shouty. Confirmado por usuario en v1.0.

---

## Artefactos generados

- `01-home-desktop.png` — full-page home (2560px, scroll completo)
- `02-{about,brand,feeld}-fullpage.png` — full-page case studies
- `03-desktop-1440-{home,about,feeld,brand}.png` — viewport above-fold @ 1440
- `03-mobile-390-{home,about,feeld,brand}.png` — viewport above-fold @ 390
- `data-desktop-1440.json` — type groups completos por página, desktop
- `data-mobile-390.json` — type groups completos por página, mobile

Próximo paso: revisar `01-BRAND-KIT.md` con la propuesta concreta para Riverhaus.
