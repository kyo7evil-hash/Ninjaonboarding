import { SECTIONS } from "../data/itPolicy.jsx";

// Shown at the top of the first step in each section.
export default function SectionIntro({ sectionId }) {
  const idx = SECTIONS.findIndex((s) => s.id === sectionId);
  const section = SECTIONS[idx];
  if (!section) return null;
  return (
    <div
      className="mb-5 rounded-xl border-l-4 px-4 py-3"
      style={{
        borderColor: "var(--nv-red)",
        background: "color-mix(in srgb, var(--nv-red) 6%, var(--nv-surface))",
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--nv-red)" }}>
        Section {idx + 1} · {section.title}
      </p>
      <p className="mt-1 text-sm text-[color:var(--nv-text-muted)]">{section.blurb}</p>
    </div>
  );
}
