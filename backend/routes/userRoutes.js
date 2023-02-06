const express = require("express");
const router = express.Router();
const {
  registorUser,
  loginUser,
  getMe,
  getUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const {
  addToLikedMovies,
  getLikedMovies,
  removeLikedMovies,
} = require("../controllers/likedMovieController");

//MiddleWare For authorization
const { protectUser, restrictTo } = require("../middleware/authMiddleware");

///User Routes
router.post("/", registorUser);
router.post("/login", loginUser);
router.get("/me", protectUser, getMe);
router.get("/", getUser);
router.patch("/:id", protectUser, restrictTo("admin"), updateUser);
router.delete("/:id", protectUser, restrictTo("admin"), deleteUser);
router.post("/liked", protectUser, addToLikedMovies);
router.get("/liked", protectUser, getLikedMovies);
router.put("/liked", protectUser, removeLikedMovies);

module.exports = router;
