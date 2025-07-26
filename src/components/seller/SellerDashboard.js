import React from "react";
import { Link } from "react-router-dom";

import SellerSidebar from "./SellerSidebar";

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
