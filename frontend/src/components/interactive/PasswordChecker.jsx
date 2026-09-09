import { useMemo, useState } from "react";
import Icon from "../Icon.jsx";

const RULES = [
  { id: "len", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { id: "upper", label: "An uppercase letter (A–Z)", test: (v) => /[A-Z]/.test(v) },
  { id: "lower", label: "A lowercase letter (a–z)", test: (v) => /[a-z]/.test(v) },
  { id: "num", label: "A number (0–9)", test: (v) => /[0-9]/.test(v) },
  { id: "special", label: "A special character (! @ # $ %)", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

export default function PasswordChecker() {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(true);

  const results = useMemo(() => RULES.map((r) => ({ ...r, ok: r.test(value) })), [value]);
  const passed = results.filter((r) => r.ok).length;
  const allOk = passed === RULES.length && value.length > 0;

  return (
    <div
      className="rounded-xl border p-4"
      style={{ borderColor: "var(--nv-border)", background: "var(--nv-surface-2)" }}
    >
      <label htmlFor="pw-practice" className="text-sm font-medium">
        Practice password
      </label>
      <div className="mt-1.5 flex gap-2">
        <input
          id="pw-practice"
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          placeholder="Type here to test the rules"
          className="w-full rounded-lg border bg-[color:var(--nv-surface)] px-3 py-2 text-sm"
          style={{ borderColor: "var(--nv-border)", color: "var(--nv-text)" }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="shrink-0 rounded-lg border px-3 text-sm"
          style={{ borderColor: "var(--nv-border)" }}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      <ul className="mt-3 space-y-1.5" aria-live="polite">
        {results.map((r) => (
          <li key={r.id} className="flex items-center gap-2 text-sm">
            <span
              className="grid h-5 w-5 shrink-0 place-items-center rounded-full"
              style={{
                background: r.ok
                  ? "color-mix(in srgb, #1a9c5b 18%, transparent)"
                  : "var(--nv-border)",
                color: r.ok ? "#1a7a46" : "var(--nv-text-muted)",
              }}
            >
              <Icon name={r.ok ? "check" : "info"} size={13} strokeWidth={2.6} />
            </span>
            <span className={r.ok ? "" : "text-[color:var(--nv-text-muted)]"}>{r.label}</span>
          </li>
        ))}
      </ul>

      <p
        className="mt-3 text-sm font-medium"
        style={{ color: allOk ? "#1a7a46" : "var(--nv-text-muted)" }}
      >
        {allOk
          ? "Strong — this meets every requirement."
          : `${passed} of ${RULES.length} requirements met`}
      </p>
      <p className="mt-1 text-xs text-[color:var(--nv-text-muted)]">
        This is a practice field only. Nothing you type is stored or sent anywhere.
      </p>
    </div>
  );
}
