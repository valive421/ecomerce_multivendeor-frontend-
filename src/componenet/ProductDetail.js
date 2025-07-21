import React, { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../logo.svg";

function ProductDetail() {
  const { product_slug, product_id } = useParams();
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const product = {
    id: product_id,
    slug: product_slug,
    name: `Demo Product ${product_id}`,
    category: "Demo Category",
    seller: "Demo Seller",
    rating: 4.5,
    reviews: 44,
    bought: 900,
    price: 109.99,
    logo,
    image: "https://via.placeholder.com/400x300?text=Demo+Product",
    description: "This is a demo product description. Replace with real data later."
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-5">
          <img
            src={product.image || product.logo}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ background: "#fff", width: "100%" }}
          />
        </div>
        <div className="col-md-7">
          <h2 className="fw-bold mb-2">{product.name}</h2>
          <div className="mb-2">
            <span className="badge bg-primary me-2">{product.category}</span>
            <span className="badge bg-secondary">Seller: {product.seller}</span>
          </div>
          <div className="mb-2">
            {[...Array(5)].map((_, star) => (
              <i
                key={star}
                className={
                  star < Math.round(product.rating)
                    ? "fa-solid fa-star text-warning"
                    : "fa-regular fa-star text-warning"
                }
              ></i>
            ))}
            <span className="ms-2">{product.rating} ({product.reviews} reviews)</span>
          </div>
          <h3 className="text-success mb-3">${product.price}</h3>
          <div className="mb-3">
            <button
              className={`btn btn-primary me-2 ${inCart ? "disabled" : ""}`}
              onClick={() => setInCart(true)}
            >
              <i className="fa-solid fa-cart-plus me-1"></i>
              {inCart ? "Added to Cart" : "Add to Cart"}
            </button>
            <button
              className={`btn btn-outline-danger ${inWishlist ? "active" : ""}`}
              onClick={() => setInWishlist((w) => !w)}
            >
              <i className={`fa${inWishlist ? "s" : "r"} fa-heart me-1`}></i>
              {inWishlist ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
          <p className="mb-2"><strong>Bought:</strong> {product.bought} times</p>
          <p className="mb-4">{product.description}</p>
          <hr />
          <h5>Customer Reviews</h5>
          <ul className="list-unstyled">
            <li>
              <strong>Jane Doe</strong> <span className="text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <br />
              <small>Great product! Highly recommend.</small>
            </li>
            <li className="mt-2">
              <strong>John Smith</strong> <span className="text-warning">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
              <br />
              <small>Good value for money.</small>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

