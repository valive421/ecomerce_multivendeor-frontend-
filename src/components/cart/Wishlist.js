// This component displays the user's wishlist, allowing them to view, remove, or navigate to products they've wishlisted.

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import { WishlistContext } from "../context";
import './liquidGlass.css';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useContext(WishlistContext);

  const removeFromWishlist = (product_id) => {
    setWishlistItems(wishlistItems.filter(item => item.product_id !== product_id));
  };

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="row">
        <Sidebar />
        <div className="col-12 col-md-9">
          <div className="glass-card mb-4 px-4 py-4 animate__animated animate__fadeInDown d-flex align-items-center justify-content-between">
            <h2 className="mb-0 fw-bold text-gradient">
              <i className="fa-solid fa-heart me-2"></i> My Wishlist
            </h2>
            <i className="fa-solid fa-heart fa-2x text-danger animate__animated animate__pulse animate__infinite"></i>
          </div>
          {wishlistItems.length === 0 ? (
            <div className="alert alert-info glass-card">Your wishlist is empty.</div>
          ) : (
            <div className="row g-4">
              {wishlistItems.map(item => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.product_id}>
                  <div className="glass-card h-100 shadow-sm border-0 rounded-4 text-dark animate__animated animate__fadeInUp">
                    <img src={item.image} className="card-img-top p-3 rounded-4" alt={item.title} style={{ height: 180, objectFit: "cover" }} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold text-gradient">{item.title}</h5>
                      <p className="card-text mb-2">Price: <span className="fw-bold">₹{item.price}</span></p>
                      <Link to={`/product/${item.product_id}`} className="btn btn-glass btn-outline-primary mb-2 w-100">
                        <i className="fa-solid fa-eye"></i> View Product
                      </Link>
                      <button
                        className="btn btn-glass btn-outline-danger w-100"
                        onClick={() => removeFromWishlist(item.product_id)}
                      >
                        <i className="fa-solid fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;

