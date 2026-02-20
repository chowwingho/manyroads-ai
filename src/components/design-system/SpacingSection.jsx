import { useState } from "react";
import CodeBlock from "./CodeBlock";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

const SPACING_TOKENS = [
  { token: "--mr-space-xs", value: 16, usage: "Inner gaps, tight spacing" },
  { token: "--mr-space-sm", value: 24, usage: "Card padding, list gaps" },
  { token: "--mr-space-md", value: 32, usage: "Component gaps" },
  { token: "--mr-space-lg", value: 48, usage: "Section inner padding" },
  { token: "--mr-space-xl", value: 80, usage: "Section gaps (minimum)" },
  { token: "--mr-space-2xl", value: 120, usage: "Section gaps (maximum)" },
];

const RADIUS_TOKENS = [
  { token: "--mr-radius-sm", value: "4px", usage: "Badges, small elements" },
  { token: "--mr-radius-md", value: "8px", usage: "Cards, inputs" },
  { token: "--mr-radius-lg", value: "12px", usage: "Modals, large containers" },
  { token: "--mr-radius-full", value: "9999px", usage: "Pills, avatars" },
];

const MOTION_TOKENS = [
  { token: "--mr-transition-fast", value: "150ms ease", usage: "Hover states, toggles" },
  { token: "--mr-transition-base", value: "250ms ease", usage: "Content transitions" },
  { token: "--mr-transition-slow", value: "400ms ease", usage: "Page-level transitions" },
];

function MotionSquare({ token, value, usage }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex-1">
      <div
        className="h-20 rounded-lg mb-3 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? "var(--mr-bg-button-pathway)"
            : "var(--mr-bg-card)",
          border: "1px solid var(--mr-border-default)",
          transition: `background ${value}`,
        }}
      />
      <span
        className="text-[13px] font-medium block"
        style={{ ...MONO, color: "var(--mr-text-primary)" }}
      >
        {token}
      </span>
      <span
        className="text-[12px] block"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        {value}
      </span>
      <span
        className="text-[12px] block mt-1"
        style={{ color: "var(--mr-text-muted)" }}
      >
        {usage}
      </span>
    </div>
  );
}

export default function SpacingSection() {
  return (
    <section id="spacing" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        <SectionHeader
          marker="SPACING"
          title="Spacing"
          description="Six named spacing tokens, four border radii, and three motion presets. All values are defined in tokens.css and referenced via CSS custom properties."
        />

        {/* Named Spacing Tokens */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            SPACING SCALE
          </span>
          <div className="flex flex-col gap-4">
            {SPACING_TOKENS.map((sp) => (
              <div key={sp.token} className="flex items-center gap-6">
                {/* Visual bar */}
                <div
                  className="h-8 rounded flex-shrink-0"
                  style={{
                    width: `${sp.value}px`,
                    background: "var(--mr-bg-button-pathway)",
                  }}
                />
                {/* Token info */}
                <div className="flex items-baseline gap-4 min-w-0">
                  <span
                    className="text-[13px] font-medium flex-shrink-0"
                    style={{ ...MONO, color: "var(--mr-text-primary)" }}
                  >
                    {sp.token}
                  </span>
                  <span
                    className="text-[13px] flex-shrink-0"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    {sp.value}px
                  </span>
                  <span
                    className="text-[13px]"
                    style={{ color: "var(--mr-text-muted)" }}
                  >
                    {sp.usage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Border Radius Tokens */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            BORDER RADIUS
          </span>
          <div className="flex gap-8">
            {RADIUS_TOKENS.map((r) => (
              <div key={r.token} className="flex flex-col items-center">
                <div
                  className="w-20 h-20 mb-3"
                  style={{
                    background: "var(--mr-bg-button-pathway)",
                    borderRadius: r.value,
                  }}
                />
                <span
                  className="text-[13px] font-medium"
                  style={{ ...MONO, color: "var(--mr-text-primary)" }}
                >
                  {r.value}
                </span>
                <span
                  className="text-[12px] mt-1"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  {r.token}
                </span>
                <span
                  className="text-[12px] mt-1 text-center"
                  style={{ color: "var(--mr-text-muted)" }}
                >
                  {r.usage}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Motion Tokens */}
        <div className="mb-8">
          <span
            className="text-[14px] font-medium block mb-2"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            MOTION
          </span>
          <p
            className="text-[15px] leading-[1.6] mb-6"
            style={{ color: "var(--mr-text-muted)" }}
          >
            Hover each square to see the transition speed in action.
          </p>
          <div className="flex gap-6 mb-6">
            {MOTION_TOKENS.map((m) => (
              <MotionSquare key={m.token} {...m} />
            ))}
          </div>
          <CodeBlock>
{`--mr-transition-fast: 150ms ease;   /* Hover states, toggles */
--mr-transition-base: 250ms ease;   /* Content transitions */
--mr-transition-slow: 400ms ease;   /* Page-level transitions */`}
          </CodeBlock>
        </div>
      </div>
    </section>
  );
}
