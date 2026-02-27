'use client'
// Trailhead2 Page — Phase 1 — 2026-02-27
import { useState, useEffect, useRef, useSyncExternalStore } from "react";

// =============================================================================
// DATA
// =============================================================================
const NAV_LINKS = ["Assessment", "How It Works", "About", "GitHub"];

const SPEC_ITEMS = [
  {
    title: "31 questions across 13 areas",
    desc: "Covering the full spectrum of engineering readiness, from documentation standards to deployment pipelines.",
  },
  {
    title: "Scored by dimension and area (Strong / Developing / Needs Work)",
    desc: "Clear ratings at every level so you know exactly where foundations are solid and where they need attention.",
  },
  {
    title: "Visibility gaps flagged \u2014 \u201Cnot sure\u201D is a signal, not a penalty",
    desc: "The things your team can\u2019t answer confidently are usually the things that hurt you first.",
  },
  {
    title: "Runs locally, no data transmitted, no account required",
    desc: "Your assessment data never leaves your machine. No telemetry, no tracking, no sign-up wall.",
  },
];

const PERSONAS = [
  {
    title: "Engineering Managers & Tech Leads",
    desc: "You\u2019re being asked to roll out AI tools. You\u2019re not sure the team is ready. Trailhead gives you a concrete, defensible picture\u2009\u2014\u2009something you can bring to leadership, or use as a roadmap for what to fix first.",
  },
  {
    title: "Directors & VPs of Engineering",
    desc: "You need to know which teams can pilot and which need foundation work first. Trailhead gives you a consistent framework for comparing readiness across teams\u2009\u2014\u2009without relying on self-reported optimism.",
  },
  {
    title: "CTOs & Technical Executives",
    desc: "You\u2019re making budget and timeline decisions. Trailhead helps you understand the real state of engineering foundations so you can set expectations that won\u2019t embarrass anyone in six months.",
  },
];

const STEPS = [
  {
    num: "01",
    title: "Set your context",
    desc: "Team size, tech stack, codebase age, current AI tool usage. Takes two minutes. Frames everything that follows.",
  },
  {
    num: "02",
    title: "Answer 31 questions",
    desc: "Four sections: Artifacts, Process, Tooling, Culture. Each answer is Yes / Partial / No / Not sure. Answer based on how your team actually works\u2009\u2014\u2009not how it\u2019s documented.",
  },
  {
    num: "03",
    title: "Read your results",
    desc: "Overall readiness score, per-dimension breakdowns, area-level detail. Visibility gaps\u2009\u2014\u2009the things you marked \u201Cnot sure\u201D\u2009\u2014\u2009are flagged separately. They\u2019re usually worth investigating first.",
  },
  {
    num: "04",
    title: "Decide what\u2019s next",
    desc: "Prioritize foundation work. Make the case for investment. Validate that you\u2019re ready to pilot. Or just have better conversations about pace and risk.",
  },
];

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

const FAQ_ITEMS = [
  {
    q: "How long does it take?",
    a: "15 minutes for one person. Better: have 3\u20135 team members complete it independently, then compare results. The discrepancies are where the real conversations happen.",
  },
  {
    q: "Do I need to install anything?",
    a: "Download from GitHub and run locally. Lightweight web app\u2009\u2014\u2009no backend, no database, no accounts.",
  },
  {
    q: "Can I customize it?",
    a: "It\u2019s open source. Fork it. Adapt the questions, weighting, or scoring to your context.",
  },
  {
    q: "What if we score poorly?",
    a: "Good. A low score with clear gaps is more useful than a vague sense that things could be better. Now you know where to start.",
  },
  {
    q: "Is this a sales funnel?",
    a: "No. The tool is free, the methodology is transparent, and there\u2019s no upsell built in. If your results surface gaps you want help with, we offer consulting engagements\u2009\u2014\u2009but Trailhead stands on its own.",
  },
  {
    q: "How is it scored?",
    a: "Yes = 2, Partial = 1, No = 0, Not sure = 0 (flagged as visibility gap). Scores are expressed as a percentage of the maximum possible per group. Weighting is configurable.",
  },
];

