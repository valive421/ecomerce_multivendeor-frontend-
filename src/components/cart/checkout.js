import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../context';

function Checkout() {
  const [cartData, setCartData] = useContext(CartContext);

  const cartItems = cartData || [];
  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleRemove = (product_id) => {
    const updatedCart = cartItems.filter(item => item.product_id !== product_id);
    setCartData(updatedCart);
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4">All Items ({cartItems.length})</h3>
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "60%" }}>Product</th>
            <th style={{ width: "20%" }}>Price</th>
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
            <td colSpan={3} className="fw-bold text-end">Total</td>
            <td className="fw-bold">Rs. {total}</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-between mt-4">
        <Link to="/products" className="btn btn-outline-primary">
          Continue Shopping
        </Link>
        <Link to="/confirm-order" className="btn btn-success">
          Proceed to Payment
        </Link>
      </div>
    </div>
  );
}

export default Checkout;