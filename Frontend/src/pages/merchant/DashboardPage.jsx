import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import OrderCard from "../../components/cards/OrderCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getOrdersByRestroId, getTotalOrderAmountByRestroId } from "../../api/order.api.js";
import { getMenuItemsByRestro } from "../../api/restro.api.js";
import { money } from "../../utils.js";

export default function DashboardPage() {
  const { currentUser } = useAuth();

  // currentUser.restro_id should be in the JWT payload for merchants
  // Fall back to a query if it's not there
  const restroId = currentUser?.restro_id;

  const { data: ordersData, isLoading: ordersLoading, isError: ordersError } = useQuery({
    queryKey: ["merchantOrders", restroId],
    queryFn: () => getOrdersByRestroId(restroId),
    enabled: !!restroId,
    retry: false
  });

  const { data: menuData, isLoading: menuLoading } = useQuery({
    queryKey: ["merchantMenu", restroId],
    queryFn: () => getMenuItemsByRestro(restroId),
    enabled: !!restroId,
    retry: false
  });

  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ["merchantRevenue", restroId],
    queryFn: () => getTotalOrderAmountByRestroId(restroId),
    enabled: !!restroId,
    retry: false
  });

  if (ordersLoading || menuLoading || revenueLoading) return <Loader />;
  if (ordersError) return <ServerErrorPage />;

  const orders   = ordersData?.orders   || [];
  const menuItems = menuData?.menuItems  || [];
  const revenue  = revenueData?.total_amount || 0;

  return (
    <div className="page-container py-8">
      <PageHeader title="Dashboard" subtitle="Here's how the kitchen is doing today." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total orders"  value={orders.length}   hint="+2 since yesterday" />
        <StatCard label="Menu items"    value={menuItems.length} hint="Active items" />
        <StatCard label="Revenue"       value={money(revenue)}  hint="All time" />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/merchant/menu"   className="btn btn-primary">Manage menu</Link>
        <Link to="/merchant/orders" className="btn btn-ghost">View orders</Link>
      </div>
      <h2 className="mb-4 mt-8 text-xl font-semibold">Recent orders</h2>
      <div className="flex flex-col gap-3">
        {orders.slice(0, 4).map((o) => (
          <OrderCard key={o.order_id} order={o} to="/merchant/orders/$orderId"
            secondary={`${o.customer_firstname || ""} ${o.customer_lastname || ""}`.trim() || "Customer"} />
        ))}
      </div>
    </div>
  );
}
