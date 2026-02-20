# Many Roads AI

## Overview
Two single-page website template variants built with React 19, Vite 7, and Tailwind CSS v4:
- **V1** (`/v1`) — Legacy architecture firm template, in `FieldworkV1.jsx`
- **V2** (`/v2`) — AI coding tools consultancy (Many Roads AI / MRAI), in `ManyroadsV2.jsx`

An index page at `/` links to both variants.

## Repository & Deployment
- **GitHub:** https://github.com/Many-Roads-Studios/website-ai-design-system
- **Branch:** `main`
- **Hosting:** Vercel — `vercel.json` rewrites all routes to `/index.html` for client-side routing

## Tech Stack
- **React 19** + **Vite 7**
- **Tailwind CSS v4** — via `@tailwindcss/vite` plugin, imported in `index.css`
- **React Router v7** — client-side routing (`/`, `/v1`, `/v2`) in `App.jsx`
- **Lenis** — smooth/inertial scrolling, initialized in `main.jsx` with `requestAnimationFrame` loop
- **Geist** — `geist` npm package for Geist Sans + Geist Mono fonts (loaded via `@font-face` in `index.css`)

## Project Structure
```
src/
  main.jsx              # Entry point — Lenis init, React root
  App.jsx               # BrowserRouter — /, /v1, /v2
  index.css             # Tailwind import, @font-face, dark mode variant, blink-cursor keyframes
  IndexPage.jsx         # Landing page with links to V1/V2
  FieldworkV1.jsx       # V1 — legacy architecture firm template
  ManyroadsV2.jsx       # V2 — Many Roads AI (site v1.7)
vercel.json             # SPA rewrites for Vercel deployment
color-tokens.md         # Detailed color token reference
```

## Fonts
- **Geist Sans** — body text and headings. Applied via inline style `fontFamily: '"Geist Sans", sans-serif'` on the root div, plus `h1, h2, h3` rule in `index.css`
- **Geist Mono** — UI accents: nav links, section labels (`SectionLabel`), CTA buttons (`PrimaryButton`, `TypewriterButton`), pathway card buttons, tech stack badges, logo, dark mode toggle, footer nav/social links. Applied via `const MONO = { fontFamily: '"Geist Mono", monospace' }` inline style
- Both loaded from `node_modules/geist` via `@font-face` in `index.css`
- **Note:** `index.html` still links to Satoshi from Fontshare — this is a V1 remnant and unused by V2

## Dark Mode (V2 only)
- **Strategy:** class-based via `@custom-variant dark (&:where(.dark, .dark *));` in `index.css`
- **State:** `useState` with lazy initializer from `window.matchMedia("(prefers-color-scheme: dark)")`. A `useEffect` toggles the `.dark` class on `document.documentElement` whenever the state changes
- **Toggle:** `[ dark_ ]` / `[ light_ ]` button in the navbar — `text-sm`, border, rounded, Geist Mono

### Color Tokens (Light / Dark)

| Element              | Light              | Dark                |
|----------------------|--------------------|---------------------|
| Page bg / navbar bg  | `#FAF9F6`          | `#1A1A18`           |
| Card fills / badges  | `#F0EEE6`          | `#262624`           |
| Primary text         | `#262625`          | `#ECECEA`           |
| Muted text           | `#888888`          | `#ECECEA` at 50%    |
| Borders / dividers   | `#262625` at 12%   | `#ECECEA` at 10%    |
| Primary button fill  | `#E8E6DD`          | `#333331`           |
| Primary button hover | `#DEDAD0`          | `#3D3D3A`           |
| Pathway button fill  | `#D1CFC6`          | `#3D3D3A`           |
| Pathway button hover | `#C5C3BA`          | `#4A4A47`           |
| Footer bg            | `#262625`          | `#111110`           |
| Footer subtitle      | `white` at 60%     | `white` at 60%      |
| Footer divider       | `white` at 15%     | `white` at 15%      |

Full reference with per-element mapping: `color-tokens.md`

## Type Scale

7 tiers, applied via Tailwind utility classes:

