import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="auth-bg min-h-screen">
      <header className="page-container flex items-center justify-between py-5">
        <span className="text-xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
          Obsidian
        </span>
        <div className="flex gap-2">
          <Link to="/login" className="btn btn-ghost">Login</Link>
          <Link to="/register" className="btn btn-primary">Get started</Link>
        </div>
      </header>

      <section className="page-container grid items-center gap-10 py-16 md:grid-cols-2">
        <div>
          <span className="badge" style={{ background: "var(--card)" }}>Now serving 6 cities</span>
          <h1 className="mt-4 text-5xl font-semibold leading-tight">Dinner is three taps away.</h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Obsidian connects hungry people, neighbourhood kitchens and the folks who keep it all
            running — one calm, uncluttered interface for each.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/customer/home" className="btn btn-primary">Browse restaurants</Link>
            <Link to="/login" className="btn btn-ghost">I run a restaurant</Link>
          </div>
        </div>
        <div className="card">
          <h2 className="text-xl font-semibold">Three portals, one login</h2>
          <p className="mt-1 text-sm text-muted-foreground">Pick a portal to explore the interface.</p>
          <div className="mt-5 flex flex-col gap-3">
            <Link to="/customer/home" className="btn btn-ghost justify-between">
              <span>🍽️ Customer portal</span><span>→</span>
            </Link>
            <Link to="/merchant/dashboard" className="btn btn-ghost justify-between">
              <span>👩‍🍳 Merchant portal</span><span>→</span>
            </Link>
            <Link to="/admin/dashboard" className="btn btn-ghost justify-between">
              <span>🛡️ Admin portal</span><span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
