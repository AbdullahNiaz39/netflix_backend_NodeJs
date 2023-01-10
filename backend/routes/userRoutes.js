const express = require("express");
const router = express.Router();
const {
  registorUser,
  loginUser,
  getMe,
  getUser,
} = require("../controllers/userController");

//MiddleWare For authorization
const { protectUser } = require("../middleware/authMiddleware");

///User Routes
router.post("/", registorUser);
router.post("/login", loginUser);
router.get("/me", protectUser, getMe);
router.get("/", getUser);

module.exports = router;
