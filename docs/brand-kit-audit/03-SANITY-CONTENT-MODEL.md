# Sanity Content Model · Riverhaus
**Versión:** 1.5 (alineado con brand kit v1.5)
**Fecha:** 2026-05-14
**Basado en:** skill `content-modeling-best-practices` · schemas actuales del Studio · brand kit `01-BRAND-KIT.md`

> **Nota v1.5:** Theme primario es **dark (Tinta)**, alternativo **Cal Viva (light)**. El `theme` field en objetos/secciones acepta `'dark' | 'light'` con default `'dark'`. Print y documentos comerciales (cotización, invoice) usan siempre Cal Viva. Ver `01-BRAND-KIT.md §4` para detalle.

---

## Diagnóstico del modelo actual

### Lo que ya existe ✓

| Schema | Propósito | Estado |
|---|---|---|
| `homePage` | Singleton — hero, sections, featured | Denso pero plano (todo strings/text) |
| `aboutPage` | Singleton — hero, values | OK, pero podría tener body en Portable Text |
| `contactPage` | Singleton | Mínimo |
| `pricingPage` | Singleton | Mínimo |
| `project` | Documento múltiple — case studies | Bilingüe ES/EN, blocks tipados (text/quote/stats) — buena base |
| `service` | Documento múltiple | Bilingüe, deliverables, process steps |
| `siteSettings` | Singleton global | Muy completo |

### Lo que falta (oportunidades) ✗

1. **No existe `blockContent` (Portable Text)** — todo es `text` plano. Limita formato editorial: no se puede tener un párrafo con un link, una palabra en italic, un quote intercalado.
2. **No hay `seo` object reutilizable** — cada schema declara `seoDescription` aislado. Se duplica lógica.
3. **No hay schema `person`** — necesario para founder (E-E-A-T), eventuales colaboradores.
4. **No hay `image` object reutilizable con alt obligatorio + caption + crédito**.
5. **No hay `cta` object reutilizable** (label + link interno o externo).
6. **No hay `link` markDef** para Portable Text con referencias internas a otros docs.
7. **No hay `category` / `tag` taxonomy** para proyectos (facetado de "Brand", "Marketing", "Web").

---

## Principios aplicados (de content-modeling-best-practices)

| Principio | Aplicación concreta en Riverhaus |
|---|---|
| **Content is data, not pages** | Portable Text en project body → permite renderizar mismo contenido en web + RSS + AI export |
| **Single source of truth** | Tagline, nombre, contactos viven SOLO en `siteSettings`. Cada schema referencia, no duplica |
| **Future-proof** | Schema `seo` reutilizable → si mañana agregamos blog, ya tiene SEO |
| **Editor-centric** | Eyebrows con `description` claro en cada field, previews custom, agrupar fields por sección |

---

## Arquitectura propuesta — visión completa

### Tipos NUEVOS a crear

```
schemaTypes/
├── objects/                          ← reutilizables
│   ├── localizedString.ts            ← extraer helper actual `ls` a archivo propio
│   ├── localizedText.ts              ← extraer helper actual `lsText`
│   ├── localizedPortableText.ts      ← NUEVO · texto rico bilingüe
│   ├── blockContent.ts               ← NUEVO · Portable Text con styles del brand kit
│   ├── seo.ts                        ← NUEVO · object reutilizable
│   ├── image.ts                      ← NUEVO · image + alt obligatorio + caption + credit
│   ├── cta.ts                        ← NUEVO · button con link interno o externo
│   ├── link.ts                       ← NUEVO · markDef para Portable Text
│   ├── theme.ts                      ← NUEVO · 'light' | 'dark' selector
│   └── sectionMeta.ts                ← NUEVO · eyebrow + theme + spacing
│
├── documents/
│   ├── homePage.ts                   ← refactor — usar blockContent en secciones largas
│   ├── aboutPage.ts                  ← refactor — body en Portable Text
│   ├── contactPage.ts                ← + seo
│   ├── pricingPage.ts                ← refactor + FAQ block
│   ├── project.ts                    ← refactor — overview en Portable Text, theme override
│   ├── service.ts                    ← refactor — summary en Portable Text, FAQ
│   ├── person.ts                     ← NUEVO · founder + colaboradores
│   ├── category.ts                   ← NUEVO · taxonomy para proyectos
│   ├── faq.ts                        ← NUEVO · pregunta/respuesta reutilizable (AEO)
│   └── siteSettings.ts               ← + author ref + organization schema fields
│
└── index.ts                          ← exporta todo
```

