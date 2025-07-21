import React from "react";
import { useParams } from "react-router-dom";

function ProductDemo() {
  const { productId } = useParams();
  return (
    <div className="container py-5 text-center">
      <h1>Demo Product Page</h1>
      <p>This is a demo page for product ID: <strong>{productId}</strong></p>
      <img
        src="https://via.placeholder.com/300x200?text=Demo+Product"
        alt="Demo Product"
        className="img-fluid rounded shadow my-4"
      />
      <p>
        Here you can show any demo product details you want.<br />
        Replace this with your real product detail page later.
      </p>
    </div>
  );
}

export default ProductDemo;
