const asyncHandle = require("express-async-handler");

const Comment = require("../models/commentModel");
const User = require("../models/userModel");
/// Get all Data
const getComment = asyncHandle(async (req, res) => {
  const comments = await Comment.find({ user: req.user.id });
  res.status(200).json({ status: "Success", comments });
});

///Create new Data
const addComment = asyncHandle(async (req, res) => {
  if (!req.body.text) {
    res.status(404);
    throw new Error("No Data enter");
  }
  const comments = await Comment.create({
    ...req.body,
    user: req.user.id,
  });
  res.status(200).json({ status: "Success", comments: comments });
});

/// Update all Data
const updateComment = asyncHandle(async (req, res) => {
  const comments = await Comment.findById(req.params.id);
  if (!comments) {
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
  //Make sure the logged in user matches the Comment user
  if (comments.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const updatedComments = await Comment.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  res.status(200).json({ status: "Success", updatedComments });
});

/// Delete  Data
const deleteComment = asyncHandle(async (req, res) => {
  const comments = await Comment.findById(req.params.id);
  if (!comments) {
    res.status(400);
    throw new Error("Comments not Found");
  }
  //
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not Found");
  }
  //Make sure the logged in user matches the Comment user
  if (comments.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  await comments.remove();
  res
    .status(200)
    .json({ message: `Delete Comment ${req.params.id}`, comments });
});

module.exports = {
  getComment,
  updateComment,
  addComment,
  deleteComment,
};
