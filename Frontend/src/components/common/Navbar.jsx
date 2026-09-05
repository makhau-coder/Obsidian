import { Link, NavLink } from "react-router-dom";
import Brand from "./Brand.jsx";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b bg-card/90 backdrop-blur">
      <div className="page-container flex items-center justify-between py-3">
        <Brand />
        <nav className="hidden gap-1 md:flex">
          <NavLink
            to="/customer/home"
            className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
          >
            Browse
          </NavLink>
          <NavLink
            to="/customer/orders"
            className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
          >
            My Orders
          </NavLink>
          <NavLink
            to="/customer/cart"
            className={({ isActive }) => "sidebar-link" + (isActive ? " sidebar-link-active" : "")}
          >
            Cart
          </NavLink>
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
