import { useState } from "react";
import StatusBadge from "./StatusBadge.jsx";
import { money } from "../../utils.js";

const METHODS = [
  { id: "CARD",   label: "💳 Card" },
  { id: "UPI",    label: "📱 UPI" },
  { id: "WALLET", label: "👜 Wallet" },
  { id: "COD",    label: "💵 Cash on delivery" },
];

/**
 * Interactive payment simulation panel for the customer order detail page.
 * No backend connection — simulates 90% success / 10% failure locally.
 *
 * Props:
 *   amount {number} — order total to display and confirm
 */
export default function PaymentPanel({ amount }) {
  const [method, setMethod] = useState("CARD");
  const [status, setStatus] = useState("IDLE"); // IDLE | PROCESSING | SUCCESS | FAILED

  const handlePay = () => {
    if (status === "SUCCESS") return;
    setStatus("PROCESSING");
    setTimeout(() => {
      const result = Math.random() < 0.9 ? "SUCCESS" : "FAILED";
      setStatus(result);
    }, 1500);
  };

  return (
    <div className="card mt-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Payment</h2>
        {status !== "IDLE" && status !== "PROCESSING" && (
          <StatusBadge status={status} />
        )}
      </div>

      {status === "SUCCESS" ? (
        <div
          className="rounded-lg p-4 text-sm"
          style={{ background: "oklch(0.93 0.06 155 / 0.4)", color: "oklch(0.35 0.12 155)" }}
        >
          <p className="font-semibold text-base mb-1">✅ Payment successful</p>
          <p>Method: <strong>{method}</strong> · Amount: <strong>{money(amount)}</strong></p>
        </div>
      ) : status === "FAILED" ? (
        <div
          className="rounded-lg p-4 text-sm"
          style={{ background: "oklch(0.93 0.05 25 / 0.35)", color: "oklch(0.45 0.16 27)" }}
        >
          <p className="font-semibold text-base mb-1">❌ Payment failed</p>
          <p>Your payment could not be processed. Please try a different method or retry.</p>
          <button
            className="btn btn-ghost mt-3 text-sm"
            onClick={() => setStatus("IDLE")}
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-3">Select payment method</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-5">
            {METHODS.map((m) => (
              <label
                key={m.id}
                className="flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm cursor-pointer transition-all"
                style={{
                  borderColor: method === m.id ? "var(--primary)" : "var(--border)",
                  background: method === m.id ? "oklch(0.58 0.18 38 / 0.08)" : "var(--card)",
                  fontWeight: method === m.id ? "600" : "400",
                }}
              >
                <input
                  type="radio"
                  name="payment-method"
                  value={m.id}
                  checked={method === m.id}
                  onChange={() => setMethod(m.id)}
                  className="sr-only"
                />
                {m.label}
              </label>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Total: <strong className="text-foreground">{money(amount)}</strong>
            </span>
            <button
              id="pay-now-btn"
              className="btn btn-primary"
              onClick={handlePay}
              disabled={status === "PROCESSING"}
            >
              {status === "PROCESSING" ? (
                <><span className="spinner" /> Processing…</>
              ) : (
                "Pay now"
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
