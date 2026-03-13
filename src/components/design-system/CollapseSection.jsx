'use client'
import { useState, useRef } from "react";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";
import CodeBlock from "./CodeBlock";

function CollapseCard({ title, score, scoreCls, scoreStyle, borderColor, children }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--mr-bg-card)",
        border: "1px solid var(--mr-border-default)",
        borderLeft: `3px solid ${borderColor}`,
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
        style={{ background: "transparent" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-[16px] font-medium"
            style={{ color: "var(--mr-text-primary)" }}
          >
            {title}
          </span>
          {scoreStyle
            ? <span className="mr-badge" style={scoreStyle}>{score}</span>
            : <span className={`mr-badge ${scoreCls}`}>{score}</span>
          }
        </div>
        <span
          className="text-[18px] transition-transform duration-200"
          style={{
            color: "var(--mr-text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          ↓
        </span>
      </button>
      <div
        className="mr-collapse-content"
        style={{
          maxHeight: open ? (contentRef.current?.scrollHeight ?? 500) + "px" : "0px",
        }}
        ref={contentRef}
      >
        <div
          className="px-5 pb-5 pt-2 text-[15px] leading-[1.6]"
          style={{ color: "var(--mr-text-primary)", borderTop: "1px solid var(--mr-border-default)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function CollapseSection() {
  return (
    <section id="collapse" className="py-20">
      <div className="border-t pt-12" style={{ borderColor: "var(--mr-border-default)" }}>
        <SectionHeader
          marker="COMPONENTS"
          title="Collapse"
          description="Expandable cards for assessment findings. The score badge and left-border color convey severity at a glance, even when collapsed."
        />

        <div className="flex flex-col gap-4 max-w-[680px] mb-10">
          <CollapseCard
            title="Incident Response"
            score="0 — Not Ready"
            scoreCls="mr-badge-red"
            borderColor="var(--mr-red-7)"
          >
            No incident response runbook exists. When production issues occur, your team has no documented escalation path, which leads to ad-hoc responses that increase resolution time. This is a critical minimum — address before piloting AI tooling.
          </CollapseCard>

          <CollapseCard
            title="Code Review Practice"
            score="1 — Some Progress"
            scoreCls="mr-badge-amber"
            borderColor="var(--mr-amber-7)"
          >
            Code review is happening but inconsistently. Some teams require approval; others merge without review. Standardizing this process is a prerequisite for reliable AI-assisted code generation.
          </CollapseCard>

          <CollapseCard
            title="Documentation Coverage"
            score="2 — Ready"
            scoreCls="mr-badge-green"
            borderColor="var(--mr-green-7)"
          >
            Your team maintains README files, API docs, and architecture decision records. This is the baseline needed for AI tooling to provide accurate context. Consider adding inline code comments for coverage above 80%.
          </CollapseCard>

          <CollapseCard
            title="Deployment Pipeline"
            score="3 — Exemplary"
            scoreStyle={{ background: "var(--mr-green-9)", color: "#FFFFFF", fontFamily: "var(--mr-font-mono)", fontSize: 12, padding: "2px 8px", borderRadius: "var(--mr-radius-sm)" }}
            borderColor="var(--mr-green-9)"
          >
            Fully automated CI/CD with zero manual gates. Deployments happen multiple times per day. This is the gold standard — your team can adopt AI tooling without infrastructure bottlenecks.
          </CollapseCard>
        </div>

        <div>
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-3"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Pattern
          </span>
          <CodeBlock>{`'use client'
import { useState, useRef } from "react";

function CollapseCard({ title, score, borderColor, children }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  return (
    <div style={{ borderLeft: \`3px solid \${borderColor}\` }}>
      <button onClick={() => setOpen(v => !v)}>
        {title}
        <span className="mr-badge mr-badge-red">{score}</span>
      </button>
      <div
        className="mr-collapse-content"
        style={{ maxHeight: open ? contentRef.current?.scrollHeight + "px" : "0px" }}
        ref={contentRef}
      >
        {children}
      </div>
    </div>
  );
}`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}
