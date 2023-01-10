const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name a value"],
    },
    email: {
      type: String,
      required: [true, "Please add email a value"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add Password a value"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
