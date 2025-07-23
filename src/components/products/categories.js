import React, { useEffect, useState } from "react";
import logo from '../../logo.svg'; // fixed path
import { Link } from 'react-router-dom';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10); // default, will auto-detect
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = (url = "http://127.0.0.1:8000/api/categories/", page = 1) => {
    setLoading(true);
    let fetchUrl = url;
    if (url === "http://127.0.0.1:8000/api/categories/") {
      fetchUrl = `${url}?page=${page}`;
    }
    fetch(fetchUrl)
      .then(res => res.json())
      .then(data => {
        setCategories(data.data || []);
        setCount(data.count || 0);
        if (data.data && data.data.length > 0) setPageSize(data.data.length);
        setNextPage(data.links?.next || null);
        setPrevPage(data.links?.previous || null);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories("http://127.0.0.1:8000/api/categories/", 1);
  }, []);

  const totalPages = Math.ceil(count / pageSize);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchCategories("http://127.0.0.1:8000/api/categories/", page);
  };

  return (
    <div>
      <h1>categories list</h1>
      <div className="d-flex justify-content-between align-items-center mt-5 mb-4"></div>
      <div className="row g-4">
        {categories.map((cat, i) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={cat.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light">
              <img src={logo} className="card-img-top p-3 rounded-4" alt="Category" />
              <div className="card-body">
                <h5 className="card-title fw-bold">{cat.title}</h5>
                <p className="card-text">{cat.detail}</p>
                <Link to={`/category/${cat.title.toLowerCase()}/${cat.id}`} className="btn btn-light w-100 rounded-pill">
                  View Category
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
        <button
          className="btn btn-outline-primary"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            className={`btn ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handlePageClick(idx + 1)}
            disabled={loading}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-primary"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Categories;