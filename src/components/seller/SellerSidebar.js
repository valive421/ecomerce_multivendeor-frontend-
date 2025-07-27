import React from "react";
import { useLocation, Link } from "react-router-dom";

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
    <div
      className="col-12 col-md-3 mb-4 mb-md-0"
      style={{
        minHeight: "100vh",
        position: "sticky",
        top: 0,
        paddingBottom: "2rem",
        background: "#f8fafc",
        zIndex: 2
      }}
    >
      <div
        className="card shadow-sm border-0 h-100"
        style={{
          borderRadius: "2rem",
          overflow: "hidden",
          minWidth: 0,
          background: "#fff",
          height: "100%",
        }}
      >
        <ul className="list-group list-group-flush" style={{ borderRadius: "2rem", overflow: "hidden" }}>
          {navLinks.map((link, idx) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <li
                key={link.to}
                className={`list-group-item d-flex align-items-center px-4 py-3 border-0 ${isActive ? "active" : ""} ${link.danger ? "bg-light" : ""}`}
                style={{
                  background: isActive ? "#2563eb" : "transparent",
                  color: isActive ? "#fff" : link.danger ? "#d32f2f" : "#222",
                  fontWeight: isActive ? "bold" : "normal",
                  borderLeft: "none",
                  borderRight: "none",
                  borderTop: idx === 0 ? "none" : undefined,
                  borderBottom: idx === navLinks.length - 1 ? "none" : undefined,
                  borderRadius: 0,
                  transition: "background 0.2s, color 0.2s",
                  cursor: "pointer",
                }}
              >
                <i className={`${link.icon} me-3`} style={{ minWidth: 22, fontSize: 20, color: isActive ? "#fff" : link.danger ? "#d32f2f" : "#222" }}></i>
                <Link
                  to={link.to}
                  className={`flex-grow-1 text-decoration-none ${isActive ? "text-white" : link.danger ? "text-danger" : "text-dark"}`}
                  style={{
                    fontWeight: "inherit",
                    fontSize: "1.08rem",
                    color: isActive ? "#fff" : link.danger ? "#d32f2f" : "#222",
                    background: "transparent",
                  }}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SellerSidebar;