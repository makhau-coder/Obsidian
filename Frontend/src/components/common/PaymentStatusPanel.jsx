import { useState } from "react";
import StatusBadge from "./StatusBadge.jsx";
import { money } from "../../utils.js";

const METHODS = ["CARD", "UPI", "WALLET", "COD"];
const STATUSES = ["SUCCESS", "PENDING", "FAILED"];

/**
 * Read-only payment status panel for admin views.
 * Generates a stable mocked payment record on first render (useState initialiser).
 * No backend connection — UI only.
 *
 * Props:
 *   order {object} — the order record (needs order.total_amount)
 */
export default function PaymentStatusPanel({ order }) {
  const [payment] = useState(() => {
    if (!order) return null;
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    return {
      payment_id:  "PAY_" + Math.random().toString(16).slice(2, 10).toUpperCase(),
      method:      METHODS[Math.floor(Math.random() * METHODS.length)],
      status,
      gateway_ref: status === "SUCCESS"
        ? "GW_" + Math.random().toString(16).slice(2, 10).toUpperCase()
        : null,
      amount: order.total_amount,
    };
  });

  if (!payment) return null;

  const rows = [
    { label: "Payment ID",  value: <span className="font-mono">{payment.payment_id}</span> },
    { label: "Method",      value: payment.method },
    { label: "Amount",      value: <strong>{money(payment.amount)}</strong> },
    { label: "Status",      value: <StatusBadge status={payment.status} /> },
    ...(payment.gateway_ref
      ? [{ label: "Gateway ref", value: <span className="font-mono">{payment.gateway_ref}</span> }]
      : []),
  ];

  return (
    <div className="card mt-5">
      <h2 className="mb-4 text-lg font-semibold">Payment record</h2>
      <table className="table-basic">
        <tbody>
          {rows.map(({ label, value }) => (
            <tr key={label}>
              <td className="text-muted-foreground text-sm" style={{ width: "40%" }}>{label}</td>
              <td className="text-sm">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
