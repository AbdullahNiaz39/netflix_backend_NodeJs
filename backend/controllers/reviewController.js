const asyncHandle = require("express-async-handler");

const Review = require("../models/reviewModel");
const User = require("../models/userModel");
/// Get all Data
const getReview = asyncHandle(async (req, res) => {
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not Found");
  }
  const reviews = await Review.find({ user: req.user.id });
  res.status(200).json({ status: "Success", reviews });
});

///Create new Data
const addReview = asyncHandle(async (req, res) => {
  if (!req.body.rating) {
    res.status(404);
    throw new Error("No Data enter");
  }
  const reviews = await Review.create({
    ...req.body,
    user: req.user.id,
  });
  res.status(200).json({ status: "Success", reviews: reviews });
});

/// Update all Data
const updateReview = asyncHandle(async (req, res) => {
  const reviews = await Review.findById(req.params.id);
  if (!reviews) {
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

  //Make sure the logged in user is admin
  if (user.role !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedReviews = await Review.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  res.status(200).json({ status: "Success", updatedReviews });
});

/// Delete  Data
const deleteReview = asyncHandle(async (req, res) => {
  const reviews = await Review.findById(req.params.id);
  if (!reviews) {
    res.status(400);
    throw new Error("Reviews not Found");
  }
  //
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not Found");
  }
  //Make sure the logged in user is admin
  if (user.role !== "admin") {
    res.status(401);
    throw new Error("User not authorized");
  }

  await reviews.remove();
  res.status(200).json({ message: `Delete Review ${req.params.id}`, reviews });
});

module.exports = {
  getReview,
  updateReview,
  addReview,
  deleteReview,
};
