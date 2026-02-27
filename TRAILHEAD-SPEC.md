# Trailhead Page — Implementation Spec

**Route:** `/trailhead`
**Status:** Structure-first build — placeholder copy from Figma reference, real content TBD
**Reference mockup:** Figma node `93:2258` in file `EXUISsDXXs7Sv63qc9VtCP` (Cursor homepage layout)
**Design system source:** Existing `/v2` page — `src/ManyroadsV2.jsx`, `src/tokens/tokens.css`, `src/app/globals.css`

---

## Approach

Build a new page at `/trailhead` that **reuses the structural layout from the Figma mockup** (a Cursor-style SaaS product page) but **applies the Many Roads design system** — tokens, fonts, component patterns, dark mode, and responsive behavior from the existing `/v2` site.

The Figma mockup uses Cursor's brand copy and Helvetica Neue. We keep the copy as placeholder but restyle everything using Many Roads conventions. Real content will be swapped in later.

---

## File Structure

```
src/
  app/
    trailhead/
      layout.jsx        # Route metadata
      page.jsx          # Imports TrailheadPage component
  TrailheadPage.jsx     # Main page component ('use client')
```

Follow the same pattern as V2: single-file page component with inline section components, `'use client'` directive, shared `MONO` constant, `SectionLabel` component, etc.

---

## Design System Rules (Mandatory)

All rules from `CLAUDE.md` → "Design System Rules" section apply. The critical ones:

1. **Tokens only** — every color, spacing, shadow, and radius value must use `var(--mr-*)` from `src/tokens/tokens.css`. No hardcoded hex/rgba.
2. **Fonts** — Geist Sans for body/headings (`--mr-font-display` / `--mr-font-body`), Geist Mono for nav, labels, buttons, badges (`--mr-font-mono` via `MONO` constant). No other fonts.
3. **Dark mode** — use tokens that auto-switch. Test both themes.
4. **Section wrapper pattern** — full-width `<section>` for background, inner `<div>` with `max-w-[var(--mr-max-width)] mx-auto` and responsive padding `px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12`.
5. **Section labels** — `// 0X — LABEL_NAME` format via `SectionLabel` component in Geist Mono.
6. **Buttons** — use `mr-btn-primary` / `mr-btn-pathway` CSS classes. Trailing underscore convention. Geist Mono.
7. **Cards** — `var(--mr-bg-card)` background, `var(--mr-border-default)` border, `var(--mr-radius-md)` corners.
8. **Responsive** — mobile-first, Tailwind breakpoints (sm/md/lg/xl). Hamburger nav below `md`.
9. **Hover classes** — use the `.mr-btn-*` and `.mr-link-*` utility classes from `globals.css`. Don't write inline hover styles.

---

## Section Breakdown

### 1. Header / Navbar
- **Reuse** the Navbar component pattern from `ManyroadsV2.jsx` (or import it if extracted)
- Sticky, `z-50`, page background color
- Logo: `Many_Roads <AI>` in Geist Mono
- Nav links: adapt for Trailhead context (e.g., Features, Pricing, About, Contact — placeholder for now)
- Dark mode toggle: `[ dark_ ]` / `[ light_ ]`
- Hamburger below `md`

### 2. Hero Section
- **Figma reference:** Top section with headline, subtitle, CTA button, and large hero image/placeholder below
- **Layout:** Left-aligned text block above a full-width rounded image container
- **Content (placeholder):**
  - Headline: "Built to make you extraordinarily productive, Cursor is the best way to code with AI."
  - CTA: "Download for Windows ⤓" → restyle as Many Roads button with `mr-btn-primary` or accent-colored CTA
- **Image area:** Large rounded container (`var(--mr-radius-sm)`) with `var(--mr-bg-card)` fill and subtle border as placeholder

