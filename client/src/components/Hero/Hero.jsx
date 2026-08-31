import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <p className="hero-tag">
          Welcome to Perfect Health
        </p>

        <h1>
          Your Trusted <span>Pharmacy</span> & Superstore
        </h1>

        <p className="hero-text">
          Shop genuine pharmaceutical products, cosmetics, provisions,
          and everything that helps you become comfortable.
        </p>

        <div className="hero-buttons">

          <Link to="/shop" className="shop-btn">
            Shop Now
          </Link>

 

        </div>

        <div className="hero-features">
          <div>🚚 Fast Delivery</div>
          <div>💊 Genuine Products</div>
          <div>⭐ Trusted Service</div>
        </div>

      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=700"
          alt="Pharmacy"
        />
      </div>
    </section>
  );
}

export default Hero;