import BackLink from "../../components/common/BackLink.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import UserForm from "../../components/forms/UserForm.jsx";
import OrderCard from "../../components/cards/OrderCard.jsx";
import { orders, users } from "../../data/mock.js";

export default function UserDetailPage() {
  const user = users[0];
  const theirOrders = orders.filter((o) => o.user_id === user.user_id);
  return (
    <div className="page-container py-8">
      <BackLink to="/admin/users">Users</BackLink>
      <PageHeader title={user.user_firstname + " " + user.user_lastname} subtitle={user.user_id} />
      <div className="card max-w-3xl">
        <UserForm user={user} showRole />
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost">Cancel</button>
          <button className="btn btn-primary">Save changes</button>
        </div>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-semibold">Orders placed</h2>
      <div className="flex flex-col gap-3">
        {theirOrders.map((o) => (
          <OrderCard key={o.order_id} order={o} to="/admin/orders/$orderId" />
        ))}
      </div>

      <div className="mt-8">
        <ConfirmDialog title="Delete this user?" message="This removes the account and all of its orders. This cannot be undone." />
      </div>
    </div>
  );
}
