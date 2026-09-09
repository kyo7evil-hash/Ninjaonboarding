import { useState } from "react";
import Icon from "../Icon.jsx";
import { LOST_DEVICE_STEPS } from "../../data/itPolicy.jsx";

export default function LostDeviceStepper() {
  const [step, setStep] = useState(0);
  const total = LOST_DEVICE_STEPS.length;
  const atEnd = step === total - 1;

  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "var(--nv-border)", background: "var(--nv-surface-2)" }}
    >
      <ol className="space-y-2">
        {LOST_DEVICE_STEPS.map((s, i) => {
          const isCurrent = i === step;
          const isDone = i < step;
          return (
            <li
              key={s.n}
              className="rounded-lg border p-3 transition"
              style={{
                borderColor: isCurrent ? "var(--nv-red)" : "var(--nv-border)",
                background: isCurrent ? "var(--nv-surface)" : "transparent",
                opacity: isCurrent || isDone ? 1 : 0.55,
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white"
                  style={{ background: isDone ? "#1a9c5b" : "var(--nv-red)" }}
                >
                  {isDone ? <Icon name="check" size={13} strokeWidth={2.6} /> : s.n}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold">{s.title}</p>
                    {s.deadline && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                        style={{
                          background: "color-mix(in srgb, var(--nv-red) 14%, transparent)",
                          color: "var(--nv-red)",
                        }}
                      >
                        <Icon name="clock" size={12} strokeWidth={2.2} />
                        {s.deadline}
                      </span>
                    )}
                  </div>
                  {isCurrent && (
                    <p className="mt-1 text-sm text-[color:var(--nv-text-muted)]">{s.text}</p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-lg border px-3 py-1.5 text-sm disabled:opacity-40"
          style={{ borderColor: "var(--nv-border)" }}
        >
          Previous step
        </button>
        <span className="text-xs text-[color:var(--nv-text-muted)]">
          {step + 1} / {total}
        </span>
        <button
          type="button"
          onClick={() => setStep((s) => (atEnd ? 0 : Math.min(total - 1, s + 1)))}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-white"
          style={{ background: "var(--nv-red)" }}
        >
          {atEnd ? "Start over" : "Next step"}
        </button>
      </div>
    </div>
  );
}
