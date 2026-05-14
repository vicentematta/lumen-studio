# Portable Text Setup · Riverhaus
**Versión:** 1.5 (alineado con brand kit v1.5)
**Fecha:** 2026-05-14
**Basado en:** skill `portable-text-serialization` · brand kit `01-BRAND-KIT.md`

> **Nota v1.5:** Headings H1–H3 en **Instrument Serif** (no Sans), decisión Serif-dominant que diferencia Riverhaus de instrument.com. H4 y siguientes en Sans. Theme primario es **dark** — el renderer aplica clases que respetan `data-theme="dark|light"` del contenedor padre. Ver `01-BRAND-KIT.md §3` para type scale completo.

---

## 1. Esquema `blockContent.ts` (Sanity Studio)

Mapeo directo de los 12 tokens del brand kit a `block styles`. **Sin `strong`** (no usamos bold).

```ts
// studio/schemaTypes/objects/blockContent.ts
import { defineType, defineArrayMember } from 'sanity'

export const blockContent = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    // ── Block estándar con styles del brand kit ────────────────────────
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal',      value: 'normal' },        // → body
        { title: 'Lead',        value: 'lead' },          // → text-lead
        { title: 'Display XL',  value: 'displayXl' },     // → 144/56 Serif
        { title: 'Display LG',  value: 'displayLg' },     // → 80/44 Serif
        { title: 'Display MD',  value: 'displayMd' },     // → 56/36 Serif
        { title: 'Heading 1',   value: 'h1' },            // → 48/34 Sans
        { title: 'Heading 2',   value: 'h2' },            // → 36/28 Sans
        { title: 'Heading 3',   value: 'h3' },            // → 28/24 Sans
        { title: 'Heading 4',   value: 'h4' },            // → 22/20 Sans
        { title: 'Eyebrow',     value: 'eyebrow' },       // → 13/12 UPPER LS+8%
        { title: 'Quote',       value: 'blockquote' },    // → Serif italic 56
        { title: 'Caption',     value: 'caption' },       // → 13/12 mute
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Italic', value: 'em' },     // ÚNICO — sin bold
          { title: 'Code',   value: 'code' },
        ],
        annotations: [
          // Link interno (referencia a otro documento)
          {
            name: 'internalLink',
            type: 'object',
            title: 'Link interno',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [
                  { type: 'project' },
                  { type: 'service' },
                  { type: 'aboutPage' },
                  { type: 'contactPage' },
                  { type: 'pricingPage' },
                  { type: 'person' },
                ],
              },
            ],
          },
          // Link externo
          {
            name: 'externalLink',
            type: 'object',
            title: 'Link externo',
            fields: [
              { name: 'href', type: 'url', title: 'URL' },
              { name: 'newTab', type: 'boolean', title: 'Abrir en nueva pestaña', initialValue: true },
              { name: 'noFollow', type: 'boolean', title: 'rel=nofollow', initialValue: false },
            ],
          },
          // Highlight (acento sutil con brand color)
          {
            name: 'highlight',
            type: 'object',
            title: 'Highlight',
            fields: [{ name: 'kind', type: 'string', options: { list: ['rio', 'bosque', 'tierra'] }, initialValue: 'rio' }],
          },
        ],
      },
    }),

    // ── Imagen embebida en flow ─────────────────────────────────────────
    defineArrayMember({
      type: 'imageWithAlt',
      name: 'image',
    }),

    // ── Video embebido (CloudFront URL) ─────────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'videoEmbed',
      title: 'Video',
      fields: [
        { name: 'url', type: 'url', title: 'URL (mp4)', validation: (r: any) => r.required() },
        { name: 'caption', type: 'string', title: 'Caption' },
        { name: 'poster', type: 'imageWithAlt', title: 'Poster (frame inicial)' },
      ],
    }),

    // ── Pull-quote destacado ────────────────────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'pullQuote',
      title: 'Pull Quote',
      fields: [
        { name: 'quote', type: 'text', rows: 3, title: 'Quote' },
        { name: 'attribution', type: 'string', title: 'Atribución' },
        { name: 'role', type: 'string', title: 'Rol/Cargo' },
      ],
    }),

    // ── Stats inline ────────────────────────────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'statsInline',
      title: 'Stats inline',
      fields: [
        {
          name: 'items',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'value', type: 'string', title: 'Valor (ej. "3x", "+200%")' },
              { name: 'label', type: 'string', title: 'Label' },
            ],
          }],
          validation: (r: any) => r.max(4),
        },
      ],
    }),

    // ── CTA block ───────────────────────────────────────────────────────
    defineArrayMember({
      type: 'cta',
      name: 'ctaBlock',
    }),

    // ── Divider visual ──────────────────────────────────────────────────
    defineArrayMember({
      type: 'object',
      name: 'divider',
      title: 'Divider',
      fields: [
        { name: 'kind', type: 'string', options: { list: ['line', 'space-sm', 'space-md', 'space-lg'] }, initialValue: 'line' },
      ],
      preview: { prepare: () => ({ title: '—' }) },
    }),
  ],
})
```

