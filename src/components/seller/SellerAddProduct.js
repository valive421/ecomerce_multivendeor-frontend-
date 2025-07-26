import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import SellerSidebar from "./SellerSidebar";
function SellerAddProduct() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    images: []
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setForm({ ...form, images: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send form data to backend
    // For demo, just redirect to products page
    navigate("/seller/products");
  };

  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
          <div className="card shadow p-4" style={{ maxWidth: 500, width: "100%" }}>
            <h2 className="mb-4 text-center">Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  name="title"
                  className="form-control"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  name="price"
                  type="number"
                  className="form-control"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  name="category"
                  className="form-control"
                  value={form.category}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Images</label>
                <input
                  name="images"
                  type="file"
                  className="form-control"
                  multiple
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Add Product</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerAddProduct;
