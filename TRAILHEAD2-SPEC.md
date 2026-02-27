# Trailhead2 Page — Implementation Spec

**Route:** `/trailhead2`
**Status:** Branded copy build — real content from `trailhead-landing-page-copy-v2.md`
**Design system source:** Same as `/trailhead` and `/v2` — `src/tokens/tokens.css`, `src/app/globals.css`, `CLAUDE.md`
**Reference for patterns:** `src/TrailheadPage.jsx` (reusable components), `src/ManyroadsV2.jsx` (prose section layouts)

---

## Approach

Build a new page at `/trailhead2` as a separate file (`Trailhead2Page.jsx`). This page uses the Many Roads design system and shares infrastructure with the existing Trailhead page (Navbar, SectionLabel, PrimaryButton, MONO, dark mode, footer) but has an entirely different section structure driven by branded marketing copy.

The page is content-heavy and prose-driven — more like V2's consulting page than Trailhead's SaaS product template. Several sections are primarily headline + paragraphs with no cards or grids.

---

## File Structure

```
src/
  app/
    trailhead2/
      layout.jsx        # Route metadata
      page.jsx          # Imports Trailhead2Page
  Trailhead2Page.jsx    # Main page component ('use client')
```

---

## Design System Rules

All rules from `CLAUDE.md` apply. Same as Trailhead — tokens only, Geist fonts, dark mode, section wrapper pattern, responsive breakpoints. No new tokens needed beyond the existing set (including `--mr-bg-card-elevated` already in `tokens.css`).

---

## Infrastructure to Copy from TrailheadPage.jsx

Copy these verbatim into `Trailhead2Page.jsx` (same self-contained pattern):

- `MONO` constant
- `ACCENT_OPTIONS` array + `darkenColor()` helper
- `SectionLabel` component
- `PrimaryButton` component
- `Navbar` component (change logo link from `/trailhead` to `/trailhead2`, update `NAV_LINKS`)
- `Footer` component (keep as-is)
- Main component dark mode + accent state management (with the SSR-safe `useState(false)` + `useEffect` pattern)

---

## Nav Links

```js
const NAV_LINKS = ["Assessment", "How It Works", "About", "GitHub"];
```

---

## Section Breakdown

All copy below is **final branded content** from the copy document. Use it exactly as written.

---

### Section 1: Hero

