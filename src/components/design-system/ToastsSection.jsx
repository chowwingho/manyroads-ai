'use client'
import { useState } from "react";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";
import CodeBlock from "./CodeBlock";

function ToastDemo() {
  const [visible, setVisible] = useState(false);

  const trigger = () => {
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={trigger}
        className="mr-btn-primary px-4 py-2 rounded-lg text-[14px] w-fit cursor-pointer"
        style={MONO}
      >
        Trigger toast_
      </button>
      <div
        className="mr-toast w-fit"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(4px)",
        }}
      >
        <span>✓</span>
        <span>Token copied to clipboard</span>
      </div>
    </div>
  );
}

export default function ToastsSection() {
  return (
    <section id="toasts" className="py-20">
      <div className="border-t pt-12" style={{ borderColor: "var(--mr-border-default)" }}>
        <SectionHeader
          marker="COMPONENTS"
          title="Toasts"
          description="Non-blocking confirmation messages. Used for copy-to-clipboard feedback, form submission success, and brief system notifications."
        />

        <div className="flex flex-col gap-10">
          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-4"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Interactive demo
            </span>
            <ToastDemo />
          </div>

          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-4"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Static example
            </span>
            <div className="mr-toast w-fit">
              <span>✓</span>
              <span>Link copied to clipboard</span>
            </div>
          </div>

          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-2"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Tokens
            </span>
            <div
              className="flex gap-4 text-[13px] mb-6"
              style={{ color: "var(--mr-text-muted)" }}
            >
              <span style={MONO}>--mr-toast-bg → var(--mr-green-7)</span>
              <span style={MONO}>--mr-toast-text → #FFFFFF</span>
            </div>
          </div>

          <div>
            <span
              className="text-[13px] font-medium uppercase tracking-wider block mb-3"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              Auto-dismiss pattern
            </span>
            <CodeBlock>{`'use client'
import { useState } from "react";

function CopyButton({ value }) {
  const [visible, setVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 1500);
    });
  };

  return (
    <>
      <button onClick={handleCopy}>Copy</button>
      <div
        className="mr-toast"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 300ms ease, transform 300ms ease",
        }}
      >
        ✓ Copied!
      </div>
    </>
  );
}`}</CodeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
