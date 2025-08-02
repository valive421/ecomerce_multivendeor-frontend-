import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SingleProduct from "../common/SingleProduct";
import './liquidGlass.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchProducts() {
  const query = useQuery();
  const searchTerm = query.get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim()) {
      setLoading(true);
      fetch(`http://127.0.0.1:8000/api/search/?q=${encodeURIComponent(searchTerm)}`)
        .then(res => res.json())
        .then(data => {
          const mapped = (data.results || []).map(item => ({
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
        })
        .finally(() => setLoading(false));
    } else {
      setProducts([]);
    }
  }, [searchTerm]);

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="glass-card mb-4 px-4 py-4 animate__animated animate__fadeInDown d-flex align-items-center justify-content-between">
        <h1 className="mb-0 fw-bold text-gradient">
          <i className="fa fa-search me-2"></i> Search Results
        </h1>
        <span className="text-muted">for "{searchTerm}"</span>
      </div>
      {loading ? (
        <div className="text-center py-5">Loading...</div>
      ) : (
        <div className="row g-4">
          {products.length === 0 ? (
            <div className="text-center text-muted py-5">No products found.</div>
          ) : (
            products.map(prod => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
                <SingleProduct product={prod} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchProducts;
