Build a dark, premium, single-page landing page for a luxury Latin America travel collective called "Austral" using React 18 + TypeScript + Vite 5 + Tailwind CSS v3.4 + shadcn/ui + Framer Motion 11 (motion/react) + React Router 6. The page has a cinematic editorial aesthetic — black backgrounds, cream/white text, liquid glass (glassmorphism) effects layered over fullscreen nature photography and video. The emotional register: soledad fértil, vast wilderness, privilege without ostentation. The glass aesthetic maps to the translucency, ethereal quality, and harmony with natural environments that define the Patagonia experience.

Reusar primitivas existentes del proyecto: GlassButton, GlassCard, Container, VideoBackground, PageHero, SectionHeading y motion variants de @/lib/motion.

---

## CONCEPTO

Austral is an invitation-only travel collective for the world's most discerning explorers of South America and Antarctica. Not a booking platform — a curation of the unreachable. The site speaks to those who have been everywhere and are looking for what comes next. Every section breathes: long scroll, cinematic photography, editorial copy with the restraint of a literary journal, and glass UI that floats like mist over glacial lakes.

---

## FONTS

Import from Google Fonts in index.html:

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
```

- Display / Headings: Instrument Serif (italic) — used via Tailwind class `font-heading`
- Body / UI: Barlow (weights 300, 400, 500, 600) — used via Tailwind class `font-body`
- Eyebrows: Barlow uppercase tracking-[0.3em] text-xs font-medium text-white/50

Tailwind config extends `fontFamily`:

```js
heading: ["'Instrument Serif'", "serif"],
body: ["'Barlow'", "sans-serif"],
```

---

## COLOR THEME (CSS custom properties, HSL format)

```css
:root {
  --background: 0 0% 0%;
  --foreground: 0 0% 100%;
  --card: 0 0% 5%;
  --card-foreground: 0 0% 100%;
  --primary: 0 0% 100%;
  --primary-foreground: 0 0% 0%;
  --secondary: 40 15% 85%;
  --secondary-foreground: 0 0% 0%;
  --muted: 0 0% 12%;
  --muted-foreground: 0 0% 100% / 0.5;
  --accent: 40 20% 88%;
  --accent-foreground: 0 0% 0%;
  --destructive: 0 84.2% 60.2%;
  --border: 0 0% 100% / 0.12;
  --input: 0 0% 100% / 0.1;
  --ring: 0 0% 100% / 0.25;
  --radius: 9999px;
  --glass-bg: rgba(255, 255, 255, 0.04);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-shadow: 0 4px 40px rgba(0, 0, 0, 0.12);
  --glass-blur: 20px;
}
```

---

## LIQUID GLASS CSS

Reference `src/index.css` — do NOT redefine. Use existing `.liquid-glass` and `.liquid-glass-strong` classes from the project.

- `.liquid-glass` — subtle glass for cards, nav pill, badges, destination cards
- `.liquid-glass-strong` — prominent glass for primary CTAs, featured highlights, newsletter form

The `::before` pseudo-element creates a gradient border effect using the mask-composite trick (thin glowing border that fades in the middle).

---

## ASSETS & MEDIA

### Videos (mark as placeholders — media-optimizer agent will source):

- `[VIDEO_HERO]` — Aerial drone footage: Patagonian lake (Lago San Martín), snow-capped Andes, estancia domes at golden hour. MP4 h264 + WebM vp9.
- `[VIDEO_DESTINATIONS]` — Ambient nature montage: Amazon river at dawn, salt flats Bolivia, Galápagos waves, Andean condors. Used in destinations interlude.
- `[VIDEO_CTA]` — Antarctic ice shelf under southern lights, slow pull-back. Used in newsletter/CTA section.

### Poster images (first-frame stills):
- `public/images/hero_poster.jpg` — aerial lake / mountains
- `public/images/destinations_poster.jpg` — montage still
- `public/images/cta_poster.jpg` — Antarctic still

### Destination photography (local `/public/images/` or Cloudfront):
- `[IMG_AMAZON]` — Aerial Amazon canopy at dawn
- `[IMG_CHILE]` — Torres del Paine granite towers, morning light
- `[IMG_GALAPAGOS]` — Marine iguana on black lava, turquoise water
- `[IMG_PERU]` — Machu Picchu above cloud layer, empty
- `[IMG_ARGENTINA]` — Estancia La Josefina dome exterior, Patagonian estepa
- `[IMG_CUBA]` — Habana Vieja golden afternoon light, empty street
- `[IMG_BOLIVIA]` — Salar de Uyuni mirror reflection at dawn

### Logo: `src/assets/logo.svg` — "AUSTRAL" in Barlow light uppercase, with a small southern-cross constellation mark (4 dots) preceding the wordmark.

---

## TIPO DE SITIO

Single-page scroll with React Router 6 (`createBrowserRouter`) for future expansion. All sections rendered in `App.tsx` as one scroll journey. Routes:
- `/` — Main landing (this document)
- `/destinations/:slug` — (scaffold only, leave as placeholder `<DestinationDetail />`)
- `/journal` — (scaffold only)

---

## SECTION-BY-SECTION BREAKDOWN

---

### 1. NAVBAR (fixed, floating)

- `position: fixed; top: 1rem; left: 0; right: 0; z-index: 50`
- Horizontal padding: `px-6 lg:px-16`
- Inner layout: `flex items-center justify-between`

**Left — Logo:**
- `src/assets/logo.svg` rendered as `<img className="h-8 w-auto" />`
- On mobile: only the southern-cross mark (icon-only SVG, h-7 w-7)

**Center (desktop only, `hidden lg:flex`):**
- Navigation links inside `.liquid-glass rounded-full px-1.5 py-1.5` pill container
- Links: "Destinations" | "Journeys" | "Field Notes" | "About" | "Impact"
- Each link: `px-4 py-2 text-sm font-body font-light text-white/70 hover:text-white transition-colors`
- Active link: `text-white`

**Right:**
- "Plan Your Journey" primary CTA: `.liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-body font-medium text-white flex items-center gap-2`
- ArrowUpRight icon from lucide-react (size 14)

---

### 2. HERO SECTION

- Container: `relative overflow-hidden` with fixed height `min-h-screen` (100dvh)
- Background video `[VIDEO_HERO]`:
  - `<video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0" poster="/images/hero_poster.jpg" />`
