import CodeBlock from "./CodeBlock";

const MONO = { fontFamily: '"Geist Mono", monospace' };

const NAVBAR_SPECS = [
  { property: "Position", value: "sticky top-0" },
  { property: "Height", value: "h-[77px] (77px)" },
  { property: "Z-index", value: "z-50" },
  { property: "Background", value: "--mr-bg-page" },
  { property: "Backdrop blur", value: "None" },
  { property: "Border bottom", value: "None" },
];

const FOOTER_SPECS = [
  { property: "Background", value: "Always dark (#262625 / #111110)" },
  { property: "Padding", value: "py-24 px-12" },
  { property: "Text color", value: "--mr-footer-text (white)" },
  { property: "Subtitle", value: "--mr-footer-sub (white/60%)" },
  { property: "Dividers", value: "--mr-footer-divider (white/15%)" },
  { property: "Wordmark size", value: "clamp(80px, 15vw, 200px)" },
];

export default function NavigationSection() {
  return (
    <section id="navigation" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        {/* Section header */}
        <span
          className="text-lg font-medium block mb-2"
          style={{ ...MONO, color: "var(--mr-text-primary)" }}
        >
          <span style={{ color: "#4F769A" }}>//</span> NAVIGATION
        </span>
        <h2
          className="text-[36px] font-medium leading-[1.2] tracking-tight mb-3"
          style={{ color: "var(--mr-text-primary)" }}
        >
          Navigation
        </h2>
        <p
          className="text-[17px] leading-[1.6] max-w-[560px] mb-12"
          style={{ color: "var(--mr-text-muted)" }}
        >
          Sticky navbar and always-dark footer. Both use Geist Mono for all
          navigation text.
        </p>

        {/* Navbar */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            NAVBAR
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            {/* Miniature navbar recreation */}
            <div
              className="rounded-lg flex items-center justify-between px-6 mb-6"
              style={{
                background: "var(--mr-bg-page)",
                border: "1px solid var(--mr-border-default)",
                height: "56px",
              }}
            >
              {/* Logo */}
              <span
                className="text-[14px] font-medium"
                style={{ ...MONO, color: "var(--mr-text-primary)" }}
              >
                Many_Roads &lt;AI&gt;
              </span>

              {/* Nav links */}
              <div className="flex gap-4">
                {["Trailhead", "Wayfinder", "Team", "Contact"].map(
                  (link) => (
                    <span
                      key={link}
                      className="text-[13px] font-medium"
                      style={{ ...MONO, color: "var(--mr-text-muted)" }}
                    >
                      {link}
                    </span>
                  )
                )}
              </div>

              {/* Toggle */}
              <span
                className="text-[12px] px-2 py-1 rounded-md"
                style={{
                  ...MONO,
                  color: "var(--mr-text-muted)",
                  border: "1px solid var(--mr-border-default)",
                }}
              >
                [ dark_ ]
              </span>
            </div>

            {/* Specs table */}
            <div className="flex flex-col">
              {NAVBAR_SPECS.map((spec) => (
                <div
                  key={spec.property}
                  className="flex items-baseline justify-between py-2.5"
                  style={{
                    borderTop: "1px solid var(--mr-border-default)",
                  }}
                >
                  <span
                    className="text-[13px] font-medium"
                    style={{ ...MONO, color: "var(--mr-text-primary)" }}
                  >
                    {spec.property}
                  </span>
                  <span
                    className="text-[13px]"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <CodeBlock>
{`/* Navbar */
position: sticky;
top: 0;
z-index: 50;
height: 77px;
background: var(--mr-bg-page);
/* Logo + nav links: Geist Mono, text-lg (18px) */
/* Nav link color: var(--mr-text-muted) → var(--mr-text-primary) on hover */`}
              </CodeBlock>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mb-8">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            FOOTER
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            {/* Miniature footer recreation */}
            <div
              className="rounded-lg p-6 mb-6"
              style={{ background: "#262625" }}
            >
              {/* CTA area */}
              <p
                className="text-[20px] font-medium mb-3"
                style={{
                  fontFamily: '"Geist Sans", sans-serif',
                  color: "#FFFFFF",
                }}
              >
                Let&rsquo;s see where your team stands.
              </p>
              <div className="flex gap-3 mb-4">
                <span
                  className="inline-flex px-3 py-1.5 rounded-lg text-[13px] font-medium"
                  style={{
                    ...MONO,
                    background: "#E8E6DD",
                    color: "#262625",
                  }}
                >
                  See where you stand_
                </span>
                <span
                  className="inline-flex px-3 py-1.5 rounded-lg text-[13px] font-medium"
                  style={{
                    ...MONO,
                    background: "#D1CFC6",
                    color: "#262625",
                  }}
                >
                  Talk to our team_
                </span>
              </div>

              {/* Divider */}
              <div
                className="mb-4"
                style={{
                  borderTop: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              />

              {/* 3-column area */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <span
                    className="text-[11px] font-medium block mb-1"
                    style={{ ...MONO, color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Contact
                  </span>
                  <span
                    className="text-[11px] font-medium block"
                    style={{ ...MONO, color: "#FFFFFF" }}
                  >
                    hello@manyroads.ai
                  </span>
                </div>
                <div>
                  <span
                    className="text-[11px] font-medium block mb-1"
                    style={{ ...MONO, color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Navigation
                  </span>
                  <span
                    className="text-[11px] font-medium block"
                    style={{ ...MONO, color: "#FFFFFF" }}
                  >
                    Trailhead / Wayfinder
                  </span>
                </div>
                <div>
                  <span
                    className="text-[11px] font-medium block mb-1"
                    style={{ ...MONO, color: "rgba(255, 255, 255, 0.6)" }}
                  >
                    Social
                  </span>
                  <span
                    className="text-[11px] font-medium block"
                    style={{ ...MONO, color: "#FFFFFF" }}
                  >
                    Twitter / YouTube
                  </span>
                </div>
              </div>

              {/* Wordmark */}
              <p
                className="text-[32px] font-medium tracking-tight leading-none"
                style={{
                  fontFamily: '"Geist Sans", sans-serif',
                  color: "rgba(255, 255, 255, 0.15)",
                }}
              >
                MANYROADS
              </p>
            </div>

            {/* Specs table */}
            <div className="flex flex-col">
              {FOOTER_SPECS.map((spec) => (
                <div
                  key={spec.property}
                  className="flex items-baseline justify-between py-2.5"
                  style={{
                    borderTop: "1px solid var(--mr-border-default)",
                  }}
                >
                  <span
                    className="text-[13px] font-medium"
                    style={{ ...MONO, color: "var(--mr-text-primary)" }}
                  >
                    {spec.property}
                  </span>
                  <span
                    className="text-[13px]"
                    style={{ ...MONO, color: "var(--mr-text-muted)" }}
                  >
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <CodeBlock>
{`/* Footer — always dark regardless of theme */
background: var(--mr-bg-footer); /* #262625 light, #111110 dark */
color: var(--mr-footer-text); /* white */
padding: 6rem 3rem; /* py-24 px-12 */

/* Subtitle text */
color: var(--mr-footer-sub); /* white at 60% opacity */

/* Dividers */
border-color: var(--mr-footer-divider); /* white at 15% opacity */

/* Wordmark */
font-size: clamp(80px, 15vw, 200px);
font-weight: 500; /* font-medium */`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
