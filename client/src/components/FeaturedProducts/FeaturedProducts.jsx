import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";
import ProductCard from "../ProductCard/ProductCard";
import API from "../../../api/productApi";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get("/products");

        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="featured">

      <div className="featured-header">
        <div>
          <h2>Featured Products</h2>
          <p>Explore some of our available products.</p>
        </div>
      </div>

      {loading ? (
        <p className="featured-message">
          Loading products...
        </p>
      ) : products.length === 0 ? (
        <p className="featured-message">
          No products available yet.
        </p>
      ) : (
        <>
          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                rating={product.rating}
                description={product.description}
                category={product.category}
                stock={product.stock}
              />
            ))}
          </div>

          <div className="featured-button">
            <Link to="/shop">
              View All Products
              <span>→</span>
            </Link>
          </div>
        </>
      )}

    </section>
  );
}

export default FeaturedProducts;