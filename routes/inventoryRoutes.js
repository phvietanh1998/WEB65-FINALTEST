import express from "express";
import { inventory } from "../db.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const inventoryRoutes = express.Router();

inventoryRoutes.get("/", authMiddleware, async (req, res) => {
  const { lowQuantity } = req.query;

  if (lowQuantity === "true") {
    const lowQuantityProducts = await inventory
      .find({ instock: { $lt: 100 } })
      .toArray();
    res.json(lowQuantityProducts);
  } else {
    const allProducts = await inventory.find().toArray();
    res.json(allProducts);
  }
});

inventoryRoutes.get("/", authMiddleware, async (req, res) => {
  const allProducts = await inventory.find().toArray();
  res.status(200).json({
    message: "Success",
    data: allProducts,
  });
});

export default inventoryRoutes;
