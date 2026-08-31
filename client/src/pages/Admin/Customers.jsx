import { useEffect, useState } from "react";
import API from "../../../api/productApi";
import "./Customers.css";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);
const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/users");
      setCustomers(res.data);
    } catch (error) {
      console.log("Failed to fetch customers:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/users/${id}`);

      alert("Customer deleted successfully.");

      fetchCustomers();

      if (selectedCustomer?._id === id) {
        setSelectedCustomer(null);
      }
    } catch (error) {
      console.log("Delete customer error:", error);
      alert("Failed to delete customer.");
    }
  };
  const handleDeleteCustomer = async () => {
    if (!customerToDelete) return;
  
    try {
      setDeleting(true);
  
      await API.delete(`/users/${customerToDelete._id}`);
  
      alert("Customer deleted successfully.");
  
      setCustomers((prevCustomers) =>
        prevCustomers.filter(
          (customer) => customer._id !== customerToDelete._id
        )
      );
  
      setCustomerToDelete(null);
  
    } catch (error) {
      console.log("DELETE CUSTOMER ERROR:", error);
  
      alert(
        error.response?.data?.message ||
        "Failed to delete customer."
      );
  
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="dashboard-content">

      <div className="page-header">
        <h1>Customers</h1>
      </div>

      <div className="customers-table-container">

        <table className="customers-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {customers.length === 0 ? (

              <tr>
                <td colSpan="7">
                  No customers found.
                </td>
              </tr>

            ) : (

              customers.map((customer) => (

                <tr key={customer._id}>

                  <td>{customer.name}</td>

                  <td>{customer.email}</td>

                  <td>
                    {customer.phone || "N/A"}
                  </td>

                  <td>
                    {customer.orders?.length || 0}
                  </td>

                  <td>
                    ₦{(customer.totalSpent || 0).toLocaleString()}
                  </td>

                  <td>
                    {new Date(
                      customer.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="customer-actions">

                    <button
                      className="view-btn"
                      onClick={() =>
                        setSelectedCustomer(customer)
                      }
                    >
                      View
                    </button>

                    <button
  className="delete-btn"
  onClick={() => setCustomerToDelete(customer)}
>
  Delete
</button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {customerToDelete && (
  <div className="delete-modal-overlay">

    <div className="delete-modal">

      <h2>Delete Customer?</h2>

      <p>
        Are you sure you want to delete{" "}
        <strong>{customerToDelete.name}</strong>?
      </p>

      <p className="delete-warning">
        This will also delete all orders belonging
        to this customer.
      </p>

      <div className="delete-modal-actions">

        <button
          className="cancel-delete-btn"
          onClick={() => setCustomerToDelete(null)}
          disabled={deleting}
        >
          Cancel
        </button>

        <button
          className="confirm-delete-btn"
          onClick={handleDeleteCustomer}
          disabled={deleting}
        >
          {deleting ? "Deleting..." : "Delete Customer"}
        </button>

      </div>

    </div>

  </div>
)}


      {/* =========================
          CUSTOMER DETAILS MODAL
      ========================= */}

      {selectedCustomer && (

        <div
          className="customer-modal-overlay"
          onClick={() => setSelectedCustomer(null)}
        >

          <div
            className="customer-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="customer-modal-header">

              <h2>
                Customer Details
              </h2>

              <button
                className="modal-close-btn"
                onClick={() =>
                  setSelectedCustomer(null)
                }
              >
                ✕
              </button>

            </div>


            {/* CUSTOMER INFORMATION */}

            <div className="customer-info">

              <h3>
                {selectedCustomer.name}
              </h3>

              <p>
                <strong>Email:</strong>{" "}
                {selectedCustomer.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {selectedCustomer.phone || "N/A"}
              </p>

              <p>
                <strong>Joined:</strong>{" "}
                {new Date(
                  selectedCustomer.createdAt
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Total Orders:</strong>{" "}
                {selectedCustomer.orders?.length || 0}
              </p>

              <p>
                <strong>Total Spent:</strong>{" "}
                ₦
                {(selectedCustomer.totalSpent || 0)
                  .toLocaleString()}
              </p>

            </div>


            {/* ORDERS */}

            <div className="customer-orders">

              <h3>
                Orders
              </h3>

              {!selectedCustomer.orders ||
              selectedCustomer.orders.length === 0 ? (

                <p className="no-orders">
                  This customer has no orders yet.
                </p>

              ) : (

                selectedCustomer.orders.map((order) => (

                  <div
                    className="customer-order"
                    key={order._id}
                  >

                    <div className="order-top">

                      <strong>
                        Order #{order._id.slice(-6)}
                      </strong>

                      <span
                        className={`order-status ${order.status
                          ?.toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {order.status}
                      </span>

                    </div>


                    <p>
                      <strong>Amount:</strong>{" "}
                      ₦{order.totalAmount.toLocaleString()}
                    </p>

                    <p>
                      <strong>Phone:</strong>{" "}
                      {order.phone}
                    </p>

                    <p>
                      <strong>Address:</strong>{" "}
                      {order.address}
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>


                    {/* ORDER ITEMS */}

                    <div className="order-items">

                      <strong>
                        Items:
                      </strong>

                      {order.items?.map((item, index) => (

                        <div
                          className="order-item"
                          key={item._id || index}
                        >

                          <span>
                            {item.product?.name ||
                              "Product"}
                          </span>

                          <span>
                            × {item.quantity}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Customers;