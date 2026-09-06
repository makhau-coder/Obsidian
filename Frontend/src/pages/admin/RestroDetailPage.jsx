import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BackLink from "../../components/common/BackLink.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import ConfirmDialog from "../../components/common/ConfirmDialog.jsx";
import RestroForm from "../../components/forms/RestroForm.jsx";
import UserCard from "../../components/cards/UserCard.jsx";
import StatusBadge from "../../components/common/StatusBadge.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { getRestroById, getUserById, getMenuItemsByRestro } from "../../api/admin.api.js";
import { money } from "../../utils.js";


export default function RestroDetailPage() {
  const { restroId } = useParams();
  
  const { data: restroData, isLoading: restroLoading, isError: restroError } = useQuery({
    queryKey: ["restro", restroId],
    queryFn: () => getRestroById(restroId),
    retry: false
  });

  const restro = restroData?.restro;
  const ownerId = restro?.restro_owner_id;

  const { data: ownerData, isLoading: ownerLoading } = useQuery({
    queryKey: ["user", ownerId],
    queryFn: () => getUserById(ownerId),
    enabled: !!ownerId,
    retry: false
  });

  const { data: menuData, isLoading: menuLoading } = useQuery({
    queryKey: ["menuItems", restroId],
    queryFn: () => getMenuItemsByRestro(restroId),
    retry: false
  });

  if (restroLoading || ownerLoading || menuLoading) return <Loader />;
  if (restroError) return <ServerErrorPage />;

  const owner = ownerData?.user;
  const items = menuData?.menuItems || [];

  if (!restro) return <ServerErrorPage message="Restaurant not found" />;

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
        <ConfirmDialog 
          title="Delete this restaurant?" 
          message="The menu and order history will be removed too." 
        />
      </div>
    </div>
  );
}
