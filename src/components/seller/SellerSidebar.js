import React from "react";
import { Link, useLocation } from "react-router-dom";

function SellerSidebar() {
  const location = useLocation();
  const navLinks = [
    { to: "/seller/dashboard", label: "Dashboard", icon: "fa-solid fa-gauge" },
    { to: "/seller/products", label: "Products", icon: "fa-solid fa-boxes-stacked" },
    { to: "/seller/orders", label: "Orders", icon: "fa-solid fa-clipboard-list" },
    { to: "/seller/customers", label: "Customers", icon: "fa-solid fa-users" },
    { to: "/seller/reports", label: "Reports", icon: "fa-solid fa-chart-line" },
    { to: "/seller/changepassword", label: "Change Password", icon: "fa-solid fa-key" },
    { to: "/seller/logout", label: "Logout", icon: "fa-solid fa-sign-out-alt", danger: true }
  ];

  // Make sidebar full height and sticky
  return (
    <div className="col-md-3 mb-4 mb-md-0">
      <div className="list-group glass-card shadow-sm">
        {navLinks.map((link, idx) => {
          const isActive = location.pathname.startsWith(link.to);
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`list-group-item list-group-item-action${isActive ? " active" : ""}`}
              style={{
                background: isActive ? "#2563eb" : "transparent",
                color: isActive ? "#fff" : link.danger ? "#d32f2f" : "#222",
                fontWeight: isActive ? "bold" : "normal",
                borderRadius: 0,
                transition: "background 0.2s, color 0.2s",
                cursor: "pointer",
              }}
            >
              <i className={`${link.icon} me-2`} style={{ fontSize: 20, color: isActive ? "#fff" : link.danger ? "#d32f2f" : "#222" }}></i>
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SellerSidebar;