import React from "react";
import { Link } from "react-router-dom";
import logo from "../../logo.svg"; // fixed path
import SingleProduct from "./SingleProduct";
import { useEffect, useState } from "react";

function Home() {

  const [latestProducts, setProducts] = useState([]);
useEffect(() => {
  fetch("http://127.0.0.1:8000/api/products/")
    .then(res => res.json())
    .then(data => {
      // Map API data to expected format for SingleProduct
      const mapped = data.data.map(item => ({
        id: item.id,
        name: item.title, // or item.name if available
        price: item.price || 0, // default if missing
        logo: logo, // or item.image if available
        category: item.category?.title || "",
        category_id: item.category?.id || null,
        vendor: item.vendor?.id || null,
        detail: item.detail || "",
        sells: item.sells, // <-- add sells
      }));
      setProducts(mapped);
    });
}, []);
  console.log(latestProducts);
  const popularProducts = [
    { id: 5, slug: "popular-product-1", name: "Popular Product 1", category: "Electronics", category_slug: "electronics", category_id: 1, rating: 4.9, bought: 200, price: 149.99, logo },
    { id: 6, slug: "popular-product-2", name: "Popular Product 2", category: "Fashion", category_slug: "fashion", category_id: 2, rating: 4.8, bought: 180, price: 89.99, logo },
    { id: 7, slug: "popular-product-3", name: "Popular Product 3", category: "Sports", category_slug: "sports", category_id: 3, rating: 4.7, bought: 160, price: 129.99, logo },
    { id: 8, slug: "popular-product-4", name: "Popular Product 4", category: "Home", category_slug: "home", category_id: 4, rating: 4.6, bought: 140, price: 59.99, logo },
  ];
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
        {/* Latest Products */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Latest Products</h3>
          <Link to="/products" className="btn btn-outline-light btn-sm rounded-pill">
            View All <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </Link>
        </div>
        <div className="row g-4">
          {latestProducts.map((prod) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
              <SingleProduct product={prod} />
            </div>
          ))}
        </div>
        {/* Popular Products */}
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

