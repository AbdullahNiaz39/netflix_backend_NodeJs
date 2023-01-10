const asyncHandle = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");
/// Get all Data
const getGoal = asyncHandle(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
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
    user: req.user.id,
  });
  res.status(200).json({ status: "Success", goals: goals });
});

/// Update all Data
const updateGoal = asyncHandle(async (req, res) => {
  const goals = await Goal.findById(req.params.id);
  if (!goals) {
    res.status(404);
    throw new Error("No Data enter");
  }

  //
  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not Found");
  }

  //Make sure the logged in user matches the goal user
  if (goals.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedGoals = await Goal.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  res.status(200).json({ status: "Success", updatedGoals });
});

/// Delete  Data
const deleteGoal = asyncHandle(async (req, res) => {
  const goals = await Goal.findById(req.params.id);
  if (!goals) {
    res.status(400);
    throw new Error("Goals not Found");
  }

  //
  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not Found");
  }

  //Make sure the logged in user matches the goal user
  if (goals.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await goals.remove();
  res.status(200).json({ message: `Delete Goal ${req.params.id}`, goals });
});

module.exports = {
  getGoal,
  updateGoal,
  addGoal,
  deleteGoal,
};
