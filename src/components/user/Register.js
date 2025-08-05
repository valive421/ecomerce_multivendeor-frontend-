import {Link} from 'react-router-dom';
import axios from "axios";
import {useState} from "react";
import { BASE_URL } from "../context";
import './liquidGlass.css';

function Register() {
  const baseUrl = 'http://127.0.0.1:8000/api/';
  const [formError, setFormError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState(''); // Add successMsg state
  const [registerFormData, setRegisterFormData] = useState({
    "first_name": '',
    "last_name": '',
    "username": '',
    "email": '',
    "password": '',
    "mobile": ''
  });

  const inputHandler = (event) => {
    setRegisterFormData({
      ...registerFormData,
      [event.target.name]: event.target.value
    });
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

  axios.post(`${BASE_URL}/customer/register/`, formData)
    .then(function (response) {
      if (response.data.bool === false) {
        setFormError(true);
        setErrorMsg(response.data.user);
        setSuccessMsg('');
      } else {
        console.log(response.data);
        setRegisterFormData({
          "first_name": '',
          "last_name": '',
          "username": '',
          "email": '',
          "password": '',
          "mobile": ''
        });
        setFormError(false);
        setSuccessMsg('Registration successful!');
        setErrorMsg('');
        // Store customer_id in localStorage and userContext for immediate use
        if (response.data.id) {
          localStorage.setItem('customer_id', response.data.id);
          localStorage.setItem('userContext', JSON.stringify({
            login: true,
            id: response.data.id,
            username: registerFormData.username,
            customer_id: response.data.id
          }));
        }
        window.location.href = '/login'; // Redirect to login on success
      }
    });
};
  const buttonEnable = (registerFormData.first_name !== '') &&
    (registerFormData.last_name !== '') &&
    (registerFormData.username !== '') &&
    (registerFormData.email !== '') &&
    (registerFormData.password !== '');

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="glass-card shadow p-4 animate__animated animate__fadeInDown">
            {successMsg && <p className="alert alert-success">{successMsg}</p>}
            <form>
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
                <label className="form-label">mobile no</label>
                <input type="text" onChange={inputHandler} value={registerFormData.mobile} name="mobile" className="form-control" placeholder="Enter mobile no" />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" onChange={inputHandler} value={registerFormData.password} name="password" className="form-control" placeholder="Enter password" />
              </div>
              <button type="submit" disabled={!buttonEnable} onClick={submitHandler} className="btn btn-primary w-100 mb-2">Register</button>
            </form>
            <div className="text-center">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
