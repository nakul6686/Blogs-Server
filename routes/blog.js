const express = require("express");
const router = express.Router();
const {
  createblog,
  deleteBlog,
  getBlogs,
  updateBlog,
  getById
} = require("../controllers/blog-controllers");
const { verifyBlogUser, verifyAndupdate } = require("../utils/verifyUser");

router.get("/", getBlogs);
router.post("/create", createblog);
router.get("/getbyId/:id", getById);

router.delete("/delete/:user/:id", verifyBlogUser, deleteBlog);
router.put("/update", verifyAndupdate, updateBlog);

module.exports = router;