- Dark overlay: `absolute inset-0 bg-black/40 z-1`
- Bottom gradient fade: `absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-black to-transparent z-2 pointer-events-none`

**Content (`z-10`, `absolute bottom-0 left-0 right-0 pb-20 px-6 lg:px-16`):**
- Eyebrow badge: `.liquid-glass rounded-full px-4 py-1.5 mb-8 inline-flex items-center gap-2`
  - Inner dot: `w-1.5 h-1.5 rounded-full bg-white/60`
  - Text: `text-xs font-body font-medium tracking-[0.25em] uppercase text-white/80` — "South America · Antarctica · Beyond"
- Heading (BlurText component, word-by-word from bottom):
  - Text: `"Where the map runs out,\nwe begin."`
  - Classes: `text-5xl md:text-7xl lg:text-8xl font-heading italic text-white leading-[0.88] tracking-[-2px] max-w-3xl`
  - Animation: words stagger from `{filter: 'blur(12px)', opacity: 0, y: 40}` to `{filter: 'blur(0px)', opacity: 1, y: 0}`, delay 120ms per word
- Subtext (`motion.p`, delay 0.9s, blurIn):
  - "Tailor-made journeys across South America and Antarctica. Designed by specialists with decades on the ground — and a deep conviction that the best places remain just off the map."
  - Classes: `text-sm md:text-base text-white/60 font-body font-light leading-relaxed max-w-md mt-6`
