# Fieldwork — Architecture Studio Website

## Overview
A single-page architecture firm website template, originally designed in Figma and converted to React + Tailwind CSS v4.

## Tech Stack
- **React 19** + **Vite 7**
- **Tailwind CSS v4** (via `@tailwindcss/vite` plugin)
- **Lenis** for smooth/inertial scrolling (initialized in `main.jsx` with `requestAnimationFrame` loop)
- **Satoshi** font (loaded via Fontshare CDN)

## Repository
- **GitHub:** https://github.com/chowwingho/fieldwork-site
- **Branch:** `main`

## Project Structure
```
src/
  main.jsx              # Entry point
  App.jsx               # Root component
  index.css             # Tailwind import
  FieldworkTemplate.jsx # Full page template (all sections)
```

## Design Tokens
- **Background:** `#FAF9F6` (warm off-white)
- **Primary text:** `#262625`
- **Muted text:** `#262625` at 60% opacity
- **Borders:** `#262625` at 12% opacity
- **Footer:** `#262625` bg with white text
- **Font:** Satoshi (weights 400, 500, 700)

## Layout
- All sections use a `max-w-[1280px] mx-auto px-12` inner container to constrain content width
- Background colors remain full-width on the outer `<section>`/`<footer>` elements
- The footer CTA headline is constrained to `max-w-2xl`

## Components
- **PrimaryButton** — arrow icon rotates 45deg on hover with `duration-200 ease-in-out` transition (uses `group`/`group-hover` pattern)
- **SecondaryLink** — arrow translates on hover
- **ChevronIcon** — rotates 45deg when FAQ item is open

## Sections
1. **Navbar** — sticky, logo + nav links
2. **Hero** — headline + button (left col), description (right col, bottom-aligned), full-width image below with `mb-24` gap
3. **About** — 2-col with stats row (4-col grid)
4. **Services** — 5-col grid (label | gutter | 3-col content), 2x2 service cards
5. **Work** — project list with thumbnails, arrow appears on hover
6. **Clients** — 5-col grid layout, 2 testimonials
7. **FAQ** — accordion with animated open/close (`max-h` transition)
8. **Footer** — dark bg, CTA (max-w-2xl) + contact info + nav + large wordmark

## Notes
- Image assets are temporary Figma CDN URLs (expire in ~7 days). Replace with hosted versions before deploying.
- No responsive/mobile breakpoints yet — desktop-only layout.
- FAQ answers contain placeholder lorem ipsum text.
- Smooth scrolling via Lenis with default settings (subtle inertial feel).

## Commands
```bash
npm install    # Install dependencies
npm run dev    # Start dev server
npm run build  # Production build
```
