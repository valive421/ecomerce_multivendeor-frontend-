// This component displays all orders for the logged-in user, with options to view order items and their details.

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import './liquidGlass.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderItemsLoading, setOrderItemsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    fetchOrders(page);
    // eslint-disable-next-line
  }, [page]);

  const fetchOrders = async (pageNum = 1) => {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/orders/?page=${pageNum}`);
      const data = await res.json();
      setOrders(data.data || []);
      setNextPage(data.links?.next);
      setPrevPage(data.links?.previous);
    } catch (err) {
      setOrders([]);
    }
    setLoading(false);
  };

  const fetchProductDetail = async (productId) => {
    if (productDetails[productId]) return; // already fetched
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/?id=${productId}`);
      const data = await res.json();
      // Assume data.data is an array of products
      if (Array.isArray(data.data) && data.data.length > 0) {
        setProductDetails(prev => ({ ...prev, [productId]: data.data[0] }));
      }
    } catch (err) {
      // ignore
    }
  };

  const fetchOrderItems = async (orderId) => {
    setOrderItemsLoading(true);
    setSelectedOrderId(orderId);
    setOrderStatus(null);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/order/${orderId}/`);
      const data = await res.json();
      const items = Array.isArray(data.data) ? data.data : [];
      setOrderItems(items);
      // Fetch product details for all items
      items.forEach(item => {
        if (item.product) fetchProductDetail(item.product);
      });
      // Fetch order status from the orders API (not from order items)
      const orderRes = await fetch(`http://127.0.0.1:8000/api/orders/?id=${orderId}`);
      const orderData = await orderRes.json();
      if (Array.isArray(orderData.data) && orderData.data.length > 0 && typeof orderData.data[0].order_status !== "undefined") {
        setOrderStatus(orderData.data[0].order_status);
      } else {
        setOrderStatus(null);
      }
    } catch (err) {
      setOrderItems([]);
      setOrderStatus(null);
    }
    setOrderItemsLoading(false);
  };

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="row">
        <Sidebar />
        <div className="col-12 col-md-9">
          <div className="glass-card d-flex align-items-center justify-content-between mb-4 px-4 py-3 animate__animated animate__fadeInDown">
            <h2 className="mb-0 fw-bold text-gradient">
              <i className="fa-solid fa-bag-shopping me-2"></i> My Orders
            </h2>
            <Link to="/products" className="btn btn-glass btn-outline-success">
              <i className="fa-solid fa-plus-circle"></i> Shop More
            </Link>
          </div>
          {loading ? (
            <div className="alert alert-info glass-card">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="alert alert-warning text-center py-5 glass-card">
              <i className="fa fa-bag-x fa-2x mb-2"></i>
              <div className="mt-2">You have no orders yet.</div>
              <Link to="/products" className="btn btn-primary mt-3">
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="table-responsive rounded shadow-sm glass-card animate__animated animate__fadeInUp">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Order #</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Show Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td className="fw-bold">{order.id}</td>
                        <td>{order.ordertime ? new Date(order.ordertime).toLocaleString() : ""}</td>
                        <td>
                          {order.order_status === true || order.order_status === "paid" ? (
                            <span className="badge bg-success">Paid</span>
                          ) : order.order_status === false || order.order_status === "pending" ? (
                            <span className="badge bg-warning text-dark">Pending</span>
                          ) : (
                            <span className="badge bg-secondary">{order.order_status || "Unknown"}</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => fetchOrderItems(order.id)}
                          >
                            <i className="bi bi-eye"></i> View Items
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-between my-3">
                <button
                  className="btn btn-outline-secondary"
                  disabled={!prevPage}
                  onClick={() => setPage(page - 1)}
                >
                  <i className="bi bi-arrow-left"></i> Previous
                </button>
                <button
                  className="btn btn-outline-secondary"
                  disabled={!nextPage}
                  onClick={() => setPage(page + 1)}
                >
                  Next <i className="bi bi-arrow-right"></i>
                </button>
              </div>
            </>
          )}

          {selectedOrderId && (
            <div className="mt-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h5 className="mb-0">Order Items for Order #{selectedOrderId}</h5>
                <button className="btn btn-link text-danger" onClick={() => setSelectedOrderId(null)}>
                  <i className="bi bi-x-circle"></i> Close
                </button>
              </div>
              {orderStatus !== null && (
                <div className="mb-3">
                  <strong>Status:</strong>{" "}
                  <span>
                    {orderStatus === true || orderStatus === "paid"
                      ? <span className="badge bg-success">Paid</span>
                      : orderStatus === false || orderStatus === "pending"
                      ? <span className="badge bg-warning text-dark">Pending</span>
                      : <span className="badge bg-secondary">{orderStatus}</span>
                    }
                  </span>
                </div>
              )}
              {orderItemsLoading ? (
                <div className="alert alert-info">Loading items...</div>
              ) : orderItems.length === 0 ? (
                <div className="alert alert-warning">No items found for this order.</div>
              ) : (
                <div className="table-responsive rounded shadow-sm">
                  <table className="table table-bordered align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(orderItems) && orderItems.map(item => {
                        const prod = productDetails[item.product];
                        return (
                          <tr key={item.id}>
                            <td>
                              {prod ? (
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  {prod.product_images && prod.product_images.length > 0 && (
                                    <img
                                      src={prod.product_images[0].image}
                                      alt={prod.title}
                                      style={{ width: 48, height: 48, objectFit: "cover", marginRight: 8, borderRadius: 4, border: "1px solid #eee" }}
                                    />
                                  )}
                                  <div>
                                    <strong>{prod.title}</strong>
                                    <div style={{ fontSize: "0.9em", color: "#666" }}>
                                      {prod.detail ? prod.detail : null}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                item.product_title || item.product?.title || item.product || "Product"
                              )}
                            </td>
                            <td>{item.qty}</td>
                            <td>
                              {prod ? (
                                <>
                                  <span>₹{prod.price}</span>
                                  <br />
                                  <span style={{ fontSize: "0.9em", color: "#888" }}>
                                    Total: ₹{(prod.price * item.qty).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span>₹{item.price}</span>
                                  <br />
                                  <span style={{ fontSize: "0.9em", color: "#888" }}>
                                    Total: ₹{(item.price * item.qty).toFixed(2)}
                                  </span>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
