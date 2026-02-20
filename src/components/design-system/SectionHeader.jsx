import { MONO } from "./constants";

export default function SectionHeader({ marker, title, description }) {
  return (
    <div className="mb-12">
      <span
        className="text-lg font-medium block mb-2"
        style={{ ...MONO, color: "var(--mr-text-primary)" }}
      >
        <span style={{ color: "var(--mr-accent-default)" }}>//</span> {marker}
      </span>
      <h2
        className="text-[36px] font-medium leading-[1.2] tracking-tight mb-3"
        style={{ color: "var(--mr-text-primary)" }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="text-[17px] leading-[1.6] max-w-[560px]"
          style={{ color: "var(--mr-text-muted)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
