import React, { useState } from "react";
import { Link } from "react-router-dom";

import SellerSidebar from "./SellerSidebar";

function SellerCustomers() {
  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", email: "john@gmail.com", mobile: "1234567890" },
    { id: 2, name: "Alex Doe", email: "john@gmail.com", mobile: "1234567890" }
  ]);

  const handleRemove = (id) => {
    setCustomers(customers.filter(c => c.id !== id));
  };

  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        <div className="col-md-9">
          <h2 className="mb-4">Customers</h2>
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th style={{ width: 220 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, idx) => (
                <tr key={c.id}>
                  <td>{idx + 1}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>
                    <span style={{ color: "#d32f2f", fontWeight: 600 }}>{c.mobile}</span>
                  </td>
                  <td>
                    <Link
                      to={`/seller/customers/${c.id}/orders`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      Orders
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemove(c.id)}
                    >
                      Remove from List
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SellerCustomers;
