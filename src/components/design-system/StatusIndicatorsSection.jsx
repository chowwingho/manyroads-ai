import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";
import CodeBlock from "./CodeBlock";

function PassFail({ pass, label }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-medium flex-shrink-0"
        style={{
          background: pass ? "var(--mr-green-7)" : "var(--mr-red-7)",
          color: "#FFFFFF",
        }}
      >
        {pass ? "✓" : "✕"}
      </div>
      <span className="text-[14px]" style={{ color: "var(--mr-text-primary)" }}>
        {label}
      </span>
    </div>
  );
}

function StatusDot({ colorToken, label }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{ background: `var(${colorToken})` }}
      />
      <span className="text-[13px]" style={{ color: "var(--mr-text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

function ProgressBar({ value, max = 3, colorToken, label }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-baseline">
        <span className="text-[13px]" style={{ color: "var(--mr-text-primary)" }}>
          {label}
        </span>
        <span className="text-[12px]" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
          {value}/{max}
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--mr-border-default)" }}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: `var(${colorToken})`,
          }}
        />
      </div>
    </div>
  );
}

function BorderAccentCard({ scoreLabel, borderToken, badgeCls, badgeStyle, desc }) {
  return (
    <div
      className="rounded-lg p-4"
      style={{
        background: "var(--mr-bg-card)",
        border: "1px solid var(--mr-border-default)",
        borderLeft: `3px solid var(${borderToken})`,
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        {badgeStyle
          ? <span className="mr-badge" style={badgeStyle}>{scoreLabel}</span>
          : <span className={`mr-badge ${badgeCls}`}>{scoreLabel}</span>
        }
      </div>
      <p className="text-[13px]" style={{ color: "var(--mr-text-muted)" }}>{desc}</p>
    </div>
  );
}

export default function StatusIndicatorsSection() {
  return (
    <section id="status-indicators" className="py-20">
      <div className="border-t pt-12" style={{ borderColor: "var(--mr-border-default)" }}>
        <SectionHeader
          marker="DATA VISUALIZATION"
          title="Status Indicators"
          description="Small-footprint indicators for pass/fail, status dots, progress bars, and left-border accent cards. All use the color scale system — no ad-hoc values."
        />

        <div className="grid grid-cols-2 gap-12">
          {/* Pass / Fail */}
          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-4"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Pass / Fail
            </span>
            <div className="flex flex-col gap-3">
              <PassFail pass label="All critical minimums met" />
              <PassFail pass={false} label="No incident runbook exists" />
              <PassFail pass label="CI/CD pipeline automated" />
              <PassFail pass={false} label="No onboarding documentation" />
            </div>
          </div>

          {/* Status dots */}
          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-4"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Status dots
            </span>
            <div className="flex flex-col gap-3">
              <StatusDot colorToken="--mr-green-7" label="Score 2–3 (Ready / Exemplary)" />
              <StatusDot colorToken="--mr-amber-7" label="Score 1 (Some Progress)" />
              <StatusDot colorToken="--mr-red-7" label="Score 0 (Not Ready)" />
              <StatusDot colorToken="--mr-blue-7" label="NS (Not Sure — excluded)" />
            </div>
          </div>

          {/* Progress bars */}
          <div className="col-span-2 md:col-span-1">
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-4"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Progress bars
            </span>
            <div className="flex flex-col gap-4 max-w-[360px]">
              <ProgressBar value={2.8} label="Artifacts" colorToken="--mr-green-7" />
              <ProgressBar value={1.6} label="Process" colorToken="--mr-amber-7" />
              <ProgressBar value={2.2} label="Tooling" colorToken="--mr-green-6" />
              <ProgressBar value={0.8} label="Culture" colorToken="--mr-red-7" />
            </div>
          </div>

          {/* Left-border accent cards */}
          <div className="col-span-2">
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-4"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Left-border accent cards
            </span>
            <div className="grid grid-cols-2 gap-3 max-w-[600px]">
              <BorderAccentCard
                scoreLabel="0 — Not Ready"
                borderToken="--mr-red-7"
                badgeCls="mr-badge-red"
                desc="Incident response runbook missing."
              />
              <BorderAccentCard
                scoreLabel="1 — Some Progress"
                borderToken="--mr-amber-7"
                badgeCls="mr-badge-amber"
                desc="Code review practice inconsistent."
              />
              <BorderAccentCard
                scoreLabel="2 — Ready"
                borderToken="--mr-green-7"
                badgeCls="mr-badge-green"
                desc="Documentation coverage is solid."
              />
              <BorderAccentCard
                scoreLabel="3 — Exemplary"
                borderToken="--mr-green-9"
                badgeStyle={{ background: "var(--mr-green-9)", color: "#FFFFFF", fontFamily: "var(--mr-font-mono)", fontSize: 12, padding: "2px 8px", borderRadius: "var(--mr-radius-sm)" }}
                desc="CI/CD pipeline fully automated."
              />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-3"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Usage
          </span>
          <CodeBlock>{`{/* Pass/Fail indicator */}
<div style={{ background: pass ? "var(--mr-green-7)" : "var(--mr-red-7)", color: "#FFF" }}>
  {pass ? "✓" : "✕"}
</div>

{/* Status dot */}
<div style={{ background: "var(--mr-green-7)" }} className="w-2.5 h-2.5 rounded-full" />

{/* Left-border accent card */}
<div style={{ borderLeft: "3px solid var(--mr-red-7)" }}>
  <span className="mr-badge mr-badge-red">0 — Not Ready</span>
  Finding description here.
</div>`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}
