import { Link } from "@tanstack/react-router";
import Brand from "./Brand.jsx";

export default function Navbar() {
  const active = { className: "sidebar-link sidebar-link-active" };
  return (
    <header className="sticky top-0 z-10 border-b bg-card/90 backdrop-blur">
      <div className="page-container flex items-center justify-between py-3">
        <Brand />
        <nav className="hidden gap-1 md:flex">
          <Link to="/customer/home" className="sidebar-link" activeProps={active}>Browse</Link>
          <Link to="/customer/orders" className="sidebar-link" activeProps={active}>My Orders</Link>
          <Link to="/customer/cart" className="sidebar-link" activeProps={active}>Cart</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/customer/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-semibold"
          >
            AC
          </Link>
          <Link to="/login" className="btn btn-ghost">Logout</Link>
        </div>
      </div>
    </header>
  );
}
