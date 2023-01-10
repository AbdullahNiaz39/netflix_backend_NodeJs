const asyncHandle = require("express-async-handler");
require("colors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

//Method Post
/// Get all Data
const registorUser = asyncHandle(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add All Field".red.underline);
  }
  //Check
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Already Exists".red.underline);
  }

  //password Hide
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  res.status(201).json({ status: "Registation Success", user });
});

//Method Post
//Login User
const loginUser = asyncHandle(async (req, res) => {
  const { email, password } = req.body;

  //checkUser Email
  const user = await User.findOne({ email });
  const userHash = await bcrypt.compare(password, user.password);

  if (user && userHash) {
    res.status(201).json({
      status: "Login SuccessfullY",
      _id: user.id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Creditenial".red.underline);
  }
});

//Method Get
//Login User
const getMe = asyncHandle(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({ status: "User Data Display", id: _id, email, name });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//Get All user
const getUser = asyncHandle(async (req, res) => {
  const user = await User.find();
  res.status(200).json({ status: "Success", user });
});
module.exports = {
  registorUser,
  loginUser,
  getMe,
  getUser,
};
