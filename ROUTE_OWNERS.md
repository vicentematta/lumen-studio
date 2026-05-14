# ROUTE_OWNERS.md

> Ownership map for every route and source file in this repo.
> Before touching any file, check this table. If the file belongs to a different
> agent, open a Paperclip issue / handoff request — do not modify it directly.

---

## 1. Route ownership

| Route | Page component | Owner agent |
|---|---|---|
| `/` | `src/pages/Home.tsx` | **page-architect** |
| `/about` | `src/pages/About.tsx` | **page-architect** |
| `/services` | `src/pages/Services.tsx` | **services-detail-builder** |
| `/services/:slug` | `src/pages/ServiceDetail.tsx` | **services-detail-builder** |
| `/work` | `src/pages/Work.tsx` | **page-architect** |
| `/work/:slug` | `src/pages/WorkDetail.tsx` | **case-study-builder** |
| `/pricing` | `src/pages/Pricing.tsx` | **page-architect** |
| `/contact` | `src/pages/Contact.tsx` | **forms-and-auth** |
| `/login` | `src/pages/Auth.tsx` | **forms-and-auth** |
| `/signup` | `src/pages/Auth.tsx` | **forms-and-auth** |
| `*` (404) | `src/pages/NotFound.tsx` | **page-architect** |

---

## 2. Source file ownership

### Routing & layout shell
| File | Owner |
|---|---|
| `src/router.tsx` | **page-architect** |
| `src/components/RootLayout.tsx` | **page-architect** |
| `src/components/Navbar.tsx` | **page-architect** |
| `src/components/Footer.tsx` | **page-architect** |

### Design system
| File | Owner |
|---|---|
| `src/index.css` | **design-system-keeper** |
| `src/lib/motion.ts` | **design-system-keeper** |
| `tailwind.config.js` | **design-system-keeper** |
| `src/components/ui/*` | **design-system-keeper** |

### Data layer
| File | Owner |
|---|---|
| `src/data/projects.ts` — object structure & array order | **case-study-builder** |
| `src/data/projects.ts` — copy fields (`title`, `subtitle`, `overview`, `blocks[].body`, `quote`) | **content-writer** |
| `src/data/services.ts` | **services-detail-builder** |
| `src/lib/media.ts` | **case-study-builder** |

### Forms & auth
| File | Owner |
|---|---|
| `src/pages/Auth.tsx` | **forms-and-auth** |
| `src/pages/Contact.tsx` | **forms-and-auth** |

### SEO & meta
| File | Owner |
|---|---|
| `index.html` | **seo-and-meta** |
| `src/components/Seo.tsx` | **seo-and-meta** |
| `src/main.tsx` | **seo-and-meta** (HelmetProvider wrapper) |
| `public/robots.txt` | **seo-and-meta** |
| `public/sitemap.xml` | **seo-and-meta** |

### Internationalisation
| File | Owner |
|---|---|
| `src/locales/*` | **i18n-translator** |

### Media & assets
| File | Owner |
|---|---|
| `public/*` (images, videos) | **media-optimizer** |

### Tests
| File | Owner |
|---|---|
| `vitest.config.ts` | **test-author** |
| `playwright.config.ts` | **test-author** |
| `tests/unit/*` | **test-author** |
| `tests/e2e/*` | **test-author** |

### Build & deploy
| File | Owner |
|---|---|
| `vite.config.ts` | **deploy-engineer** |
| `Dockerfile` / CI config | **deploy-engineer** |

### Analytics
| File | Owner |
|---|---|
| `src/lib/analytics.ts` | **analytics-integrator** |

---

## 3. Handoff protocol

### When you need to touch a file outside your scope

1. **Do not modify the file directly.**
2. Open a Paperclip issue describing:
   - What change is needed and why.
   - Which agent owns the file (see table above).
   - Any constraints or context the owner needs.
3. Assign / ping the owner agent.
4. Wait for the owner to make the change, then continue your work.

### When another agent requests a handoff from you

1. Read the issue carefully.
2. Make the minimum change that satisfies the request — don't refactor beyond scope.
3. Verify with `npx tsc -b --pretty false` before closing the issue.
4. Comment on the issue with the commit hash once done.

---

## 4. Shared-file rules

Some files have dual ownership (e.g. `src/data/projects.ts`). For those:

- The **structural owner** (array shape, TS types) has veto power on schema changes.
- The **copy owner** may edit copy fields freely without a handoff, as long as
  the TypeScript types stay valid.
- If a copy edit requires a type change, the copy owner must open a handoff to
  the structural owner first.

---

## 5. Adding a new route

The agent who creates the route (always **page-architect**) must:

1. Add the entry to `src/router.tsx` in alphabetical path order.
2. Add the new row to Section 1 of this file with the correct owner.
3. Add any new source files to Section 2.
4. If the route enters the main nav: update `Navbar.tsx` following the existing
   `NavLink` + active-style pattern.
5. **Open a Paperclip issue tagged `seo-and-meta`** using the template in
   [`docs/SEO_ROUTE_PROTOCOL.md`](docs/SEO_ROUTE_PROTOCOL.md) so the SEO agent
   can add `<Seo>`, update the sitemap, and handle JSON-LD. Do not merge the
   route until this issue is filed.

---

## 6. Conflict resolution

If two agents both need to modify the same file simultaneously:

1. The agent who opened their issue **first** has priority.
2. The second agent waits for the first to merge, then rebases on top.
3. If priority is unclear, **page-architect** arbitrates for routing/layout
   files; **design-system-keeper** arbitrates for UI/token files.

---

## 7. Design Review Gate

**Applies to:** any issue that creates or modifies UI components, pages, or styles.  
**Does not apply to:** documentation-only issues (e.g. this file), data-layer changes, test files.

### Required steps before marking an issue `done`

1. Create a Paperclip subtask titled `Design Review: <component or page name>`.
2. Assign it to **design-system-keeper**.
3. Use the body template from [WEB-15](/WEB/issues/WEB-15#document-design-review-template).
4. **Do not close your issue** until design-system-keeper responds.

### design-system-keeper response

| Response | Meaning |
|---|---|
| Sets subtask → `done` | Approved — you may close your issue. |
| Sets subtask → `in_progress` + violation list | Changes required — fix violations, then repeat from step 1. |

### Checklist applied by design-system-keeper

- [ ] No hardcoded colors outside `white/{0.04, 0.06, 0.4, 0.6, 0.7}`
- [ ] `ease-glass` used — never `easeInOut`
- [ ] All buttons use `GlassButton` — no custom button elements
- [ ] Motion variants imported from `src/lib/motion.ts` — no local variant definitions
- [ ] `.liquid-glass` / `.liquid-glass-strong` CSS classes used — no inline `backdrop-filter`

---

_Last updated: 2026-04-28 — Design Review Gate added per WEB-16 comment (design-system-keeper)_
