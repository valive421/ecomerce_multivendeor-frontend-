import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="container py-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4 mb-md-0">
          <ul className="list-group">
            <li className="list-group-item active">
              Dashboard
            </li>
            <li className="list-group-item">
              <Link to="/orders" className="text-decoration-none text-dark">Orders</Link>
            </li>
            <li className="list-group-item">
              <Link to="/wishlist" className="text-decoration-none text-dark">Wishlist</Link>
            </li>
            <li className="list-group-item">
              <Link to="/profile" className="text-decoration-none text-dark">Profile</Link>
            </li>
            <li className="list-group-item">
              <Link to="/addresses" className="text-decoration-none text-dark">Addresses</Link>
            </li>
          </ul>
        </div>
        {/* Main Content */}
        <div className="col-md-9">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card shadow-sm border-0 text-center">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Total Orders</h5>
                  <Link to="/orders" className="fs-4 fw-bold text-primary text-decoration-none">123</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card shadow-sm border-0 text-center">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Total Wishlist</h5>
                  <Link to="/wishlist" className="fs-4 fw-bold text-primary text-decoration-none">123</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card shadow-sm border-0 text-center">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Total Addresses</h5>
                  <Link to="/addresses" className="fs-4 fw-bold text-primary text-decoration-none">5</Link>
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
