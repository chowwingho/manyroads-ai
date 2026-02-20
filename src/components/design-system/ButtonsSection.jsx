import CodeBlock from "./CodeBlock";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

const BUTTON_VARIANTS = [
  {
    name: "Primary",
    label: "Run the assessment_",
    bg: "var(--mr-bg-button-primary)",
    hover: "var(--mr-hover-primary)",
    active: "var(--mr-hover-pathway)",
    text: "var(--mr-text-primary)",
    border: "none",
    code: `background: var(--mr-bg-button-primary);
color: var(--mr-text-primary);
/* hover */
background: var(--mr-hover-primary);`,
  },
  {
    name: "Pathway",
    label: "Get the assessment_",
    bg: "var(--mr-bg-button-pathway)",
    hover: "var(--mr-hover-pathway)",
    active: "var(--mr-bg-button-primary)",
    text: "var(--mr-text-primary)",
    border: "none",
    code: `background: var(--mr-bg-button-pathway);
color: var(--mr-text-primary);
/* hover */
background: var(--mr-hover-pathway);`,
  },
  {
    name: "Ghost / Secondary",
    label: "Talk to our team_",
    bg: "transparent",
    hover: "var(--mr-bg-card)",
    active: "var(--mr-bg-button-primary)",
    text: "var(--mr-text-primary)",
    border: "1px solid var(--mr-border-default)",
    code: `background: transparent;
border: 1px solid var(--mr-border-default);
color: var(--mr-text-primary);
/* hover */
background: var(--mr-bg-card);`,
  },
];

function ButtonSample({ label, bg, text, border, style: extraStyle }) {
  return (
    <span
      className="inline-flex items-center px-4 py-2 rounded-lg text-lg font-medium"
      style={{
        ...MONO,
        background: bg,
        color: text,
        border: border || "none",
        ...extraStyle,
      }}
    >
      {label}
    </span>
  );
}

