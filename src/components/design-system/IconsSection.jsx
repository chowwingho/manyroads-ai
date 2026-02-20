import CodeBlock from "./CodeBlock";

const MONO = { fontFamily: '"Geist Mono", monospace' };

const ICON_SPECS = [
  { property: "Default size", value: "20px" },
  { property: "Nav/UI size", value: "16px" },
  { property: "Stroke weight", value: "1.5px" },
  { property: "Color", value: "inherits currentColor" },
];

const CURRENT_USAGE = [
  "Dark mode toggle (sun/moon concept)",
  "LinkedIn external links (\u2197 arrow entity)",
  "CTA trailing cursor (blinking underscore animation)",
];

const ICON_RULES = [
  "Icons are functional, not decorative. Every icon must serve a clear UI purpose.",
  "No filled icons \u2014 stroke only, matching the minimal line aesthetic.",
  "Align icons vertically with adjacent text using flex centering.",
];

export default function IconsSection() {
  return (
    <section id="icons" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        {/* Section header */}
        <span
          className="text-lg font-medium block mb-2"
          style={{ ...MONO, color: "var(--mr-text-primary)" }}
        >
          <span style={{ color: "#4F769A" }}>//</span> ICONS
        </span>
        <h2
          className="text-[36px] font-medium leading-[1.2] tracking-tight mb-3"
          style={{ color: "var(--mr-text-primary)" }}
        >
          Icons
        </h2>
        <p
          className="text-[17px] leading-[1.6] max-w-[560px] mb-12"
          style={{ color: "var(--mr-text-muted)" }}
        >
          Minimal icon usage. Stroke-only icons that inherit text color and
          serve clear functional purposes.
        </p>

        {/* Recommended Library */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            RECOMMENDED LIBRARY
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <span
              className="text-[17px] font-medium block mb-2"
              style={{ color: "var(--mr-text-primary)" }}
            >
              Lucide React
            </span>
            <p
              className="text-[15px] leading-[1.6] mb-4"
              style={{ color: "var(--mr-text-muted)" }}
            >
              Fits the developer-native aesthetic. Consistent stroke weight,
              clean geometry, tree-shakeable imports.
            </p>
            <span
              className="text-[13px] italic"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Not yet installed &mdash; recommended for future use
            </span>
          </div>
        </div>

        {/* Icon Specifications */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            SPECIFICATIONS
          </span>
          <div className="flex flex-col">
            {ICON_SPECS.map((spec) => (
              <div
                key={spec.property}
                className="flex items-baseline justify-between py-3"
                style={{
                  borderTop: "1px solid var(--mr-border-default)",
                }}
              >
                <span
                  className="text-[13px] font-medium"
                  style={{ ...MONO, color: "var(--mr-text-primary)" }}
                >
                  {spec.property}
                </span>
                <span
                  className="text-[13px]"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current V2 Usage */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-4"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            CURRENT V2 USAGE
          </span>
          <div className="flex flex-col gap-3">
            {CURRENT_USAGE.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="text-[14px] mt-0.5 flex-shrink-0"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  &mdash;
                </span>
                <span
                  className="text-[15px] leading-[1.5]"
                  style={{ color: "var(--mr-text-muted)" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div className="mb-8">
          <span
            className="text-[14px] font-medium block mb-4"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            RULES
          </span>
          <div className="flex flex-col gap-3 mb-6">
            {ICON_RULES.map((rule, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className="text-[14px] mt-0.5 flex-shrink-0"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  &mdash;
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
          <CodeBlock>
{`import { Sun, Moon, ArrowRight, ExternalLink } from 'lucide-react';
// Default: size={20} strokeWidth={1.5}
// Nav/UI: size={16}`}
          </CodeBlock>
        </div>
      </div>
    </section>
  );
}