- CTA row (`motion.div`, delay 1.2s, `flex items-center gap-4 mt-8`):
  - "Start Planning" — `.liquid-glass-strong rounded-full px-6 py-3 text-sm font-body font-medium text-white flex items-center gap-2` + ArrowUpRight icon
  - "View Destinations" — `text-white/60 hover:text-white text-sm font-body font-light flex items-center gap-1.5 transition-colors` + ChevronDown icon

---

### 3. CREDENTIALS STRIP (horizontal scroll, between hero and intro)

- `bg-black py-8 overflow-hidden`
- Infinite horizontal ticker: two copies of the list concatenated, `animate-marquee` via Tailwind keyframe
- Items (separated by `·` in text-white/20): "The Times" · "Condé Nast Traveller" · "National Geographic" · "Financial Times" · "AFAR" · "Monocle" · "Travel + Leisure"
- Item classes: `text-xs font-body font-light tracking-[0.25em] uppercase text-white/40 whitespace-nowrap`

Tailwind keyframe (add to `tailwind.config.js`):
```js
keyframes: {
  marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } }
},
animation: { marquee: 'marquee 30s linear infinite' }
```

---

### 4. MANIFESTO / INTRO EDITORIAL

- `bg-black py-28 lg:py-40`
- Container: `max-w-3xl mx-auto px-6 lg:px-0 text-center`
- Eyebrow: `text-xs font-body tracking-[0.3em] uppercase text-white/40 mb-8` — "Why Austral"
- Heading (`motion.div`, inViewProps stagger):
  - "Twenty years of opening doors that don't appear on any itinerary."
  - Classes: `text-3xl md:text-4xl lg:text-5xl font-heading italic text-white leading-[1.0] mb-10`
- Body (AnimatedParagraph — scroll-linked character opacity, same as Prisma reference):
  - "We built Austral on a single conviction: that the most meaningful journeys happen when someone who genuinely knows the land — not a brochure, not a platform — arranges every detail. We have walked the estancias, navigated the rivers, and earned trust with the families and conservationists who guard the places worth protecting."
  - Classes: `text-base md:text-lg text-white/60 font-body font-light leading-loose`
  - Each character wrapped in `AnimatedLetter`, scroll-linked opacity 0.15→1, staggered `charProgress = index / totalChars`

---

### 5. DESTINATIONS GRID

