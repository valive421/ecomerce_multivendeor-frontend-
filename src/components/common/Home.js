import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg"; // fixed path
import SingleProduct from "./SingleProduct";
import { useEffect, useState } from "react";

function Home() {
  const [latestProducts, setLatestProducts] = useState([]);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [popularProducts, setPopularProducts] = useState([]);

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

  // Only show 4 at a time, but allow sliding through all latest products
  const visibleProducts = latestProducts.slice(sliderIndex, sliderIndex + 4);

  const handlePrev = () => {
    setSliderIndex(i => Math.max(i - 1, 0));
  };
  const handleNext = () => {
    setSliderIndex(i => Math.min(i + 1, Math.max(0, latestProducts.length - 4)));
  };

  const popularSellers = [
    { name: "Seller One", rating: 4.9, totalSales: 1000 },
    { name: "Seller Two", rating: 4.8, totalSales: 900 },
    { name: "Seller Three", rating: 4.7, totalSales: 800 },
    { name: "Seller Four", rating: 4.6, totalSales: 700 },
  ];
  const popularCategories = [
    { name: "Electronics", img: logo },
    { name: "Fashion", img: logo },
    { name: "Sports", img: logo },
    { name: "Home", img: logo },
  ];

  return (
    <main className="py-5 bg-dark text-light">
      <div className="container">
        {/* Latest Products with slider */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Latest Products</h3>
          <Link to="/products" className="btn btn-outline-light btn-sm rounded-pill">
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
                className="btn btn-outline-light btn-sm me-2"
                onClick={handlePrev}
                disabled={sliderIndex === 0}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleNext}
                disabled={sliderIndex >= latestProducts.length - 4}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          )}
        </div>
        {/* Popular Products (by sells) */}
        <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
          <h3 className="fw-bold">Popular Products</h3>
          <Link to="/products" className="btn btn-outline-light btn-sm rounded-pill">
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
        <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
          <h3 className="fw-bold">Popular Sellers</h3>
          <Link to="/sellers" className="btn btn-outline-light btn-sm rounded-pill">
            View All <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </Link>
        </div>
        <div className="row g-4">
          {popularSellers.map((seller, i) => (
            <div className="col-12 col-sm-6 col-md-3" key={i}>
              <div className="card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light text-center py-3">
                <h5 className="card-title fw-bold">{seller.name}</h5>
                <div className="mb-2">
                  {[...Array(5)].map((_, star) => (
                    <i key={star} className={star < Math.round(seller.rating) ? "fa-solid fa-star text-warning" : "fa-regular fa-star text-warning"}></i>
                  ))}
                  <span className="ms-1 text-light small">{seller.rating}</span>
                </div>
                <p className="card-text">Total Sales: {seller.totalSales}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Popular Categories */}
        <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
          <h3 className="fw-bold">Popular Categories</h3>
          <Link to="/categories" className="btn btn-outline-light btn-sm rounded-pill">
            View All <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </Link>
        </div>
        <div className="row g-4">
          {popularCategories.map((cat, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <div className="card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light">
                <img src={cat.img} className="card-img-top p-3 rounded-4" alt="Category" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{cat.name}</h5>
                  <Link
                    to={`/category/${cat.name.toLowerCase()}/${i + 1}`}
                    className="btn btn-light w-100 rounded-pill"
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

