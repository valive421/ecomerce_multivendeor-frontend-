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
function App() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient p-5 text-center text-white mb-4"
        style={{ background: 'linear-gradient(90deg,#0d6efd 0%,#6610f2 100%)' }}>
        <div className="container py-4">
          <h1 className="display-4 fw-bold mb-3">Welcome to bit Bazzar</h1>
          <p className="lead mb-4">Discover the latest gadgets, fashion, and more. Shop smart, shop bit Bazzar!</p>
          <a href="#" className="btn btn-light btn-lg shadow-sm px-4 py-2">
            <i className="fa-solid fa-bolt me-2"></i>Start Shopping
          </a>
        </div>
      </section>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:category_slug/:categoryid" element={<Categoryproduct />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