---

## Detalle de los objects nuevos

### `seo.ts` (object reutilizable — clave para SEO/AEO)

```ts
import { defineType, defineField } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title (override)',
      type: 'string',
      description: 'Si lo dejas vacío, se usa el title de la página. Max 60 chars.',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'description',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: '120–160 caracteres. Aparece en Google y AI engines.',
      validation: (r) => r.min(50).max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image (1200×630)',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen para compartir en redes. Si lo dejas vacío, se usa la imagen default del sitio.',
    }),
    defineField({
      name: 'noIndex',
      title: 'No indexar',
      type: 'boolean',
      initialValue: false,
      description: 'Marca para que NO aparezca en Google.',
    }),
  ],
})
```

### `image.ts` (con alt obligatorio — anti-anti-pattern de instrument.com)

```ts
export const image = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text (obligatorio salvo decorativa)',
      type: 'string',
      validation: (r) => r.custom((alt, ctx) => {
        const isDecorative = (ctx.parent as any)?.decorative
        if (isDecorative) return true
        return alt ? true : 'Alt text requerido. Marca como decorativa si lo es.'
      }),
    }),
    defineField({
      name: 'decorative',
      title: 'Imagen decorativa (sin valor semántico)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({ name: 'caption', title: 'Caption (opcional)', type: 'string' }),
    defineField({ name: 'credit', title: 'Crédito (fotógrafo, fuente)', type: 'string' }),
  ],
})
```

### `cta.ts` (link interno o externo)

```ts
export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'localizedString' }),
    defineField({
      name: 'linkType',
      title: 'Tipo de link',
      type: 'string',
      options: { list: [
        { title: 'Interno (página de Sanity)', value: 'internal' },
        { title: 'Externo (URL)', value: 'external' },
      ], layout: 'radio' },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalRef',
      title: 'Página destino',
      type: 'reference',
      to: [{ type: 'homePage' }, { type: 'aboutPage' }, { type: 'project' }, { type: 'service' }, { type: 'contactPage' }, { type: 'pricingPage' }],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'URL externa',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
    }),
    defineField({
      name: 'variant',
      title: 'Estilo',
      type: 'string',
      options: { list: ['primary', 'secondary', 'ghost'] },
      initialValue: 'primary',
    }),
  ],
})
```

### `theme.ts` (selector por sección)

```ts
export const theme = defineType({
  name: 'theme',
  title: 'Theme',
  type: 'string',
  options: {
    list: [
      { title: 'Dark · Tinta (primario)', value: 'dark' },
      { title: 'Light · Cal Viva (editorial)', value: 'light' },
    ],
    layout: 'radio',
  },
  initialValue: 'dark', // v1.5: dark primario por defecto
})
```

### `person.ts` (founder + E-E-A-T)

```ts
export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'role', title: 'Rol', type: 'localizedString' }),
    defineField({ name: 'bio', title: 'Bio corta', type: 'localizedPortableText' }),
    defineField({ name: 'photo', title: 'Foto', type: 'imageWithAlt' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({
      name: 'sameAs',
      title: 'Perfiles externos (LinkedIn, X, Instagram)',
      type: 'array',
      of: [{ type: 'url' }],
      description: 'Para schema.org Person.sameAs (E-E-A-T)',
    }),
    defineField({
      name: 'jobTitle',
      title: 'Job title (schema.org)',
      type: 'string',
      description: 'Ej: "Founder & Strategy Director"',
    }),
  ],
})
```

### `faq.ts` (AEO — bloque pregunta/respuesta)

