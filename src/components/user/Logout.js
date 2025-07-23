import React from "react";
import { Link } from "react-router-dom";

function Logout() {
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div className="card shadow p-4 text-center" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-3 text-success"><i className="fa fa-sign-out-alt me-2"></i>Logged Out</h2>
        <p className="mb-4">You have been logged out.</p>
        <Link to="/login" className="btn btn-primary">Login Again</Link>
      </div>
    </div>
  );
}

export default Logout;
