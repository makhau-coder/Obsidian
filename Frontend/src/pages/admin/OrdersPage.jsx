import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader.jsx";
import Tabs from "../../components/common/Tabs.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import Loader from "../../components/common/Loader.jsx";
import { getAllOrders } from "../../api/admin.api.js";
import { useQuery } from "@tanstack/react-query";
import { statuses} from "../../data/mock.js";

export default function OrdersPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    retry: false
  })

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    console.log(error);
    return <ServerErrorPage />
  }

  let orders;
  if (data.orders) {
    orders = [...data.orders];
  } else {
    orders = [];
  }

  console.log(data);
  console.log(orders);

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
                <td>{o.customer_firstname + o.customer_lastname}</td>
                <td>{o.restro_name}</td>
                <td>{o.total_amount}</td>
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
