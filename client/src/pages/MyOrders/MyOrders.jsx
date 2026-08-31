import { useEffect, useState } from "react";
import API from "../../../api/productApi";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      const res = await API.get("/orders");

      const myOrders = res.data.filter(
        (order) =>
          order.customer?._id === user?.id ||
          order.customer?._id === user?._id ||
          order.customer === user?.id ||
          order.customer === user?._id
      );

      setOrders(myOrders);
    } catch (error) {
      console.log("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };
  const cancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );
  
    if (!confirmed) return;
  
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );
  
      await API.put(`/orders/${orderId}/cancel`, {
        customerId: user.id || user._id,
      });
  
      alert("Order cancelled successfully.");
  
      fetchMyOrders();
  
    } catch (error) {
      console.log(
        "CANCEL ORDER ERROR:",
        error
      );
  
      alert(
        error.response?.data?.message ||
        "Failed to cancel order."
      );
    }
  };
  if (!user) {
    return (
      <>
        <NavBar />

        <section className="my-orders-page">
          <h1>My Orders</h1>
          <p>Please log in to view your orders.</p>
        </section>

        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />

      <section className="my-orders-page">

        <h1>My Orders</h1>

        {loading ? (
          <p>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <div className="no-orders">
            <h2>No orders yet</h2>
            <p>Your orders will appear here after you make a purchase.</p>
          </div>
        ) : (
          <div className="orders-list">

            {orders.map((order) => (

              <div className="customer-order" key={order._id}>

                <div className="order-header">

                  <div>
                    <h3>
                      Order #{order._id.slice(-6).toUpperCase()}
                    </h3>

                    <p>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`order-status ${order.status
                      ?.toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {order.status}
                  </span>

                </div>


                <div className="order-items">

                  {order.items?.map((item) => (

                    <div
                      className="customer-order-item"
                      key={item._id}
                    >

                      {item.product?.image && (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                        />
                      )}

                      <div>
                        <h4>
                          {item.product?.name || "Product"}
                        </h4>

                        <p>
                          Quantity: {item.quantity}
                        </p>
                      </div>

                    </div>

                  ))}

                </div>


                <div className="order-footer">

  <div>
    <strong>Total</strong>

    <span>
      ₦
      {Number(
        order.totalAmount
      ).toLocaleString()}
    </span>
  </div>

  <div>
    <strong>Delivery Address</strong>

    <span>
      {order.address}
    </span>
  </div>

</div>

{/* CANCEL ORDER */}

{(order.status === "Pending" ||
  order.status === "Processing") && (

  <button
    className="cancel-order-btn"
    onClick={() =>
      cancelOrder(order._id)
    }
  >
    Cancel Order
  </button>

)}


              </div>

            ))}

          </div>
        )}

      </section>

    </>
  );
}

export default MyOrders;