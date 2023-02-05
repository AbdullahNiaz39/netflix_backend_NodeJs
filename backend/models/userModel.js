const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
      maxlength: [20, "must be less then or equal to 20"],
      minlength: [2, "must be less then or equal to 20"],
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  console.log("in middleWare");
  this.password = await bcrypt.hash(this.password, 10);
  console.log("this.password", this.password);
  next();
});

userSchema.methods.comparePassword = async (userPassword, hashedPassword) => {
  console.log("hashedPassword", hashedPassword);
  const isMatched = await bcrypt.compare(userPassword, hashedPassword);

  return isMatched;
};

module.exports = mongoose.model("User", userSchema);
