const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { required: true, type: String, unique: true },
    desc: { type: String },
    imgUrl: { type: String },
    trailerUrl: { type: String },
    year: { type: Number },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
