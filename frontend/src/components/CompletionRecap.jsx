import { Link } from "react-router-dom";
import Icon from "./Icon.jsx";
import { RECAP } from "../data/itPolicy.jsx";

export default function CompletionRecap({ onRestart, onBack }) {
  return (
    <article
      className="rounded-2xl border p-6 sm:p-8"
      style={{ borderColor: "var(--nv-border)", background: "var(--nv-surface)" }}
    >
      <div
        className="grid h-12 w-12 place-items-center rounded-full text-white"
        style={{ background: "#1a9c5b" }}
      >
        <Icon name="check" size={26} strokeWidth={2.6} />
      </div>
      <h2 className="mt-4 text-2xl font-extrabold tracking-tight">IT Policy — complete</h2>
      <p className="mt-2 text-[color:var(--nv-text-muted)]">
        Nice work. Here's the short version to keep in mind:
      </p>

      <ul className="mt-4 space-y-2">
        {RECAP.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
            <Icon name="check" size={18} className="mt-0.5 shrink-0 text-[#1a9c5b]" strokeWidth={2.4} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-white"
          style={{ background: "var(--nv-red)" }}
        >
          <Icon name="home" size={16} /> Back to hub
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium"
          style={{ borderColor: "var(--nv-border)" }}
        >
          <Icon name="restart" size={16} /> Restart module
        </button>
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[color:var(--nv-text-muted)] hover:text-[color:var(--nv-text)]"
        >
          <Icon name="arrowLeft" size={16} /> Review last step
        </button>
      </div>
    </article>
  );
}
