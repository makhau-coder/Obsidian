import { Link } from "react-router-dom";

export default function Brand({ tone }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2">
      <span
        className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold"
        style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        O
      </span>
      <span className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
        Obsidian
      </span>
      {tone ? <span className="text-xs text-muted-foreground">{tone}</span> : null}
    </Link>
  );
}
