'use client'
import { useState, useCallback } from "react";
import { MONO } from "./constants";

export default function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const text = typeof children === "string" ? children : String(children);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [children]);

  return (
    <div className="relative group">
      <pre
        className="rounded-lg p-5 text-[13px] leading-[1.7] overflow-x-auto"
        style={{
          ...MONO,
          background: "var(--mr-bg-card)",
          color: "var(--mr-text-primary)",
          border: "1px solid var(--mr-border-default)",
        }}
      >
        <code>{children}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        style={{
          ...MONO,
          background: "var(--mr-bg-button-primary)",
          color: "var(--mr-text-muted)",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}
