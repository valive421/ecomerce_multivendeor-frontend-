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
        <li className="list-group-item active">Reports</li>
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

function SellerReports() {
  // Demo report data
  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        <div className="col-md-9">
          <h2 className="mb-4">Reports</h2>
          <div className="card p-4">
            <h5>Total Sales: $1000</h5>
            <h5>Total Orders: 10</h5>
            <h5>Total Customers: 5</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerReports;
