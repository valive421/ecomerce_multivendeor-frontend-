// filepath: c:\Users\Lenovo\store\frontend\src\components\common\Sellers.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './liquidGlass.css';

function Sellers() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/vendors/")
      .then(res => res.json())
      .then(data => {
        const sellers = (data.results || data.data || []).map(vendor => ({
          id: vendor.id,
          name: vendor.user?.first_name || vendor.user?.username || "Seller",
          email: vendor.user?.email || "",
          rating: vendor.rating || 4.5,
          totalSales: vendor.total_sales || vendor.sells || 0,
        }));
        setSellers(sellers);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="glass-card mb-4 px-4 py-4 animate__animated animate__fadeInDown d-flex align-items-center justify-content-between">
        <h1 className="mb-0 fw-bold text-gradient">
          <i className="fa-solid fa-user-tie me-2"></i> All Sellers
        </h1>
      </div>
      {loading ? (
        <div className="text-center py-5">Loading sellers...</div>
      ) : (
        <div className="row g-4">
          {sellers.map((seller, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={seller.id || i}>
              <div className="glass-card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light text-center py-3 animate__animated animate__fadeInUp">
                <h5 className="card-title fw-bold">{seller.name}</h5>
                <p className="card-text fs-5 fw-bold">
                  <i className="fa-solid fa-bag-shopping me-1"></i>
                  Total Sales: {seller.totalSales}
                </p>
                <p className="card-text text-light small">{seller.email}</p>
                <Link
                  to={`/vendor/${seller.id}/products`}
                  className="btn btn-glass btn-light w-100 rounded-pill mt-2"
                >
                  View Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sellers;
