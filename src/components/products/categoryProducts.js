import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleProduct from '../common/SingleProduct';
import logo from '../../logo.svg'; // fixed path

function CategoryProducts(props) {
  const baseUrl = "http://127.0.0.1:8000/api";
  const [products, setProducts] = useState([]);
  const [totalResult, setTotalResults] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { category_id } = useParams();

  useEffect(() => {
    fetchData(`${baseUrl}/products/?category=${category_id}&page=${currentPage}`);
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
    <div className="container py-5">
      <h1 className="text-center mb-4">Products in {category_id}</h1>
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
            className="btn btn-outline-primary"
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`btn ${currentPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => handlePageClick(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          <button
            className="btn btn-outline-primary"
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryProducts;