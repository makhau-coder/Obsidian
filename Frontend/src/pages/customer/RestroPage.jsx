import { Link } from "@tanstack/react-router";
import MenuItemCard from "../../components/cards/MenuItemCard.jsx";
import BackLink from "../../components/common/BackLink.jsx";
import { menuItems, money, restros } from "../../data/mock.js";

export default function RestroPage() {
  const restro = restros[0];
  const items = menuItems.filter((i) => i.restro_id === restro.restro_id);

  return (
    <div className="page-container py-8 pb-28">
      <BackLink to="/customer/home">All restaurants</BackLink>
      <div className="card mb-6">
        <h1 className="page-title">{restro.restro_name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {restro.restro_location} · {restro.restro_pincode}
        </p>
        <p className="mt-2 text-sm">★ {restro.rating} · {restro.cuisine} · {restro.eta}</p>
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
