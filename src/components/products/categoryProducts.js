// This component displays all products for a specific category with pagination and glassmorphism UI.
// It fetches products from the backend API using the category_id from the URL.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleProduct from '../common/SingleProduct';
import logo from '../../logo.svg'; // fixed path
import { BASE_URL } from '../context';
import './liquidGlass.css';

function CategoryProducts(props) {
  const [products, setProducts] = useState([]);
  const [totalResult, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { category_id } = useParams();

  useEffect(() => {
    fetchData(`${BASE_URL}/products/?category=${category_id}&page=${currentPage}`);
  }, [category_id, currentPage]);

  function fetchData(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const mapped = Array.isArray(data.data)
          ? data.data.map(item => ({
              id: item.id,
              name: item.title,
              price: item.price || 0,
              logo: item.product_images && item.product_images.length > 0
                ? item.product_images[0].image
                : null,
              category: item.category?.title || "",
              category_id: item.category?.id || null,
              vendor: item.vendor?.id || null,
              detail: item.detail || "",
              sells: item.sells, // <-- add sells
            }))
          : [];
        setProducts(mapped);
        setTotalResults(data.count);
        if (Array.isArray(data.data) && data.data.length > 0) setPageSize(data.data.length);
      });
  }

  const totalPages = Math.ceil(totalResult / pageSize);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="glass-card mb-4 px-4 py-4 animate__animated animate__fadeInDown d-flex align-items-center justify-content-between">
        <h1 className="mb-0 fw-bold text-gradient" style={{ letterSpacing: "1px" }}>
          <i className="fa-solid fa-layer-group me-2"></i> Products in Category {category_id}
        </h1>
        <i className="fa-solid fa-cube fa-2x text-primary animate__animated animate__pulse animate__infinite"></i>
      </div>
      <div className="row g-4">
        {products && products.length > 0 ? (
          products.map((prod) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
              <SingleProduct product={prod} />
            </div>
          ))
        ) : (
          <div className="text-center w-100">No products found in this category.</div>
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
          <button
            className="btn btn-glass btn-outline-primary"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fa fa-chevron-left"></i> Previous
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`btn btn-glass ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => handlePageClick(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="btn btn-glass btn-outline-primary"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;