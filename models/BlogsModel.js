const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  name: String,
  size: Number,
  type: String,
  url: String
}); 
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 10
    },
    desc: {
      type: String,
      required: true,
      minLength: 50
    },
    category: {
      type:String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    image:imageSchema,
  },
  { timestamps: true }
);

const Blog = new mongoose.model("Blog", BlogSchema);
module.exports = Blog;
