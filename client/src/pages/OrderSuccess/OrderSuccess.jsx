import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../../api/productApi";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./OrderSuccess.css";

function OrderSuccess() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.log("FETCH ORDER ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <>
        <NavBar />

        <section className="order-success-page">
          <p>Loading your order...</p>
        </section>

        <Footer />
      </>
    );
  }

  if (!order) {
    return (
      <>
        <NavBar />

        <section className="order-success-page">
          <h1>Order Not Found</h1>

          <p>
            We couldn't find this order.
          </p>

          <Link to="/shop">
            Continue Shopping
          </Link>
        </section>

        <Footer />
      </>
    );
  }

  const subtotal =
    order.items?.reduce(
      (sum, item) =>
        sum +
        Number(item.product?.price || 0) *
          Number(item.quantity || 0),
      0
    ) || 0;

  const deliveryFee = Number(
    order.deliveryFee || 0
  );

  return (
    <>
      <NavBar />

      <section className="order-success-page">

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-message">
          Thank you for shopping with Perfect
          Health Pharmacy 💚
        </p>

        <div className="order-success-card">

          {/* ORDER HEADER */}

          <div className="success-order-header">

            <h2>
              Order #
              {order._id
                .slice(-6)
                .toUpperCase()}
            </h2>

            <div className="success-statuses">

<span
  className={`success-payment-status ${
    order.paymentStatus?.toLowerCase()
  }`}
>
  Payment: {order.paymentStatus || "Pending"}
</span>

<span
  className={`success-status ${order.status
    ?.toLowerCase()
    .replace(" ", "-")}`}
>
  Order: {order.status}
</span>

</div>

          </div>


          {/* PRODUCTS */}

          <div className="success-products">

            <h3>Your Order</h3>

            {order.items?.map((item) => (

              <div
                className="success-product"
                key={item._id}
              >

                {item.product?.image ? (
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                  />
                ) : (
                  <div className="success-no-image">
                    No Image
                  </div>
                )}

                <div className="success-product-info">

                  <h4>
                    {item.product?.name ||
                      "Product"}
                  </h4>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                </div>

                <strong>
                  ₦
                  {(
                    Number(
                      item.product?.price || 0
                    ) *
                    Number(item.quantity || 0)
                  ).toLocaleString()}
                </strong>

              </div>

            ))}

          </div>


          {/* DELIVERY INFORMATION */}

          <div className="success-delivery">

            <h3>Delivery Information</h3>

            <p>
              <strong>Method:</strong>{" "}
              {order.delivery || "N/A"}
            </p>

            {order.delivery ===
              "Home Delivery" && (
              <>
                <p>
                  <strong>
                    Delivery Area:
                  </strong>{" "}
                  {order.deliveryArea ||
                    "N/A"}
                </p>

                <p>
                  <strong>
                    Address:
                  </strong>{" "}
                  {order.address || "N/A"}
                </p>

                <p>
                  <strong>
                    Delivery Fee:
                  </strong>{" "}
                  ₦
                  {deliveryFee.toLocaleString()}
                </p>
              </>
            )}

            <p>
              <strong>Phone:</strong>{" "}
              {order.phone || "N/A"}
            </p>

          </div>


          {/* TOTAL */}

          <div className="success-total">

            <div>
              <span>Subtotal</span>

              <strong>
                ₦{subtotal.toLocaleString()}
              </strong>
            </div>

            <div>
              <span>Delivery</span>

              <strong>
                {deliveryFee > 0
                  ? `₦${deliveryFee.toLocaleString()}`
                  : "Free"}
              </strong>
            </div>

            <div className="grand-total">

              <span>Total</span>

              <strong>
                ₦
                {Number(
                  order.totalAmount
                ).toLocaleString()}
              </strong>

            </div>

          </div>

        </div>


        {/* BUTTONS */}

        <div className="success-actions">

          <Link
            to="/my-orders"
            className="view-orders-btn"
          >
            View My Orders
          </Link>

          <Link
            to="/shop"
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </section>

    </>
  );
}

export default OrderSuccess;