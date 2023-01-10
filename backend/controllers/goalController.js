const asyncHandle = require("express-async-handler");

const Goal = require("../models/goalModel");

/// Get all Data
const getGoal = asyncHandle(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json({ status: "Success", goals });
});

///Create new Data
const addGoal = asyncHandle(async (req, res) => {
  if (!req.body.text) {
    res.status(404);
    throw new Error("No Data enter");
  }
  const goals = await Goal.create({
    ...req.body,
  });
  res.status(200).json({ status: "Success", goals: goals });
});

/// Update all Data
const updateGoal = asyncHandle(async (req, res) => {
  if (!req.body.id) {
    res.status(404);
    throw new Error("No Data enter");
  }
  const goals = await Goal.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  res.status(200).json({ status: "Success", goals });
});

/// Delete  Data
const deleteGoal = asyncHandle(async (req, res) => {
  const goals = await Goal.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: `Delete Goal ${req.params.id}`, goals });
});

module.exports = {
  getGoal,
  updateGoal,
  addGoal,
  deleteGoal,
};
