import CodeBlock from "./CodeBlock";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

const SHADOW_TOKENS = [
  {
    token: "--mr-shadow-sm",
    usage: "Subtle lift (dropdowns)",
    lightValue: "0 1px 2px rgba(38, 38, 37, 0.05)",
    darkValue: "0 1px 2px rgba(0, 0, 0, 0.2)",
  },
  {
    token: "--mr-shadow-md",
    usage: "Moderate elevation (popovers)",
    lightValue: "0 4px 12px rgba(38, 38, 37, 0.08)",
    darkValue: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
  {
    token: "--mr-shadow-lg",
    usage: "Strong elevation (modals)",
    lightValue: "0 8px 24px rgba(38, 38, 37, 0.12)",
    darkValue: "0 8px 24px rgba(0, 0, 0, 0.4)",
  },
];

export default function ShadowsSection() {
  return (
    <section id="shadows" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        <SectionHeader
          marker="SHADOWS"
          title="Shadows"
          description="Minimal elevation by design. Three shadow tokens reserved for elements that genuinely need to float above the page."
        />

        {/* Philosophy */}
        <div className="mb-16">
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <span
              className="text-[14px] font-medium block mb-3"
              style={{ ...MONO, color: "var(--mr-text-primary)" }}
            >
              PHILOSOPHY
            </span>
            <p
              className="text-[17px] leading-[1.6]"
              style={{ color: "var(--mr-text-primary)" }}
            >
              We use minimal elevation. Hierarchy comes from background value
              shifts within the warm neutral ramp, not from shadows. This is a
              deliberate design choice aligned with the &ldquo;restraint over
              decoration&rdquo; principle.
            </p>
          </div>
        </div>

        {/* When Used */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-4"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            WHEN SHADOWS ARE USED
          </span>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <span
                className="text-[14px] mt-0.5 flex-shrink-0"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                &mdash;
              </span>
              <span
                className="text-[15px] leading-[1.5]"
                style={{ color: "var(--mr-text-muted)" }}
              >
                Sparingly, for elements that must appear elevated above the
                page (future: modals, dropdowns, tooltips)
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span
                className="text-[14px] mt-0.5 flex-shrink-0"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                &mdash;
              </span>
              <span
                className="text-[15px] leading-[1.5]"
                style={{ color: "var(--mr-text-muted)" }}
              >
                Never for cards, buttons, or static layout elements
              </span>
            </div>
          </div>
        </div>

        {/* Shadow Tokens */}
        <div className="mb-8">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            SHADOW TOKENS
          </span>
          <div className="flex gap-8 mb-8">
            {SHADOW_TOKENS.map((s) => (
              <div key={s.token} className="flex-1 flex flex-col items-center">
                <div
                  className="w-[120px] h-[120px] rounded-lg mb-4"
                  style={{
                    background: "var(--mr-bg-card)",
                    boxShadow: `var(${s.token})`,
                  }}
                />
                <span
                  className="text-[13px] font-medium text-center"
                  style={{ ...MONO, color: "var(--mr-text-primary)" }}
                >
                  {s.token}
                </span>
                <span
                  className="text-[12px] text-center mt-1"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  {s.lightValue}
                </span>
                <span
                  className="text-[12px] text-center mt-1"
                  style={{ color: "var(--mr-text-muted)" }}
                >
                  {s.usage}
                </span>
              </div>
            ))}
          </div>
          <CodeBlock>
{`/* Light mode */
--mr-shadow-sm: 0 1px 2px rgba(38, 38, 37, 0.05);
--mr-shadow-md: 0 4px 12px rgba(38, 38, 37, 0.08);
--mr-shadow-lg: 0 8px 24px rgba(38, 38, 37, 0.12);

/* Dark mode */
--mr-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
--mr-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.3);
--mr-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);`}
          </CodeBlock>
        </div>
      </div>
    </section>
  );
}
