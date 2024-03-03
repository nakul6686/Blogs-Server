const Blog = require("../models/BlogsModel");
const createError = require("http-errors");
const mongoose = require("mongoose");
const verifyBlogUser = async (req, res, next) => {
  try {
    const { id, user } = req.params;
    // // Check if id and userId are not empty
    if (!id || !user) {
      throw createError(400, "Blog ID and User ID are required");
    }
    const blog = await Blog.findById(id); // Assuming the id is passed as a route parameter
    if (!blog) {
      throw createError(404, "Blog not found");
    }
    const clientUserId = new mongoose.Types.ObjectId(user);
    if (!blog.user.equals(clientUserId)) {
      throw createError(
        403,
        "You are not authorized to perform actions on this Blog"
      );
    }
    next();
  } catch (error) {
    if (error.name == "CastError") {
      error.status = 400;
      error.message = "Blog not found.";
    } else {
      error.status = 403;
      error.message = "You are not authorized to perform actions on this Blog";
    }
    next(error); // Pass the error to the error handling middleware
  }
};

const verifyAndupdate = async (req, res, next) => {
  try {
    const { id, user } = req.body;
    // // Check if id and userId are not empty
    if (!id || !user) {
      throw createError(400, "Blog ID and User ID are required");
    }
    const blog = await Blog.findById(id); // Assuming the id is passed as a route parameter
    if (!blog) {
      throw createError(404, "Blog not found");
    }
    const clientUserId = new mongoose.Types.ObjectId(user);
    if (!blog.user.equals(clientUserId)) {
      throw createError(
        403,
        "You are not authorized to perform actions on this Blog"
      );
    }
    next();
  } catch (error) {
    if (error.name == "CastError") {
      error.status = 400;
      error.message = "Blog not found.";
    } else {
      error.status = 403;
      error.message = "You are not authorized to perform actions on this Blog";
    }
    next(error); // Pass the error to the error handling middleware
  }
};
module.exports = {
  verifyBlogUser,
  verifyAndupdate
};
