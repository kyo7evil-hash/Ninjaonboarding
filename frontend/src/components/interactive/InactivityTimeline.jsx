import { useState } from "react";
import { INACTIVITY_MARKERS } from "../../data/itPolicy.jsx";

export default function InactivityTimeline() {
  const [sel, setSel] = useState(0);
  const active = INACTIVITY_MARKERS[sel];
  const maxDay = INACTIVITY_MARKERS[INACTIVITY_MARKERS.length - 1].day;

  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "var(--nv-border)", background: "var(--nv-surface-2)" }}
    >
      <p className="text-sm font-medium">Days since your last sign-in</p>

      <div className="relative mt-6 mb-2 h-1.5 rounded-full" style={{ background: "var(--nv-border)" }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${(active.day / maxDay) * 100}%`,
            background: "var(--nv-red)",
            transition: "width .3s ease",
          }}
        />
        {INACTIVITY_MARKERS.map((m, i) => {
          const isSel = i === sel;
          return (
            <button
              key={m.day}
              type="button"
              onClick={() => setSel(i)}
              aria-pressed={isSel}
              aria-label={`${m.label} — ${m.heading}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 focus:outline-none focus-visible:outline-none"
              style={{
                left: `${(m.day / maxDay) * 100}%`,
                top: "50%",
                width: isSel ? 20 : 16,
                height: isSel ? 20 : 16,
                background: i <= sel ? "var(--nv-red)" : "var(--nv-surface)",
                borderColor: "var(--nv-red)",
              }}
            />
          );
        })}
      </div>

      <div className="flex justify-between text-xs text-[color:var(--nv-text-muted)]">
        {INACTIVITY_MARKERS.map((m) => (
          <button
            key={m.day}
            type="button"
            onClick={() => setSel(INACTIVITY_MARKERS.indexOf(m))}
            className="font-medium hover:text-[color:var(--nv-text)]"
          >
            {m.label}
          </button>
        ))}
      </div>

      <div
        className="mt-4 rounded-lg border p-3"
        style={{ borderColor: "var(--nv-border)", background: "var(--nv-surface)" }}
        aria-live="polite"
      >
        <p className="text-sm font-semibold">{active.heading}</p>
        <p className="mt-1 text-sm text-[color:var(--nv-text-muted)]">{active.text}</p>
      </div>
    </div>
  );
}
