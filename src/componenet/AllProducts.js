import React from "react";
import { Link } from "react-router-dom";
import SingleProduct from "./SingleProduct";
import logo from "../logo.svg";

function AllProducts() {
  const demoProducts = [
    { id: 1, slug: "demo-product-1", name: "Demo Product 1", category: "Demo", category_slug: "demo", category_id: 1, rating: 4.5, bought: 100, price: 49.99, logo },
    { id: 2, slug: "demo-product-2", name: "Demo Product 2", category: "Demo", category_slug: "demo", category_id: 1, rating: 4.0, bought: 80, price: 59.99, logo },
    { id: 3, slug: "demo-product-3", name: "Demo Product 3", category: "Demo", category_slug: "demo", category_id: 1, rating: 4.8, bought: 120, price: 69.99, logo },
    { id: 4, slug: "demo-product-4", name: "Demo Product 4", category: "Demo", category_slug: "demo", category_id: 1, rating: 4.2, bought: 60, price: 39.99, logo },
    { id: 5, slug: "demo-product-5", name: "Demo Product 5", category: "Demo", category_slug: "demo", category_id: 1, rating: 4.6, bought: 90, price: 79.99, logo },
    { id: 6, slug: "demo-product-6", name: "Demo Product 6", category: "Demo", category_slug: "demo", category_id: 1, rating: 4.3, bought: 110, price: 89.99, logo },
    { id: 7, slug: "demo-product-7", name: "Demo Product 7", category: "Demo", category_slug: "demo", category_id: 1, rating: 4.7, bought: 70, price: 99.99, logo },
    { id: 8, slug: "demo-product-8", name: "Demo Product 8", category: "Demo", category_slug: "demo", category_id: 1, rating: 4.1, bought: 50, price: 29.99, logo },
  ];

  return (
    <div className="container py-5">
      <h1 className="mb-4">All Products</h1>
      <div className="row g-4">
        {demoProducts.map((prod) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
            <SingleProduct product={prod} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllProducts;
