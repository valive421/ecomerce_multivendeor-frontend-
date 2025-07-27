import React from "react";
import { useLocation, Link } from "react-router-dom";
import './liquidGlass.css';

function Sidebar() {
  const location = useLocation();
  const navLinks = [
    { to: "/dashboard", label: "Dashboard", icon: "fa-solid fa-gauge" },
    { to: "/orders", label: "Orders", icon: "fa-solid fa-bag-shopping" },
    { to: "/wishlist", label: "Wishlist", icon: "fa-solid fa-heart" },
    { to: "/profile", label: "Profile", icon: "fa-solid fa-user" },
    { to: "/addresses", label: "Addresses", icon: "fa-solid fa-location-dot" },
    { to: "/changepassword", label: "Change Password", icon: "fa-solid fa-key" }
  ];

  return (
    <div
      className="col-12 col-md-3 mb-4 mb-md-0"
      style={{
        minHeight: "100vh",
        position: "sticky",
        top: 0,
        paddingBottom: "2rem",
        background: "transparent",
        zIndex: 2
      }}
    >
      <div
        className="glass-card shadow-sm border-0 h-100 animate__animated animate__fadeInLeft"
        style={{
          borderRadius: "2rem",
          overflow: "hidden",
          minWidth: 0,
          background: "rgba(255,255,255,0.25)",
          height: "100%",
        }}
      >
        <ul className="list-group list-group-flush" style={{ borderRadius: "2rem", overflow: "hidden" }}>
          {navLinks.map((link, idx) => {
            const isActive = location.pathname.startsWith(link.to);
            return (
              <li
                key={link.to}
                className={`list-group-item d-flex align-items-center px-4 py-3 border-0 ${isActive ? "active" : ""}`}
                style={{
                  background: isActive ? "linear-gradient(90deg,#2563eb 0%,#06b6d4 100%)" : "transparent",
                  color: isActive ? "#fff" : "#222",
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
                <i className={`${link.icon} me-3`} style={{ minWidth: 22, fontSize: 20, color: isActive ? "#fff" : "#2563eb" }}></i>
                <Link
                  to={link.to}
                  className={`flex-grow-1 text-decoration-none ${isActive ? "text-white" : "text-dark"}`}
                  style={{
                    fontWeight: "inherit",
                    fontSize: "1.08rem",
                    color: isActive ? "#fff" : "#222",
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

export default Sidebar;