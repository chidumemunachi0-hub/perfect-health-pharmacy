import React, { useState } from "react";
import "./Contact.css";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappNumber = "234XXXXXXXXXX";

    const text = `
Hello Perfect Health Pharmacy,

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
    `;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="contact-page">

      {/* Hero */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>
          Have a question? We'd love to hear from you.
        </p>
      </section>

      <section className="contact-container">

        {/* Contact Information */}
        <div className="contact-info">
          <h2>Get In Touch</h2>

          <p>
            Have questions about a product, your order, delivery, or anything
            else? Send us a message and we'll be happy to help.
          </p>

          <div className="contact-item">
  <span><FaMapMarkerAlt /></span>
  <div>
    <h3>Address</h3>
    <p>Lagos, Nigeria</p>
  </div>
</div>
<div className="contact-item">
  <span><FaPhoneAlt /></span>
  <div>
    <h3>Phone</h3>
    <p>+234 XXX XXX XXXX</p>
  </div>
</div>
<div className="contact-item">
  <span><FaEnvelope /></span>
  <div>
    <h3>Email</h3>
    <p>perfecthealthpharmacy@gmail.com</p>
  </div>
</div>

<div className="contact-item">
  <span><FaClock /></span>
  <div>
    <h3>Opening Hours</h3>
    <p>Monday – Saturday</p>
    <p>8:00 AM – 8:00 PM</p>
  </div>
</div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send Us A Message</h2>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="6"
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit">
              Send Message
            </button>

          </form>
        </div>

      </section>

    </div>
  );
};

export default Contact;