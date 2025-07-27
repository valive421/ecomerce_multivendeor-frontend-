import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";

function SellerEditProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const sellerId = localStorage.getItem("seller_id");

  useEffect(() => {
    // Fetch categories for dropdown
    fetch("http://127.0.0.1:8000/api/categories/")
      .then(res => res.json())
      .then(data => setCategories(data.data || data));
    // Fetch product details
    fetch(`http://127.0.0.1:8000/api/product/${id}/`)
      .then(res => res.json())
      .then(data => {
        setForm({
          title: data.title || "",
          price: data.price || "",
          category: data.category?.id || "",
          description: data.detail || "",
          images: [],
        });
        setLoading(false);
      });
  }, [id]);

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
    setErrorMsg("");
    setSuccessMsg("");
    if (!sellerId) {
      setErrorMsg("Seller not logged in.");
      return;
    }
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("detail", form.description);
    formData.append("vendor", sellerId);
    if (form.images && form.images.length > 0) {
      form.images.forEach(img => formData.append("images", img));
    }
    fetch(`http://127.0.0.1:8000/api/product/${id}/`, {
      method: "PATCH",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.id || data.bool) {
          setSuccessMsg("Product updated successfully!");
          setTimeout(() => navigate("/seller/products"), 1000);
        } else {
          setErrorMsg(data.msg || "Failed to update product.");
        }
      })
      .catch(() => setErrorMsg("Failed to update product."));
  };

  if (loading) {
    return <div className="container py-5">Loading...</div>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
          <div className="card shadow p-4" style={{ maxWidth: 500, width: "100%" }}>
            <h2 className="mb-4 text-center">Edit Product</h2>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
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
                <select
                  name="category"
                  className="form-control"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
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
                <label className="form-label">Images (leave blank to keep current)</label>
                <input
                  name="images"
                  type="file"
                  className="form-control"
                  accept="image/*"
                  multiple
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Update Product</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerEditProduct;
