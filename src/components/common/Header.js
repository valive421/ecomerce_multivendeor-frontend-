import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sellerDropdownOpen, setSellerDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const sellerDropdownRef = useRef();

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (sellerDropdownRef.current && !sellerDropdownRef.current.contains(event.target)) {
        setSellerDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-light" to="/">
          <i className="fa-solid fa-store me-2"></i>bit Bazzar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => {
            const nav = document.getElementById("navbarNav");
            if (nav) nav.classList.toggle("show");
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/categories">Category</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/checkout">My cart</Link>
            </li>
            {/* Customer My Account Dropdown */}
            <li className="nav-item" ref={dropdownRef} style={{ position: "relative" }}>
              <button
                className="nav-link text-light btn btn-link border-0"
                style={{ textDecoration: "none" }}
                type="button"
                onClick={() => setDropdownOpen((open) => !open)}
              >
                My Account <span style={{ fontSize: "0.8em" }}>▼</span>
              </button>
              {dropdownOpen && (
                <ul
                  className="dropdown-menu show"
                  style={{
                    display: "block",
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    minWidth: 160,
                    background: "#fff",
                    color: "#222",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <li>
                    <Link className="dropdown-item" to="/login" onClick={() => setDropdownOpen(false)}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/register" onClick={() => setDropdownOpen(false)}>
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/dashboard" onClick={() => setDropdownOpen(false)}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logout" onClick={() => setDropdownOpen(false)}>
                      Logout
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            {/* Seller Panel Dropdown */}
            <li className="nav-item" ref={sellerDropdownRef} style={{ position: "relative" }}>
              <button
                className="nav-link text-light btn btn-link border-0"
                style={{ textDecoration: "none" }}
                type="button"
                onClick={() => setSellerDropdownOpen((open) => !open)}
              >
                Seller Panel <span style={{ fontSize: "0.8em" }}>▼</span>
              </button>
              {sellerDropdownOpen && (
                <ul
                  className="dropdown-menu show"
                  style={{
                    display: "block",
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    minWidth: 180,
                    background: "#fff",
                    color: "#222",
                    borderRadius: 8,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <li>
                    <Link className="dropdown-item" to="/seller/login" onClick={() => setSellerDropdownOpen(false)}>
                      Seller Login
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/seller/register" onClick={() => setSellerDropdownOpen(false)}>
                      Seller Register
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/seller/dashboard" onClick={() => setSellerDropdownOpen(false)}>
                      Seller Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/seller/logout" onClick={() => setSellerDropdownOpen(false)}>
                      Seller Logout
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;