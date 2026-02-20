import CodeBlock from "./CodeBlock";
import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";

export default function CardsSection() {
  return (
    <section id="cards" className="py-20">
      <div
        className="border-t pt-12"
        style={{ borderColor: "var(--mr-border-default)" }}
      >
        <SectionHeader
          marker="CARDS"
          title="Cards"
          description="Three card patterns used across the V2 site. Each serves a different content density and interaction model."
        />

        {/* Pain Point Card */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            PAIN POINT CARD
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            {/* Miniature recreation */}
            <div className="flex gap-8 mb-6">
              <div className="flex-1">
                <div
                  className="pt-6"
                  style={{
                    borderTop: "1px solid var(--mr-border-default)",
                  }}
                >
                  <span
                    className="text-lg font-medium block mb-3"
                    style={{ ...MONO, color: "var(--mr-text-primary)" }}
                  >
                    (01)
                  </span>
                  <h3
                    className="text-lg font-medium mb-3"
                    style={{ color: "var(--mr-text-primary)" }}
                  >
                    They&rsquo;re using the tool wrong
                  </h3>
                  <p
                    className="text-[15px] leading-[1.6]"
                    style={{ color: "var(--mr-text-muted)" }}
                  >
                    Developers default to chat-style prompts instead of
                    structured workflows that produce reliable output.
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div
                  className="pt-6"
                  style={{
                    borderTop: "1px solid var(--mr-border-default)",
                  }}
                >
                  <span
                    className="text-lg font-medium block mb-3"
                    style={{ ...MONO, color: "var(--mr-text-primary)" }}
                  >
                    (02)
                  </span>
                  <h3
                    className="text-lg font-medium mb-3"
                    style={{ color: "var(--mr-text-primary)" }}
                  >
                    No one configured it
                  </h3>
                  <p
                    className="text-[15px] leading-[1.6]"
                    style={{ color: "var(--mr-text-muted)" }}
                  >
                    AI tools ship generic. Without project-specific rules and
                    context, output quality stays low.
                  </p>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div
              className="pt-6 flex flex-col gap-2"
              style={{
                borderTop: "1px solid var(--mr-border-default)",
              }}
            >
              <span
                className="text-[13px] font-medium block mb-2 uppercase tracking-wider"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Specs
              </span>
              <div className="flex gap-6 text-[12px] flex-wrap" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                <span>bg: inherits page</span>
                <span>border-t: --mr-border-default</span>
                <span>padding: pt-8</span>
                <span>layout: grid-cols-2 gap-x-16 gap-y-20</span>
              </div>
            </div>

            <div className="mt-4">
              <CodeBlock>
{`/* Pain Point Card */
border-top: 1px solid var(--mr-border-default);
padding-top: var(--mr-space-md); /* 32px */
/* Layout: grid-cols-2 gap-x-16 gap-y-20 */`}
              </CodeBlock>
            </div>
          </div>
        </div>

        {/* Pathway Card */}
        <div className="mb-16">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            PATHWAY CARD
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            {/* Miniature recreation */}
            <div
              className="rounded-lg p-8 flex flex-col mb-6"
              style={{
                background: "var(--mr-bg-card)",
                border: "1px solid var(--mr-border-default)",
                minHeight: "280px",
              }}
            >
              <h3
                className="text-2xl font-medium mb-3"
                style={{ color: "var(--mr-text-primary)" }}
              >
                Trailhead
              </h3>
              <p
                className="text-xl font-medium mb-3"
                style={{ color: "var(--mr-text-primary)" }}
              >
                Find out where you actually stand.
              </p>
              <p
                className="text-[15px] leading-[1.6] mb-6"
                style={{ color: "var(--mr-text-muted)" }}
              >
                A structured AI readiness assessment that maps your team&rsquo;s
                current tool usage, workflows, and gaps.
              </p>
              <div className="mt-auto flex flex-col gap-3">
                <span
                  className="inline-flex px-4 py-2 rounded-lg text-lg font-medium w-fit"
                  style={{
                    ...MONO,
                    background: "var(--mr-bg-button-pathway)",
                    color: "var(--mr-text-primary)",
                  }}
                >
                  Run the assessment_
                </span>
                <span
                  className="text-lg font-medium underline underline-offset-4"
                  style={{ ...MONO, color: "var(--mr-text-muted)" }}
                >
                  or talk to our team
                </span>
              </div>
            </div>

            {/* Specs */}
            <div
              className="pt-6 flex flex-col gap-2"
              style={{
                borderTop: "1px solid var(--mr-border-default)",
              }}
            >
              <span
                className="text-[13px] font-medium block mb-2 uppercase tracking-wider"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Specs
              </span>
              <div className="flex gap-6 text-[12px] flex-wrap" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                <span>bg: --mr-bg-card</span>
                <span>padding: p-10 (2.5rem)</span>
                <span>radius: rounded-lg (8px)</span>
                <span>layout: col-span-6 in 12-col grid</span>
              </div>
            </div>

            <div className="mt-4">
              <CodeBlock>
{`/* Pathway Card */
background: var(--mr-bg-card);
padding: 2.5rem; /* p-10 */
border-radius: var(--mr-radius-md); /* 8px */
display: flex;
flex-direction: column;
/* CTA pushed to bottom with mt-auto */`}
              </CodeBlock>
            </div>
          </div>
        </div>

        {/* Team Member Card */}
        <div className="mb-8">
          <span
            className="text-[14px] font-medium block mb-6"
            style={{ ...MONO, color: "var(--mr-text-primary)" }}
          >
            TEAM MEMBER CARD
          </span>
          <div
            className="rounded-xl p-8"
            style={{
              background: "var(--mr-bg-card)",
              border: "1px solid var(--mr-border-default)",
            }}
          >
            {/* Miniature recreation */}
            <div
              className="pt-8 mb-6"
              style={{
                borderTop: "1px solid var(--mr-border-default)",
              }}
            >
              <p
                className="text-xl font-medium mb-2"
                style={{ color: "var(--mr-text-primary)" }}
              >
                Susan &mdash; Director of Engineering
              </p>
              <p
                className="text-[15px] leading-[1.6] mb-2"
                style={{ color: "var(--mr-text-muted)" }}
              >
                PhD in software engineering. 15 years building developer tools
                and leading engineering teams through technology transitions.
              </p>
              <span
                className="text-sm inline-block mt-1"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                LinkedIn &#8599;
              </span>
              {/* Tech badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {["Cursor", "Copilot", "Claude Code", "Windsurf"].map(
                  (badge) => (
                    <span
                      key={badge}
                      className="inline-flex rounded-full px-3 py-1 text-sm"
                      style={{
                        ...MONO,
                        background: "var(--mr-bg-page)",
                        color: "var(--mr-text-primary)",
                      }}
                    >
                      {badge}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Specs */}
            <div
              className="pt-6 flex flex-col gap-2"
              style={{
                borderTop: "1px solid var(--mr-border-default)",
              }}
            >
              <span
                className="text-[13px] font-medium block mb-2 uppercase tracking-wider"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                Specs
              </span>
              <div className="flex gap-6 text-[12px] flex-wrap" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                <span>bg: transparent</span>
                <span>border-t: --mr-border-default</span>
                <span>padding: pt-10</span>
                <span>name: text-xl font-medium</span>
              </div>
              <div className="flex gap-6 text-[12px] flex-wrap" style={{ ...MONO, color: "var(--mr-text-muted)" }}>
                <span>badges: rounded-full px-3 py-1 text-sm mono</span>
                <span>badge bg: --mr-bg-card</span>
                <span>linkedin: text-sm mono</span>
              </div>
            </div>

            <div className="mt-4">
              <CodeBlock>
{`/* Team Member Card */
border-top: 1px solid var(--mr-border-default);
padding-top: 2.5rem; /* pt-10 */
/* No background — transparent */

/* Tech Badge */
background: var(--mr-bg-card);
border-radius: var(--mr-radius-full); /* 9999px */
padding: 0.25rem 0.75rem; /* px-3 py-1 */
font-family: var(--mr-font-mono);
font-size: 14px; /* text-sm */`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
