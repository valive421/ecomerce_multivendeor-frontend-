function Header() {
     return (
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3" href="#">
            <i className="fa-solid fa-store me-2"></i>bit Bazzar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Category</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
   )
}
export default Header;