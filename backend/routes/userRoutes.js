const express = require("express");
const router = express.Router();
const {
  registorUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

router.post("/", registorUser);
router.post("/login", loginUser);
router.get("/me", getMe);

module.exports = router;
