// This component displays a list of all product categories with pagination.
// It fetches category data from the backend API and provides links to each category's product list.

import React, { useState, useEffect } from "react";
import logo from '../../logo.svg'; // fixed path
import { Link } from 'react-router-dom';
import { BASE_URL } from '../context';
import './liquidGlass.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10); // default, will auto-detect
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCategories = (url = `${BASE_URL}/categories/`, page = 1) => {
    setLoading(true);
    let fetchUrl = url;
    if (url === `${BASE_URL}/categories/`) {
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
    fetchCategories(`${BASE_URL}/categories/`, 1);
  }, []);

  const totalPages = Math.ceil(count / pageSize);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchCategories(`${BASE_URL}/categories/`, page);
  };

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="glass-card mb-4 px-4 py-4 animate__animated animate__fadeInDown d-flex align-items-center justify-content-between">
        <h1 className="mb-0 fw-bold text-gradient" style={{ letterSpacing: "1px" }}>
          <i className="fa-solid fa-layer-group me-2"></i> Categories List
        </h1>
        <i className="fa-solid fa-layer-group fa-2x text-primary animate__animated animate__pulse animate__infinite"></i>
      </div>
      <div className="row g-4">
        {categories.map((cat, i) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={cat.id}>
            <div className="glass-card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light animate__animated animate__fadeInUp"
              style={{ minHeight: 320, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <img src={logo} className="card-img-top p-3 rounded-4" alt="Category" style={{ height: 120, objectFit: "contain" }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-gradient">{cat.title}</h5>
                <p className="card-text">{cat.detail}</p>
                <Link to={`/category/${cat.title.toLowerCase()}/${cat.id}`} className="btn btn-glass btn-light w-100 rounded-pill mt-auto">
                  <i className="fa-solid fa-eye me-1"></i> View Category
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
        <button
          className="btn btn-glass btn-outline-primary"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1 || loading}
        >
          <i className="fa fa-chevron-left"></i> Previous
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            className={`btn btn-glass ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handlePageClick(idx + 1)}
            disabled={loading}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="btn btn-glass btn-outline-primary"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
        >
          Next <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Categories;