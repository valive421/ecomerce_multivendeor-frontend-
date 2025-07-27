import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";
import './liquidGlass.css'; // Add this import at the top

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const sellerId = localStorage.getItem('seller_id');
  const navigate = useNavigate();

  useEffect(() => {
    if (sellerId) {
      fetch(`http://127.0.0.1:8000/api/products/?vendor=${sellerId}`)
        .then(res => res.json())
        .then(data => {
          // If paginated, use data.data; else use data
          setProducts(data.data || data);
        });
    }
  }, [sellerId]);

  const handleView = (id) => {
    navigate(`/product/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/seller/products/edit/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://127.0.0.1:8000/api/product/${id}/`, {
        method: "DELETE"
      })
        .then(res => {
          if (res.ok) {
            setProducts(products => products.filter(prod => prod.id !== id));
          } else {
            alert("Failed to delete product.");
          }
        })
        .catch(() => alert("Failed to delete product."));
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        <div className="col-md-9">
          <h2 className="mb-4">My Products</h2>
          <Link to="/seller/products/add" className="btn btn-primary mb-3">Add Product</Link>
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th style={{ width: 180 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, idx) => (
                <tr key={prod.id}>
                  <td>{idx + 1}</td>
                  <td>{prod.title}</td>
                  <td>${prod.price}</td>
                  <td>{prod.sells ?? "-"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleView(prod.id)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(prod.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(prod.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SellerProducts;
