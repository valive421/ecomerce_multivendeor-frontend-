import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component

function Orders() {
  // Demo orders data
  const orders = [
    {
      id: 101,
      date: "2024-07-20",
      status: "Delivered",
      total: 1499,
      items: [
        { name: "Demo Product 1", slug: "demo-product-1", id: 1, image: "https://via.placeholder.com/60x60?text=Prod1" },
        { name: "Demo Product 2", slug: "demo-product-2", id: 2, image: "https://via.placeholder.com/60x60?text=Prod2" }
      ]
    },
    {
      id: 102,
      date: "2024-07-18",
      status: "Shipped",
      total: 799,
      items: [
        { name: "Demo Product 3", slug: "demo-product-3", id: 3, image: "https://via.placeholder.com/60x60?text=Prod3" }
      ]
    }
  ];

  return (
    <div className="container py-5">
      <div className="row">
        <Sidebar />
        <div className="col-12 col-md-9">
          <h2 className="mb-4">My Orders</h2>
          {orders.length === 0 ? (
            <div className="alert alert-info">You have no orders yet.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Order #</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Items</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.date}</td>
                      <td>
                        <span className={`badge ${order.status === "Delivered" ? "bg-success" : "bg-warning text-dark"}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        {order.items.map(item => (
                          <div key={item.id} className="d-flex align-items-center mb-2">
                            <img src={item.image} alt={item.name} style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 6, marginRight: 8 }} />
                            <Link to={`/product/${item.slug}/${item.id}`}>{item.name}</Link>
                          </div>
                        ))}
                      </td>
                      <td>Rs. {order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