export default function ButtonsSection() {
  return (
    <section id="buttons" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        <SectionHeader
          marker="BUTTONS"
          title="Buttons"
          description="Three button variants, all in Geist Mono. Warm neutral ramp for backgrounds, one-step darkening on hover. Trailing underscore is a brand convention."
        />

        {/* Button Variants */}
        <div className="flex flex-col gap-8 mb-16">
          {BUTTON_VARIANTS.map((variant) => (
            <div
              key={variant.name}
              className="rounded-xl p-8"
              style={{
                background: "var(--mr-bg-card)",
                border: "1px solid var(--mr-border-default)",
              }}
            >
              <span
                className="text-[14px] font-medium block mb-6"
                style={{ ...MONO, color: "var(--mr-text-primary)" }}
              >
                {variant.name.toUpperCase()}
              </span>

              {/* State row: Default → Hover → Active → Disabled */}
              <div className="flex items-center gap-4 mb-6 flex-wrap">
                <div className="flex flex-col items-start gap-2">
                  <span
                    className="text-[11px] uppercase tracking-wider"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    Default
                  </span>
                  <ButtonSample
                    label={variant.label}
                    bg={variant.bg}
                    text={variant.text}
                    border={variant.border}
                  />
                </div>

                <div className="flex flex-col items-start gap-2">
                  <span
                    className="text-[11px] uppercase tracking-wider"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    Hover
                  </span>
                  <ButtonSample
                    label={variant.label}
                    bg={variant.hover}
                    text={variant.text}
                    border={variant.border}
                  />
                </div>

                <div className="flex flex-col items-start gap-2">
                  <span
                    className="text-[11px] uppercase tracking-wider"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    Active
                  </span>
                  <ButtonSample
                    label={variant.label}
                    bg={variant.active}
                    text={variant.text}
                    border={variant.border}
                  />
                </div>

                <div className="flex flex-col items-start gap-2">
                  <span
                    className="text-[11px] uppercase tracking-wider"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    Disabled
                  </span>
                  <ButtonSample
                    label={variant.label}
                    bg={variant.bg}
                    text={variant.text}
                    border={variant.border}
                    style={{ opacity: 0.4, cursor: "not-allowed" }}
                  />
                </div>
              </div>

              <CodeBlock>{variant.code}</CodeBlock>
            </div>
          ))}
        </div>

        {/* Hover Behavior Rule */}
        <div
          className="rounded-xl p-8 mb-16"
          style={{
            background: "var(--mr-bg-card)",
            border: "1px solid var(--mr-border-default)",
          }}
        >
          <span
            className="text-[14px] font-medium block mb-3"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            HOVER BEHAVIOR
          </span>
          <p
            className="text-[17px] leading-[1.6]"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Buttons darken by one step down the warm neutral ramp on hover.
            No color shift, no shadow change, just a value shift.
            Transition:{" "}
            <code
              className="text-[14px] px-1.5 py-0.5 rounded"
              style={{
                ...MONO,
                background: "var(--mr-bg-page)",
                color: "var(--mr-text-primary)",
              }}
            >
              --mr-transition-fast
            </code>{" "}
            (150ms ease).
          </p>
        </div>

        {/* Interactive States */}
        <div>
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            INTERACTIVE STATES
          </span>

          <div className="flex flex-col gap-8">
            {/* Focus Rings */}
            <div
              className="rounded-xl p-8"
              style={{
                background: "var(--mr-bg-card)",
                border: "1px solid var(--mr-border-default)",
              }}
            >
              <span
                className="text-[13px] font-medium block mb-4 uppercase tracking-wider"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Focus Rings
              </span>
              <div className="flex items-center gap-6 mb-4">
                <span
                  className="inline-flex items-center px-4 py-2 rounded-lg text-lg font-medium"
                  style={{
                    ...MONO,
                    background: "var(--mr-bg-button-primary)",
                    color: "var(--mr-text-primary)",
                    outline: "2px solid var(--mr-text-primary)",
                    outlineOffset: "2px",
                  }}
                >
                  Focused button_
                </span>
              </div>
              <p
                className="text-[15px] leading-[1.6] mb-3"
                style={{ color: "var(--mr-text-muted)" }}
              >
                2px solid outline, offset 2px, using{" "}
                <code className="text-[13px]" style={MONO}>
                  --mr-text-primary
                </code>{" "}
                color. Works in both light and dark modes.
              </p>
              <p
                className="text-[15px] leading-[1.6]"
                style={{ color: "var(--mr-text-muted)" }}
              >
                All interactive elements must have visible focus indicators for
                accessibility.
              </p>
            </div>

            {/* Link Styles */}
            <div
              className="rounded-xl p-8"
              style={{
                background: "var(--mr-bg-card)",
                border: "1px solid var(--mr-border-default)",
              }}
            >
              <span
                className="text-[13px] font-medium block mb-4 uppercase tracking-wider"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Link Styles
              </span>
              <div className="flex items-center gap-8 mb-4">
                <div className="flex flex-col items-start gap-2">
                  <span
                    className="text-[11px] uppercase tracking-wider"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    Default
                  </span>
                  <span
                    className="text-[17px] underline underline-offset-4"
                    style={{ color: "var(--mr-text-primary)" }}
                  >
                    or talk to our team
                  </span>
                </div>
                <div className="flex flex-col items-start gap-2">
                  <span
                    className="text-[11px] uppercase tracking-wider"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    Hover
                  </span>
                  <span
                    className="text-[17px] underline underline-offset-4"
                    style={{ color: "var(--mr-text-muted)" }}
                  >
                    or talk to our team
                  </span>
                </div>
              </div>
              <p
                className="text-[15px] leading-[1.6]"
                style={{ color: "var(--mr-text-muted)" }}
              >
                No distinct visited style — warm palette doesn&rsquo;t
                accommodate purple well. Deliberate choice.
              </p>
            </div>

            {/* Loading State */}
            <div
              className="rounded-xl p-8"
              style={{
                background: "var(--mr-bg-card)",
                border: "1px solid var(--mr-border-default)",
              }}
            >
              <span
                className="text-[13px] font-medium block mb-4 uppercase tracking-wider"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Loading State
              </span>
              <div className="flex items-center gap-6 mb-4">
                <span
                  className="inline-flex items-center px-4 py-2 rounded-lg text-lg font-medium"
                  style={{
                    ...MONO,
                    background: "var(--mr-bg-button-primary)",
                    color: "var(--mr-text-primary)",
                    opacity: 0.7,
                    cursor: "not-allowed",
                    pointerEvents: "none",
                  }}
                >
                  Loading...
                </span>
              </div>
              <p
                className="text-[13px] leading-[1.6] italic"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Loading pattern to be finalized when assessment tool is built.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
