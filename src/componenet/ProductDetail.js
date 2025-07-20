import React from "react";
import { useParams } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import logo from "../logo.svg";

const productDetails = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', rating: 4.7, bought: 1200, price: 49.99, logo },
  { id: 2, name: 'Smart Watch', category: 'Electronics', rating: 4.5, bought: 950, price: 59.99, logo },
  { id: 3, name: 'Bluetooth Speaker', category: 'Electronics', rating: 4.6, bought: 800, price: 69.99, logo },
  { id: 4, name: 'Fitness Tracker', category: 'Sports', rating: 4.4, bought: 700, price: 79.99, logo },
  { id: 5, name: 'VR Headset', category: 'Electronics', rating: 4.8, bought: 500, price: 89.99, logo },
  { id: 6, name: 'Portable SSD', category: 'Electronics', rating: 4.7, bought: 650, price: 99.99, logo },
  { id: 7, name: 'Gaming Mouse', category: 'Electronics', rating: 4.5, bought: 900, price: 109.99, logo },
  { id: 8, name: 'Action Camera', category: 'Sports', rating: 4.6, bought: 400, price: 119.99, logo },
];

function ProductDetail() {
  const { productId } = useParams();
  const product = productDetails.find((p) => p.id === Number(productId));

  return (
    <div className="container py-5">
      <h1 className="mb-4">Product Detail</h1>
      {product ? (
        <SingleProduct product={product} />
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
}

export default ProductDetail;
