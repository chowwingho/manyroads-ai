import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";
import CodeBlock from "./CodeBlock";

const SUBTLE_BADGES = [
  { cls: "mr-badge mr-badge-green", label: "Green" },
  { cls: "mr-badge mr-badge-red", label: "Red" },
  { cls: "mr-badge mr-badge-amber", label: "Amber" },
  { cls: "mr-badge mr-badge-blue", label: "Blue" },
];

const SOLID_BADGES = [
  { cls: "mr-badge mr-badge-green-solid", label: "Green" },
  { cls: "mr-badge mr-badge-red-solid", label: "Red" },
  { cls: "mr-badge mr-badge-amber-solid", label: "Amber" },
  { cls: "mr-badge mr-badge-blue-solid", label: "Blue" },
];

const SCORE_BADGES = [
  { cls: "mr-badge mr-badge-red", label: "0 — Not Ready" },
  { cls: "mr-badge mr-badge-amber", label: "1 — Some Progress" },
  { cls: "mr-badge mr-badge-green", label: "2 — Ready" },
  {
    cls: "mr-badge",
    label: "3 — Exemplary",
    style: {
      background: "var(--mr-green-9)",
      color: "#FFFFFF",
    },
  },
  { cls: "mr-badge mr-badge-blue", label: "NS — Not Sure" },
];

const BAND_BADGES = [
  { cls: "mr-badge mr-badge-red", label: "Needs Work" },
  { cls: "mr-badge mr-badge-amber", label: "Early Progress" },
  { cls: "mr-badge mr-badge-green", label: "Ready to Pilot" },
  { cls: "mr-badge mr-badge-green-solid", label: "Fully Operational" },
];

export default function BadgesSection() {
  return (
    <section id="badges" className="py-20">
      <div className="border-t pt-12" style={{ borderColor: "var(--mr-border-default)" }}>
        <SectionHeader
          marker="COMPONENTS"
          title="Badges"
          description="Compact labels for statuses, scores, and categories. Use subtle variants for general status labels; use solid variants for high-emphasis states."
        />

        <div className="flex flex-col gap-10">
          {/* Subtle variants */}
          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-4"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Subtle — .mr-badge-{"{hue}"}
            </span>
            <div className="flex gap-3 flex-wrap">
              {SUBTLE_BADGES.map(({ cls, label }) => (
                <span key={label} className={cls}>{label}</span>
              ))}
            </div>
          </div>

          {/* Solid variants */}
          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-4"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Solid — .mr-badge-{"{hue}"}-solid
            </span>
            <div className="flex gap-3 flex-wrap">
              {SOLID_BADGES.map(({ cls, label }) => (
                <span key={label} className={cls}>{label}</span>
              ))}
            </div>
          </div>

          {/* Score badges */}
          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-4"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Score system
            </span>
            <div className="flex gap-3 flex-wrap">
              {SCORE_BADGES.map(({ cls, label, style }) => (
                <span key={label} className={cls} style={style}>{label}</span>
              ))}
            </div>
          </div>

          {/* Readiness bands */}
          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-4"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Readiness bands
            </span>
            <div className="flex gap-3 flex-wrap">
              {BAND_BADGES.map(({ cls, label }) => (
                <span key={label} className={cls}>{label}</span>
              ))}
            </div>
          </div>

          {/* Code */}
          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-3"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Usage
            </span>
            <CodeBlock>{`{/* Subtle badge */}
<span className="mr-badge mr-badge-green">Score 2</span>

{/* Solid badge */}
<span className="mr-badge mr-badge-red-solid">Critical</span>

{/* Score 3 — dark green text on dark bg */}
<span
  className="mr-badge"
  style={{ background: "var(--mr-green-9)", color: "#FFFFFF" }}
>
  3 — Exemplary
</span>`}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
