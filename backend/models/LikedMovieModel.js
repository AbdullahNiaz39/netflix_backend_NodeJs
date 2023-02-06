const mongoose = require("mongoose");

const LikedMovieSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    likedMovies: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("LikedMovie", LikedMovieSchema);
