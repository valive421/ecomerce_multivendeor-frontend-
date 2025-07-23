import React from "react";
import { Link } from "react-router-dom";

function SellerSidebar() {
  return (
    <div className="col-md-3 mb-4 mb-md-0">
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/seller/dashboard" className="text-decoration-none text-dark">Dashboard</Link>
        </li>
        <li className="list-group-item">
          <Link to="/seller/products" className="text-decoration-none text-dark">Products</Link>
        </li>
        <li className="list-group-item">
          <Link to="/seller/orders" className="text-decoration-none text-dark">Orders</Link>
        </li>
        <li className="list-group-item">
          <Link to="/seller/customers" className="text-decoration-none text-dark">Customers</Link>
        </li>
        <li className="list-group-item">
          <Link to="/seller/reports" className="text-decoration-none text-dark">Reports</Link>
        </li>
        <li className="list-group-item active">Logout</li>
      </ul>
    </div>
  );
}

function SellerLogout() {
  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="card shadow p-4 text-center" style={{ maxWidth: 400, width: "100%" }}>
            <h2 className="mb-3 text-success"><i className="fa fa-sign-out-alt me-2"></i>Seller Logged Out</h2>
            <p className="mb-4">You have been logged out as a seller.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerLogout;
