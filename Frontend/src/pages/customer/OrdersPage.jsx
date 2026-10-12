import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import OrderCard from "../../components/cards/OrderCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Tabs from "../../components/common/Tabs.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../../pages/ServerErrorPage.jsx";
import { getOrdersByUserId } from "../../api/customer.api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { ORDER_STATUSES } from "../../components/forms/OrderForm.jsx";

export default function OrdersPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("All");

  const { data: ordersData, isLoading, isError } = useQuery({
    queryKey: ["customerOrders", currentUser?.user_id],
    queryFn: () => getOrdersByUserId(currentUser.user_id),
    enabled: !!currentUser?.user_id,
    retry: false
  });

  if (isLoading) return <Loader />;
  if (isError) return <ServerErrorPage />;

  const orders = ordersData?.orders || [];

  const filteredOrders = activeTab === "All"
    ? orders
    : orders.filter((o) => o.order_status === activeTab);

  return (
    <div className="page-container py-8">
      <PageHeader title="My orders" subtitle="Newest first" />
      <Tabs items={["All"].concat(ORDER_STATUSES)} active={activeTab} onChange={setActiveTab} />
      <div className="flex flex-col gap-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((o) => (
            <OrderCard key={o.order_id} order={o} to="/customer/orders/$orderId" />
          ))
        ) : (
          <p className="text-muted-foreground mt-4">No orders found.</p>
        )}
      </div>
    </div>
  );
}
