import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function ProductDetail() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedPage, setRelatedPage] = useState(1);
  const [relatedTotal, setRelatedTotal] = useState(0);
  const [relatedPageSize, setRelatedPageSize] = useState(8);

  // Fetch main product by ID
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/product/${product_id}/`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [product_id]);

  // Recursively fetch all related products from paginated endpoint
  useEffect(() => {
    if (product && product.category && product.category.id) {
      setRelatedLoading(true);
      fetch(`http://127.0.0.1:8000/api/products/?category=${product.category.id}&page=${relatedPage}`)
        .then((response) => response.json())
        .then((data) => {
          const mapped = Array.isArray(data.data)
            ? data.data
                .filter(item => item.id !== product.id)
                .map(item => ({
                  id: item.id,
                  name: item.title,
                  price: item.price || 0,
                  logo: item.product_images?.[0]?.image || null,
                  category: item.category?.title || "",
                  category_id: item.category?.id || null,
                  vendor: item.vendor?.id || null,
                  detail: item.detail || "",
                }))
            : [];
          setRelatedProducts(mapped);
          setRelatedTotal(data.count || 0);
          if (Array.isArray(data.data) && data.data.length > 0) setRelatedPageSize(data.data.length);
          setRelatedLoading(false);
        });
    }
  }, [product, relatedPage]);

  if (!product) {
    return <div className="container py-5">Loading...</div>;
  }

  const images = product.product_images || [];
  const totalImages = images.length;

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-start">
        {/* Product Info */}
        <div className="col-md-5">
          <div className="card shadow-sm border-0 rounded-4 mb-3">
            {totalImages > 0 ? (
              <div className="position-relative">
                <img
                  src={images[currentImg].image || "https://via.placeholder.com/400x300?text=No+Image"}
                  alt={product.title + " " + (currentImg + 1)}
                  className="d-block w-100 rounded-4"
                  style={{ height: "300px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
                <button
                  className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
                  disabled={currentImg === 0}
                  onClick={() => setCurrentImg((i) => Math.max(i - 1, 0))}
                >
                  <span className="fa fa-chevron-left"></span>
                </button>
                <button
                  className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
                  disabled={currentImg === totalImages - 1}
                  onClick={() => setCurrentImg((i) => Math.min(i + 1, totalImages - 1))}
                >
                  <span className="fa fa-chevron-right"></span>
                </button>
                <div className="d-flex justify-content-center mt-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      className={`btn btn-sm mx-1 ${
                        idx === currentImg ? "btn-primary" : "btn-outline-secondary"
                      }`}
                      style={{ borderRadius: "50%", width: "16px", height: "16px", padding: 0 }}
                      onClick={() => setCurrentImg(idx)}
                    ></button>
                  ))}
                </div>
              </div>
            ) : (
              <img
                src="https://via.placeholder.com/400x300?text=No+Image"
                alt={product.title}
                className="card-img-top rounded-4"
                style={{ height: "300px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <h2 className="fw-bold mb-2">{product.title}</h2>
              {product.category && (
                <Link
                  to={`/category/${product.category.title.replace(/\s+/g, "-").toLowerCase()}/${product.category.id}`}
                  className="badge bg-primary mb-2 text-decoration-none"
                >
                  {product.category.title}
                </Link>
              )}
              <h5 className="mb-2 text-muted">
                ID: <span className="badge bg-secondary">{product.id}</span>
              </h5>
              <h3 className="text-success mb-3">${product.price}</h3>
              <div className="mb-3 d-flex flex-wrap gap-2">
                <button
                  className={`btn btn-primary ${inCart ? "disabled" : ""}`}
                  onClick={() => setInCart(true)}
                >
                  <i className="fa-solid fa-cart-plus me-1"></i>
                  {inCart ? "Added to Cart" : "Add to Cart"}
                </button>
                <button
                  className={`btn btn-outline-danger ${inWishlist ? "active" : ""}`}
                  onClick={() => setInWishlist((w) => !w)}
                >
                  <i className={`fa${inWishlist ? "s" : "r"} fa-heart me-1`}></i>
                  {inWishlist ? "Wishlisted" : "Add to Wishlist"}
                </button>
              </div>
              <p className="mb-2">
                <strong>Description:</strong> {product.detail}
              </p>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-header bg-secondary text-white fw-bold rounded-top-4">
              Vendor Info
            </div>
            <div className="card-body">
              {product.vendor ? (
                <table className="table table-sm table-borderless mb-0">
                  <tbody>
                    <tr><td>ID:</td><td>{product.vendor.id}</td></tr>
                    <tr><td>Address:</td><td>{product.vendor.address}</td></tr>
                    <tr><td>User:</td><td>{product.vendor.user}</td></tr>
                  </tbody>
                </table>
              ) : (
                <span className="text-muted">No vendor info</span>
              )}
            </div>
          </div>
        </div>

        {/* Ratings and Metadata */}
        <div className="col-md-7">
          <div className="card border-0 shadow-sm rounded-4 mb-3">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <span className="badge bg-info text-dark fs-5 px-3 py-2">Customer Reviews</span>
              </h5>
              <ul className="list-group list-group-flush">
                {product.product_ratings && product.product_ratings.length > 0 ? (
                  product.product_ratings.map((rating, idx) => {
                    const match = rating.match(/-(\d+)$/);
                    const stars = match ? parseInt(match[1], 10) : 0;
                    const text = match ? rating.replace(/-\d+$/, "") : rating;
                    return (
                      <li
                        className="list-group-item d-flex align-items-center bg-light rounded-3 shadow-sm mb-2"
                        key={idx}
                      >
                        <i className="fa-solid fa-comment-dots me-2 text-primary fs-4"></i>
                        <span className="flex-grow-1">{text}</span>
                        <span className="ms-2">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={
                                i < stars
                                  ? "fa-solid fa-star text-warning fs-5"
                                  : "fa-regular fa-star text-warning fs-5"
                              }
                            ></i>
                          ))}
                          <span className="ms-1 text-muted fw-bold">({stars})</span>
                        </span>
                      </li>
                    );
                  })
                ) : (
                  <li className="list-group-item text-muted bg-light rounded-3 shadow-sm">
                    No reviews yet.
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 mt-4">
            <div className="card-header bg-dark text-white fw-bold rounded-top-4">
              Product Meta Info
            </div>
            <div className="card-body">
              <table className="table table-sm table-striped mb-0">
                <tbody>
                  <tr><td>ID</td><td>{product.id}</td></tr>
                  <tr><td>Title</td><td>{product.title}</td></tr>
                  <tr><td>Detail</td><td>{product.detail}</td></tr>
                  <tr><td>Price</td><td>${product.price}</td></tr>
                  <tr><td>Category</td><td>{product.category?.title}</td></tr>
                  <tr><td>Vendor</td><td>{product.vendor?.address}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5 pt-4 border-top">
        <h4 className="mb-4">Related Products</h4>
        {relatedLoading ? (
          <div>Loading related products...</div>
        ) : (
          <>
            <div className="row g-4">
              {relatedProducts.length === 0 && <div>No related products found.</div>}
              {relatedProducts.map((prod) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
                  <div className="card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light">
                    <img
                      src={prod.logo || "https://via.placeholder.com/400x300?text=No+Image"}
                      className="card-img-top p-3 rounded-4"
                      alt={prod.name}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title fw-bold">{prod.name}</h5>
                      {prod.category && (
                        <span className="card-link d-block mb-1 text-decoration-underline text-light small">
                          {prod.category}
                        </span>
                      )}
                      {prod.price && <p className="card-text">Price: ${prod.price}</p>}
                      <Link to={`/product/${prod.id}`} className="btn btn-light w-100 mt-auto">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination for related products */}
            <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => setRelatedPage((p) => Math.max(p - 1, 1))}
                disabled={relatedPage === 1 || relatedLoading}
              >
                Previous
              </button>
              {[...Array(Math.ceil(relatedTotal / relatedPageSize))].map((_, idx) => (
                <button
                  key={idx + 1}
                  className={`btn ${relatedPage === idx + 1 ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setRelatedPage(idx + 1)}
                  disabled={relatedLoading}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                className="btn btn-outline-primary"
                onClick={() => setRelatedPage((p) => p + 1)}
                disabled={relatedPage === Math.ceil(relatedTotal / relatedPageSize) || relatedLoading}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
