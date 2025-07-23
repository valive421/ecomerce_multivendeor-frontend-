// App.js
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './componenet/Header';
import Home from './componenet/Home';
import Footer from './componenet/Footer';
import Categories from './componenet/categories';
import Categoryproduct from './componenet/categoryProducts';
import AllProducts from './componenet/AllProducts';
import ProductDetail from './componenet/ProductDetail';
import Checkout from './componenet/checkout';

//customer panel
import Orders from './componenet/Orders';
import Register from './componenet/Register';
import Login from './componenet/Login';
import Logout from './componenet/Logout';
import Dashboard from './componenet/Dashboard';
import Wishlist from './componenet/Wishlist';
import Profile from './componenet/Profile';
import ChangePassword from './componenet/ChangePassword';
import Addresses from './componenet/Addresses';

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
