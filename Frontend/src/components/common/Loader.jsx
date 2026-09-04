export default function Loader({ label }) {
  return (
    <div className="flex items-center justify-center gap-3 py-12 text-sm text-muted-foreground">
      <span className="spinner" />
      {label || "Loading..."}
    </div>
  );
}
