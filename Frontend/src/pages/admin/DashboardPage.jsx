import PageHeader from "../../components/common/PageHeader.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import OrderCard from "../../components/cards/OrderCard.jsx";
import { money, orders, restros, users } from "../../data/mock.js";

export default function DashboardPage() {
  const revenue = orders.reduce((s, o) => s + o.total_amount, 0);
  return (
    <div className="page-container py-8">
      <PageHeader title="Platform overview" subtitle="Everything happening on Obsidian today." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Users" value={users.length} hint="2 merchants" />
        <StatCard label="Restaurants" value={restros.length} hint="6 cities" />
        <StatCard label="Orders" value={orders.length} hint="Last 7 days" />
        <StatCard label="Revenue" value={money(revenue)} hint="Gross" />
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
