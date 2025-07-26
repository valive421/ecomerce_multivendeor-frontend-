import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useRef } from "react";

function SellerRegister() {
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [registerFormData, setRegisterFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    mobile: '',
    address: '',
    profile_pic: null
  });
  const fileInputRef = useRef();

  const inputHandler = (event) => {
    const { name, value, files } = event.target;
    if (name === "profile_pic") {
      setRegisterFormData({
        ...registerFormData,
        profile_pic: files[0]
      });
    } else {
      setRegisterFormData({
        ...registerFormData,
        [name]: value
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('first_name', registerFormData.first_name);
    formData.append('last_name', registerFormData.last_name);
    formData.append('username', registerFormData.username);
    formData.append('email', registerFormData.email);
    formData.append('password', registerFormData.password);
    formData.append('mobile', registerFormData.mobile);
    formData.append('address', registerFormData.address);
    if (registerFormData.profile_pic) {
      formData.append('profile_pic', registerFormData.profile_pic);
    }

    axios.post(`${baseUrl}vendor/register/`, formData)
      .then(function (response) {
        if (response.data.bool === false) {
          setFormError(true);
          setErrorMsg(response.data.user);
          setSuccessMsg('');
        } else {
          setRegisterFormData({
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            mobile: '',
            address: '',
            profile_pic: null
          });
          setFormError(false);
          setSuccessMsg('Registration successful!');
          setErrorMsg('');
          if (response.data.vendor) {
            localStorage.setItem('seller_id', response.data.vendor);
            localStorage.setItem('userContext', JSON.stringify({
              login: true,
              id: response.data.vendor,
              username: registerFormData.username,
              seller_id: response.data.vendor
            }));
          }
          window.location.href = '/seller/login';
        }
      });
  };

  const buttonEnable =
    registerFormData.first_name.trim() !== '' &&
    registerFormData.last_name.trim() !== '' &&
    registerFormData.username.trim() !== '' &&
    registerFormData.email.trim() !== '' &&
    registerFormData.password.trim() !== '' &&
    registerFormData.mobile.trim() !== '' &&
    registerFormData.address.trim() !== '';

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
      <div className="card shadow p-4" style={{ maxWidth: 400, width: "100%" }}>
        {successMsg && <p className="alert alert-success">{successMsg}</p>}
        <form onSubmit={submitHandler}>
          {formError && (
            <div className="alert alert-danger" role="alert">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="alert alert-success" role="alert">
              {successMsg}
            </div>
          )}
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" onChange={inputHandler} value={registerFormData.first_name} name="first_name" className="form-control" placeholder="Enter first name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" onChange={inputHandler} value={registerFormData.last_name} name="last_name" className="form-control" placeholder="Enter last name" />
          </div>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input type="text" onChange={inputHandler} value={registerFormData.username} name="username" className="form-control" placeholder="Enter username" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" onChange={inputHandler} value={registerFormData.email} name="email" className="form-control" placeholder="Enter email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Mobile No</label>
            <input type="text" onChange={inputHandler} value={registerFormData.mobile} name="mobile" className="form-control" placeholder="Enter mobile no" />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" onChange={inputHandler} value={registerFormData.address} name="address" className="form-control" placeholder="Enter address" />
          </div>
          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              name="profile_pic"
              ref={fileInputRef}
              onChange={inputHandler}
            />
          </div>
          <button type="submit" disabled={false} className="btn btn-primary w-100 mb-2">Register</button>
        </form>
        <div className="text-center">
          Already have an account? <Link to="/seller/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SellerRegister;
