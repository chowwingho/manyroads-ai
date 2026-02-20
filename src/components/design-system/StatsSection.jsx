import CodeBlock from "./CodeBlock";

const MONO = { fontFamily: '"Geist Mono", monospace' };

const STATS = [
  {
    value: "73%",
    label: "Unmet expectations",
    desc: "Of engineering teams report AI tool adoption hasn\u2019t met productivity expectations.",
  },
  {
    value: "6\u201312mo",
    label: "Delayed recognition",
    desc: "Typical time before engineering leaders realize AI tools are underperforming.",
  },
  {
    value: "80/20",
    label: "The adoption gap",
    desc: "Gap between reported adoption rates and actual productive usage.",
  },
  {
    value: "0",
    label: "Pre-configured tools",
    desc: "Number of AI coding tools that ship configured for your codebase.",
  },
];

const STATS_SPECS = [
  { element: "Layout", value: "grid-cols-12, col-span-3, gap-x-6" },
  { element: "Value", value: "text-5xl (48px), font-medium, tracking-tight" },
  { element: "Label", value: "text-xl (20px), font-medium" },
  { element: "Description", value: "text-[17px], leading-[1.6], --mr-text-muted" },
  { element: "Font", value: "Geist Sans (all elements)" },
];

export default function StatsSection() {
  return (
    <section id="stats-row" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        {/* Section header */}
        <span
          className="text-lg font-medium block mb-2"
          style={{ ...MONO, color: "var(--mr-text-primary)" }}
        >
          <span style={{ color: "#4F769A" }}>//</span> STATS_ROW
        </span>
        <h2
          className="text-[36px] font-medium leading-[1.2] tracking-tight mb-3"
          style={{ color: "var(--mr-text-primary)" }}
        >
          Stats Row
        </h2>
        <p
          className="text-[17px] leading-[1.6] max-w-[560px] mb-12"
          style={{ color: "var(--mr-text-muted)" }}
        >
          A 4-up horizontal layout for key statistics. Large numbers create
          visual impact; descriptions provide context.
        </p>

        {/* Miniature recreation */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            LIVE EXAMPLE
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <div className="grid grid-cols-12 gap-x-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="col-span-3">
                  <p
                    className="text-5xl font-medium tracking-tight"
                    style={{ color: "var(--mr-text-primary)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xl font-medium mb-2"
                    style={{ color: "var(--mr-text-primary)" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-[17px] leading-[1.6]"
                    style={{ color: "var(--mr-text-muted)" }}
                  >
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="mb-8">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            SPECIFICATIONS
          </span>
          <div className="flex flex-col mb-6">
            {STATS_SPECS.map((spec) => (
              <div
                key={spec.element}
                className="flex items-baseline justify-between py-2.5"
                style={{
                  borderTop: "1px solid var(--mr-border-default)",
                }}
              >
                <span
                  className="text-[13px] font-medium"
                  style={{ ...MONO, color: "var(--mr-text-primary)" }}
                >
                  {spec.element}
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
          <CodeBlock>
{`/* Stats Row Layout */
display: grid;
grid-template-columns: repeat(12, 1fr);
gap: 0 var(--mr-grid-gutter); /* 24px horizontal */

/* Each stat: col-span-3 (4 stats across 12 cols) */
.stat { grid-column: span 3; }
.stat-value { font-size: 48px; font-weight: 500; letter-spacing: -0.025em; }
.stat-label { font-size: 20px; font-weight: 500; }
.stat-desc  { font-size: 17px; line-height: 1.6; color: var(--mr-text-muted); }`}
          </CodeBlock>
        </div>
      </div>
    </section>
  );
}
