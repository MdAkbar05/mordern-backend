import express from "express";
import blogController from "../app/controllers/taskController.js";
const router = express.Router();

// Create Route
router.post("/create-blog", blogController.createBlog);

// Read Route
router.get("/read-blog", blogController.readBlog);

// Update Route
router.put("/update-blog", blogController.updateBlog);

// Delete Route
router.delete("/delete-blog", blogController.deleteBlog);

export default router;
