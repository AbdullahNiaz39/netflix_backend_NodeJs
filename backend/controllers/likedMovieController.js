const asyncHandle = require("express-async-handler");

const LikedMovie = require("../models/LikedMovieModel");
const User = require("../models/userModel");
/// Get all Data

///Create new Data//
const addToLikedMovies = asyncHandle(async (req, res) => {
  try {
    const { data } = req.body;
    const id = req.user.id;
    const user = await LikedMovie.findOne({ user: id });

    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(
        (movie) => movie.id === data.id
      );

      if (!movieAlreadyLiked) {
        console.log(movieAlreadyLiked);
        await LikedMovie.findByIdAndUpdate(user._id, {
          $push: { likedMovies: data },
        });
        res.status(200).json({ message: "Movies update SuccessFully" });
      } else {
        res
          .status(400)
          .json({ message: "Movie Already added to the Liked List" });
      }
    } else {
      const liked = await LikedMovie.create({
        likedMovies: [data],
        user: req.user.id,
      });
      res.status(200).json({ message: "Movies added SuccessFully", liked });
    }
  } catch (err) {
    res.status(400);
    throw new Error("Error Adding Movies");
  }
});

module.exports = {
  addToLikedMovies,
};
