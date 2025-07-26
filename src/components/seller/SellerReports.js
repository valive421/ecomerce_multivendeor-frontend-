import React from "react";
import { Link } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";

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
