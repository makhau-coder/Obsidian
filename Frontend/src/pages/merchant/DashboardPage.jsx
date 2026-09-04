import { Link } from "@tanstack/react-router";
import OrderCard from "../../components/cards/OrderCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import { menuItems, money, orders } from "../../data/mock.js";

export default function DashboardPage() {
  const revenue = orders.reduce((s, o) => s + o.total_amount, 0);
  return (
    <div className="page-container py-8">
      <PageHeader title="Spice Bowl" subtitle="Here's how the kitchen is doing today." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total orders" value={orders.length} hint="+2 since yesterday" />
        <StatCard label="Menu items" value={menuItems.length} hint="1 currently unavailable" />
        <StatCard label="Revenue" value={money(revenue)} hint="Last 30 days" />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/merchant/menu" className="btn btn-primary">Manage menu</Link>
        <Link to="/merchant/orders" className="btn btn-ghost">View orders</Link>
      </div>
      <h2 className="mb-4 mt-8 text-xl font-semibold">Recent orders</h2>
      <div className="flex flex-col gap-3">
        {orders.slice(0, 4).map((o) => (
          <OrderCard key={o.order_id} order={o} to="/merchant/orders/$orderId" secondary="Customer order" />
        ))}
      </div>
    </div>
  );
}
