import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar.jsx";
import Topbar from "../components/common/Topbar.jsx";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: "▦" },
  { to: "/admin/users", label: "Users", icon: "👥" },
  { to: "/admin/restros", label: "Restaurants", icon: "🏪" },
  { to: "/admin/orders", label: "Orders", icon: "🧾" },
];

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar title="Admin" links={links} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title="Admin" userName="Dev Menon" initials="DM" />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
