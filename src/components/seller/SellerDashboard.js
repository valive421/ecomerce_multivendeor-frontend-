// This component displays the seller's dashboard, showing total products, orders, and customers for the logged-in seller.

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SellerSidebar from "./SellerSidebar";
import './liquidGlass.css';

function SellerDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    const vendorId = localStorage.getItem("seller_id");
    if (!vendorId) return;

    // Fetch total products
    fetch(`http://127.0.0.1:8000/api/products/?vendor=${vendorId}`)
      .then(res => res.json())
      .then(data => setStats(s => ({ ...s, totalProducts: data.count || (data.data ? data.data.length : 0) })));

    // Fetch total orders
    fetch(`http://127.0.0.1:8000/api/vendor/${vendorId}/orderitems`)
      .then(res => res.json())
      .then(data => setStats(s => ({ ...s, totalOrders: data.count || (data.results ? data.results.length : 0) })));

    // Fetch total customers
    fetch(`http://127.0.0.1:8000/api/vendor/${vendorId}/customers/`)
      .then(res => res.json())
      .then(data => setStats(s => ({ ...s, totalCustomers: data.results ? data.results.length : 0 })));
  }, []);

  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        {/* Main Content */}
        <div className="col-md-9">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="glass-card shadow-sm border-0 text-center animate__animated animate__fadeInDown">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-gradient">
                    <i className="fa-solid fa-boxes-stacked me-2"></i> Total Products
                  </h5>
                  <Link to="/seller/products" className="fs-4 fw-bold text-primary text-decoration-none">
                    {stats.totalProducts}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="glass-card shadow-sm border-0 text-center animate__animated animate__fadeInDown">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-gradient">
                    <i className="fa-solid fa-clipboard-list me-2"></i> Total Orders
                  </h5>
                  <Link to="/seller/orders" className="fs-4 fw-bold text-primary text-decoration-none">
                    {stats.totalOrders}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="glass-card shadow-sm border-0 text-center animate__animated animate__fadeInDown">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-gradient">
                    <i className="fa-solid fa-users me-2"></i> Total Customers
                  </h5>
                  <Link to="/seller/customers" className="fs-4 fw-bold text-primary text-decoration-none">
                    {stats.totalCustomers}
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

export default SellerDashboard;
