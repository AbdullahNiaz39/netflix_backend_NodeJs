const asyncHandle = require("express-async-handler");
require("colors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Comment = require("../models/commentModel");
const User = require("../models/userModel");

//Registation
//Method Post
/// Create New user
const registorUser = asyncHandle(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please Fill All Field");
  }
  //Check
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Email Already Exists");
  }
  //password Hide
  // const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password,
  });
  res.status(201).json({
    status: "Registation Success",
    token: generateToken(user._id),
    id: user._id,
  });
});

///User Login
//Method Post
//Login User
const loginUser = asyncHandle(async (req, res) => {
  const { email, password } = req.body;
  //checkUser Email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Wrong Email");
  }
  const userHash = await bcrypt.compare(password, user.password);

  if (user && userHash) {
    res.status(201).json({
      status: "Login SuccessfullY",
      token: generateToken(user._id),
      id: user._id,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Creditenial");
  }
});

//User data Display
//Method Get
//Login User
const getMe = asyncHandle(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({ status: "User Data Display", id: _id, email, name });
});

//Get All user
//Method Get
const getUser = asyncHandle(async (req, res) => {
  const user = await User.find();
  res.status(200).json({ status: "Success", user });
});

//Delete user
//Method Get
//Only Delete by admin
const deleteUser = asyncHandle(async (req, res) => {
  const user = await User.findById(req.params.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not Found");
  }

  // Delete all comment made by the user
  const allData = await Comment.deleteMany({ user: req.params.id });

  await user.remove();
  res
    .status(200)
    .json({ message: `Delete User ${req.params.id}`, user, allData });
});

//Delete user
//Method Get
//Only Delete by admin
const updateUser = asyncHandle(async (req, res) => {
  const user = await User.findById(req.params.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not Found");
  }

  const editUser = await User.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  res.status(200).json({ status: "Success", user: editUser });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  registorUser,
  loginUser,
  getMe,
  getUser,
  deleteUser,
  updateUser,
  // addToLikedMovies,
};
