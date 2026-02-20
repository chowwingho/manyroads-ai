import { useState } from "react";
import CodeBlock from "./CodeBlock";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

const INPUT_BASE = {
  background: "var(--mr-input-bg)",
  color: "var(--mr-input-text)",
  border: "1px solid var(--mr-input-border)",
  borderRadius: "var(--mr-input-radius)",
  padding: "var(--mr-input-padding-y) var(--mr-input-padding-x)",
  fontSize: "16px",
  fontFamily: '"Geist Sans", sans-serif',
  outline: "none",
  transition: "var(--mr-transition-fast)",
  width: "100%",
};

const SELECT_CHEVRON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%23888888' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;

function StateLabel({ children }) {
  return (
    <span
      className="text-[11px] uppercase tracking-wider block mb-2"
      style={{ ...MONO, color: "var(--mr-text-muted)" }}
    >
      {children}
    </span>
  );
}

function DemoCheckbox({ label, defaultChecked = false, disabled = false }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <label
      className="flex items-center gap-3"
      style={{
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
      }}
    >
      <span
        className="inline-flex items-center justify-center flex-shrink-0"
        style={{
          width: 20,
          height: 20,
          borderRadius: "var(--mr-radius-sm)",
          border: `1px solid ${checked ? "var(--mr-input-border-focus)" : "var(--mr-input-border)"}`,
          background: checked
            ? "var(--mr-text-primary)"
            : "var(--mr-input-bg)",
          transition: "var(--mr-transition-fast)",
        }}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6L5 8.5L9.5 3.5"
              stroke="var(--mr-bg-page)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => !disabled && setChecked(!checked)}
        className="sr-only"
        disabled={disabled}
      />
      <span
        className="text-[15px]"
        style={{ color: "var(--mr-text-primary)" }}
      >
        {label}
      </span>
    </label>
  );
}

