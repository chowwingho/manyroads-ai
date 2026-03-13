'use client'
import { useState } from "react";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

const HUES = [
  {
    name: "Green",
    label: "green",
    role: "Brand accent, success, score 2–3",
    steps: [
      { n: 1, token: "--mr-green-1" },
      { n: 2, token: "--mr-green-2" },
      { n: 3, token: "--mr-green-3" },
      { n: 4, token: "--mr-green-4" },
      { n: 5, token: "--mr-green-5" },
      { n: 6, token: "--mr-green-6" },
      { n: 7, token: "--mr-green-7" },
      { n: 8, token: "--mr-green-8" },
      { n: 9, token: "--mr-green-9" },
      { n: 10, token: "--mr-green-10" },
    ],
    alphas: [
      { n: "a1", token: "--mr-green-a1" },
      { n: "a2", token: "--mr-green-a2" },
      { n: "a3", token: "--mr-green-a3" },
      { n: "a4", token: "--mr-green-a4" },
      { n: "a5", token: "--mr-green-a5" },
      { n: "a6", token: "--mr-green-a6" },
      { n: "a7", token: "--mr-green-a7" },
      { n: "a8", token: "--mr-green-a8" },
    ],
  },
  {
    name: "Red",
    label: "red",
    role: "Score 0, critical, errors",
    steps: [
      { n: 1, token: "--mr-red-1" },
      { n: 2, token: "--mr-red-2" },
      { n: 3, token: "--mr-red-3" },
      { n: 4, token: "--mr-red-4" },
      { n: 5, token: "--mr-red-5" },
      { n: 6, token: "--mr-red-6" },
      { n: 7, token: "--mr-red-7" },
      { n: 8, token: "--mr-red-8" },
      { n: 9, token: "--mr-red-9" },
      { n: 10, token: "--mr-red-10" },
    ],
    alphas: [
      { n: "a1", token: "--mr-red-a1" },
      { n: "a2", token: "--mr-red-a2" },
      { n: "a3", token: "--mr-red-a3" },
      { n: "a4", token: "--mr-red-a4" },
      { n: "a5", token: "--mr-red-a5" },
      { n: "a6", token: "--mr-red-a6" },
      { n: "a7", token: "--mr-red-a7" },
      { n: "a8", token: "--mr-red-a8" },
    ],
  },
  {
    name: "Amber",
    label: "amber",
    role: "Score 1, warnings, caution",
    steps: [
      { n: 1, token: "--mr-amber-1" },
      { n: 2, token: "--mr-amber-2" },
      { n: 3, token: "--mr-amber-3" },
      { n: 4, token: "--mr-amber-4" },
      { n: 5, token: "--mr-amber-5" },
      { n: 6, token: "--mr-amber-6" },
      { n: 7, token: "--mr-amber-7" },
      { n: 8, token: "--mr-amber-8" },
      { n: 9, token: "--mr-amber-9" },
      { n: 10, token: "--mr-amber-10" },
    ],
    alphas: [
      { n: "a1", token: "--mr-amber-a1" },
      { n: "a2", token: "--mr-amber-a2" },
      { n: "a3", token: "--mr-amber-a3" },
      { n: "a4", token: "--mr-amber-a4" },
      { n: "a5", token: "--mr-amber-a5" },
      { n: "a6", token: "--mr-amber-a6" },
      { n: "a7", token: "--mr-amber-a7" },
      { n: "a8", token: "--mr-amber-a8" },
    ],
  },
  {
    name: "Blue",
    label: "blue",
    role: "NS/Not Sure, informational",
    steps: [
      { n: 1, token: "--mr-blue-1" },
      { n: 2, token: "--mr-blue-2" },
      { n: 3, token: "--mr-blue-3" },
      { n: 4, token: "--mr-blue-4" },
      { n: 5, token: "--mr-blue-5" },
      { n: 6, token: "--mr-blue-6" },
      { n: 7, token: "--mr-blue-7" },
      { n: 8, token: "--mr-blue-8" },
      { n: 9, token: "--mr-blue-9" },
      { n: 10, token: "--mr-blue-10" },
    ],
    alphas: [
      { n: "a1", token: "--mr-blue-a1" },
      { n: "a2", token: "--mr-blue-a2" },
      { n: "a3", token: "--mr-blue-a3" },
      { n: "a4", token: "--mr-blue-a4" },
      { n: "a5", token: "--mr-blue-a5" },
      { n: "a6", token: "--mr-blue-a6" },
      { n: "a7", token: "--mr-blue-a7" },
      { n: "a8", token: "--mr-blue-a8" },
    ],
  },
];

