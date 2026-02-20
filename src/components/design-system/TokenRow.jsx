import { useState, useCallback } from "react";

const MONO = { fontFamily: '"Geist Mono", monospace' };

export default function TokenRow({ variable, value, label, bordered = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(`var(${variable})`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [variable]);

  const swatchStyle = {
    background: value,
    ...(bordered ? { boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)" } : {}),
  };

  return (
    <div className="flex items-center gap-3 py-2 group">
      <div
        className="w-10 h-10 rounded-lg flex-shrink-0"
        style={swatchStyle}
      />
      <div className="flex-1 min-w-0">
        <div
          className="text-[14px] font-medium"
          style={{ color: "var(--mr-text-primary)" }}
        >
          {label}
        </div>
        <div
          className="text-[13px]"
          style={{ ...MONO, color: "var(--mr-text-muted)" }}
        >
          {variable} &middot; {value}
        </div>
      </div>
      <button
        onClick={handleCopy}
        className="px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 cursor-pointer"
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
