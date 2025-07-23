import React from "react";
import { Link } from "react-router-dom";

function Checkout() {
  // Demo cart items
  const cartItems = [
    {
      id: 1,
      slug: "django",
      name: "Django",
      price: 500,
      image: "https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg"
    },
    {
      id: 2,
      slug: "flask",
      name: "Flask",
      price: 500,
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg"
    },
    {
      id: 3,
      slug: "python",
      name: "Python",
      price: 500,
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
    },
    {
      id: 4,
      slug: "reactjs",
      name: "ReactJs",
      price: 500,
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
    }
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container py-5">
      <h3 className="mb-4">All Items ({cartItems.length})</h3>
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th style={{ width: "5%" }}>#</th>
            <th style={{ width: "60%" }}>Product</th>
            <th style={{ width: "20%" }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, idx) => (
            <tr key={item.id}>
              <td>{idx + 1}</td>
              <td>
                <div className="d-flex align-items-center gap-3">
                  <img src={item.image} alt={item.name} style={{ width: 40, height: 40, objectFit: "contain" }} />
                  <Link to={`/product/${item.slug}/${item.id}`}>{item.name}</Link>
                </div>
              </td>
              <td>Rs. {item.price}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={2} className="fw-bold text-end">Total</td>
            <td className="fw-bold">Rs. {total}</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex justify-content-between mt-4">
        <Link to="/products" className="btn btn-outline-primary">
          Continue Shopping
        </Link>
        <button className="btn btn-success">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default Checkout;