import axios from "axios";
import { Link } from 'react-router-dom';
import Sidebar from './SellerSidebar';
// import { CheckCircle, Loader} from 'react-feather';
import { useState, useEffect, useRef } from 'react';
// import { CurrencyContext } from "../../context";
function SellerOrders() {
    const [OrderItems, setOrderItems] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [loading, setLoading] = useState(false);
    const [statusLoading, setStatusLoading] = useState({});
    const [detailModal, setDetailModal] = useState({ show: false, customer: null, email: null, mobile: null, address: null, qty: null, product: null });
    const baseUrl = 'http://127.0.0.1:8000/';

    // Get vendorId from localStorage, fallback to a default or prompt if not found
    let vendorId = localStorage.getItem('vendor_id');
    if (!vendorId) {
        // fallback to a default vendor id (e.g., 3) or show a message
        vendorId = 3;
        // Optionally, show a warning or redirect to login
        // return <div>Please login as a vendor.</div>;
    }

    const dropdownRefs = useRef({});

    useEffect(() => {
        fetchData(baseUrl + 'api/vendor/' + vendorId + '/orderitems');
        // Close dropdown on outside click
        function handleClickOutside(event) {
            if (
                openDropdown !== null &&
                dropdownRefs.current[openDropdown] &&
                !dropdownRefs.current[openDropdown].contains(event.target)
            ) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
        // eslint-disable-next-line
    }, [openDropdown]);

    function fetchData(baseurl) {
        setLoading(true);
        fetch(baseurl)
            .then((response) => response.json())
            .then((data) => {
                setOrderItems(data.results);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }

    function changeOrderStatus(order_id, ord_status) {
        setStatusLoading(prev => ({ ...prev, [order_id]: true }));
        axios.patch(baseUrl + 'api/order-status/' + order_id + '/', {
            status: ord_status,
        })
            .then(function () {
                fetchData(baseUrl + 'api/vendor/' + vendorId + '/orderitems');
                setOpenDropdown(null);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setStatusLoading(prev => ({ ...prev, [order_id]: false }));
            });
    }

    async function handleShowDetail(item) {
        // Fetch order info to get customer id
        const orderRes = await fetch(`${baseUrl}api/order/${item.order.id}/`);
        const orderItems = await orderRes.json();
        // Find the order item for this product
        const thisOrderItem = Array.isArray(orderItems) ? orderItems.find(oi => oi.id === item.id) : null;
        // Fetch order to get customer id
        const orderListRes = await fetch(`${baseUrl}api/orders/?id=${item.order.id}`);
        const orderListData = await orderListRes.json();
        if (!orderListData.data || orderListData.data.length === 0) return;
        const orderObj = orderListData.data[0];
        const customerId = orderObj.customer;
        // Fetch customer info
        const customerRes = await fetch(`${baseUrl}api/customer/${customerId}/`);
        const customerData = await customerRes.json();
        // Fetch default address
        const addressRes = await fetch(`${baseUrl}api/customer-addresses/${customerId}/`);
        const addressData = await addressRes.json();
        let defaultAddress = "";
        if (Array.isArray(addressData)) {
            const found = addressData.find(addr => addr.default_address);
            defaultAddress = found ? found.address : (addressData[0]?.address || "");
        }
        setDetailModal({
            show: true,
            customer: customerData.user?.first_name + " " + customerData.user?.last_name,
            email: customerData.user?.email,
            mobile: customerData.mobile,
            address: defaultAddress,
            qty: thisOrderItem ? thisOrderItem.qty : item.qty,
            product: item.product.title
        });
    }

    const closeDetailModal = () => setDetailModal({ show: false, customer: null, email: null, mobile: null, address: null, qty: null, product: null });

    return (
        <div className="container py-5" style={{ minHeight: "100vh" }}>
            <div className="row">
                <Sidebar />
                <div className="col-md-9">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="mb-0 fw-bold">Orders</h2>
                        {loading && <span className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true"></span>}
                    </div>
                    <div className="table-responsive rounded shadow-sm">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {OrderItems.length === 0 && !loading && (
                                    <tr>
                                        <td colSpan={5} className="text-center text-muted py-4">
                                            <i className="fa fa-box-open fa-2x mb-2"></i>
                                            <div>No orders found.</div>
                                        </td>
                                    </tr>
                                )}
                                {OrderItems.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="fw-bold">{index + 1}</td>
                                        <td>
                                            <Link to={`/product/${item.product.title}/${item.product.id}`} className="d-flex align-items-center text-decoration-none">
                                                <img src={`${baseUrl}/${item.product.image}`} className="img-thumbnail me-2" width="60" alt={item.product.title} style={{ objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }} />
                                                <span className="fw-semibold">{item.product.title}</span>
                                            </Link>
                                        </td>
                                        <td>
                                            <span className="badge bg-info text-dark fs-6">${item.product.price}</span>
                                        </td>
                                        <td>
                                            <span className={`badge fs-6 px-3 py-2 ${item.order.order_status === "Complete"
                                                ? "bg-success"
                                                : item.order.order_status === "Sent"
                                                ? "bg-warning text-dark"
                                                : item.order.order_status === "Approve"
                                                ? "bg-primary"
                                                : "bg-secondary"
                                            }`}>
                                                {item.order.order_status ? String(item.order.order_status) : "Pending"}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="btn-group" role="group" style={{ position: "relative" }} ref={el => dropdownRefs.current[item.id] = el}>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-dark btn-sm dropdown-toggle"
                                                    onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
                                                    disabled={statusLoading[item.order.id]}
                                                >
                                                    {statusLoading[item.order.id] ? (
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                    ) : "Change Status"}
                                                </button>
                                                {openDropdown === item.id && (
                                                    <ul className="dropdown-menu show" style={{ position: "absolute", zIndex: 1000 }}>
                                                        <li>
                                                            <button type="button" className="dropdown-item" onClick={() => changeOrderStatus(item.order.id, "Sent")}>Sent</button>
                                                        </li>
                                                        <li>
                                                            <button type="button" className="dropdown-item" onClick={() => changeOrderStatus(item.order.id, "Approve")}>Approve</button>
                                                        </li>
                                                        <li>
                                                            <button type="button" className="dropdown-item" onClick={() => changeOrderStatus(item.order.id, "Complete")}>Complete</button>
                                                        </li>
                                                    </ul>
                                                )}
                                                <button
                                                    type="button"
                                                    className="btn btn-info btn-sm ms-2"
                                                    onClick={() => handleShowDetail(item)}
                                                >
                                                    <i className="fa fa-info-circle me-1"></i> Show Detail
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Modal for order/customer detail */}
                    {detailModal.show && (
                        <div
                            className="modal fade show"
                            style={{ display: "block", background: "rgba(0,0,0,0.3)" }}
                            tabIndex="-1"
                            role="dialog"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Order Detail</h5>
                                        <button type="button" className="btn-close" onClick={closeDetailModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-2"><strong>Customer Name:</strong> {detailModal.customer || "N/A"}</div>
                                        <div className="mb-2"><strong>Email:</strong> {detailModal.email || "N/A"}</div>
                                        <div className="mb-2"><strong>Mobile:</strong> {detailModal.mobile || "N/A"}</div>
                                        <div className="mb-2"><strong>Default Address:</strong> {detailModal.address || "N/A"}</div>
                                        <div className="mb-2"><strong>Product:</strong> {detailModal.product || "N/A"}</div>
                                        <div className="mb-2"><strong>Quantity:</strong> {detailModal.qty || "N/A"}</div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={closeDetailModal}>Close</button>
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

export default SellerOrders;