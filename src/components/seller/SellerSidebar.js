import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

export default SellerSidebar;