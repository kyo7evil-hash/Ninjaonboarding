import { forwardRef } from "react";
import Icon from "./Icon.jsx";
import SectionIntro from "./SectionIntro.jsx";
import { SECTIONS } from "../data/itPolicy.jsx";
import PasswordChecker from "./interactive/PasswordChecker.jsx";
import InactivityTimeline from "./interactive/InactivityTimeline.jsx";
import LostDeviceStepper from "./interactive/LostDeviceStepper.jsx";
import IncidentMatrix from "./interactive/IncidentMatrix.jsx";

const INTERACTIVE = {
  PasswordChecker,
  InactivityTimeline,
  LostDeviceStepper,
  IncidentMatrix,
};

function Callout({ tone = "info", text }) {
  const warn = tone === "warn";
  return (
    <div
      className="mt-4 flex items-start gap-2 rounded-lg border-l-4 px-3 py-2 text-sm"
      style={{
        borderColor: warn ? "#d9822b" : "var(--nv-red)",
        background: warn
          ? "color-mix(in srgb, #d9822b 10%, var(--nv-surface))"
          : "color-mix(in srgb, var(--nv-red) 8%, var(--nv-surface))",
      }}
    >
      <Icon name={warn ? "alert" : "info"} size={16} className="mt-0.5 shrink-0" />
      <span>{text}</span>
    </div>
  );
}

const StepShell = forwardRef(function StepShell({ step, isFirstOfSection }, headingRef) {
  const Interactive = step.interactive ? INTERACTIVE[step.interactive] : null;
  const secIdx = SECTIONS.findIndex((s) => s.id === step.section);

  return (
    <article
      className="rounded-2xl border p-5 sm:p-7"
      style={{ borderColor: "var(--nv-border)", background: "var(--nv-surface)" }}
    >
      {isFirstOfSection && <SectionIntro sectionId={step.section} />}

      <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--nv-red)" }}>
        {SECTIONS[secIdx]?.title}
      </p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mt-1 text-xl font-extrabold tracking-tight outline-none focus:outline-none focus-visible:outline-none sm:text-2xl"
      >
        {step.title}
      </h2>

      {step.lead && (
        <p className="mt-2 text-[15px] leading-relaxed text-[color:var(--nv-text)]">{step.lead}</p>
      )}

      {step.points?.length > 0 && (
        <ul className="mt-4 space-y-2">
          {step.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: "var(--nv-red)" }}
              />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      )}

      {step.callout && <Callout tone={step.callout.tone} text={step.callout.text} />}

      {Interactive && (
        <div className="mt-5">
          <Interactive />
        </div>
      )}
    </article>
  );
});

export default StepShell;
