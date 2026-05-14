# Brand Kit · Riverhaus
**Versión:** 1.5 (alineado con `brand-guidelines.pdf` v1.5)
**Fecha:** 2026-05-14
**Theme primario:** Dark (Tinta) · alineado con Liquid Glass Studio actual
**Theme alternativo:** Light (Cal Viva) para secciones editoriales y print

---

## 0. Síntesis identitaria

Riverhaus es una consultora **negocio + diseño** con base en Quitacalzón, Valdivia (Los Ríos, Chile), operación internacional (SCL · MAD · LDN · ZAL), bilingüe ES/EN. Voice declarativo, B2B, anti-commodity. Tres servicios núcleo: **Estrategia Comercial · Identidad Digital · Negocio + Diseño**.

Sistema visual:
- **Dark primario** (Tinta `#000000` + sistema Liquid Glass) — continuidad con `:5180`
- **Cal Viva alternativa** para secciones editoriales (about, journal, pricing) y todo print
- **Instrument Serif** dominante en headings · **Instrument Sans** en body · single weight 400
- **Acentos brand**: Río · Bosque · Tierra (geografía Valdivia/Los Ríos) — uso sutil, máximo uno por página

---

## 1. Datos canónicos (resolución de discrepancias)

Encontradas 3 versiones distintas entre fuentes (Cargo · Cotización Doc · Email Signature). Esta tabla es la fuente única de verdad — usar siempre estos valores.

| Campo | Valor canónico | Uso |
|---|---|---|
| Email primario | `riverhaus.xyz@gmail.com` | Signature · cotización · invoice · contacto general |
| Email legal backup | `riverhaus@protonmail.com` | Notificaciones bancarias · documentos firmados |
| Web | `riverhaus.xyz` | Dominio único |
| WhatsApp comercial | +56 9 9233 9054 | Cotizaciones · seguimiento cliente |
| Tagline | Negocio + Diseño | Cover · cotización · materiales comerciales |
| Geo principal | Quitacalzón · Valdivia · Los Ríos · Chile | Footer · letterhead · invoice |
| Geo operación | SCL · MAD · LDN · ZAL | About page · firma extendida |
| Razón social | Matías Cruzat · RUT 15.097.893-9 | Datos bancarios · invoice |
| Banco | Bci · Cuenta Corriente 7779 15097 893 | Cotización · invoice |
| Idioma comercial | Español primario | Documentos a clientes LATAM |

---

## 2. Sistema de logos

Riverhaus tiene **2 marcas**, no una sola.

### 2.1 Wordmark horizontal · proporción 5:1

Tipografía custom condensada, all caps, outline only. Una sola pieza, no se rellena ni se condensa.

| Archivo | Formato | Dimensiones | Uso |
|---|---|---|---|
| `logo-riverhaus.svg` | SVG sin fill (hereda CSS) | viewBox 841×168 | **Fuente principal** |
| `logo-riverhaus-light.svg` | SVG · fill Cal Viva | viewBox 841×168 | Sobre Tinta (dark) |
| `logo-riverhaus-dark.svg` | SVG · fill Tinta | viewBox 841×168 | Sobre Cal Viva (light) |
| `logo-riverhaus-white.png` | PNG RGBA | 841×168 | Legacy raster fallback |
| `logo-riverhaus-trans.gif` | GIF cuadrado | 3504×3000 | Alta resolución redes sociales |

**Reglas wordmark:**
- Clear-space mínimo: alto de la letra "I" en los cuatro lados
- Tamaño mínimo digital: 200px ancho · impreso: 1.5 pulgadas (40mm)
- Proporción 5:1 absoluta · no estirar, condensar, rotar ni recortar
- SVG es la fuente principal — escala infinito
- Fill Cal Viva sobre Tinta · Fill Tinta sobre Cal Viva · NUNCA en colores brand

### 2.2 Isotipo cuadrado · 1000×1000

Para contenedores cuadrados donde la proporción 5:1 no funciona. Símbolo sobre fondo Tinta integrado al diseño.

| Archivo | Tamaño | Uso |
|---|---|---|
| `favicon/favicon.svg` | 1000×1000 vector | Fuente principal isotipo |
| `favicon/favicon.ico` | multi-res | Legacy browsers fallback |
| `favicon/favicon-96x96.png` | 96×96 | Tab del navegador |
| `favicon/apple-touch-icon.png` | 180×180 | iOS home screen + Safari pinned |
| `favicon/web-app-manifest-192x192.png` | 192×192 | PWA Android |
| `favicon/web-app-manifest-512x512.png` | 512×512 | PWA splash + avatar redes |
| `logo-google-profile.png` | 150×150 | Google Business Profile |

