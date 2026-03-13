'use client'
import { useState } from "react";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";
import CodeBlock from "./CodeBlock";

const EXAMPLE_LINES = [
  { n: 1, code: "// Assessment score calculation" },
  { n: 2, code: "function scoreSection(responses) {" },
  { n: 3, code: "  const valid = responses.filter(r => r.score !== null);" },
  { n: 4, code: "  if (!valid.length) return null;" },
  { n: 5, code: "  const sum = valid.reduce((a, r) => a + r.score, 0);" },
  { n: 6, code: "  return sum / valid.length;" },
  { n: 7, code: "}" },
];

function LiveCodeBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = EXAMPLE_LINES.map(l => l.code).join("\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="mr-code-block max-w-[600px]">
      <div className="mr-code-header">
        <span
          className="text-[12px]"
          style={{ ...MONO, color: "var(--mr-text-muted)" }}
        >
          scoreSection.js
        </span>
        <button
          onClick={handleCopy}
          className="text-[11px] px-2 py-1 rounded cursor-pointer transition-colors"
          style={{
            ...MONO,
            background: "var(--mr-bg-button-primary)",
            color: "var(--mr-text-muted)",
          }}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="mr-code-body">
        {EXAMPLE_LINES.map(({ n, code }) => (
          <div key={n} className="leading-[1.8]">
            <span className="mr-code-line-num">{n}</span>
            <span style={{ color: "var(--mr-text-primary)" }}>{code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CodeBlocksSection() {
  return (
    <section id="code-blocks" className="py-20">
      <div className="border-t pt-12" style={{ borderColor: "var(--mr-border-default)" }}>
        <SectionHeader
          marker="COMPONENTS"
          title="Code Blocks"
          description="Used in the design system reference and assessment reports to display code samples. The green-tinted background is intentional — it connects the code block to the brand color system."
        />

        <div className="mb-8">
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-4"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Live example
          </span>
          <LiveCodeBlock />
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10 max-w-[600px]">
          <div
            className="rounded-lg p-4"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <div
              className="text-[12px] mb-2"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Structure
            </div>
            <ul
              className="text-[13px] leading-[1.8]"
              style={{ color: "var(--mr-text-primary)" }}
            >
              <li><code>.mr-code-block</code> — outer container</li>
              <li><code>.mr-code-header</code> — filename + copy btn</li>
              <li><code>.mr-code-body</code> — line content</li>
              <li><code>.mr-code-line-num</code> — gutter numbers</li>
            </ul>
          </div>
          <div
            className="rounded-lg p-4"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <div
              className="text-[12px] mb-2"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Tokens used
            </div>
            <ul
              className="text-[13px] leading-[1.8]"
              style={{ color: "var(--mr-text-primary)" }}
            >
              <li><code>--mr-bg-code</code> → green-1</li>
              <li><code>--mr-bg-code-header</code> → green-a2</li>
              <li><code>--mr-code-line-number</code> → green-a5</li>
              <li><code>--mr-border-default</code></li>
            </ul>
          </div>
        </div>

        <div>
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-3"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Usage
          </span>
          <CodeBlock>{`<div className="mr-code-block">
  <div className="mr-code-header">
    <span style={MONO}>filename.js</span>
    <button onClick={handleCopy}>Copy</button>
  </div>
  <div className="mr-code-body">
    <div>
      <span className="mr-code-line-num">1</span>
      const result = compute();
    </div>
  </div>
</div>`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}
