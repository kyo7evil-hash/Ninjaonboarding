import { SECTIONS } from "../data/itPolicy.jsx";

// Section-aware progress. On small screens it's a single bar + counters;
// from `sm` up it also shows a per-step segment row grouped by section.
export default function ProgressBar({ steps, index, completedSteps, onJump }) {
  const total = steps.length;
  const current = steps[index];
  const secIdx = current ? SECTIONS.findIndex((s) => s.id === current.section) : 0;
  const section = SECTIONS[secIdx];
  const doneSet = new Set(completedSteps);
  const pct = Math.round((Math.min(index, total) / total) * 100);

  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between text-xs text-[color:var(--nv-text-muted)]">
        <span className="font-medium text-[color:var(--nv-text)]">
          Section {secIdx + 1} of {SECTIONS.length}
          <span className="font-normal text-[color:var(--nv-text-muted)]">
            {" "}
            · {section?.title}
          </span>
        </span>
        <span>
          Step {Math.min(index + 1, total)} of {total}
        </span>
      </div>

      {/* Mobile bar */}
      <div
        className="mt-2 h-1.5 w-full overflow-hidden rounded-full sm:hidden"
        style={{ background: "var(--nv-border)" }}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: "var(--nv-red)", transition: "width .3s ease" }}
        />
      </div>

      {/* Segment row */}
      <div className="mt-2 hidden gap-1 sm:flex">
        {steps.map((s, i) => {
          const isDone = doneSet.has(i);
          const isCurrent = i === index;
          const prev = steps[i - 1];
          const newSection = prev && prev.section !== s.section;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => onJump(i)}
              title={`Step ${i + 1}: ${s.title}`}
              aria-label={`Go to step ${i + 1}: ${s.title}`}
              aria-current={isCurrent ? "step" : undefined}
              className="h-1.5 flex-1 rounded-full"
              style={{
                marginLeft: newSection ? 6 : 0,
                background: isCurrent
                  ? "var(--nv-red)"
                  : isDone
                  ? "color-mix(in srgb, var(--nv-red) 45%, transparent)"
                  : "var(--nv-border)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
