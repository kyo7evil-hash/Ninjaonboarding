import Icon from "./Icon.jsx";

// Circular progress indicator. `value` is 0..1.
export default function ProgressRing({ value = 0, size = 44, done = false }) {
  const stroke = 4;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, value));
  const offset = c * (1 - clamped);

  return (
    <span
      className="relative inline-grid place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={done ? "Completed" : `${Math.round(clamped * 100)} percent complete`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--nv-border)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={done ? "#1a9c5b" : "var(--nv-red)"}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset .4s ease" }}
        />
      </svg>
      <span className="absolute text-[11px] font-semibold">
        {done ? (
          <Icon name="check" size={16} className="text-[#1a9c5b]" strokeWidth={2.4} />
        ) : (
          `${Math.round(clamped * 100)}%`
        )}
      </span>
    </span>
  );
}
