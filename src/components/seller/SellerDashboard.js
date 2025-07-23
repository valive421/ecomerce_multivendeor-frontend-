import React from "react";
import { Link } from "react-router-dom";

function SellerSidebar() {
  return (
    <div className="col-md-3 mb-4 mb-md-0">
      <ul className="list-group">
        <li className="list-group-item active">Dashboard</li>
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
        <li className="list-group-item">
                          <Link to="/seller/changepassword" className="text-decoration-none text-dark">Change Password</Link>
                        </li>
        <li className="list-group-item">
          <Link to="/seller/logout" className="text-decoration-none text-danger">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

function SellerDashboard() {
  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        {/* Main Content */}
        <div className="col-md-9">
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card shadow-sm border-0 text-center">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Total Products</h5>
                  <Link to="/seller/products" className="fs-4 fw-bold text-primary text-decoration-none">20</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card shadow-sm border-0 text-center">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Total Orders</h5>
                  <Link to="/seller/orders" className="fs-4 fw-bold text-primary text-decoration-none">123</Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card shadow-sm border-0 text-center">
                <div className="card-body">
                  <h5 className="card-title fw-bold">Total Customers</h5>
                  <Link to="/seller/customers" className="fs-4 fw-bold text-primary text-decoration-none">123</Link>
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