---

## 2. Renderer React (`@portabletext/react`)

### Setup

```bash
npm install @portabletext/react @portabletext/toolkit
```

### Componente principal

```tsx
// src/components/PortableText.tsx
import { PortableText as PT, PortableTextComponents } from '@portabletext/react'
import { Link } from 'react-router-dom'
import { urlFor } from '@/lib/sanity-image'

// Resuelve internal link → URL
const resolveInternalLink = (ref: any): string => {
  const type = ref?._type
  const slug = ref?.slug?.current
  switch (type) {
    case 'project':       return `/work/${slug}`
    case 'service':       return `/services/${slug}`
    case 'person':        return `/about#${slug}`
    case 'aboutPage':     return `/about`
    case 'contactPage':   return `/contact`
    case 'pricingPage':   return `/pricing`
    default:              return '/'
  }
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    // Display Serif
    displayXl:  ({ children }) => <h1 className="font-display text-display-xl text-balance">{children}</h1>,
    displayLg:  ({ children }) => <h2 className="font-display text-display-lg text-balance">{children}</h2>,
    displayMd:  ({ children }) => <h3 className="font-display text-display-md text-balance">{children}</h3>,
    // Heading Serif (v1.5: Serif-dominant, NO Sans en h1-h3)
    h1:         ({ children }) => <h1 className="font-display text-h1 text-balance">{children}</h1>,
    h2:         ({ children }) => <h2 className="font-display text-h2 text-balance mt-section-y">{children}</h2>,
    h3:         ({ children }) => <h3 className="font-display text-h3 text-balance mt-block-y">{children}</h3>,
    h4:         ({ children }) => <h4 className="font-body text-h4 mt-block-y">{children}</h4>,
    // Body roles
    lead:       ({ children }) => <p className="font-body text-lead text-pretty">{children}</p>,
    normal:     ({ children }) => <p className="font-body text-body text-pretty">{children}</p>,
    caption:    ({ children }) => <p className="font-body text-caption text-mute">{children}</p>,
    eyebrow:    ({ children }) => <p className="font-body text-eyebrow uppercase">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="font-display italic text-display-md text-balance border-l-2 border-brand-rio pl-6 my-section-y-tight">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="font-body text-body list-disc pl-6 space-y-2">{children}</ul>,
    number: ({ children }) => <ol className="font-body text-body list-decimal pl-6 space-y-2">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  marks: {
    em:   ({ children }) => <em className="font-display italic">{children}</em>,
    code: ({ children }) => <code className="font-mono text-[0.9em] px-1.5 py-0.5 bg-paper-warm rounded">{children}</code>,
    highlight: ({ children, value }) => (
      <span className={`px-1 -mx-1 rounded ${
        value?.kind === 'rio' ? 'bg-brand-rio/10 text-brand-rio' :
        value?.kind === 'bosque' ? 'bg-brand-bosque/10 text-brand-bosque' :
        'bg-brand-tierra/10 text-brand-tierra'
      }`}>{children}</span>
    ),
    internalLink: ({ children, value }) => (
      <Link to={resolveInternalLink(value?.reference)} className="underline decoration-1 underline-offset-4 hover:decoration-brand-rio">
        {children}
      </Link>
    ),
    externalLink: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.newTab ? '_blank' : undefined}
        rel={[
          value?.newTab && 'noopener',
          value?.newTab && 'noreferrer',
          value?.noFollow && 'nofollow',
        ].filter(Boolean).join(' ') || undefined}
        className="underline decoration-1 underline-offset-4 hover:decoration-brand-rio"
      >
        {children}
      </a>
    ),
  },

  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-block-y">
          <img
            src={urlFor(value).width(1200).auto('format').url()}
            alt={value.alt || ''}
            loading="lazy"
            className="w-full rounded-md"
          />
          {value.caption && (
            <figcaption className="text-caption text-mute mt-2">
              {value.caption}
              {value.credit && <span className="ml-2">· {value.credit}</span>}
            </figcaption>
          )}
        </figure>
      )
    },

    videoEmbed: ({ value }) => (
      <figure className="my-block-y">
        <video
          src={value.url}
          poster={value.poster ? urlFor(value.poster).url() : undefined}
          controls
          playsInline
          className="w-full rounded-md"
        />
        {value.caption && <figcaption className="text-caption text-mute mt-2">{value.caption}</figcaption>}
      </figure>
    ),

    pullQuote: ({ value }) => (
      <figure className="my-section-y-tight">
        <blockquote className="font-display italic text-display-md text-balance">
          “{value.quote}”
        </blockquote>
        {(value.attribution || value.role) && (
          <figcaption className="font-body text-eyebrow mt-4 text-mute uppercase">
            {value.attribution}{value.role ? ` · ${value.role}` : ''}
          </figcaption>
        )}
      </figure>
    ),

    statsInline: ({ value }) => (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 my-section-y-tight">
        {value.items?.map((item: any, i: number) => (
          <div key={i}>
            <div className="font-display text-display-md">{item.value}</div>
            <div className="font-body text-caption text-mute mt-1 uppercase tracking-wider">{item.label}</div>
          </div>
        ))}
      </div>
    ),

    ctaBlock: ({ value }) => {
      // Renderiza el `cta` object — implementar componente <CTA value={value} />
      return null  // placeholder
    },

    divider: ({ value }) => {
      switch (value?.kind) {
        case 'line':     return <hr className="border-line my-section-y" />
        case 'space-sm': return <div className="h-block-y" />
        case 'space-md': return <div className="h-section-y-tight" />
        case 'space-lg': return <div className="h-section-y" />
        default:         return null
      }
    },
  },

  hardBreak: () => <br />,
}

