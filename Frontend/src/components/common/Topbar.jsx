export default function Topbar({ title, userName, initials }) {
  return (
    <header className="border-b bg-card">
      <div className="flex items-center justify-between px-6 py-3">
        <span className="text-sm text-muted-foreground">{title} Portal</span>
        <div className="flex items-center gap-3">
          <span className="text-sm">{userName}</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold">
            {initials}
          </span>
        </div>
      </div>
    </header>
  );
}
