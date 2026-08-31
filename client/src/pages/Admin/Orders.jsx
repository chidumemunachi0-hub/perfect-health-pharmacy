import { useEffect, useState } from "react";
import API from "../../../api/productApi";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.log("Failed to fetch orders:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, {
        status,
      });

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert("Failed to update order status.");
    }
  };

  return (
    <div className="dashboard-content">

      <div className="page-header">
        <h1>Orders</h1>
        <p>Manage customer orders and deliveries.</p>
      </div>

      <div className="orders-table-container">

        <table className="orders-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>
                <td colSpan="7" className="empty-orders">
                  No orders found.
                </td>
              </tr>

            ) : (

              orders.map((order) => (

                <tr key={order._id}>

                  <td>
                    #{order._id.slice(-6).toUpperCase()}
                  </td>

                  <td>
                    {order.customer?.name || "Unknown"}
                  </td>

                  <td>
                    {order.phone || "N/A"}
                  </td>

                  <td>
                    ₦
                    {Number(
                      order.totalAmount
                    ).toLocaleString()}
                  </td>

                  <td>

                    <select
                      className={`status-select ${order.status
                        ?.toLowerCase()
                        .replace(" ", "-")}`}
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>

                  <td>
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    <button
                      className="view-order-btn"
                      onClick={() =>
                        setSelectedOrder(order)
                      }
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>


      {/* ORDER DETAILS MODAL */}

      {selectedOrder && (

        <div
          className="order-modal-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="order-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="order-modal-header">

              <h2>
                Order #
                {selectedOrder._id
                  .slice(-6)
                  .toUpperCase()}
              </h2>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ×
              </button>

            </div>


            <div className="order-customer-details">

<h3>Customer Information</h3>

<p>
  <strong>Name:</strong>{" "}
  {selectedOrder.customer?.name || "Unknown"}
</p>

<p>
  <strong>Email:</strong>{" "}
  {selectedOrder.customer?.email || "N/A"}
</p>

<p>
  <strong>Phone:</strong>{" "}
  {selectedOrder.phone || "N/A"}
</p>

<p>
  <strong>Delivery Address:</strong>{" "}
  {selectedOrder.address || "N/A"}
</p>

<p>
  <strong>Delivery Method:</strong>{" "}
  {selectedOrder.delivery || "N/A"}
</p>

{selectedOrder.delivery === "Home Delivery" && (
  <>
    <p>
      <strong>Delivery Area:</strong>{" "}
      {selectedOrder.deliveryArea || "N/A"}
    </p>

    <p>
      <strong>Delivery Fee:</strong>{" "}
      ₦
      {Number(
        selectedOrder.deliveryFee || 0
      ).toLocaleString()}
    </p>
  </>
)}

</div>
            <div className="order-items">

              <h3>Ordered Products</h3>

              {selectedOrder.items?.map(
                (item) => (

                  <div
                    className="order-item"
                    key={item._id}
                  >

                    <div>
                      <strong>
                        {item.product?.name ||
                          "Product"}
                      </strong>

                      <p>
                        Quantity:{" "}
                        {item.quantity}
                      </p>
                    </div>

                    {item.product && (
                      <span>
                        ₦
                        {Number(
                          item.product.price
                        ).toLocaleString()}
                      </span>
                    )}

                  </div>

                )
              )}

            </div>


            <div className="order-total">

              <span>Total</span>

              <strong>
                ₦
                {Number(
                  selectedOrder.totalAmount
                ).toLocaleString()}
              </strong>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Orders;