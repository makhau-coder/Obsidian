import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import OrderedItemRow from "../../components/cards/OrderedItemRow.jsx";
import BackLink from "../../components/common/BackLink.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { money } from "../../utils.js";
import { getOrderById, getAllOrderedItems } from "../../api/customer.api.js";

function Timeline({ status }) {
  const steps = ["PLACED", "PREPARING", "DELIVERED"];
  const current = steps.indexOf(status);
  return (
    <div className="mt-5 flex items-center">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full text-xs"
              style={{
                background: i <= current ? "var(--primary)" : "var(--muted)",
                color: i <= current ? "var(--primary-foreground)" : "var(--muted-foreground)",
              }}
            >
              {i + 1}
            </span>
            <span className="text-xs text-muted-foreground">{step}</span>
          </div>
          {i < steps.length - 1 ? (
            <div
              className="mx-2 h-0.5 flex-1"
              style={{ background: i < current ? "var(--primary)" : "var(--border)" }}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function OrderDetailPage() {
  const { orderId } = useParams();

  const { data: orderData, isLoading: orderLoading, isError: orderError } = useQuery({
    queryKey: ["customerOrder", orderId],
    queryFn: () => getOrderById(orderId),
    retry: false
  });

  const { data: itemsData, isLoading: itemsLoading, isError: itemsError } = useQuery({
    queryKey: ["customerOrderedItems", orderId],
    queryFn: () => getAllOrderedItems(orderId),
    retry: false
  });

  if (orderLoading || itemsLoading) return <Loader />;
  if (orderError || itemsError) return <ServerErrorPage />;

  const order = orderData?.order;
  const items = itemsData?.orderedItems || [];

  if (!order) return <ServerErrorPage message="Order not found" />;

  return (
    <div className="page-container py-8">
      <BackLink to="/customer/orders">My orders</BackLink>
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="page-title">{order.order_id}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {order.restro_name} · {order.created_at}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={order.order_status} />
            <span className="text-xl font-semibold">{money(order.total_amount)}</span>
          </div>
        </div>
        <Timeline status={order.order_status} />
      </div>

      <div className="card mt-5">
        <h2 className="mb-3 text-lg font-semibold">Items</h2>
        <table className="table-basic">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Unit price</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <OrderedItemRow key={row.order_item_id} row={row} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
