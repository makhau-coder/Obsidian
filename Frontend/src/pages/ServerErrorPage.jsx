import { Link, useNavigate } from "react-router-dom";

export default function ServerErrorPage({ message }) {
  const navigate = useNavigate();

  return (
    <div className="auth-bg flex min-h-screen items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-6xl font-semibold">500</h1>
        <p className="mt-3 text-muted-foreground">
          {message || "Something went wrong on our end. The kitchen is on fire."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button className="btn btn-ghost" onClick={() => navigate(-1)}>
            Go back
          </button>
          <Link to="/" className="btn btn-primary">
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
