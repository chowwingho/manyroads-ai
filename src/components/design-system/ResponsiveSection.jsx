import CodeBlock from "./CodeBlock";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

const BREAKPOINTS = [
  { name: "sm", px: 640, label: "Mobile landscape" },
  { name: "md", px: 768, label: "Tablet" },
  { name: "lg", px: 1024, label: "Small desktop" },
  { name: "xl", px: 1280, label: "Desktop (design target)" },
];

const TYPE_SCALE = [
  { level: "Hero Headline", desktop: "48–56px", mobile: "32–36px", notes: "Must shrink significantly — 56px is unreadable on phones" },
  { level: "Section Heading", desktop: "32–36px", mobile: "24–28px", notes: "" },
  { level: "Card Heading", desktop: "20–24px", mobile: "18–20px", notes: "Minimal reduction" },
  { level: "Body", desktop: "16–18px", mobile: "16px", notes: "Already mobile-friendly" },
  { level: "Small / Muted", desktop: "14px", mobile: "14px", notes: "No change" },
  { level: "Section Marker", desktop: "12–14px", mobile: "12px", notes: "No change" },
];

const COMPONENT_REFLOWS = [
  {
    name: "Navbar",
    breakpoint: "< md",
    desktop: [3, 6, 3],
    desktopLabel: "Logo + links + toggle",
    mobile: [4, 1, 1],
    mobileLabel: "Logo + hamburger + toggle",
    note: "Nav links move into slide-out or dropdown menu",
  },
  {
    name: "Stats Row",
    breakpoint: "< md",
    desktop: [3, 3, 3, 3],
    desktopLabel: "4-up horizontal",
    mobile: [6, 6],
    mobileLabel: "2×2 at md, stack at sm",
    note: "grid-cols-4 → grid-cols-2 → grid-cols-1",
  },
  {
    name: "Pain Point Cards",
    breakpoint: "< md",
    desktop: [6, 6, 6, 6],
    desktopLabel: "2×2 grid",
    mobile: [12],
    mobileLabel: "Single column stack",
    note: "Each card full-width",
  },
  {
    name: "Pathway Cards",
    breakpoint: "< lg",
    desktop: [6, 6],
    desktopLabel: "Side-by-side",
    mobile: [12],
    mobileLabel: "Stacked vertically",
    note: "Each card full-width",
  },
  {
    name: "Team Section",
    breakpoint: "< md",
    desktop: [4, 4, 4],
    desktopLabel: "3-column bios",
    mobile: [12],
    mobileLabel: "Single column stack",
    note: "Tech badges may wrap — this is fine",
  },
  {
    name: "Footer",
    breakpoint: "< md",
    desktop: [4, 4, 4],
    desktopLabel: "3-column grid",
    mobile: [12],
    mobileLabel: "Single column stack",
    note: "Wordmark size reduces, CTAs stack vertically",
  },
];

const MARGIN_SCALE = [
  { breakpoint: "xl (≥ 1280px)", padding: "px-12 (48px)" },
  { breakpoint: "lg (≥ 1024px)", padding: "px-10 (40px)" },
  { breakpoint: "md (≥ 768px)", padding: "px-8 (32px)" },
  { breakpoint: "sm (≥ 640px)", padding: "px-6 (24px)" },
  { breakpoint: "Below sm", padding: "px-4 (16px)" },
];

const MAX_PX = 1400;

