export default function ConfirmDialog({ title, message }) {
  return (
    <div className="card max-w-md">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      <div className="mt-5 flex justify-end gap-3">
        <button className="btn btn-ghost">Cancel</button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
}
