import OrderedItemRow from "../../components/cards/OrderedItemRow.jsx";
import BackLink from "../../components/common/BackLink.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import OrderForm from "../../components/forms/OrderForm.jsx";
import { money } from "../../utils.js";
import { orderedItems, orders, userName } from "../../data/mock.js";

export default function OrderDetailPage() {
  const order = orders[0];
  const items = orderedItems.filter((i) => i.order_id === order.order_id);
  return (
    <div className="page-container py-8">
      <BackLink to="/merchant/orders">Orders</BackLink>
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="page-title">{order.order_id}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {userName(order.user_id)} · {order.created_at}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={order.order_status} />
            <span className="text-xl font-semibold">{money(order.total_amount)}</span>
          </div>
        </div>
      </div>

      <div className="card mt-5">
        <h2 className="mb-3 text-lg font-semibold">Items</h2>
        <table className="table-basic">
          <thead>
            <tr><th>Item</th><th>Qty</th><th>Unit price</th><th className="text-right">Amount</th></tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <OrderedItemRow key={row.order_item_id} row={row} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <OrderForm status={order.order_status} />
      </div>
    </div>
  );
}
