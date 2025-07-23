import React, { useState } from "react";
import { useParams } from "react-router-dom";
import logo from "../../logo.svg";
import SingleProduct from "../common/SingleProduct";

function ProductDetail() {
  const { product_slug, product_id } = useParams();
  const [inCart, setInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  // Demo product with multiple images for carousel
  const product = {
    id: product_id,
    slug: product_slug,
    name: `Demo Product ${product_id}`,
    category: "Demo Category",
    seller: "Demo Seller",
    rating: 4.5,
    reviews: 44,
    bought: 900,
    price: 109.99,
    logo,
    images: [
      "https://via.placeholder.com/400x300?text=Demo+Product+1",
      "https://via.placeholder.com/400x300?text=Demo+Product+2",
      "https://via.placeholder.com/400x300?text=Demo+Product+3"
    ],
    description: "This is a demo product description. Replace with real data later."
  };

  const relatedProducts = [
    {
      id: 2,
      slug: "demo-product-2",
      name: "Demo Related Product 2",
      category: "Demo Category",
      rating: 4.2,
      bought: 120,
      price: 99.99,
      logo,
      image: "https://via.placeholder.com/400x300?text=Related+1"
    },
    {
      id: 3,
      slug: "demo-product-3",
      name: "Demo Related Product 3",
      category: "Demo Category",
      rating: 4.1,
      bought: 80,
      price: 79.99,
      logo,
      image: "https://via.placeholder.com/400x300?text=Related+2"
    },
    {
      id: 4,
      slug: "demo-product-4",
      name: "Demo Related Product 4",
      category: "Demo Category",
      rating: 4.0,
      bought: 60,
      price: 59.99,
      logo,
      image: "https://via.placeholder.com/400x300?text=Related+3"
    }
  ];

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-start">
        <div className="col-md-5">
          <div className="bg-white rounded-4 shadow-sm p-3 mb-3">
            {/* Bootstrap Carousel for product images */}
            <div id="productImagesCarousel" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    data-bs-target="#productImagesCarousel"
                    data-bs-slide-to={idx}
                    className={idx === 0 ? "active" : ""}
                    aria-current={idx === 0 ? "true" : undefined}
                    aria-label={`Slide ${idx + 1}`}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner rounded-4">
                {product.images.map((img, idx) => (
                  <div className={`carousel-item${idx === 0 ? " active" : ""}`} key={idx}>
                    <img
                      src={img}
                      alt={product.name + " " + (idx + 1)}
                      className="d-block w-100"
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#productImagesCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#productImagesCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <h2 className="fw-bold mb-2">{product.name}</h2>
          <div className="mb-2">
            <span className="badge bg-primary me-2">{product.category}</span>
            <span className="badge bg-secondary">Seller: {product.seller}</span>
          </div>
          <div className="mb-2 d-flex align-items-center">
            {[...Array(5)].map((_, star) => (
              <i
                key={star}
                className={
                  star < Math.round(product.rating)
                    ? "fa-solid fa-star text-warning"
                    : "fa-regular fa-star text-warning"
                }
              ></i>
            ))}
            <span className="ms-2">{product.rating} ({product.reviews} reviews)</span>
          </div>
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
          <p className="mb-2"><strong>Bought:</strong> {product.bought} times</p>
          <p className="mb-4">{product.description}</p>
          <hr />
          <h5 className="mb-3">Customer Reviews</h5>
          <ul className="list-unstyled">
            <li className="mb-3">
              <strong>Jane Doe</strong> <span className="text-warning">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <br />
              <small>Great product! Highly recommend.</small>
            </li>
            <li>
              <strong>John Smith</strong> <span className="text-warning">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
              <br />
              <small>Good value for money.</small>
            </li>
          </ul>
        </div>
      </div>
      {/* Demo Related Products at the bottom */}
      <div className="mt-5 pt-4 border-top">
        <h4 className="mb-4">Related Products</h4>
        <div className="row g-4">
          {relatedProducts.slice(0, 3).map((rel) => (
            <div className="col-12 col-sm-6 col-md-4" key={rel.id}>
              <SingleProduct product={rel} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

