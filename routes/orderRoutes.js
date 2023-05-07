import express from "express";
import { inventory, order } from "../db.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const orderRoutes = express.Router();

orderRoutes.get("/:item", async (req, res) => {
  const item = req.params.item;
  const desc = await inventory.findOne({ sku: item });
  const product = await order.find({ item: item }).toArray();
  res.status(200).json({
    message: "Success",
    product,
    description: desc.description,
  });
});

export default orderRoutes;
