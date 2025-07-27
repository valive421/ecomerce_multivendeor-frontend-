import axios from "axios";
import {Link} from 'react-router-dom';
// Remove this line if you don't have react-feather installed:
// import { Trash2, Truck} from 'react-feather';
import Sidebar from './SellerSidebar';
import { useState,useEffect } from 'react';
function SellerCustomers(){
    const baseUrl = 'http://127.0.0.1:8000/';
    const vendorId = localStorage.getItem('seller_id');
    const [CustomerList,setCustomerList]=useState([]);
    const [showOrders, setShowOrders] = useState({ show: false, orders: [], customer: null });

    useEffect(()=>{
        // Only fetch if vendorId is valid
        if (vendorId && vendorId !== "null" && vendorId !== "undefined") {
            fetchData(`${baseUrl}api/vendor/${vendorId}/customers/`);
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
            axios.delete(baseUrl+'api/delete-customer-orders/'+customer_id)
            .then(function (response){
                if(response.bool==true){
                    fetchData(baseUrl+'api/seller/customer/'+customer_id+'/orderitems');
                 }
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }

    // Fetch orders for a customer for this vendor
    async function handleShowOrders(customer) {
        // Use backend endpoint for vendor-customer orders
        const res = await fetch(`${baseUrl}api/vendor/${vendorId}/customer/${customer.customer.id}/orders/`);
        const data = await res.json();
        setShowOrders({ show: true, orders: data.results || [], customer });
    }

    const closeOrdersModal = () => setShowOrders({ show: false, orders: [], customer: null });

    return (
        <div className="container py-5" style={{ minHeight: "100vh" }}>
            <div className="row">
                <Sidebar />
                <div className="col-md-9">
                    <h2 className="mb-4">Customers</h2>
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CustomerList.map((item, index) => (
                                    <tr key={item.customer.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.user.username}</td>
                                        <td>{item.user.email}</td>
                                        <td>{item.customer.mobile}</td>
                                        <td>
                                            <button
                                                className="btn btn-success border-0 ms-2"
                                                title="Orders"
                                                onClick={() => handleShowOrders(item)}
                                            >
                                                🛒 Orders
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
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            Orders for {showOrders.customer.user.username}
                                        </h5>
                                        <button type="button" className="btn-close" onClick={closeOrdersModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        {showOrders.orders.length === 0 ? (
                                            <div className="alert alert-info">No orders found for this customer.</div>
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
                                                                <td>{order.product && order.product.title}</td>
                                                                <td>{order.qty}</td>
                                                                <td>{order.price}</td>
                                                                <td>{order.order && order.order.order_status}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={closeOrdersModal}>Close</button>
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