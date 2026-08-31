import "./WhyChooseUs.css";
import {
  FaCapsules,
  FaTruck,
  FaShieldAlt,
  FaUserMd,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaCapsules />,
      title: "Genuine Products",
      text: "We provide authentic medicines and trusted healthcare products.",
    },
    {
      icon: <FaTruck />,
      title: "Fast Delivery",
      text: "Quick and reliable delivery to your doorstep.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Trusted Service",
      text: "Quality service backed by experienced professionals.",
    },
    {
      icon: <FaUserMd />,
      title: "Expert Care",
      text: "Professional healthcare support whenever you need it.",
    },
  ];

  return (
    <section className="why-choose">
      <h2>Why Choose Perfect Health?</h2>
      <p>Your health and convenience are our priority.</p>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;