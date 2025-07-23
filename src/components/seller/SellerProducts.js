import React from "react";
import { Link } from "react-router-dom";

function SellerSidebar() {
  return (
    <div className="col-md-3 mb-4 mb-md-0">
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/seller/dashboard" className="text-decoration-none text-dark">Dashboard</Link>
        </li>
        <li className="list-group-item active">Products</li>
        <li className="list-group-item">
          <Link to="/seller/orders" className="text-decoration-none text-dark">Orders</Link>
        </li>
        <li className="list-group-item">
          <Link to="/seller/customers" className="text-decoration-none text-dark">Customers</Link>
        </li>
        <li className="list-group-item">
          <Link to="/seller/reports" className="text-decoration-none text-dark">Reports</Link>
        </li>
         <li className="list-group-item">
                  <Link to="/seller/changepassword" className="text-decoration-none text-dark">Change Password</Link>
                </li>
        <li className="list-group-item">
          <Link to="/seller/logout" className="text-decoration-none text-danger">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

function SellerProducts() {
  // Demo products
  const products = [
    { id: 1, name: "Seller Product 1", price: 100, stock: 10 },
    { id: 2, name: "Seller Product 2", price: 200, stock: 5 },
    { id: 3, name: "Seller Product 3", price: 150, stock: 8 }
  ];

  const handleDelete = (id) => {
    // Add delete logic here
    alert(`Delete product with id ${id}`);
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
                  <td>{prod.name}</td>
                  <td>${prod.price}</td>
                  <td>{prod.stock}</td>
                  <td>
                    <Link to={`/seller/products/view/${prod.id}`} className="btn btn-sm btn-info me-2">
                      View
                    </Link>
                    <Link to={`/seller/products/edit/${prod.id}`} className="btn btn-sm btn-warning me-2">
                      Edit
                    </Link>
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
