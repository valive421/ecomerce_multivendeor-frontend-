import { useParams, Link } from 'react-router-dom';
import logo from '../logo.svg';

function CategoryProducts() {
  const { category_slug } = useParams();

  const demoProducts = [
    { id: 1, slug: "demo-product-1", name: "Demo Product 1", category: category_slug, rating: 4.5, bought: 100, price: 49.99, logo },
    { id: 2, slug: "demo-product-2", name: "Demo Product 2", category: category_slug, rating: 4.0, bought: 80, price: 59.99, logo },
    { id: 3, slug: "demo-product-3", name: "Demo Product 3", category: category_slug, rating: 4.8, bought: 120, price: 69.99, logo },
    { id: 4, slug: "demo-product-4", name: "Demo Product 4", category: category_slug, rating: 4.2, bought: 60, price: 39.99, logo },
  ];

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Products in {category_slug}</h1>
      <div className="row g-4">
        {demoProducts.map((prod) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={prod.id}>
            <div className="card h-100 shadow-sm border-0 rounded-4 bg-secondary text-light">
              <img src={prod.logo} className="card-img-top p-3 rounded-4" alt="Product" />
              <div className="card-body">
                <h5 className="card-title fw-bold">{prod.name}</h5>
                <span className="card-link d-block mb-1 text-decoration-underline text-light small">{prod.category}</span>
                <div className="mb-2">
                  {[...Array(5)].map((_, star) => (
                    <i
                      key={star}
                      className={
                        star < Math.round(prod.rating)
                          ? 'fa-solid fa-star text-warning'
                          : 'fa-regular fa-star text-warning'
                      }
                    ></i>
                  ))}
                  <span className="ms-1 text-light small">{prod.rating}</span>
                </div>
                <p className="card-text">Price: ${prod.price}</p>
                <p className="card-text"><i className="fa-solid fa-user-check me-1"></i>Bought: {prod.bought}</p>
                <Link to={`/product/${prod.slug}/${prod.id}`} className="btn btn-light w-100">Shop Now</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;