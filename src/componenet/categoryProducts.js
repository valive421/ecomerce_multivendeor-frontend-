import { useParams, Link } from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';

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
            <SingleProduct product={prod} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;