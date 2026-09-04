export default function Modal({ title, children, confirmLabel }) {
  return (
    <div className="card max-w-xl">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4">{children}</div>
      <div className="mt-6 flex justify-end gap-3">
        <button className="btn btn-ghost">Cancel</button>
        <button className="btn btn-primary">{confirmLabel || "Save"}</button>
      </div>
    </div>
  );
}
