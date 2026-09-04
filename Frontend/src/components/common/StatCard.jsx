export default function StatCard({ label, value, hint }) {
  return (
    <div className="card">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
