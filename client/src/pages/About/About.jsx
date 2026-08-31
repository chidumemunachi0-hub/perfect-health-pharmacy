import React from "react";
import "./About.css";

import {
  FaHeart,
  FaCheckCircle,
  FaShoppingCart,
  FaUserFriends,
  FaTruck,
} from "react-icons/fa";

const About = () => {
  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <div>
          <h1>About Perfect Health Pharmacy</h1>
          <p>
            Your trusted destination for quality healthcare, personal care,
            cosmetics, and everyday essentials.
          </p>
        </div>
      </section>

      {/* About Us */}
      <section className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>

          <p>
            Perfect Health Pharmacy is committed to making quality healthcare
            products accessible and convenient for everyone.
          </p>

          <p>
            We provide genuine pharmaceutical products, cosmetics,
            personal-care products, provisions, and other everyday essentials.
          </p>

          <p>
            Whether you are shopping online or visiting us in person, our goal
            is to provide a simple, reliable, and comfortable shopping
            experience.
          </p>
        </div>

        <div className="about-card">
        <div className="about-icon">
  <FaHeart />
</div>          <h3>Your Health Matters</h3>
          <p>
            We believe that everyone deserves access to quality products and
            dependable service.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <h2>Why Choose Us?</h2>

        <div className="why-grid">
          <div className="why-card">
          <span><FaCheckCircle /></span>            <h3>Quality Products</h3>
            <p>
              We focus on providing genuine and reliable products.
            </p>
          </div>

          <div className="why-card">
          <span><FaShoppingCart /></span>            <h3>Easy Shopping</h3>
            <p>
              Browse our products and shop conveniently from anywhere.
            </p>
          </div>

          <div className="why-card">
          <span><FaUserFriends /></span>            <h3>Customer Care</h3>
            <p>
              We are committed to providing a friendly and helpful experience.
            </p>
          </div>

          <div className="why-card">
          <span><FaTruck /></span>            <h3>Convenient Delivery</h3>
            <p>
              Get your orders delivered conveniently to your location.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          To make healthcare and everyday essentials easier to access while
          providing excellent customer service and a convenient shopping
          experience.
        </p>
      </section>

    </div>
  );
};

export default About;