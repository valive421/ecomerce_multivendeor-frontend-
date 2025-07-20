import { useParams } from 'react-router-dom';
import logo from '../logo.svg';
import SingleProduct from './SingleProduct';

const productDetails = [
  { name: 'Wireless Headphones', category: 'Electronics', rating: 4.7, bought: 1200, price: 49.99, logo },
  { name: 'Smart Watch', category: 'Electronics', rating: 4.5, bought: 950, price: 59.99, logo },
  { name: 'Bluetooth Speaker', category: 'Electronics', rating: 4.6, bought: 800, price: 69.99, logo },
  { name: 'Fitness Tracker', category: 'Sports', rating: 4.4, bought: 700, price: 79.99, logo },
  { name: 'VR Headset', category: 'Electronics', rating: 4.8, bought: 500, price: 89.99, logo },
  { name: 'Portable SSD', category: 'Electronics', rating: 4.7, bought: 650, price: 99.99, logo },
  { name: 'Gaming Mouse', category: 'Electronics', rating: 4.5, bought: 900, price: 109.99, logo },
  { name: 'Action Camera', category: 'Sports', rating: 4.6, bought: 400, price: 119.99, logo },
];

function CategoryProducts() {
  const { category_slug } = useParams();

  const filteredProducts = productDetails.filter(
    (product) => product.category.toLowerCase() === category_slug.toLowerCase()
  );

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Products in {category_slug}</h1>
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod, i) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={i}>
              <SingleProduct product={prod} />
            </div>
          ))
        ) : (
          <p className="text-center text-light">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;