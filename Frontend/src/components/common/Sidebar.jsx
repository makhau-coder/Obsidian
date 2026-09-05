import { NavLink } from "react-router-dom";
import Brand from "./Brand.jsx";

export default function Sidebar({ title, links }) {
  return (
    <aside className="hidden w-[260px] shrink-0 border-r bg-card p-4 md:block">
      <div className="mb-6 px-2">
        <Brand tone={title} />
      </div>
      <nav className="flex flex-col gap-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " sidebar-link-active" : "")
            }
          >
            <span>{l.icon}</span>
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-8 border-t pt-4">
        <NavLink to="/login" className="sidebar-link">
          <span>⏻</span> Logout
        </NavLink>
      </div>
    </aside>
  );
}
