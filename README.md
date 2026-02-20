# Many Roads AI

Agentic website and design system for Many Roads AI — an AI coding tools consultancy helping engineering teams adopt AI-assisted development.

Built with React 19, Vite 7, and Tailwind CSS v4. Deployed on Vercel.

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- React Router v7
- Lenis (smooth scrolling)
- Geist Sans + Geist Mono fonts

## Getting Started

```bash
npm install
npm run dev
```

## Routes

| Path              | Description                                |
|-------------------|--------------------------------------------|
| `/`               | Index — links to V1 and V2                 |
| `/v1`             | Legacy template (architecture firm)        |
| `/v2`             | Many Roads AI (consulting) — Site v1.7     |
| `/design-system`  | Design system reference — v1.5             |

## V2 Features

- Fully responsive (375px → 1280px+) with Tailwind breakpoints
- Dark mode with system preference detection and manual toggle
- Hamburger navigation on mobile (below 768px)
- Code-styled section labels (`// 01 — THE_PROBLEM`)
- Geist Mono accents for nav, buttons, labels, and badges
- CSS custom property color tokens with light/dark themes
- Sections: Hero, About, Services, Pathways (Trailhead + Wayfinder), Team, Credibility, Footer

## Design System

Interactive reference at `/design-system` documenting foundations (color tokens, typography, spacing, responsive breakpoints) and all component patterns used across the site.

## Contributing

This project uses [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow). See [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming, PR guidelines, and branch protection setup.

## Commands

```bash
npm run dev      # Dev server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
```
