import User from "../models/User.js";
import Order from "../models/Order.js";

// GET ALL CUSTOMERS
export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find(
      { role: "customer" },
      "-password"
    ).sort({ createdAt: -1 });

    // Add order information to each customer
    const customersWithOrders = await Promise.all(
      customers.map(async (customer) => {
        const orders = await Order.find({
          customer: customer._id,
        });

        const totalSpent = orders.reduce(
          (total, order) => total + order.totalAmount,
          0
        );

        return {
          ...customer.toObject(),
          orders: orders,
          totalSpent: totalSpent,
        };
      })
    );

    res.status(200).json(customersWithOrders);

  } catch (error) {
    console.log("GET CUSTOMERS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
};


// DELETE CUSTOMER
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await User.findOneAndDelete({
      _id: req.params.id,
      role: "customer",
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Optional:
    // Delete the customer's orders too
    await Order.deleteMany({
      customer: req.params.id,
    });

    res.status(200).json({
      message: "Customer deleted successfully",
    });

  } catch (error) {
    console.log("DELETE CUSTOMER ERROR:", error);

    res.status(500).json({
      message: "Failed to delete customer",
    });
  }
};