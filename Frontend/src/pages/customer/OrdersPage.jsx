import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import OrderCard from "../../components/cards/OrderCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Tabs from "../../components/common/Tabs.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { currentUser, statuses } from "../../data/mock.js";
import { getOrdersByUserId } from "../../api/customer.api.js";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("All");

  const { data: ordersData, isLoading, isError } = useQuery({
    queryKey: ["customerOrders", currentUser.user_id],
    queryFn: () => getOrdersByUserId(currentUser.user_id),
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
      <Tabs items={["All"].concat(statuses)} active={activeTab} onChange={setActiveTab} />
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
