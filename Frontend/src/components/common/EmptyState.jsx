export default function EmptyState({ title, message, actionLabel }) {
  return (
    <div className="card flex flex-col items-center gap-2 py-14 text-center">
      <div className="mb-1 text-4xl">🍽️</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
      {actionLabel ? <button className="btn btn-primary mt-3">{actionLabel}</button> : null}
    </div>
  );
}
