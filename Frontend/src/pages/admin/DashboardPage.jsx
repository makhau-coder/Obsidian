import PageHeader from "../../components/common/PageHeader.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import OrderCard from "../../components/cards/OrderCard.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { useQuery } from "@tanstack/react-query";
import { getTableCounts, getTotalOrderAmount, getAllOrders } from "../../api/admin.api.js";
import { money } from "../../utils.js";


export default function DashboardPage() {
  const { data: countsData, isLoading: countsLoading, isError: countsError } = useQuery({
    queryKey: ["tableCounts"],
    queryFn: getTableCounts,
    retry: false
  });

  const { data: amountData, isLoading: amountLoading, isError: amountError } = useQuery({
    queryKey: ["totalOrderAmount"],
    queryFn: getTotalOrderAmount,
    retry: false
  });

  const { data: ordersData, isLoading: ordersLoading, isError: ordersError } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    retry: false
  });

  if (countsLoading || amountLoading || ordersLoading) {
    return <Loader />;
  }

  if (countsError || amountError || ordersError) {
    return <ServerErrorPage />;
  }

  const usersCount = countsData?.users_count || 0;
  const restrosCount = countsData?.restros_count || 0;
  const ordersCount = countsData?.orders_count || 0;
  const revenue = amountData?.total_amount || 0;
  
  const orders = ordersData?.orders || [];

  return (
    <div className="page-container py-8">
      <PageHeader title="Platform overview" subtitle="Everything happening on Obsidian today." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Users" value={usersCount} />
        <StatCard label="Restaurants" value={restrosCount} />
        <StatCard label="Orders" value={ordersCount} />
        <StatCard label="Revenue" value={money(revenue)} />
      </div>

      <h2 className="mb-4 mt-8 text-xl font-semibold">Recent activity</h2>
      <div className="flex flex-col gap-3">
        {orders.slice(0, 4).map((o) => (
          <OrderCard key={o.order_id} order={o} to="/admin/orders/$orderId" />
        ))}
      </div>
    </div>
  );
}