### 3. Logo Bar
- **Figma reference:** "Trusted every day by teams that build world-class software" + 9 company logo cards in a horizontal row
- **Layout:** Centered subtitle text above a responsive grid of logo placeholder cards
- **Cards:** `var(--mr-bg-card)` background, `var(--mr-border-default)` border, `var(--mr-radius-sm)` corners, fixed height (~100px)
- **Responsive:** Horizontal scroll or wrap on mobile, single row on desktop
- **Logos:** Use placeholder boxes with company name text for now (Stripe, OpenAI, Linear, Datadog, NVIDIA, Figma, Ramp, Adobe) — real logos TBD

### 4. Feature Showcase (3× Alternating Cards)
- **Figma reference:** Three large feature sections, each a full-width card with text on one side and image on the other, alternating left/right
- **Section label:** `// 01 — FEATURES`
- **Card 1 — Text Left, Image Right:**
  - Title: "Agents turn ideas into code"
  - Subtitle (muted): "Accelerate development by handing off tasks to Cursor, while you focus on making decisions."
  - Link: "Learn about agentic development →" in accent color
- **Card 2 — Image Left, Text Right:**
  - Title: "Magically accurate autocomplete"
  - Subtitle (muted): "Our specialized Tab model predicts your next action with striking speed and precision."
  - Link: "Learn about Tab →"
- **Card 3 — Text Left, Image Right:**
  - Title: "In every tool, at every step"
  - Subtitle (muted): "Cursor reviews your PRs in GitHub, collaborates in Slack, and runs in your terminal."
  - Link: "Learn about Cursor's surfaces →"
- **Card styling:** `var(--mr-bg-card)` background, `var(--mr-radius-sm)` corners, subtle border. Image side is a placeholder container.
- **Link styling:** Accent-colored text (`var(--mr-accent-default)`), Geist Mono or body font, arrow suffix

### 5. 3 Features 2 (Codebase Understanding → Generic)
- **Figma reference:** Section header with headline + muted subtitle, followed by 3 equal-width feature cards
- **Section label:** `// 02 — FEATURES_2`
- **Header:**
  - Title: "Understands your codebase, no matter the size"
  - Subtitle (muted): "Cursor deeply learns your codebase before writing a single line."
- **Cards (3-column grid, 1-col on mobile):**
  - Each card: title line + 2-line muted description + "Learn more →" accent link + image placeholder below
  - Card 1: "Multiple models" / "Subagents run in parallel to explore your codebase, with each one using the best model for the task."
  - Card 2: "Codebase indexing" / "A custom embedding model gives agents best-in-class recall across large codebases."
  - Card 3: "Team rules" / "Teach Cursor your preferences, from team conventions to specific architectural decisions."
- **Card styling:** Same card pattern — `var(--mr-bg-card)`, border, `var(--mr-radius-md)`, image placeholder area inside card

### 6. 3 Features 3 (Development Lifecycle → Generic)
- **Figma reference:** Same layout as section 5 — header + 3 cards
- **Section label:** `// 03 — FEATURES_3`
- **Header:**
  - Title: "Spans the full development lifecycle"
  - Subtitle (muted): "Cursor supports every phase from planning to writing to reviewing code."
- **Cards:**
  - Card 1: "Plan" / "For complex tasks, Cursor asks clarifying questions, builds a plan, then executes in the background."
  - Card 2: "Design" / "Visually edit any page by selecting an element to instantly rewrite, resize, or move it."
  - Card 3: "Debug" / "Cursor instruments your code and uses real execution data to pinpoint the fix."
- All cards have "Learn more →" accent link and image placeholder

### 7. Testimonials Grid
- **Figma reference:** "The new way to build software." headline centered, 6 testimonial cards in 3×2 grid
- **Section label:** `// 04 — TESTIMONIALS`
- **Headline:** Centered, large (`text-[36px]`)
- **Cards (3-col grid, 1-col mobile, 2-col tablet):**
  - Each card: quote text + avatar placeholder (40px circle) + name + title/company
  - Use `var(--mr-bg-card)` background, `var(--mr-border-default)` border
  - Keep the placeholder quote text from Figma (Diana Hu / YC, Jensen Huang / NVIDIA, Andrej Karpathy, Patrick Collison / Stripe, shadcn, Greg Brockman / OpenAI)
  - Avatar: 40px rounded square with `var(--mr-bg-button-primary)` placeholder fill

