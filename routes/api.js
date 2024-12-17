import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  authUser,
  getUserProfile,
  getAllUsers,
  updateUserProfile,
  deleteUser,
  logout,
} from "../app/controllers/userController.js";
import {
  isLogin,
  isLogout,
  protect,
} from "../app/middlewares/authMiddleware.js";

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", isLogout, loginUser);

// User logout
router.get("/logout", isLogin, logout);

// User Authentication by JWT token
router.get("/auth", protect, authUser);

// Get single user profile
router.get("/:id", protect, getUserProfile);

// Get all users profiles
router.get("/", protect, getAllUsers);

// Update user profile
router.put("/:id", protect, updateUserProfile);

// Delete a single user
router.delete("/:id", protect, deleteUser);

export default router;
