const Blog = require("../models/BlogsModel");
const Comments = require("../models/Comments");
const User = require("../models/AuthModel");
const createError = require("http-errors");
const { deleteCommentbyblogId } = require("./comment-controller");
const createblog = async (req, res, next) => {
  try {
    const { title, desc, user, category, image } = req.body;
    if (!title || !desc || !user || !category || !image)
      throw createError.BadRequest("Missing required Parameters.");
    const userExists = await User.findById(req.body.user);
    if (!userExists) throw createError.Unauthorized("User not found.");
    const newBlog = await new Blog(req.body);
    const createdBlog = await newBlog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    if (error.name === "ValidationError") error.status = 400;
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    await deleteCommentbyblogId(req.params.id)
    res
      .status(200)
      .json({ message: "Blog has been deleted successfully.", status: 200 });
  } catch (err) {
    next(err);
  }
};

const getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, user , searchText} = req.query;

    const query = {};
    if (category) query.category = category;
    if (user) query.user = user;
    if (searchText) {
      query.title = { $regex: new RegExp(searchText, 'i') };
    }
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [blogs, totalBlogs] = await Promise.all([
      Blog.find(query)
        .limit(parseInt(limit))
        .skip(skip)
        .lean(), 
      Blog.countDocuments(query),
    ]);
    const blogIds = blogs.map(bg => bg._id);
    const commentCounts = await Comments.aggregate([
      { $match: { blog: { $in: blogIds } } },
      {
        $group: {
          _id: "$blog",
          count: { $sum: 1 }
        }
      }
    ]);

    const blogsWithComments = blogs.map(bg => {
      const commentCount = commentCounts.find(cc => cc._id.toString() === bg._id.toString());
      return { ...bg, comments: commentCount ? commentCount.count : 0 };
    });

    res.status(200).json({
      blogs: blogsWithComments,
      totalBlogs,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalBlogs / parseInt(limit)),
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw createError.BadRequest("Blog is is required");
    const gotblog = await Blog.findById(id).populate("user");
    if (!gotblog) throw createError.NotFound("Blog not found.");
    const comments = await Comments.find({ blog: gotblog._doc._id }).populate(
      "user"
    );
    const finalBlog = { ...gotblog._doc, comments: [...comments] || [] };

    res.status(200).json(finalBlog);
  } catch (error) {
    if (error.name === "CastError") {
      error.status = 400;
      error.message = "Invalid Blog id.";
    }
    next(error);
  }
};

module.exports = {
  createblog,
  deleteBlog,
  getBlogs,
  updateBlog,
  getById,
};
