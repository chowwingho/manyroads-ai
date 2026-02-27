'use client'
// Trailhead Page — Phase 1+2+3 — 2026-02-26
import { useState, useEffect, useRef } from "react";

// =============================================================================
// DATA
// =============================================================================
const NAV_LINKS = ["Features", "Pricing", "About", "Contact"];

const LOGO_COMPANIES = [
  "Stripe", "OpenAI", "Linear", "Datadog",
  "NVIDIA", "Figma", "Ramp", "Adobe",
];

const SHOWCASE_FEATURES = [
  {
    title: "Agents turn ideas into code",
    subtitle: "Accelerate development by handing off tasks to Cursor, while you focus on making decisions.",
    link: "Learn about agentic development \u2192",
  },
  {
    title: "Magically accurate autocomplete",
    subtitle: "Our specialized Tab model predicts your next action with striking speed and precision.",
    link: "Learn about Tab \u2192",
  },
  {
    title: "In every tool, at every step",
    subtitle: "Cursor reviews your PRs in GitHub, collaborates in Slack, and runs in your terminal.",
    link: "Learn about Cursor\u2019s surfaces \u2192",
  },
];

const FEATURES_2 = [
  { title: "Multiple models", desc: "Subagents run in parallel to explore your codebase, with each one using the best model for the task." },
  { title: "Codebase indexing", desc: "A custom embedding model gives agents best-in-class recall across large codebases." },
  { title: "Team rules", desc: "Teach Cursor your preferences, from team conventions to specific architectural decisions." },
];

const FEATURES_3 = [
  { title: "Plan", desc: "For complex tasks, Cursor asks clarifying questions, builds a plan, then executes in the background." },
  { title: "Design", desc: "Visually edit any page by selecting an element to instantly rewrite, resize, or move it." },
  { title: "Debug", desc: "Cursor instruments your code and uses real execution data to pinpoint the fix." },
];

const TESTIMONIALS = [
  { quote: "Cursor is by far the best AI coding tool I\u2019ve ever used. It\u2019s not even close.", name: "Diana Hu", role: "YC Partner" },
  { quote: "Cursor is one of those rare tools that fundamentally changes how you work.", name: "Jensen Huang", role: "CEO, NVIDIA" },
  { quote: "Cursor is the way to write code now. It\u2019s absolutely incredible.", name: "Andrej Karpathy", role: "AI Researcher" },
  { quote: "We\u2019ve been using Cursor across our entire engineering team and it\u2019s been transformative.", name: "Patrick Collison", role: "CEO, Stripe" },
  { quote: "Cursor makes me mass-produce code at a mass-production pace.", name: "shadcn", role: "Creator of shadcn/ui" },
  { quote: "The best developer tool I\u2019ve tried in years. The AI integration is seamless.", name: "Greg Brockman", role: "Co-founder, OpenAI" },
];

const FEATURES_4 = [
  { title: "Use the best model for every task", desc: "Choose between every cutting-edge model from OpenAI, Anthropic, Gemini, xAI, and Cursor.", link: "Explore models \u2197" },
  { title: "Complete codebase understanding", desc: "Cursor learns how your codebase works, no matter the scale or complexity.", link: "Learn about codebase indexing \u2197" },
  { title: "Develop enduring software", desc: "Trusted by over half of the Fortune 500 to accelerate development, securely and at scale.", link: "Explore enterprise \u2192" },
];

const CHANGELOG_ENTRIES = [
  { title: "Cloud Agents with Computer Use", date: "Feb 24, 2026" },
  { title: "CLI Improvements and Mermaid ASCII Diagrams", date: "Feb 18, 2026" },
  { title: "Plugins, Sandbox Access Controls, and Async Subagents", date: "Feb 17, 2026", badge: "2.5" },
  { title: "Long-running Agents in Research Preview", date: "Feb 12, 2026" },
];

const HIGHLIGHTS = [
  { title: "Towards self-driving codebases", category: "Research", date: "Feb 5, 2026" },
  { title: "Salesforce ships higher-quality code across 20,000 developers with Cursor", category: "Customers", date: "Jan 21, 2026" },
  { title: "Best practices for coding with agents", category: "Product", date: "Jan 9, 2026" },
];

