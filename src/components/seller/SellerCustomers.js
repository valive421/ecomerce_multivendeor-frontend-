import axios from "axios";
import {Link} from 'react-router-dom';
// Remove this line if you don't have react-feather installed:
// import { Trash2, Truck} from 'react-feather';
import Sidebar from './SellerSidebar';
import { useState,useEffect } from 'react';
// Add glassmorphism CSS
import './liquidGlass.css'; // <-- create this file in the same folder
import { BASE_URL } from "../context";

function SellerCustomers(){
    // Use BASE_URL instead of hardcoded baseUrl
    const vendorId = localStorage.getItem('seller_id');
    const [CustomerList,setCustomerList]=useState([]);
    const [showOrders, setShowOrders] = useState({ show: false, orders: [], customer: null });

    useEffect(()=>{
        if (vendorId && vendorId !== "null" && vendorId !== "undefined") {
            fetchData(`${BASE_URL}/vendor/${vendorId}/customers/`);
        } else {
            setCustomerList([]);
            console.warn("No valid vendor_id found in localStorage.");
        }
    },[vendorId]);

    function fetchData(baseurl){
        fetch(baseurl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            setCustomerList(data.results);
        })
        .catch((error) => {
            console.error("Failed to fetch customers:", error);
            setCustomerList([]);
        });
    }
    function showConfirm(customer_id){
        var _confirm=window.confirm('Are your sure you want to delete?');
        if(_confirm){
            axios.delete(`${BASE_URL}/delete-customer-orders/${customer_id}`)
            .then(function (response){
                if(response.bool==true){
                    fetchData(`${BASE_URL}/seller/customer/${customer_id}/orderitems`);
                 }
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }

    // Fetch orders for a customer for this vendor
    async function handleShowOrders(customer) {
        try {
            const res = await fetch(`${BASE_URL}/vendor/${vendorId}/customer/${customer.customer.id}/orders/`);
            if (!res.ok) {
                throw new Error("Failed to fetch orders");
            }
            const data = await res.json();
            setShowOrders({ show: true, orders: data.results || [], customer });
        } catch (error) {
            setShowOrders({ show: true, orders: [], customer });
            console.error("Failed to fetch orders:", error);
        }
    }

    const closeOrdersModal = () => setShowOrders({ show: false, orders: [], customer: null });

    return (
        <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
            <div className="row">
                <Sidebar />
                <div className="col-md-9 d-flex flex-column align-items-center">
                    <div className="glass-card w-100 mb-4 d-flex align-items-center justify-content-between px-4 py-3 animate__animated animate__fadeInDown">
                        <h2 className="mb-0 fw-bold text-gradient">
                            <i className="fa-solid fa-users me-2"></i> Customers
                        </h2>
                        <i className="fa-solid fa-user-group fa-2x text-primary animate__animated animate__pulse animate__infinite"></i>
                    </div>
                    <div className="table-responsive glass-card animate__animated animate__fadeInUp" style={{ boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}>
                        <table className="table table-borderless align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"><i className="fa-solid fa-user"></i> Name</th>
                                    <th scope="col"><i className="fa-solid fa-envelope"></i> Email</th>
                                    <th scope="col"><i className="fa-solid fa-phone"></i> Phone</th>
                                    <th scope="col"><i className="fa-solid fa-list"></i> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CustomerList.map((item, index) => (
                                    <tr key={item.customer.id} className="animate__animated animate__fadeInUp">
                                        <th scope="row">{index + 1}</th>
                                        <td>
                                            <span className="fw-semibold text-gradient">{item.user.username}</span>
                                        </td>
                                        <td>{item.user.email}</td>
                                        <td>{item.customer.mobile}</td>
                                        <td>
                                            <button
                                                className="btn btn-glass btn-success border-0 ms-2 animate__animated animate__pulse animate__infinite"
                                                title="Orders"
                                                onClick={() => handleShowOrders(item)}
                                            >
                                                <i className="fa-solid fa-bag-shopping me-1"></i> Orders
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Modal for showing orders of a customer */}
                    {showOrders.show && (
                        <div
                            className="modal fade show"
                            style={{ display: "block", background: "rgba(0,0,0,0.3)" }}
                            tabIndex="-1"
                            role="dialog"
                        >
                            <div className="modal-dialog modal-lg" role="document">
                                <div className="modal-content glass-card animate__animated animate__zoomIn">
                                    <div className="modal-header">
                                        <h5 className="modal-title text-gradient">
                                            <i className="fa-solid fa-bag-shopping me-2"></i>
                                            Orders for {showOrders.customer.user.username}
                                        </h5>
                                        <button type="button" className="btn-close" onClick={closeOrdersModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        {showOrders.orders.length === 0 ? (
                                            <div className="alert alert-info glass-card">No orders found for this customer.</div>
                                        ) : (
                                            <div className="table-responsive">
                                                <table className="table table-bordered align-middle">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Product</th>
                                                            <th>Qty</th>
                                                            <th>Price</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {showOrders.orders.map((order, idx) => (
                                                            <tr key={order.id}>
                                                                <td>{idx + 1}</td>
                                                                <td>
                                                                    <span className="fw-semibold text-gradient">
                                                                        <i className="fa-solid fa-cube me-1"></i>
                                                                        {order.product && order.product.title}
                                                                    </span>
                                                                </td>
                                                                <td>{order.qty}</td>
                                                                <td>
                                                                    <span className="badge bg-info text-dark fs-6">
                                                                        <i className="fa-solid fa-indian-rupee-sign"></i> {order.price}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className={`badge fs-6 px-3 py-2 ${order.order && order.order.order_status === "Complete"
                                                                        ? "bg-success"
                                                                        : order.order && order.order.order_status === "Sent"
                                                                        ? "bg-warning text-dark"
                                                                        : order.order && order.order.order_status === "Approve"
                                                                        ? "bg-primary"
                                                                        : "bg-secondary"
                                                                    }`}>
                                                                        {order.order && order.order.order_status ? String(order.order.order_status) : "Pending"}
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-glass btn-secondary" onClick={closeOrdersModal}>
                                            <i className="fa-solid fa-xmark"></i> Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SellerCustomers;