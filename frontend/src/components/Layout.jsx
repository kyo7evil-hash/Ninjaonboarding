import { Link } from "react-router-dom";

function Logo() {
  // Text lockup placeholder — no official Ninja Van asset.
  return (
    <span className="inline-flex items-center gap-2 font-extrabold tracking-tight">
      <span
        className="grid h-7 w-7 place-items-center rounded-md text-white"
        style={{ background: "var(--nv-red)" }}
        aria-hidden="true"
      >
        N
      </span>
      <span className="text-[15px]">
        Ninja Van <span className="font-semibold text-[color:var(--nv-text-muted)]">Onboarding</span>
      </span>
    </span>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-full">
      <header
        className="sticky top-0 z-20 border-b backdrop-blur"
        style={{
          borderColor: "var(--nv-border)",
          background: "color-mix(in srgb, var(--nv-surface) 88%, transparent)",
        }}
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link to="/" className="rounded-md" aria-label="Ninja Van Onboarding home">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">{children}</main>
      <footer className="mx-auto max-w-3xl px-4 pb-10 pt-4 text-xs text-[color:var(--nv-text-muted)]">
        Internal onboarding — summarises Ninja Van policy for new employees. Refer to the
        official policy documents for the authoritative wording.
      </footer>
    </div>
  );
}