```ts
export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({ name: 'question', title: 'Pregunta', type: 'localizedString', validation: (r) => r.required() }),
    defineField({ name: 'answer', title: 'Respuesta', type: 'localizedPortableText' }),
    defineField({
      name: 'scope',
      title: 'Página(s) donde aplica',
      type: 'array',
      of: [{ type: 'string' }],
      options: { list: ['home', 'about', 'pricing', 'services', 'all'] },
    }),
  ],
  preview: { select: { title: 'question.es', subtitle: 'question.en' } },
})
```

### `category.ts` (taxonomy para projects — facetado)

```ts
export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título', type: 'localizedString' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.en' } }),
    defineField({ name: 'description', title: 'Descripción', type: 'localizedText' }),
  ],
})
```

Project gana: `defineField({ name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] })`

---

## Refactor de schemas existentes (cambios incrementales)

### `siteSettings.ts` — añadir (datos canónicos v1.5)

```ts
// Author de la organización (founder)
defineField({ name: 'siteAuthor', title: 'Founder/Author', type: 'reference', to: [{ type: 'person' }] }),

// SEO defaults
defineField({ name: 'defaultSeo', title: 'SEO defaults', type: 'seo' }),

// Identidad legal (datos canónicos · v1.5)
defineField({ name: 'legalName', title: 'Razón social', type: 'string', initialValue: 'Matías Cruzat' }),
defineField({ name: 'legalRut', title: 'RUT', type: 'string', initialValue: '15.097.893-9' }),
defineField({ name: 'primaryEmail', title: 'Email primario', type: 'string', initialValue: 'riverhaus.xyz@gmail.com' }),
defineField({ name: 'legalEmail', title: 'Email legal', type: 'string', initialValue: 'riverhaus@protonmail.com' }),
defineField({ name: 'whatsapp', title: 'WhatsApp comercial', type: 'string', initialValue: '+56 9 9233 9054' }),
defineField({ name: 'domain', title: 'Dominio', type: 'string', initialValue: 'riverhaus.xyz' }),

// Datos bancarios (para cotización + invoice template)
defineField({ name: 'bankName', title: 'Banco', type: 'string', initialValue: 'Bci · Banco Crédito e Inversiones' }),
defineField({ name: 'bankAccountType', title: 'Tipo de cuenta', type: 'string', initialValue: 'Cuenta Corriente' }),
defineField({ name: 'bankAccountNumber', title: 'Número de cuenta', type: 'string', initialValue: '7779 15097 893' }),

// Organization structured data (schema.org)
defineField({ name: 'orgFoundingDate', title: 'Año fundación', type: 'string', initialValue: '2024' }),
defineField({ name: 'orgCity', title: 'Ciudad', type: 'string', initialValue: 'Valdivia' }),
defineField({ name: 'orgRegion', title: 'Región', type: 'string', initialValue: 'Los Ríos' }),
defineField({ name: 'orgCountry', title: 'País (ISO 3166-1)', type: 'string', initialValue: 'CL' }),
defineField({ name: 'orgGeoLat', title: 'Latitud', type: 'number' }),
defineField({ name: 'orgGeoLng', title: 'Longitud', type: 'number' }),
defineField({ name: 'orgAreasServed', title: 'Mercados', type: 'array', of: [{ type: 'string' }], initialValue: ['CL', 'ES', 'GB', 'LATAM'] }),

// AI / robots policy
defineField({ name: 'allowAIBots', title: 'Permitir crawler de IA (GPT, Claude, Perplexity)', type: 'boolean', initialValue: true }),
```

### `project.ts` — refactor

- **Overview** (`lsText`) → cambiar a `localizedPortableText` (texto rico)
- **Blocks** existentes (textBlock, quoteBlock, statsBlock) → preservar tal cual + agregar `imageBlock`, `videoBlock`, `ctaBlock`
- **Añadir:** `theme` (light/dark override por proyecto), `categories` (ref array)
- **SEO:** reemplazar `seoDescription` plano por field `seo` (object completo)

### `service.ts` — refactor

- **Summary** plano → `localizedPortableText`
- **Añadir:** `faqs` (array de refs a `faq`)
- **SEO:** object completo

