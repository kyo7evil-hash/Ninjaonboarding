import { useEffect, useState } from "react";
import { MODULES } from "../data/modules.js";
import { STEPS } from "../data/itPolicy.jsx";
import { readModuleProgress, resetAllProgress } from "../hooks/useProgress.js";
import ModuleCard from "./ModuleCard.jsx";

const TOTALS = { "it-policy": STEPS.length };

function summarise(moduleId) {
  const total = TOTALS[moduleId] || 1;
  const p = readModuleProgress(moduleId);
  const done = Boolean(p.completedAt);
  const started = done || p.completedSteps.length > 0;
  return { value: done ? 1 : p.completedSteps.length / total, done, started };
}

export default function Hub() {
  const [tick, setTick] = useState(0);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const refresh = () => setTick((n) => n + 1);
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  const anyProgress = MODULES.some(
    (m) => m.status === "available" && summarise(m.id).started
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Welcome to Ninja Van
        </h1>
        <p className="mt-2 text-[color:var(--nv-text-muted)]">
          Work through these onboarding modules at your own pace. Your progress is saved
          on this device, so you can stop and pick up where you left off.
        </p>
      </div>

      <div className="space-y-3" key={tick}>
        {MODULES.map((m) => (
          <ModuleCard
            key={m.id}
            module={m}
            progress={m.status === "available" ? summarise(m.id) : null}
          />
        ))}
      </div>

      {anyProgress && (
        <div className="mt-8 border-t pt-4" style={{ borderColor: "var(--nv-border)" }}>
          {confirming ? (
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span>Reset progress for every module on this device?</span>
              <button
                className="rounded-lg px-3 py-1.5 font-medium text-white"
                style={{ background: "var(--nv-red)" }}
                onClick={() => {
                  resetAllProgress();
                  setConfirming(false);
                  setTick((n) => n + 1);
                }}
              >
                Yes, reset
              </button>
              <button
                className="rounded-lg border px-3 py-1.5"
                style={{ borderColor: "var(--nv-border)" }}
                onClick={() => setConfirming(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="text-sm font-medium text-[color:var(--nv-text-muted)] underline underline-offset-2 hover:text-[color:var(--nv-text)]"
              onClick={() => setConfirming(true)}
            >
              Reset my progress
            </button>
          )}
        </div>
      )}
    </div>
  );
}
