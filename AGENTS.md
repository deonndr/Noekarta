# Noekarta — Agent Guidance

## Stack

- **Framework:** Vite + React 19 (JSX, no TypeScript)
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` in CSS — uses `@tailwindcss/vite` plugin, no PostCSS config)
- **Routing:** react-router-dom v7 (2 routes: `/` landing, `/landmark-explorer` map)
- **Maps:** react-leaflet + Leaflet (marker icons fixed manually in `LandmarkPage.jsx` line 10–25)
- **Smooth scroll:** Lenis — instance stored at `window.lenis` (set in `App.jsx`), used across `Hero.jsx` and `BetawiHeritage.jsx`
- **Icons:** lucide-react

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Vite) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint (`eslint.config.js` — flat config, JSX + browser globals) |

No test framework or typecheck step exists. No CI.

## Architecture

```
src/
├── main.jsx              — Entrypoint (mounts <App />)
├── App.jsx               — BrowserRouter + Lenis init
├── data/landmarks.js     — 20 Jakarta landmarks (named export)
├── components/           — Landing sections: Hero, About, History, BetawiHeritage, KulinerJakarta, LandmarkExplorer
│   └── ui/               — marquee-effect.jsx (dead code — exported but never imported)
├── pages/LandmarkPage.jsx — Full-page map explorer (own header, no Navbar)
├── routes/ features/ lib/ — Empty scaffolding directories
└── assets/               — Images imported as ES module defaults
```

- `navLinks` in `Navbar.jsx` are placeholder (4× "Beranda" all pointing to `#`).
- `history.jsx` is lowercase (only component with inconsistent casing).
- `src/lib/utils.js` is missing — `marquee-effect.jsx` imports `cn` from it (dead code, harmless).

## Conventions

- Default export for components, named export for `landmarks` array.
- Pure CSS animations for burger menu + mobile nav (defined in `index.css`).
- Images imported via ES module default imports (`import img from '../assets/foo.png'`).
- Poppins font loaded from Google Fonts in `index.html`; applied via `.font-poppins` class.
- Leaflet CSS loaded from unpkg CDN in `index.html`.
