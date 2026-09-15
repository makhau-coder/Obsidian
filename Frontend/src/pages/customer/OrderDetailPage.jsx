import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BackLink from "../../components/common/BackLink.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Timeline from "../../components/common/Timeline.jsx";
import PaymentPanel from "../../components/common/PaymentPanel.jsx";
import OrderedItemRow from "../../components/cards/OrderedItemRow.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { money } from "../../utils.js";
import { getOrderById, getAllOrderedItems } from "../../api/customer.api.js";

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

      {/* Order header */}
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

      {/* Items table */}
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

      {/* Payment simulation — UI only, no backend connection */}
      <PaymentPanel amount={order.total_amount} />
    </div>
  );
}
