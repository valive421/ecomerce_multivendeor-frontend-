import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../context';
import './liquidGlass.css';

function Logout() {
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (userContext && typeof userContext.setUserContext === "function") {
      userContext.setUserContext({ login: false });
    }
    localStorage.setItem('userContext', JSON.stringify({ login: false }));
    localStorage.removeItem('customer_id');
    localStorage.removeItem('customer_login');
    localStorage.removeItem('customer_username');
    window.location.href='/login';
  }, []);

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="glass-card shadow p-4 animate__animated animate__fadeInDown text-center">
            <h1 className="mb-4">Logged Out</h1>
            <p className="mb-4">You have been successfully logged out.</p>
            <Link to="/login" className="btn btn-primary">
              Login Again
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