- **Section label:** None (hero sections don't use labels, matching V2/Trailhead pattern)
- **Layout:** Left-aligned text block (max-width ~800px), no image placeholder. Clean and direct, similar to V2 hero but without the 2-column split.

**Content:**
- H1: `Your codebase isn't ready for AI. This tells you exactly why.`
- Subheadline (muted, `text-[17px]`): `31 questions. 15 minutes. A specific, honest picture of what needs to be true before AI coding tools will actually work in your environment. Open source. No login. No data leaves your machine.`
- Primary CTA: `Get Trailhead on GitHub_` (accent-colored button, Geist Mono, trailing underscore)
- Secondary CTA: `See a sample report →` (underlined muted link, same pattern as V2's "or talk to our team")

**Spacing:** `pt-16 pb-16 md:pt-24 md:pb-24`

---

### Section 2: The Problem

- **Section label:** `// 01 — THE_PROBLEM`
- **Layout:** Use V2's `AboutSection` pattern — 2-column grid (label + heading left, prose right) on desktop, stacked on mobile. Specifically: `grid grid-cols-1 md:grid-cols-12`, left side `md:col-span-4` with SectionLabel + H2, right side `md:col-start-6 md:col-span-7` with body paragraphs.

**Content:**
- H2: `AI tools don't fail because they're bad. They fail because the foundations aren't there.`
- Body paragraph 1: `You're under pressure to adopt Copilot, Cursor, Claude Code — pick your flavor. But rolling AI tools out on a codebase that lacks test coverage, documentation standards, or security review processes doesn't make your team faster. It makes your existing gaps worse, faster.`
- Body paragraph 2: `The pattern is predictable: AI-generated code that nobody can confidently verify. Tech debt that compounds at machine speed. Security risks that go unreviewed because the review process wasn't designed for AI-generated output. And leadership wondering why the productivity gains never showed up.`
- Punchline (styled like V2's "That's the work we do" — `text-xl font-medium`): `The tools aren't the problem. The foundations are.`

---

### Section 3: What This Is

- **Section label:** `// 02 — WHAT_THIS_IS`
- **Layout:** 2-column like section 2 (label + heading left, prose + specs right)

**Content:**
- H2: `A diagnostic, not a pitch.`
- Body paragraph 1: `Trailhead is a self-assessment your engineering team runs internally. 31 questions across four dimensions — Artifacts, Process, Tooling, and Culture — designed to surface the specific gaps that would undermine AI tool adoption in your environment.`
- Body paragraph 2: `You'll get scores by area with clear ratings. You'll see where you're strong, where you're developing, and where the foundations need work. "Not sure" answers get flagged separately — because the things you can't see are usually the things that hurt you.`
- Body paragraph 3: `It runs locally. No data is sent anywhere. The methodology is open source. You keep everything.`
- Key specs (rendered as a compact list or grid of 4 items below the prose, using `var(--mr-bg-card)` cards):
  - `31 questions across 13 areas`
  - `Scored by dimension and area (Strong / Developing / Needs Work)`
  - `Visibility gaps flagged — "not sure" is a signal, not a penalty`
  - `Runs locally, no data transmitted, no account required`

**Specs layout:** `grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8` — each spec item is a small card (`var(--mr-bg-card)`, `var(--mr-border-default)`, `var(--mr-radius-md)`, `p-4`) with the text in `text-sm` Geist Mono.

---

### Section 4: Who It's For

- **Section label:** `// 03 — WHO_ITS_FOR`
- **Layout:** Section header (label + heading), then 3-column card grid (similar to Trailhead's FeatureCard grid but without image placeholders)

**Content:**
- H2: `For the people who have to make the call.`
- 3 cards:

```js
const PERSONAS = [
  {
    title: "Engineering Managers & Tech Leads",
    desc: "You're being asked to roll out AI tools. You're not sure the team is ready. Trailhead gives you a concrete, defensible picture — something you can bring to leadership, or use as a roadmap for what to fix first.",
  },
  {
    title: "Directors & VPs of Engineering",
    desc: "You need to know which teams can pilot and which need foundation work first. Trailhead gives you a consistent framework for comparing readiness across teams — without relying on self-reported optimism.",
  },
  {
    title: "CTOs & Technical Executives",
    desc: "You're making budget and timeline decisions. Trailhead helps you understand the real state of engineering foundations so you can set expectations that won't embarrass anyone in six months.",
  },
];
```

**Card component — `PersonaCard`:**
- `var(--mr-bg-card)` bg, `var(--mr-border-default)` border, `var(--mr-radius-md)`, `p-6`
- Title: `text-xl font-medium`, `--mr-text-primary`
- Body: `text-[17px] leading-[1.6] mt-3`, `--mr-text-muted`
- No image, no link. Text-only cards.
- Grid: `grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-16`

---

### Section 5: How It Works

- **Section label:** `// 04 — HOW_IT_WORKS`
- **Layout:** Section header, then 4 numbered step cards. Use V2's `SERVICES` card pattern with `(01)` numbering and border-top separator.

**Content:**
- H2: `Download to results in 15 minutes.`

```js
const STEPS = [
  {
    num: "01",
    title: "Set your context",
    desc: "Team size, tech stack, codebase age, current AI tool usage. Takes two minutes. Frames everything that follows.",
  },
  {
    num: "02",
    title: "Answer 31 questions",
    desc: "Four sections: Artifacts, Process, Tooling, Culture. Each answer is Yes / Partial / No / Not sure. Answer based on how your team actually works — not how it's documented.",
  },
  {
    num: "03",
    title: "Read your results",
    desc: "Overall readiness score, per-dimension breakdowns, area-level detail. Visibility gaps — the things you marked \"not sure\" — are flagged separately. They're usually worth investigating first.",
  },
  {
    num: "04",
    title: "Decide what's next",
    desc: "Prioritize foundation work. Make the case for investment. Validate that you're ready to pilot. Or just have better conversations about pace and risk.",
  },
];
```

**Step card layout:** `grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-12 md:gap-y-20 mt-10 md:mt-16` (2×2 grid matching V2 ServicesSection). Each step:
- Top border: `borderTop: "1px solid var(--mr-border-default)"`, `pt-8`
- Number: `(01)` in Geist Mono, `text-lg font-medium`, `--mr-text-primary`
- Title: `text-lg font-medium mb-4`, `--mr-text-primary`
- Body: `text-[17px] leading-[1.6]`, `--mr-text-muted`

---

### Section 6: What It Covers

- **Section label:** `// 05 — WHAT_IT_COVERS`
- **Layout:** Section header, then a 2×2 grid of dimension cards (4 items, not 3). On mobile stack to 1 column.

**Content:**
- H2: `Four dimensions. Thirteen areas.`

```js
const DIMENSIONS = [
  {
    title: "Artifacts",
    subtitle: "What your team produces",
    areas: ["Standards", "Documentation", "Requirements", "Testing", "Architecture"],
  },
  {
    title: "Process",
    subtitle: "How work moves through the team",
    areas: ["Reviews", "Tech Debt", "Security", "Metrics"],
  },
  {
    title: "Tooling",
    subtitle: "The infrastructure underneath",
    areas: ["CI/CD", "IDE & Developer Tools"],
  },
  {
    title: "Culture",
    subtitle: "The environment that makes change stick",
    areas: ["Ownership", "Decision-Making"],
  },
];
```

**Dimension card component — `DimensionCard`:**
- `var(--mr-bg-card)` bg, `var(--mr-border-default)` border, `var(--mr-radius-md)`, `p-6`
- Title: `text-xl font-medium`, `--mr-text-primary`
- Subtitle: `text-[17px] leading-[1.6] mt-1`, `--mr-text-muted`
- Areas: rendered as a horizontal flex-wrap row of small badges/tags below the subtitle (`mt-4`). Each badge: `text-sm`, Geist Mono, `px-3 py-1`, `var(--mr-bg-button-primary)` bg, `var(--mr-radius-sm)` corners, `--mr-text-primary`
- Grid: `grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 md:mt-16`

---

### Section 7: Why Open Source + What This Isn't (Combined)

The copy document suggests combining sections 7 and 8 into one section. Do this.

- **Section label:** `// 06 — TRANSPARENCY`
- **Layout:** 2-column prose layout (same as sections 2 and 3)

**Content — Left column (label + heading):**
- H2: `See exactly how we think.`

**Content — Right column (prose):**
- Paragraph 1: `Trailhead is open source because readiness assessment shouldn't be a black box — especially one built by a consulting firm.`
- Paragraph 2: `You can read every question. You can see how scoring works. You can fork it and adapt it to your context. It runs entirely in your environment. No data is sent anywhere. No account is needed.`
- Paragraph 3: `We built this because we kept seeing the same pattern: teams investing in AI tools before the foundations were ready, then blaming the tools when adoption stalled. This is our way of making the diagnosis accessible to everyone — not just our clients.`

Then a visual divider (`mt-12 pt-12 border-t`), followed by the "What This Isn't" content:

- Subheading: `Expectations, set correctly.` — `text-xl font-medium`, `--mr-text-primary`
- Paragraph 1: `This is not a maturity model. It won't tell you you're "Level 3." It's not a compliance checklist. It doesn't scan your codebase and produce a magic number.`
- Paragraph 2: `It's a structured self-assessment. The value is in honest answers and the conversations they start.`
- Punchline (`text-xl font-medium`): `A team that scores 40% and knows exactly where their gaps are is in a stronger position than a team that scores 80% by being generous with themselves.`

---

### Section 8: Built by Many Roads

- **Section label:** `// 07 — BUILT_BY`
- **Layout:** Full-width card with text left (~40%), image placeholder right (~60%) — reuse the CommunitySection pattern from TrailheadPage.jsx

**Content:**
- H3: `Same framework we use with clients. Free.`
- Body paragraph 1: `Many Roads AI helps Series B–D technology companies get real productivity from AI coding tools. We work with teams where the tools have already been adopted but aren't delivering — legacy codebases, missing foundations, organizational friction.`
- Body paragraph 2: `Trailhead is the diagnostic framework we use in every engagement. We're releasing it as an open-source tool because the diagnosis shouldn't require a consulting contract. If your results surface gaps you want help closing, that's where Wayfinder comes in.`
- Link: `Learn more about Wayfinder →` in accent color

---

### Section 9: FAQ

- **Section label:** `// 08 — FAQ`
- **Layout:** Section header + stacked Q&A items. Each item is a card with question as title and answer as body. Use `var(--mr-bg-card)` background.

**Content:**
- H2: `Frequently asked questions.`

```js
const FAQ_ITEMS = [
  {
    q: "How long does it take?",
    a: "15 minutes for one person. Better: have 3–5 team members complete it independently, then compare results. The discrepancies are where the real conversations happen.",
  },
  {
    q: "Do I need to install anything?",
    a: "Download from GitHub and run locally. Lightweight web app — no backend, no database, no accounts.",
  },
  {
    q: "Can I customize it?",
    a: "It's open source. Fork it. Adapt the questions, weighting, or scoring to your context.",
  },
  {
    q: "What if we score poorly?",
    a: "Good. A low score with clear gaps is more useful than a vague sense that things could be better. Now you know where to start.",
  },
  {
    q: "Is this a sales funnel?",
    a: "No. The tool is free, the methodology is transparent, and there's no upsell built in. If your results surface gaps you want help with, we offer consulting engagements — but Trailhead stands on its own.",
  },
  {
    q: "How is it scored?",
    a: "Yes = 2, Partial = 1, No = 0, Not sure = 0 (flagged as visibility gap). Scores are expressed as a percentage of the maximum possible per group. Weighting is configurable.",
  },
];
```

**FAQ card layout:** `flex flex-col gap-4 mt-10 md:mt-16`. Each card:
- `var(--mr-bg-card)` bg, `var(--mr-border-default)` border, `var(--mr-radius-md)`, `p-6`
- Question: `text-lg font-medium`, `--mr-text-primary`
- Answer: `text-[17px] leading-[1.6] mt-3`, `--mr-text-muted`

These are **not** accordions — all answers are visible. The copy is short enough that collapsing isn't needed, and visible answers reduce friction for scanning.

---

### Section 10: Final CTA

- **Layout:** Centered text block, generous vertical padding (`py-24 md:py-32 lg:py-40`)

**Content:**
- H2 (large, `text-3xl sm:text-4xl lg:text-[56px]`): `Find your gaps before your AI tools find them for you.`
- Subheadline (muted, `text-[17px]`, centered): `31 questions. 15 minutes. The clearest picture of AI readiness your team has ever had.`
- Primary CTA: `Get Trailhead on GitHub_` (accent-colored button)
- Secondary CTA: `Questions? Talk to our team →` (underlined muted link)

---

### Footer

Reuse the Footer from TrailheadPage.jsx. Update `FOOTER_COLUMNS` to be more relevant:

```js
const FOOTER_COLUMNS = [
  { heading: "Product", links: ["Trailhead", "Wayfinder", "Pricing"] },
  { heading: "Resources", links: ["Documentation", "GitHub", "Blog"] },
  { heading: "Company", links: ["About", "Team", "Contact"] },
  { heading: "Legal", links: ["Privacy", "Terms"] },
  { heading: "Connect", links: ["Twitter", "LinkedIn", "YouTube"] },
];
```

---

## Section Order in Main Render

```jsx
<Navbar />
<main>
  <HeroSection />          {/* 1. Hero */}
  <ProblemSection />       {/* 2. The Problem */}
  <WhatThisIsSection />    {/* 3. What This Is */}
  <WhoItsForSection />     {/* 4. Who It's For */}
  <HowItWorksSection />    {/* 5. How It Works */}
  <WhatItCoversSection />  {/* 6. What It Covers */}
  <TransparencySection />  {/* 7. Why Open Source + What This Isn't */}
  <BuiltBySection />       {/* 8. Built by Many Roads */}
  <FAQSection />           {/* 9. FAQ */}
  <FinalCTA />             {/* 10. Final CTA */}
</main>
<Footer />
```

---

## New Components Introduced

| Component | Pattern Source | Notes |
|-----------|--------------|-------|
| `PersonaCard` | Similar to `FeatureCard` but no image/link | Text-only card for "Who It's For" |
| `DimensionCard` | New | Card with title, subtitle, and area tags |
| `StepCard` | V2 `SERVICES` card pattern | Numbered card with border-top |
| `FAQCard` | Simple card | Question + answer, always expanded |

Components that are **NOT needed** (from TrailheadPage.jsx):
- `FeatureCard` — no feature grid sections
- `TestimonialCard` — no testimonials yet
- `LogoBar` — no client logos yet

---

## Implementation Phases

### Phase 1 — Scaffold + Hero + Problem + What This Is
1. Create route files (`trailhead2/layout.jsx`, `trailhead2/page.jsx`)
2. Create `Trailhead2Page.jsx` — copy infrastructure from TrailheadPage.jsx (MONO, Navbar, SectionLabel, PrimaryButton, dark mode, Footer)
3. Build HeroSection with dual CTAs
4. Build ProblemSection (2-col prose layout from V2 AboutSection)
5. Build WhatThisIsSection (2-col prose + specs grid)

### Phase 2 — Who / How / What It Covers
6. Build WhoItsForSection (3-column PersonaCard grid)
7. Build HowItWorksSection (2×2 numbered StepCard grid)
8. Build WhatItCoversSection (2×2 DimensionCard grid with area tags)

### Phase 3 — Transparency + Built By + FAQ + CTA + Footer
9. Build TransparencySection (combined open source + expectations prose)
10. Build BuiltBySection (text left / image right card)
11. Build FAQSection (stacked Q&A cards)
12. Build FinalCTA (centered dual CTAs)
13. Add Footer

---

## Verification Checklist

- [ ] All colors use `var(--mr-*)` tokens — no hardcoded hex
- [ ] All fonts use MONO constant or inline Geist Sans — no other fonts
- [ ] Dark mode toggles correctly on every section
- [ ] Responsive: 375px, 768px, 1280px all look correct
- [ ] All copy matches the branded document exactly (including punctuation, em dashes, quotes)
- [ ] Section labels follow `// 0X — LABEL_NAME` format
- [ ] Buttons use trailing underscore convention
- [ ] `npm run build` passes with no errors or hydration warnings