### 2.3 Mapeo wordmark vs isotipo por contexto

| Contexto | Marca | Asset |
|---|---|---|
| Header / navbar web | Wordmark | `logo-riverhaus-light.svg` |
| Email signature | Wordmark | PNG raster 400px ancho via CDN |
| Letterhead / invoice / cotización | Wordmark | `logo-riverhaus-dark.svg` (sobre Cal Viva) |
| Tab del navegador | Isotipo | `favicon.svg` |
| Avatar Instagram / LinkedIn | Isotipo | `web-app-manifest-512x512.png` |
| Google Business Profile | Isotipo | `riverhaus_150x150.png` |
| iOS home screen | Isotipo | `apple-touch-icon.png` |
| Open Graph image | Wordmark + tagline | Generar por proyecto |

---

## 3. Tipografía

### Familias

```css
font-display : 'Instrument Serif', Georgia, serif      /* Google Fonts: regular + italic */
font-body    : 'Instrument Sans', system-ui, sans-serif /* Google Fonts: regular */
```

**Regla absoluta:** `font-weight: 400` en headings y body. Jerarquía 100% por tamaño + familia + letter-spacing.

### Decisión Serif-dominant (diferente de instrument.com)

Continúa el patrón actual de `:5180`: **headings H1, H2, H3 en Instrument Serif**, no en Sans. Esto da carácter más editorial que el modelo. Sans para H4, eyebrows, body, UI.

### Type scale (12 tokens)

| Token | Desktop | Mobile | Familia | LS | Rol |
|---|---|---|---|---|---|
| `display-xl` | 144 / 144 | 56 / 60 | Serif | -2% | Hero principal |
| `display-lg` | 80 / 84 | 44 / 48 | Serif | -2% | Hero secundario, intro sección |
| `display-md` | 56 / 60 | 36 / 40 | Serif | -2% | Quote grande, editorial break |
| `h1` | 48 / 56 | 34 / 40 | **Serif** | -2% | Page title |
| `h2` | 36 / 44 | 28 / 34 | **Serif** | -2% | Section title |
| `h3` | 28 / 36 | 24 / 30 | **Serif** | -1% | Sub-section |
| `h4` | 22 / 30 | 20 / 28 | Sans | -0.5% | Block heading |
| `lead` | 20 / 30 | 18 / 28 | Sans | 0 | Lead paragraph |
| `body` | 17 / 28 | 16 / 26 | Sans | +1% | Default paragraph |
| `body-sm` | 15 / 24 | 14 / 22 | Sans | +2% | Footer, secondary |
| `caption` | 13 / 20 | 12 / 18 | Sans | +3% | Captions, metadata |
| `eyebrow` | 13 / 16 UPPER | 12 / 16 UPPER | Sans | +8% | Tags, labels |

**Letter-spacing inverso:** negativo en grandes (–2%), positivo en chicos (+8%). Iguala color tipográfico.

---

## 4. Color · Sistema dual

### 4.1 Theme PRIMARIO · Tinta (dark)

Continuidad con Liquid Glass Studio.

| Token | Valor | Uso |
|---|---|---|
| `paper` | `#000000` | Fondo primario · para glass effects |
| `paper-warm` | `#0A0807` | Fondo warm · secciones sin glass |
| `paper-deep` | `#14110D` | Fondo de cards densas |
| `glass-1` | `rgba(255,255,255,0.01)` | Glass subtle + blur 4px |
| `glass-2` | `rgba(255,255,255,0.04)` | Glass strong + blur 14px |
| `glass-3` | `rgba(255,255,255,0.08)` | Glass prominent + blur 18px |
| `line` | `rgba(255,255,255,0.10)` | Bordes y divisores |
| `ink` | `#FAF7F2` (Cal Viva) | Texto primario sobre dark |
| `ink-soft` | `rgba(250,247,242,0.85)` | Texto secundario |
| `ink-mute` | `rgba(250,247,242,0.55)` | Captions, "Una sola firma", "reposicionada" |
| `ink-faint` | `rgba(250,247,242,0.40)` | Meta info |

### 4.2 Theme ALTERNATIVO · Cal Viva (light)

Para about, journal, pricing y **TODO print**.

| Token | Valor | Uso |
|---|---|---|
| `paper-light` | `#FAF7F2` | Cal Viva — fondo |
| `paper-warm-light` | `#F2EDE3` | Cards destacadas |
| `paper-deep-light` | `#E8E1D2` | Secciones contrastadas |
| `line-light` | `#D9D2C2` | Bordes |
| `ink-light` | `#0A0907` | Texto principal |
| `ink-soft-light` | `#36312A` | Texto secundario |
| `mute-light` | `#7A746A` | Captions |

