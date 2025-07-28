// App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { CartContext, UserContext, WishlistContext } from './components/context';
import React, { useState, useRef, useEffect } from "react";
import Header from './components/common/Header';
import Home from './components/common/Home';
import Footer from './components/common/Footer';
import ConfirmOrder from './components/user/confirmOrder';
// Product & Category
import Categories from './components/products/categories';
import Categoryproduct from './components/products/categoryProducts';
import AllProducts from './components/products/AllProducts';
import ProductDetail from './components/products/ProductDetail';

// Cart
import Checkout from './components/cart/checkout';
import Wishlist from './components/cart/Wishlist';

// User
import Orders from './components/user/Orders';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Logout from './components/user/Logout';
import Dashboard from './components/user/Dashboard';
import Profile from './components/user/Profile';
import ChangePassword from './components/user/ChangePassword';
import Addresses from './components/user/Addresses';

// Seller
import SellerLogin from './components/seller/SellerLogin';
import SellerRegister from './components/seller/SellerRegister';
import SellerDashboard from './components/seller/SellerDashboard';
import SellerProducts from './components/seller/SellerProducts';
import SellerOrders from './components/seller/SellerOrders';
import SellerCustomers from './components/seller/SellerCustomers';
import SellerReports from './components/seller/SellerReports';
import SellerLogout from './components/seller/SellerLogout';
import SellerAddProduct from './components/seller/SellerAddProduct';
import Sellerchangepass from './components/seller/ChangePassword';
import SellerEditProduct from './components/seller/SellerEditProduct';
import Sellers from "./components/common/Sellers";
import VendorProducts from "./components/common/VendorProducts";
const checkCart = localStorage.getItem('cart');
const checkWishlist = localStorage.getItem('wishlist');
function App() {
  // User state for authentication
  const [userContext, setUserContext] = React.useState(() => {
    try {
      const stored = localStorage.getItem('userContext');
      // Always return an object with a login property
      if (stored) {
        const parsed = JSON.parse(stored);
        // Add customer_id from localStorage if not present
        if (typeof parsed === "object" && parsed !== null && "login" in parsed) {
          if (!parsed.customer_id) {
            const cid = localStorage.getItem('customer_id');
            if (cid) parsed.customer_id = parseInt(cid, 10);
          }
          return parsed;
        }
        return { login: false };
      }
      return { login: false };
    } catch {
      return { login: false };
    }
  });

  // Keep userContext in sync with localStorage
  React.useEffect(() => {
    if (userContext && typeof userContext === "object" && "login" in userContext) {
      localStorage.setItem('userContext', JSON.stringify(userContext));
    }
  }, [userContext]);

  const [cartData, setCartData] = useState(() => {
    try {
      const parsed = JSON.parse(checkCart);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Keep localStorage in sync with cartData
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartData));
  }, [cartData]);

  // Wishlist state (global, like cart)
  const [wishlistData, setWishlistData] = useState(() => {
    try {
      const parsed = JSON.parse(checkWishlist);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistData));
  }, [wishlistData]);

  return (
    <UserContext.Provider value={{ ...userContext, setUserContext }}>
      <CartContext.Provider value={[cartData, setCartData]}>
        <WishlistContext.Provider value={[wishlistData, setWishlistData]}>
          <Header />
          <Routes>
            <Route path='/confirm-order' element={<ConfirmOrder />} />
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<AllProducts />} />
            <Route path='/categories' element={<Categories />} />
            <Route path='/category/:category_slug/:category_id' element={<Categoryproduct />} />
            <Route path='/product/:product_id' element={<ProductDetail />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<Logout />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/changepassword' element={<ChangePassword />} />
            <Route path='/addresses' element={<Addresses />} />
            <Route path='/seller/login' element={<SellerLogin />} />
            <Route path='/seller/register' element={<SellerRegister />} />
            <Route path='/seller/dashboard' element={<SellerDashboard />} />
            <Route path='/seller/products' element={<SellerProducts />} />
            <Route path='/seller/orders' element={<SellerOrders />} />
            <Route path='/seller/customers' element={<SellerCustomers />} />
            <Route path='/seller/reports' element={<SellerReports />} />
            <Route path='/seller/logout' element={<SellerLogout />} />
            <Route path='/seller/products/add' element={<SellerAddProduct />} />
            <Route path='/seller/products/edit/:id' element={<SellerEditProduct />} />
            <Route path='/seller/changepassword' element={<Sellerchangepass />} />
            <Route path="/sellers" element={<Sellers />} />
            <Route path="/vendor/:vendorId/products" element={<VendorProducts />} />
          </Routes>
          <Footer />
        </WishlistContext.Provider>
      </CartContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
