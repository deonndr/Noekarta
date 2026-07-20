# Noekarta — Agent Guidance

## Stack

- **Framework:** Vite + React 19 (JSX, no TypeScript)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` via `@tailwindcss/vite` plugin, no PostCSS config)
- **Routing:** react-router-dom v7 — 6 routes (all pages lazy-loaded):
  | Path | Component |
  |------|-----------|
  | `/` | LandingPage (Navbar + Hero + About + History + BetawiHeritage + KulinerJakarta + LandmarkExplorer + NoeQuiz + Footer) |
  | `/landmark-explorer` | LandmarkPage |
  | `/apa-itu-jakarta` | ApaItuJakartaPage |
  | `/noequiz` | NoeQuizPage |
  | `/kuliner` | KulinerPage |
  | `/inventory` | InventoryPage |
- **Maps:** react-leaflet + Leaflet — `LandmarkMap.jsx` is a shared component (lazy-loaded by `LandmarkExplorer`), but `LandmarkPage.jsx` duplicates the same map code inline; both share identical `maxBounds={[[-6.3934, 106.6894], [-6.0831, 106.9734]]}` (Jakarta); marker icons use unpkg + GitHub raw URLs; `MapController` in `LandmarkPage` calls `map.invalidateSize()` before `flyTo`.
- **Smooth scroll:** Lenis — instance at `window.lenis` (set in `App.jsx`), GSAP ticker drives Lenis RAF.
- **Animation:** `motion` from `'motion/react'` (NOT `framer-motion`); GSAP + ScrollTrigger for `.gsap-section` fade-in; `useGSAP` from `@gsap/react` in `StreetViewPortal.jsx`.
- **Icons:** lucide-react
- **Fonts:** Poppins (Google Fonts) for body, Ancizar (custom serif) via `.font-ancizar`.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Vite) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint (flat config, `eslint.config.js`) |

No test framework or typecheck. No CI. Verify with `npm run lint && npm run build`.

## Architecture

```
src/
├── main.jsx                  — Entrypoint
├── App.jsx                   — BrowserRouter + Lenis init; renders LandingPage inline
├── index.css                 — @import "tailwindcss" + all custom keyframes/utilities
├── App.css                   — Empty (dead file)
├── data/
│   ├── landmarks.js          — named export `landmarks` (18 items, id gaps: 5,10 missing; img20→id 19)
│   ├── kuliner.js            — named export `allKulinerData` (11 items)
│   ├── jakarta.json          — GeoJSON polygon (Jakarta boundary)
│   └── jakartaMask.json      — GeoJSON FeatureCollection (map mask)
├── components/               — Landing page sections + shared UI
│   ├── LandmarkMap.jsx       — Shared map component (lazy-loaded by LandmarkExplorer)
│   ├── StreetViewPortal.jsx  — GSAP-animated street view overlay
│   ├── Seo.jsx               — Per-route meta tags helper
│   └── ui/marquee-effect.jsx — Dead code (never imported; uses `framer-motion` + `cn` from nonexistent `lib/utils`)
├── pages/                    — Route-level views (all lazy-imported in App.jsx)
│   ├── LandmarkPage.jsx      — Full-page map (inline map code, duplicated from LandmarkMap.jsx)
│   ├── ApaItuJakartaPage.jsx
│   ├── NoeQuizPage.jsx
│   ├── KulinerPage.jsx
│   └── InventoryPage.jsx
├── hooks/
│   └── useInventory.js       — Custom hook, localStorage key `noekarta_inventory`
├── routes/ features/ lib/    — Empty scaffolding directories
└── assets/                   — ~94 images imported as ES module defaults
```

## Conventions & quirks

- **Exports:** default for components, named for data arrays.
- **history.jsx** is the only lowercase component filename.
- **Navigation back:** `LandmarkPage` navigates with `navigate('/', { state: { scrollToLandmarkExplorer: true } })`; `LandmarkExplorer` reads via `useLocation()` + `scrollIntoView` + Lenis sync in `useLayoutEffect`.
- **Navbar:** `navLinks` array is placeholder — all entries point to `#` (no real nav yet).
- **GSAP scroll sections:** `App.jsx` wraps each content section in `<div className="gsap-section">`.
- **CSS:** Global scrollbar hidden (`scrollbar-width: none`) — modals needing scrollbars must override (e.g. `.betawi-modal-scroll` sets `scrollbar-width: thin`).
- **Assets:** Imported via ES module default imports. `Hero.jsx` uses `import.meta.glob('../assets/landmarkjakarta*.png', { eager: true })`.
- **Broken image fallback:** `LandmarkPage.jsx` uses `PLACEHOLDER_IMAGE` constant with `onError` handlers.
- **Leaflet CSS** loaded from unpkg CDN in `index.html`; Lenis CSS from `import 'lenis/dist/lenis.css'` in `App.jsx`.
- **Vercel:** `vercel.json` rewrites all paths to `/index.html` (SPA fallback).
