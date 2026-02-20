import TokenRow from "./TokenRow";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

// Full ramp values (lightest → darkest for light mode, darkest → lightest for dark mode)
const LIGHT_RAMP = [
  "#FAF9F6",
  "#F0EEE6",
  "#E8E6DD",
  "#DEDAD0",
  "#D1CFC6",
  "#C5C3BA",
  "#888888",
  "#262625",
];

const DARK_RAMP = [
  "#111110",
  "#1A1A18",
  "#262624",
  "#333331",
  "#3D3D3A",
  "#4A4A47",
  "rgba(236,236,234,0.5)",
  "#ECECEA",
];

// Token definitions grouped by category
const LIGHT_TOKENS = {
  Backgrounds: [
    { variable: "--mr-bg-page", value: "#FAF9F6", label: "Page & Navbar Background", bordered: true },
    { variable: "--mr-bg-card", value: "#F0EEE6", label: "Card Fill & Tech Badges" },
    { variable: "--mr-bg-button-primary", value: "#E8E6DD", label: "Primary Button Fill" },
    { variable: "--mr-bg-button-pathway", value: "#D1CFC6", label: "Pathway Button Fill" },
  ],
  Text: [
    { variable: "--mr-text-primary", value: "#262625", label: "Primary Text" },
    { variable: "--mr-text-muted", value: "#888888", label: "Muted Text" },
  ],
  "Interactive / Hover": [
    { variable: "--mr-hover-primary", value: "#DEDAD0", label: "Primary Button Hover" },
    { variable: "--mr-hover-pathway", value: "#C5C3BA", label: "Pathway Button Hover" },
  ],
  Borders: [
    { variable: "--mr-border-default", value: "rgba(38, 38, 37, 0.12)", label: "Default Border (12% opacity)" },
  ],
  Footer: [
    { variable: "--mr-footer-bg", value: "#262625", label: "Footer Background" },
    { variable: "--mr-footer-text", value: "#FFFFFF", label: "Footer Text", bordered: true },
    { variable: "--mr-footer-sub", value: "rgba(255, 255, 255, 0.6)", label: "Footer Subtitle (60% white)" },
    { variable: "--mr-footer-divider", value: "rgba(255, 255, 255, 0.15)", label: "Footer Divider (15% white)" },
  ],
};

const DARK_TOKENS = {
  Backgrounds: [
    { variable: "--mr-bg-page", value: "#1A1A18", label: "Page & Navbar Background" },
    { variable: "--mr-bg-card", value: "#262624", label: "Card Fill & Tech Badges" },
    { variable: "--mr-bg-button-primary", value: "#333331", label: "Primary Button Fill" },
    { variable: "--mr-bg-button-pathway", value: "#3D3D3A", label: "Pathway Button Fill" },
  ],
  Text: [
    { variable: "--mr-text-primary", value: "#ECECEA", label: "Primary Text" },
    { variable: "--mr-text-muted", value: "rgba(236, 236, 234, 0.5)", label: "Muted Text (50% opacity)" },
  ],
  "Interactive / Hover": [
    { variable: "--mr-hover-primary", value: "#3D3D3A", label: "Primary Button Hover" },
    { variable: "--mr-hover-pathway", value: "#4A4A47", label: "Pathway Button Hover" },
  ],
  Borders: [
    { variable: "--mr-border-default", value: "rgba(236, 236, 234, 0.1)", label: "Default Border (10% opacity)" },
  ],
  Footer: [
    { variable: "--mr-footer-bg", value: "#111110", label: "Footer Background" },
    { variable: "--mr-footer-text", value: "#FFFFFF", label: "Footer Text", bordered: true },
    { variable: "--mr-footer-sub", value: "rgba(255, 255, 255, 0.6)", label: "Footer Subtitle (60% white)" },
    { variable: "--mr-footer-divider", value: "rgba(255, 255, 255, 0.15)", label: "Footer Divider (15% white)" },
  ],
};

// Hex values intentional — documenting the raw accent palette colors.
// Blue is tokenized as --mr-accent-default; Green/Orange as --mr-status-positive/warning.
const ACCENT_COLORS = [
  { name: "Green", value: "#3D7A41", contrast: "4.7:1" },
  { name: "Mauve", value: "#8A708A", contrast: "4.1:1" },
  { name: "Blue", value: "#4F769A", contrast: "4.3:1", isDefault: true },
  { name: "Orange", value: "#C47030", contrast: "3.5:1" },
  { name: "Amber", value: "#B8892A", contrast: "3.1:1" },
];