// Componente wrapper
export const PortableText = ({ value, locale = 'es' }: { value: any; locale?: 'es' | 'en' }) => {
  if (!value) return null
  // Si es localizedPortableText, extraer la versión por locale
  const blocks = Array.isArray(value) ? value : value[locale] || value['es'] || value['en']
  if (!blocks || !Array.isArray(blocks)) return null
  return <PT value={blocks} components={portableTextComponents} />
}
```

---

## 3. GROQ queries con references expandidas

Crítico: cuando Portable Text incluye `internalLink` o `image`, hay que expandir referencias en la query — si no, llegan IDs huérfanos.

```ts
// src/lib/queries.ts

// Fragment reutilizable para cualquier campo de Portable Text
export const portableTextFragment = `
  body[]{
    ...,
    _type == "image" => {
      ...,
      asset->{
        _id,
        url,
        metadata { dimensions, lqip }
      }
    },
    _type == "videoEmbed" => {
      ...,
      poster {
        ...,
        asset->{ url, metadata { dimensions } }
      }
    },
    markDefs[]{
      ...,
      _type == "internalLink" => {
        ...,
        "reference": reference->{
          _type,
          "slug": slug.current,
          ...select(_type == "project" => { client, "title": title.es }),
          ...select(_type == "service" => { name })
        }
      }
    }
  }
`

