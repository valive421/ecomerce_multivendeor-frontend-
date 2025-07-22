import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center"><i className="fa fa-user-plus me-2"></i>Register</h2>
        <form>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" className="form-control" placeholder="Enter username" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-2">Register</button>
        </form>
        <div className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
