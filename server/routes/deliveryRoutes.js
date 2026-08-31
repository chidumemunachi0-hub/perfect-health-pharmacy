import express from "express";

import {
  getDeliveries,
  createDelivery,
  updateDelivery,
  deleteDelivery,
} from "../controllers/deliveryController.js";

const router = express.Router();

router.get("/", getDeliveries);

router.post("/", createDelivery);

router.put("/:id", updateDelivery);

router.delete("/:id", deleteDelivery);

export default router;