const express = require("express");
const {
  registerUser,
  loginController,
  updateUserController
} = require("../controllers/auth-controller");
const router = express.Router();


router.post("/login", loginController);
router.post("/register", registerUser);
router.put("/update", updateUserController);

module.exports = router;
