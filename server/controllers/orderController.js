import Order from "../models/Order.js";
import transporter from "../config/email.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { paymentReference } = req.body;

    // Prevent the same Paystack payment
    // from creating multiple orders
    if (paymentReference) {
      const existingOrder = await Order.findOne({
        paymentReference,
      }).populate("customer", "name email phone")
        .populate("items.product", "name price image");

      if (existingOrder) {
        console.log(
          "ORDER ALREADY EXISTS FOR PAYMENT:",
          paymentReference
        );

        return res.status(200).json(existingOrder);
      }
    }

    // Create the order
    const order = await Order.create(req.body);

    // Get complete order information
    const populatedOrder = await Order.findById(order._id)
      .populate("customer", "name email phone")
      .populate("items.product", "name price image");

    // Create product list for email
    const productList = populatedOrder.items
      .map((item) => {
        const productName =
          item.product?.name || "Unknown Product";

        const price =
          Number(item.product?.price || 0);

        const quantity =
          Number(item.quantity || 1);

        return `${productName} × ${quantity} — ₦${(
          price * quantity
        ).toLocaleString()}`;
      })
      .join("\n");

    // Send email to admin
    try {
      await transporter.sendMail({
        from: `"Perfect Health Pharmacy" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,

        subject: `🛒 New Order #${populatedOrder._id}`,

        text: `
NEW ORDER RECEIVED
==============================

Order ID:
${populatedOrder._id}

CUSTOMER
==============================
Name: ${populatedOrder.customer?.name || "Unknown"}
Email: ${populatedOrder.customer?.email || "N/A"}
Phone: ${populatedOrder.phone}

ORDER ITEMS
==============================
${productList}

TOTAL
==============================
₦${Number(
  populatedOrder.totalAmount
).toLocaleString()}

DELIVERY
==============================
Method: ${populatedOrder.delivery || "Home Delivery"}

Delivery Area:
${populatedOrder.deliveryArea || "N/A"}

Delivery Fee:
₦${Number(
  populatedOrder.deliveryFee || 0
).toLocaleString()}

Address:
${populatedOrder.address}

Order Status:
${populatedOrder.status}

==============================
Perfect Health Pharmacy
Pharmacy & Superstore
        `,
      });

      console.log("ORDER EMAIL SENT ✅");

    } catch (emailError) {
      console.log("EMAIL ERROR:", emailError);
    }

    res.status(201).json(populatedOrder);

  } catch (error) {
    console.log("CREATE ORDER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// GET ALL ORDERS
export const getOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("customer")
      .populate("items.product");

    res.json(orders);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// GET SINGLE ORDER
export const getOrder = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("customer")
      .populate("items.product");

    res.json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};


// =========================
// UPDATE ORDER STATUS
// =========================

export const updateOrder = async (req, res) => {
  try {
    const oldOrder = await Order.findById(req.params.id)
      .populate("customer", "name email");

    if (!oldOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const oldStatus = oldOrder.status;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    ).populate("customer", "name email");

    // Only send email when the status actually changes
    if (
      req.body.status &&
      req.body.status !== oldStatus &&
      order.customer?.email
    ) {
      try {
        await transporter.sendMail({
          from: `"Perfect Health Pharmacy" <${process.env.EMAIL_USER}>`,
          to: order.customer.email,

          subject: `📦 Your Order #${order._id
            .toString()
            .slice(-6)
            .toUpperCase()} is ${order.status}`,

          text: `
Hello ${order.customer.name || "Customer"},

Your Perfect Health Pharmacy order has been updated.

ORDER #${order._id
            .toString()
            .slice(-6)
            .toUpperCase()}

Previous Status:
${oldStatus}

New Status:
${order.status}

Total:
₦${Number(order.totalAmount).toLocaleString()}

Delivery:
${order.delivery}

Address:
${order.address}

Thank you for shopping with Perfect Health Pharmacy.

Perfect Health Pharmacy
Pharmacy & Superstore
          `,
        });

        console.log("CUSTOMER STATUS EMAIL SENT ✅");

      } catch (emailError) {
        console.log(
          "CUSTOMER EMAIL ERROR:",
          emailError
        );
      }
    }

    res.json(order);

  } catch (error) {
    console.log("UPDATE ORDER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
// DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      message: "Order Deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// =========================
// CUSTOMER CANCEL ORDER
// =========================


export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerId } = req.body;

    const order = await Order.findById(id)
      .populate("customer", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order not found.",
      });
    }

    // Make sure this is the customer's own order
    if (order.customer._id.toString() !== customerId) {
      return res.status(403).json({
        message: "You can only cancel your own order.",
      });
    }

    // Only Pending or Processing orders can be cancelled
    if (
      order.status !== "Pending" &&
      order.status !== "Processing"
    ) {
      return res.status(400).json({
        message: `You cannot cancel an order that is ${order.status}.`,
      });
    }

    // Save the previous status
    const previousStatus = order.status;

    // Cancel the order
    order.status = "Cancelled";

    await order.save();

    // =========================
    // SEND EMAIL TO ADMIN
    // =========================

    try {
      await transporter.sendMail({
        from: `"Perfect Health Pharmacy" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,

        subject: `🚨 Order #${order._id
          .toString()
          .slice(-6)
          .toUpperCase()} Cancelled`,

        text: `
ORDER CANCELLED
==============================

Order ID:
${order._id}

CUSTOMER
==============================
Name: ${order.customer?.name || "Unknown"}
Email: ${order.customer?.email || "N/A"}
Phone: ${order.phone || "N/A"}

ORDER
==============================
Previous Status: ${previousStatus}
New Status: Cancelled

TOTAL
==============================
₦${Number(order.totalAmount).toLocaleString()}

DELIVERY
==============================
Method: ${order.delivery || "Home Delivery"}

Address:
${order.address || "N/A"}

==============================
The customer has cancelled this order.

Perfect Health Pharmacy
Pharmacy & Superstore
        `,
      });

      console.log("ADMIN CANCELLATION EMAIL SENT ✅");

    } catch (emailError) {
      console.log(
        "ADMIN CANCELLATION EMAIL ERROR:",
        emailError
      );
    }

    res.status(200).json({
      message: "Order cancelled successfully.",
      order,
    });

  } catch (error) {
    console.log("CANCEL ORDER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};