import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../api/productApi";
import { CartContext } from "../../context/CartContext";
import "./CheckOut.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

function CheckOut() {
  const navigate = useNavigate();

  const { cart, clearCart } = useContext(CartContext);

  const [deliveryAreas, setDeliveryAreas] = useState([]);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    delivery: "Home Delivery",
  });
  
  // Calculate subtotal
  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );
  
  // Calculate delivery fee
  const deliveryFee =
    formData.delivery === "Home Delivery" &&
    selectedDelivery
      ? Number(selectedDelivery.fee)
      : 0;
  
  // Calculate final total
  const total = subtotal + deliveryFee;
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (!user) {
      alert("Please log in first.");
      navigate("/login");
      return;
    }
  
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
  
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (
      formData.delivery === "Home Delivery" &&
      !selectedDelivery
    ) {
      alert("Please select a delivery area.");
      return;
    }
  
    if (!formData.email) {
      alert("Please enter your email address for payment.");
      return;
    }
  
    try {
      // =========================
      // INITIALIZE PAYSTACK
      // =========================
    
      const paymentResponse = await API.post(
        "/payment/initialize",
        {
          email: formData.email,
          amount: total,
        }
      );
    
      const {
        authorization_url,
        reference,
      } = paymentResponse.data;
    
      // =========================
      // SAVE PENDING ORDER
      // =========================
    
      const pendingOrder = {
        customer: user.id || user._id,
    
        items: cart.map((item) => ({
          product: item.id,
          quantity: Number(item.quantity),
        })),
    
        totalAmount: total,
    
        address: `${formData.address}, ${formData.city}`,
    
        phone: formData.phone,
    
        delivery: formData.delivery,
    
        deliveryArea:
          formData.delivery === "Home Delivery"
            ? selectedDelivery?.name || ""
            : "Pick Up In Store",
    
        deliveryFee:
          formData.delivery === "Home Delivery"
            ? deliveryFee
            : 0,
    
        paymentReference: reference,
    
        paymentStatus: "Pending",
      };
    
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify(pendingOrder)
      );
    
      // =========================
      // OPEN PAYSTACK
      // =========================
    
      window.location.href = authorization_url;
    
    } catch (error) {
      console.log("PAYMENT ERROR:", error);
    
      alert(
        error.response?.data?.message ||
          "Unable to start payment."
      );
    }
  };




  useEffect(() => {
    const fetchDeliveryAreas = async () => {
      try {
        const res = await API.get("/delivery");
  
        const activeAreas = res.data.filter(
          (area) => area.active
        );
  
        setDeliveryAreas(activeAreas);
  
        if (activeAreas.length > 0) {
          setSelectedDelivery(activeAreas[0]);
        }
      } catch (error) {
        console.error(
          "FETCH DELIVERY AREAS ERROR:",
          error
        );
      }
    };
  
    fetchDeliveryAreas();
  }, []);

  return (
    <>
      <NavBar />

      <section className="checkout-page">

        <h1>Checkout</h1>

        <div className="checkout-container">

          {/* =========================
              CUSTOMER INFORMATION
          ========================= */}

          <form
            className="checkout-form"
            onSubmit={handleSubmit}
          >

            <h2>Delivery Information</h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email (Optional)"
              value={formData.email}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <h3>Delivery Method</h3>

            <label className="delivery-option">
              <input
                type="radio"
                name="delivery"
                value="Home Delivery"
                checked={
                  formData.delivery ===
                  "Home Delivery"
                }
                onChange={handleChange}
              />

              <span>Home Delivery</span>
            </label>
            {formData.delivery === "Home Delivery" && (
  <div className="delivery-area">

    <label htmlFor="deliveryArea">
      Delivery Area
    </label>

    <select
      id="deliveryArea"
      value={selectedDelivery?._id || ""}
      onChange={(e) => {
        const area = deliveryAreas.find(
          (item) => item._id === e.target.value
        );

        setSelectedDelivery(area);
      }}
    >

      <option value="">
        Select delivery area
      </option>

      {deliveryAreas.map((area) => (
        <option
          key={area._id}
          value={area._id}
        >
          {area.name} — ₦
          {Number(area.fee).toLocaleString()}
        </option>
      ))}

    </select>

    {selectedDelivery && (
      <p className="selected-delivery-fee">
        Delivery fee: ₦
        {Number(
          selectedDelivery.fee
        ).toLocaleString()}
      </p>
    )}

  </div>
)}

            <label className="delivery-option">
              <input
                type="radio"
                name="delivery"
                value="Pick Up In Store"
                checked={
                  formData.delivery ===
                  "Pick Up In Store"
                }
                onChange={handleChange}
              />

              <span>Pick Up In Store</span>
            </label>

            <button
              type="submit"
              className="place-order-btn"
            >
              Place Order
            </button>

          </form>


          {/* =========================
              ORDER SUMMARY
          ========================= */}

          <div className="checkout-summary">

            <h2>Order Summary</h2>

            <div className="summary-items">

              {cart.map((item) => (

                <div
                  className="summary-item"
                  key={item.id}
                >

                  <div className="summary-image">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <div className="no-image">
                        No Image
                      </div>
                    )}

                  </div>

                  <div className="summary-info">

                    <h4>
                      {item.name}
                    </h4>

                    <p>
                      ₦
                      {Number(
                        item.price
                      ).toLocaleString()}
                      {" "}× {item.quantity}
                    </p>

                  </div>

                  <strong>
                    ₦
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toLocaleString()}
                  </strong>

                </div>

              ))}

            </div>


            {/* TOTAL */}
            <div className="summary-total">

<div className="summary-row">
  <span>Subtotal</span>

  <strong>
    ₦{subtotal.toLocaleString()}
  </strong>
</div>

<div className="summary-row">
  <span>Delivery</span>

  <strong>
    {deliveryFee > 0
      ? `₦${deliveryFee.toLocaleString()}`
      : "Free"}
  </strong>
</div>

<div className="summary-grand-total">
  <span>Total</span>

  <strong>
    ₦{total.toLocaleString()}
  </strong>
</div>

</div>

          </div>

        </div>

      </section>

    </>
  );
}

export default CheckOut;