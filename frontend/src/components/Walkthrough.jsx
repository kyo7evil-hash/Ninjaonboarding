import { useCallback, useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { STEPS } from "../data/itPolicy.jsx";
import { useProgress } from "../hooks/useProgress.js";
import ProgressBar from "./ProgressBar.jsx";
import StepShell from "./StepShell.jsx";
import CompletionRecap from "./CompletionRecap.jsx";
import Icon from "./Icon.jsx";

const N = STEPS.length; // index N === the completion screen

function clampIndex(raw, fallback) {
  const n = Number.parseInt(raw, 10);
  if (Number.isInteger(n) && n >= 0 && n <= N) return n;
  return fallback;
}

export default function Walkthrough({ moduleId }) {
  const [params, setParams] = useSearchParams();
  const progress = useProgress(moduleId);
  const headingRef = useRef(null);
  const didInit = useRef(false);

  // Resume target: saved step when the URL carries no explicit ?step=.
  const resumeTo = Math.min(progress.lastStep || 0, N - 1);
  const index = params.has("step")
    ? clampIndex(params.get("step"), resumeTo)
    : resumeTo;

  const goto = useCallback(
    (next) => {
      const clamped = Math.max(0, Math.min(N, next));
      setParams({ step: String(clamped) }, { replace: true });
    },
    [setParams]
  );

  // On first render, pin the resolved index into the URL so refresh is stable.
  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    if (!params.has("step")) setParams({ step: String(resumeTo) }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Record progress + manage focus/scroll whenever the step changes.
  useEffect(() => {
    if (index < N) progress.markStep(index);
    else progress.markComplete();
    headingRef.current?.focus?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // Left/Right arrow navigation, ignored while typing in a field.
  useEffect(() => {
    const onKey = (e) => {
      const t = e.target;
      const tag = t?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t?.isContentEditable) return;
      if (e.key === "ArrowRight" && index < N) goto(index + 1);
      if (e.key === "ArrowLeft" && index > 0) goto(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, goto]);

  const atCompletion = index >= N;
  const step = atCompletion ? null : STEPS[index];
  const isFirstOfSection = useMemo(
    () => !atCompletion && (index === 0 || STEPS[index - 1].section !== step.section),
    [index, atCompletion, step]
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link
          to="/"
          className="inline-flex items-center gap-1 font-medium text-[color:var(--nv-text-muted)] hover:text-[color:var(--nv-text)]"
        >
          <Icon name="arrowLeft" size={16} /> All modules
        </Link>
        <span className="font-semibold">IT Policy</span>
      </div>

      {!atCompletion && (
        <ProgressBar
          steps={STEPS}
          index={index}
          completedSteps={progress.completedSteps}
          onJump={goto}
        />
      )}

      {atCompletion ? (
        <CompletionRecap
          onRestart={() => {
            progress.reset();
            goto(0);
          }}
          onBack={() => goto(N - 1)}
        />
      ) : (
        <StepShell ref={headingRef} step={step} isFirstOfSection={isFirstOfSection} />
      )}

      {!atCompletion && (
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => goto(index - 1)}
            disabled={index === 0}
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium disabled:opacity-40"
            style={{ borderColor: "var(--nv-border)" }}
          >
            <Icon name="arrowLeft" size={16} /> Back
          </button>

          <span className="text-xs text-[color:var(--nv-text-muted)]">
            {index + 1} / {N}
          </span>

          <button
            type="button"
            onClick={() => goto(index + 1)}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white"
            style={{ background: "var(--nv-red)" }}
          >
            {index === N - 1 ? "Finish" : "Next"} <Icon name="arrowRight" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
