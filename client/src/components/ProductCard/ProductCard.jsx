import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaStar, FaShoppingCart } from "react-icons/fa";

function ProductCard({
    id,
    image,
    name,
    price,
    rating,
    description,
    category,
    stock,
 } )
 





 {
  const { addToCart } = useContext(CartContext);
  return (
  
    <Link to={`/product/${id}`} className="product-link">
      <div className="product-card">
      {image ? (
  <img src={image} alt={name} />
) : (
  <div className="no-image">
    No Image
  </div>
)}
        <div className="product-info">
          <h3>{name}</h3>

          <div className="rating">
            <FaStar />
            <span>{rating}</span>
          </div>

          <h2>₦{price}</h2>

          <button
  onClick={(e) => {
    e.preventDefault();
    addToCart({
      id,
      image,
      name,
      price,
      rating,
      description,
      category,
      stock,
    });
  }}
>
  <FaShoppingCart />
  Add to Cart
</button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;