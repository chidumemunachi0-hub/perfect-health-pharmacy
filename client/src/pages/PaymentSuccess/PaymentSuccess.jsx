import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../../api/productApi";
import { CartContext } from "../../context/CartContext";
import "./PaymentSuccess.css";

function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { clearCart } = useContext(CartContext);

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const completeOrder = async () => {
      const reference = searchParams.get("reference");

      if (!reference) {
        setStatus("failed");
        setMessage("Payment reference was not found.");
        return;
      }

      try {
        // =========================
        // VERIFY PAYMENT
        // =========================

        await API.get(`/payment/verify/${reference}`);

        // =========================
        // GET PENDING ORDER
        // =========================

        const savedOrder =
          localStorage.getItem("pendingOrder");

        if (!savedOrder) {
          throw new Error(
            "Pending order information was not found."
          );
        }

        const pendingOrder =
  JSON.parse(savedOrder);

pendingOrder.paymentReference = reference;

      
// =========================
// CREATE ACTUAL ORDER
// =========================

const orderAlreadyCreated = localStorage.getItem(
  `orderCreated_${reference}`
);

if (orderAlreadyCreated) {
  navigate(
    `/order-success/${orderAlreadyCreated}`
  );
  return;
}

const orderResponse = await API.post(
  "/orders",
  pendingOrder
);

const newOrder = orderResponse.data;

// Remember that this payment reference
// has already created an order
localStorage.setItem(
  `orderCreated_${reference}`,
  newOrder._id
);
        // =========================
        // CLEAN UP
        // =========================

        localStorage.removeItem("pendingOrder");

        clearCart();

        // =========================
        // SUCCESS
        // =========================

        setStatus("success");
        setMessage(
          "Payment successful and your order has been placed! 🎉"
        );

        // Give the customer a moment
        // to see the success message
        setTimeout(() => {
          navigate(
            `/order-success/${newOrder._id}`
          );
        }, 1500);

      } catch (error) {
        console.log(
          "COMPLETE ORDER ERROR:",
          error
        );

        setStatus("failed");

        setMessage(
          error.response?.data?.message ||
            error.message ||
            "Something went wrong while completing your order."
        );
      }
    };

    completeOrder();
  }, [searchParams, clearCart, navigate]);

  return (
    <section className="payment-success-page">

      {status === "verifying" && (
        <>
          <div className="payment-icon">
            ⏳
          </div>

          <h1>Verifying Payment...</h1>

          <p>
            Please wait while we confirm your
            payment.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="payment-icon">
            ✅
          </div>

          <h1>Payment Successful!</h1>

          <p>{message}</p>
        </>
      )}

      {status === "failed" && (
        <>
          <div className="payment-icon">
            ❌
          </div>

          <h1>Payment Could Not Be Completed</h1>

          <p>{message}</p>

          <button
            onClick={() =>
              navigate("/checkout")
            }
          >
            Return to Checkout
          </button>
        </>
      )}

    </section>
  );
}

export default PaymentSuccess;