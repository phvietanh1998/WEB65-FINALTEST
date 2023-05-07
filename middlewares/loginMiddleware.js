import jwt from "jsonwebtoken";
import { users } from "../db.js";

const JWT_SECRET = "MY_SECRET_KEY";

const loginMiddleware = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username + " " + password);
  const loginUser = await users.findOne({ username, password });

  if (loginUser != undefined) {
    const { username } = loginUser;
    const token = jwt.sign(
      {
        username,
        password,
      },
      JWT_SECRET,
      {
        expiresIn: "30s",
      }
    );
    req.data = { username, token };
    next();
  } else {
    res.status(401).json({
      message: "Invalid username or password",
      data: null,
    });
  }
};

export default loginMiddleware;
