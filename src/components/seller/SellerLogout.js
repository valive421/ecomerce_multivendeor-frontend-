import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";

function SellerLogout() {
  const navigate = useNavigate();
  useEffect(() => {
    // Clear seller session/localStorage on logout
    localStorage.removeItem('seller_id');
    localStorage.removeItem('seller_login');
    localStorage.removeItem('seller_username');
    // Optionally clear userContext if it was set for seller
    let userContext = localStorage.getItem('userContext');
    if (userContext) {
      try {
        const ctx = JSON.parse(userContext);
        if (ctx && ctx.seller_id) {
          localStorage.removeItem('userContext');
        }
      } catch {}
    }
    // Redirect to seller login after logout
    navigate('/seller/login', { replace: true });
  }, [navigate]);

  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="card shadow p-4 text-center" style={{ maxWidth: 400, width: "100%" }}>
            <h2 className="mb-3 text-success"><i className="fa fa-sign-out-alt me-2"></i>Seller Logged Out</h2>
            <p className="mb-4">You have been logged out as a seller.</p>
            <Link to="/seller/login" className="btn btn-primary">Login Again</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerLogout;
