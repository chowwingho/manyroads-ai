const MONO = { fontFamily: '"Geist Mono", monospace' };

const PRINCIPLES = [
  {
    name: "Restraint over decoration",
    desc: "Every element earns its place. No gradients, illustrations, or stock photography. Hierarchy comes from typography and spacing alone.",
  },
  {
    name: "Typography-forward",
    desc: "Type does the heavy lifting. Medium-weight headlines (500, not 700), generous spacing, clear hierarchy through a strict 7-tier scale.",
  },
  {
    name: "Warm, not cold",
    desc: "Creams and warm grays, not blue-gray-white. We\u2019re approachable engineers, not a corporate consultancy.",
  },
  {
    name: "Dark mode as first-class",
    desc: "Not an afterthought. Both modes are fully designed with intentional contrast ratios. Every color token has a light and dark pair.",
  },
  {
    name: "Developer familiarity",
    desc: "Monospace accents, underscore conventions, code-comment section labels, bracket notation. Our audience writes code \u2014 the interface should feel native to them.",
  },
];

const LOOKS_LIKE_US = [
  "Medium-weight left-aligned headlines",
  "Warm cream backgrounds",
  "Monospace section markers with // slashes and underscores",
  "Cards with generous padding and subtle borders",
  "Stats that speak for themselves",
  "Trailing underscores on buttons",
  "A footer that\u2019s always dark",
  "One curated accent color",
];

const DOESNT_LOOK_LIKE_US = [
  "Centered text",
  "Blue/purple gradients",
  "Stock photos of people at whiteboards",
  "Rounded pill buttons in bright colors",
  "Animated hero illustrations",
  "Bold 700 weight on everything",
  "Multiple competing accent colors",
  "Anything that feels like every other SaaS landing page",
];

export default function PrinciplesSection() {
  return (
    <>
      {/* Principles */}
      <section id="principles" className="py-20">
        <div
          className="border-t pt-12"
          style={{ borderColor: "var(--mr-border-default)" }}
        >
          <span
            className="text-lg font-medium block mb-2"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            <span style={{ color: "#4F769A" }}>//</span> PRINCIPLES
          </span>
          <h2
            className="text-[36px] font-medium leading-[1.2] tracking-tight mb-3"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Design Principles
          </h2>
          <p
            className="text-[17px] leading-[1.6] max-w-[560px] mb-12"
            style={{ color: "var(--mr-text-muted)" }}
          >
            Five rules that guide every visual decision across the Many Roads
            site.
          </p>

          <div className="flex flex-col gap-0">
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                className="grid grid-cols-[240px_1fr] gap-8 py-5"
                style={{
                  borderTop: "1px solid var(--mr-border-default)",
                }}
              >
                <span
                  className="text-[17px] font-medium"
                  style={{ color: "var(--mr-text-primary)" }}
                >
                  {p.name}
                </span>
                <span
                  className="text-[17px] leading-[1.6]"
                  style={{ color: "var(--mr-text-muted)" }}
                >
                  {p.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Looks Like Us / Doesn't */}
      <section id="looks-like-us" className="py-20">
        <div
          className="border-t pt-12"
          style={{ borderColor: "var(--mr-border-default)" }}
        >
          <span
            className="text-lg font-medium block mb-2"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            <span style={{ color: "#4F769A" }}>//</span> IDENTITY
          </span>
          <h2
            className="text-[36px] font-medium leading-[1.2] tracking-tight mb-3"
            style={{ color: "var(--mr-text-primary)" }}
          >
            Looks Like Us
          </h2>
          <p
            className="text-[17px] leading-[1.6] max-w-[560px] mb-12"
            style={{ color: "var(--mr-text-muted)" }}
          >
            A quick gut-check for whether a design decision fits the Many Roads
            identity.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {/* This Looks Like Us */}
            <div
              className="rounded-xl p-8"
              style={{
                background: "var(--mr-bg-card)",
                border: "1px solid var(--mr-border-default)",
              }}
            >
              <span
                className="text-[14px] font-medium block mb-5"
                style={{ ...MONO, color: "#3D7A41" }}
              >
                This Looks Like Us
              </span>
              <div className="flex flex-col gap-5">
                {LOOKS_LIKE_US.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="text-[14px] mt-0.5 flex-shrink-0"
                      style={{ color: "#3D7A41" }}
                    >
                      &#10003;
                    </span>
                    <span
                      className="text-[15px] leading-[1.5]"
                      style={{ color: "var(--mr-text-primary)" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* This Doesn't Look Like Us */}
            <div
              className="rounded-xl p-8"
              style={{
                background: "var(--mr-bg-card)",
                border: "1px solid var(--mr-border-default)",
              }}
            >
              <span
                className="text-[14px] font-medium block mb-5"
                style={{ ...MONO, color: "#C47030" }}
              >
                This Doesn't Look Like Us
              </span>
              <div className="flex flex-col gap-5">
                {DOESNT_LOOK_LIKE_US.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="text-[14px] mt-0.5 flex-shrink-0"
                      style={{ color: "#C47030" }}
                    >
                      &#10007;
                    </span>
                    <span
                      className="text-[15px] leading-[1.5]"
                      style={{ color: "var(--mr-text-primary)" }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
