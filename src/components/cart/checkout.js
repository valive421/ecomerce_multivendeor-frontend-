import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../context';
import './liquidGlass.css';

function Checkout() {
  const [cartData, setCartData] = useContext(CartContext);

  const cartItems = cartData || [];
  const total = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  const handleRemove = (product_id) => {
    const updatedCart = cartItems.filter(item => item.product_id !== product_id);
    setCartData(updatedCart);
  };

  const handleQuantityChange = (product_id, delta) => {
    const updatedCart = cartItems.map(item => {
      if (item.product_id === product_id) {
        const newQty = (item.quantity || 1) + delta;
        return { ...item, quantity: newQty > 1 ? newQty : 1 };
      }
      return item;
    });
    setCartData(updatedCart);
  };

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="glass-card mb-4 px-4 py-4 animate__animated animate__fadeInDown">
        <h3 className="mb-4 text-gradient">
          <i className="fa-solid fa-cart-shopping me-2"></i>
          All Items ({cartItems.length})
        </h3>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "5%" }}>#</th>
                <th style={{ width: "40%" }}>Product</th>
                <th style={{ width: "20%" }}>Price</th>
                <th style={{ width: "20%" }}>Quantity</th>
                <th style={{ width: "15%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, idx) => (
                <tr key={item.product_id}>
                  <td>{idx + 1}</td>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img src={item.image} alt={item.title} style={{ width: 40, height: 40, objectFit: "contain" }} />
                      <Link to={`/product/${item.product_id}`}>{item.title}</Link>
                    </div>
                  </td>
                  <td>Rs. {item.price}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleQuantityChange(item.product_id, -1)}
                        disabled={(item.quantity || 1) <= 1}
                      >-</button>
                      <span>{item.quantity || 1}</span>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => handleQuantityChange(item.product_id, 1)}
                      >+</button>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleRemove(item.product_id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} className="fw-bold text-end">Total</td>
                <td className="fw-bold">Rs. {total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Link to="/products" className="btn btn-glass btn-outline-primary">
            <i className="fa-solid fa-arrow-left"></i> Continue Shopping
          </Link>
          <Link to="/confirm-order" className="btn btn-glass btn-success">
            Proceed to Payment <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Checkout;