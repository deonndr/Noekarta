# Noekarta — Agent Guidance

## Stack

- **Framework:** Vite + React 19 (JSX, no TypeScript)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` — `@tailwindcss/vite` plugin, no PostCSS config)
- **Routing:** react-router-dom v7 (2 routes: `/` landing, `/landmark-explorer` map)
- **Maps:** react-leaflet + Leaflet — both maps share identical `maxBounds={[[-6.3934, 106.6894], [-6.0831, 106.9734]]}` constraining the view to Jakarta area; marker icons use unpkg + GitHub raw URLs; `delete L.Icon.Default.prototype._getIconUrl` + `redIcon` + `MapController` copy-pasted in both `LandmarkExplorer.jsx` and `LandmarkPage.jsx`; the `LandmarkPage` `MapController` additionally calls `map.invalidateSize()` before `flyTo`.
- **Smooth scroll:** Lenis — instance at `window.lenis` (set in `App.jsx`), GSAP ticker drives Lenis RAF; `data-lenis-prevent="true"` on Betawi modal overlay to prevent background scroll interference.
- **Animation:** `motion` from `'motion/react'` (NOT `framer-motion`) — used in `About.jsx`, `BetawiHeritage.jsx`, `KulinerJakarta.jsx`, and `history.jsx`.
- **Icons:** lucide-react
- **GSAP** — `gsap` + `ScrollTrigger` in `App.jsx` (scroll-triggered section fade-in on `.gsap-section`); `gsap` + `useGSAP` from `@gsap/react` in `StreetViewPortal.jsx` (entry/exit animations).
- **Fonts:** Poppins (Google Fonts) for body, Ancizar (custom serif) via `.font-ancizar` class used in Hero, history, BetawiHeritage, KulinerJakarta.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Vite) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint (flat config, `eslint.config.js`) |

No test framework or typecheck step exists. No CI.

## Architecture

```
src/
├── main.jsx              — Entrypoint
├── App.jsx               — BrowserRouter + Lenis init; renders LandingPage (Navbar, Hero, About, History, BetawiHeritage, KulinerJakarta, LandmarkExplorer)
├── data/
│   ├── landmarks.js      — named export `landmarks` (18 items, id gaps: 5, 10 missing; img20→id 19)
│   ├── jakarta.json      — GeoJSON polygon (Jakarta boundary)
│   └── jakartaMask.json  — GeoJSON FeatureCollection (map mask)
├── components/           — Landing page sections + Navbar + StreetViewPortal
│   └── ui/marquee-effect.jsx — Dead code (never imported; uses `framer-motion` + `@motionone/utils` — not installed; imports `cn` from `../../lib/utils` — doesn't exist)
├── pages/LandmarkPage.jsx — Full-page map explorer (own header, no Navbar)
├── routes/ features/ lib/ — Empty scaffolding; `src/lib/utils.js` does not exist
└── assets/               — ~67 images imported as ES module defaults
```

## Conventions & quirks

- **Exports:** default export for components, named export for `landmarks` array.
- **Navigation back:** `LandmarkPage` navigates with `navigate('/', { state: { scrollToLandmarkExplorer: true } })`; `LandmarkExplorer` reads via `useLocation()` + `scrollIntoView` + Lenis sync in `useLayoutEffect`.
- **Navbar:** `navLinks` array is placeholder — `'Beranda'`, `'Tentang Jakarta'`, `'Beranda'`, `'Beranda'` all pointing to `#`.
- **GSAP scroll sections:** `App.jsx` wraps each content section in `<div className="gsap-section">` for GSAP ScrollTrigger opacity/y animations.
- **history.jsx** is the only lowercase-named component; imports `hero-title*.png` as `title1`–`title6`.
- **CSS:** Global scrollbar hidden (`html, body { scrollbar-width: none }`) — modals needing scrollbars must override (e.g. `.betawi-modal-scroll` sets `scrollbar-width: thin`); Hero arc coverflow carousel uses custom CSS classes (`.arc-carousel`, `.arc-card`, `.arc-card--active`) defined in `index.css`; floating card keyframes (`float-card-1` through `float-card-4`) also live there.
- **Assets:** Images imported via ES module default imports (`import img from '../assets/foo.png'`). `Hero.jsx` loads landmark images via `import.meta.glob('../assets/landmarkjakarta*.png', { eager: true })`.
- **Broken image fallback:** `LandmarkPage.jsx` uses a `PLACEHOLDER_IMAGE` constant with `onError` handlers on all `<img>` tags pointing to landmark images.
- **Leaflet CSS** loaded from unpkg CDN in `index.html`; Lenis CSS imported via `import 'lenis/dist/lenis.css'` in `App.jsx`.
- **Vercel:** `vercel.json` rewrites all paths to `/index.html` (SPA fallback).
