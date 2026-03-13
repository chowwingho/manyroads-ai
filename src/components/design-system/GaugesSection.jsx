import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";
import CodeBlock from "./CodeBlock";

// Arc gauge rendered in pure SVG — no external dependency
function ArcGauge({ value, max = 3, label, colorToken }) {
  const SIZE = 120;
  const CX = SIZE / 2;
  const CY = SIZE / 2 + 10;
  const R = 44;
  const START_ANGLE = 220; // degrees
  const END_ANGLE = -40;   // degrees (total arc = 260°)
  const TOTAL_ARC = 260;

  const toRad = (deg) => (deg * Math.PI) / 180;

  const polarToCartesian = (cx, cy, r, angleDeg) => {
    const angle = toRad(angleDeg);
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const describeArc = (cx, cy, r, startDeg, endDeg) => {
    const start = polarToCartesian(cx, cy, r, startDeg);
    const end = polarToCartesian(cx, cy, r, endDeg);
    const largeArc = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
  };

  const fraction = Math.min(value / max, 1);
  const fillEndAngle = START_ANGLE - fraction * TOTAL_ARC;

  const trackPath = describeArc(CX, CY, R, START_ANGLE, END_ANGLE);
  const fillPath = describeArc(CX, CY, R, START_ANGLE, fillEndAngle);

  return (
    <div className="flex flex-col items-center">
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        {/* Track */}
        <path
          d={trackPath}
          fill="none"
          stroke="var(--mr-border-default)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Fill */}
        {fraction > 0 && (
          <path
            d={fillPath}
            fill="none"
            stroke={`var(${colorToken})`}
            strokeWidth="8"
            strokeLinecap="round"
          />
        )}
        {/* Value label */}
        <text
          x={CX}
          y={CY + 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="22"
          fontWeight="500"
          fill="var(--mr-text-primary)"
          fontFamily="var(--mr-font-display)"
        >
          {value}
        </text>
        <text
          x={CX}
          y={CY + 20}
          textAnchor="middle"
          fontSize="10"
          fill="var(--mr-text-muted)"
          fontFamily="var(--mr-font-mono)"
        >
          / {max}
        </text>
      </svg>
      <span
        className="text-[12px] text-center mt-1"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

const GAUGE_EXAMPLES = [
  { value: 0.4, label: "Not Ready", colorToken: "--mr-red-7" },
  { value: 1.2, label: "Early Progress", colorToken: "--mr-amber-7" },
  { value: 2.0, label: "Ready to Pilot", colorToken: "--mr-green-7" },
  { value: 2.8, label: "Fully Operational", colorToken: "--mr-green-9" },
];

export default function GaugesSection() {
  return (
    <section id="gauges" className="py-20">
      <div className="border-t pt-12" style={{ borderColor: "var(--mr-border-default)" }}>
        <SectionHeader
          marker="DATA VISUALIZATION"
          title="Gauges"
          description="Arc gauges display a single numeric score against a max. The fill color maps to the readiness band — red at 0, green at 2+. Built with pure SVG; no external chart library required."
        />

        <div className="mb-10">
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-6"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Score examples — 0 to 3
          </span>
          <div className="flex gap-8 flex-wrap">
            {GAUGE_EXAMPLES.map(({ value, label, colorToken }) => (
              <ArcGauge
                key={label}
                value={value}
                label={label}
                colorToken={colorToken}
              />
            ))}
          </div>
        </div>

        <div className="mb-10">
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-3"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Color mapping
          </span>
          <div
            className="rounded-lg p-4 text-[13px] leading-[2]"
            style={{
              ...MONO,
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
              color: "var(--mr-text-muted)",
            }}
          >
            <div>avg &lt; 1.0 → <span style={{ color: "var(--mr-red-7)" }}>--mr-red-7</span></div>
            <div>avg 1.0–1.9 → <span style={{ color: "var(--mr-amber-7)" }}>--mr-amber-7</span></div>
            <div>avg 2.0–2.4 → <span style={{ color: "var(--mr-green-7)" }}>--mr-green-7</span></div>
            <div>avg 2.5–3.0 → <span style={{ color: "var(--mr-green-9)" }}>--mr-green-9</span></div>
          </div>
        </div>

        <div>
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-3"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            SVG gauge pattern
          </span>
          <CodeBlock>{`function ArcGauge({ value, max = 3, colorToken }) {
  const fraction = Math.min(value / max, 1);
  const START = 220; // degrees
  const ARC = 260;   // total sweep
  const fillEnd = START - fraction * ARC;

  const path = describeArc(cx, cy, r, START, fillEnd);

  return (
    <svg>
      {/* Track (full arc, muted) */}
      <path d={fullArcPath} stroke="var(--mr-border-default)" />
      {/* Fill (partial arc, score color) */}
      <path d={path} stroke={\`var(\${colorToken})\`} />
      <text>{value}</text>
    </svg>
  );
}

// For Chart.js users:
// type: "doughnut", circumference: 270°, rotation: -135°,
// backgroundColor: [scoreColor, "var(--mr-border-default)"]`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}
