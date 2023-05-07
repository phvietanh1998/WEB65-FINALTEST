import express from "express";
import loginMiddleware from "../middlewares/loginMiddleware.js";

const loginRouter = express.Router();

loginRouter.use(express.json());

loginRouter.post("/", loginMiddleware, (req, res) => {
  try {
    res.status(200).json({
      message: "Login successful",
      data: req.data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed",
      data: null,
    });
  }
});

export default loginRouter;