const ROLE_BANDS = [
  { steps: "1–3", label: "Component backgrounds" },
  { steps: "4–6", label: "Borders" },
  { steps: "7–8", label: "Solid fills" },
  { steps: "9–10", label: "Text & icons" },
];

function CopyToken({ token }) {
  const [copied, setCopied] = useState(false);
  const handleClick = () => {
    navigator.clipboard.writeText(`var(${token})`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  };
  return (
    <button
      onClick={handleClick}
      title={`Copy var(${token})`}
      className="w-full text-left truncate cursor-pointer hover:opacity-70 transition-opacity"
      style={{ ...MONO, fontSize: 10, color: "var(--mr-text-muted)" }}
    >
      {copied ? "Copied!" : token}
    </button>
  );
}

function SwatchRow({ steps, label }) {
  return (
    <div>
      <div className="flex gap-1.5 mb-2">
        {steps.map(({ n, token }) => (
          <div key={n} className="flex-1 min-w-0">
            <div
              className="h-10 rounded-md mb-1.5 border"
              style={{
                background: `var(${token})`,
                borderColor: "var(--mr-border-default)",
              }}
            />
            <div
              className="text-center mb-0.5"
              style={{ ...MONO, fontSize: 11, color: "var(--mr-text-muted)" }}
            >
              {n}
            </div>
            <CopyToken token={token} />
          </div>
        ))}
      </div>
      {label && (
        <div
          className="text-[12px] mt-1"
          style={{ ...MONO, color: "var(--mr-text-muted)" }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

function AlphaRow({ alphas, hueName }) {
  return (
    <div className="mt-4">
      <div
        className="text-[12px] mb-2 uppercase tracking-wider"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        Alpha variants — {hueName.toLowerCase()}-a1 through a8
      </div>
      {/* Show on light bg */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div
            className="text-[11px] mb-1.5"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            On page bg
          </div>
          <div
            className="flex gap-1.5 rounded-lg p-3"
            style={{ background: "var(--mr-bg-page)", border: "1px solid var(--mr-border-default)" }}
          >
            {alphas.map(({ n, token }) => (
              <div key={n} className="flex-1">
                <div
                  className="h-8 rounded"
                  style={{ background: `var(${token})` }}
                />
                <div
                  className="text-center mt-1"
                  style={{ ...MONO, fontSize: 10, color: "var(--mr-text-muted)" }}
                >
                  {n}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div
            className="text-[11px] mb-1.5"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            On card bg
          </div>
          <div
            className="flex gap-1.5 rounded-lg p-3"
            style={{ background: "var(--mr-bg-card)", border: "1px solid var(--mr-border-default)" }}
          >
            {alphas.map(({ n, token }) => (
              <div key={n} className="flex-1">
                <div
                  className="h-8 rounded"
                  style={{ background: `var(${token})` }}
                />
                <div
                  className="text-center mt-1"
                  style={{ ...MONO, fontSize: 10, color: "var(--mr-text-muted)" }}
                >
                  {n}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ColorScalesSection() {
  return (
    <section id="color-scales" className="py-20">
      <div className="border-t pt-12" style={{ borderColor: "var(--mr-border-default)" }}>
        <SectionHeader
          marker="FOUNDATIONS"
          title="Color Scales"
          description="10-step per-hue scales following the Geist model. Steps 1–3 are component backgrounds, 4–6 are borders, 7–8 are solid fills, and 9–10 are text and icon colors. Alpha variants overlay cleanly on any background."
        />

        {/* Role reference */}
        <div className="flex gap-6 mb-10 flex-wrap">
          {ROLE_BANDS.map(({ steps, label }) => (
            <div key={steps} className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded text-[11px]"
                style={{
                  ...MONO,
                  background: "var(--mr-bg-card)",
                  color: "var(--mr-text-muted)",
                  border: "1px solid var(--mr-border-default)",
                }}
              >
                {steps}
              </span>
              <span
                className="text-[13px]"
                style={{ color: "var(--mr-text-muted)" }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-12">
          {HUES.map((hue) => (
            <div
              key={hue.label}
              className="rounded-xl p-6"
              style={{
                background: "var(--mr-bg-card)",
                border: "1px solid var(--mr-border-default)",
              }}
            >
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="text-[14px] font-medium"
                  style={{ ...MONO, color: "var(--mr-text-primary)" }}
                >
                  {hue.name}
                </span>
                <span
                  className="text-[13px]"
                  style={{ color: "var(--mr-text-muted)" }}
                >
                  {hue.role}
                </span>
              </div>
              <SwatchRow steps={hue.steps} />
              <AlphaRow alphas={hue.alphas} hueName={hue.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