// Ejemplo: project page query
export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    slug,
    client,
    title,
    subtitle,
    year,
    role,
    duration,
    overview {
      es[]{ ...${/* expand inner */''} },
      en[]{ ... }
    },
    blocks[]{ ... },
    seo,
    "categories": categories[]->{ "slug": slug.current, title }
  }
`
```

**Nota:** dentro de `overview.es[]` también hay que aplicar el mismo patrón de expansión que `portableTextFragment`. Crear un helper que lo genere.

---

## 4. Tailwind config — text utilities

Para que las clases `text-display-xl`, `text-h1`, etc. existan en Tailwind:

```js
// tailwind.config.js — fragment a integrar
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

// Responsive override (mobile-first via screens, ej. md)
// O usar clases responsive: text-display-xl md:text-[144px] — pero más limpio con plugin
```

**Patrón responsive recomendado:** usar plugin `tailwindcss-fluid-type` o definir clases manuales `text-display-xl-fluid` con `clamp()`.

```css
/* En index.css, dentro de @layer utilities */
.text-display-xl-fluid {
  font-size: clamp(56px, 8vw, 144px);
  line-height: clamp(60px, 8vw, 144px);
  letter-spacing: -0.02em;
}
```

---

## 5. Plain text extraction (para SEO meta + AI feeds)

Para generar meta descriptions automáticas y feeds:

```ts
// src/lib/portable-text-utils.ts
import { toPlainText } from '@portabletext/toolkit'

export const ptToPlainText = (blocks: any, maxLength = 160) => {
  if (!blocks) return ''
  const text = toPlainText(Array.isArray(blocks) ? blocks : blocks.es || blocks.en || [])
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - 1).trim() + '…'
}
```

Uso en `<Seo>`:
```tsx
const description = page.seo?.description || ptToPlainText(page.body, 160)
```

---

## 6. Bilingual content patterns

Para textos cortos (titles): seguir el helper `ls` actual (`{ en: string, es: string }`).

Para Portable Text largo:

**Opción A — object simple (recomendado para v1):**
```ts
type LocalizedPortableText = {
  es: PortableTextBlock[]
  en: PortableTextBlock[]
}
```

Editor ve dos panels (ES / EN) en el mismo documento. Riesgo: olvido de traducir una versión.

**Opción B — Document Internationalization plugin (cuando escale):**
- Plugin oficial `@sanity/document-internationalization`
- Cada documento se duplica por locale, con vinculación
- Mejor para SEO (URLs distintas por idioma)

Para v1, vamos con A. Si en 6 meses tenemos >50 docs bilingües, migrar a B.

---

## 7. Checklist de implementación Portable Text

- [ ] Crear `studio/schemaTypes/objects/blockContent.ts`
- [ ] Crear `localizedPortableText.ts`
- [ ] Crear `image.ts` (imageWithAlt), `cta.ts`, `link.ts`, `theme.ts`
- [ ] Registrar todos en `schemaTypes/index.ts`
- [ ] Refactor `project.overview` y `project.blocks[textBlock].body` a usar Portable Text
- [ ] `npm install @portabletext/react @portabletext/toolkit` en `src/`
- [ ] Crear `src/components/PortableText.tsx` con components map
- [ ] Crear `src/lib/portable-text-utils.ts` (`ptToPlainText`, `resolveInternalLink`)
- [ ] Crear GROQ fragments con references expandidas
- [ ] Tailwind: añadir `fontSize` tokens
- [ ] Verificar render en Presentation mode (`http://localhost:3333/presentation/...`)
- [ ] QA: editor crea un párrafo con italic + link interno + image, ver render en preview
