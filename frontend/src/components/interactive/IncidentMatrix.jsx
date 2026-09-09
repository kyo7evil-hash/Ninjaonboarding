import { useState } from "react";
import Icon from "../Icon.jsx";
import { INCIDENT_MATRIX } from "../../data/itPolicy.jsx";

export default function IncidentMatrix() {
  const [selId, setSelId] = useState(INCIDENT_MATRIX[0].id);
  const sel = INCIDENT_MATRIX.find((s) => s.id === selId);

  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "var(--nv-border)", background: "var(--nv-surface-2)" }}
    >
      <p className="text-sm font-medium">What's happened?</p>
      <div className="mt-2 grid gap-2 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div role="tablist" aria-label="Incident scenarios" className="flex flex-col gap-1.5">
          {INCIDENT_MATRIX.map((s) => {
            const isSel = s.id === selId;
            return (
              <button
                key={s.id}
                role="tab"
                aria-selected={isSel}
                type="button"
                onClick={() => setSelId(s.id)}
                className="rounded-lg border px-3 py-2 text-left text-sm font-medium transition"
                style={{
                  borderColor: isSel ? "var(--nv-red)" : "var(--nv-border)",
                  background: isSel ? "var(--nv-surface)" : "transparent",
                  color: isSel ? "var(--nv-red)" : "var(--nv-text)",
                }}
              >
                {s.scenario}
              </button>
            );
          })}
        </div>

        <div
          className="rounded-lg border p-3"
          style={{ borderColor: "var(--nv-border)", background: "var(--nv-surface)" }}
          aria-live="polite"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-[color:var(--nv-text-muted)]">
            Who to contact
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 font-semibold">
            <Icon name="alert" size={15} style={{ color: "var(--nv-red)" }} />
            {sel.contact}
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--nv-text-muted)]">
            What to do
          </p>
          <p className="mt-0.5 text-sm text-[color:var(--nv-text-muted)]">{sel.action}</p>
        </div>
      </div>
    </div>
  );
}
