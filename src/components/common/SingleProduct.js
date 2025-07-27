import React from "react";
import { Link } from "react-router-dom";
import './liquidGlass.css';

function SingleProduct({ product }) {
  if (!product) {
    return <div>No product data available.</div>;
  }
  return (
    <div
      className="glass-card h-100 shadow-sm border-0 rounded-4 bg-gradient animate__animated animate__fadeInUp"
      style={{
        background: "rgba(255,255,255,0.18)",
        border: "1.5px solid #e0e7ff",
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.18)",
        transition: "transform 0.2s, box-shadow 0.2s",
        overflow: "hidden",
        position: "relative",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <div className="position-relative">
        <img
          src={product.image || product.logo}
          className="card-img-top p-3 rounded-4"
          alt={product.name}
          style={{
            height: "200px",
            objectFit: "cover",
            borderRadius: "1.2rem",
            boxShadow: "0 4px 16px rgba(37,99,235,0.08)"
          }}
        />
        {typeof product.sells !== "undefined" && (
          <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2 animate__animated animate__pulse animate__infinite">
            <i className="fa-solid fa-fire me-1"></i> {product.sells} sold
          </span>
        )}
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold text-gradient mb-1" style={{ fontSize: "1.18rem" }}>
          {product.name}
        </h5>
        {product.category && (
          <span className="card-link d-block mb-1 text-decoration-underline text-primary small">
            <i className="fa-solid fa-tag me-1"></i>{product.category}
          </span>
        )}
        {product.rating && (
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
            <span className="ms-1 text-dark small">{product.rating}</span>
          </div>
        )}
        {product.price && (
          <p className="card-text mb-2">
            <span className="badge bg-info text-dark fs-6 px-3 py-2" style={{ fontSize: "1.1rem" }}>
              <i className="fa-solid fa-indian-rupee-sign"></i> {product.price}
            </span>
          </p>
        )}
        {product.bought && (
          <p className="card-text">
            <i className="fa-solid fa-user-check me-1"></i>Bought: {product.bought}
          </p>
        )}
        <div className="mt-auto d-flex flex-column gap-2">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-glass btn-primary w-100"
            style={{
              fontWeight: 600,
              letterSpacing: "0.5px",
              fontSize: "1.05rem",
              borderRadius: "1rem"
            }}
          >
            <i className="fa-solid fa-cart-shopping me-1"></i> Shop Now
          </Link>
        </div>
      </div>
      <div
        className="position-absolute bottom-0 start-0 w-100"
        style={{
          height: 6,
          background: "linear-gradient(90deg,#2563eb 0%,#06b6d4 100%)",
          borderBottomLeftRadius: "1.5rem",
          borderBottomRightRadius: "1.5rem"
        }}
      ></div>
    </div>
  );
}

export default SingleProduct;