const User = require("../models/AuthModel");
const isUserRequestValid = require("../utils/registerJoi");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const registerUser = async (req, res, next) => {
  try {
    const { error, value } = isUserRequestValid.validate(req.body);
    if (error) throw createError.BadRequest(error.message);
    const userExists = await User.findOne({ userEmail: value.userEmail });
    if (userExists) throw createError.BadRequest("Email already exists.");
    const newUser = await new User(value);
    const savedUser = await newUser.save();
    const { userPassword, ...other } = savedUser._doc;
    res.status(200).json(other);
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const user = await User.findOne({ userEmail: req.body.userEmail });
    if (!user) throw createError.NotFound("User Not Found.");
    const passwordmatch = await bcrypt.compare(
      req.body.userPassword,
      user.userPassword
    );
    if (!passwordmatch)
      throw createError.Unauthorized("Email or password provided is wrong.");
    const { userPassword, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    next(error);
  }
};

const updateUserController = async (req, res, next) => {
  try {
    const { id, currentUserId } = req.body;
    if (!id || !currentUserId)
      throw createError.BadRequest("Missing required parameters or not valid.");
    const validUser = await User.findById(id);
    if (!validUser) throw createError.NotFound("User not Found.");
    if (validUser._id.toString() !== currentUserId)
      throw createError.Unauthorized(
        "You are not aurthorized to update this user."
      );
    let data = req.body;
    delete data.currentUserId;
    const updateduser = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json(updateduser);
  } catch (error) {
    if (error.name === "CastError") {
      error.status = 400;
      error.message = "Id is not valid.";
    }
    next(error);
  }
}

module.exports.registerUser = registerUser;
module.exports.loginController = loginController;
module.exports.updateUserController = updateUserController