### `aboutPage.ts` — añadir

- **body** field: `localizedPortableText` (después del hero + valores, contenido editorial largo)
- **founder** ref a `person`

### `homePage.ts` — minimal refactor

Mantener la mayoría (es muy específico a la home actual), pero:
- Cada sección densa (filosofía, services intro, CTA) gana `theme` field
- `aboutBody` plano → `localizedPortableText` (acepta italic, links)

---

## Pattern: `localizedPortableText`

Sanity no tiene Portable Text bilingüe nativo. Patrón estándar:

```ts
export const localizedPortableText = defineType({
  name: 'localizedPortableText',
  title: 'Localized Portable Text',
  type: 'object',
  fields: [
    defineField({ name: 'en', title: 'English', type: 'blockContent' }),
    defineField({ name: 'es', title: 'Español', type: 'blockContent' }),
  ],
})
```

**Alternativa más escalable a futuro:** plugin `@sanity/document-internationalization` o `sanity-plugin-internationalized-array`. Para v1, el object simple es suficiente.

---

## Taxonomy strategy (de `references/taxonomy-classification.md`)

Para proyectos: **facetada (multi-axis)**, no jerárquica.

| Eje | Valores |
|---|---|
| `categories` | Brand · Strategy · Web · Identity · Campaign · Product |
| `industries` | Retail · B2B · Cultural · Gov · Media · Education |
| `markets` | Chile · LATAM · Europa · Internacional |

Tres referencias array, independientes. Permite filtrar `/work?category=brand&industry=cultural`.

---

## Decisión: reference vs embedding

| Caso | Decisión | Razón |
|---|---|---|
| Project ↔ Service | **Reference bidireccional implícita** (homePage.featuredServices + featuredProjects ya lo hacen) | Servicios y proyectos viven independientes |
| Project ↔ Category | **Reference** (multi) | Categoría se reusa entre múltiples projects |
| Person → Bio | **Embebido** (`localizedPortableText` campo en `person`) | Bio única por persona |
| Section blocks (textBlock, quoteBlock) | **Embebido** dentro de project.blocks array | Específicos al proyecto, no se reusan |
| FAQ items | **Reference** desde service o page | FAQs pueden aplicar a varias páginas |
| CTAs | **Embebido** (`cta` object inline en page sections) | Específicos a su contexto |

---

## Validaciones (a aplicar en cada schema)

| Field | Validación |
|---|---|
| `seo.title` | max 60 |
| `seo.description` | min 50, max 160 |
| `image.alt` | required salvo `decorative === true` |
| Page hero title | max 90 chars (3 líneas en display-xl) |
| Eyebrow | max 30 chars |
| `slug` | required, unique |
| Project `year` | match `/^\d{4}$/` |

---

## Preview improvements (editor experience)

Cada schema con `preview.select` configurado:

```ts
preview: {
  select: { title: 'title.es', subtitle: 'category.es', media: 'cover' },
  prepare: ({title, subtitle, media}) => ({
    title: title || 'Untitled',
    subtitle: subtitle ? `· ${subtitle}` : '',
    media,
  }),
}
```

Y `orderings` para listas:

```ts
orderings: [
  { title: 'Año (recientes primero)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  { title: 'Cliente A→Z', name: 'clientAsc', by: [{ field: 'client', direction: 'asc' }] },
]
```

---

## Output summary

13 archivos nuevos en `studio/schemaTypes/`. 7 schemas refactorizados. Net effect:

- ✓ Portable Text bilingüe disponible en todos los campos largos
- ✓ SEO reutilizable y validado
- ✓ Imágenes con alt obligatorio (anti-anti-pattern de instrument.com)
- ✓ Theme switcher por sección/página
- ✓ Person + FAQ → poder generar schema.org rico
- ✓ Taxonomy facetada para proyectos
- ✓ CTAs reutilizables (linkType interno/externo)

Próximo doc: `04-PORTABLE-TEXT-SETUP.md` — el detalle del `blockContent` y el renderer React.
