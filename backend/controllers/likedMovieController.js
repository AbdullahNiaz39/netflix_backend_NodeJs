const asyncHandle = require("express-async-handler");

const LikedMovie = require("../models/LikedMovieModel");
const User = require("../models/userModel");
/// Get all Data

///Create new Data//
const addToLikedMovies = asyncHandle(async (req, res) => {
  try {
    const { data } = req.body;
    const id = req.user.id;
    const user = await LikedMovie.findOne({ user: id }).select("likedMovies");
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(
        (movie) => movie.id === data.id
      );

      if (!movieAlreadyLiked) {
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

///get Liked Movies//
const getLikedMovies = asyncHandle(async (req, res) => {
  try {
    const id = req.user.id;
    const user = await LikedMovie.findOne({ user: id }).select("likedMovies");
    if (user) {
      res.status(200).json({
        status: "Movies Shows SuccessFully",
        movies: user.likedMovies,
      });
    } else {
      res.status(400).json({ message: "Error fetching Movies" });
    }
  } catch (err) {
    res.status(400);
    throw new Error("Error Adding Movies");
  }
});

const removeLikedMovies = asyncHandle(async (req, res) => {
  try {
    const { movieId } = req.body;
    const id = req.user.id;
    const user = await LikedMovie.findOne({ user: id }).select("likedMovies");

    if (user) {
      const movies = user.likedMovies;
      const movieIndex = movies.findIndex((movie) => movie.id === movieId);

      if (movieIndex === -1) {
        res.status(400).json({ message: "Movie not Found" });
        return;
      }
      movies.splice(movieIndex, 1);

      await LikedMovie.findByIdAndUpdate(
        user._id,
        {
          $set: { likedMovies: movies },
        },
        { new: true }
      );
      res.status(200).json({ message: "Movies Remove SuccessFully", movies });
    } else {
      res.status(400).json({ message: "User with given email not found." });
    }
  } catch (err) {
    res.status(400);
    throw new Error("Error Deleting Movies");
  }
});

module.exports = {
  addToLikedMovies,
  getLikedMovies,
  removeLikedMovies,
};
