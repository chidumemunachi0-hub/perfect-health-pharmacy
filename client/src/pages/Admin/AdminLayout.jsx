import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "./AdminLayout.css";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-layout">

  {/* Hamburger - shown when menu is closed */}
  {!open && (
    <button
      className="menu-btn"
      onClick={() => setOpen(true)}
      aria-label="Open menu"
    >
      ☰
    </button>
  )}

  {/* Overlay */}
  {open && (
    <div
      className="sidebar-overlay"
      onClick={() => setOpen(false)}
    />
  )}

  {/* Sidebar */}
  <aside
    className={`sidebar ${open ? "sidebar-open" : ""}`}
  >

    {/* Close button */}
    {open && (
      <button
        className="sidebar-close-btn"
        onClick={() => setOpen(false)}
        aria-label="Close menu"
      >
        ✕
      </button>
    )}

    <h2>Perfect Health</h2>

    <NavLink
      to="/admin"
      end
      onClick={() => setOpen(false)}
    >
      Dashboard
    </NavLink>

    <NavLink
      to="/admin/products"
      onClick={() => setOpen(false)}
    >
      Products
    </NavLink>

    <NavLink
      to="/admin/orders"
      onClick={() => setOpen(false)}
    >
      Orders
    </NavLink>

    <NavLink
      to="/admin/categories"
      onClick={() => setOpen(false)}
    >
      Categories
    </NavLink>

    <NavLink
      to="/admin/customers"
      onClick={() => setOpen(false)}
    >
      Customers
    </NavLink>

    <NavLink
  to="/admin/delivery"
  onClick={() => setOpen(false)}
>
  Delivery
</NavLink>

  </aside>

  {/* Main content */}
  <main className="admin-content">
    <Outlet />
  </main>

</div>
  );
}

export default AdminLayout;