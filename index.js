import express from "express";
import { MongoClient } from "mongodb";
import inventoryRoutes from "../node_review/routes/inventoryRoutes.js";
import orderRoutes from "../node_review/routes/orderRoutes.js";
import loginRouter from "./routes/login.js";

const app = express();

const MONGO_URL =
  "mongodb+srv://phvietanh1998:BogFTtwQkMfFCRCp@cluster0.5ku8xv9.mongodb.net/test";
const PORT = 5050;
const client = new MongoClient(MONGO_URL);

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
