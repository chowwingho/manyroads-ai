import CodeBlock from "./CodeBlock";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

const FONT_FAMILIES = [
  {
    token: "--mr-font-display",
    name: "Geist Sans",
    usage: "Headings, hero text",
    style: { fontFamily: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    declaration: `font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`,
  },
  {
    token: "--mr-font-body",
    name: "Geist Sans",
    usage: "Body copy, descriptions",
    style: { fontFamily: "'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    declaration: `font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`,
  },
  {
    token: "--mr-font-mono",
    name: "Geist Mono",
    usage: "Nav, section markers, buttons, badges, code",
    style: { fontFamily: "'Geist Mono', 'SF Mono', 'Fira Code', 'Fira Mono', monospace" },
    declaration: `font-family: 'Geist Mono', 'SF Mono', 'Fira Code', 'Fira Mono', monospace;`,
  },
];

const TYPE_SCALE = [
  {
    level: "Hero Headline",
    size: "56px",
    weight: 500,
    lineHeight: 1.2,
    font: "display",
    fontStyle: { fontFamily: '"Geist Sans", sans-serif' },
    example: "You bought your team AI tools.",
    tailwind: "text-[56px] font-medium leading-[1.2] tracking-tight",
  },
  {
    level: "Section Heading",
    size: "36px",
    weight: 500,
    lineHeight: 1.2,
    font: "display",
    fontStyle: { fontFamily: '"Geist Sans", sans-serif' },
    example: "Two Pathways Into AI",
    tailwind: "text-[36px] font-medium leading-[1.2]",
  },
  {
    level: "Card Heading",
    size: "24px",
    weight: 500,
    lineHeight: 1.3,
    font: "display",
    fontStyle: { fontFamily: '"Geist Sans", sans-serif' },
    example: "Trailhead",
    tailwind: "text-2xl font-medium",
  },
  {
    level: "Body",
    size: "17px",
    weight: 400,
    lineHeight: 1.6,
    font: "body",
    fontStyle: { fontFamily: '"Geist Sans", sans-serif' },
    example: "We help engineering teams adopt AI tools in a way that actually sticks — with structure, not just enthusiasm.",
    tailwind: "text-[17px] leading-[1.6]",
  },
  {
    level: "Small / Muted",
    size: "14px",
    weight: 400,
    lineHeight: 1.5,
    font: "body",
    fontStyle: { fontFamily: '"Geist Sans", sans-serif' },
    example: "LinkedIn ↗",
    tailwind: "text-sm",
  },
  {
    level: "Section Marker",
    size: "18px",
    weight: 500,
    lineHeight: 1.4,
    font: "mono",
    fontStyle: MONO,
    example: "// 01 — THE_PROBLEM",
    tailwind: "text-lg font-medium",
  },
];

const TYPOGRAPHY_RULES = [
  "Always left-aligned. Never centered.",
  "Section markers use UPPER_SNAKE_CASE with trailing underscore convention.",
  "Monospace for UI chrome (nav, buttons, badges, labels). Sans for content.",
  "Body line-height is generous (1.6) — readability over density.",
];

export default function TypographySection() {
  return (
    <section id="typography" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        <SectionHeader
          marker="TYPOGRAPHY"
          title="Typography"
          description="Three font families, one strict type scale. Geist Sans handles all content; Geist Mono handles all UI chrome."
        />

        {/* Font Family Declarations */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            FONT FAMILIES
          </span>
          <div className="flex flex-col gap-6">
            {FONT_FAMILIES.map((ff) => (
              <div
                key={ff.token}
                className="rounded-xl p-8"
                style={{
                  background: "var(--mr-bg-card)",
                  border: "1px solid var(--mr-border-default)",
                }}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span
                    className="text-[17px] font-medium"
                    style={{ color: "var(--mr-text-primary)" }}
                  >
                    {ff.name}
                  </span>
                  <span
                    className="text-[13px]"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    {ff.usage}
                  </span>
                </div>

                <CodeBlock>{ff.token}: {ff.declaration}</CodeBlock>

                <p
                  className="text-[18px] leading-[1.6] mt-4 mb-3"
                  style={{ ...ff.style, color: "var(--mr-text-primary)" }}
                >
                  The quick brown fox jumps over the lazy dog. 0123456789
                </p>

                <span
                  className="text-[12px]"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  Bundled via npm package <code>geist</code>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Type Scale */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            TYPE SCALE
          </span>
          <div className="flex flex-col">
            {TYPE_SCALE.map((level) => (
              <div
                key={level.level}
                className="py-6"
                style={{
                  borderTop: "1px solid var(--mr-border-default)",
                }}
              >
                {/* Live rendered example */}
                <p
                  style={{
                    fontSize: level.size,
                    fontWeight: level.weight,
                    lineHeight: level.lineHeight,
                    ...level.fontStyle,
                    color: "var(--mr-text-primary)",
                  }}
                >
                  {level.font === "mono" && level.example.startsWith("//") ? (
                    <>
                      <span style={{ color: "var(--mr-accent-default)" }}>//</span>
                      {level.example.slice(2)}
                    </>
                  ) : (
                    level.example
                  )}
                </p>

                {/* Spec row */}
                <div
                  className="flex gap-6 mt-3"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  <span className="text-[12px]">{level.level}</span>
                  <span className="text-[12px]">{level.size}</span>
                  <span className="text-[12px]">weight {level.weight}</span>
                  <span className="text-[12px]">line-height {level.lineHeight}</span>
                  <span className="text-[12px]">--mr-font-{level.font}</span>
                  <span className="text-[12px] opacity-60">{level.tailwind}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Rules */}
        <div>
          <span
            className="text-[14px] font-medium block mb-4"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            RULES
          </span>
          <div className="flex flex-col gap-3">
            {TYPOGRAPHY_RULES.map((rule, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="text-[14px] mt-0.5 flex-shrink-0"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  —
                </span>
                <span
                  className="text-[15px] leading-[1.5]"
                  style={{ color: "var(--mr-text-muted)" }}
                >
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