- `bg-black py-20 lg:py-32`
- Section header (centered):
  - Eyebrow: `text-xs font-body tracking-[0.3em] uppercase text-white/40 mb-4` — "Where We Go"
  - Heading: `text-4xl md:text-5xl font-heading italic text-white mb-16` — "Seven continents of possibility. We've chosen one."
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-6xl mx-auto px-6`
- **Argentina card (featured — spans 2 cols on lg):** `lg:col-span-2 lg:row-span-2`

**Each destination card:**
- Container: `relative rounded-2xl overflow-hidden group cursor-pointer` + height `h-72 md:h-80 lg:h-full` (featured: `lg:h-[560px]`)
- Background: `<img>` with `object-cover w-full h-full transition-transform duration-700 group-hover:scale-105`
- Overlay: `absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent`
- Glass hover badge (appears on hover): `absolute top-4 right-4 .liquid-glass rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0`
  - Text: `text-xs font-body text-white/90` — "Explore →"
- Card content (`absolute bottom-0 left-0 right-0 p-6`):
  - Country eyebrow: `text-[10px] font-body tracking-[0.25em] uppercase text-white/50 mb-1`
  - Destination name: `text-xl md:text-2xl font-heading italic text-white leading-tight`
  - Short descriptor: `text-xs font-body text-white/60 mt-1 font-light`

**Destinations data:**
```
{ slug: 'argentina', country: 'Argentina', name: 'Patagonia', desc: 'Glaciers, estancias, end-of-world roads', img: '[IMG_ARGENTINA]', featured: true }
{ slug: 'chile', country: 'Chile', name: 'Patagonia & Atacama', desc: 'Granite towers and salt horizons', img: '[IMG_CHILE]' }
{ slug: 'peru', country: 'Peru', name: 'Inca Highlands', desc: 'Ancient citadels above the clouds', img: '[IMG_PERU]' }
{ slug: 'galapagos', country: 'Ecuador', name: 'Galápagos', desc: 'Wildlife that has never learned fear', img: '[IMG_GALAPAGOS]' }
{ slug: 'amazon', country: 'Brazil', name: 'Amazon Basin', desc: 'The lung of the world, by private boat', img: '[IMG_AMAZON]' }
{ slug: 'bolivia', country: 'Bolivia', name: 'Altiplano', desc: 'Salt flats, sky mirrors, silence', img: '[IMG_BOLIVIA]' }
{ slug: 'cuba', country: 'Cuba', name: 'Habana', desc: 'Decaying beauty, irreplaceable rhythm', img: '[IMG_CUBA]' }
```

Card entrance animations: `motion.div` with stagger 0.08s, `scale: 0.97, opacity: 0` → `scale: 1, opacity: 1`, triggered by `useInView` once with `margin: "-80px"`, custom ease `[0.22, 1, 0.36, 1]`.

---

### 6. PROPERTY SPOTLIGHT — ESTANCIA LA JOSEFINA (Featured Journey)

- `bg-black py-20 lg:py-32`
- Full-width section with `max-w-6xl mx-auto px-6`
- Layout: two-column on desktop `grid lg:grid-cols-2 gap-12 lg:gap-20 items-center`

**Left column (text):**
- Eyebrow: `text-xs font-body tracking-[0.3em] uppercase text-white/40 mb-6` — "Featured Journey · Argentina"
- Heading (`motion.div` blurIn, delay 0.2s):
  - "Estancia La Josefina"
  - Classes: `text-4xl md:text-5xl lg:text-6xl font-heading italic text-white leading-[0.9] mb-4`
- Location line: `text-sm font-body text-white/50 font-light flex items-center gap-2 mb-8`
  - MapPin icon (size 14) + "Lago San Martín · Patagonia, Argentina"
- Body: `text-base text-white/60 font-body font-light leading-loose mb-8`
  - "Three dome rooms on the edge of a glacial lake, 216 kilometres from the nearest town. Solar-powered, off-grid, unreachable by mobile signal. Days here are measured in condor sightings and lake-caught trout on a wooden stove — not notifications."
- "What we love" list (the PSA `What We Love` pattern, glass-styled):
  - Container: `.liquid-glass rounded-2xl p-6 space-y-4`
  - Each item: `flex items-start gap-3`
    - Dot: `mt-1.5 w-1 h-1 rounded-full bg-white/40 flex-shrink-0`
    - Text: `text-sm font-body text-white/70 font-light`
  - Items: "Off-grid energy — solar, wind and wood" · "Horseback rides into uninhabited valleys" · "Boat crossings to the Chilean border" · "Capacity: 12 guests maximum, always" · "Season: December through February"
- CTA: `.liquid-glass-strong rounded-full px-6 py-3 text-sm font-body font-medium text-white inline-flex items-center gap-2 mt-6` — "Plan This Journey" + ArrowUpRight

**Right column (image stack):**
- Stacked overlapping images with depth:
  - Primary: `rounded-2xl overflow-hidden h-[480px] w-full object-cover` — `[IMG_ARGENTINA]`
  - Floating badge (overlapping bottom-left of image):
    `.liquid-glass rounded-xl p-4 absolute -bottom-6 -left-6 min-w-[180px]`
    - Label: `text-[10px] font-body tracking-[0.2em] uppercase text-white/50 mb-1` — "Best season"
    - Value: `text-sm font-heading italic text-white` — "Dec — Feb"

---

### 7. INTERLUDE VIDEO SECTION ("The Distance Is The Point")

- Full-width, `min-h-[600px] relative overflow-hidden`
- Background video `[VIDEO_DESTINATIONS]`:
  - `absolute inset-0 w-full h-full object-cover opacity-50`
- Top + bottom gradient fades (200px, `bg-gradient-to-b/t from-black to-transparent`)
- Content (`z-10 relative flex flex-col items-center justify-center min-h-[600px] text-center px-6`):
  - Stat row (`.liquid-glass rounded-2xl p-8 inline-flex gap-12 lg:gap-20 mb-12`):
    - 4 stats in `flex flex-col items-center`:
      - "20+" / "Years on the ground" — value: `text-4xl md:text-5xl font-heading italic text-white`, label: `text-xs font-body text-white/50 font-light mt-1`
      - "340+" / "Properties visited"
      - "7" / "Countries curated"
      - "100%" / "Bespoke itineraries"
  - Heading: `text-3xl md:text-5xl font-heading italic text-white/90 mt-4` — "The distance is the point."
  - Subtext: `text-sm text-white/50 font-body font-light mt-4 max-w-sm` — "Remote is not a risk. It's the criteria."

---

### 8. RESPONSIBLE TRAVEL / IMPACT

- `bg-black py-20 lg:py-32`
- Layout: `max-w-5xl mx-auto px-6`
- Two-column `grid lg:grid-cols-2 gap-16 items-start`

**Left (text):**
- Eyebrow: `text-xs font-body tracking-[0.3em] uppercase text-white/40 mb-6` — "Impact · 2024–2025 Report"
- Heading: `text-3xl md:text-4xl font-heading italic text-white leading-[1.0] mb-6`
  - "We only take you where we'd be proud to leave behind."
- Body: `text-sm text-white/60 font-body font-light leading-loose`
  - "Every journey we design contributes directly to the conservation funds and community foundations that protect the places we love. Our 2024–2025 report is available to all past travellers."
- CTA (text-only): `text-sm font-body text-white/60 hover:text-white transition-colors mt-6 inline-flex items-center gap-2` — "Read the report" + ArrowUpRight (size 14)

**Right (impact cards — vertical stack):**
Three `.liquid-glass rounded-xl p-5` cards with `space-y-3`:
- Card 1: Foundation badge + "Patagonia Sur Foundation — habitat corridor protection, 12,000 ha"
- Card 2: Foundation badge + "Amazon Conservation Association — 3 research stations supported"
- Card 3: Foundation badge + "Sea Shepherd Antarctic Program — monitoring partnership"
- Each: icon `Leaf` (lucide, size 16, text-white/40) + `text-sm font-body text-white/70 font-light`

---

### 9. FIELD NOTES (Journal)

- `bg-black py-20 lg:py-32`
- Section header:
  - Eyebrow: `text-xs font-body tracking-[0.3em] uppercase text-white/40 mb-4` — "Field Notes"
  - Heading: `text-3xl md:text-4xl font-heading italic text-white mb-4` — "Notes from the places we know."
  - Subtext: `text-sm text-white/50 font-body font-light mb-12` — "First-hand dispatches. No sponsored content. No lists of 'must-sees'."
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6`

