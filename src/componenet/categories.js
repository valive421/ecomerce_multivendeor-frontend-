import logo from '../logo.svg'; // Update the path if logo.svg is in src folder
// Make sure productDetails, categoryNames, sellers are imported or defined above
const categoryNames = ['Electronics', 'Fashion', 'Home & Living', 'Sports'];

function Categories() {
     return (
      <div>
        <h1>categories list</h1>
        <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
          <h3 className="fw-bold">Popular Categories</h3>
          <a href="#" className="btn btn-outline-light btn-sm rounded-pill">
            All Categories <i className="fa-solid fa-arrow-right-long ms-1"></i>
          </a>
        </div>
        <div className="row g-4">
          {categoryNames.map((name, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <div className="card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light">
                <img src={logo} className="card-img-top p-3 rounded-4" alt="Category" />
                <div className="card-body">
                  <h5 className="card-title fw-bold">{name}</h5>
                  <p className="card-text">Explore products</p>
                  <button className="btn btn-light w-100 rounded-pill">View Category</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
   )
}
export default Categories;