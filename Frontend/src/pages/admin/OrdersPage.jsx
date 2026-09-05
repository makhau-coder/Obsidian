import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader.jsx";
import Tabs from "../../components/common/Tabs.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import { money, orders, restroName, statuses, userName } from "../../data/mock.js";

export default function OrdersPage() {
  return (
    <div className="page-container py-8">
      <PageHeader title="Orders" subtitle="Every order across the platform." />
      <Tabs items={["All"].concat(statuses)} active="All" />
      <div className="card">
        <table className="table-basic">
          <thead>
            <tr>
              <th>Order ID</th><th>Customer</th><th>Restaurant</th>
              <th>Total</th><th>Status</th><th>Date</th><th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.order_id}>
                <td>{o.order_id}</td>
                <td>{userName(o.user_id)}</td>
                <td>{restroName(o.restro_id)}</td>
                <td>{money(o.total_amount)}</td>
                <td><StatusBadge status={o.order_status} /></td>
                <td>{o.created_at}</td>
                <td className="text-right">
                  <Link to={`/admin/orders/${o.order_id}`} className="btn btn-ghost">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination total={orders.length} />
      </div>
    </div>
  );
}