const FOOTER_COLUMNS = [
  { heading: "Product", links: ["Features", "Pricing", "Enterprise", "Changelog", "Download"] },
  { heading: "Resources", links: ["Documentation", "API Reference", "Community", "Blog", "Status"] },
  { heading: "Company", links: ["About", "Careers", "Press", "Contact"] },
  { heading: "Legal", links: ["Privacy", "Terms", "Security", "Cookies"] },
  { heading: "Connect", links: ["Twitter", "GitHub", "Discord", "LinkedIn", "YouTube"] },
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

function FeatureCard({ title, desc, link }) {
  return (
    <div
      className="rounded-[var(--mr-radius-md)] p-6"
      style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
    >
      <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>{title}</h3>
      <p className="text-[17px] leading-[1.6] mt-2" style={{ color: "var(--mr-text-muted)" }}>{desc}</p>
      <a
        href="#"
        className="inline-block text-sm mt-4"
        style={{ ...MONO, color: "var(--mr-accent-default)" }}
      >
        {link || "Learn more \u2192"}
      </a>
      <div
        className="mt-6 aspect-[4/3] rounded-[var(--mr-radius-sm)] flex items-center justify-center"
        style={{ background: "var(--mr-bg-button-primary)" }}
      >
        <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>Image placeholder</span>
      </div>
    </div>
  );
}

function TestimonialCard({ quote, name, role }) {
  return (
    <div
      className="rounded-[var(--mr-radius-md)] p-6 flex flex-col"
      style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
    >
      <p className="text-[17px] leading-[1.6] mb-6 flex-1" style={{ color: "var(--mr-text-primary)" }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-[var(--mr-radius-sm)] shrink-0"
          style={{ background: "var(--mr-bg-button-primary)" }}
        />
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--mr-text-primary)" }}>{name}</p>
          <p className="text-sm" style={{ color: "var(--mr-text-muted)" }}>{role}</p>
        </div>
      </div>
    </div>
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
        <a href="/trailhead" className="text-lg font-medium tracking-wide" style={{ ...MONO, color: "var(--mr-text-primary)", textDecoration: "none" }}>Many_Roads &lt;AI&gt;</a>
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
            className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[1.15] tracking-tight mb-8"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Built to make you extraordinarily productive, Cursor is the best way to code with AI.
          </h1>
          <PrimaryButton>Download for Windows_</PrimaryButton>
        </div>
        <div
          className="mt-12 md:mt-16 w-full aspect-[16/9] rounded-[var(--mr-radius-sm)] flex items-center justify-center"
          style={{
            background: "var(--mr-bg-card)",
            border: "1px solid var(--mr-border-default)",
          }}
        >
          <span className="text-[17px]" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
            Hero image placeholder
          </span>
        </div>
      </div>
    </section>
  );
}

function LogoBar() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <p
          className="text-[17px] text-center mb-10 md:mb-12"
          style={{ color: "var(--mr-text-muted)" }}
        >
          Trusted every day by teams that build world-class software
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {LOGO_COMPANIES.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center h-[100px] rounded-[var(--mr-radius-sm)]"
              style={{
                background: "var(--mr-bg-card)",
                border: "1px solid var(--mr-border-default)",
              }}
            >
              <span className="text-sm font-medium" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureShowcase() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 01 &mdash; FEATURES</SectionLabel>
          <div className="flex flex-col gap-6 md:gap-8 mt-10 md:mt-16">
            {SHOWCASE_FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="rounded-[var(--mr-radius-sm)] p-6 md:p-8"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-medium" style={{ color: "var(--mr-text-primary)" }}>{feature.title}</h3>
                    <p className="text-[17px] leading-[1.6] mt-3" style={{ color: "var(--mr-text-muted)" }}>{feature.subtitle}</p>
                    <a
                      href="#"
                      className="inline-block text-sm mt-4"
                      style={{ ...MONO, color: "var(--mr-accent-default)" }}
                    >
                      {feature.link}
                    </a>
                  </div>
                  <div
                    className={`aspect-[4/3] rounded-[var(--mr-radius-sm)] flex items-center justify-center${i % 2 === 1 ? " md:order-first" : ""}`}
                    style={{ background: "var(--mr-bg-button-primary)" }}
                  >
                    <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>Image placeholder</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Features2Section() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 02 &mdash; FEATURES_2</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4" style={{ color: "var(--mr-text-primary)" }}>
            Understands your codebase, no matter the size
          </h2>
          <p className="text-[17px] leading-[1.6] mt-4" style={{ color: "var(--mr-text-muted)" }}>
            Cursor deeply learns your codebase before writing a single line.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-16">
            {FEATURES_2.map((f) => (
              <FeatureCard key={f.title} title={f.title} desc={f.desc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Features3Section() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 03 &mdash; FEATURES_3</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4" style={{ color: "var(--mr-text-primary)" }}>
            Spans the full development lifecycle
          </h2>
          <p className="text-[17px] leading-[1.6] mt-4" style={{ color: "var(--mr-text-muted)" }}>
            Cursor supports every phase from planning to writing to reviewing code.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-16">
            {FEATURES_3.map((f) => (
              <FeatureCard key={f.title} title={f.title} desc={f.desc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 04 &mdash; TESTIMONIALS</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4 text-center" style={{ color: "var(--mr-text-primary)" }}>
            The new way to build software.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-16">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.name} quote={t.quote} name={t.name} role={t.role} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Features4Section() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 05 &mdash; FEATURES_4</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4" style={{ color: "var(--mr-text-primary)" }}>
            Stay on the frontier
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 md:mt-16">
            {FEATURES_4.map((f) => (
              <FeatureCard key={f.title} title={f.title} desc={f.desc} link={f.link} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChangelogSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 06 &mdash; CHANGELOG</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4" style={{ color: "var(--mr-text-primary)" }}>
            Changelog
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 md:mt-16">
            {CHANGELOG_ENTRIES.map((entry) => (
              <div
                key={entry.title}
                className="rounded-[var(--mr-radius-md)] p-6"
                style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>{entry.date}</span>
                  {entry.badge && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-[var(--mr-radius-sm)]"
                      style={{ ...MONO, background: "var(--mr-bg-button-primary)", color: "var(--mr-text-primary)" }}
                    >
                      {entry.badge}
                    </span>
                  )}
                </div>
                <p className="text-[17px] font-medium mt-2" style={{ color: "var(--mr-text-primary)" }}>{entry.title}</p>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="inline-block text-sm mt-8"
            style={{ ...MONO, color: "var(--mr-accent-default)" }}
          >
            See what&rsquo;s new in Cursor &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 07 &mdash; COMMUNITY</SectionLabel>
          <div
            className="rounded-[var(--mr-radius-sm)] p-6 md:p-8 mt-10 md:mt-16"
            style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
              <div className="md:col-span-2 flex flex-col justify-center">
                <h3 className="text-2xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
                  Many Roads &lt;AI&gt; is building a community focused on the future of AI-assisted development.
                </h3>
                <a
                  href="#"
                  className="inline-block text-sm mt-4"
                  style={{ ...MONO, color: "var(--mr-accent-default)" }}
                >
                  Join us &rarr;
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

function HighlightsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-32" style={{ background: "var(--mr-bg-card)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16 lg:pt-24" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 08 &mdash; HIGHLIGHTS</SectionLabel>
          <h2 className="text-2xl md:text-3xl lg:text-[36px] font-medium leading-[1.2] mt-4" style={{ color: "var(--mr-text-primary)" }}>
            Recent highlights
          </h2>
          <div className="flex flex-col gap-6 mt-10 md:mt-16">
            {HIGHLIGHTS.map((h) => (
              <div
                key={h.title}
                className="rounded-[var(--mr-radius-md)] p-6"
                style={{ background: "var(--mr-bg-card-elevated)", border: "1px solid var(--mr-border-default)" }}
              >
                <h3 className="text-xl font-medium" style={{ color: "var(--mr-text-primary)" }}>{h.title}</h3>
                <p className="text-sm mt-2" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                  {h.category} &middot; {h.date}
                </p>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="inline-block text-sm mt-8"
            style={{ ...MONO, color: "var(--mr-accent-default)" }}
          >
            View more posts &rarr;
          </a>
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
          className="text-3xl sm:text-4xl lg:text-[56px] font-medium leading-[1.15] tracking-tight mb-8"
          style={{ color: "var(--mr-text-primary)" }}
        >
          Try Cursor now.
        </h2>
        <PrimaryButton>Download for Windows_</PrimaryButton>
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
export default function TrailheadPage() {
  const [dark, setDark] = useState(false);
  const [accent, setAccent] = useState("#4F769A");

  // Read system preference after hydration to avoid SSR mismatch
  useEffect(() => {
    setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

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
      <Navbar dark={dark} onToggle={() => setDark(!dark)} accent={accent} onAccentChange={setAccent} />
      <main>
        <HeroSection />
        <LogoBar />
        <FeatureShowcase />
        <Features2Section />
        <Features3Section />
        <TestimonialsSection />
        <Features4Section />
        <ChangelogSection />
        <CommunitySection />
        <HighlightsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
