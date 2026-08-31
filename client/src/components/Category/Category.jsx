import "./Category.css";
import CategoryCard from "../CategoryCard/CategoryCard";
import { FaCapsules, FaShoppingBasket, FaBaby, FaSpa, FaPumpSoap, FaHome, FaStethoscope ,FaHeartbeat} from "react-icons/fa"

function Category() {

  const categories = [
    {
      icon: <FaCapsules />,
      title: "Pharmacy"
    },
    {
      icon: <FaShoppingBasket />,
      title: "Supermarket"
    },
    {
      icon: <FaBaby />,
      title: "Baby Care"
    },
    {
      icon: <FaSpa />,
      title: "Beauty"
    },
    {
      icon: <FaPumpSoap />,
      title: "Personal Care"
    }
  ];

  return (
    <section className="categories" id="categories">

      <h2>Shop by Category</h2>

      <p>
        Everything you need for your health and everyday life.
      </p>

      <div className="category-grid">

        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            icon={category.icon}
            title={category.title}
          />
        ))}

      </div>

    </section>
  );
}
export default Category;