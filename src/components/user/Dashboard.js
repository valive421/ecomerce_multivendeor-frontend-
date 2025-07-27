import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import './liquidGlass.css';

function Dashboard() {
  const customerId = localStorage.getItem("customer_id");
  const [dashboard, setDashboard] = useState({
    total_orders: 0,
    total_addresses: 0,
    total_wishlist: 0,
  });

  useEffect(() => {
    if (customerId) {
      fetch(`http://127.0.0.1:8000/api/customer-dashboard/${customerId}/`)
        .then(res => res.json())
        .then(data => {
          setDashboard(d => ({
            ...d,
            total_orders: data.total_orders || 0,
            total_addresses: data.total_address || 0, // <-- match backend key
          }));
        });
    }
    // Wishlist count from localStorage
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist"));
      setDashboard(d => ({
        ...d,
        total_wishlist: Array.isArray(wishlist) ? wishlist.length : 0,
      }));
    } catch {
      setDashboard(d => ({ ...d, total_wishlist: 0 }));
    }
  }, [customerId]);

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="row">
        <Sidebar />
        <div className="col-md-9">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="glass-card shadow-sm border-0 text-center animate__animated animate__fadeInDown">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-gradient">
                    <i className="fa-solid fa-bag-shopping me-2"></i> Total Orders
                  </h5>
                  <Link to="/orders" className="fs-4 fw-bold text-primary text-decoration-none">
                    {dashboard.total_orders}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="glass-card shadow-sm border-0 text-center animate__animated animate__fadeInDown">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-gradient">
                    <i className="fa-solid fa-heart me-2"></i> Total Wishlist
                  </h5>
                  <Link to="/wishlist" className="fs-4 fw-bold text-primary text-decoration-none">
                    {dashboard.total_wishlist}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="glass-card shadow-sm border-0 text-center animate__animated animate__fadeInDown">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-gradient">
                    <i className="fa-solid fa-location-dot me-2"></i> Total Addresses
                  </h5>
                  <Link to="/addresses" className="fs-4 fw-bold text-primary text-decoration-none">
                    {dashboard.total_addresses}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Dashboard;
