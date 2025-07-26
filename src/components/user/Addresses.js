import React, { useState, useEffect } from "react";
import Sidebar from "../common/Sidebar";

function Addresses() {
  const customerId = localStorage.getItem("customer_id");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState({ address: "", default_address: false });

  useEffect(() => {
    if (customerId) {
      fetch(`http://127.0.0.1:8000/api/address/?customer=${customerId}`)
        .then(res => res.json())
        .then(data => {
          setAddresses(data.data || []);
        });
    }
  }, [customerId]);

  function handleChange(e) {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  }

  function handleAdd(e) {
    e.preventDefault();
    if (newAddress.address && customerId) {
      fetch("http://127.0.0.1:8000/api/address/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: Number(customerId), // Ensure customer is sent as an integer
          address: newAddress.address,
          default_address: false
        })
      })
        .then(res => res.json())
        .then(addr => {
          setAddresses([...addresses, addr]);
          setNewAddress({ address: "", default_address: false });
        });
    }
  }

  function handleRemove(id) {
    fetch(`http://127.0.0.1:8000/api/address/${id}/`, {
      method: "DELETE"
    }).then(() => {
      setAddresses(addresses.filter(addr => addr.id !== id));
    });
  }

  function handleMarkDefault(id) {
    // Set all addresses to default_address: false, then set this one to true
    addresses.forEach(addr => {
      if (addr.id !== id && addr.default_address) {
        fetch(`http://127.0.0.1:8000/api/address/${addr.id}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ default_address: false })
        });
      }
    });
    fetch(`http://127.0.0.1:8000/api/address/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ default_address: true })
    })
      .then(res => res.json())
      .then(() => {
        setAddresses(addresses.map(addr =>
          addr.id === id
            ? { ...addr, default_address: true }
            : { ...addr, default_address: false }
        ));
      });
  }

  return (
    <div className="container py-5">
      <div className="row">
        <Sidebar />
        <div className="col-12 col-md-9">
          <h2 className="mb-4">My Addresses</h2>
          <form className="mb-4" onSubmit={handleAdd} style={{ maxWidth: 500 }}>
            <div className="row g-2">
              <div className="col-md-10">
                <input
                  name="address"
                  className="form-control"
                  placeholder="Address"
                  value={newAddress.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2 d-grid">
                <button type="submit" className="btn btn-success">Add</button>
              </div>
            </div>
          </form>
          <div className="row g-3">
            {addresses.map(addr => (
              <div className="col-12 col-md-6" key={addr.id}>
                <div className="card shadow-sm border-0 p-3 d-flex flex-row align-items-center justify-content-between">
                  <div>
                    <div className="fw-bold">
                      Address #{addr.id}
                      {addr.default_address && (
                        <span className="badge bg-success ms-2">Default</span>
                      )}
                    </div>
                    <div className="small">{addr.address}</div>
                  </div>
                  <div className="d-flex flex-column align-items-end gap-2">
                    {!addr.default_address && (
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => handleMarkDefault(addr.id)}
                      >
                        Mark Default
                      </button>
                    )}
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemove(addr.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addresses;

