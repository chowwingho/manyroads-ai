import { MONO } from "./constants";
import SectionHeader from "./SectionHeader";
import CodeBlock from "./CodeBlock";

const NOTES = [
  {
    cls: "mr-note mr-note-success",
    label: "Success",
    variant: ".mr-note-success",
    text: "This practice area is operating at full capacity. Your team has documentation, a review process, and consistent adoption across projects.",
  },
  {
    cls: "mr-note mr-note-warning",
    label: "Warning",
    variant: ".mr-note-warning",
    text: "Your deployment pipeline has manual steps that introduce variance. Teams with more than 3 manual gates take 2.4× longer to ship.",
  },
  {
    cls: "mr-note mr-note-error",
    label: "Critical",
    variant: ".mr-note-error",
    text: "No incident response runbook exists. This is a critical minimum — without it, your team's response time degrades by 60% under pressure.",
  },
  {
    cls: "mr-note mr-note-info",
    label: "Info",
    variant: ".mr-note-info",
    text: "This question was answered as NS (Not Sure). It has been excluded from your readiness score and flagged for follow-up.",
  },
];

export default function NotesSection() {
  return (
    <section id="notes" className="py-20">
      <div className="border-t pt-12" style={{ borderColor: "var(--mr-border-default)" }}>
        <SectionHeader
          marker="COMPONENTS"
          title="Notes & Callouts"
          description="Inline contextual messages for findings, warnings, and guidance. Use left-border treatment to draw attention without overwhelming the layout."
        />

        <div className="flex flex-col gap-6 max-w-[720px]">
          {NOTES.map(({ cls, label, variant, text }) => (
            <div key={label}>
              <div
                className="text-[12px] mb-2"
                style={{ ...MONO, color: "var(--mr-text-muted)" }}
              >
                {variant}
              </div>
              <div className={cls}>
                <span className="font-medium block mb-1" style={MONO}>{label}</span>
                {text}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <span
            className="text-[13px] font-medium uppercase tracking-wider block mb-3"
            style={{ ...MONO, color: "var(--mr-text-muted)" }}
          >
            Usage
          </span>
          <CodeBlock>{`{/* Apply base class + variant class */}
<div className="mr-note mr-note-success">
  <span className="font-medium block mb-1">Success</span>
  This practice is fully operational.
</div>

<div className="mr-note mr-note-warning">
  Manual deployment steps introduce variance.
</div>

<div className="mr-note mr-note-error">
  No incident response runbook exists.
</div>

<div className="mr-note mr-note-info">
  This question was marked NS — excluded from score.
</div>`}</CodeBlock>
        </div>
      </div>
    </section>
  );
}
