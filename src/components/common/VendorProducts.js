import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import './liquidGlass.css';

function VendorProducts() {
  const { vendorId } = useParams();
  const [products, setProducts] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch vendor info
    fetch(`http://127.0.0.1:8000/api/vendor/${vendorId}/`)
      .then(res => res.json())
      .then(data => setVendor(data));
    // Fetch products by vendor
    fetch(`http://127.0.0.1:8000/api/products/?vendor=${vendorId}`)
      .then(res => res.json())
      .then(data => {
        // Fix: map each product to the expected SingleProduct shape
        const mapped = (data.data || data.results || []).map(item => ({
          id: item.id,
          name: item.title,
          price: item.price || 0,
          logo: item.product_images && item.product_images.length > 0
            ? item.product_images[0].image
            : "",
          category: item.category?.title || "",
          category_id: item.category?.id || null,
          vendor: item.vendor?.id || null,
          detail: item.detail || "",
          sells: item.sells,
          listing_time: item.listing_time,
        }));
        setProducts(mapped);
        setLoading(false);
      });
  }, [vendorId]);

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="glass-card mb-4 px-4 py-4 animate__animated animate__fadeInDown d-flex align-items-center justify-content-between">
        <div>
          <h1 className="mb-0 fw-bold text-gradient">
            <i className="fa-solid fa-store me-2"></i>
            {vendor ? (vendor.user?.first_name || vendor.user?.username || "Vendor") : "Vendor"}'s Products
          </h1>
          <div className="text-muted small">
            {vendor && vendor.user?.email}
          </div>
        </div>
        <Link to="/sellers" className="btn btn-glass btn-outline-primary btn-sm rounded-pill">
          <i className="fa-solid fa-arrow-left me-1"></i> Back to Sellers
        </Link>
      </div>
      {loading ? (
        <div className="text-center py-5">Loading products...</div>
      ) : (
        <div className="row g-4">
          {products.length === 0 && (
            <div className="text-center text-muted py-5">No products found for this vendor.</div>
          )}
          {products.map(prod => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
              <SingleProduct product={prod} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorProducts;
