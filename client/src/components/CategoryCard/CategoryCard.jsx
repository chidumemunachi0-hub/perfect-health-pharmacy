import "./CategoryCard.css";
import { Link } from "react-router-dom";

function CategoryCard({ icon, title }) {
  return (
    <Link
      to={`/shop?category=${encodeURIComponent(title)}`}
      className="category-link"
    >
      <div className="category-card">
        <div className="category-icon">{icon}</div>
        <h3>{title}</h3>
      </div>
    </Link>
  );
}

export default CategoryCard;