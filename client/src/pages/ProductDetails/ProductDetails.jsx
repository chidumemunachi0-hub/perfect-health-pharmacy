import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaShoppingCart } from "react-icons/fa";

import API from "../../../api/productApi";
import { CartContext } from "../../context/CartContext";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);

      setProduct(res.data);
    } catch (error) {
      console.log("Failed to fetch product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
      rating: product.rating,
      description: product.description,
      category: product.category,
      stock: product.stock,
      quantity,
    });

    alert("Product added to cart!");
  };

  if (loading) {
    return <h2 className="loading">Loading product...</h2>;
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>

        <button onClick={() => navigate("/shop")}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="product-details-page">

      <button
        className="back-btn"
        onClick={() => navigate("/shop")}
      >
        ← Back to Shop
      </button>

      <div className="product-details">

        <div className="product-image-section">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
            />
          ) : (
            <div className="no-product-image">
              No Image Available
            </div>
          )}
        </div>

        <div className="product-details-info">

          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="product-rating">
            <FaStar />
            <span>
              {product.rating || "No rating yet"}
            </span>
          </div>

          <h2 className="product-price">
            ₦{Number(product.price).toLocaleString()}
          </h2>

          <p className="product-description">
            {product.description || "No description available."}
          </p>

          <p className="stock">
            {product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}
          </p>

          {product.stock > 0 && (
            <>
              <div className="quantity-control">

                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(1, q - 1))
                  }
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(product.stock, q + 1)
                    )
                  }
                >
                  +
                </button>

              </div>

              <button
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <FaShoppingCart />
                Add to Cart
              </button>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;