import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";

function Home() {
  const latestProducts = [
    { id: 1, slug: "latest-product-1", name: "Latest Product 1", category: "Electronics", category_slug: "electronics", category_id: 1, rating: 4.7, bought: 120, price: 99.99, logo },
    { id: 2, slug: "latest-product-2", name: "Latest Product 2", category: "Fashion", category_slug: "fashion", category_id: 2, rating: 4.5, bought: 80, price: 59.99, logo },
    { id: 3, slug: "latest-product-3", name: "Latest Product 3", category: "Sports", category_slug: "sports", category_id: 3, rating: 4.8, bought: 60, price: 79.99, logo },
    { id: 4, slug: "latest-product-4", name: "Latest Product 4", category: "Home", category_slug: "home", category_id: 4, rating: 4.2, bought: 40, price: 39.99, logo },
  ];
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
              <div className="card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light">
                <img src={prod.logo} className="card-img-top p-3 rounded-4" alt="Product" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{prod.name}</h5>
                  <span className="card-link d-block mb-1 text-decoration-underline text-light small">{prod.category}</span>
                  <div className="mb-2">
                    {[...Array(5)].map((_, star) => (
                      <i
                        key={star}
                        className={
                          star < Math.round(prod.rating)
                            ? "fa-solid fa-star text-warning"
                            : "fa-regular fa-star text-warning"
                        }
                      ></i>
                    ))}
                    <span className="ms-1 text-light small">{prod.rating}</span>
                  </div>
                  <p className="card-text">Price: ${prod.price}</p>
                  <p className="card-text"><i className="fa-solid fa-user-check me-1"></i>Bought: {prod.bought}</p>
                  <Link to={`/product/${prod.slug}/${prod.id}`} className="btn btn-light w-100">Shop Now</Link>
                </div>
              </div>
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
              <div className="card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light">
                <img src={prod.logo} className="card-img-top p-3 rounded-4" alt="Product" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{prod.name}</h5>
                  <span className="card-link d-block mb-1 text-decoration-underline text-light small">{prod.category}</span>
                  <div className="mb-2">
                    {[...Array(5)].map((_, star) => (
                      <i
                        key={star}
                        className={
                          star < Math.round(prod.rating)
                            ? "fa-solid fa-star text-warning"
                            : "fa-regular fa-star text-warning"
                        }
                      ></i>
                    ))}
                    <span className="ms-1 text-light small">{prod.rating}</span>
                  </div>
                  <p className="card-text">Price: ${prod.price}</p>
                  <p className="card-text"><i className="fa-solid fa-user-check me-1"></i>Bought: {prod.bought}</p>
                  <Link to={`/product/${prod.slug}/${prod.id}`} className="btn btn-light w-100">Shop Now</Link>
                </div>
              </div>
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
                  <Link to={`/category/${cat.name.toLowerCase()}/${i + 1}`} className="btn btn-light w-100 rounded-pill">
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
