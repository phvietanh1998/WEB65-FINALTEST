import express from "express";
import { inventory, order } from "../db.js";

const orderRoutes = express.Router();
orderRoutes.get("/all", async (req, res) => {
  try {
    const arrayDes = (await inventory.find({}).toArray()).map(
      ({ description, sku }) => ({ description, sku })
    );
    const orders = (await order.find({}).toArray()).map((e) => ({
      ...e,
      description: arrayDes.find((i) => i.sku === e.item).description,
    }));

    res.status(200).json({
      message: "Success",
      orders: orders,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      data: null,
    });
  }
});

export default orderRoutes;
