# SEO + AEO Plan · Riverhaus
**Versión:** 1.5 (alineado con brand kit v1.5)
**Fecha:** 2026-05-14
**Basado en:** auditoría SEO de instrument.com (`data-11-instrument-seo.json`) + skill `seo-aeo-best-practices`

## Datos canónicos a usar en todos los meta + schema

Resolución de discrepancias entre fuentes (Cargo, Cotización doc, Email signature). Ver `01-BRAND-KIT.md §1` para detalle.

- **Dominio canónico:** `riverhaus.xyz` (NO `riverhaus.cl` — corregir si aparece en ejemplos abajo)
- **Email primario:** `riverhaus.xyz@gmail.com`
- **Tagline:** "Negocio + Diseño"
- **Geo:** Quitacalzón · Valdivia · Los Ríos · Chile
- **Razón social:** Matías Cruzat · RUT 15.097.893-9
- **Theme color (meta):** `#000000` (Tinta primario)

---

## Parte A · Auditoría SEO de instrument.com (modelo)

### Qué hacen BIEN ✓

| Aspecto | Resultado | Implementación |
|---|---|---|
| Meta description | "We are a design and technology company helping brands unlock their full potential." (88 chars) | Corta, declarativa, posicional |
| Open Graph completo | og:title, og:description, og:image, og:type, og:url, og:locale ✓ | Todos presentes |
| Twitter Card | summary_large_image ✓ | Twitter:title, description, image, site, site:id |
| Canonical URL | `https://www.instrument.com/` ✓ | Sin trailing slash mismatch |
| JSON-LD Schema | 2 × `WebSite` schema con publisher Organization | Mínimo viable presente |
| Viewport meta | ✓ | Mobile-ready |
| HTML lang | `en` ✓ | Idioma declarado |
| Loading lazy | 26/26 imágenes con `loading="lazy"` ✓ | Performance |

### Qué hacen MAL ✗ (NO copiar)

| Problema | Hallazgo | Por qué importa |
|---|---|---|
| **Heading hierarchy rota** | 0 H1, 10 H2 (la mayoría como labels), solo 2 H3 con el contenido real | Google espera H1 único, jerarquía coherente. Esto rompe outline algorithm. |
| **Alt vacío en TODO** | 26/26 imágenes con `alt=""` | Cero indexación de imágenes, accesibilidad mínima |
| **Sin hreflang** | mono-idioma `en` solamente | Riverhaus es bilingüe → crítico |
| **Sin sitemap.xml accesible** | `404 Not Found` en `/sitemap.xml` | Bloquea crawl eficiente |
| **Word count bajo** | 402 palabras en home, text/html ratio 0.001 | B2B servicios necesitan ≥ 800 para keyword breadth |
| **Schema básico** | Solo `WebSite` — falta `Organization`, `Service`, `LocalBusiness`, `Person` (founder) | Pierde rich results y E-E-A-T |
| **Title con emoji + tagline larga** | "🐴 Instrument | A technology-led... | Instrument" (80 chars, repite "Instrument") | Diluye keyword density |

---

## Parte B · Plan SEO concreto para Riverhaus

### B.1 · Meta tags por tipo de página

#### Home

```html
<title>Riverhaus · Negocio + Diseño · Posicionamiento de marca | Valdivia, Chile</title>
<meta name="description" content="Consultora bilingüe ES/EN basada en Valdivia. Integramos estrategia comercial y diseño para que dejes de competir por precio y consolides autoridad en tu categoría.">
<meta name="theme-color" content="#000000">
<link rel="canonical" href="https://riverhaus.xyz/">
```

- **Title pattern:** `{brand} · {servicio núcleo} · {posicionamiento} | {ubicación}`
- **Length target:** Title 50–60 chars / Description 120–160 chars
- **NO usar emojis** (a diferencia de instrument.com)
- **Una keyword principal por página** + 1–2 secundarias

#### Service (ej. Posicionamiento Estratégico)

```html
<title>Posicionamiento Estratégico · Riverhaus</title>
<meta name="description" content="Definimos por qué tu marca es la opción inevitable. Investigación de mercado, arquitectura de marca y narrativa estratégica para empresas B2B en LATAM y Europa.">
```

#### Project case study

