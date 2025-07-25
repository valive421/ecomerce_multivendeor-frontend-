import React from "react";
import SingleProduct from "../common/SingleProduct";
import { useEffect, useState } from "react";

function AllProducts() {
  const [AllProducts, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10); // default, will auto-detect
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = (url = "http://127.0.0.1:8000/api/products/", page = 1) => {
    setLoading(true);
    // If url is the base, add ?page=page
    let fetchUrl = url;
    if (url === "http://127.0.0.1:8000/api/products/") {
      fetchUrl = `${url}?page=${page}`;
    }
    fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.data.map((item) => ({
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
        }));
        setProducts(mapped);
        setNextPage(data.links?.next || null);
        setPrevPage(data.links?.previous || null);
        setCount(data.count || 0);
        // Detect page size from response
        if (data.data && data.data.length > 0) setPageSize(data.data.length);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts("http://127.0.0.1:8000/api/products/", 1);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(count / pageSize);

  // Handle page change
  const handlePageClick = (page) => {
    setCurrentPage(page);
    fetchProducts("http://127.0.0.1:8000/api/products/", page);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">All Products</h1>
      <div className="row g-4">
        {AllProducts.map((prod) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
            <SingleProduct product={prod} />
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
export default AllProducts;