**Each article card:**
- Container: `group cursor-pointer`
- Image wrapper: `rounded-2xl overflow-hidden h-56 mb-5 relative`
  - `<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />`
  - Overlay on hover: `absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity`
- Category: `text-[10px] font-body tracking-[0.2em] uppercase text-white/40 mb-2`
- Title: `text-lg font-heading italic text-white leading-tight mb-2 group-hover:text-white/80 transition-colors`
- Excerpt: `text-xs font-body text-white/50 font-light leading-relaxed`
- "Read more": `text-xs font-body text-white/40 hover:text-white/80 transition-colors mt-3 inline-flex items-center gap-1` + ArrowUpRight (size 12)

**Articles data:**
```
{ category: 'Patagonia', title: 'Remote Routes: Four Road Trips Across Chile and Argentina', excerpt: 'Four thousand kilometres of unpaved road, one border crossing, and a Michelin-starred cook at the end of it.', img: '[IMG_CHILE]' }
{ category: 'Antarctica', title: 'The Last Continent Has No Off-Season, Only Wrong Gear', excerpt: 'A dispatch from the Weddell Sea, aboard a vessel that has never carried more than twelve passengers.', img: '[IMG_ARGENTINA]' }
{ category: 'Galápagos', title: 'What the Iguana Knows That the Tourist Doesn\'t', excerpt: 'On slowing down, on staying longer, and on the only wildlife encounter that changes you permanently.', img: '[IMG_GALAPAGOS]' }
```

---

### 10. NEWSLETTER / CTA SECTION

- Full-width `relative overflow-hidden min-h-[600px]`
- Background video `[VIDEO_CTA]`:
  - `absolute inset-0 w-full h-full object-cover opacity-40`
- Top gradient fade: `absolute top-0 h-48 bg-gradient-to-b from-black to-transparent pointer-events-none`
- Bottom: `absolute bottom-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none`
- Content (`z-10 relative flex flex-col items-center justify-center min-h-[600px] text-center px-6`):
  - Eyebrow: `text-xs font-body tracking-[0.3em] uppercase text-white/40 mb-6` — "The Inside Track"
  - Heading: `text-4xl md:text-6xl lg:text-7xl font-heading italic text-white leading-[0.88] mb-6 max-w-2xl`
    - "The world's best journeys don't appear in search results."
  - Subtext: `text-sm text-white/60 font-body font-light mb-10 max-w-sm`
    - "Our dispatches: one per month, never more. Field reports, exclusive access, and the properties we don't publish anywhere else."
  - Form (`.liquid-glass rounded-full p-1.5 flex items-center gap-2 max-w-sm w-full`):
    - `<input type="email" placeholder="your@email.com" className=".input-glass flex-1 bg-transparent text-sm font-body font-light text-white placeholder:text-white/30 focus:outline-none px-4" />`
    - Submit button: `.liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-body font-medium text-white whitespace-nowrap` — "Join"
  - Disclaimer: `text-[10px] font-body text-white/30 mt-4` — "No spam. Unsubscribe in one click. GDPR compliant."

---

### 11. FOOTER

- `bg-black pt-20 pb-10 border-t border-white/5`
- `max-w-6xl mx-auto px-6`
- Top row (`flex flex-col lg:flex-row justify-between gap-12 mb-16`):

**Left — Brand:**
- Logo `<img className="h-8 w-auto mb-4" />`
- Tagline: `text-sm font-body font-light text-white/40 max-w-xs leading-relaxed`
  - "Invitation-only travel collection. South America · Antarctica."

**Center — Nav columns (`hidden lg:flex gap-20`):**
- Column "Destinations": Argentina · Chile · Peru · Galápagos · Amazon · Bolivia · Cuba
- Column "Studio": About · Impact · Field Notes · Partnerships
- Column "Plan": Start Planning · Contact · Private Enquiries
- Links: `text-sm font-body font-light text-white/40 hover:text-white/70 transition-colors`
- Column headers: `text-[10px] font-body tracking-[0.25em] uppercase text-white/25 mb-4`

**Right — Contact:**
- `text-sm font-body font-light text-white/40`
- "hello@austral.travel"
- "Buenos Aires · London · New York"

**Bottom row (`border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4`):**
- Left: `text-xs font-body text-white/25` — "© 2026 Austral. All rights reserved."
- Right: Privacy · Terms · Responsible Travel — `text-xs font-body text-white/25 hover:text-white/50 transition-colors gap-6 flex`

---

## KEY DEPENDENCIES

```json
{
  "motion": "^12.35.0",
  "lucide-react": "^0.462.0",
  "react-router-dom": "^6.30.1"
}
```

Icons used from `lucide-react`: `ArrowUpRight`, `ChevronDown`, `MapPin`, `Leaf`, `Play`

No HLS.js needed — videos served as MP4/WebM direct (media-optimizer handles encoding).

