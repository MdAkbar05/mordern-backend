import { UPLOAD_FOLDER } from "../config/config.js";
import { moveFile } from "../utility/moveFile.js";

const blogController = {
  createBlog: (req, res) => {
    // Logic to create a blog (e.g., save data to database)
    res.status(201).json({ message: "Blog created successfully" });
  },

  readBlog: (req, res) => {
    // Logic to read blogs (e.g., fetch data from database)
    res.status(200).json({ message: "Blog read successfully" });
  },

  updateBlog: (req, res) => {
    // Logic to update a blog (e.g., find blog by ID and update it)
    res.status(200).json({ message: "Blog update successfully" });
  },

  deleteBlog: (req, res) => {
    // Logic to delete a blog (e.g., find blog by ID and delete it)
    res.status(200).json({ message: "Blog delete successfully" });
  },
};

export default blogController;
