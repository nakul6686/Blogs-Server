const express = require("express");
const router = express.Router();
const Comments = require("../models/Comments");
const createError = require("http-errors");
const validateComment = require("../utils/commentsjoi");
router.post("/create", async (req, res, next) => {
  try {
    const { text, user, blog } = req.body;
    if (!text || !user || !blog)
      throw createError.BadRequest("Missing required properties.");
    const { error, value } =  validateComment.validate(req.body);
    if (error) throw createError.BadRequest(error.message);
    const newComment = await new Comments(value);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
