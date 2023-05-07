import { MongoClient } from "mongodb";
import { config } from "dotenv";
config();
export const client = new MongoClient(process.env.MONGO_URL);
export const users = client.db("test").collection("users");

export const inventory = client.db("test").collection("inventory");

export const order = client.db("test").collection("order");
