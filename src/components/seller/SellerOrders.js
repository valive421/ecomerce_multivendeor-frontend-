import React, { useState } from "react";
import { Link } from "react-router-dom";

function SellerSidebar() {
  return (
    <div className="col-md-3 mb-4 mb-md-0">
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/seller/dashboard" className="text-decoration-none text-dark">Dashboard</Link>
        </li>
        <li className="list-group-item">
          <Link to="/seller/products" className="text-decoration-none text-dark">Products</Link>
        </li>
        <li className="list-group-item active">Orders</li>
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

function SellerOrders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      product: {
        name: "Django",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        link: "/product/django/1"
      },
      price: 500,
      status: "Completed"
    },
    {
      id: 2,
      product: {
        name: "Django",
        image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        link: "/product/django/1"
      },
      price: 500,
      status: "Completed"
    }
  ]);

  const [statusDropdown, setStatusDropdown] = useState({});

  const statusOptions = ["Approve", "Sent", "Complete"];

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders =>
      orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setStatusDropdown({ ...statusDropdown, [orderId]: false });
  };

  const toggleDropdown = (orderId) => {
    setStatusDropdown(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        <div className="col-md-9">
          <h2 className="mb-4">Orders</h2>
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th style={{ width: 200 }}>Product</th>
                <th style={{ width: 120 }}>Price</th>
                <th style={{ width: 120 }}>Status</th>
                <th style={{ width: 180 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order.id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img src={order.product.image} alt={order.product.name} style={{ width: 32, height: 32, objectFit: "contain" }} />
                      <Link to={order.product.link}>{order.product.name}</Link>
                    </div>
                  </td>
                  <td>Rs. {order.price}</td>
                  <td>
                    <span className="text-success">
                      <i className="fa fa-circle me-1" style={{ fontSize: 10 }}></i>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ position: "relative", display: "inline-block" }}>
                      <button
                        className="btn btn-primary btn-sm dropdown-toggle"
                        type="button"
                        onClick={() => toggleDropdown(order.id)}
                      >
                        Change Status
                      </button>
                      {statusDropdown[order.id] && (
                        <ul
                          className="dropdown-menu show"
                          style={{
                            display: "block",
                            position: "absolute",
                            left: 0,
                            top: "100%",
                            minWidth: 120,
                            background: "#fff",
                            color: "#222",
                            borderRadius: 8,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                            zIndex: 1000,
                            padding: 0,
                            margin: 0,
                          }}
                        >
                          {statusOptions.map(option => (
                            <li key={option}>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={() => handleStatusChange(order.id, option)}
                              >
                                {option}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
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

export default SellerOrders;
