const { request } = require("express");
const express = require("express");
const {
  getGoal,
  updateGoal,
  deleteGoal,
  addGoal,
} = require("../controllers/goalController.js");
const router = express.Router();

router.get("/goals", getGoal);

router.post("/goals", addGoal);

router.patch("/goals/:id", updateGoal);

router.delete("/goals/:id", deleteGoal);

module.exports = router;
