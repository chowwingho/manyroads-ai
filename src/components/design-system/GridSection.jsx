import CodeBlock from "./CodeBlock";

const MONO = { fontFamily: '"Geist Mono", monospace' };

const LAYOUT_PATTERNS = [
  {
    name: "Full-width",
    cols: [12],
    usage: "Hero section, full-bleed content",
  },
  {
    name: "60/40 Split",
    cols: [7, 5],
    usage: "About section (narrative + stats grid)",
  },
  {
    name: "50/50 Split",
    cols: [6, 6],
    usage: "Pathway cards side by side",
  },
  {
    name: "2\u00d72 Grid",
    cols: [6, 6, 6, 6],
    usage: "Pain point cards (2 cols, 2 rows)",
  },
];

function PatternDiagram({ name, cols, usage }) {
  const isGrid = cols.length === 4;
  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: "var(--mr-bg-card)",
        border: "1px solid var(--mr-border-default)",
      }}
    >
      <span
        className="text-[13px] font-medium block mb-4"
        style={{ ...MONO, color: "var(--mr-text-primary)" }}
      >
        {name.toUpperCase()}
      </span>

      {isGrid ? (
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex gap-2">
            {cols.slice(0, 2).map((span, i) => (
              <div
                key={i}
                className="h-8 rounded"
                style={{
                  flex: span,
                  background: "var(--mr-bg-button-pathway)",
                }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            {cols.slice(2).map((span, i) => (
              <div
                key={i}
                className="h-8 rounded"
                style={{
                  flex: span,
                  background: "var(--mr-bg-button-pathway)",
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex gap-2 mb-4">
          {cols.map((span, i) => (
            <div
              key={i}
              className="h-8 rounded"
              style={{
                flex: span,
                background: "var(--mr-bg-button-pathway)",
              }}
            />
          ))}
        </div>
      )}

      <span
        className="text-[12px] block"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        {cols.length <= 2
          ? cols.map((c) => `${c} col`).join(" + ")
          : `${cols.length} \u00d7 ${cols[0]} col`}
      </span>
      <span
        className="text-[12px] block mt-1"
        style={{ color: "var(--mr-text-muted)" }}
      >
        {usage}
      </span>
    </div>
  );
}

export default function GridSection() {
  return (
    <section id="grid-layout" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        {/* Section header */}
        <span
          className="text-lg font-medium block mb-2"
          style={{ ...MONO, color: "var(--mr-text-primary)" }}
        >
          <span style={{ color: "#4F769A" }}>//</span> GRID
        </span>
        <h2
          className="text-[36px] font-medium leading-[1.2] tracking-tight mb-3"
          style={{ color: "var(--mr-text-primary)" }}
        >
          Grid &amp; Layout
        </h2>
        <p
          className="text-[17px] leading-[1.6] max-w-[560px] mb-12"
          style={{ color: "var(--mr-text-muted)" }}
        >
          A 12-column grid with 24px gutters inside a 1280px max-width
          container. Four layout patterns cover every section in the V2 site.
        </p>

        {/* Max Width & Container */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            MAX WIDTH &amp; CONTAINER
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            {/* Visual diagram */}
            <div className="mb-6">
              {/* Page-width bar */}
              <div
                className="h-10 rounded-lg flex items-center justify-center relative"
                style={{
                  background: "var(--mr-bg-page)",
                  border: "1px dashed var(--mr-border-default)",
                }}
              >
                {/* Inner container bar */}
                <div
                  className="h-6 rounded flex items-center justify-center"
                  style={{
                    width: "75%",
                    background: "var(--mr-bg-button-pathway)",
                  }}
                >
                  <span
                    className="text-[11px] font-medium"
                    style={{ ...MONO, color: "var(--mr-text-primary)" }}
                  >
                    1280px max
                  </span>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <span
                  className="text-[11px]"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  px-12 (48px)
                </span>
                <span
                  className="text-[11px]"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  px-12 (48px)
                </span>
              </div>
            </div>

            <div
              className="flex gap-6 text-[12px]"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              <span>--mr-max-width: 1280px</span>
              <span>mx-auto</span>
              <span>px-12</span>
            </div>
          </div>
        </div>

        {/* 12-Column Grid */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            12-COLUMN GRID
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            {/* Grid overlay */}
            <div className="grid grid-cols-12 gap-[24px] mb-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 rounded flex items-center justify-center"
                  style={{ background: "var(--mr-bg-button-pathway)" }}
                >
                  <span
                    className="text-[10px]"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
            <div
              className="flex gap-6 text-[12px]"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              <span>--mr-grid-columns: 12</span>
              <span>--mr-grid-gutter: 24px</span>
            </div>
          </div>
        </div>

        {/* Common Layout Patterns */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            COMMON LAYOUT PATTERNS
          </span>
          <div className="grid grid-cols-2 gap-6">
            {LAYOUT_PATTERNS.map((p) => (
              <PatternDiagram key={p.name} {...p} />
            ))}
          </div>
        </div>

        {/* Side Margins */}
        <div className="mb-8">
          <span
            className="text-[14px] font-medium block mb-2"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            SIDE MARGINS
          </span>
          <p
            className="text-[15px] leading-[1.6] mb-6"
            style={{ color: "var(--mr-text-muted)" }}
          >
            Desktop only &mdash;{" "}
            <code className="text-[13px]" style={MONO}>
              px-12
            </code>{" "}
            (48px) horizontal padding. Responsive breakpoints not yet
            documented.
          </p>
          <CodeBlock>
{`--mr-max-width: 1280px;
--mr-grid-columns: 12;
--mr-grid-gutter: 24px;`}
          </CodeBlock>
        </div>
      </div>
    </section>
  );
}
