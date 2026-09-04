const tones = {
  success: "var(--success)",
  error: "var(--danger)",
  info: "var(--info)",
};

export default function Toast({ tone, message }) {
  return (
    <div className="card flex items-center gap-3 py-3">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: tones[tone] || tones.info }} />
      <span className="text-sm">{message}</span>
    </div>
  );
}
