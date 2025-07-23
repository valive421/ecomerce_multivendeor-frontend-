import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import { Link } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (newPassword === confirmPassword && newPassword.length > 0) {
      setSuccess(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
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
        <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
          <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
            <h2 className="mb-4 text-center"><i className="fa fa-key me-2"></i>Change Password</h2>
            {success && <div className="alert alert-success">Password changed successfully!</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Old Password</label>
                <input type="password" className="form-control" value={oldPassword} onChange={e => setOldPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary w-100">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
