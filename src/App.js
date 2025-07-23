// App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Home from './components/common/Home';
import Footer from './components/common/Footer';

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

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:category_slug/:category_id' element={<Categoryproduct />} />
        <Route path='/product/:product_slug/:product_id' element={<ProductDetail />} />
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
      </Routes>
      <Footer />
    </>
  );
}

export default App;
