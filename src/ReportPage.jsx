'use client'
// Leading Intelligence — Report Visualization — v1.0
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Radar, Doughnut } from "react-chartjs-2";

import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import SectionLabel from "./components/shared/SectionLabel";
import SolidButton from "./components/shared/SolidButton";
import GhostButton from "./components/shared/GhostButton";
import { MONO } from "./components/shared/constants";

import {
  parseReport,
  QUESTIONS,
  SECTIONS,
  CRITICAL_MINIMUMS,
  SCORE_COLORS,
  SCORE_LABELS,
  BAND_COLORS,
  normalizeScore,
  getReadinessBand,
} from "./lib/report-parser";

// Register Chart.js components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ArcElement);

// =============================================================================
// TOKEN-BASED SCORE / BAND MAPS (replaces hardcoded hex for non-chart elements)
// =============================================================================

const SCORE_BADGE_CLASS = {
  0: "mr-badge-red-solid",
  1: "mr-badge-amber-solid",
  2: "mr-badge-green-solid",
  3: "mr-badge-green-solid",
  ns: "mr-badge-blue-solid",
};
const BAND_BADGE_CLASS = {
  "Not Ready": "mr-badge-red-solid",
  "Early Progress": "mr-badge-amber-solid",
  "Ready to Pilot": "mr-badge-green",
  "Ready for Adoption": "mr-badge-green-solid",
  Exemplary: "mr-badge-green-solid",
};
const SCORE_ALPHA_VAR = {
  0: "var(--mr-red-a2)",
  1: "var(--mr-amber-a2)",
  2: "var(--mr-green-a3)",
  3: "var(--mr-green-a2)",
  ns: "var(--mr-blue-a3)",
};
const SCORE_BORDER_VAR = {
  0: "var(--mr-red-5)",
  1: "var(--mr-amber-5)",
  2: "var(--mr-green-5)",
  3: "var(--mr-green-7)",
  ns: "var(--mr-blue-5)",
};
const BAND_COLOR_VAR = {
  "Not Ready": "var(--mr-red-7)",
  "Early Progress": "var(--mr-amber-7)",
  "Ready to Pilot": "var(--mr-green-6)",
  "Ready for Adoption": "var(--mr-green-7)",
  Exemplary: "var(--mr-green-8)",
};

// =============================================================================
// HELPERS
// =============================================================================

function fmt(n) {
  if (n === null || n === undefined) return "—";
  return typeof n === "number" ? n.toFixed(2) : String(n);
}

function ScoreBadge({ score }) {
  const normalized = normalizeScore(score);
  const label = SCORE_LABELS[normalized] ?? "—";
  const colorClass = SCORE_BADGE_CLASS[normalized] ?? "mr-badge-red-solid";
  return (
    <span className={`mr-badge ${colorClass} shrink-0`} style={MONO}>
      {normalized === "ns" ? "NS" : normalized !== null ? String(normalized) : "?"} — {label}
    </span>
  );
}

function BandBadge({ band }) {
  const colorClass = BAND_BADGE_CLASS[band] ?? "mr-badge-red-solid";
  return (
    <span className={`mr-badge ${colorClass}`} style={MONO}>
      {band}
    </span>
  );
}

function NarrativeBody({ text }) {
  if (!text) return null;
  const paras = text.split(/\n\n+/).filter(Boolean);
  return (
    <div className="flex flex-col gap-3">
      {paras.map((p, i) => (
        <p key={i} className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
          {p.trim()}
        </p>
      ))}
    </div>
  );
}

// =============================================================================
// STATE 1 — INPUT VIEW
// =============================================================================