const FOOTER_COLUMNS = [
  { heading: "Product", links: ["Trailhead", "Wayfinder", "Pricing"] },
  { heading: "Resources", links: ["Documentation", "GitHub", "Blog"] },
  { heading: "Company", links: ["About", "Team", "Contact"] },
  { heading: "Legal", links: ["Privacy", "Terms"] },
  { heading: "Connect", links: ["Twitter", "LinkedIn", "YouTube"] },
];

// =============================================================================
// FONT STYLES
// =============================================================================
const MONO = { fontFamily: '"Geist Mono", "SF Mono", "Fira Code", "Fira Mono", monospace' };

const ACCENT_OPTIONS = [
  { color: "#3D7A41", name: "Green" },
  { color: "#8A708A", name: "Mauve" },
  { color: "#4F769A", name: "Blue" },
  { color: "#C47030", name: "Orange" },
  { color: "#B8892A", name: "Amber" },
];

function darkenColor(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 0xFF) * 0.85);
  const g = Math.round(((n >> 8) & 0xFF) * 0.85);
  const b = Math.round((n & 0xFF) * 0.85);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// =============================================================================
// SHARED COMPONENTS
// =============================================================================
function SectionLabel({ children, align = "left" }) {
  const rendered = typeof children === "string" && children.startsWith("//")
    ? (<><span className="text-[var(--accent)]">//</span>{children.slice(2)}</>)
    : children;
  return (
    <span className={`text-base lg:text-lg font-medium tracking-normal ${align === "right" ? "text-right" : ""}`} style={{ ...MONO, color: "var(--mr-text-primary)" }}>
      {rendered}
    </span>
  );
}

function PrimaryButton({ children }) {
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-2 mr-btn-primary px-4 py-2 rounded-lg text-lg font-medium w-fit"
      style={MONO}
    >
      <span>{children}</span>
    </a>
  );
}

