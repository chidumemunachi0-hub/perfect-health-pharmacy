import express from "express";

import {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  cancelOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/:id", getOrder);

router.put("/:id/cancel", cancelOrder);

router.put("/:id", updateOrder);

router.delete("/:id", deleteOrder);
export default router;