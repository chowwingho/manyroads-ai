import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

const SCORE_COLORS = [
  {
    score: "0",
    label: "Not Ready",
    bg: "var(--mr-red-7)",
    text: "#FFFFFF",
    subtleBg: "var(--mr-red-2)",
    subtleText: "var(--mr-red-9)",
    desc: "No meaningful practice established",
  },
  {
    score: "1",
    label: "Some Progress",
    bg: "var(--mr-amber-7)",
    text: "#FFFFFF",
    subtleBg: "var(--mr-amber-2)",
    subtleText: "var(--mr-amber-9)",
    desc: "Exists but inconsistent or underdeveloped",
  },
  {
    score: "2",
    label: "Ready",
    bg: "var(--mr-green-7)",
    text: "#FFFFFF",
    subtleBg: "var(--mr-green-2)",
    subtleText: "var(--mr-green-9)",
    desc: "Solid practice with consistent adoption",
  },
  {
    score: "3",
    label: "Exemplary",
    bg: "var(--mr-green-9)",
    text: "#FFFFFF",
    subtleBg: "var(--mr-green-3)",
    subtleText: "var(--mr-green-10)",
    desc: "Best-in-class, could serve as a model",
  },
  {
    score: "NS",
    label: "Not Sure",
    bg: "var(--mr-blue-7)",
    text: "#FFFFFF",
    subtleBg: "var(--mr-blue-2)",
    subtleText: "var(--mr-blue-9)",
    desc: "Excluded from score, flagged for follow-up",
  },
];

const READINESS_BANDS = [
  { label: "Needs Work", range: "0.0 – 0.9", color: "var(--mr-red-7)", bg: "var(--mr-red-2)", text: "var(--mr-red-9)" },
  { label: "Early Progress", range: "1.0 – 1.4", color: "var(--mr-amber-7)", bg: "var(--mr-amber-2)", text: "var(--mr-amber-9)" },
  { label: "Building Momentum", range: "1.5 – 1.9", color: "var(--mr-amber-5)", bg: "var(--mr-amber-1)", text: "var(--mr-amber-8)" },
  { label: "Ready to Pilot", range: "2.0 – 2.4", color: "var(--mr-green-6)", bg: "var(--mr-green-2)", text: "var(--mr-green-8)" },
  { label: "Fully Operational", range: "2.5 – 3.0", color: "var(--mr-green-7)", bg: "var(--mr-green-3)", text: "var(--mr-green-9)" },
];

const SECTION_COLORS = [
  { label: "Artifacts", color: "#3D7A41", bg: "var(--mr-green-2)", text: "var(--mr-green-9)" },
  { label: "Process", color: "#4F769A", bg: "var(--mr-blue-2)", text: "var(--mr-blue-9)" },
  { label: "Tooling", color: "#7A6A8A", bg: "rgba(122, 106, 138, 0.10)", text: "#4A3A5A" },
  { label: "Culture", color: "#B8892A", bg: "var(--mr-amber-2)", text: "var(--mr-amber-9)" },
];

// Mini heatmap data
const HEATMAP = [
  { section: "Artifacts", scores: [3, 2, 2, "NS", 1] },
  { section: "Process", scores: [1, 0, 2, 2, 1] },
  { section: "Tooling", scores: [2, 2, 3, 1, 0] },
  { section: "Culture", scores: [0, 1, 1, 2, "NS"] },
];

function scoreColor(s) {
  if (s === "NS") return { bg: "var(--mr-blue-7)", text: "#FFF" };
  if (s === 3) return { bg: "var(--mr-green-9)", text: "#FFF" };
  if (s === 2) return { bg: "var(--mr-green-7)", text: "#FFF" };
  if (s === 1) return { bg: "var(--mr-amber-7)", text: "#FFF" };
  return { bg: "var(--mr-red-7)", text: "#FFF" };
}

export default function ScoreSystemSection() {
  return (
    <section id="score-system" className="py-20">
      <div className="border-t pt-12" style={{ borderColor: "var(--mr-border-default)" }}>
        <SectionHeader
          marker="DATA VISUALIZATION"
          title="Score System"
          description="How assessment scores map to the color scale. Score values 0–3 use hue steps 7 (solid) and 2 (subtle). Score NS uses the blue scale."
        />

        {/* Score color reference */}
        <div className="mb-12">
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-4"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Score colors
          </span>
          <div className="flex flex-col gap-3">
            {SCORE_COLORS.map(({ score, label, bg, text, subtleBg, subtleText, desc }) => (
              <div key={score} className="flex items-center gap-4">
                <div
                  className="flex items-center justify-center rounded-md w-9 h-9 font-medium flex-shrink-0"
                  style={{ ...MONO, background: bg, color: text, fontSize: 14 }}
                >
                  {score}
                </div>
                <div
                  className="rounded px-3 py-1 text-[12px]"
                  style={{ ...MONO, background: subtleBg, color: subtleText }}
                >
                  {label}
                </div>
                <span
                  className="text-[13px]"
                  style={{ color: "var(--mr-text-muted)" }}
                >
                  {desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Readiness bands */}
        <div className="mb-12">
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-4"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Readiness bands
          </span>
          <div className="flex flex-col gap-2 max-w-[500px]">
            {READINESS_BANDS.map(({ label, range, color, bg, text }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ background: color }}
                />
                <span
                  className="rounded px-2 py-0.5 text-[12px] min-w-[140px]"
                  style={{ ...MONO, background: bg, color: text }}
                >
                  {label}
                </span>
                <span
                  className="text-[13px]"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  avg {range}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section colors */}
        <div className="mb-12">
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-4"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Section colors
          </span>
          <div className="flex gap-3 flex-wrap">
            {SECTION_COLORS.map(({ label, color, bg, text }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ background: color }}
                />
                <span
                  className="rounded px-2 py-0.5 text-[12px]"
                  style={{ ...MONO, background: bg, color: text }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini heatmap */}
        <div>
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-4"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Mini heatmap — all score values
          </span>
          <div
            className="rounded-xl overflow-hidden inline-block"
            style={{ border: "1px solid var(--mr-border-default)" }}
          >
            <table style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--mr-bg-card)" }}>
                  <th
                    className="text-left px-4 py-2 text-[12px] w-[120px]"
                    style={{ ...MONO, color: "var(--mr-text-muted)", borderBottom: "1px solid var(--mr-border-default)" }}
                  >
                    Section
                  </th>
                  {["Q1", "Q2", "Q3", "Q4", "Q5"].map(q => (
                    <th
                      key={q}
                      className="px-3 py-2 text-[12px] w-10"
                      style={{ ...MONO, color: "var(--mr-text-muted)", borderBottom: "1px solid var(--mr-border-default)" }}
                    >
                      {q}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HEATMAP.map(({ section, scores }, ri) => (
                  <tr
                    key={section}
                    style={{ borderBottom: ri < HEATMAP.length - 1 ? "1px solid var(--mr-border-default)" : "none" }}
                  >
                    <td
                      className="px-4 py-2 text-[12px]"
                      style={{ ...MONO, color: "var(--mr-text-muted)", background: "var(--mr-bg-card)" }}
                    >
                      {section}
                    </td>
                    {scores.map((s, i) => {
                      const { bg, text } = scoreColor(s);
                      return (
                        <td key={i} className="p-1">
                          <div
                            className="w-8 h-8 rounded flex items-center justify-center text-[12px] font-medium"
                            style={{ ...MONO, background: bg, color: text }}
                          >
                            {s}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
