const statusStyles = {
  PLACED: { background: "oklch(0.94 0.08 85)", color: "oklch(0.45 0.12 70)" },
  PREPARING: { background: "oklch(0.93 0.05 245)", color: "oklch(0.45 0.14 250)" },
  DELIVERED: { background: "oklch(0.93 0.06 155)", color: "oklch(0.42 0.11 155)" },
  CANCELLED: { background: "oklch(0.93 0.05 25)", color: "oklch(0.48 0.16 27)" },
  AVAILABLE: { background: "oklch(0.93 0.06 155)", color: "oklch(0.42 0.11 155)" },
  UNAVAILABLE: { background: "oklch(0.93 0.005 80)", color: "oklch(0.45 0.01 80)" },
  CUSTOMER: { background: "oklch(0.93 0.05 245)", color: "oklch(0.45 0.14 250)" },
  MERCHANT: { background: "oklch(0.94 0.08 85)", color: "oklch(0.45 0.12 70)" },
  ADMIN: { background: "oklch(0.93 0.05 25)", color: "oklch(0.48 0.16 27)" },
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || statusStyles.UNAVAILABLE;
  return <span className="badge" style={style}>{status}</span>;
}