function DemoRadioGroup() {
  const [selected, setSelected] = useState("option-b");
  const options = [
    { value: "option-a", label: "Option A" },
    { value: "option-b", label: "Option B" },
    { value: "option-c", label: "Option C (disabled)", disabled: true },
  ];

  return (
    <div className="flex items-center gap-6">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-3"
          style={{
            cursor: opt.disabled ? "not-allowed" : "pointer",
            opacity: opt.disabled ? 0.4 : 1,
          }}
        >
          <span
            className="inline-flex items-center justify-center flex-shrink-0"
            style={{
              width: 20,
              height: 20,
              borderRadius: "var(--mr-radius-full)",
              border: `1px solid ${selected === opt.value ? "var(--mr-input-border-focus)" : "var(--mr-input-border)"}`,
              background:
                selected === opt.value
                  ? "var(--mr-text-primary)"
                  : "var(--mr-input-bg)",
              transition: "var(--mr-transition-fast)",
            }}
          >
            {selected === opt.value && (
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "var(--mr-radius-full)",
                  background: "var(--mr-bg-page)",
                  display: "block",
                }}
              />
            )}
          </span>
          <input
            type="radio"
            name="demo-radio"
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => !opt.disabled && setSelected(opt.value)}
            className="sr-only"
            disabled={opt.disabled}
          />
          <span
            className="text-[15px]"
            style={{ color: "var(--mr-text-primary)" }}
          >
            {opt.label}
          </span>
        </label>
      ))}
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label
        className="text-[13px] font-medium uppercase tracking-wider block mb-2"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function FormInputsSection() {
  return (
    <section id="form-inputs" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        <SectionHeader
          marker="FORM_INPUTS"
          title="Form Inputs"
          description="Interactive form elements styled with the Many Roads token system. All inputs use Geist Sans for content, Geist Mono for labels."
        />

        {/* Input Tokens */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            INPUT TOKENS
          </span>
          <CodeBlock>
{`/* --- Form Inputs --- */
--mr-input-bg: var(--mr-bg-page);
--mr-input-border: var(--mr-border-default);
--mr-input-border-focus: var(--mr-text-primary);
--mr-input-border-error: var(--mr-status-critical);
--mr-input-text: var(--mr-text-primary);
--mr-input-placeholder: var(--mr-text-muted);
--mr-input-disabled-opacity: 0.4;
--mr-input-padding-x: 16px;
--mr-input-padding-y: 12px;
--mr-input-radius: var(--mr-radius-md);  /* 8px */`}
          </CodeBlock>
        </div>

        {/* Text Input */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            TEXT INPUT
          </span>

          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <div className="flex items-start gap-4 mb-6">
              {/* Default */}
              <div className="flex-1">
                <StateLabel>Default</StateLabel>
                <input
                  type="text"
                  placeholder="Email address"
                  style={INPUT_BASE}
                />
              </div>

              {/* Focus */}
              <div className="flex-1">
                <StateLabel>Focus</StateLabel>
                <input
                  type="text"
                  placeholder="Email address"
                  style={{
                    ...INPUT_BASE,
                    borderColor: "var(--mr-input-border-focus)",
                    outline: "2px solid var(--mr-input-border-focus)",
                    outlineOffset: "2px",
                  }}
                />
              </div>

              {/* Filled */}
              <div className="flex-1">
                <StateLabel>Filled</StateLabel>
                <input
                  type="text"
                  defaultValue="hello@manyroads.ai"
                  style={INPUT_BASE}
                />
              </div>

              {/* Disabled */}
              <div className="flex-1">
                <StateLabel>Disabled</StateLabel>
                <input
                  type="text"
                  placeholder="Email address"
                  disabled
                  style={{
                    ...INPUT_BASE,
                    opacity: "var(--mr-input-disabled-opacity)",
                    cursor: "not-allowed",
                  }}
                />
              </div>

              {/* Error */}
              <div className="flex-1">
                <StateLabel>Error</StateLabel>
                <input
                  type="text"
                  defaultValue="invalid-email"
                  style={{
                    ...INPUT_BASE,
                    borderColor: "var(--mr-input-border-error)",
                  }}
                />
                <span
                  className="text-[12px] mt-1 block"
                  style={{ color: "var(--mr-input-border-error)" }}
                >
                  Please enter a valid email
                </span>
              </div>
            </div>

            <CodeBlock>
{`/* Text Input */
background: var(--mr-input-bg);
border: 1px solid var(--mr-input-border);
border-radius: var(--mr-input-radius);
padding: var(--mr-input-padding-y) var(--mr-input-padding-x);
font-size: 16px;
color: var(--mr-input-text);

/* Focus */
border-color: var(--mr-input-border-focus);
outline: 2px solid var(--mr-input-border-focus);
outline-offset: 2px;

/* Error */
border-color: var(--mr-input-border-error);`}
            </CodeBlock>
          </div>
        </div>

        {/* Textarea */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            TEXTAREA
          </span>

          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1">
                <StateLabel>Default</StateLabel>
                <textarea
                  placeholder="Tell us about your team..."
                  style={{
                    ...INPUT_BASE,
                    minHeight: "120px",
                    resize: "vertical",
                  }}
                />
              </div>
              <div className="flex-1">
                <StateLabel>Filled</StateLabel>
                <textarea
                  defaultValue="We're a 12-person engineering team looking to adopt AI tooling across our workflow. Main pain points are code review bottleneck and onboarding."
                  style={{
                    ...INPUT_BASE,
                    minHeight: "120px",
                    resize: "vertical",
                  }}
                />
              </div>
            </div>
            <p
              className="text-[13px] leading-[1.6]"
              style={{ color: "var(--mr-text-muted)" }}
            >
              Same styling as text input. Uses{" "}
              <code className="text-[12px]" style={MONO}>
                min-height: 120px
              </code>{" "}
              and{" "}
              <code className="text-[12px]" style={MONO}>
                resize: vertical
              </code>
              .
            </p>
          </div>
        </div>

        {/* Select / Dropdown */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            SELECT / DROPDOWN
          </span>

          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1">
                <StateLabel>Default</StateLabel>
                <select
                  defaultValue=""
                  style={{
                    ...INPUT_BASE,
                    appearance: "none",
                    backgroundImage: SELECT_CHEVRON,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                    paddingRight: "40px",
                  }}
                >
                  <option value="" disabled>
                    Select an option...
                  </option>
                  <option value="trailhead">Trailhead</option>
                  <option value="wayfinder">Wayfinder</option>
                </select>
              </div>
              <div className="flex-1">
                <StateLabel>Selected</StateLabel>
                <select
                  defaultValue="trailhead"
                  style={{
                    ...INPUT_BASE,
                    appearance: "none",
                    backgroundImage: SELECT_CHEVRON,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                    paddingRight: "40px",
                  }}
                >
                  <option value="" disabled>
                    Select an option...
                  </option>
                  <option value="trailhead">Trailhead</option>
                  <option value="wayfinder">Wayfinder</option>
                </select>
              </div>
            </div>
            <p
              className="text-[13px] leading-[1.6]"
              style={{ color: "var(--mr-text-muted)" }}
            >
              Same base styling as text input.{" "}
              <code className="text-[12px]" style={MONO}>
                appearance: none
              </code>{" "}
              with a CSS-only chevron via{" "}
              <code className="text-[12px]" style={MONO}>
                background-image
              </code>
              .
            </p>
          </div>
        </div>

        {/* Checkbox */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            CHECKBOX
          </span>

          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <div className="flex items-start gap-8 mb-4">
              <div>
                <StateLabel>Unchecked</StateLabel>
                <DemoCheckbox label="Enable notifications" />
              </div>
              <div>
                <StateLabel>Checked</StateLabel>
                <DemoCheckbox
                  label="I agree to the terms"
                  defaultChecked={true}
                />
              </div>
              <div>
                <StateLabel>Disabled</StateLabel>
                <DemoCheckbox
                  label="Unavailable option"
                  defaultChecked={true}
                  disabled={true}
                />
              </div>
            </div>
            <p
              className="text-[13px] leading-[1.6]"
              style={{ color: "var(--mr-text-muted)" }}
            >
              20&times;20px,{" "}
              <code className="text-[12px]" style={MONO}>
                --mr-radius-sm
              </code>{" "}
              (4px) corners. Checked state uses{" "}
              <code className="text-[12px]" style={MONO}>
                --mr-text-primary
              </code>{" "}
              fill with white checkmark. Label 8px gap from control.
            </p>
          </div>
        </div>

        {/* Radio Button */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            RADIO BUTTON
          </span>

          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <div className="mb-4">
              <DemoRadioGroup />
            </div>
            <p
              className="text-[13px] leading-[1.6]"
              style={{ color: "var(--mr-text-muted)" }}
            >
              20&times;20px,{" "}
              <code className="text-[12px]" style={MONO}>
                --mr-radius-full
              </code>{" "}
              (circle). Selected state uses{" "}
              <code className="text-[12px]" style={MONO}>
                --mr-text-primary
              </code>{" "}
              fill with 8px white inner dot.
            </p>
          </div>
        </div>

        {/* Form Layout Pattern */}
        <div className="mb-8">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            FORM LAYOUT PATTERN
          </span>

          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-5 max-w-[560px]"
            >
              <FormField label="Name">
                <input
                  type="text"
                  placeholder="Your full name"
                  style={INPUT_BASE}
                />
              </FormField>

              <FormField label="Email">
                <input
                  type="email"
                  placeholder="you@company.com"
                  style={INPUT_BASE}
                />
              </FormField>

              <FormField label="Company Size">
                <select
                  defaultValue=""
                  style={{
                    ...INPUT_BASE,
                    appearance: "none",
                    backgroundImage: SELECT_CHEVRON,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 14px center",
                    paddingRight: "40px",
                  }}
                >
                  <option value="" disabled>
                    Select team size...
                  </option>
                  <option value="1-10">1–10 people</option>
                  <option value="11-50">11–50 people</option>
                  <option value="51-200">51–200 people</option>
                  <option value="200+">200+ people</option>
                </select>
              </FormField>

              <FormField label="Description">
                <textarea
                  placeholder="Tell us about your team's AI adoption goals..."
                  style={{
                    ...INPUT_BASE,
                    minHeight: "120px",
                    resize: "vertical",
                  }}
                />
              </FormField>

              <div className="pt-1">
                <DemoCheckbox label="I agree to the terms of service" />
              </div>

              <FormField label="Preferred Pathway">
                <DemoRadioGroup />
              </FormField>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 rounded-lg text-lg font-medium cursor-pointer"
                  style={{
                    ...MONO,
                    background: "var(--mr-bg-button-primary)",
                    color: "var(--mr-text-primary)",
                    border: "none",
                    transition: "var(--mr-transition-fast)",
                  }}
                >
                  Submit assessment_
                </button>
              </div>
            </form>

            <p
              className="text-[13px] leading-[1.6] italic mt-6"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              This form is a layout demonstration only — it does not submit
              data.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