### 4.3 Acentos brand (geografía)

Doble versión cada uno: `light` para uso sobre Tinta, `deep` para uso sobre Cal Viva.

| Acento | Sobre Tinta | Sobre Cal Viva | Asociación |
|---|---|---|---|
| **Río Calle-Calle** | `#5BA3B8` | `#1F4D5C` | Agua sureña |
| **Bosque Valdiviano** | `#7A9B6E` | `#2D3B2A` | Follaje nativo |
| **Roble Pellín** | `#D4926A` | `#A8633A` | Madera nativa |

**Uso:** Sutil. CTAs primarios, links activos, focus states. Máximo UN acento por página. Nunca como fondo masivo.

### 4.4 Mapa de combinación por sección

| Sección | Theme | Acento | Glass |
|---|---|---|---|
| Home (hero con video) | Tinta | Río light | Strong + Prominent |
| Services index | Tinta | Río light | Strong |
| Project detail | Editor elige | Variable | Variable |
| About · Filosofía | Cal Viva | Bosque deep | — |
| Pricing | Cal Viva | Tierra deep | — |
| Journal / artículos | Cal Viva | — | — |
| Contact · Footer | Tinta | Río light | Subtle |
| **Letterhead · Cotización · Invoice** | **Cal Viva (siempre)** | Río deep | — |

### 4.5 Accesibilidad (WCAG)

- Texto Cal Viva sobre Tinta: **19.4 : 1** AAA
- Texto Tinta sobre Cal Viva: **19.4 : 1** AAA
- CTAs en Río light sobre Tinta: **8.2 : 1** AAA
- CTAs en Río deep sobre Cal Viva: **8.5 : 1** AAA
- Captions ink-mute (55%) sobre Tinta: **6.8 : 1** AA
- Focus state: outline 2px Río + offset 4px

---

## 5. Spacing

```
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160 · 192 · 256
```

Semántico:
```
section-y-tight    64px / 40px  (desktop / mobile)
section-y          96px / 64px  ← default
section-y-loose    160px / 96px
section-y-hero     192px / 120px

block-y            40px / 24px
heading-y          24px / 16px
paragraph-y        16px / 12px
```

---

## 6. Containers / Layout

```
container-narrow   max-width 640px   long-form, artículos
container          max-width 1070px  default
container-wide     max-width 1296px  case studies
container-full     100vw             heros full-bleed

page-x-padding     16 / 24 / 48 px (mobile / tablet / desktop)
```

Flow vertical-first. Grid solo donde tiene sentido — sin 12-col regla.

---

## 7. Voice & tono editorial

**Características:**
- Declarativo · afirmaciones cortas, sin hedging
- Bilingüe ES-CL / EN (ES primario en Chile)
- Anti-commodity · argumentos de valor, nunca de precio
- Voz de partner, no de proveedor
- Geografía visible · Quitacalzón, Valdivia, Los Ríos forman parte de la marca

**Heurísticas editoriales:**
- Heading principal ≤ 12 palabras
- Lead paragraph ≤ 30 palabras
- Body paragraph 40–80 palabras
- Eyebrow ≤ 3 palabras (UPPERCASE auto)
- Cero "tal vez", "quizás", "probablemente"
- Cero "sinergias", "engagement", "ecosystem"
- Argumentos de valor, nunca de precio

**Tono por contexto:**

| Contexto | Tono | Ejemplo |
|---|---|---|
| Home hero | Declarativo, breve | "Conquista tu categoría." |
| About / filosofía | Editorial, reflexivo | "Empezamos por el negocio. Llegamos al diseño cuando hay tesis." |
| Service detail | Concreto, técnico | "Tres fases: investigación, arquitectura, narrativa." |
| Case study | Narrativo, evidencial | "El cliente venía de seis agencias. Faltaba tesis." |
| CTA / contact | Directo, cálido | "Si tienes tesis, conversemos. Si no, también." |
| Footer / legal | Sobrio, claro | "Quitacalzón, Valdivia. Los Ríos, Chile. 2025." |

---

## 8. Componentes signature

Preservar del Studio actual:
- `liquid-glass` / `liquid-glass-strong` (cards en secciones dark)
- `glass-divider` (separadores sutiles)
- Video heros (`videoHero`, `videoFeatured` en siteSettings)

Para Cal Viva:
```css
.paper-card {
  background: var(--paper-warm-light);
  border: 1px solid var(--line-light);
  box-shadow: 0 1px 0 var(--line-light), 0 8px 24px rgba(10, 9, 7, 0.04);
}
```

