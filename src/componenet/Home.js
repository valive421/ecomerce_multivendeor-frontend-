import React from "react";
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';

const categoryNames = ['Electronics', 'Fashion', 'Home & Living', 'Sports'];

const productDetails = [
  { name: 'Wireless Headphones', category: 'Electronics', rating: 4.7, bought: 1200, price: 49.99, logo },
  { name: 'Smart Watch', category: 'Electronics', rating: 4.5, bought: 950, price: 59.99, logo },
  { name: 'Bluetooth Speaker', category: 'Electronics', rating: 4.6, bought: 800, price: 69.99, logo },
  { name: 'Fitness Tracker', category: 'Sports', rating: 4.4, bought: 700, price: 79.99, logo },
  { name: 'VR Headset', category: 'Electronics', rating: 4.8, bought: 500, price: 89.99, logo },
  { name: 'Portable SSD', category: 'Electronics', rating: 4.7, bought: 650, price: 99.99, logo },
  { name: 'Gaming Mouse', category: 'Electronics', rating: 4.5, bought: 900, price: 109.99, logo },
  { name: 'Action Camera', category: 'Sports', rating: 4.6, bought: 400, price: 119.99, logo },
];

const sellers = [
  { name: 'TechGuru', rating: 4.9, totalSales: 3200 },
  { name: 'GadgetWorld', rating: 4.8, totalSales: 2800 },
  { name: 'FashionFiesta', rating: 4.7, totalSales: 2100 },
  { name: 'HomeEssence', rating: 4.6, totalSales: 1800 },
];

function Home() {
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
          {productDetails.map((prod, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <SingleProduct product={prod} />
            </div>
          ))}
        </div>
        {/* Popular Categories */}
        <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
          <h3 className="fw-bold">Popular Categories</h3>
          <Link to="/categories" className="btn btn-outline-light btn-sm rounded-pill">
            All Categories <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </Link>
        </div>
        <div className="row g-4">
          {categoryNames.map((name, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <div className="card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light">
                <img src={logo} className="card-img-top p-3 rounded-4" alt="Category" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{name}</h5>
                  <Link to={`/categories/${name}/${2}`} className="btn btn-light w-100 rounded-pill">View Category</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Popular Sellers */}
        <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
          <h3 className="fw-bold">Popular Sellers</h3>
        </div>
        <div className="row g-4">
          {sellers.map((seller, i) => (
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
        {/* Popular Products */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold">Popular Products</h3>
          <a href="#" className="btn btn-outline-light btn-sm rounded-pill">
            All Products <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </a>
        </div>
        <div className="row g-4">
          {productDetails.slice(0, 4).map((prod, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <SingleProduct product={prod} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Home;
