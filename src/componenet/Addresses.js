import React, { useState } from "react";

function Addresses() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      address: "123 Main St, City, Country",
      phone: "1234567890",
      isDefault: true
    },
    {
      id: 2,
      name: "Jane Smith",
      address: "456 Elm St, City, Country",
      phone: "9876543210",
      isDefault: false
    }
  ]);

  const [newAddress, setNewAddress] = useState({ name: "", address: "", phone: "" });

  function handleChange(e) {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  }

  function handleAdd(e) {
    e.preventDefault();
    if (newAddress.name && newAddress.address && newAddress.phone) {
      setAddresses([
        ...addresses,
        { ...newAddress, id: Date.now(), isDefault: false }
      ]);
      setNewAddress({ name: "", address: "", phone: "" });
    }
  }

  function handleRemove(id) {
    setAddresses(addresses.filter(addr => addr.id !== id));
  }

  function handleMarkDefault(id) {
    setAddresses(addresses.map(addr =>
      addr.id === id
        ? { ...addr, isDefault: true }
        : { ...addr, isDefault: false }
    ));
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Addresses</h2>
      <form className="mb-4" onSubmit={handleAdd} style={{ maxWidth: 500 }}>
        <div className="row g-2">
          <div className="col-md-4">
            <input
              name="name"
              className="form-control"
              placeholder="Name"
              value={newAddress.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-5">
            <input
              name="address"
              className="form-control"
              placeholder="Address"
              value={newAddress.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <input
              name="phone"
              className="form-control"
              placeholder="Phone"
              value={newAddress.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-1 d-grid">
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
                  {addr.name}
                  {addr.isDefault && (
                    <span className="badge bg-success ms-2">Default</span>
                  )}
                </div>
                <div className="small">{addr.address}</div>
                <div className="small text-muted">{addr.phone}</div>
              </div>
              <div className="d-flex flex-column align-items-end gap-2">
                {!addr.isDefault && (
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
  );
}

export default Addresses;
