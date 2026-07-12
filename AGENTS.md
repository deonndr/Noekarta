# Noekarta — Agent Guidance

## Stack

- **Framework:** Vite + React 19 (JSX, no TypeScript)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` — `@tailwindcss/vite` plugin, no PostCSS config)
- **Routing:** react-router-dom v7 (2 routes: `/` landing, `/landmark-explorer` map)
- **Maps:** react-leaflet + Leaflet (marker icons use unpkg + GitHub raw URLs; `delete L.Icon.Default.prototype._getIconUrl` fix duplicated in both `LandmarkExplorer.jsx` and `LandmarkPage.jsx`)
- **Smooth scroll:** Lenis — instance at `window.lenis` (set in `App.jsx`), used in `Hero.jsx` and `BetawiHeritage.jsx`
- **Animation:** `motion` from `'motion/react'` (NOT `framer-motion`) — used in `About.jsx`, `BetawiHeritage.jsx`, `KulinerJakarta.jsx`, and `history.jsx`
- **Icons:** lucide-react
- **GSAP** (`gsap` + `@gsap/react`) — used only in `StreetViewPortal.jsx` for entry/exit animations

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
- **Leaflet icon fix** (`delete L.Icon.Default.prototype._getIconUrl` + `redIcon` + `MapController`) is copy-pasted in both `LandmarkExplorer.jsx` and `LandmarkPage.jsx`. The `LandmarkPage` `MapController` additionally calls `map.invalidateSize()` before `flyTo`.
- **Navbar:** `navLinks` array is placeholder — 4 identical entries with label `"Beranda"` all pointing to `#`.
- **history.jsx** is the only lowercase-named component; imports `hero-title*.png` as `title1`–`title6`.
- **CSS:** Pure CSS keyframes for burger menu + mobile nav (`index.css`) and Hero floating card SVGs.
- **Assets:** Images imported via ES module default imports (`import img from '../assets/foo.png'`). `Hero.jsx` loads landmark images via `import.meta.glob('../assets/landmarkjakarta*.png', { eager: true })`.
- **Fonts:** Poppins from Google Fonts. Leaflet CSS from unpkg CDN. Lenis CSS imported in `App.jsx` via `import 'lenis/dist/lenis.css'`.
- **Vercel:** `vercel.json` rewrites all paths to `/index.html` (SPA fallback).