---

## 9. Correspondencia & print

### 9.1 Email signature

Archivo: `assets/email-signature.html` (Hubspot-style, 600px, Arial email-safe)

- Nombre (Arial 16pt weight 600)
- Cargo (Arial 12pt regular)
- RIVERHAUS (Arial 12pt weight 500)
- Email · web · dirección
- Logo PNG 130px via CDN
- Todo negro sobre blanco (clientes pueden tener dark mode propio)

### 9.2 Email header para clientes

Archivo: `assets/email-header-clients.png` (500×120 banner)

Insertar al inicio del body en: emails comerciales, milestones, cold outbound, propuestas.

### 9.3 Cotización template

Archivo: `assets/templates/cotizacion-template.html` + `.pdf`

4 páginas A4 Cal Viva. Estructura tomada del modelo Google Doc original, revestida con branding Riverhaus. Variables: `{{NUMERO}} {{FECHA}} {{CLIENTE}} {{RAZON_SOCIAL}}` etc.

### 9.4 Invoice template

Archivo: `assets/templates/invoice-template.html` + `.pdf`

1 página A4 Cal Viva. Post-entrega. Referencia siempre a cotización origen. IVA 19% explícito.

### 9.5 Letterhead & tarjeta de visita

- **Letterhead**: A4/Carta · Cal Viva · márgenes 22mm · wordmark dark top-left 130px
- **Tarjeta**: 85×55mm · Cara A wordmark sobre Tinta · Cara B contacto sobre Cal Viva

### 9.6 Ciclo comercial (cuándo va cada uno)

```
01 Email outbound/inbound      → Header + Signature
02 Discovery call + brief      → Calendar invite
03 Cotización enviada          → cotizacion-template (vigencia 5 días)
04 Aprobación cotizante        → Email firmado / PDF
05 Anticipo 50% + kickoff      → Comprobante banco
06 Producción + revisiones     → Emails de seguimiento
07 Entrega + Invoice 50%       → invoice-template
```

**Diferencia clave Cotización ≠ Invoice:**

| | Cotización | Invoice |
|---|---|---|
| Cuándo | Pre-trabajo · oferta | Post-entrega · cobro |
| Vigencia | 5 días hábiles | 14 días para pago |
| Estructura | 4 págs · servicios + términos | 1 pág · line items + totales |
| Numeración | `COT-YYYY-NNN` | `INV-YYYY-NNN` |
| Filename | `RH_Cotizacion_{Cliente}_{Fecha}.pdf` | `RH_Invoice_{Cliente}_{Fecha}.pdf` |

### 9.7 Reglas print universales

- Theme único: **Cal Viva**. Nunca imprimir en Tinta.
- Wordmark: `logo-riverhaus-dark.svg`
- Papel: uncoated 100g+ letterhead, 300g cotton tarjetas
- **NO** acentos brand en CMYK (Río/Bosque/Tierra son tokens digitales)
- Margen 22mm laterales en A4, bleed 3mm si aplica
- Nombrado PDFs: `RH_{Tipo}_{Cliente}_{YYYY-MM-DD}.pdf`

---

## 10. Lo que tomamos / no tomamos de instrument.com

### SÍ adoptamos
- Type scale 12 tokens con LS inverso
- Solo weight 400 en jerarquía
- Containers anidados 640/1070/1296
- Theme por sección/página
- Spacing semántico generoso en heros
- Line-height tight en displays (1.0)

### NO copiamos
- Hero 184px → bajamos a 144px (más "casa", menos "agency-loud")
- Imágenes con `alt=""` → alt obligatorio descriptivo en Riverhaus
- H2 como eyebrows → H1 único + eyebrows como `<span>` con styling
- Sin hreflang → Riverhaus tiene hreflang es-CL + en obligatorio
- Sans para headings → Riverhaus usa **Serif** en h1-h3 (más editorial)
- Paleta caótica por case study → 3 acentos limitados

---

## 11. Referencias cruzadas en el repo

- `brand-guidelines.html / .pdf` — Documento visual maestro (21 págs)
- `02-SEO-AEO-PLAN.md` — SEO + AEO + JSON-LD
- `03-SANITY-CONTENT-MODEL.md` — Arquitectura de schemas
- `04-PORTABLE-TEXT-SETUP.md` — `blockContent.ts` + renderer
- `05-IMPLEMENTATION-PLAN.md` — Plan por fases para aterrizar todo esto
- `assets/templates/cotizacion-template.html` — Plantilla cotización editable
- `assets/templates/invoice-template.html` — Plantilla invoice editable
