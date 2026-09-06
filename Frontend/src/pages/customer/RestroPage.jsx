import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MenuItemCard from "../../components/cards/MenuItemCard.jsx";
import BackLink from "../../components/common/BackLink.jsx";
import Loader from "../../components/common/Loader.jsx";
import ServerErrorPage from "../ServerErrorPage.jsx";
import { money } from "../../utils.js";
import { getRestroById, getMenuItemsByRestro } from "../../api/customer.api.js";

export default function RestroPage() {
  const { restroId } = useParams();

  const { data: restroData, isLoading: restroLoading, isError: restroError } = useQuery({
    queryKey: ["customerRestro", restroId],
    queryFn: () => getRestroById(restroId),
    retry: false
  });

  const { data: menuData, isLoading: menuLoading, isError: menuError } = useQuery({
    queryKey: ["customerMenuItems", restroId],
    queryFn: () => getMenuItemsByRestro(restroId),
    retry: false
  });

  if (restroLoading || menuLoading) return <Loader />;
  if (restroError || menuError) return <ServerErrorPage />;

  const restro = restroData?.restro;
  const items = menuData?.menuItems || [];

  if (!restro) return <ServerErrorPage message="Restaurant not found" />;

  return (
    <div className="page-container py-8 pb-28">
      <BackLink to="/customer/home">All restaurants</BackLink>
      <div className="card mb-6">
        <h1 className="page-title">{restro.restro_name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {restro.restro_location} · {restro.restro_pincode}
        </p>
        <p className="mt-2 text-sm">★ {restro.rating || "New"} · {restro.cuisine || "Multi-cuisine"} · {restro.eta || "30 min"}</p>
      </div>

      <h2 className="mb-4 text-xl font-semibold">Menu</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <MenuItemCard
            key={item.item_id}
            item={item}
            actions={
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-md border px-2 py-1 text-sm">
                  <button>−</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <button className="btn btn-primary">Add</button>
              </div>
            }
          />
        ))}
        {items.length === 0 && <p className="text-muted-foreground">No menu items available.</p>}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-card">
        <div className="page-container flex items-center justify-between py-3">
          <span className="text-sm text-muted-foreground">3 items · {money(1015)}</span>
          <Link to="/customer/cart" className="btn btn-primary">View cart</Link>
        </div>
      </div>
    </div>
  );
}
