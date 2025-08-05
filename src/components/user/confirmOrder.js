import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, CartContext, BASE_URL } from '../context';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import './liquidGlass.css';

function ConfirmOrder() {
  const userContext = useContext(UserContext);
  const [cartData, setCartData] = useContext(CartContext);
  const navigate = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [showPaypal, setShowPaypal] = useState(false);
  const paypalRef = useRef();
  const [backendOrderId, setBackendOrderId] = useState(null);

  useEffect(() => {
    // Defensive: check for login property, and also check for undefined/null context
    if (!userContext || !userContext.login) {
      navigate('/login', { replace: true });
    }
  }, [userContext, navigate]);

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

  const handlePlaceOrder = async () => {
    if (!userContext || !userContext.login || !cartData || cartData.length === 0) {
      alert("Login and cart required.");
      return;
    }
    setPlacing(true);

    try {
      console.log("Placing order with payload:", { customer: customerId });

      // 2. Create the Order
      const orderRes = await fetch(`${BASE_URL}/orders/`, {
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
      setBackendOrderId(orderId);

      if (!orderId || isNaN(orderId) || Number(orderId) <= 0) {
        console.error("orderId is invalid:", orderId);
        alert("Order creation failed. No valid order id returned.");
        setPlacing(false);
        return;
      }
      for (let item of cartData) {
        await fetch(`${BASE_URL}/orderitem/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            order: orderId,
            product: item.product_id,
            qty: item.quantity || 1,
            price: item.price,
          }),
        });
      }
      setOrderPlaced(true);
      setCartData([]);
    } catch (error) {
      console.error(error);
      alert("Order failed. Try again.");
    } finally {
      setPlacing(false);
    }
  };

  const handlePayment = (method) => {
    // Simulate payment success
    setCartData([]);
    setPaymentDone(true);
    alert(`Payment successful via ${method}!`);
    // Optionally: navigate("/orders");
  };

  // Defensive: don't render if not logged in
  if (!userContext || !userContext.login) {
    return null;
  }

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="glass-card mb-4 px-4 py-4 animate__animated animate__fadeInDown">
        <h3 className="mb-4 text-gradient">
          <i className="fa-solid fa-clipboard-check me-2"></i> Review & Place Order
        </h3>
        <ul className="list-group mb-4">
          {cartData.map((item, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between">
              <div>{item.title} × {item.quantity || 1}</div>
              <div>₹{(item.price || 0) * (item.quantity || 1)}</div>
            </li>
          ))}
        </ul>
        {paymentDone && (
          <div className="container py-5">
            <h3 className="mb-4">Payment Successful</h3>
            <div className="alert alert-success">Your order and payment have been completed!</div>
            <Link to="/orders" className="btn btn-primary">Go to My Orders</Link>
          </div>
        )}
        {!orderPlaced && !paymentDone && (
          <div className="d-flex justify-content-between mt-4">
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
        )}
        {orderPlaced && !paymentDone && (
          <div className="mt-4">
            <h5 className="mb-3">Choose Payment Method</h5>


            <button className="btn btn-info text-white" onClick={() => setShowPaypal(true)} disabled={showPaypal}>
              Pay with PayPal (Sandbox)
            </button>
            {showPaypal && (
              <div className="mt-3" ref={paypalRef}>
                <PayPalScriptProvider options={{ "client-id": "AbO-3I2Wg6U3W9TRTMVvu5OWhVNCx1dkYs8eDvWSqVDyfg2Li3lTYsN1wfmqRcmMGtJOryzo30Mtvl11", currency: "USD" }}>
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      // Filter out items with zero or negative price or quantity
                      const validItems = cartData
                        .filter(item => Number(item.price) > 0 && Number(item.quantity || 1) > 0)
                        .map(item => ({
                          name: item.title || "Item",
                          unit_amount: {
                            currency_code: "USD",
                            value: Number(item.price).toFixed(2)
                          },
                          quantity: String(item.quantity || 1)
                        }));

                      // Calculate item total
                      const itemTotal = validItems.reduce(
                        (sum, item) => sum + (parseFloat(item.unit_amount.value) * parseInt(item.quantity)),
                        0
                      );

                      // Ensure value is a string, >= 1.00, max 2 decimals, no commas, no leading zeros
                      let value = itemTotal.toFixed(2);
                      if (isNaN(value) || Number(value) < 1) value = "1.00";
                      value = value.replace(/^0+/, '').replace(/^\.|^$/, '1.00');

                      // Debug: log value and items to console
                      console.log("PayPal order value:", value, "items:", validItems);

                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: value,
                              currency_code: "USD",
                              breakdown: {
                                item_total: {
                                  currency_code: "USD",
                                  value: value
                                }
                              }
                            },
                            items: validItems
                          },
                        ],
                        application_context: {
                          shipping_preference: "NO_SHIPPING"
                        }
                      });
                    }}
                    onApprove={async (data, actions) => {
                      // If PayPal popup is stuck at "Things don’t appear to be working at the moment."
                      // but you see 201 OK in the network tab, the issue is with the sandbox buyer account or PayPal sandbox itself.
                      // Try the following:
                      // 1. Make sure you are using a sandbox BUYER account (not your developer/business account).
                      // 2. Log out of all PayPal accounts in your browser, then retry.
                      // 3. Use a different sandbox buyer account from https://developer.paypal.com/dashboard/accounts.
                      // 4. Clear browser cookies for sandbox.paypal.com and try again.
                      // 5. If the issue persists, wait and try later (PayPal sandbox is sometimes unreliable).

                      // The code below is correct and will work if the sandbox account is valid and PayPal is not having issues.
                      return actions.order.capture().then(async function(details) {
                        setPaymentDone(true);
                        alert("Payment successful via PayPal!");
                        console.log("PayPal payment details:", details);

                        if (backendOrderId) {
                          try {
                            // Ensure CSRF cookie is set before making PATCH request
                            // Make a GET request to your backend to set the CSRF cookie if not already set
                            function getCookie(name) {
                              let cookieValue = null;
                              if (document.cookie && document.cookie !== "") {
                                const cookies = document.cookie.split(";");
                                for (let i = 0; i < cookies.length; i++) {
                                  const cookie = cookies[i].trim();
                                  if (cookie.substring(0, name.length + 1) === (name + "=")) {
                                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                                    break;
                                  }
                                }
                              }
                              return cookieValue;
                            }
                            let csrftoken = getCookie("csrftoken");
                            if (!csrftoken) {
                              // Make a GET request to set the CSRF cookie
                              await fetch(`${BASE_URL}/orders/`, {
                                method: "GET",
                                credentials: "include",
                              });
                              csrftoken = getCookie("csrftoken");
                            }

                            await fetch(`${BASE_URL}/order-status/${backendOrderId}/`, {
                              method: "PATCH",
                              headers: {
                                "Content-Type": "application/json",
                                "X-CSRFToken": csrftoken,
                              },
                              credentials: "include",
                              body: JSON.stringify({ status: "Paid", paypal_id: details.id }),
                            });
                          } catch (err) {
                            console.error("Failed to update order status in backend:", err);
                          }
                        } else {
                          console.warn("No backendOrderId found, cannot update order status.");
                        }
                      });
                    }}
                    onError={(err) => {
                      // Show a more helpful message for sandbox issues
                      alert("PayPal payment failed. If you see 'Things don’t appear to be working at the moment.' in the PayPal window, make sure:\n\n- You are using a PayPal sandbox BUYER account (not your developer/business account)\n- The sandbox buyer account is confirmed and active\n- The PayPal sandbox is not experiencing issues (try again later)\n\nThis message is common in the sandbox if you use the wrong account or PayPal is having issues.");
                      console.error("PayPal onError event:", err);
                    }}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConfirmOrder;


