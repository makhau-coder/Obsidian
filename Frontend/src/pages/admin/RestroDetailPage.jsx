import BackLink from "../../components/common/BackLink.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import RestroForm from "../../components/forms/RestroForm.jsx";
import UserCard from "../../components/cards/UserCard.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import { menuItems, money, restros, users } from "../../data/mock.js";

export default function RestroDetailPage() {
  const restro = restros[0];
  const owner = users.find((u) => u.user_id === restro.restro_owner_id);
  const items = menuItems.filter((i) => i.restro_id === restro.restro_id);

  return (
    <div className="page-container py-8">
      <BackLink to="/admin/restros">Restaurants</BackLink>
      <PageHeader title={restro.restro_name} subtitle={restro.restro_id} />
      <div className="card max-w-3xl">
        <RestroForm restro={restro} />
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost">Cancel</button>
          <button className="btn btn-primary">Save changes</button>
        </div>
      </div>

      <h2 className="mb-3 mt-8 text-xl font-semibold">Owner</h2>
      <div className="max-w-md">{owner ? <UserCard user={owner} /> : null}</div>

      <h2 className="mb-3 mt-8 text-xl font-semibold">Menu items</h2>
      <div className="card">
        <table className="table-basic">
          <thead>
            <tr><th>Item</th><th>Price</th><th>Status</th></tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.item_id}>
                <td>{i.item_name}</td>
                <td>{money(i.item_price)}</td>
                <td><StatusBadge status={i.is_available ? "AVAILABLE" : "UNAVAILABLE"} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <ConfirmDialog title="Delete this restaurant?" message="The menu and order history will be removed too." />
      </div>
    </div>
  );
}
