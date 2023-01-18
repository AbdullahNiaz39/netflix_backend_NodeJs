const express = require("express");
const {
  getGoal,
  updateGoal,
  deleteGoal,
  addGoal,
} = require("../controllers/goalController.js");
const router = express.Router();
const { protectUser } = require("../middleware/authMiddleware");
router.get("/", protectUser, getGoal);

router.post("/", protectUser, addGoal);

router.patch("/:id", protectUser, updateGoal);

router.delete("/:id", protectUser, deleteGoal);

module.exports = router;