function InputView({ onGenerate }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  function handleGenerate() {
    if (!text.trim()) return;
    const result = parseReport(text);
    if (result.error) {
      setError(result.errorMessage);
      return;
    }
    setError(null);
    onGenerate(result);
  }

  return (
    <main>
      <section className="pt-12 pb-8 md:pt-20 md:pb-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <Link href="/" className="text-sm mb-8 inline-block" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
            ← Back to Leading Intelligence
          </Link>

          <h1
            className="text-3xl sm:text-4xl lg:text-[48px] font-medium leading-[1.1] tracking-tight mb-4"
            style={{ color: "var(--mr-text-primary)" }}
          >
            View Your Report
          </h1>
          <p className="text-[17px] leading-[1.6] max-w-2xl mb-2" style={{ color: "var(--mr-text-muted)" }}>
            Paste the markdown report from your AI readiness assessment. Your results will be visualized here.
          </p>
          <p className="text-sm mb-10" style={{ ...MONO, color: "var(--mr-text-muted)", opacity: 0.7 }}>
            Your data stays in your browser. Nothing is sent to our servers.
          </p>

          {/* Textarea */}
          <textarea
            className="w-full text-sm leading-[1.7] p-4 outline-none resize-y"
            style={{
              ...MONO,
              minHeight: 400,
              background: "var(--mr-bg-card)",
              color: "var(--mr-text-primary)",
              border: "1px solid var(--mr-border-default)",
              borderRadius: "var(--mr-radius-md)",
              placeholder: "var(--mr-text-muted)",
            }}
            placeholder="Paste your assessment report here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Error state */}
          {error && (
            <div
              className="mt-4 p-4 text-[17px] leading-[1.6]"
              style={{
                background: "var(--mr-bg-danger-subtle)",
                border: "1px solid var(--mr-status-critical)",
                borderRadius: "var(--mr-radius-md)",
                color: "var(--mr-status-critical)",
              }}
            >
              {error}
            </div>
          )}

          {/* Generate button */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={handleGenerate}
              disabled={!text.trim()}
              data-event="generate_report"
              className="text-lg px-5 py-2.5 font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                ...MONO,
                background: "var(--mr-bg-button-primary)",
                color: "var(--mr-text-primary)",
                borderRadius: "var(--mr-radius-md)",
                border: "1px solid var(--mr-border-default)",
                transition: "background-color var(--mr-transition-base)",
              }}
            >
              Generate report_
            </button>
          </div>

          <p className="mt-6 text-sm" style={{ color: "var(--mr-text-muted)" }}>
            Don&rsquo;t have a report yet?{" "}
            <Link href="/assessment" style={{ ...MONO, color: "var(--mr-accent-default)" }}>
              Get the assessment prompt_
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

// =============================================================================
// STATE 2 — REPORT VIEW — SHARED SUBCOMPONENTS
// =============================================================================

function StickyHeader({ reportData, onReset }) {
  const { derived, yaml } = reportData;
  const score = derived.overallScore;
  const band = derived.readinessBand;
  const bandColor = BAND_COLORS[band] ?? "#888888";
  const label = yaml.respondent_role
    ? `${yaml.respondent_role}${yaml.team_size ? ` · ${yaml.team_size} people` : ""}`
    : yaml.assessment_title ?? "AI Readiness Assessment";

  return (
    <div
      className="fixed left-0 right-0 z-40 flex items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12"
      style={{
        top: 60,
        height: 48,
        background: "var(--mr-bg-page)",
        borderBottom: "1px solid var(--mr-border-default)",
      }}
    >
      <div className="max-w-[1280px] mx-auto w-full flex items-center justify-between gap-4">
        <span className="text-sm truncate max-w-[200px] sm:max-w-xs" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
          {label}
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-base font-medium" style={{ ...MONO, color: "var(--mr-text-primary)" }}>
            {score !== null ? score.toFixed(2) : "—"}
          </span>
          <span className="hidden sm:inline">
            <BandBadge band={band} />
          </span>
        </div>

        <button
          onClick={onReset}
          className="text-sm px-3 py-1.5 shrink-0 cursor-pointer"
          style={{
            ...MONO,
            background: "var(--mr-bg-card)",
            color: "var(--mr-text-muted)",
            border: "1px solid var(--mr-border-default)",
            borderRadius: "var(--mr-radius-sm)",
            transition: "color var(--mr-transition-fast)",
          }}
        >
          Paste new report_
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// SECTION 01 — HERO BANNER
// =============================================================================

function HeroBanner({ reportData }) {
  const { derived, yaml } = reportData;
  const score = derived.overallScore;
  const band = derived.readinessBand;
  const bandColor = BAND_COLORS[band] ?? "#888888";

  // Doughnut gauge: 270° arc
  const gaugeData = {
    datasets: [
      {
        data: [score !== null ? score : 0, 3 - (score !== null ? score : 0)],
        backgroundColor: [bandColor, "rgba(255,255,255,0.1)"],
        borderWidth: 0,
        circumference: 270,
        rotation: 225,
      },
    ],
  };

  const gaugeOptions = {
    cutout: "72%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  const meta = [yaml.date, yaml.respondent_role, yaml.team_size ? `${yaml.team_size} people` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <section style={{ background: "var(--mr-footer-bg)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <div className="flex-1">
            <p className="text-sm mb-3" style={{ ...MONO, color: "var(--mr-footer-sub)" }}>
              {meta}
            </p>
            <h1
              className="text-2xl sm:text-3xl font-medium leading-[1.2] mb-4"
              style={{ color: "var(--mr-footer-text)" }}
            >
              {yaml.assessment_title ?? "AI Adoption Readiness Assessment"}
            </h1>
            {yaml.assessed_codebase && (
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-footer-sub)" }}>
                Assessed codebase: {yaml.assessed_codebase}
                {yaml.primary_languages ? ` · ${yaml.primary_languages}` : ""}
              </p>
            )}
          </div>

          {/* Score display + gauge */}
          <div className="flex flex-col items-center gap-2 shrink-0">
            <div className="relative" style={{ width: 140, height: 140 }}>
              <Doughnut data={gaugeData} options={gaugeOptions} />
              <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{ pointerEvents: "none" }}
              >
                <span
                  className="text-[40px] font-medium leading-none"
                  style={{ ...MONO, color: BAND_COLOR_VAR[band] ?? "var(--mr-footer-text)" }}
                >
                  {score !== null ? score.toFixed(2) : "—"}
                </span>
                <span className="text-xs mt-1" style={{ ...MONO, color: "var(--mr-footer-sub)" }}>
                  / 3.00
                </span>
              </div>
            </div>
            <BandBadge band={band} />
            {yaml.assessment_layer && (
              <span className="text-xs mt-1" style={{ ...MONO, color: "rgba(236,236,234,0.4)" }}>
                {yaml.assessment_layer}
              </span>
            )}
          </div>
        </div>

        {/* Validation warning */}
        {reportData.validation && !reportData.validation.valid && (
          <div className="mt-8 mr-note mr-note-error text-sm" style={MONO}>
            Note: The assessment data looks incomplete — we found {reportData.validation.scoreCount} of{" "}
            {reportData.validation.totalExpected} scores. The report below may be partial.
          </div>
        )}

        {/* No narrative warning */}
        {Object.keys(reportData.narrative).length === 0 && (
          <div className="mt-4 mr-note mr-note-info text-sm" style={MONO}>
            Narrative content could not be extracted. Scores and ratings are shown below.
          </div>
        )}
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 02 — SECTION OVERVIEW (RADAR)
// =============================================================================

function SectionOverview({ reportData }) {
  const { derived } = reportData;
  const { sectionAverages } = derived;
  const [chartColors, setChartColors] = useState({ accent: "#3D7A41", muted: "rgba(136,136,136,0.3)", grid: "rgba(136,136,136,0.15)" });

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setChartColors({
      accent: style.getPropertyValue("--mr-accent-default").trim() || "#3D7A41",
      muted: "rgba(136,136,136,0.5)",
      grid: "rgba(136,136,136,0.15)",
    });
  }, []);

  const radarData = {
    labels: ["Artifacts", "Process", "Tooling", "Culture"],
    datasets: [
      {
        label: "Score",
        data: [
          sectionAverages.artifacts ?? 0,
          sectionAverages.process ?? 0,
          sectionAverages.tooling ?? 0,
          sectionAverages.culture ?? 0,
        ],
        backgroundColor: `${chartColors.accent}26`,
        borderColor: chartColors.accent,
        borderWidth: 2,
        pointBackgroundColor: chartColors.accent,
        pointRadius: 4,
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 3,
        ticks: {
          stepSize: 1,
          color: chartColors.muted,
          font: { family: "'Geist Mono', monospace", size: 11 },
          backdropColor: "transparent",
        },
        grid: { color: chartColors.grid },
        angleLines: { color: chartColors.grid },
        pointLabels: {
          color: chartColors.muted,
          font: { family: "'Geist Mono', monospace", size: 12 },
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.r.toFixed(2)} / 3.00`,
        },
      },
    },
  };

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-page)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 02 — SECTION_OVERVIEW</SectionLabel>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-8 items-center">
            {/* Radar chart */}
            <div className="flex justify-center">
              <div style={{ width: "100%", maxWidth: 420, height: 360 }}>
                <Radar data={radarData} options={radarOptions} />
              </div>
            </div>

            {/* Section summary cards */}
            <div className="flex flex-col gap-4">
              {SECTIONS.map((section) => {
                const avg = sectionAverages[section.id];
                const band = avg !== null ? getReadinessBand(avg) : "—";
                const SECTION_TINT = {
                  artifacts: "var(--mr-green-a1)",
                  process:   "var(--mr-blue-a1)",
                  tooling:   "var(--mr-bg-card)",
                  culture:   "var(--mr-amber-a1)",
                };
                return (
                  <div
                    key={section.id}
                    className="p-5 flex items-center justify-between gap-4"
                    style={{
                      background: SECTION_TINT[section.id] ?? "var(--mr-bg-card)",
                      border: "1px solid var(--mr-border-default)",
                      borderLeft: `4px solid var(--mr-section-${section.id})`,
                      borderRadius: "var(--mr-radius-md)",
                    }}
                  >
                    <div>
                      <p className="text-base font-medium" style={{ color: "var(--mr-text-primary)" }}>
                        {section.name}
                      </p>
                      <p className="text-sm mt-0.5" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                        {avg !== null ? avg.toFixed(2) : "—"} / 3.00
                      </p>
                    </div>
                    <BandBadge band={band} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 03 — SCORE HEATMAP GRID
// =============================================================================

function HeatmapGrid({ reportData }) {
  const scores = reportData.yaml.scores ?? {};

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-page)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 03 — SCORE_HEATMAP</SectionLabel>

          <div className="mt-8 flex flex-col gap-8">
            {SECTIONS.map((section) => {
              const sectionQs = QUESTIONS.filter((q) => q.section === section.id);
              return (
                <div key={section.id}>
                  <p className="text-sm font-medium mb-4" style={{ ...MONO, color: `var(--mr-section-${section.id})` }}>
                    // {section.name.toUpperCase()}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {sectionQs.map((q) => {
                      const raw = scores[q.id];
                      const normalized = normalizeScore(raw);
                      const isZero = normalized === 0;
                      const isThree = normalized === 3;
                      const isNS = normalized === "ns";
                      const hasBorder = isZero || isThree || isNS;

                      return (
                        <div
                          key={q.id}
                          className="p-3 flex flex-col gap-2"
                          style={{
                            background: SCORE_ALPHA_VAR[normalized] ?? "var(--mr-bg-card)",
                            border: "1px solid var(--mr-border-default)",
                            borderLeft: `3px solid ${hasBorder ? SCORE_BORDER_VAR[normalized] : "var(--mr-border-default)"}`,
                            borderRadius: "var(--mr-radius-md)",
                          }}
                        >
                          <p className="text-xs leading-[1.4]" style={{ color: "var(--mr-text-primary)" }}>
                            {q.shortName}
                            {isThree && <span className="ml-1">★</span>}
                          </p>
                          <span
                            className={`mr-badge ${SCORE_BADGE_CLASS[normalized] ?? "mr-badge-red-solid"} self-start`}
                            style={MONO}
                          >
                            {isNS ? "NS" : normalized !== null ? String(normalized) : "?"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 04 — DETAILED FINDINGS (EXPANDABLE CARDS)
// =============================================================================

function FindingCard({ question, score, narrative }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setHeight(bodyRef.current.scrollHeight);
    }
  }, [narrative, open]);

  const normalized = normalizeScore(score);
  const isLow = normalized !== null && normalized !== "ns" && normalized <= 1;
  const isHigh = normalized === 3;

  const cardBg = normalized === 0
    ? "var(--mr-red-a2)"
    : normalized === "ns"
      ? "var(--mr-blue-a1)"
      : "var(--mr-bg-card)";

  // Extract first sentence from narrative body
  const firstLine = narrative
    ? narrative.body.split(/\n/).find((l) => l.trim().length > 20)?.trim() ?? ""
    : "";

  return (
    <div
      className="overflow-hidden"
      style={{
        background: cardBg,
        border: "1px solid var(--mr-border-default)",
        borderLeft: `3px solid ${isLow ? SCORE_BORDER_VAR[normalized] : isHigh ? SCORE_BORDER_VAR[3] : "var(--mr-border-default)"}`,
        borderRadius: "var(--mr-radius-md)",
      }}
    >
      {/* Header — always visible, clickable */}
      <button
        className="w-full text-left p-4 flex items-start justify-between gap-3 cursor-pointer"
        onClick={() => setOpen((v) => !v)}
        style={{ background: "transparent", border: "none" }}
      >
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <p className="text-base font-medium" style={{ color: "var(--mr-text-primary)" }}>
            {question.name}
          </p>
          {!open && firstLine && (
            <p className="text-sm leading-[1.5] truncate" style={{ color: "var(--mr-text-muted)" }}>
              {firstLine}
            </p>
          )}
          {!open && !firstLine && (
            <p className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
              Score: {normalized !== null ? (normalized === "ns" ? "NS" : String(normalized)) : "?"} — {SCORE_LABELS[normalized] ?? "Unknown"}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 mt-0.5">
          <ScoreBadge score={score} />
          <span className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
            {open ? "▲" : "▼"}
          </span>
        </div>
      </button>

      {/* Expandable body */}
      <div
        className="mr-collapse-content"
        style={{ maxHeight: open ? Math.max(height, 200) : 0 }}
      >
        <div ref={bodyRef} className="px-4 pb-4">
          <div style={{ borderTop: "1px solid var(--mr-border-default)", paddingTop: 12 }}>
            {narrative ? (
              <NarrativeBody text={narrative.body} />
            ) : (
              <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                No detailed narrative available for this area.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailedFindings({ reportData }) {
  const { yaml, narrative } = reportData;
  const scores = yaml.scores ?? {};

  // Parse individual question findings from narrative.findings body
  function getQuestionNarrative(questionId) {
    const findingsBody = narrative?.findings?.body ?? "";
    if (!findingsBody) return null;

    // Try to find a heading like "### q1_standards" or just the question name
    const q = QUESTIONS.find((q) => q.id === questionId);
    if (!q) return null;

    // Search for the short name or id in the findings body
    const patterns = [
      new RegExp(`#+\\s*${q.name}[^\\n]*\\n([\\s\\S]*?)(?=\\n#+|$)`, "i"),
      new RegExp(`#+\\s*${q.shortName}[^\\n]*\\n([\\s\\S]*?)(?=\\n#+|$)`, "i"),
      new RegExp(`${questionId}[^\\n]*\\n([\\s\\S]*?)(?=\\n#+|$)`, "i"),
    ];

    for (const pattern of patterns) {
      const m = findingsBody.match(pattern);
      if (m) {
        return { heading: q.name, body: m[1].trim() };
      }
    }
    return null;
  }

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-page)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 04 — DETAILED_FINDINGS</SectionLabel>

          <div className="mt-8 flex flex-col gap-10">
            {SECTIONS.map((section) => {
              const sectionQs = QUESTIONS.filter((q) => q.section === section.id);
              return (
                <div key={section.id}>
                  <p className="text-sm font-medium mb-4" style={{ ...MONO, color: `var(--mr-section-${section.id})` }}>
                    // {section.name.toUpperCase()}
                  </p>
                  <div className="flex flex-col gap-3">
                    {sectionQs.map((q) => (
                      <FindingCard
                        key={q.id}
                        question={q}
                        score={scores[q.id]}
                        narrative={getQuestionNarrative(q.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 05 — RED FLAGS (CONDITIONAL)
// =============================================================================

function RedFlagsSection({ reportData }) {
  const { yaml, narrative } = reportData;
  const redFlags = yaml.red_flags ?? [];
  if (!redFlags.length) return null;

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-danger-subtle)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-status-critical)" }}>
          <SectionLabel style={{ color: "var(--mr-status-critical)" }}>// 05 — RED_FLAGS</SectionLabel>

          <div className="mt-8 flex flex-col gap-4">
            {redFlags.map((flag, i) => (
              <div
                key={i}
                className="p-5"
                style={{
                  background: "var(--mr-bg-card)",
                  border: "1px solid var(--mr-status-critical)",
                  borderLeft: `4px solid var(--mr-status-critical)`,
                  borderRadius: "var(--mr-radius-md)",
                }}
              >
                <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                  {flag}
                </p>
              </div>
            ))}

            {narrative?.redFlags && (
              <div className="mt-4">
                <NarrativeBody text={narrative.redFlags.body} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 06 — CRITICAL MINIMUMS CHECK
// =============================================================================

function CriticalMinimumsSection({ reportData }) {
  const scores = reportData.yaml.scores ?? {};

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-page)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 06 — CRITICAL_MINIMUMS</SectionLabel>
          <p className="mt-3 text-[17px] leading-[1.6] max-w-2xl" style={{ color: "var(--mr-text-muted)" }}>
            These five areas have a minimum threshold of 2 (Ready) for safe AI adoption. Anything below 2 represents a
            meaningful risk.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CRITICAL_MINIMUMS.map((qId) => {
              const q = QUESTIONS.find((q) => q.id === qId);
              if (!q) return null;
              const raw = scores[qId];
              const normalized = normalizeScore(raw);
              const pass = normalized !== null && normalized !== "ns" && normalized >= 2;
              const borderColor = pass ? "var(--mr-status-positive)" : "var(--mr-status-critical)";
              const iconColor = pass ? "var(--mr-status-positive)" : "var(--mr-status-critical)";
              const critBg = pass ? "var(--mr-green-a1)" : "var(--mr-red-a2)";

              return (
                <div
                  key={qId}
                  className="p-5 flex flex-col gap-3"
                  style={{
                    background: critBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: "var(--mr-radius-md)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xl" style={{ color: iconColor }}>
                      {pass ? "✓" : "✗"}
                    </span>
                    <ScoreBadge score={raw} />
                  </div>
                  <p className="text-sm font-medium leading-[1.4]" style={{ color: "var(--mr-text-primary)" }}>
                    {q.shortName}
                  </p>
                  {!pass && normalized !== null && (
                    <p className="text-xs leading-[1.5]" style={{ color: "var(--mr-text-muted)" }}>
                      Requires attention before scaling AI usage.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 07 — PRIORITIZED RECOMMENDATIONS
// =============================================================================

const TIER_META = [
  { label: "Tier 0 — Critical & Immediate", colorVar: "var(--mr-red-7)" },
  { label: "Tier 1 — Critical Minimums", colorVar: "var(--mr-amber-7)" },
  { label: "Tier 2 — High Impact", colorVar: "var(--mr-blue-7)" },
  { label: "Tier 3 — Culture & Process", colorVar: "var(--mr-mauve-7)" },
];
const TIER_TINT = [
  "var(--mr-red-a1)",
  "var(--mr-amber-a1)",
  "var(--mr-blue-a1)",
  "var(--mr-bg-card)",
];

function RecommendationsSection({ reportData }) {
  const { narrative, yaml, derived } = reportData;
  const scores = yaml.scores ?? {};
  const redFlags = yaml.red_flags ?? [];

  if (narrative?.recommendations) {
    return (
      <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-page)" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
            <SectionLabel>// 07 — RECOMMENDATIONS</SectionLabel>
            <div className="mt-8">
              <NarrativeBody text={narrative.recommendations.body} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Compute from scores
  const criticalSet = new Set(CRITICAL_MINIMUMS);
  const tier0 = [
    ...CRITICAL_MINIMUMS.filter((id) => {
      const n = normalizeScore(scores[id]);
      return n === 0;
    }),
    ...(redFlags.length ? ["Red flags present"] : []),
  ];
  const tier1 = CRITICAL_MINIMUMS.filter((id) => normalizeScore(scores[id]) === 1);
  const tier2 = QUESTIONS.filter(
    (q) => !criticalSet.has(q.id) && normalizeScore(scores[q.id]) === 1
  ).map((q) => q.id);
  const tier3 = QUESTIONS.filter(
    (q) => (q.section === "culture" || q.section === "process") && normalizeScore(scores[q.id]) === 1
  ).map((q) => q.id);

  const tiers = [tier0, tier1, tier2, tier3];

  function getLabel(id) {
    if (id === "Red flags present") return id;
    const q = QUESTIONS.find((q) => q.id === id);
    return q ? q.name : id;
  }

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-page)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 07 — RECOMMENDATIONS</SectionLabel>
          <p className="mt-3 text-[17px] leading-[1.6] max-w-2xl" style={{ color: "var(--mr-text-muted)" }}>
            Prioritized based on your scores. Address higher tiers first — they block progress in everything below.
          </p>

          <div className="mt-8 flex flex-col gap-6">
            {tiers.map((items, i) => {
              if (!items.length) return null;
              const meta = TIER_META[i];
              return (
                <div key={i}>
                  <p className="text-sm font-medium mb-3" style={{ ...MONO, color: meta.colorVar }}>
                    {meta.label}
                  </p>
                  <div className="flex flex-col gap-2">
                    {items.map((id, j) => (
                      <div
                        key={j}
                        className="p-4"
                        style={{
                          background: TIER_TINT[i] ?? "var(--mr-bg-card)",
                          border: "1px solid var(--mr-border-default)",
                          borderLeft: `3px solid ${meta.colorVar}`,
                          borderRadius: "var(--mr-radius-md)",
                        }}
                      >
                        <p className="text-[17px]" style={{ color: "var(--mr-text-primary)" }}>
                          {getLabel(id)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 08 — SUGGESTED ROADMAP
// =============================================================================

const ROADMAP_TRACKS = {
  "Fast Track":       { threshold: 2.0, months: ["Month 1–2", "Month 3–4", "Month 5–6"],   colorVar: "var(--mr-green-7)" },
  "Standard Track":   { threshold: 1.5, months: ["Month 1–3", "Month 4–6", "Month 7–9"],   colorVar: "var(--mr-blue-7)" },
  "Foundation Track": { threshold: 1.0, months: ["Month 1–3", "Month 4–6", "Month 7–12"],  colorVar: "var(--mr-amber-7)" },
  "Long Track":       { threshold: 0,   months: ["Month 1–4", "Month 5–9", "Month 10–18"], colorVar: "var(--mr-red-7)" },
};

function RoadmapSection({ reportData }) {
  const { narrative, derived } = reportData;

  if (narrative?.roadmap) {
    return (
      <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-page)" }}>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
            <SectionLabel>// 08 — ROADMAP</SectionLabel>
            <div className="mt-8">
              <NarrativeBody text={narrative.roadmap.body} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const score = derived.overallScore ?? 0;
  let trackName = "Long Track";
  if (score >= 2.0) trackName = "Fast Track";
  else if (score >= 1.5) trackName = "Standard Track";
  else if (score >= 1.0) trackName = "Foundation Track";

  const track = ROADMAP_TRACKS[trackName];
  const phases = [
    { label: track.months[0], title: "Foundation", desc: "Address critical minimums and red flags. Establish baselines." },
    { label: track.months[1], title: "Pilot", desc: "Introduce AI tooling in low-risk areas. Measure impact." },
    { label: track.months[2], title: "Scale", desc: "Expand adoption. Build feedback loops. Refine processes." },
  ];

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-page)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 08 — ROADMAP</SectionLabel>
          <div className="mt-2 flex items-center gap-3">
            <span
              className="mr-badge"
              style={{ ...MONO, background: track.colorVar, color: "#FFF" }}
            >
              {trackName}
            </span>
            <span className="text-sm" style={{ color: "var(--mr-text-muted)" }}>
              Based on overall score {score.toFixed(2)}
            </span>
          </div>

          {/* Timeline — horizontal desktop, vertical mobile */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            {phases.map((phase, i) => (
              <div key={i} className="flex-1 relative">
                {/* Connector line (desktop only) */}
                {i < phases.length - 1 && (
                  <div
                    className="hidden md:block absolute top-6 left-full w-4 z-10"
                    style={{ height: 2, background: track.colorVar, transform: "translateX(-50%)" }}
                  />
                )}
                <div
                  className="p-5 h-full"
                  style={{
                    background: "var(--mr-bg-card)",
                    border: "1px solid var(--mr-border-default)",
                    borderTop: `3px solid ${track.colorVar}`,
                    borderRadius: "var(--mr-radius-md)",
                  }}
                >
                  <p className="text-xs mb-2" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                    {phase.label}
                  </p>
                  <p className="text-base font-medium mb-2" style={{ color: "var(--mr-text-primary)" }}>
                    {phase.title}
                  </p>
                  <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
                    {phase.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 09 — NEXT STEPS
// =============================================================================

function NextStepsSection({ reportData }) {
  const { narrative } = reportData;

  const steps = narrative?.nextSteps
    ? narrative.nextSteps.body
        .split(/\n\d+\.\s+|\n[-*]\s+/)
        .filter((s) => s.trim().length > 10)
        .map((s) => s.trim())
    : [
        "Review the red flags and critical minimums identified in this report.",
        "Share results with your engineering leadership team.",
        "Pick one area scoring 0–1 and define a concrete 30-day improvement target.",
        "Re-run the assessment in 90 days to track progress.",
      ];

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-page)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="pt-12 md:pt-16" style={{ borderTop: "1px solid var(--mr-border-default)" }}>
          <SectionLabel>// 09 — NEXT_STEPS</SectionLabel>

          <div className="mt-8 flex flex-col gap-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className="p-5 flex gap-4 items-start"
                style={{
                  background: "var(--mr-bg-card)",
                  border: "1px solid var(--mr-border-default)",
                  borderRadius: "var(--mr-radius-md)",
                }}
              >
                <span
                  className="text-sm shrink-0 mt-0.5"
                  style={{ ...MONO, color: "var(--mr-accent-default)" }}
                >
                  ({String(i + 1).padStart(2, "0")})
                </span>
                <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-primary)" }}>
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <p className="text-[17px] leading-[1.6]" style={{ color: "var(--mr-text-muted)" }}>
              Ready to take the next step?
            </p>
            <SolidButton href="/#contact">Book a guided session_</SolidButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// SECTION 10 — REPORT FOOTER
// =============================================================================

function ReportFooterSection({ reportData }) {
  const { yaml } = reportData;

  return (
    <section className="py-16 md:py-24" style={{ background: "var(--mr-bg-page)" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div
          className="rounded-xl p-8 md:p-12 flex flex-col gap-6"
          style={{
            background: "var(--mr-bg-card)",
            border: "1px solid var(--mr-border-default)",
          }}
        >
          <h2 className="text-xl md:text-2xl font-medium" style={{ color: "var(--mr-text-primary)" }}>
            Want expert interpretation of these results?
          </h2>
          <p className="text-[17px] leading-[1.6] max-w-2xl" style={{ color: "var(--mr-text-muted)" }}>
            Our team can walk through your scores, identify the highest-leverage improvements, and build a 90-day
            adoption roadmap with you.
          </p>
          <SolidButton href="/#contact">Book a guided session_</SolidButton>

          <div style={{ borderTop: "1px solid var(--mr-border-default)", paddingTop: 24, marginTop: 8 }}>
            <p className="text-sm" style={{ ...MONO, color: "var(--mr-text-muted)", opacity: 0.7 }}>
              This report was rendered entirely in your browser. No data was transmitted to our servers.
            </p>
            {yaml.date && (
              <p className="text-sm mt-2" style={{ ...MONO, color: "var(--mr-text-muted)", opacity: 0.5 }}>
                Report generated {yaml.date}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// =============================================================================
// STATE 2 — REPORT VIEW (FULL PAGE)
// =============================================================================

function ReportView({ reportData, onReset }) {
  return (
    <>
      <StickyHeader reportData={reportData} onReset={onReset} />
      {/* 108px top padding = 60px navbar + 48px sticky header */}
      <main style={{ paddingTop: 108 }}>
        <HeroBanner reportData={reportData} />
        <SectionOverview reportData={reportData} />
        <HeatmapGrid reportData={reportData} />
        <DetailedFindings reportData={reportData} />
        <RedFlagsSection reportData={reportData} />
        <CriticalMinimumsSection reportData={reportData} />
        <RecommendationsSection reportData={reportData} />
        <RoadmapSection reportData={reportData} />
        <NextStepsSection reportData={reportData} />
        <ReportFooterSection reportData={reportData} />
      </main>
    </>
  );
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export default function ReportPage() {
  const [darkOverride, setDarkOverride] = useState(null);
  const [reportData, setReportData] = useState(null);

  const systemDark = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );

  const dark = darkOverride ?? systemDark;

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    return () => document.documentElement.removeAttribute("data-theme");
  }, [dark]);

  // Scroll to top when entering report view
  useEffect(() => {
    if (reportData) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [reportData]);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ fontFamily: '"Geist Sans", sans-serif', background: "var(--mr-bg-page)" }}
    >
      <Navbar dark={dark} onToggle={() => setDarkOverride(!dark)} />
      {reportData ? (
        <ReportView reportData={reportData} onReset={() => setReportData(null)} />
      ) : (
        <InputView onGenerate={setReportData} />
      )}
      <Footer dark={dark} onToggle={() => setDarkOverride(!dark)} />
    </div>
  );
}
