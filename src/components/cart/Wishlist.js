import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../common/Sidebar";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      slug: "demo-product-1",
      name: "Demo Product 1",
      price: 99.99,
      image: "https://via.placeholder.com/100x100?text=Wish1"
    },
    {
      id: 2,
      slug: "demo-product-2",
      name: "Demo Product 2",
      price: 79.99,
      image: "https://via.placeholder.com/100x100?text=Wish2"
    }
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  return (
    <div className="container py-5">
      <div className="row">
        <Sidebar />
        <div className="col-12 col-md-9">
          <h2 className="mb-4">My Wishlist</h2>
          {wishlistItems.length === 0 ? (
            <div className="alert alert-info">Your wishlist is empty.</div>
          ) : (
            <div className="row g-4">
              {wishlistItems.map(item => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                  <div className="card h-100 shadow-sm border-0 rounded-4 bg-light text-dark">
                    <img src={item.image} className="card-img-top p-3 rounded-4" alt={item.name} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{item.name}</h5>
                      <p className="card-text mb-2">Price: <span className="fw-bold">${item.price}</span></p>
                      <Link to={`/product/${item.slug}/${item.id}`} className="btn btn-outline-primary mb-2 w-100">
                        View Product
                      </Link>
                      <button
                        className="btn btn-outline-danger w-100"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        Remove
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
