import OrderCard from "../../components/cards/OrderCard.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import Tabs from "../../components/common/Tabs.jsx";
import { orders, statuses, userName } from "../../data/mock.js";

export default function OrdersPage() {
  return (
    <div className="page-container py-8">
      <PageHeader title="Incoming orders" subtitle="Tap an order to update its status." />
      <Tabs items={["All"].concat(statuses)} active="All" />
      <div className="flex flex-col gap-3">
        {orders.map((o) => (
          <OrderCard key={o.order_id} order={o} to="/merchant/orders/$orderId" secondary={userName(o.user_id)} />
        ))}
      </div>
    </div>
  );
}
