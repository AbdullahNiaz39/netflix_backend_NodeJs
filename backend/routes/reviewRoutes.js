const express = require("express");
const {
  getReview,
  updateReview,
  deleteReview,
  addReview,
} = require("../controllers/reviewController.js");
const router = express.Router();
const { protectUser, restrictTo } = require("../middleware/authMiddleware");
router.get("/", protectUser, getReview);

router.post("/", protectUser, restrictTo("admin"), addReview);

router.patch("/:id", protectUser, restrictTo("admin"), updateReview);

router.delete("/:id", protectUser, restrictTo("admin"), deleteReview);

module.exports = router;
