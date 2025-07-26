import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context";

function SellerLogin() {
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: ''
  });
  const userContext = useContext(UserContext);

  const inputHandler = (event) => {
    setLoginFormData({
      ...loginFormData,
      [event.target.name]: event.target.value
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', loginFormData.username);
    formData.append('password', loginFormData.password);

    axios.post(baseUrl + 'vendor/login/', formData)
      .then(function (response) {
        if (response.data.bool === false) {
          setFormError(true);
          setErrorMsg(response.data.user);
        } else {
          const userData = {
            login: true,
            id: response.data.id, // use 'id' from API response for vendor id
            username: response.data.user,
            seller_id: response.data.id
          };
          if (userContext && typeof userContext.setUserContext === "function") {
            userContext.setUserContext(userData);
          }
          localStorage.setItem('userContext', JSON.stringify(userData));
          localStorage.setItem('seller_id', response.data.id);
          localStorage.setItem('seller_login', true);
          localStorage.setItem('seller_username', response.data.user);
          setFormError(false);
          setErrorMsg('');
          window.location.href = '/seller/dashboard';
        }
      })
      .catch(function (error) {
        setFormError(true);
        setErrorMsg("Login failed. Please try again.");
      });
  };

  const checkSeller = localStorage.getItem('seller_login');
  if (checkSeller) {
    window.location.href = '/seller/dashboard';
  }
  const buttonEnable = loginFormData.username !== '' && loginFormData.password !== '';

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
        <h2 className="mb-4 text-center"><i className="fa fa-sign-in-alt me-2"></i>Seller Login</h2>
        <form onSubmit={submitHandler}>
          {formError && <p className='text-danger'>{errorMsg}</p>}
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter username"
              value={loginFormData.username}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={loginFormData.password}
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-3 form-check">
            <p>Don't have an account? <Link to="/seller/register">Register</Link></p>
          </div>
          <button type="submit" disabled={!buttonEnable} className="btn btn-primary w-100 mb-2">Login</button>
        </form>
      </div>
    </div>
  );
}

export default SellerLogin;
