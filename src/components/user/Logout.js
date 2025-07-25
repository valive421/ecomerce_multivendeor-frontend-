import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from '../context';

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
}

export default Logout;
