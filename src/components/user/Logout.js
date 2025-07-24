import React from "react";
import { Link } from "react-router-dom";

function Logout() {
localStorage.removeItem('customer_id');
localStorage.removeItem('customer_login');
localStorage.removeItem('customer_username');
window.location.href='/login';
}

export default Logout;