function ColorRamp({ colors, label }) {
  return (
    <div className="mb-6">
      <span
        className="text-[13px] font-medium block mb-2"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        {label}
      </span>
      <div className="flex rounded-xl overflow-hidden">
        {colors.map((color, i) => (
          <div
            key={i}
            className="flex-1 h-16 flex items-end justify-center pb-2"
            style={{ background: color }}
          >
            <span
              className="text-[10px] font-medium"
              style={{
                ...MONO,
                color: i < colors.length / 2 ? "#262625" : "#FAF9F6",
              }}
            >
              {color.startsWith("rgba") ? "rgba" : color}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TokenGroup({ title, tokens }) {
  return (
    <div className="mb-8">
      <span
        className="text-[13px] font-medium block mb-3 uppercase tracking-wider"
        style={{ ...MONO, color: "var(--mr-text-muted)" }}
      >
        {title}
      </span>
      <div className="flex flex-col">
        {tokens.map((token) => (
          <TokenRow key={`${token.variable}-${token.value}`} {...token} />
        ))}
      </div>
    </div>
  );
}

export default function ColorSection() {
  return (
    <section id="colors" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        <SectionHeader
          marker="COLOR_TOKENS"
          title="Colors"
          description="Warm neutrals across 8 steps. Every token has a light and dark pair. The page's dark mode toggle switches the live swatches; static hex values are always visible."
        />

        {/* Color ramps */}
        <div className="mb-16">
          <ColorRamp colors={LIGHT_RAMP} label="LIGHT MODE RAMP" />
          <ColorRamp colors={DARK_RAMP} label="DARK MODE RAMP" />
        </div>

        {/* Side-by-side token panels */}
        <div className="grid grid-cols-2 gap-8 mb-16">
          {/*
            These panels intentionally use hardcoded hex values, NOT var(--mr-*) tokens.
            They must always show their respective mode's colors regardless of the page's
            current theme. Do not convert these to CSS variables.
          */}
          {/* Light mode tokens */}
          <div
            className="rounded-xl p-8"
            style={{
              background: "#FAF9F6",
              border: "1px solid rgba(38, 38, 37, 0.12)",
            }}
          >
            <span
              className="text-[14px] font-medium block mb-6"
              style={{ ...MONO, color: "#262625" }}
            >
              LIGHT MODE
            </span>
            {Object.entries(LIGHT_TOKENS).map(([title, tokens]) => (
              <div key={title} className="mb-6 last:mb-0">
                <span
                  className="text-[11px] font-medium block mb-2 uppercase tracking-wider"
                  style={{ ...MONO, color: "#888888" }}
                >
                  {title}
                </span>
                {tokens.map((token) => (
                  <div key={token.variable} className="flex items-center gap-3 py-1.5">
                    <div
                      className="w-8 h-8 rounded-md flex-shrink-0"
                      style={{
                        background: token.value,
                        ...(token.bordered
                          ? { boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08)" }
                          : {}),
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[13px] block" style={{ ...MONO, color: "#262625" }}>
                        {token.variable}
                      </span>
                      <span className="text-[12px]" style={{ ...MONO, color: "#888888" }}>
                        {token.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Dark mode tokens */}
          <div
            className="rounded-xl p-8"
            style={{
              background: "#262624",
              border: "1px solid rgba(236, 236, 234, 0.1)",
            }}
          >
            <span
              className="text-[14px] font-medium block mb-6"
              style={{ ...MONO, color: "#ECECEA" }}
            >
              DARK MODE
            </span>
            {Object.entries(DARK_TOKENS).map(([title, tokens]) => (
              <div key={title} className="mb-6 last:mb-0">
                <span
                  className="text-[11px] font-medium block mb-2 uppercase tracking-wider"
                  style={{ ...MONO, color: "rgba(236, 236, 234, 0.5)" }}
                >
                  {title}
                </span>
                {tokens.map((token) => (
                  <div key={token.variable} className="flex items-center gap-3 py-1.5">
                    <div
                      className="w-8 h-8 rounded-md flex-shrink-0"
                      style={{
                        background: token.value,
                        ...(token.bordered
                          ? { boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)" }
                          : {}),
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[13px] block" style={{ ...MONO, color: "#ECECEA" }}>
                        {token.variable}
                      </span>
                      <span className="text-[12px]" style={{ ...MONO, color: "rgba(236, 236, 234, 0.5)" }}>
                        {token.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Live token swatches (respond to dark mode toggle) */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            LIVE TOKENS (follows current theme)
          </span>
          {Object.entries(LIGHT_TOKENS).map(([title, tokens]) => (
            <TokenGroup
              key={title}
              title={title}
              tokens={tokens.map((t) => ({
                ...t,
                value: `var(${t.variable})`,
              }))}
            />
          ))}
        </div>

        {/* Accent colors */}
        <div>
          <span
            className="text-[14px] font-medium block mb-2"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            ACCENT PALETTE
          </span>
          <p
            className="text-[15px] leading-[1.6] mb-2"
            style={{ color: "var(--mr-text-muted)" }}
          >
            One accent color at a time, applied sparingly to interactive elements.
            Blue is the default. Contrast ratios measured against white.
          </p>
          <p
            className="text-[13px] leading-[1.6] mb-6 italic"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Internal testing only &mdash; accent color has not been finalized for production use.
          </p>
          <div className="flex gap-4">
            {ACCENT_COLORS.map((accent) => (
              <div
                key={accent.name}
                className="flex-1 rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--mr-border-default)" }}
              >
                <div
                  className="h-20"
                  style={{ background: accent.value }}
                />
                <div
                  className="p-4"
                  style={{ background: "var(--mr-bg-card)" }}
                >
                  <span
                    className="text-[14px] font-medium block"
                    style={{ color: "var(--mr-text-primary)" }}
                  >
                    {accent.name}
                    {accent.isDefault && (
                      <span
                        className="text-[11px] ml-2 font-normal"
                        style={{ ...MONO, color: "var(--mr-text-muted)" }}
                      >
                        default
                      </span>
                    )}
                  </span>
                  <span
                    className="text-[13px] block"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    {accent.value} &middot; {accent.contrast}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
