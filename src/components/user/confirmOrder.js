import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, CartContext } from '../context';

function ConfirmOrder() {
  const userContext = useContext(UserContext);
  const [cartData, setCartData] = useContext(CartContext);
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    // Defensive: check for login property, and also check for undefined/null context
    if (!userContext || !userContext.login) {
      navigate('/login', { replace: true });
    }
  }, [userContext, navigate]);

  // Defensive: don't render if not logged in
  if (!userContext || !userContext.login) {
    return null;
  }

  const handlePlaceOrder = async () => {
    if (!userContext || !userContext.login || !cartData || cartData.length === 0) {
      alert("Login and cart required.");
      return;
    }
    setPlacing(true);

    // --- Always get customer_id from context or localStorage and ensure it's a valid integer ---
    let customerId = userContext.customer_id;
    if (!customerId) {
      const localCustomerId = localStorage.getItem("customer_id");
      if (localCustomerId) {
        customerId = parseInt(localCustomerId, 10);
      }
    }
    // Defensive: ensure customerId is a valid positive integer
    if (!customerId || isNaN(customerId) || Number(customerId) <= 0) {
      console.error("customerId is invalid:", customerId, "userContext:", userContext, "localStorage:", localStorage.getItem("customer_id"));
      alert(
        "No valid customer id found in user context or localStorage. " +
        "Check your login/register logic. " +
        "userContext should contain a 'customer_id' property. " +
        "See browser console for details."
      );
      setPlacing(false);
      return;
    }

    try {
      // Debug: log the payload being sent to backend
      console.log("Placing order with payload:", { customer: customerId });

      // 2. Create the Order
      const orderRes = await fetch("http://127.0.0.1:8000/api/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer: customerId }),
      });

      if (!orderRes.ok) {
        const errText = await orderRes.text();
        throw new Error("Failed to create order: " + errText);
      }

      const orderData = await orderRes.json();
      const orderId = orderData.id;

      // 2. Add Order Items
      // Defensive: ensure orderId is a valid positive integer before posting order items
      if (!orderId || isNaN(orderId) || Number(orderId) <= 0) {
        console.error("orderId is invalid:", orderId);
        alert("Order creation failed. No valid order id returned.");
        setPlacing(false);
        return;
      }
      for (let item of cartData) {
        await fetch(`http://127.0.0.1:8000/api/orderitem/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order: orderId,
            product: item.product_id,
            qty: item.qty || 1,
            price: item.price,
          }),
        });
      }

      setCartData([]);
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.error(error);
      alert("Order failed. Try again.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container py-5">
      <h3 className="mb-4">Review & Place Order</h3>
      <ul className="list-group mb-4">
        {cartData.map((item, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between">
            <div>{item.title} × {item.qty || 1}</div>
            <div>₹{(item.price || 0) * (item.qty || 1)}</div>
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between mt-4">
        {/* Use correct path for cart page */}
        <Link to="/checkout" className="btn btn-outline-primary">
          Back to Cart
        </Link>
        <button
          className="btn btn-success"
          onClick={handlePlaceOrder}
          disabled={placing || cartData.length === 0}
        >
          {placing ? "Placing Order..." : "Confirm & Place Order"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmOrder;

