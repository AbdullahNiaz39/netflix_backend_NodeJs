const express = require("express");

const {
  getComment,
  updateComment,
  deleteComment,
  addComment,
} = require("../controllers/commentController.js");

const router = express.Router();

const { protectUser } = require("../middleware/authMiddleware");

router.get("/", protectUser, getComment);
router.post("/", protectUser, addComment);
router.patch("/:id", protectUser, updateComment);
router.delete("/:id", protectUser, deleteComment);

module.exports = router;
