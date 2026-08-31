import express from "express";
import { getCustomers, deleteCustomer } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getCustomers);
router.delete("/:id", deleteCustomer);

export default router;