---

## OVERALL PAGE STRUCTURE (JSX tree)

```jsx
<div className="bg-black">
  <Navbar />                  {/* fixed floating, z-50 */}

  <main>
    <HeroSection />           {/* [VIDEO_HERO], min-h-screen */}
    <CredentialsStrip />      {/* marquee press logos */}

    <div className="bg-black">
      <ManifestoSection />    {/* editorial intro, scroll-linked text */}
      <DestinationsGrid />    {/* 7-card grid with featured Argentina */}
      <JosefinaSpotlight />   {/* 2-col: text + image stack */}
      <InterludeVideo />      {/* [VIDEO_DESTINATIONS], stats + headline */}
      <ImpactSection />       {/* 2-col: copy + impact cards */}
      <FieldNotes />          {/* 3-card journal grid */}
      <NewsletterCta />       {/* [VIDEO_CTA], email form */}
    </div>
  </main>

  <Footer />
</div>
```

---

## ANIMATION PATTERNS

1. **BlurText** (hero heading): Word-by-word stagger from bottom with gaussian blur dissolve. Each word: `{filter: 'blur(12px)', opacity: 0, y: 40}` → `{filter: 'blur(0px)', opacity: 1, y: 0}`. Stagger 120ms. IntersectionObserver triggered.

2. **blurIn** (subtext, CTAs): `motion.p/div` with `{filter: 'blur(10px)', opacity: 0, y: 20}` → `{filter: 'blur(0px)', opacity: 1, y: 0}`. Duration 0.7s, custom ease `[0.22, 1, 0.36, 1]`. Delays: subtext 0.9s, CTA 1.2s.

3. **AnimatedLetter** (manifesto body): Each character individually wrapped. `useScroll` with target, scroll-linked `opacity` 0.15→1 per character. `charProgress = index / totalChars`, range `[charProgress - 0.08, charProgress + 0.04]`.

4. **Card stagger** (destinations, journal, impact): `motion.div` scale `0.97→1`, opacity `0→1`, staggered 0.07s, triggered by `useInView(once, margin: "-60px")`.

5. **Image scale on hover**: Tailwind `group-hover:scale-105 transition-transform duration-700` on `<img>` inside `.group` container.

6. **Marquee** (credentials): Pure CSS infinite scroll via `@keyframes marquee` in Tailwind config. No JS.

7. **All video backgrounds**: `autoPlay loop muted playsInline` with top/bottom `bg-gradient-to-b/t from-black to-transparent` fades (h-48 to h-80 depending on section). `pointer-events-none z-1`.

---

## DESIGN PATTERNS USED THROUGHOUT

- **Every section eyebrow**: `text-xs font-body tracking-[0.3em] uppercase text-white/40` — no badge pill in editorial sections; `.liquid-glass rounded-full px-4 py-1` pill only in hero and video sections.
- **Every section heading**: `font-heading italic text-white leading-[0.9]` — size varies by section importance.
- **Every body text**: `text-white/60 font-body font-light leading-loose` (editorial) or `text-white/50` (secondary/meta).
- **Primary CTA**: `.liquid-glass-strong rounded-full` + ArrowUpRight icon.
- **Secondary CTA**: text-only with icon, `text-white/60 hover:text-white transition-colors`.
- **Card containers**: `.liquid-glass rounded-2xl` — no hard borders, no box-shadows outside the glass system.
- **Video overlays**: Always `bg-black/X` + `bg-gradient-to-t/b from-black to-transparent` with `pointer-events-none`.
- **Image cards (destinations, journal)**: `overflow-hidden rounded-2xl group` with `img group-hover:scale-105 transition-transform duration-700` — no glass on the image itself.
- **Data-rich glass panels** (stats interlude, josefina badge): `.liquid-glass rounded-2xl p-6 lg:p-8` — glass used for panels that overlay photography.
- **No corporate colors, no solid borders, no box-shadows outside glass system.**
