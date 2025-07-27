import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import './liquidGlass.css';

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
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="row">
        <Sidebar />
        <div className="col-md-9 d-flex flex-column align-items-center">
          <div className="glass-card shadow p-4 animate__animated animate__fadeInDown" style={{ maxWidth: 500, width: "100%" }}>
            <h2 className="mb-4 text-center text-gradient"><i className="fa fa-key me-2"></i>Change Password</h2>
            {success && <div className="alert alert-success glass-card">Password changed successfully!</div>}
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