```html
<title>{Client} — {ProjectTitle} · Caso Riverhaus</title>
<meta name="description" content="{seoDescription field from project schema, ≤160 chars}">
```

### B.2 · Open Graph + Twitter

Implementar el set completo en `Seo.tsx` (componente ya existe, hay que ampliar):

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://riverhaus.xyz/{path}">
<meta property="og:title" content="{page title}">
<meta property="og:description" content="{page description}">
<meta property="og:image" content="{1200x630 image url}">
<meta property="og:locale" content="es_CL">
<meta property="og:locale:alternate" content="en_US">
<meta property="og:site_name" content="Riverhaus">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="...">
```

### B.3 · hreflang (crítico — bilingüe)

```html
<link rel="alternate" hreflang="es-CL" href="https://riverhaus.xyz/es/{path}">
<link rel="alternate" hreflang="en" href="https://riverhaus.xyz/en/{path}">
<link rel="alternate" hreflang="x-default" href="https://riverhaus.xyz/es/{path}">
```

### B.4 · Canonical

Cada página URL canónica, sin tracking params, sin trailing slash inconsistente. Decidir convención y aplicar global.

### B.5 · sitemap.xml + robots.txt

**Faltantes en instrument.com — Riverhaus DEBE tenerlos:**

```
/sitemap.xml      → Listado de todas las URLs, con <xhtml:link rel="alternate" hreflang="...">
/robots.txt       → Allow all, link a sitemap
```

Implementar como ruta dinámica en el front que lee Sanity y genera XML.

---

## Parte C · JSON-LD structured data (donde Riverhaus SUPERA a instrument.com)

### C.1 · Site-wide (en `<head>` global)

#### Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Riverhaus",
  "alternateName": "Riverhaus · Negocio + Diseño",
  "url": "https://riverhaus.xyz",
  "logo": "https://riverhaus.xyz/logo-riverhaus-light.svg",
  "email": "riverhaus.xyz@gmail.com",
  "telephone": "+56-9-9233-9054",
  "description": "Consultora de negocio y diseño basada en Valdivia, Chile. Bilingüe ES/EN.",
  "foundingDate": "2024",
  "founder": { "@type": "Person", "@id": "https://riverhaus.cl/#founder-matias-cruzat" },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Valdivia",
    "addressRegion": "Los Ríos",
    "addressCountry": "CL"
  },
  "sameAs": [
    "https://www.instagram.com/riverhaus",
    "https://www.linkedin.com/company/riverhaus"
  ],
  "areaServed": ["CL", "ES", "GB", "LATAM"]
}
```

#### LocalBusiness (potencia búsquedas geo)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://riverhaus.xyz/#business",
  "name": "Riverhaus",
  "image": "https://riverhaus.xyz/og-fallback.png",
  "priceRange": "$$$",
  "address": { ... como arriba ... },
  "geo": { "@type": "GeoCoordinates", "latitude": -39.81, "longitude": -73.24 },
  "url": "https://riverhaus.xyz"
}
```

#### Person (founder — E-E-A-T crítico)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://riverhaus.xyz/#founder-matias-cruzat",
  "name": "Matías Cruzat",
  "jobTitle": "Founder & Strategy Director",
  "worksFor": { "@id": "https://riverhaus.cl/#business" },
  "sameAs": [
    "https://www.linkedin.com/in/matiascruzat",
    "https://x.com/matiascruzat"
  ]
}
```

### C.2 · Per-page schemas

#### Service page

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Posicionamiento Estratégico",
  "provider": { "@id": "https://riverhaus.cl/#business" },
  "serviceType": "Brand strategy consulting",
  "areaServed": ["CL", "ES", "GB"],
  "description": "{service.summary}",
  "offers": { "@type": "Offer", "priceCurrency": "USD", "price": "..." }
}
```

#### Project / case study

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "{project.title}",
  "creator": { "@id": "https://riverhaus.cl/#business" },
  "client": "{project.client}",
  "datePublished": "{project.year}-01-01",
  "about": "{project.category}"
}
```

