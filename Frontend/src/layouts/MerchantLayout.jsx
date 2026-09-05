import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar.jsx";
import Topbar from "../components/common/Topbar.jsx";

const links = [
  { to: "/merchant/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/merchant/restaurant", label: "Restaurant", icon: "🏠" },
  { to: "/merchant/menu", label: "Menu", icon: "🍜" },
  { to: "/merchant/orders", label: "Orders", icon: "🧾" },
  { to: "/merchant/profile", label: "Profile", icon: "👤" },
];

export default function MerchantLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Merchant" links={links} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title="Merchant" userName="Meera Nair" initials="MN" />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