function BreakpointBar() {
  return (
    <div
      className="rounded-xl p-8"
      style={{
        background: "var(--mr-bg-card)",
        border: "1px solid var(--mr-border-default)",
      }}
    >
      {/* Visual bar */}
      <div
        className="relative h-14 mb-8 rounded-lg overflow-hidden"
        style={{
          background: "var(--mr-bg-page)",
          border: "1px dashed var(--mr-border-default)",
        }}
      >
        {BREAKPOINTS.map((bp, i) => (
          <div
            key={bp.name}
            className="absolute top-0 bottom-0 rounded-sm"
            style={{
              left: 0,
              width: `${(bp.px / MAX_PX) * 100}%`,
              background: "var(--mr-bg-button-pathway)",
              opacity: 0.2 + i * 0.2,
            }}
          />
        ))}
        {BREAKPOINTS.map((bp) => (
          <div
            key={bp.name}
            className="absolute top-0 bottom-0"
            style={{ left: `${(bp.px / MAX_PX) * 100}%` }}
          >
            <div
              className="w-px h-full"
              style={{ background: "var(--mr-text-muted)" }}
            />
          </div>
        ))}
        {/* Labels below the bar */}
      </div>
      <div className="relative h-5 mb-6">
        {BREAKPOINTS.map((bp) => (
          <span
            key={bp.name}
            className="absolute text-[11px] font-medium -translate-x-1/2"
            style={{
              ...MONO,
              left: `${(bp.px / MAX_PX) * 100}%`,
              color: "var(--mr-text-primary)",
            }}
          >
            {bp.name}
          </span>
        ))}
      </div>

      {/* Specs table */}
      <div className="flex flex-col">
        {BREAKPOINTS.map((bp) => (
          <div
            key={bp.name}
            className="flex items-baseline justify-between py-2.5"
            style={{ borderTop: "1px solid var(--mr-border-default)" }}
          >
            <span
              className="text-[13px] font-medium"
              style={{ ...MONO, color: "var(--mr-text-primary)" }}
            >
              {bp.name} ({bp.px}px)
            </span>
            <span
              className="text-[13px]"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              {bp.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReflowDiagram({ name, breakpoint, desktop, desktopLabel, mobile, mobileLabel, note }) {
  const isGrid = desktop.length === 4;
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: "var(--mr-bg-card)",
        border: "1px solid var(--mr-border-default)",
      }}
    >
      <div className="flex items-baseline justify-between mb-4">
        <span
          className="text-[13px] font-medium"
          style={{ ...MONO, color: "var(--mr-text-primary)" }}
        >
          {name.toUpperCase()}
        </span>
        <span
          className="text-[11px]"
          style={{ ...MONO, color: "var(--mr-text-muted)" }}
        >
          {breakpoint}
        </span>
      </div>

      {/* Desktop diagram */}
      <span
        className="text-[10px] uppercase tracking-wider block mb-1.5"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        Desktop
      </span>
      {isGrid ? (
        <div className="flex flex-col gap-1.5 mb-3">
          <div className="flex gap-1.5">
            {desktop.slice(0, 2).map((span, i) => (
              <div
                key={i}
                className="h-6 rounded"
                style={{
                  flex: span,
                  background: "var(--mr-bg-button-pathway)",
                }}
              />
            ))}
          </div>
          <div className="flex gap-1.5">
            {desktop.slice(2).map((span, i) => (
              <div
                key={i}
                className="h-6 rounded"
                style={{
                  flex: span,
                  background: "var(--mr-bg-button-pathway)",
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex gap-1.5 mb-3">
          {desktop.map((span, i) => (
            <div
              key={i}
              className="h-6 rounded"
              style={{
                flex: span,
                background: "var(--mr-bg-button-pathway)",
              }}
            />
          ))}
        </div>
      )}
      <span
        className="text-[10px] block mb-4"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        {desktopLabel}
      </span>

      {/* Arrow separator */}
      <div
        className="text-[10px] uppercase tracking-wider mb-3"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        ↓ Mobile
      </div>

      {/* Mobile diagram */}
      {mobile.length === 1 ? (
        <div className="flex flex-col gap-1.5 mb-3" style={{ maxWidth: "40%" }}>
          {desktop.length <= 2 ? (
            desktop.map((_, i) => (
              <div
                key={i}
                className="h-5 rounded"
                style={{ background: "var(--mr-bg-button-pathway)" }}
              />
            ))
          ) : (
            Array.from({ length: Math.min(desktop.length, 4) }).map((_, i) => (
              <div
                key={i}
                className="h-5 rounded"
                style={{ background: "var(--mr-bg-button-pathway)" }}
              />
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-1.5 mb-3" style={{ maxWidth: "60%" }}>
          <div className="flex gap-1.5">
            {mobile.map((span, i) => (
              <div
                key={i}
                className="h-5 rounded"
                style={{
                  flex: span,
                  background: "var(--mr-bg-button-pathway)",
                }}
              />
            ))}
          </div>
          <div className="flex gap-1.5">
            {mobile.map((span, i) => (
              <div
                key={i}
                className="h-5 rounded"
                style={{
                  flex: span,
                  background: "var(--mr-bg-button-pathway)",
                }}
              />
            ))}
          </div>
        </div>
      )}
      <span
        className="text-[10px] block mb-2"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        {mobileLabel}
      </span>

      <p
        className="text-[12px] leading-[1.5]"
        style={{ color: "var(--mr-text-muted)" }}
      >
        {note}
      </p>
    </div>
  );
}

export default function ResponsiveSection() {
  return (
    <section id="responsive" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        <SectionHeader
          marker="RESPONSIVE"
          title="Responsive Breakpoints"
          description="Breakpoint scale, type scale adaptation, and component reflow rules for taking V2 from desktop-only to fully responsive."
        />

        {/* Implementation Status Callout */}
        <div className="mb-16">
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
              borderLeft: "4px solid var(--mr-status-warning)",
            }}
          >
            <span
              className="text-[14px] font-medium block mb-3"
              style={{ ...MONO, color: "var(--mr-status-warning)" }}
            >
              DESKTOP ONLY
            </span>
            <p
              className="text-[17px] leading-[1.6] mb-2"
              style={{ color: "var(--mr-text-primary)" }}
            >
              V2 is currently desktop-only with a fixed{" "}
              <code
                className="text-[14px] px-1.5 py-0.5 rounded"
                style={{
                  ...MONO,
                  background: "var(--mr-bg-page)",
                  color: "var(--mr-text-primary)",
                }}
              >
                1280px
              </code>{" "}
              max-width container and{" "}
              <code
                className="text-[14px] px-1.5 py-0.5 rounded"
                style={{
                  ...MONO,
                  background: "var(--mr-bg-page)",
                  color: "var(--mr-text-primary)",
                }}
              >
                px-12
              </code>{" "}
              side margins. No responsive breakpoints are implemented yet.
            </p>
            <p
              className="text-[15px] leading-[1.6]"
              style={{ color: "var(--mr-text-muted)" }}
            >
              This section documents the intended responsive behavior as a
              specification for implementation. All specifications below are
              targets, not current behavior.
            </p>
          </div>
        </div>

        {/* Breakpoint Scale */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            BREAKPOINT SCALE
          </span>

          <BreakpointBar />

          <div className="mt-6">
            <CodeBlock>
{`/* Tailwind responsive prefixes */
@media (min-width: 640px)  { /* sm  — Mobile landscape  */ }
@media (min-width: 768px)  { /* md  — Tablet            */ }
@media (min-width: 1024px) { /* lg  — Small desktop     */ }
@media (min-width: 1280px) { /* xl  — Desktop (target)  */ }`}
            </CodeBlock>
          </div>
        </div>

        {/* Type Scale Adaptation */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            TYPE SCALE ADAPTATION
          </span>

          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <p
              className="text-[15px] leading-[1.6] mb-6"
              style={{ color: "var(--mr-text-muted)" }}
            >
              How the type scale should adapt below{" "}
              <code className="text-[13px]" style={MONO}>
                md (768px)
              </code>
              . Body text stays the same — only headings and display sizes
              reduce.
            </p>

            {/* Header row */}
            <div
              className="flex items-baseline py-2.5 mb-1"
              style={{
                borderBottom: "1px solid var(--mr-border-default)",
              }}
            >
              <span
                className="flex-1 text-[11px] uppercase tracking-wider"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Level
              </span>
              <span
                className="w-[120px] text-[11px] uppercase tracking-wider text-right"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Desktop
              </span>
              <span
                className="w-[120px] text-[11px] uppercase tracking-wider text-right"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Mobile
              </span>
              <span
                className="w-[280px] text-[11px] uppercase tracking-wider text-right"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Notes
              </span>
            </div>

            {/* Data rows */}
            {TYPE_SCALE.map((row) => (
              <div
                key={row.level}
                className="flex items-baseline py-2.5"
                style={{ borderTop: "1px solid var(--mr-border-default)" }}
              >
                <span
                  className="flex-1 text-[13px] font-medium"
                  style={{ ...MONO, color: "var(--mr-text-primary)" }}
                >
                  {row.level}
                </span>
                <span
                  className="w-[120px] text-[13px] text-right"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  {row.desktop}
                </span>
                <span
                  className="w-[120px] text-[13px] text-right"
                  style={{ ...MONO, color: "var(--mr-text-primary)" }}
                >
                  {row.mobile}
                </span>
                <span
                  className="w-[280px] text-[12px] text-right"
                  style={{ color: "var(--mr-text-muted)" }}
                >
                  {row.notes}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Component Reflow */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            COMPONENT REFLOW
          </span>
          <div className="grid grid-cols-2 gap-6">
            {COMPONENT_REFLOWS.map((r) => (
              <ReflowDiagram key={r.name} {...r} />
            ))}
          </div>
        </div>

        {/* Side Margins */}
        <div className="mb-8">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            SIDE MARGINS
          </span>

          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <div className="flex flex-col">
              {MARGIN_SCALE.map((row) => (
                <div
                  key={row.breakpoint}
                  className="flex items-baseline justify-between py-2.5"
                  style={{ borderTop: "1px solid var(--mr-border-default)" }}
                >
                  <span
                    className="text-[13px] font-medium"
                    style={{ ...MONO, color: "var(--mr-text-primary)" }}
                  >
                    {row.breakpoint}
                  </span>
                  <span
                    className="text-[13px]"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    {row.padding}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
