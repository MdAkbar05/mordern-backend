import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { jwtAccessKey } from "../../secret.js";
import mongoose from "mongoose";

// User Registration API
export const registerUser = async (req, res) => {
  const { firstName, lastName, NIDNumber, phoneNumber, password, bloodGroup } =
    req.body;

  try {
    const userExists = await User.findOne({
      $or: [{ NIDNumber }, { phoneNumber }],
    });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      firstName,
      lastName,
      NIDNumber,
      phoneNumber,
      password,
      bloodGroup,
    });

    await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", payload: user });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// User Login API
export const loginUser = async (req, res) => {
  const { phoneNumber, password } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, jwtAccessKey, {
      expiresIn: "1h",
    });

    // Set token in response header
    res.setHeader("Authorization", `Bearer ${token}`);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};
// User Login API
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

// User Authentication by JWT token
export const authUser = (req, res) => {
  res
    .status(200)
    .json({ message: "User authenticated successfully", user: req.user });
};

// Get Single User Profile API
export const getUserProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile", error });
  }
};

// Get All Users Profile API
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

// Update Single User Profile API
export const updateUserProfile = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, NIDNumber, phoneNumber, bloodGroup } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.NIDNumber = NIDNumber || user.NIDNumber;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.bloodGroup = bloodGroup || user.bloodGroup;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

// Delete Single User API
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.toString() });
  }
};