#### BreadcrumbList (cada página interior)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://riverhaus.xyz/" },
    { "@type": "ListItem", "position": 2, "name": "Trabajos", "item": "https://riverhaus.xyz/work" },
    { "@type": "ListItem", "position": 3, "name": "{project.client}" }
  ]
}
```

#### FAQPage (donde aplique — pricing, services)

```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
  ]
}
```

---

## Parte D · AEO (Answer Engine Optimization)

ChatGPT, Perplexity, Claude, Gemini eligen citas basadas en autoridad + claridad textual + schema. Concretamente:

### D.1 · Q&A blocks textuales

Para cada servicio y para FAQ, escribir secciones con patrón pregunta→respuesta directa en el primer párrafo. Sanity schema soportará un block type `faqItem`:

```
P: ¿Qué hace Riverhaus diferente de una agencia tradicional?
R: Integramos negocio y diseño desde el día uno. No entregamos identidad
sin justificación comercial; no diseñamos estrategia sin sistema visual
que la haga visible. Una sola firma, una sola tesis.
```

La respuesta debe poder citarse como bloque autónomo (autocontenida, sin pronombres ambiguos).

### D.2 · Author/founder visible

Cada artículo, case study, página de servicio debería mostrar autor con bio breve + link a perfil. Esto carga E-E-A-T (Experience).

### D.3 · Cited sources

Cuando hagamos blog/journal, citar fuentes externas cuando se hagan claims numéricos. AI engines premian contenido con citas verificables.

### D.4 · llms.txt (emergente, vale la pena)

```
# riverhaus.xyz
Consultora bilingüe de negocio y diseño basada en Valdivia, Chile.

## Servicios
- Posicionamiento Estratégico: ...
- Sistemas de Marca: ...
- Negocio + Diseño: ...

## Casos relevantes
- ACRES S.A.: ...
- SONAR FM: ...
```

Genera `/llms.txt` en raíz como ruta dinámica del front. Bajo costo, alto upside para visibilidad en AI engines.

### D.5 · Cuidado con robots vs AI bots

Decidir explícitamente quién puede crawlear:

```
# robots.txt
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

(Si no quieres ser citado por ciertos motores, bloquéalos específico.)

---

## Parte E · Performance SEO (Core Web Vitals)

| Métrica | Target | Cómo |
|---|---|---|
| LCP | < 2.5s | Hero image preload, video poster, font-display: swap |
| INP | < 200ms | No bloquear JS principal, code-split |
| CLS | < 0.1 | width/height en `<img>`, font fallback con metric matching |

Specifics:
- `<link rel="preconnect" href="https://fonts.googleapis.com">` para Instrument
- `<link rel="preload" as="image">` para hero image
- `loading="lazy"` en todas las imágenes below the fold (instrument.com lo hace bien — copiar)
- `<picture>` con srcset para responsive
- Video heros con `poster` attribute para no bloquear LCP

---

## Parte F · Checklist de implementación SEO

Fase por fase:

- [ ] Componente `<Seo>` ampliado: title, description, OG completo, Twitter, canonical, hreflang
- [ ] Schema field reutilizable en Sanity: `seo` object (title override, description override, ogImage, noIndex)
- [ ] JSON-LD generator centralizado: Organization + LocalBusiness en root layout
- [ ] JSON-LD per-page: Service, Project (CreativeWork), BreadcrumbList
- [ ] Person schema para founder
- [ ] Sitemap dinámico (lee Sanity, devuelve XML con hreflang)
- [ ] robots.txt explícito con AI bots
- [ ] `llms.txt` dinámico
- [ ] FAQ block type en Portable Text (genera schema automático)
- [ ] Alt text obligatorio en image schema (validación)
- [ ] H1 único por página (validación a nivel componente)
- [ ] Performance audit con Lighthouse cuando esté implementado

---

## Parte G · Métricas para medir éxito

| Métrica | Tool | Target 6 meses |
|---|---|---|
| Impresiones orgánicas | Google Search Console | +200% vs cargo.site |
| CTR promedio | GSC | > 3% |
| Citaciones en AI engines | manual + monitoreo | ≥ 5 menciones identificadas |
| Core Web Vitals (LCP/INP/CLS) | PageSpeed Insights | Todos en verde |
| Indexación páginas | GSC coverage | 100% de servicios + casos |
| Backlinks de calidad | Ahrefs/Search Console | ≥ 10 DR>40 |
