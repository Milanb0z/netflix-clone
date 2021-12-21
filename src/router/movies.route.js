const express = require("express");

const authToken = require("../middleware/auth");
const Movie = require("../models/movie.model");
const User = require("../models/user.model");

const router = express.Router();

router.post("/new", async (req, res) => {
  const { title, desc, imgUrl, trailerUrl, year, limit, genre } = req.body;
  try {
    const newMovie = new Movie({
      title,
      desc,
      imgUrl,
      trailerUrl,
      year,
      limit,
      genre,
    });

    const savedPost = await newMovie.save();
    res.send(savedPost);
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
});

// Like Movie

router.post("/like/:id", authToken, async (req, res) => {
  try {
    const selectedMovie = await Movie.findById(req.params.id);
    if (!selectedMovie) {
      return res.status(402).send({ message: "Invalid Movie" });
    }

    const user = await User.findById(req.user.id)
      .populate("likedMovies")
      .populate("watchLater")
      .exec();

    if (!user) {
      return res.status(402).send({ message: "Invalid User" });
    }

    user.likedMovies.push(selectedMovie._id);
    selectedMovie.likedBy.push(user._id);

    const savedUser = await user.save();
    const savedMovie = await selectedMovie.save();

    res.send({ savedUser, selectedMovie });
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
});

// Add movie to watch later

router.post("/watchlater/:id", authToken, async (req, res) => {
  try {
    const selectedMovie = await Movie.findById(req.params.id);
    if (!selectedMovie) {
      return res.status(402).send({ message: "Invalid Movie" });
    }

    const user = await User.findById(req.user.id)
      .populate("likedMovies")
      .populate("watchLater")
      .exec();

    if (!user) {
      return res.status(402).send({ message: "Invalid User" });
    }

    user.watchLater.push(selectedMovie._id);

    const savedUser = await user.save();

    res.send(savedUser);
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const selectedMovie = await Movie.findById(req.params.id).populate(
      "likedBy"
    );

    if (!selectedMovie) {
      return res.status(401).send({ message: "Invalid request" });
    }

    res.send(selectedMovie);
  } catch (error) {
    res.status(500).send({ error });
    console.log(error);
  }
});

module.exports = router;
