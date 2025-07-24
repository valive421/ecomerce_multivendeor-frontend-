// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from './components/context';
const checkCustomer = localStorage.getItem('customer_login');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext.Provider value={checkCustomer}>
        <App />
      </UserContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
