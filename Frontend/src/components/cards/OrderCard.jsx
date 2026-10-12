import { Link } from "react-router-dom";
import StatusBadge from "../common/StatusBadge.jsx";
import { money } from "../../utils.js";

export default function OrderCard({ order, to, secondary }) {
    // API already joins restro_name on getAllOrders / getOrdersByUserId responses.
    // `secondary` prop can override the subtitle (e.g. customer name for merchant view).
    const subtitle = secondary || order.restro_name || order.restro_id;

    return (
        <Link
            to={`${to.replace("$orderId", order.order_id)}`}
            className="card block transition-transform hover:-translate-y-0.5"
        >
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="font-semibold">{order.order_id}</p>
                    <p className="text-sm text-muted-foreground">
                        {subtitle} · {order.created_at}
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
