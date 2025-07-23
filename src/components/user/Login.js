import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    // Example: console.log(email, password);
  };

  return (
    <div className="container py-5">
      <div className="row">

        <div className="col-md-9 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
          <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
            <h2 className="mb-4 text-center">
              <i className="fa fa-sign-in-alt me-2"></i>Login
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* The duplicate return block has been removed to fix the syntax error. */}

export default Login;
