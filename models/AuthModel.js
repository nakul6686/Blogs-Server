const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const imageSchema = new mongoose.Schema({
  name: String,
  size: Number,
  type: String,
  url: String
}); 
// const Schema = mongoose.Schema;
const RegisterSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 20,
    },
    userEmail: {
      type: String,
      required: true,
      unique: true, // Ensure unique email addresses
      lowercase: true, // Convert email to lowercase
      trim: true,
    },
    userPassword: {
      type: String,
      required: true,
      minLength: 6,
    },
    userNumber: {
      type: String,
      required: true,
    },
    userImage: {
      type: imageSchema,
      required: false, 
      default: null
    },
  },
  { timestamps: true }
);



RegisterSchema.pre("save", async function (next) {
  try {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(this.userPassword, salt);
    this.userPassword = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", RegisterSchema);

module.exports = User;
