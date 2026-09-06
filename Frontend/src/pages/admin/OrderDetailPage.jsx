import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BackLink from "../../components/common/BackLink.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import OrderedItemRow from "../../components/cards/OrderedItemRow.jsx";
import OrderForm from "../../components/forms/OrderForm.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { getOrderById, getAllOrderedItems, editOrder, deleteOrder } from "../../api/admin.api.js";
import { money } from "../../utils.js";


export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: orderData, isLoading: orderLoading, isError: orderError } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    retry: false
  });

  const { data: itemsData, isLoading: itemsLoading, isError: itemsError } = useQuery({
    queryKey: ["orderedItems", orderId],
    queryFn: () => getAllOrderedItems(orderId),
    retry: false
  });

  const updateMutation = useMutation({
    mutationFn: (newStatus) => editOrder({ orderId, data: { ...orderData.order, order_status: newStatus } }),
    onSuccess: () => {
      queryClient.invalidateQueries(["order", orderId]);
      queryClient.invalidateQueries(["orders"]);
    },
    retry:false
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      navigate("/admin/orders");
    },
    retry:false
  });

  if (orderLoading || itemsLoading) return <Loader />;
  if (orderError || itemsError) return <ServerErrorPage />;

  const order = orderData?.order;
  const items = itemsData?.orderedItems || [];

  if (!order) return <ServerErrorPage message="Order not found" />;

  const handleStatusUpdate = (newStatus) => {
    updateMutation.mutate(newStatus);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <div className="page-container py-8">
      <BackLink to="/admin/orders">Orders</BackLink>
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="page-title">{order.order_id}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {order.customer_firstname} {order.customer_lastname} → {order.restro_name} · {order.created_at}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={order.order_status} />
            <span className="text-xl font-semibold">{money(order.total_amount)}</span>
          </div>
        </div>
      </div>

      <div className="card mt-5">
        <h2 className="mb-3 text-lg font-semibold">Ordered items</h2>
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
        <OrderForm status={order.order_status} onSubmit={handleStatusUpdate} />
      </div>

      <div className="mt-8">
        <ConfirmDialog 
          title="Delete this order?" 
          message="The order and its items will be permanently removed." 
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}