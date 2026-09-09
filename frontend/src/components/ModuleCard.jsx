import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import ProgressRing from "./ProgressRing.jsx";

function StatusBadge({ status, done, started }) {
  if (status === "coming-soon") {
    return (
      <span className="rounded-full border px-2 py-0.5 text-xs text-[color:var(--nv-text-muted)]"
        style={{ borderColor: "var(--nv-border)" }}>
        Coming soon
      </span>
    );
  }
  if (done) {
    return (
      <span className="rounded-full bg-[#e8f6ee] px-2 py-0.5 text-xs font-medium text-[#1a7a46] dark:bg-[#123324] dark:text-[#54d090]">
        Completed
      </span>
    );
  }
  if (started) {
    return (
      <span className="rounded-full px-2 py-0.5 text-xs font-medium"
        style={{ background: "color-mix(in srgb, var(--nv-red) 14%, transparent)", color: "var(--nv-red)" }}>
        In progress
      </span>
    );
  }
  return (
    <span className="rounded-full border px-2 py-0.5 text-xs text-[color:var(--nv-text-muted)]"
      style={{ borderColor: "var(--nv-border)" }}>
      Not started
    </span>
  );
}

export default function ModuleCard({ module, progress }) {
  const available = module.status === "available";
  const done = Boolean(progress?.done);
  const started = Boolean(progress?.started) && !done;
  const value = progress?.value ?? 0;

  const inner = (
    <div
      className={`flex items-start gap-4 rounded-2xl border p-4 sm:p-5 transition ${
        available ? "hover:shadow-md" : "opacity-70"
      }`}
      style={{ borderColor: "var(--nv-border)", background: "var(--nv-surface)" }}
    >
      <div
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
        style={{ background: available ? "var(--nv-red)" : "var(--nv-text-muted)" }}
      >
        <Icon name={module.icon} size={22} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-semibold">{module.title}</h3>
          <StatusBadge status={module.status} done={done} started={started} />
        </div>
        <p className="mt-1 text-sm text-[color:var(--nv-text-muted)]">{module.blurb}</p>
        <p className="mt-2 text-xs text-[color:var(--nv-text-muted)]">
          ~{module.minutes} min{available ? "" : " · not yet available"}
        </p>
      </div>

      {available && (
        <div className="shrink-0 self-center">
          <ProgressRing value={done ? 1 : value} done={done} />
        </div>
      )}
    </div>
  );

  if (!available) {
    return (
      <div aria-disabled="true" className="cursor-not-allowed">
        {inner}
      </div>
    );
  }

  return (
    <Link
      to={`/module/${module.id}`}
      className="block rounded-2xl focus:outline-none focus-visible:outline-none"
    >
      {inner}
    </Link>
  );
}
