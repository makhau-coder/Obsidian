import { Link } from "@tanstack/react-router";

export default function RestroCard({ restro }) {
  return (
    <Link
      to="/customer/restro/$restroId"
      params={{ restroId: restro.restro_id }}
      className="card block transition-transform hover:-translate-y-1"
    >
      <div
        className="mb-4 h-28 rounded-md"
        style={{
          background: "linear-gradient(135deg, oklch(0.83 0.14 85 / 0.85), oklch(0.58 0.18 38 / 0.8))",
        }}
      />
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-lg font-semibold">{restro.restro_name}</h3>
        <span className="badge" style={{ background: "var(--muted)" }}>★ {restro.rating}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{restro.cuisine}</p>
      <p className="mt-2 text-sm">{restro.restro_location}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        {restro.restro_pincode} · {restro.eta}
      </p>
    </Link>
  );
}