// =============================================================================
// SECTIONS
// =============================================================================
function Navbar({ dark, onToggle, accent, onAccentChange }) {
  const [accentOpen, setAccentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!accentOpen) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setAccentOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [accentOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  useEffect(() => {
    function handleResize() { if (window.innerWidth >= 768) setMenuOpen(false); }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50" style={{ background: "var(--mr-bg-page)" }} ref={menuRef}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between h-[77px]">
        <a href="/trailhead2" className="text-lg font-medium tracking-wide" style={{ ...MONO, color: "var(--mr-text-primary)", textDecoration: "none" }}>Many_Roads &lt;AI&gt;</a>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-lg font-medium mr-link-nav"
                style={MONO}
              >
                {link}
              </a>
            ))}
          </div>
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              onClick={() => setAccentOpen(!accentOpen)}
              className="w-5 h-5 rounded-full cursor-pointer transition-transform hover:scale-110"
              style={{ backgroundColor: accent }}
            />
            {accentOpen && (
              <div className="absolute right-0 top-full mt-2 rounded-lg p-3 flex items-center gap-3 z-50" style={{ background: "var(--mr-bg-page)", border: "1px solid var(--mr-border-default)" }}>
                {ACCENT_OPTIONS.map((opt) => (
                  <button
                    key={opt.color}
                    onClick={() => { onAccentChange(opt.color); setAccentOpen(false); }}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  >
                    <span
                      className="w-5 h-5 rounded-full transition-transform group-hover:scale-110"
                      style={{
                        backgroundColor: opt.color,
                        outline: accent === opt.color ? `2px solid ${opt.color}` : "none",
                        outlineOffset: "2px",
                      }}
                    />
                    <span className="text-xs whitespace-nowrap" style={{ ...MONO, color: "var(--mr-text-muted)" }}>{opt.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={onToggle}
            className="text-sm mr-btn-toggle rounded-lg px-3 py-1"
            style={MONO}
          >
            {dark ? "[ light_ ]" : "[ dark_ ]"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 rounded-full transition-transform" style={{ background: "var(--mr-text-primary)", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span className="block w-6 h-0.5 rounded-full transition-opacity" style={{ background: "var(--mr-text-primary)", opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-0.5 rounded-full transition-transform" style={{ background: "var(--mr-text-primary)", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t" style={{ background: "var(--mr-bg-page)", borderColor: "var(--mr-border-default)" }}>
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4 flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="py-3 text-lg font-medium mr-link-nav"
                style={MONO}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="pt-16 pb-16 md:pt-24 md:pb-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="max-w-3xl">
          <h1
            className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[1.15] tracking-tight"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Your codebase isn&rsquo;t ready for AI. This tells you exactly why.
          </h1>
          <p
            className="text-[17px] leading-[1.6] mt-6"
            style={{ color: "var(--mr-text-muted)" }}
          >
            31 questions. 15 minutes. A specific, honest picture of what needs to be true before AI coding tools will actually work in your environment. Open source. No login. No data leaves your machine.
          </p>
          <div className="mt-8">
            <PrimaryButton>Get Trailhead on GitHub_</PrimaryButton>
          </div>
          <a
            href="#"
            className="inline-block text-[17px] mt-4"
            style={{ ...MONO, color: "var(--mr-text-muted)", textDecoration: "underline" }}
          >
            See a sample report &rarr;
          </a>
        </div>
        <div
          className="mt-12 md:mt-16 aspect-[16/9] rounded-[var(--mr-radius-sm)] flex items-center justify-center"
          style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
        >
          <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>Hero image placeholder</span>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
            <div className="md:col-span-4">
              <SectionLabel>// 01 &mdash; THE_PROBLEM</SectionLabel>
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 md:mt-12" style={{ color: "var(--mr-text-primary)" }}>
                AI tools don&rsquo;t fail because they&rsquo;re bad. They fail because the foundations aren&rsquo;t there.
              </h2>
            </div>
            <div className="md:col-start-6 md:col-span-7 flex flex-col gap-6 mt-6 md:mt-0">
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                You&rsquo;re under pressure to adopt Copilot, Cursor, Claude Code&nbsp;&mdash; pick your flavor. But rolling AI tools out on a codebase that lacks test coverage, documentation standards, or security review processes doesn&rsquo;t make your team faster. It makes your existing gaps worse, faster.
              </p>
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                The pattern is predictable: AI-generated code that nobody can confidently verify. Tech debt that compounds at machine speed. Security risks that go unreviewed because the review process wasn&rsquo;t designed for AI-generated output. And leadership wondering why the productivity gains never showed up.
              </p>
              <p className="text-xl font-medium leading-[1.6] mt-8" style={{ color: "var(--mr-text-primary)" }}>
                The tools aren&rsquo;t the problem. The foundations are.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatThisIsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
            <div className="md:col-span-4">
              <SectionLabel>// 02 &mdash; WHAT_THIS_IS</SectionLabel>
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 md:mt-12" style={{ color: "var(--mr-text-primary)" }}>
                A diagnostic, not a pitch.
              </h2>
            </div>
            <div className="md:col-start-6 md:col-span-7 flex flex-col gap-6 mt-6 md:mt-0">
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                Trailhead is a self-assessment your engineering team runs internally. 31 questions across four dimensions&nbsp;&mdash; Artifacts, Process, Tooling, and Culture&nbsp;&mdash; designed to surface the specific gaps that would undermine AI tool adoption in your environment.
              </p>
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                You&rsquo;ll get scores by area with clear ratings. You&rsquo;ll see where you&rsquo;re strong, where you&rsquo;re developing, and where the foundations need work. &ldquo;Not sure&rdquo; answers get flagged separately&nbsp;&mdash; because the things you can&rsquo;t see are usually the things that hurt you.
              </p>
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                It runs locally. No data is sent anywhere. The methodology is open source. You keep everything.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {SPEC_ITEMS.map((item) => (
              <div
                key={item.title}
                className="rounded-[var(--mr-radius-md)] p-6"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>{item.title}</h3>
                <p className="text-[17px] leading-[1.6] mt-2" style={{ color: "var(--mr-text-muted)" }}>{item.desc}</p>
                <a
                  href="#"
                  className="inline-block text-sm mt-4"
                  style={{ ...MONO, color: "var(--accent)" }}
                >
                  Learn more &rarr;
                </a>
                <div
                  className="aspect-[4/3] rounded-[var(--mr-radius-sm)] flex items-center justify-center mt-6"
                  style={{ background: "var(--mr-bg-button-primary)" }}
                >
                  <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>Image placeholder</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoItsForSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 03 &mdash; WHO_ITS_FOR</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 md:mt-12" style={{ color: "var(--mr-text-primary)" }}>
            For the people who have to make the call.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-16">
            {PERSONAS.map((p) => (
              <div
                key={p.title}
                className="rounded-[var(--mr-radius-md)] p-6"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>{p.title}</h3>
                <p className="text-[17px] leading-[1.6] mt-3" style={{ color: "var(--mr-text-muted)" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 04 &mdash; HOW_IT_WORKS</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 md:mt-12" style={{ color: "var(--mr-text-primary)" }}>
            Download to results in 15 minutes.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-12 md:gap-y-20 mt-10 md:mt-16">
            {STEPS.map((step) => (
              <div key={step.num} className="pt-8" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
                <span className="text-lg font-medium block mb-3" style={{ ...MONO, color: "var(--mr-text-primary)" }}>
                  ({step.num})
                </span>
                <h3 className="text-lg font-medium mb-4" style={{ color: "var(--mr-text-primary)" }}>{step.title}</h3>
                <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatItCoversSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 05 &mdash; WHAT_IT_COVERS</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 md:mt-12" style={{ color: "var(--mr-text-primary)" }}>
            Four dimensions. Thirteen areas.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 md:mt-16">
            {DIMENSIONS.map((dim) => (
              <div
                key={dim.title}
                className="rounded-[var(--mr-radius-md)] p-6"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>{dim.title}</h3>
                <p className="text-[17px] leading-[1.6] mt-1" style={{ color: "var(--mr-text-muted)" }}>{dim.subtitle}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {dim.areas.map((area) => (
                    <span
                      key={area}
                      className="text-sm px-3 py-1 rounded-[var(--mr-radius-sm)]"
                      style={{ ...MONO, background: "var(--mr-bg-button-primary)", color: "var(--mr-text-primary)" }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TransparencySection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6">
            <div className="md:col-span-4">
              <SectionLabel>// 06 &mdash; TRANSPARENCY</SectionLabel>
              <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 md:mt-12" style={{ color: "var(--mr-text-primary)" }}>
                See exactly how we think.
              </h2>
            </div>
            <div className="md:col-start-6 md:col-span-7 flex flex-col gap-6 mt-6 md:mt-0">
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                Trailhead is open source because readiness assessment shouldn&rsquo;t be a black box&nbsp;&mdash; especially one built by a consulting firm.
              </p>
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                You can read every question. You can see how scoring works. You can fork it and adapt it to your context. It runs entirely in your environment. No data is sent anywhere. No account is needed.
              </p>
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                We built this because we kept seeing the same pattern: teams investing in AI tools before the foundations were ready, then blaming the tools when adoption stalled. This is our way of making the diagnosis accessible to everyone&nbsp;&mdash; not just our clients.
              </p>
              <div className="mt-12 pt-12" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
                <p className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                  Expectations, set correctly.
                </p>
                <div className="flex flex-col gap-6 mt-6">
                  <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                    This is not a maturity model. It won&rsquo;t tell you you&rsquo;re &ldquo;Level 3.&rdquo; It&rsquo;s not a compliance checklist. It doesn&rsquo;t scan your codebase and produce a magic number.
                  </p>
                  <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                    It&rsquo;s a structured self-assessment. The value is in honest answers and the conversations they start.
                  </p>
                  <p className="text-xl font-medium leading-[1.6] mt-2" style={{ color: "var(--mr-text-primary)" }}>
                    A team that scores 40% and knows exactly where their gaps are is in a stronger position than a team that scores 80% by being generous with themselves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuiltBySection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 07 &mdash; BUILT_BY</SectionLabel>
          <div
            className="rounded-[var(--mr-radius-sm)] p-6 md:p-8 mt-10 md:mt-16"
            style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
              <div className="md:col-span-2 flex flex-col justify-center">
                <h3 className="text-2xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                  Same framework we use with clients. Free.
                </h3>
                <p className="text-[17px] leading-[1.6] mt-4" style={{ color: "var(--mr-text-muted)" }}>
                  Many Roads AI helps Series B&ndash;D technology companies get real productivity from AI coding tools. We work with teams where the tools have already been adopted but aren&rsquo;t delivering&nbsp;&mdash; legacy codebases, missing foundations, organizational friction.
                </p>
                <p className="text-[17px] leading-[1.6] mt-4" style={{ color: "var(--mr-text-muted)" }}>
                  Trailhead is the diagnostic framework we use in every engagement. We&rsquo;re releasing it as an open-source tool because the diagnosis shouldn&rsquo;t require a consulting contract. If your results surface gaps you want help closing, that&rsquo;s where Wayfinder comes in.
                </p>
                <a
                  href="#"
                  className="inline-block text-sm mt-4"
                  style={{ ...MONO, color: "var(--accent)" }}
                >
                  Learn more about Wayfinder &rarr;
                </a>
              </div>
              <div
                className="md:col-span-3 aspect-[16/9] rounded-[var(--mr-radius-sm)] flex items-center justify-center"
                style={{ background: "var(--mr-bg-button-primary)" }}
              >
                <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>Image placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 08 &mdash; FAQ</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 md:mt-12" style={{ color: "var(--mr-text-primary)" }}>
            Frequently asked questions.
          </h2>
          <div className="flex flex-col gap-4 mt-10 md:mt-16">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.q}
                className="rounded-[var(--mr-radius-md)] p-6"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                <h3 className="text-lg font-medium" style={{ color: "var(--mr-text-primary)" }}>{item.q}</h3>
                <p className="text-[17px] leading-[1.6] mt-3" style={{ color: "var(--mr-text-muted)" }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 text-center">
        <h2
          className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[1.15] tracking-tight"
          style={{ color: "var(--mr-text-primary)" }}
        >
          Find your gaps before your AI tools find them for you.
        </h2>
        <p
          className="text-[17px] leading-[1.6] mt-6 max-w-2xl mx-auto"
          style={{ color: "var(--mr-text-muted)" }}
        >
          31 questions. 15 minutes. The clearest picture of AI readiness your team has ever had.
        </p>
        <div className="mt-8">
          <PrimaryButton>Get Trailhead on GitHub_</PrimaryButton>
        </div>
        <a
          href="#"
          className="inline-block text-[17px] mt-4"
          style={{ ...MONO, color: "var(--mr-text-muted)", textDecoration: "underline" }}
        >
          Questions? Talk to our team &rarr;
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 md:py-20 lg:py-24" style={{ background: "var(--mr-footer-bg)", color: "var(--mr-footer-text)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-sm font-medium mb-4" style={{ ...MONO, color: "var(--mr-footer-sub)" }}>{col.heading}</p>
              <div className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-sm mr-link-footer"
                    style={MONO}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 md:mt-16 lg:mt-24 pt-8" style={{ borderTop: "1px solid var(--mr-footer-divider)" }}>
          <p className="text-sm" style={{ ...MONO, color: "var(--mr-footer-sub)" }}>
            &copy; 2026 Many Roads AI. All rights reserved.
          </p>
        </div>
        <div className="mt-12 md:mt-16 lg:mt-24">
          <p className="text-[clamp(80px,15vw,200px)] font-medium leading-none tracking-tight">
            MANYROADS
          </p>
        </div>
      </div>
    </footer>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export default function Trailhead2Page() {
  const systemDark = useSyncExternalStore(
    (cb) => { const mq = window.matchMedia("(prefers-color-scheme: dark)"); mq.addEventListener("change", cb); return () => mq.removeEventListener("change", cb); },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );
  const [darkOverride, setDarkOverride] = useState(null);
  const dark = darkOverride ?? systemDark;

  const [accent, setAccent] = useState("#4F769A");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [dark]);

  return (
    <div
      className="min-h-screen transition-colors overflow-x-hidden"
      style={{
        fontFamily: '"Geist Sans", sans-serif',
        "--accent": accent,
        "--accent-hover": darkenColor(accent),
        background: "var(--mr-bg-page)",
      }}
    >
      <Navbar dark={dark} onToggle={() => setDarkOverride(!dark)} accent={accent} onAccentChange={setAccent} />
      <main>
        <HeroSection />
        <ProblemSection />
        <WhatThisIsSection />
        <WhoItsForSection />
        <HowItWorksSection />
        <WhatItCoversSection />
        <TransparencySection />
        <BuiltBySection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
