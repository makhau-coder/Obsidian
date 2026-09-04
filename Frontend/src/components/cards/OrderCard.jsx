import { Link } from "@tanstack/react-router";
import StatusBadge from "../common/StatusBadge.jsx";
import { money, restroName } from "../../data/mock.js";

export default function OrderCard({ order, to, secondary }) {
  return (
    <Link
      to={to}
      params={{ orderId: order.order_id }}
      className="card block transition-transform hover:-translate-y-0.5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold">{order.order_id}</p>
          <p className="text-sm text-muted-foreground">
            {secondary || restroName(order.restro_id)} · {order.created_at}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold">{money(order.total_amount)}</span>
          <StatusBadge status={order.order_status} />
        </div>
      </div>
    </Link>
  );
}
