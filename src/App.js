import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg'; // Sample product image
import Header from './componenet/Header'; // Sample header image

const categoryNames = ['Electronics', 'Fashion', 'Home & Living', 'Sports'];

const productDetails = [
  { name: 'Wireless Headphones', category: 'Electronics', rating: 4.7, bought: 1200 },
  { name: 'Smart Watch', category: 'Electronics', rating: 4.5, bought: 950 },
  { name: 'Bluetooth Speaker', category: 'Electronics', rating: 4.6, bought: 800 },
  { name: 'Fitness Tracker', category: 'Sports', rating: 4.4, bought: 700 },
  { name: 'VR Headset', category: 'Electronics', rating: 4.8, bought: 500 },
  { name: 'Portable SSD', category: 'Electronics', rating: 4.7, bought: 650 },
  { name: 'Gaming Mouse', category: 'Electronics', rating: 4.5, bought: 900 },
  { name: 'Action Camera', category: 'Sports', rating: 4.6, bought: 400 },
];

const sellers = [
  { name: 'TechGuru', rating: 4.9, totalSales: 3200 },
  { name: 'GadgetWorld', rating: 4.8, totalSales: 2800 },
  { name: 'FashionFiesta', rating: 4.7, totalSales: 2100 },
  { name: 'HomeEssence', rating: 4.6, totalSales: 1800 },
];

function App() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient p-5 text-center text-white mb-4" style={{background: 'linear-gradient(90deg,#0d6efd 0%,#6610f2 100%)'}}>
        <div className="container py-4">
          <h1 className="display-4 fw-bold mb-3">Welcome to bit Bazzar</h1>
          <p className="lead mb-4">Discover the latest gadgets, fashion, and more. Shop smart, shop bit Bazzar!</p>
          <a href="#" className="btn btn-light btn-lg shadow-sm px-4 py-2">
            <i className="fa-solid fa-bolt me-2"></i>Start Shopping
          </a>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-5 bg-light">
        <div className="container">
          {/* Latest Products */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-semibold"><i className="fa-solid fa-fire me-2 text-danger"></i>Latest Products</h3>
            <a href="#" className="btn btn-outline-primary btn-sm rounded-pill">
              View All <i className="fa-solid fa-arrow-right-long ms-1"></i>
            </a>
          </div>

          <div className="row g-4">
            {productDetails.map((prod, i) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
                <div className="card h-100 shadow-lg border-0 rounded-4 position-relative product-card">
                  <img src={logo} className="card-img-top p-3 rounded-4" alt="Product" />
                  <span className="badge bg-success position-absolute top-0 end-0 m-2">New</span>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{prod.name}</h5>
                    <a href="#" className="card-link d-block mb-1 text-decoration-underline text-primary small">{prod.category}</a>
                    <div className="mb-2">
                      {[...Array(5)].map((_, star) => (
                        <i key={star} className={star < Math.round(prod.rating) ? "fa-solid fa-star text-warning" : "fa-regular fa-star text-warning"}></i>
                      ))}
                      <span className="ms-1 text-muted small">{prod.rating}</span>
                    </div>
                    <p className="card-text text-muted mb-2">Price: ${(49 + i * 10).toFixed(2)}</p>
                    <p className="card-text text-muted mb-2"><i className="fa-solid fa-user-check me-1"></i>Bought: {prod.bought}</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-success btn-sm px-3 shadow-sm">
                        <i className="fas fa-cart-plus me-1"></i> Add to Cart
                      </button>
                      <button className="btn btn-outline-danger btn-sm px-3 shadow-sm">
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Categories */}
          <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
            <h3 className="fw-semibold"><i className="fa-solid fa-star me-2 text-warning"></i>Popular Categories</h3>
            <a href="#" className="btn btn-outline-warning btn-sm rounded-pill">
              All Categories <i className="fa-solid fa-arrow-right-long ms-1"></i>
            </a>
          </div>

          <div className="row g-4">
            {categoryNames.map((name, i) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
                <div className="card h-100 shadow-lg border-0 rounded-4 category-card">
                  <img src={logo} className="card-img-top p-3 rounded-4" alt="Category" />
                  <span className="badge bg-primary position-absolute top-0 end-0 m-2">Popular</span>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{name}</h5>
                    <p className="card-text text-muted mb-3">Explore products</p>
                    <button className="btn btn-primary btn-sm w-100 rounded-pill shadow-sm">
                      <i className="fa-solid fa-eye me-1"></i> View Category
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Sellers */}
          <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
            <h3 className="fw-semibold"><i className="fa-solid fa-user-tie me-2 text-info"></i>Popular Sellers</h3>
          </div>
          <div className="row g-4 mb-4">
            {sellers.map((seller, i) => (
              <div className="col-12 col-sm-6 col-md-3" key={i}>
                <div className="card h-100 shadow-sm border-0 rounded-4 text-center py-3">
                  <div className="mb-2">
                    <i className="fa-solid fa-user-circle fa-2x text-secondary"></i>
                  </div>
                  <h5 className="card-title fw-bold mb-1">{seller.name}</h5>
                  <div className="mb-2">
                    {[...Array(5)].map((_, star) => (
                      <i key={star} className={star < Math.round(seller.rating) ? "fa-solid fa-star text-warning" : "fa-regular fa-star text-warning"}></i>
                    ))}
                    <span className="ms-1 text-muted small">{seller.rating}</span>
                  </div>
                  <p className="card-text text-muted mb-0"><i className="fa-solid fa-bag-shopping me-1"></i>Total Sells: {seller.totalSales}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Popular Products */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-semibold"><i className="fa-solid fa-thumbs-up me-2 text-primary"></i>Popular Products</h3>
            <a href="#" className="btn btn-outline-success btn-sm rounded-pill">
              All Products <i className="fa-solid fa-arrow-right-long ms-1"></i>
            </a>
          </div>
          <div className="row g-4">
            {productDetails.slice(0, 4).map((prod, i) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
                <div className="card h-100 shadow-lg border-0 rounded-4 position-relative product-card">
                  <img src={logo} className="card-img-top p-3 rounded-4" alt="Product" />
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2">Hot</span>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{prod.name}</h5>
                    <a href="#" className="card-link d-block mb-1 text-decoration-underline text-primary small">{prod.category}</a>
                    <div className="mb-2">
                      {[...Array(5)].map((_, star) => (
                        <i key={star} className={star < Math.round(prod.rating) ? "fa-solid fa-star text-warning" : "fa-regular fa-star text-warning"}></i>
                      ))}
                      <span className="ms-1 text-muted small">{prod.rating}</span>
                    </div>
                    <p className="card-text text-muted mb-2">Price: ${(59 + i * 10).toFixed(2)}</p>
                    <p className="card-text text-muted mb-2"><i className="fa-solid fa-user-check me-1"></i>Bought: {prod.bought}</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-success btn-sm px-3 shadow-sm">
                        <i className="fas fa-cart-plus me-1"></i> Add to Cart
                      </button>
                      <button className="btn btn-outline-danger btn-sm px-3 shadow-sm">
                        <i className="fas fa-heart"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Footer */}
          <footer className="mt-5 pt-4 pb-2 border-top text-center text-muted bg-white rounded-4 shadow-sm">
            <div className="container">
              <p className="mb-1">&copy; {new Date().getFullYear()} bit Bazzar. All rights reserved.</p>
              <small>Made with <span className="text-danger">&#10084;</span> for you.</small>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

export default App;
