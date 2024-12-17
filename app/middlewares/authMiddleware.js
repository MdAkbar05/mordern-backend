import jwt from "jsonwebtoken";
import { jwtAccessKey } from "../../secret.js";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.token, jwtAccessKey);
    console.log(decoded);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token failed",
      error: error.toString(),
    });
  }
};
export const isLogout = async (req, res, next) => {
  try {
    // check cookie then if not exist then return error
    if (req.cookies.token) {
      return res
        .status(401)
        .json({ message: "User already login, At first logout" });
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token failed",
      error: error.toString(),
    });
  }
};
export const isLogin = async (req, res, next) => {
  try {
    // check cookie then if not exist then return error
    if (!req.cookies.token) {
      return res
        .status(401)
        .json({ message: "User already logout, At first login" });
    }

    next();
  } catch (error) {
    res.status(401).json({
      message: "Not authorized, token failed",
      error: error.toString(),
    });
  }
};
