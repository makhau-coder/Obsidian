import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="auth-bg flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-6xl font-semibold">404</h1>
        <p className="mt-3 text-muted-foreground">This page went out for delivery and never came back.</p>
        <Link to="/" className="btn btn-primary mt-6">Back home</Link>
      </div>
    </div>
  );
}
