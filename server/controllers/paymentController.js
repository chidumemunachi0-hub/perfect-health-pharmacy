import axios from "axios";

export const initializePayment = async (req, res) => {
  try {
    const {
      email,
      amount,
    } = req.body;

    if (!email || !amount) {
      return res.status(400).json({
        message: "Email and amount are required.",
      });
    }

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: Math.round(Number(amount) * 100),
        callback_url: "https://perfect-health-pharmacy.vercel.app/payment-success",      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      message: "Payment initialized successfully.",
      authorization_url:
        response.data.data.authorization_url,
      access_code:
        response.data.data.access_code,
      reference:
        response.data.data.reference,
    });

  } catch (error) {
    console.log(
      "PAYSTACK INITIALIZATION ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message:
        error.response?.data?.message ||
        "Failed to initialize payment.",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const payment = response.data.data;

    if (payment.status !== "success") {
      return res.status(400).json({
        message: "Payment was not successful.",
      });
    }

    res.status(200).json({
      message: "Payment verified successfully.",
      payment: {
        reference: payment.reference,
        status: payment.status,
        amount: payment.amount,
        email: payment.customer?.email,
      },
    });

  } catch (error) {
    console.log(
      "PAYSTACK VERIFICATION ERROR:",
      error.response?.data || error.message
    );

    res.status(500).json({
      message:
        error.response?.data?.message ||
        "Failed to verify payment.",
    });
  }
};