| Size      | Tailwind Class  | Usage                                                    |
|-----------|-----------------|----------------------------------------------------------|
| **56px**  | `text-[56px]`   | Hero H1                                                  |
| **48px**  | `text-5xl`      | Stat display values (73%, 6–12mo, 80/20, 0)             |
| **36px**  | `text-[36px]`   | Section H2 headings, footer headline                     |
| **24px**  | `text-2xl`      | Card titles (Trailhead, Wayfinder), testimonial quotes   |
| **20px**  | `text-xl`       | Subheadings: stat labels, pathway subtitles, team names, credibility titles, "That's the work we do" |
| **17px**  | `text-[17px]`   | Body text: descriptions, paragraphs, bios, testimonial attributions, footer subtitle |
| **14px**  | `text-sm`       | UI elements: dark mode toggle, tech stack badges, LinkedIn links |

Elements intentionally kept at `text-lg` (18px): `SectionLabel`, navbar logo, navbar links, `SecondaryLink`, `PrimaryButton`, `TypewriterButton`, pathway card buttons, "or talk to our team" links, service card numbers/titles, footer contact labels/values, footer nav/social links.

## Layout
- All sections use `max-w-[1280px] mx-auto` inner container with responsive padding (`px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12`)
- Background colors remain full-width on outer `<section>`/`<footer>` elements
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hamburger navigation below md (768px)

## V2 Section Structure

| # | Component            | Label                       | Description                                              |
|---|----------------------|-----------------------------|----------------------------------------------------------|
| — | `Navbar`             | —                           | Sticky. `Many_Roads <AI>` logo + nav links + dark toggle |
| — | `HeroSection`        | —                           | 2-col: headline + TypewriterButton CTA / supporting copy |
| 1 | `AboutSection`       | `// 01 — THE_PROBLEM`      | 2-col: problem narrative + 4 stat cards (4-col grid)     |
| 2 | `ServicesSection`    | `// 02 — WHY_TEAMS_STALL`  | 5-col grid: label / gutter / 4 problem cards (2×2)       |
| 3 | `PathwaysSection`    | `// 03 — TWO_PATHWAYS`     | 2-col header + 2 product cards (Trailhead + Wayfinder)   |
| 4 | `TeamSection`        | `// 04 — THE_TEAM`         | 2-col: label+heading / 3 bios + tech badges              |
| 5 | `CredibilitySection` | `// 05 — WHY_TRUST_US`     | Sidebar label + methodology/open-source/focus + 2 quotes |
| — | `Footer`             | —                           | Dark bg, dual CTAs, contact, nav, social, MANYROADS mark |

## V2 Design Conventions
- **Section labels:** code-style `// 0X — LABEL_NAME` format in Geist Mono via `SectionLabel` component
- **CTA buttons:** trailing underscore replaces arrow icon (e.g., `See where you stand_`). Uses `.blink-cursor` animation (1s ease-in-out infinite) defined in `index.css`
- **TypewriterButton:** hero CTA that cycles through 3 phrases ("See where you stand", "Run the assessment", "Start here") using a ref-based 4-phase state machine (typing → pause → erasing → pauseNext). Timing: 50ms type, 4s pause, 30ms erase, 600ms between phrases, 400ms initial delay
- **PrimaryButton:** static CTA, no arrow icon, Geist Mono, `w-fit`
- **LinkedIn links:** `LinkedIn ↗` in Geist Mono `text-sm` after each team bio
- **Logo:** `Many_Roads <AI>` — underscore and angle brackets are intentional brand elements
- **Dark mode toggle:** `[ dark_ ]` / `[ light_ ]` with bracket notation and trailing underscore
- **Wordmark:** `MANYROADS` in footer at `clamp(80px, 15vw, 200px)`

## V2 Data Constants
- `STATS` — 4 stat cards: 73%, 6–12mo, 80/20, 0
- `SERVICES` — 4 problem cards with (01)–(04) numbering
- `NAV_LINKS` — Trailhead, Wayfinder, Team, Contact
- `FOOTER_NAV` — same as NAV_LINKS
- `FOOTER_SOCIAL` — Twitter, Instagram, YouTube
- `HERO_PHRASES` — 3 typewriter phrases

## Notes
- **Asset URLs:** `ASSETS` object contains temporary Figma CDN URLs (expire ~7 days). Replace before deploying
- **Satoshi font:** still linked in `index.html` from Fontshare — used by V1, not by V2
- **V1 naming:** `FieldworkV1.jsx` retains "Fieldwork" branding as it's the original architecture firm template

## Commands
```bash
npm install    # Install dependencies
npm run dev    # Start dev server (Vite)
npm run build  # Production build
npm run lint   # ESLint
```
