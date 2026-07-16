# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React app for Noekarta. Source files live at the repository root:

- `main.jsx` and `App.jsx` define the entrypoint, routing, Lenis scrolling, and landing page.
- `components/` contains landing sections such as `Hero.jsx`, `About.jsx`, `BetawiHeritage.jsx`, `KulinerJakarta.jsx`, `NoeQuiz.jsx`, and `LandmarkExplorer.jsx`.
- `pages/` contains route views, including the map explorer in `LandmarkPage.jsx`.
- `data/` stores structured app data, including `landmarks.js` and Jakarta GeoJSON files.
- `assets/` stores imported images and SVGs. Import assets as ES module defaults, for example `import hero from './assets/hero.png'`.

There is no dedicated test directory at present.

## Build, Test, and Development Commands

Use the standard npm scripts:

- `npm run dev` starts the local Vite development server.
- `npm run build` creates the production build in `dist/`.
- `npm run preview` serves the build locally.
- `npm run lint` runs ESLint using the flat config.

No test command or test framework is currently configured.

## Coding Style & Naming Conventions

Write JSX functional components with default exports. Use PascalCase for component files (`Navbar.jsx`, `LandmarkPage.jsx`); preserve existing lowercase files such as `history.jsx` unless renaming deliberately across imports. Keep data modules as named exports where already established, such as `export const landmarks`.

Use Tailwind CSS v4 utilities, with shared custom CSS in `index.css` for global behavior, carousel classes, and keyframes. Use `motion` from `motion/react`, not `framer-motion`. Prefer `lucide-react` icons for controls.

## Testing Guidelines

Because no test framework is installed, verify changes with `npm run lint` and `npm run build`. For visual or interaction changes, run `npm run dev` and check affected routes manually, especially `/` and `/landmark-explorer`. Map changes should confirm Leaflet bounds remain constrained to Jakarta.

## Commit & Pull Request Guidelines

Recent commits use Conventional Commit-style prefixes, for example `feat: add noequiz section`, `fix: fix curve card in hero section`, and `style(ui): update global styles`. Follow that pattern: `feat:`, `fix:`, `style(scope):`, or another clear type.

Pull requests should include a short summary, affected routes or components, verification steps, and screenshots for UI changes. Link related issues when available and call out new assets, map behavior changes, or dependency updates.

## Architecture Notes

Routing uses `react-router-dom` with landing and landmark explorer routes. Smooth scrolling is managed by Lenis through `window.lenis`, with GSAP driving scroll-triggered section animations. Leaflet map setup is duplicated between explorer components; keep behavior aligned when changing markers, bounds, or map controllers.
