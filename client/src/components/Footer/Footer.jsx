import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section footer-brand">
          <h2>Perfect Health Pharmacy</h2>

          <p>
            Shop genuine pharmaceutical products, cosmetics, provisions,
            and everything that helps you become comfortable.
          </p>

          <div className="social-icons">

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>

          </div>
        </div>


        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
        </div>


        {/* Categories */}
        <div className="footer-section">
          <h3>Categories</h3>

          <Link to="/shop?category=Pharmacy">
            Pharmaceuticals
          </Link>

          <Link to="/shop?category=Beauty">
            Cosmetics
          </Link>

          <Link to="/shop?category=Supermarket">
            Provisions
          </Link>

          <Link to="/shop?category=Personal%20Care">
            Personal Care
          </Link>

        </div>


        {/* Contact */}
        <div className="footer-section">

          <h3>Contact Us</h3>

          <p>📍 Lagos, Nigeria</p>

          <p>📞 +234 XXX XXX XXXX</p>

          <p>✉️ perfecthealthpharmacy@gmail.com</p>

          <p className="opening">
            <strong>Opening Hours</strong>
            <br />
            Mon – Sat: 8:00 AM – 8:00 PM
          </p>

        </div>

      </div>


      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Perfect Health Pharmacy.
          All rights reserved.
        </p>

        <div>
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms & Conditions</Link>
        </div>

      </div>

    </footer>
  );
};

export default Footer;