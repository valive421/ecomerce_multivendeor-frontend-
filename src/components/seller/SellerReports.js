// This component displays advanced sales and customer reports for the logged-in seller, including sales by product, category, and customer rankings.

import React, { useEffect, useState } from "react";
import SellerSidebar from "./SellerSidebar";
import { BASE_URL } from "../context";

function SellerReports() {
  const [report, setReport] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    salesByProduct: {},
    salesByCategory: {},
    monthlySales: {},
    orderStatusCounts: {},
    products: [],
    orders: [],
    customers: [],
    customerOrderCounts: {}, // customerId -> order count
  });

  useEffect(() => {
    const vendorId = localStorage.getItem("seller_id");
    if (!vendorId) return;

    console.log("Fetching customers for vendor:", vendorId);
    fetch(`${BASE_URL}/vendor/${vendorId}/customers/`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched customers response:", data);
        const customers = Array.isArray(data.results) ? data.results : [];
        setReport(r => ({
          ...r,
          totalCustomers: customers.length,
          customers,
        }));

        console.log("Fetching orderitems for vendor:", vendorId);
        fetch(`${BASE_URL}/vendor/${vendorId}/orderitems`)
          .then(res => res.json())
          .then(data => {
            console.log("Fetched orderitems response:", data);
            const orderItems = Array.isArray(data.results) ? data.results : [];
            const totalOrders = orderItems.length;
            const totalSales = orderItems.reduce(
              (sum, item) => sum + (item.product?.price || 0) * (item.qty || 1),
              0
            );
            const salesByProduct = {};
            const salesByCategory = {};
            const monthlySales = {};
            const orderStatusCounts = {};
            const customerOrderCounts = {};

            orderItems.forEach(item => {
              // Product sales
              const prodId = item.product?.id;
              if (prodId) {
                salesByProduct[prodId] = (salesByProduct[prodId] || 0) + (item.product?.price || 0) * (item.qty || 1);
              }
              // Category sales
              const cat = item.product?.category?.title;
              if (cat) {
                salesByCategory[cat] = (salesByCategory[cat] || 0) + (item.product?.price || 0) * (item.qty || 1);
              }
              // Monthly sales
              if (item.order?.ordertime) {
                const date = new Date(item.order.ordertime);
                const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
                monthlySales[key] = (monthlySales[key] || 0) + (item.product?.price || 0) * (item.qty || 1);
              }
              // Order status
              const status = item.order?.order_status || "Unknown";
              orderStatusCounts[status] = (orderStatusCounts[status] || 0) + 1;
              // Customer order count (match by customer id, which is a number)
              // Fix: get customer id from item.order.id (order id), then map to customer via customers array
              // Use customer_id from backend
              const custId = item.customer_id;
              if (custId) {
                customerOrderCounts[String(custId)] = (customerOrderCounts[String(custId)] || 0) + 1;
              }
            });

            console.log("Calculated salesByProduct:", salesByProduct);
            console.log("Calculated salesByCategory:", salesByCategory);
            console.log("Calculated monthlySales:", monthlySales);
            console.log("Calculated orderStatusCounts:", orderStatusCounts);
            console.log("Calculated customerOrderCounts:", customerOrderCounts);

            setReport(r => ({
              ...r,
              totalSales,
              totalOrders,
              salesByProduct,
              salesByCategory,
              monthlySales,
              orderStatusCounts,
              orders: orderItems,
              customerOrderCounts,
            }));
          });

        console.log("Fetching products for vendor:", vendorId);
        fetch(`${BASE_URL}/products/?vendor=${vendorId}`)
          .then(res => res.json())
          .then(data => {
            console.log("Fetched products response:", data);
            setReport(r => ({
              ...r,
              products: data.data || [],
            }));
          });
      });
  }, []);

  // Prepare chart data
  const productLabels = report.products.map(p => p.title);
  const productSales = report.products.map(p => report.salesByProduct[p.id] || 0);

  const categoryLabels = Object.keys(report.salesByCategory);
  const categorySales = Object.values(report.salesByCategory);

  const monthlyLabels = Object.keys(report.monthlySales).sort();
  const monthlySales = monthlyLabels.map(k => report.monthlySales[k]);

  const statusLabels = Object.keys(report.orderStatusCounts);
  const statusCounts = Object.values(report.orderStatusCounts);

  // Rank customers by order count
  const rankedCustomers = report.customers
    .map(c => {
      // Always use string for id to match keys in customerOrderCounts
      const cid = c.customer?.id ? String(c.customer.id) : "";
      return {
        ...c,
        orderCount: report.customerOrderCounts[cid] || 0,
      };
    })
    .sort((a, b) => b.orderCount - a.orderCount);

  return (
    <div className="container py-5">
      <div className="row">
        <SellerSidebar />
        <div className="col-md-9">
          <h2 className="mb-4 text-gradient"><i className="fa-solid fa-chart-line me-2"></i>Advanced Reports</h2>
          <div className="row g-4 mb-4">
            <div className="col-12 col-md-4">
              <div className="glass-card p-4 text-center">
                <h6 className="fw-bold text-gradient mb-2">Total Sales</h6>
                <div className="fs-3 fw-bold text-success">₹{report.totalSales}</div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="glass-card p-4 text-center">
                <h6 className="fw-bold text-gradient mb-2">Total Orders</h6>
                <div className="fs-3 fw-bold text-primary">{report.totalOrders}</div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="glass-card p-4 text-center">
                <h6 className="fw-bold text-gradient mb-2">Total Customers</h6>
                <div className="fs-3 fw-bold text-info">{report.totalCustomers}</div>
              </div>
            </div>
          </div>

          {/* Sales by Product */}
          <div className="glass-card p-4 mb-4">
            <h5 className="fw-bold text-gradient mb-3"><i className="fa-solid fa-boxes-stacked me-2"></i>Sales by Product</h5>
            <ul className="list-group">
              {report.products.map(p => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={p.id}>
                  <span>{p.title}</span>
                  <span className="badge bg-primary">{report.salesByProduct[p.id] || 0}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Order Status Distribution */}
          <div className="glass-card p-4 mb-4">
            <h5 className="fw-bold text-gradient mb-3"><i className="fa-solid fa-clipboard-list me-2"></i>Order Status Distribution</h5>
            <ul className="list-group">
              {statusLabels.length > 0 ? statusLabels.map((status, idx) => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={status}>
                  <span>{status}</span>
                  <span className="badge bg-secondary">{statusCounts[idx]}</span>
                </li>
              )) : <li className="list-group-item">No order status data.</li>}
            </ul>
          </div>

          {/* Ranked Customers */}
          <div className="glass-card p-4 mb-4">
            <h5 className="fw-bold text-gradient mb-3">
              <i className="fa-solid fa-users me-2"></i>Customers Ranked by Orders
            </h5>
            {rankedCustomers.length > 0 ? (
              <table className="table table-bordered align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Rank</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Order Count</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedCustomers.map((c, idx) => {
                    const user = c.user;
                    const mobile = c.customer?.mobile;
                    return (
                      <tr key={c.customer?.id || user?.id}>
                        <td>{idx + 1}</td>
                        <td>
                          {user
                            ? `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.username
                            : ""}
                        </td>
                        <td>{user?.email || ""}</td>
                        <td>{mobile || ""}</td>
                        <td>{c.orderCount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div>No customer data available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerReports;




