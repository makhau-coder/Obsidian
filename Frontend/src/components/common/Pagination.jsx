export default function Pagination({ total }) {
  return (
    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
      <span>Showing 1–10 of {total || 24}</span>
      <div className="flex gap-2">
        <button className="btn btn-ghost">Previous</button>
        <button className="btn btn-ghost">Next</button>
      </div>
    </div>
  );
}
