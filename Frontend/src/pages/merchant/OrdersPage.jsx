import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import OrderCard from "../../components/cards/OrderCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Tabs from "../../components/common/Tabs.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getOrdersByRestroId } from "../../api/order.api.js";
import { ORDER_STATUSES } from "../../components/forms/OrderForm.jsx";

export default function OrdersPage() {
  const { currentUser } = useAuth();
  const restroId = currentUser?.restro_id;
  const [activeTab, setActiveTab] = useState("All");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["merchantOrders", restroId],
    queryFn: () => getOrdersByRestroId(restroId),
    enabled: !!restroId,
    retry: false
  });

  if (isLoading) return <Loader />;
  if (isError)   return <ServerErrorPage />;

  const orders = data?.orders || [];
  const filtered = activeTab === "All"
    ? orders
    : orders.filter((o) => o.order_status === activeTab);

  return (
    <div className="page-container py-8">
      <PageHeader title="Incoming orders" subtitle="Tap an order to update its status." />
      <Tabs items={["All"].concat(ORDER_STATUSES)} active={activeTab} onChange={setActiveTab} />
      <div className="flex flex-col gap-3">
        {filtered.map((o) => (
          <OrderCard
            key={o.order_id}
            order={o}
            to="/merchant/orders/$orderId"
            secondary={`${o.customer_firstname || ""} ${o.customer_lastname || ""}`.trim() || "Customer"}
          />
        ))}
      </div>
    </div>
  );
}