### 8. 3 Features 4 (Stay on the Frontier → Generic)
- **Figma reference:** "Stay on the frontier" header + 3 feature cards with text above and image below
- **Section label:** `// 05 — FEATURES_4`
- **Header title:** "Stay on the frontier"
- **Cards:**
  - Card 1: "Use the best model for every task" / "Choose between every cutting-edge model from OpenAI, Anthropic, Gemini, xAI, and Cursor." / "Explore models ↗"
  - Card 2: "Complete codebase understanding" / "Cursor learns how your codebase works, no matter the scale or complexity." / "Learn about codebase indexing ↗"
  - Card 3: "Develop enduring software" / "Trusted by over half of the Fortune 500 to accelerate development, securely and at scale." / "Explore enterprise →"

### 9. Changelog
- **Figma reference:** "Changelog" header + 4 horizontal article cards + "See what's new" link
- **Section label:** `// 06 — CHANGELOG`
- **Layout:** Header left-aligned, 4 equal-width cards in a row (stack on mobile)
- **Cards:** Date (muted) above, title below. `var(--mr-bg-card)` background, border.
- **Placeholder entries:**
  - "Cloud Agents with Computer Use" — Feb 24, 2026
  - "CLI Improvements and Mermaid ASCII Diagrams" — Feb 18, 2026
  - "Plugins, Sandbox Access Controls, and Async Subagents" — Feb 17, 2026 (with version badge "2.5")
  - "Long-running Agents in Research Preview" — Feb 12, 2026
- **Footer link:** "See what's new in Cursor →" in accent color

### 10. Join Many Roads \<AI\> Pro
- **Figma reference:** Full-width card with text left, image right (the "Cursor is an applied research team" section)
- **Section label:** `// 07 — COMMUNITY`
- **Layout:** Full-width `var(--mr-bg-card)` card with inner padding. Text block on left (~40%), image placeholder on right (~60%)
- **Content (placeholder):**
  - Title: "Many Roads \<AI\> is building a community focused on the future of AI-assisted development."
  - Link: "Join us →" in accent color
- **Image area:** Rounded placeholder with subtle overlay

### 11. Recent Highlights
- **Figma reference:** "Recent highlights" sticky label on left, 3 stacked article cards on right
- **Section label:** `// 08 — HIGHLIGHTS`
- **Layout:** Different background — use a slightly different surface color. Consider using `var(--mr-bg-card)` as the section background with cards using a slightly darker shade (may need a new token like `--mr-bg-card-elevated`).
- **Cards:** Stacked vertically with title, muted description, and category + date tag line
- **Placeholder entries:**
  - "Towards self-driving codebases" / Research · Feb 5, 2026
  - "Salesforce ships higher-quality code across 20,000 developers with Cursor" / Customers · Jan 21, 2026
  - "Best practices for coding with agents" / Product · Jan 9, 2026
- **Footer link:** "View more posts →" in accent color

### 12. Final CTA
- **Layout:** Centered text block with large headline and CTA button
- **Headline:** "Try Cursor now." at `text-[56px]` or similar hero scale — will become Many Roads CTA
- **Button:** Accent-colored or `mr-btn-primary`, "Download for Windows ⤓" placeholder → will become MR CTA

### 13. Footer
- **Reuse** the footer pattern from `ManyroadsV2.jsx`
- Dark background (`var(--mr-footer-bg)`), multi-column nav grid
- Adapt columns to match Figma structure: Product, Resources, Company, Legal, Connect
- Copyright line, SOC 2 badge area, theme toggle, language selector placeholder

---

## Shared Components to Extract or Reuse

These components from `ManyroadsV2.jsx` should be reused (copy or import):

