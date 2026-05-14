# SEO Route Protocol

> Defines what **page-architect** (and any other routing agent) must provide to
> **seo-and-meta** whenever a route is added, renamed, or removed.
>
> See also: [`ROUTE_OWNERS.md §5`](../ROUTE_OWNERS.md#5-adding-a-new-route)
>
> _Maintained by: **seo-and-meta** — WEB-19_

---

## 1. When to open a notification issue

Open a Paperclip issue tagged **`seo-and-meta`** in these situations:

| Event | Required? |
|---|---|
| New route added to `src/router.tsx` | **Yes — always** |
| Route path renamed (e.g. `/blog` → `/insights`) | **Yes** |
| Route deleted or replaced | **Yes** (sitemap + canonical cleanup needed) |
| Dynamic segment added or removed (e.g. `/:slug`) | **Yes** |
| Page content changes title / description significantly | Recommended |

---

## 2. Issue template

When opening the notification issue, copy this template into the description:

```
## SEO handoff — [route path]

**Route path:** `/example`  
**Page component:** `src/pages/Example.tsx`  
**Change type:** [ ] new  [ ] renamed (from: _____)  [ ] deleted  [ ] slug added/removed

### Required SEO fields

| Field | Value |
|---|---|
| `title` | e.g. "Our Work" |
| `description` | ≤ 155 chars — plain prose, no markdown |
| `type` | `website` \| `article` |
| `noindex` | `true` \| `false` (default: false) |
| `image` | OG image path under `/public/` or leave blank for default |

### JSON-LD hints (optional)

- Route is a case study / portfolio item → seo-and-meta will add `@type: CreativeWork`
- Route represents the organization → `@type: Organization` (home only)
- Any other structured data need? Describe it here.

### Notes

_Any additional context for the SEO agent._
```

---

## 3. Field constraints

### `title`
- **Max 60 characters** (rendered as `{title} — Liquid Glass Studio`).
- Use title case. No trailing punctuation.
- Must be unique across all routes.

### `description`
- **Max 155 characters** (hard limit — Google truncates at ~160).
- One sentence, active voice, no first-person.
- Must differ from the `title`.

### `image`
- Must be a static file committed under `public/` (e.g. `public/og-work.jpg`).
- Minimum size: **1200 × 630 px**, JPEG or PNG, ≤ 300 KB.
- If omitted, `og-default.jpg` is used automatically.

### `type`
- `website` for all standard pages.
- `article` only for blog-style or long-form content pages.

### `noindex`
- Set `true` for utility routes (`/login`, `/signup`, `/404`).
- Everything else defaults to `false` (indexed).

---

## 4. What seo-and-meta will do in response

After receiving the issue, seo-and-meta will:

1. Add `<Seo … />` at the top of the page component (or update existing props).
2. For case-study routes (`/work/:slug`): inject `@type: CreativeWork` JSON-LD.
3. For home (`/`): ensure `@type: Organization` JSON-LD is current.
4. Regenerate `public/sitemap.xml` to include / remove the route.
5. Verify `public/robots.txt` still points to the sitemap.
6. Run `npx tsc -b --pretty false` — zero errors before closing.
7. Comment on the issue with the commit hash and a view-source snippet.

---

## 5. seo-and-meta SLA

| Priority | Trigger | Target turnaround |
|---|---|---|
| High | Route goes live in same PR | Same heartbeat |
| Normal | Route exists but SEO is missing | Next heartbeat |
| Low | Copy refresh on existing route | Next available heartbeat |

---

## 6. Sitemap conventions

- All public, indexable routes appear in `public/sitemap.xml`.
- `changefreq`: `monthly` for static pages; `weekly` for dynamic slug pages.
- `priority`: `1.0` for `/`; `0.8` for primary nav routes; `0.6` for detail pages.
- `noindex: true` routes are **excluded** from the sitemap.

---

## 7. Quick-reference: current route SEO status

| Route | `<Seo>` present | noindex | sitemap |
|---|---|---|---|
| `/` | ✅ | false | ✅ |
| `/about` | ✅ | false | ✅ |
| `/services` | ✅ | false | ✅ |
| `/services/:slug` | ✅ | false | ✅ |
| `/work` | ✅ | false | ✅ |
| `/work/:slug` | ✅ | false | ✅ |
| `/pricing` | ✅ | false | ✅ |
| `/contact` | ✅ | false | ✅ |
| `/login` | ✅ | **true** | ❌ |
| `/signup` | ✅ | **true** | ❌ |
| `*` (404) | ✅ | **true** | ❌ |

_Last updated: 2026-04-28 — seo-and-meta (WEB-19)_
