import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext, WishlistContext } from '../context';
import './liquidGlass.css';

function ProductDetail() {
  const { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [CartButtonClick, setCartButtonClick] = useState(false);
  const [removeCartButtonClick, setremoveCartButtonClick] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedPage, setRelatedPage] = useState(1);
  const [relatedTotal, setRelatedTotal] = useState(0);
  const [relatedPageSize, setRelatedPageSize] = useState(8);
  const [cartData, setCartData] = useContext(CartContext);
  const [wishlistData, setWishlistData] = useContext(WishlistContext);
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(0);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState("");

  // Fetch main product by ID
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/product/${product_id}/`)
      .then((res) => res.json())
      .then(async (data) => {
        // Fetch profile pictures for each customer in product_ratings
        if (Array.isArray(data.product_ratings)) {
          const ratingsWithPP = await Promise.all(
            data.product_ratings.map(async (ratingStr) => {
              // Try to extract customer_id from rating string if backend provides it, else skip
              // If backend provides product_ratings as objects, use rating.customer.id
              // Here, we assume backend returns product_ratings as objects with customer info
              if (typeof ratingStr === "object" && ratingStr.customer && ratingStr.customer.id) {
                // Fetch profile picture for this customer
                try {
                  const res = await fetch(`http://127.0.0.1:8000/api/customer/${ratingStr.customer.id}/`);
                  const customerData = await res.json();
                  let pp = "";
                  if (Array.isArray(customerData.profilepic) && customerData.profilepic.length > 0) {
                    pp = customerData.profilepic[0].image;
                  }
                  return { ...ratingStr, customer_pp: pp };
                } catch {
                  return { ...ratingStr, customer_pp: "" };
                }
              }
              // If not object, just return as is
              return ratingStr;
            })
          );
          data.product_ratings = ratingsWithPP;
        }
        setProduct(data);
      });
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

  // Check if product is in cart
  useEffect(() => {
    if (product && cartData) {
      const exists = cartData.some(item => item.product_id === product.id);
      setCartButtonClick(exists);
    }
  }, [product, cartData]);

  // Check if product is in wishlist
  useEffect(() => {
    if (product && wishlistData) {
      const exists = wishlistData.some(item => item.product_id === product.id);
      setInWishlist(exists);
    }
  }, [product, wishlistData]);

  if (!product) {
    return <div className="container py-5">Loading...</div>;
  }

  const images = product.product_images || [];
  const totalImages = images.length;

  const cartbuttonhandler = () => {
    if (!product) return;
    const newItem = {
      product_id: product.id,
      title: product.title,
      price: product.price,
      image: product.product_images?.[0]?.image || "",
      // add more fields if needed
    };
    // Prevent duplicates
    if (!cartData.some(item => item.product_id === product.id)) {
      const updatedCart = [...cartData, newItem];
      setCartData(updatedCart);
    }
    setCartButtonClick(true);
  };

  const cartremovehandler = () => {
    if (!product) return;
    const updatedCart = cartData.filter(item => item.product_id !== product.id);
    setCartData(updatedCart);
    setCartButtonClick(false);
  };

  const wishlistHandler = () => {
    if (!product) return;
    const newItem = {
      product_id: product.id,
      title: product.title,
      price: product.price,
      image: product.product_images?.[0]?.image || "",
      // add more fields if needed
    };
    if (!wishlistData.some(item => item.product_id === product.id)) {
      setWishlistData([...wishlistData, newItem]);
      setInWishlist(true);
    } else {
      setWishlistData(wishlistData.filter(item => item.product_id !== product.id));
      setInWishlist(false);
    }
  };

  // Post review handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setReviewLoading(true);
    setReviewError("");
    setReviewSuccess("");
    if (!reviewText || !reviewStars) {
      setReviewError("Please enter review text and select a rating.");
      setReviewLoading(false);
      return;
    }
    // Get customer_id from localStorage
    const customerId = localStorage.getItem("customer_id");
    if (!customerId) {
      setReviewError("You must be logged in as a customer to post a review.");
      setReviewLoading(false);
      return;
    }
    fetch(`http://127.0.0.1:8000/api/product/${product_id}/add_review/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review: reviewText,
        rating: reviewStars,
        customer_id: customerId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setReviewSuccess("Review submitted successfully!");
          setReviewText("");
          setReviewStars(0);
          // Optionally, reload product to show new review
          fetch(`http://127.0.0.1:8000/api/product/${product_id}/`)
            .then((res) => res.json())
            .then((data) => setProduct(data));
        } else {
          setReviewError(data.error || "Failed to submit review.");
        }
      })
      .catch(() => setReviewError("Failed to submit review."))
      .finally(() => setReviewLoading(false));
  };

  return (
    <div className="container py-5 liquid-glass-bg" style={{ minHeight: "100vh" }}>
      <div className="row g-5 align-items-start">
        {/* Product Info */}
        <div className="col-md-5">
          <div className="glass-card shadow-sm border-0 rounded-4 mb-3 animate__animated animate__fadeInDown">
            <div className="position-relative">
              {totalImages > 0 ? (
                <>
                  <img
                    src={images[currentImg].image || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={product.title + " " + (currentImg + 1)}
                    className="d-block w-100 rounded-4"
                    style={{ height: "320px", objectFit: "cover", border: "2px solid #e3e3e3" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                  <button
                    className="btn btn-light position-absolute top-50 start-0 translate-middle-y shadow"
                    disabled={currentImg === 0}
                    onClick={() => setCurrentImg((i) => Math.max(i - 1, 0))}
                    style={{ zIndex: 2 }}
                  >
                    <span className="fa fa-chevron-left"></span>
                  </button>
                  <button
                    className="btn btn-light position-absolute top-50 end-0 translate-middle-y shadow"
                    disabled={currentImg === totalImages - 1}
                    onClick={() => setCurrentImg((i) => Math.min(i + 1, totalImages - 1))}
                    style={{ zIndex: 2 }}
                  >
                    <span className="fa fa-chevron-right"></span>
                  </button>
                  <div className="d-flex justify-content-center mt-2">
                    {images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img.image}
                        alt={`thumb-${idx}`}
                        className={`rounded-2 mx-1 border ${idx === currentImg ? "border-primary" : "border-light"}`}
                        style={{
                          width: 40,
                          height: 40,
                          objectFit: "cover",
                          cursor: "pointer",
                          boxShadow: idx === currentImg ? "0 0 0 2px #0d6efd" : "none"
                        }}
                        onClick={() => setCurrentImg(idx)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <img
                  src="https://via.placeholder.com/400x300?text=No+Image"
                  alt={product.title}
                  className="card-img-top rounded-4"
                  style={{ height: "320px", objectFit: "cover", border: "2px solid #e3e3e3" }}
                />
              )}
            </div>
            <div className="card-body">
              <h2 className="fw-bold mb-2 text-gradient">{product.title}</h2>
              {product.category && (
                <Link
                  to={`/category/${product.category.title.replace(/\s+/g, "-").toLowerCase()}/${product.category.id}`}
                  className="badge bg-primary mb-2 text-decoration-none fs-6"
                >
                  <i className="fa-solid fa-layer-group me-1"></i>
                  {product.category.title}
                </Link>
              )}
              <h5 className="mb-2 text-muted">
                <span className="badge bg-secondary">ID: {product.id}</span>
              </h5>
              <h3 className="text-success mb-3 fw-bold">
                <i className="fa-solid fa-indian-rupee-sign me-1"></i>
                {product.price}
              </h3>
              {/* Show sells if present */}
              {typeof product.sells !== "undefined" && (
                <div className="mb-2">
                  <span className="badge bg-warning text-dark fs-6">
                    <i className="fa-solid fa-fire me-1"></i>
                    Sold: {product.sells}
                  </span>
                </div>
              )}
              <div className="mb-3 d-flex flex-wrap gap-2">
                {!CartButtonClick ? (
                  <button
                    className="btn btn-primary btn-lg rounded-pill px-4"
                    onClick={cartbuttonhandler}
                  >
                    <i className="fa-solid fa-cart-plus me-1"></i>
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-danger btn-lg rounded-pill px-4"
                    onClick={cartremovehandler}
                  >
                    <i className="fa-solid fa-cart-arrow-down me-1"></i>
                    Remove from Cart
                  </button>
                )}
                <button
                  className={`btn btn-outline-danger btn-lg rounded-pill px-4 ${inWishlist ? "active" : ""}`}
                  onClick={wishlistHandler}
                >
                  <i className={`fa${inWishlist ? "s" : "r"} fa-heart me-1`}></i>
                  {inWishlist ? "Wishlisted" : "Add to Wishlist"}
                </button>
              </div>
              <p className="mb-2 fs-5">
                <strong>Description:</strong> {product.detail}
              </p>
            </div>
          </div>

          <div className="glass-card border-0 shadow-sm rounded-4 mt-4 animate__animated animate__fadeInUp">
            <div className="card-header bg-secondary text-white fw-bold rounded-top-4">
              Vendor Info
            </div>
            <div className="card-body">
              {product.vendor && product.vendor.user ? (
                <table className="table table-sm table-borderless mb-0">
                  <tbody>
                    <tr><td className="fw-bold">ID:</td><td>{product.vendor.user?.id}</td></tr>
                    <tr><td className="fw-bold">Username:</td><td>{product.vendor.user?.username}</td></tr>
                    <tr><td className="fw-bold">First Name:</td><td>{product.vendor.user?.first_name}</td></tr>
                    <tr><td className="fw-bold">Last Name:</td><td>{product.vendor.user?.last_name}</td></tr>
                    <tr><td className="fw-bold">Address:</td><td>{product.vendor.address}</td></tr>
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
          <div className="glass-card border-0 shadow-sm rounded-4 mb-3 animate__animated animate__fadeInDown">
            <div className="card-body">
              <h5 className="card-title mb-3">
                <span className="badge bg-info text-dark fs-5 px-3 py-2">Customer Reviews</span>
              </h5>
              {/* Review Form */}
              <form className="mb-4 glass-card p-3" style={{ background: "#f8f9fa" }} onSubmit={handleReviewSubmit}>
                <div className="mb-2">
                  <label className="form-label fw-bold">Your Review</label>
                  <textarea
                    className="form-control"
                    rows={2}
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    placeholder="Write your review..."
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label fw-bold me-2">Your Rating:</label>
                  {[1, 2, 3, 4, 5].map(star => (
                    <i
                      key={star}
                      className={`fa-star fa-lg me-1 ${reviewStars >= star ? "fa-solid text-warning" : "fa-regular text-warning"}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setReviewStars(star)}
                    ></i>
                  ))}
                </div>
                {reviewError && <div className="alert alert-danger py-1">{reviewError}</div>}
                {reviewSuccess && <div className="alert alert-success py-1">{reviewSuccess}</div>}
                <button className="btn btn-primary rounded-pill px-4" type="submit" disabled={reviewLoading}>
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
              <ul className="list-group list-group-flush">
                {product.product_ratings && product.product_ratings.length > 0 ? (
                  product.product_ratings.map((rating, idx) => {
                    // If backend returns object, use fields; else fallback to string parsing
                    let stars = 0, text = "", customerPP = "", customerName = "";
                    if (typeof rating === "object") {
                      stars = rating.rating || 0;
                      text = rating.reviews || "";
                      // Try to get profile pic from nested customer.profilepic
                      if (rating.customer && Array.isArray(rating.customer.profilepic) && rating.customer.profilepic.length > 0) {
                        customerPP = rating.customer.profilepic[0].image;
                      }
                      customerName = rating.customer?.user?.first_name || rating.customer?.user?.username || "Customer";
                    } else {
                      const match = rating.match(/-(\d+)$/);
                      stars = match ? parseInt(match[1], 10) : 0;
                      text = match ? rating.replace(/-\d+$/, "") : rating;
                    }
                    return (
                      <li
                        className="list-group-item d-flex align-items-center bg-light rounded-3 shadow-sm mb-2"
                        key={idx}
                      >
                        {customerPP ? (
                          <img
                            src={customerPP}
                            alt="Customer"
                            className="rounded-circle me-3"
                            style={{ width: 44, height: 44, objectFit: "cover", border: "2px solid #0d6efd" }}
                          />
                        ) : (
                          <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{ width: 44, height: 44, fontWeight: 700 }}>
                            <i className="fa fa-user"></i>
                          </div>
                        )}
                        <div className="flex-grow-1">
                          <span className="fw-bold me-2">{customerName}</span>
                          <span>{text}</span>
                        </div>
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

          <div className="glass-card border-0 shadow-sm rounded-4 mt-4 animate__animated animate__fadeInUp">
            <div className="card-header bg-dark text-white fw-bold rounded-top-4">
              Product Meta Info
            </div>
            <div className="card-body">
              <table className="table table-sm table-striped mb-0">
                <tbody>
                  <tr><td className="fw-bold">ID</td><td>{product.id}</td></tr>
                  <tr><td className="fw-bold">Title</td><td>{product.title}</td></tr>
                  <tr><td className="fw-bold">Detail</td><td>{product.detail}</td></tr>
                  <tr><td className="fw-bold">Price</td><td>${product.price}</td></tr>
                  <tr><td className="fw-bold">Category</td><td>{product.category?.title}</td></tr>
                  <tr><td className="fw-bold">Vendor</td><td>{product.vendor?.address}</td></tr>
                  {/* Show sells in meta info */}
                  {typeof product.sells !== "undefined" && (
                    <tr><td className="fw-bold">Sold</td><td>{product.sells}</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-5 pt-4 border-top">
        <h4 className="mb-4 text-gradient"><i className="fa-solid fa-link me-2"></i>Related Products</h4>
        {relatedLoading ? (
          <div>Loading related products...</div>
        ) : (
          <>
            <div className="row g-4">
              {relatedProducts.length === 0 && <div>No related products found.</div>}
              {relatedProducts.map((prod) => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
                  <div className="glass-card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light animate__animated animate__fadeInUp">
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