| Component | Purpose | Notes |
|-----------|---------|-------|
| `SectionLabel` | `// 0X — LABEL` format | Geist Mono, accent-colored `//` |
| `PrimaryButton` | Standard CTA | `mr-btn-primary` class, Geist Mono, trailing `_` |
| `TypewriterButton` | Animated hero CTA | Optional — may want static CTA for Trailhead |
| `MONO` constant | Font style object | `{ fontFamily: '"Geist Mono", ...' }` |
| Navbar pattern | Sticky nav with hamburger | Adapt links for Trailhead context |
| Footer pattern | Dark footer | Adapt link columns |

---

## New Component Patterns Introduced

### FeatureCard (for sections 5, 6, 8)
```
┌─────────────────────────────┐
│ Title                       │
│ Muted description text      │
│ "Learn more →" accent link  │
│                             │
│ ┌─────────────────────────┐ │
│ │   Image placeholder     │ │
│ │   (var(--mr-bg-card))   │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```
- 3-column grid on desktop, 1-column on mobile
- Card bg: `var(--mr-bg-card)`, border: `var(--mr-border-default)`, radius: `var(--mr-radius-md)`

### FeatureShowcase (for section 4)
```
┌──────────────────────────────────────────────┐
│ ┌──────────┐  ┌────────────────────────────┐ │
│ │  Text     │  │     Image placeholder      │ │
│ │  block    │  │                            │ │
│ └──────────┘  └────────────────────────────┘ │
└──────────────────────────────────────────────┘
```
- Full-width card, alternating text/image sides
- Odd cards: text left, image right. Even cards: image left, text right.
- On mobile: stack vertically (text above image)

### TestimonialCard (for section 7)
```
┌─────────────────────────────┐
│ "Quote text here that spans │
│  multiple lines..."         │
│                             │
│ [avatar] Name               │
│          Title, Company     │
└─────────────────────────────┘
```
- 3×2 grid on desktop, 2-col on tablet, 1-col on mobile

### ChangelogCard (for section 9)
```
┌─────────────────────────────┐
│ Feb 24, 2026     [2.5]      │
│ Article title text          │
└─────────────────────────────┘
```
- 4-column row on desktop, 2×2 on tablet, stacked on mobile

---

## Implementation Order (Recommended)

Build in 3 phases, verifying after each:

### Phase 1 — Scaffold + Hero + Nav
1. Create route files (`trailhead/layout.jsx`, `trailhead/page.jsx`)
2. Create `TrailheadPage.jsx` with `'use client'`, dark mode state, MONO constant
3. Build Navbar (reuse V2 pattern)
4. Build Hero section
5. Build Logo Bar
6. Verify: page loads, dark mode works, responsive layout correct

### Phase 2 — Feature Sections + Testimonials
7. Build Feature Showcase (3× alternating cards)
8. Build 3 Features 2
9. Build 3 Features 3
10. Build Testimonials grid
11. Verify: all cards render, responsive grid works, dark mode correct

### Phase 3 — Bottom Sections + Footer
12. Build 3 Features 4
13. Build Changelog
14. Build Join Many Roads \<AI\> Pro
15. Build Recent Highlights
16. Build Final CTA
17. Build Footer (reuse V2 pattern, adapt columns)
18. Final pass: responsive, dark mode, accessibility

---

## Token Additions (If Needed)

The Figma mockup uses a slightly different card surface for the Recent Highlights section (section bg = card color, cards = darker). If needed, add:

```css
/* In tokens.css — light mode */
--mr-bg-card-elevated: #EBEAE5;

/* In tokens.css — dark mode */
--mr-bg-card-elevated: #2E2E2C;
```

Also consider an accent link color if `--mr-accent-default` doesn't work well for inline text links (the Figma uses `#F54E00` orange for links — we should use our accent green instead).

---

## Content Replacement Plan

All text content in this spec is **placeholder** from the Cursor reference design. A separate content workstream will produce final copy for Many Roads. When ready:

1. Replace all headline/subtitle text in each section
2. Replace testimonial quotes with Many Roads testimonials
3. Replace logo bar companies with MR clients/partners
4. Replace changelog entries with MR updates
5. Replace recent highlights with MR blog posts
6. Update all CTA text and link targets
7. Replace image placeholders with real assets

The page structure, component patterns, and styling remain unchanged during content swap.
