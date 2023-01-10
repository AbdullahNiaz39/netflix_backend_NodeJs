const express = require("express");
const {
  getGoal,
  updateGoal,
  deleteGoal,
  addGoal,
} = require("../controllers/goalController.js");
const router = express.Router();
const { protectUser } = require("../middleware/authMiddleware");
router.get("/goals", protectUser, getGoal);

router.post("/goals", protectUser, addGoal);

router.patch("/goals/:id", protectUser, updateGoal);

router.delete("/goals/:id", protectUser, deleteGoal);

module.exports = router;
