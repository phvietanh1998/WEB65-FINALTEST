import { config } from "dotenv";
config();
import express from "express";
import inventoryRoutes from "../node_review/routes/inventoryRoutes.js";
import orderRoutes from "../node_review/routes/orderRoutes.js";
import loginRouter from "./routes/login.js";
import { client } from "./db.js";

const app = express();

const PORT = process.env.PORT;

async function main() {
  try {
    // connect to MongoDB
    await client.connect();
    console.log("Connected to Mongo successfully");

    app.use(express.json());

    app.use("/inventory", inventoryRoutes);
    app.use("/login", loginRouter);
    app.use("/order", orderRoutes);
    app.listen(PORT, () => {
      console.log("Server is listening on port " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
