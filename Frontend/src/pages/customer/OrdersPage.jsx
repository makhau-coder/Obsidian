import OrderCard from "../../components/cards/OrderCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Tabs from "../../components/common/Tabs.jsx";
import { orders, statuses } from "../../data/mock.js";

export default function OrdersPage() {
  const mine = orders.filter((o) => o.user_id === "usr_1001");
  return (
    <div className="page-container py-8">
      <PageHeader title="My orders" subtitle="Newest first" />
      <Tabs items={["All"].concat(statuses)} active="All" />
      <div className="flex flex-col gap-3">
        {mine.map((o) => (
          <OrderCard key={o.order_id} order={o} to="/customer/orders/$orderId" />
        ))}
      </div>
    </div>
  );
}
