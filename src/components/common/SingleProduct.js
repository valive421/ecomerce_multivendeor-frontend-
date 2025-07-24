import React from "react";
import { Link } from "react-router-dom";

function SingleProduct({ product }) {
  if (!product) {
    return <div>No product data available.</div>;
  }
console.log(product);
  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light">
      <img
        src={product.image || product.logo}
        className="card-img-top p-3 rounded-4"
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{product.name}</h5>
        {product.category && (
          <span className="card-link d-block mb-1 text-decoration-underline text-light small">
            {product.category}
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
            <span className="ms-1 text-light small">{product.rating}</span>
          </div>
        )}
        {product.price && <p className="card-text">Price: ${product.price}</p>}
        {product.bought && (
          <p className="card-text">
            <i className="fa-solid fa-user-check me-1"></i>Bought: {product.bought}
          </p>
        )}
        <Link
          to={`/product/${product.id}`}
          className="btn btn-light w-100 mt-auto"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default SingleProduct;