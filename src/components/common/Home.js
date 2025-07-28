import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg";
import SingleProduct from "./SingleProduct";
import { useEffect, useState } from "react";
import './liquidGlass.css';

function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [popularProducts, setPopularProducts] = useState([]);
  const [popularSellers, setPopularSellers] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products/?page=1&page_size=20")
      .then(res => res.json())
      .then(data => {
        const mapped = (data.data || []).map(item => ({
          id: item.id,
          name: item.title,
          price: item.price || 0,
          logo: item.product_images && item.product_images.length > 0
            ? item.product_images[0].image
            : logo,
          category: item.category?.title || "",
          category_id: item.category?.id || null,
          vendor: item.vendor?.id || null,
          detail: item.detail || "",
          sells: item.sells,
          listing_time: item.listing_time,
        }));
        setLatestProducts(mapped);
        // Sort by sells descending and take top 4 for popular products
        setPopularProducts(
          [...mapped]
            .sort((a, b) => (b.sells || 0) - (a.sells || 0))
            .slice(0, 4)
        );
      });
  }, []);

  useEffect(() => {
    // Fetch popular sellers
    fetch("http://127.0.0.1:8000/api/vendors/?ordering=-id")
      .then(res => res.json())
      .then(async data => {
        // For each seller, fetch their total sales (order count) using the vendor orderitems endpoint
        const sellersRaw = (data.results || data.data || []);
        const sellers = await Promise.all(
          sellersRaw.map(async vendor => {
            // Fetch all orderitems for this vendor to count total sales
            let totalSales = 0;
            try {
              const res = await fetch(`http://127.0.0.1:8000/api/vendor/${vendor.id}/orderitems`);
              const orderData = await res.json();
              // If paginated, use count; else fallback to results/data length
              if (typeof orderData.count === "number") {
                totalSales = orderData.count;
              } else if (Array.isArray(orderData.results)) {
                totalSales = orderData.results.length;
              } else if (Array.isArray(orderData.data)) {
                totalSales = orderData.data.length;
              }
            } catch (e) {
              totalSales = 0;
            }
            return {
              id: vendor.id,
              name: vendor.user?.first_name || vendor.user?.username || "Seller",
              email: vendor.user?.email || "",
              totalSales,
            };
          })
        );
        // Sort by totalSales descending and take top 4
        sellers.sort((a, b) => b.totalSales - a.totalSales);
        setPopularSellers(sellers.slice(0, 4));
      });
  }, []);

  useEffect(() => {
    // Fetch categories sorted by popularity (e.g., by number of products or sales)
    fetch("http://127.0.0.1:8000/api/categories/")
      .then(res => res.json())
      .then(data => {
        // If backend provides popularity, sort by it; else just show all
        let cats = Array.isArray(data.data) ? data.data : (Array.isArray(data.results) ? data.results : []);
        // If you have a popularity field, sort by it descending
        if (cats.length && cats[0].popularity !== undefined) {
          cats = cats.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        }
        // Map to expected shape for rendering
        setPopularCategories(
          cats.slice(0, 4).map(cat => ({
            name: cat.title || cat.name,
            img: cat.image || logo,
            id: cat.id,
            detail: cat.detail || "",
          }))
        );
      });
  }, []);

  // Only show 4 at a time, but allow sliding through all latest products
  const visibleProducts = latestProducts.slice(sliderIndex, sliderIndex + 4);

  const handlePrev = () => {
    setSliderIndex(i => Math.max(i - 1, 0));
  };
  const handleNext = () => {
    setSliderIndex(i => Math.min(i + 1, Math.max(0, latestProducts.length - 4)));
  };

  const popularCategoriesDummy = [
    { name: "Electronics", img: logo },
    { name: "Fashion", img: logo },
    { name: "Sports", img: logo },
    { name: "Home", img: logo },
  ];

  return (
    <main className="py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="container">
        {/* Latest Products with slider */}
        <div className="glass-card mb-4 px-4 py-4 animate__animated animate__fadeInDown d-flex align-items-center justify-content-between">
          <h3 className="fw-bold text-gradient mb-0">
            <i className="fa-solid fa-bolt me-2"></i> Latest Products
          </h3>
          <Link to="/products" className="btn btn-glass btn-outline-primary btn-sm rounded-pill">
            View All <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </Link>
        </div>
        <div className="position-relative">
          <div className="row g-4">
            {visibleProducts.map((prod) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
                <SingleProduct product={prod} />
              </div>
            ))}
          </div>
          {latestProducts.length > 4 && (
            <div className="d-flex justify-content-center align-items-center mt-3">
              <button
                className="btn btn-glass btn-outline-primary btn-sm me-2"
                onClick={handlePrev}
                disabled={sliderIndex === 0}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <button
                className="btn btn-glass btn-outline-primary btn-sm"
                onClick={handleNext}
                disabled={sliderIndex >= latestProducts.length - 4}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
        {/* Popular Products (by sells) */}
        <div className="glass-card d-flex justify-content-between align-items-center mt-5 mb-4 px-4 py-4 animate__animated animate__fadeInDown">
          <h3 className="fw-bold text-gradient mb-0">
            <i className="fa-solid fa-fire me-2"></i> Popular Products
          </h3>
          <Link to="/products" className="btn btn-glass btn-outline-primary btn-sm rounded-pill">
            View All <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </Link>
        </div>
        <div className="row g-4">
          {popularProducts.map((prod) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
              <SingleProduct product={prod} />
            </div>
          ))}
        </div>
        {/* Popular Sellers */}
        <div className="glass-card d-flex justify-content-between align-items-center mt-5 mb-4 px-4 py-4 animate__animated animate__fadeInDown">
          <h3 className="fw-bold text-gradient mb-0">
            <i className="fa-solid fa-user-tie me-2"></i> Popular Sellers
          </h3>
          <Link to="/sellers" className="btn btn-glass btn-outline-primary btn-sm rounded-pill">
            View All <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </Link>
        </div>
        <div className="row g-4">
          {popularSellers.map((seller, i) => (
            <div className="col-12 col-sm-6 col-md-3" key={seller.id || i}>
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
        {/* Popular Categories */}
        <div className="glass-card d-flex justify-content-between align-items-center mt-5 mb-4 px-4 py-4 animate__animated animate__fadeInDown">
          <h3 className="fw-bold text-gradient mb-0">
            <i className="fa-solid fa-layer-group me-2"></i> Popular Categories
          </h3>
          <Link to="/categories" className="btn btn-glass btn-outline-primary btn-sm rounded-pill">
            View All <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </Link>
        </div>
        <div className="row g-4">
          {popularCategories.map((cat, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={cat.id || i}>
              <div className="glass-card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light animate__animated animate__fadeInUp">
                <img src={cat.img} className="card-img-top p-3 rounded-4" alt="Category" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{cat.name}</h5>
                  <Link
                    to={`/category/${cat.name.toLowerCase()}/${cat.id || i + 1}`}
                    className="btn btn-glass btn-light w-100 rounded-pill"
                  >
                    View Category
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;

