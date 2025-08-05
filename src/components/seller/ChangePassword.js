import React, { useState } from "react";
import { Link } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import { BASE_URL } from "../context";

function SellerChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);
    setErrorMsg("");
    if (newPassword !== confirmPassword || newPassword.length === 0) {
      setErrorMsg("Passwords do not match or are empty.");
      return;
    }
    const vendorId = localStorage.getItem("seller_id");
    if (!vendorId) {
      setErrorMsg("No vendor id found. Please login again.");
      return;
    }
    try {
      const res = await fetch(`${BASE_URL}/vendor/change-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendor_id: vendorId,
          old_password: oldPassword,
          new_password: newPassword,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setErrorMsg("");
      } else {
        setErrorMsg(data.error || "Password change failed.");
      }
    } catch {
      setErrorMsg("Password change failed.");
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
          <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
            <h2 className="mb-4 text-center"><i className="fa fa-key me-2"></i>Change Password</h2>
            {success && <div className="alert alert-success">Password changed successfully!</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Old Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={oldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerChangePassword;
