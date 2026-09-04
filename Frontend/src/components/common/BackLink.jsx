import { Link } from "@tanstack/react-router";

export default function BackLink({ to, children }) {
  return (
    <Link to={to} className="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground">
      ← {children}
    </Link>
  );
}
