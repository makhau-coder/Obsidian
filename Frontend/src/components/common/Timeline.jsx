const steps = ["PLACED", "PREPARING", "DELIVERED"];

export default function Timeline({ status }) {
  const current = steps.indexOf(status);
  return (
    <div className="mt-5 flex items-center">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs"
              style={{
                background: i <= current ? "var(--primary)" : "var(--muted)",
                color: i <= current ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              {i + 1}
            </span>
            <span className="text-xs text-muted-foreground">{step}</span>
          </div>
          {i < steps.length - 1 ? (
            <div
              className="mx-2 h-0.5 flex-1"
              style={{ background: i < current ? "var(--primary)" : "var(--border)" }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
